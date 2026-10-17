import {
  amountIn,
  blockStorage,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectSummary,
  fillLoan,
  fixClock,
  HISTORY_KEY,
  historyItems,
  historyList,
  LOANS,
  open,
  rateIn,
  readStored,
  restoreBtn,
  scheduleTable,
  seedHistory,
  seedRaw,
  selectedText,
  summary,
  tenureIn,
  test,
  unitSel,
  zeroRateEntry,
  zeroRateLine1,
} from './fixtures'

test.describe('S-11 Recall earlier calculations', () => {
  test('[AC-11.1] with nothing saved the area says so', async ({ page }) => {
    await open(page)
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })

  test('[AC-11.2] @smoke an entry shows three lines with the saved time (20:45, 17 Oct 2026)', async ({
    page,
  }) => {
    await fixClock(page)
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    const item = historyItems(page).first()
    await expect(item).toContainText('Rs 1,000,000.00 at 12% for 1 year')
    await expect(item).toContainText('Rs 88,848.79 per month')
    await expect(item).toContainText('17 Oct 2026, 20:45')
    // The three lines come in this order.
    const lines = (await item.innerText())
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '' && l !== 'Restore' && l !== 'Delete')
    expect(lines).toEqual([
      'Rs 1,000,000.00 at 12% for 1 year',
      'Rs 88,848.79 per month',
      '17 Oct 2026, 20:45',
    ])
    // Accessible names of the entry buttons (D-29).
    await expect(
      page.getByRole('button', {
        name: 'Restore Rs 1,000,000.00 at 12% for 1 year, saved 17 Oct 2026, 20:45',
        exact: true,
      }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', {
        name: 'Delete Rs 1,000,000.00 at 12% for 1 year, saved 17 Oct 2026, 20:45',
        exact: true,
      }),
    ).toBeVisible()
  })

  test('[AC-11.3] a calculation that shows errors saves nothing', async ({ page }) => {
    await open(page)
    await calculate(page)
    await expect(page.getByText(COPY.amountRequired, { exact: true })).toBeVisible()
    await fillLoan(page, { amount: 'abc', rate: '12', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expect(page.getByText(COPY.amountNan, { exact: true })).toBeVisible()
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
    expect(await readStored(page, HISTORY_KEY)).toBeNull()
  })

  test('[AC-11.4] the newest calculation is listed first', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')
    await expect(historyItems(page).nth(0)).toContainText('Rs 63,483.57 per month')
    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')
  })

  test('[AC-11.5] repeating the newest calculation adds nothing', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await calculate(page)
    await expectSummary(page, LOANS.A)
    await calculate(page)
    await expectSummary(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
  })

  test('[AC-11.5] repeating an older calculation adds a new entry on top', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(3)
    await expect(historyItems(page).nth(0)).toContainText(LOANS.A.line1)
    await expect(historyItems(page).nth(1)).toContainText(LOANS.B.line1)
    await expect(historyItems(page).nth(2)).toContainText(LOANS.A.line1)
  })

  test('[AC-11.5] the same loan in another currency is a new entry', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await calculate(page)
    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText('$1,000,000.00 at 12% for 1 year')
    await expect(historyItems(page).nth(0)).toContainText('$88,848.79 per month')
    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')
  })

  test('[AC-11.6] a 21st different calculation drops the oldest of 20 entries', async ({
    page,
  }) => {
    // Newest first; k = 1 is the newest and k = 20 the oldest.
    await seedHistory(
      page,
      Array.from({ length: 20 }, (_, i) => zeroRateEntry(i + 1)),
    )
    await expect(historyItems(page)).toHaveCount(20)
    await expect(restoreBtn(page, zeroRateLine1(20))).toBeVisible()

    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(20)
    await expect(historyItems(page).first()).toContainText(LOANS.A.line1)
    await expect(historyItems(page).nth(1)).toContainText(zeroRateLine1(1))
    await expect(historyItems(page).last()).toContainText(zeroRateLine1(19))
    await expect(restoreBtn(page, zeroRateLine1(20))).toHaveCount(0)
    const stored = JSON.parse((await readStored(page, HISTORY_KEY)) ?? '[]') as unknown[]
    expect(stored).toHaveLength(20)
  })

  test('[AC-11.7] saved entries survive a reload in the same order', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await calculateLoan(page, LOANS.C)
    await expect(historyItems(page)).toHaveCount(3)
    const before = await historyItems(page).allInnerTexts()
    await page.reload()
    await expect(historyItems(page)).toHaveCount(3)
    expect(await historyItems(page).allInnerTexts()).toEqual(before)
    await expect(historyItems(page).nth(0)).toContainText(LOANS.C.line1)
    await expect(historyItems(page).nth(2)).toContainText(LOANS.A.line1)
  })

  test('[AC-11.8] Restore refills the form, switches currency, shows results, adds no entry', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(1)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await fillLoan(page, { amount: '5000', rate: '7', tenure: '30', unit: 'Months' })

    await restoreBtn(page, LOANS.B.line1).click()

    await expect(amountIn(page)).toHaveValue('2500000')
    await expect(rateIn(page)).toHaveValue('18')
    await expect(tenureIn(page)).toHaveValue('5')
    expect(await selectedText(unitSel(page))).toBe('Years')
    expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
    await expectSummary(page, LOANS.B)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(61)
    await expect(historyItems(page)).toHaveCount(1)
    await expect(restoreBtn(page, LOANS.B.line1)).toBeFocused()
  })

  test('[AC-11.9] with storage blocked, calculations work and the panel says why', async ({
    page,
  }) => {
    await blockStorage(page, 'methods')
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await expect(page.getByText(COPY.historyUnavailable, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })

  for (const [label, raw] of [
    ['not valid JSON', 'this is {not json'],
    ['valid JSON but not a list', '{"a":1}'],
    ['a list holding null', '[null]'],
  ] as const) {
    test(`[AC-11.10] stored history that is ${label} is treated as empty and saving still works`, async ({
      page,
    }) => {
      await seedRaw(page, { [HISTORY_KEY]: raw })
      await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
      await expect(page.getByText(COPY.historyUnavailable, { exact: true })).toHaveCount(0)
      await calculateLoan(page, LOANS.A)
      await expectSummary(page, LOANS.A)
      await expect(historyItems(page)).toHaveCount(1)
      await page.reload()
      await expect(historyItems(page)).toHaveCount(1)
      await expect(historyItems(page).first()).toContainText(LOANS.A.line1)
    })
  }

  test('[AC-11.10] only the valid entries of a mixed stored list are shown, in stored order', async ({
    page,
  }) => {
    await seedHistory(page, [
      zeroRateEntry(1),
      { foo: 'bar' },
      zeroRateEntry(3, { monthlyPayment: '999.99' }),
      'a string',
      zeroRateEntry(2),
      null,
    ])
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText(zeroRateLine1(1))
    await expect(historyItems(page).nth(0)).toContainText('Rs 1,000.00 per month')
    await expect(historyItems(page).nth(1)).toContainText(zeroRateLine1(2))
    await expect(historyItems(page).nth(1)).toContainText('Rs 2,000.00 per month')
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toHaveCount(0)
    await expect(historyList(page)).toBeVisible()
  })

  test('[AC-11.11] entries describe the rate without trailing zeros and the tenure with its unit', async ({
    page,
  }) => {
    await open(page)
    const cases: { v: Parameters<typeof calculateLoan>[1]; line1: string }[] = [
      { v: LOANS.A, line1: 'Rs 1,000,000.00 at 12% for 1 year' },
      { v: LOANS.B, line1: 'Rs 2,500,000.00 at 18% for 5 years' },
      { v: LOANS.MIN, line1: 'Rs 1,000.00 at 0.01% for 1 month' },
      { v: LOANS.C, line1: 'Rs 120,000.00 at 0% for 12 months' },
      {
        v: { amount: '100000', rate: '21.50', tenure: '24', unit: 'Months' },
        line1: 'Rs 100,000.00 at 21.5% for 24 months',
      },
    ]
    for (const c of cases) {
      await calculateLoan(page, c.v)
      await expect(historyItems(page).first()).toContainText(c.line1)
    }
    await expect(historyItems(page)).toHaveCount(cases.length)
  })
})
