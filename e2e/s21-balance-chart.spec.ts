import {
  amountIn,
  calcBtn,
  calculateLoan,
  currencySel,
  expect,
  LOANS,
  open,
  rateIn,
  tenureIn,
  test,
  unitSel,
} from './fixtures'
import { allFigures, expectTooltip, figureNamed, SUMMARY } from './visual-helpers'

test.describe('S-21 Balance over time', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-21.1] L-A shows the Balance over time chart and its summary sentence', async ({
    page,
  }) => {
    await expect(page.getByText('Balance over time', { exact: true })).toHaveCount(0)
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText('Balance over time', { exact: true })).toBeVisible()
    const figure = figureNamed(page, SUMMARY.balanceA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.balanceA, { exact: true })).toBeVisible()
    await expect(figure.locator('[data-series="balance"]').first()).toBeVisible()
    await expect(figure.locator('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  test('[AC-21.2] L-A: hovering month 6 shows the tooltip "Month 6: Rs 514,921.05"', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectTooltip(page, figureNamed(page, SUMMARY.balanceA), 6, 12, 'Month 6: Rs 514,921.05')
  })

  test('[AC-21.3] L-MAX: the chart is shown and every chart plus the 1,200th row is in the DOM within 1 second of Calculate', async ({
    page,
  }) => {
    await amountIn(page).fill(LOANS.MAX.amount)
    await rateIn(page).fill(LOANS.MAX.rate)
    await tenureIn(page).fill(LOANS.MAX.tenure)
    await expect(calcBtn(page)).toBeEnabled()
    await expect(allFigures(page)).toHaveCount(0)

    const elapsed = await page.evaluate(
      () =>
        new Promise<number>((resolve, reject) => {
          const button = Array.from(document.querySelectorAll('button')).find(
            (b) => (b.textContent ?? '').trim() === 'Calculate',
          )
          if (!button) {
            reject(new Error('Calculate button not found'))
            return
          }
          // the schedule's 1,200th data row AND all four chart figures
          const done = () =>
            Array.from(document.querySelectorAll('table')).some(
              (t) => (t.tBodies[0]?.rows.length ?? 0) >= 1200,
            ) && document.querySelectorAll('figure').length >= 4
          const observer = new MutationObserver(() => {
            if (done()) {
              observer.disconnect()
              resolve(performance.now() - start)
            }
          })
          observer.observe(document.body, { childList: true, subtree: true })
          setTimeout(() => {
            observer.disconnect()
            reject(new Error('The 1,200th row and the four charts did not appear within 10 s'))
          }, 10_000)
          const start = performance.now()
          button.click()
          if (done()) {
            observer.disconnect()
            resolve(performance.now() - start)
          }
        }),
    )
    expect(
      elapsed,
      'ms from Calculate click to the 1,200th row and all charts in the DOM',
    ).toBeLessThanOrEqual(1000)
    await expect(allFigures(page)).toHaveCount(4)
    await expect(page.getByText('Balance over time', { exact: true })).toBeVisible()
    // {n} is a count: "1200" or "1,200" are both accepted (the spec does not say; see the report)
    await expect(
      allFigures(page).filter({
        hasText:
          /The balance falls from Rs 1,000,000,000,000,000\.00 to Rs 0\.00 over 1,?200 months\./,
      }),
    ).toHaveCount(1)
  })

  test('[SPEC-§7] hovering month 1 and month 12 shows their balances', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    const figure = figureNamed(page, SUMMARY.balanceA)
    await expectTooltip(page, figure, 1, 12, 'Month 1: Rs 921,151.21')
    await expectTooltip(page, figure, 12, 12, 'Month 12: Rs 0.00')
  })

  test('[SPEC-§7] a 1-month loan says "over 1 month." (singular)', async ({ page }) => {
    await calculateLoan(page, LOANS.D)
    await expect(figureNamed(page, SUMMARY.balanceD)).toBeVisible()
  })

  test('[SPEC-§7] L-B says "over 60 months." for a tenure entered in years', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(figureNamed(page, SUMMARY.balanceB)).toBeVisible()
  })

  test('[SPEC-§7] USD: the balance sentence and tooltip use the $ symbol', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await unitSel(page).selectOption({ label: 'Years' })
    await calculateLoan(page, LOANS.A)
    const figure = figureNamed(
      page,
      'The balance falls from $1,000,000.00 to $0.00 over 12 months.',
    )
    await expect(figure).toBeVisible()
    await expectTooltip(page, figure, 6, 12, 'Month 6: $514,921.05')
  })
})
