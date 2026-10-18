import {
  box,
  calculateLoan,
  contrast,
  expect,
  expectTheme,
  LOANS,
  open,
  pageOverflowX,
  readColourTokens,
  summary,
  test,
  themeSel,
} from './fixtures'
import {
  CHART_TITLES,
  figureNamed,
  over,
  readChartTextColours,
  readMarkColours,
  SUMMARY,
  allFigures,
} from './visual-helpers'

const segmentShare = async (figure: import('@playwright/test').Locator) => {
  const loan = await box(figure.locator('[data-segment="loan"]'))
  const interestSeg = figure.locator('[data-segment="interest"]')
  const interestWidth = (await interestSeg.count()) === 0 ? 0 : (await box(interestSeg)).width
  return { loan: loan.width, interest: interestWidth }
}

test.describe('S-20 Cost breakdown', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-20.1] L-A shows the Cost breakdown bar with Loan amount and Interest parts and 6.2%', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText('Cost breakdown', { exact: true })).toBeVisible()
    const figure = figureNamed(page, SUMMARY.costA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.costA, { exact: true })).toBeVisible()
    await expect(figure.getByText('Loan amount', { exact: true }).first()).toBeVisible()
    await expect(figure.getByText('Interest', { exact: true }).first()).toBeVisible()
    await expect(figure.locator('[data-segment="loan"]')).toHaveCount(1)
    await expect(figure.locator('[data-segment="interest"]')).toHaveCount(1)
    const w = await segmentShare(figure)
    expect(w.loan).toBeGreaterThan(0)
    expect(w.interest).toBeGreaterThan(0)
  })

  test('[AC-20.2] L-B reads Interest is 34.4% of the total amount payable.', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    const figure = figureNamed(page, SUMMARY.costB)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.costB, { exact: true })).toBeVisible()
    const w = await segmentShare(figure)
    const loanPct = (100 * w.loan) / (w.loan + w.interest)
    expect(loanPct).toBeGreaterThanOrEqual(64.6)
    expect(loanPct).toBeLessThanOrEqual(66.6)
  })

  test('[AC-20.3] L-C (0%) reads 0.0% and the bar shows the loan amount only', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    const figure = figureNamed(page, SUMMARY.costC)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.costC, { exact: true })).toBeVisible()
    await expect(figure.locator('[data-segment="loan"]')).toHaveCount(1)
    const w = await segmentShare(figure)
    expect(w.loan, 'loan segment has width').toBeGreaterThan(20)
    expect(w.interest, 'no visible interest segment').toBeLessThan(0.5)
  })

  test('[AC-20.4] L-A: the loan-amount part takes 93.8% (+/- 1 point) of the bar width', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    const figure = figureNamed(page, SUMMARY.costA)
    await expect(figure.locator('[data-segment="loan"]')).toBeVisible()
    await expect(figure.locator('[data-segment="interest"]')).toBeVisible()
    const w = await segmentShare(figure)
    const loanPct = (100 * w.loan) / (w.loan + w.interest)
    expect(loanPct).toBeGreaterThanOrEqual(92.8)
    expect(loanPct).toBeLessThanOrEqual(94.8)
  })

  for (const theme of ['Light', 'Dark'] as const) {
    test(`[AC-20.5] ${theme}: every chart mark reaches 3:1 and all chart text 4.5:1 against the card surface`, async ({
      page,
    }) => {
      await themeSel(page).selectOption({ label: theme })
      await expectTheme(page, theme === 'Light' ? 'light' : 'dark')
      await calculateLoan(page, LOANS.B)
      await expect(summary(page, 'Monthly payment')).toHaveText(LOANS.B.monthly)
      await expect(allFigures(page)).toHaveCount(4)

      const tokens = await readColourTokens(page, ['--surface'])
      const surface = tokens['--surface'] ?? [255, 255, 255]

      const marks = await readMarkColours(page)
      const kinds = new Set(marks.map((m) => m.series))
      for (const kind of ['principal', 'interest', 'loan', 'balance']) {
        expect(kinds.has(kind), `a visible [data-series="${kind}"] mark exists`).toBe(true)
      }
      for (const m of marks) {
        expect(m.rgba[3], `${m.series} <${m.tag}> has a visible colour`).toBeGreaterThan(0)
        const ratio = contrast(over(m.rgba, surface), surface)
        expect(
          ratio,
          `${theme}: ${m.series} <${m.tag}> rgba(${m.rgba.join(',')}) on --surface`,
        ).toBeGreaterThanOrEqual(3)
      }

      const texts = await readChartTextColours(page, CHART_TITLES)
      expect(texts.length, 'chart text was found').toBeGreaterThanOrEqual(8)
      for (const t of texts) {
        const ratio = contrast(over(t.rgba, surface), surface)
        expect(
          ratio,
          `${theme}: text "${t.text}" rgba(${t.rgba.join(',')}) on --surface`,
        ).toBeGreaterThanOrEqual(4.5)
      }
    })
  }

  test.describe('at 360 px wide', () => {
    test.use({ viewport: { width: 360, height: 740 } })

    test('[AC-20.6] L-MAX: no horizontal page scroll and every chart fits inside the results card', async ({
      page,
    }) => {
      await calculateLoan(page, LOANS.MAX)
      await expect(summary(page, 'Monthly payment')).toHaveText(LOANS.MAX.monthly)
      await expect(allFigures(page)).toHaveCount(4)
      const m = await pageOverflowX(page)
      expect(m.doc).toBeLessThanOrEqual(360)
      expect(m.body).toBeLessThanOrEqual(360)

      // The results card = the smallest element holding the summary figures, every chart and the schedule.
      const fit = await page.evaluate(() => {
        const figures = Array.from(document.querySelectorAll('figure'))
        const dd = Array.from(document.querySelectorAll('dd'))[0]
        const schedule = Array.from(document.querySelectorAll('table')).find(
          (t) => (t.tBodies[0]?.rows.length ?? 0) >= 1200,
        )
        if (!dd || !schedule || figures.length === 0) return { error: 'results parts missing' }
        let card: Element | null = figures[0]!.parentElement
        const holdsAll = (c: Element) =>
          c.contains(dd) && c.contains(schedule) && figures.every((f) => c.contains(f))
        while (card && !holdsAll(card)) card = card.parentElement
        if (!card) return { error: 'no common ancestor' }
        const c = card.getBoundingClientRect()
        const eps = 0.5
        const problems: string[] = []
        if (c.width > 360 + eps) problems.push(`card is ${c.width}px wide`)
        const inside = (r: DOMRect) =>
          r.left >= c.left - eps &&
          r.right <= c.right + eps &&
          r.top >= c.top - eps &&
          r.bottom <= c.bottom + eps
        figures.forEach((f, i) => {
          if (!inside(f.getBoundingClientRect())) problems.push(`figure ${i + 1} sticks out`)
          if (f.scrollWidth > f.clientWidth + 1) problems.push(`figure ${i + 1} scrolls sideways`)
          f.querySelectorAll('svg').forEach((s) => {
            if (!inside(s.getBoundingClientRect())) problems.push(`figure ${i + 1} svg sticks out`)
          })
        })
        return { problems, cardTag: card.tagName, cardWidth: c.width }
      })
      expect(fit, 'results card geometry could be measured').not.toHaveProperty('error')
      expect((fit as { problems: string[] }).problems).toEqual([])
    })
  })

  test('[SPEC-§8.3.2] the results card order is figures, Cost breakdown, Balance over time, Interest and principal in each payment, Yearly summary, Repayment schedule', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    await expect(allFigures(page)).toHaveCount(4)
    const names = [
      ...CHART_TITLES.map((t) => page.getByText(t, { exact: true })),
      page.getByRole('heading', { name: 'Repayment schedule', level: 2 }),
    ]
    const ys: number[] = []
    for (const locator of [summary(page, 'Total amount payable'), ...names]) {
      ys.push((await box(locator.first())).y)
    }
    const sorted = [...ys].sort((a, b) => a - b)
    expect(ys, 'vertical order of the results card parts').toEqual(sorted)
  })

  test('[SPEC-§7] L-D (1 month) reads Interest is 0.8% of the total amount payable.', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.D)
    await expect(figureNamed(page, SUMMARY.costD)).toBeVisible()
  })

  test('[SPEC-§8.3.1] a stale form or Reset removes every chart (results never contradict the inputs)', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(allFigures(page)).toHaveCount(4)
    await page.getByLabel('Loan tenure', { exact: true }).fill('2')
    await expect(
      page.getByText('Your inputs have changed. Select Calculate to see updated results.'),
    ).toBeVisible()
    await expect(allFigures(page)).toHaveCount(0)
    await page.getByRole('button', { name: 'Calculate', exact: true }).click()
    await expect(allFigures(page)).toHaveCount(4)
    await page.getByRole('button', { name: 'Reset', exact: true }).click()
    await expect(allFigures(page)).toHaveCount(0)
  })
})
