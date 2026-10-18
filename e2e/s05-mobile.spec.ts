import {
  amountIn,
  box,
  calcBtn,
  calculateLoan,
  COPY,
  expect,
  LOANS,
  open,
  pageOverflowX,
  rateIn,
  scheduleRegion,
  scheduleTable,
  summary,
  tenureIn,
  test,
} from './fixtures'

test.describe('S-5 Phone use at 360 x 740', () => {
  test.use({ viewport: { width: 360, height: 740 } })

  test('[AC-5.1] no horizontal page scroll on load or after L-MAX', async ({ page }) => {
    await open(page)
    await expect(calcBtn(page)).toBeVisible()
    let m = await pageOverflowX(page)
    expect(m.doc).toBeLessThanOrEqual(m.view)
    expect(m.body).toBeLessThanOrEqual(m.view)

    await calculateLoan(page, LOANS.MAX)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(1201)
    m = await pageOverflowX(page)
    expect(m.view).toBe(360)
    expect(m.doc).toBeLessThanOrEqual(360)
    expect(m.body).toBeLessThanOrEqual(360)
  })

  test('[AC-5.2] every input, select and button is at least 44 x 44 and inside the viewport', async ({
    page,
  }) => {
    await open(page)
    // After a calculation so that the history Restore and Delete buttons exist too.
    await calculateLoan(page, LOANS.A)
    await expect(scheduleTable(page)).toBeVisible()

    const groups = [
      { role: 'textbox' as const, expected: 3 },
      { role: 'combobox' as const, expected: 3 },
      { role: 'button' as const, expected: 5 },
    ]
    for (const g of groups) {
      const all = await page.getByRole(g.role).all()
      expect(all.length, `number of ${g.role} elements`).toBeGreaterThanOrEqual(g.expected)
      for (const el of all) {
        const b = await box(el)
        const label = (await el.getAttribute('aria-label')) ?? (await el.textContent()) ?? g.role
        expect(b.width, `${g.role} "${label}" width`).toBeGreaterThanOrEqual(44)
        expect(b.height, `${g.role} "${label}" height`).toBeGreaterThanOrEqual(44)
        expect(b.x, `${g.role} "${label}" left edge`).toBeGreaterThanOrEqual(0)
        expect(b.x + b.width, `${g.role} "${label}" right edge`).toBeLessThanOrEqual(360)
      }
    }
  })

  test('[AC-5.3] the schedule scrolls inside its own area with a sticky header', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.B)
    const region = scheduleRegion(page)
    await expect(region).toBeVisible()
    const dims = await region.evaluate((el) => ({ sh: el.scrollHeight, ch: el.clientHeight }))
    expect(dims.sh).toBeGreaterThan(dims.ch)

    const header = scheduleTable(page).getByRole('columnheader').first()
    const firstRow = scheduleTable(page).getByRole('row').nth(1)
    const headerBefore = await box(header)
    const rowBefore = await box(firstRow)

    await region.evaluate((el) => {
      el.scrollTop = 400
    })
    await expect.poll(() => region.evaluate((el) => el.scrollTop)).toBeGreaterThan(100)

    const headerAfter = await box(header)
    const rowAfter = await box(firstRow)
    expect(Math.abs(headerAfter.y - headerBefore.y)).toBeLessThanOrEqual(1)
    expect(rowAfter.y).toBeLessThan(rowBefore.y - 100)
    // The first data row has scrolled out from under the header.
    expect(rowAfter.y + rowAfter.height).toBeLessThanOrEqual(headerAfter.y + headerAfter.height + 1)
  })

  test('[AC-5.6] every L-MAX summary amount is fully visible', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.MAX)
    const expected = {
      'Monthly payment': 'Rs 62,500,000,000,000.00',
      'Total interest': 'Rs 74,000,000,000,000,003.34',
      'Total amount payable': 'Rs 75,000,000,000,000,003.34',
    } as const
    for (const name of Object.keys(expected) as (keyof typeof expected)[]) {
      const dd = summary(page, name)
      await expect(dd).toHaveText(expected[name])
      const b = await box(dd)
      expect(b.x).toBeGreaterThanOrEqual(0)
      expect(b.x + b.width).toBeLessThanOrEqual(360)
      const clip = await dd.evaluate((el) => {
        let node: Element | null = el
        while (node && node !== document.documentElement) {
          if (
            node.scrollWidth > node.clientWidth + 1 ||
            node.scrollHeight > node.clientHeight + 1
          ) {
            const overflow = getComputedStyle(node).overflow
            if (overflow !== 'visible') return `${node.tagName} clips (overflow: ${overflow})`
          }
          node = node.parentElement
        }
        const style = getComputedStyle(el)
        return style.textOverflow === 'ellipsis' ? 'text-overflow: ellipsis' : ''
      })
      expect(clip, `${name} must not be clipped`).toBe('')
    }
  })
})

test.describe('S-5 Layout and keypads', () => {
  test('[AC-5.4] decimal keypad for amount and rate, numeric for tenure', async ({ page }) => {
    await open(page)
    await expect(amountIn(page)).toHaveAttribute('inputmode', 'decimal')
    await expect(rateIn(page)).toHaveAttribute('inputmode', 'decimal')
    await expect(tenureIn(page)).toHaveAttribute('inputmode', 'numeric')
  })

  test.describe('wide', () => {
    test.use({ viewport: { width: 1280, height: 800 } })

    test('[AC-5.5] at 1280 px the form and results sit side by side', async ({ page }) => {
      await open(page)
      const idle = page.getByText(COPY.idle, { exact: true })
      await expect(idle).toBeVisible()
      const form = await box(amountIn(page))
      const calc = await box(calcBtn(page))
      const res = await box(idle)
      expect(res.x).toBeGreaterThan(form.x + form.width)
      // They overlap vertically: the results start above the bottom of the form.
      expect(res.y).toBeLessThan(calc.y + calc.height)
    })
  })

  test.describe('tablet', () => {
    test.use({ viewport: { width: 768, height: 1024 } })

    test('[AC-5.5] at 768 px they are stacked with the form above the results', async ({
      page,
    }) => {
      await open(page)
      const idle = page.getByText(COPY.idle, { exact: true })
      await expect(idle).toBeVisible()
      const calc = await box(calcBtn(page))
      const res = await box(idle)
      expect(res.y).toBeGreaterThanOrEqual(calc.y + calc.height)
    })
  })

  test.describe('phone', () => {
    test.use({ viewport: { width: 360, height: 740 } })

    test('[AC-5.5] at 360 px they are stacked with the form above the results', async ({
      page,
    }) => {
      await open(page)
      const idle = page.getByText(COPY.idle, { exact: true })
      await expect(idle).toBeVisible()
      const calc = await box(calcBtn(page))
      const res = await box(idle)
      expect(res.y).toBeGreaterThanOrEqual(calc.y + calc.height)
    })
  })
})
