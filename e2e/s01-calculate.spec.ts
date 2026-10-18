import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectNoResults,
  expectSummary,
  fillLoan,
  LOANS,
  open,
  rateIn,
  readSchedule,
  selectedText,
  summary,
  tenureIn,
  test,
  unitSel,
} from './fixtures'

test.describe('S-1 Calculate the monthly payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-1.1] @smoke 1000000 at 12% for 1 year gives Rs 88,848.79', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-1.2] 12 months gives the same payment as 1 year', async ({ page }) => {
    await calculateLoan(page, { amount: '1000000', rate: '12', tenure: '12', unit: 'Months' })
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-1.3] L-B gives Rs 63,483.57', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 63,483.57')
  })

  test('[AC-1.4] a zero rate gives Rs 10,000.00 (L-C)', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 10,000.00')
  })

  test('[AC-1.5] a one-month loan gives Rs 100,833.33 (L-D)', async ({ page }) => {
    await calculateLoan(page, LOANS.D)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 100,833.33')
  })

  test('[AC-1.6] the smallest accepted values give Rs 10.00 (L-MIN)', async ({ page }) => {
    await calculateLoan(page, LOANS.MIN)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 10.00')
  })

  test('[AC-1.7] the largest accepted values give Rs 62,500,000,000,000.00 (L-MAX)', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.MAX)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 62,500,000,000,000.00')
  })

  test('[AC-1.8] thousands and lakh separators give the same result as AC-1.1', async ({
    page,
  }) => {
    for (const typed of ['1,000,000', '10,00,000']) {
      await calculateLoan(page, { ...LOANS.A, amount: typed })
      await expectSummary(page, LOANS.A)
      await expect(amountIn(page)).toHaveValue(typed)
    }
  })

  test('[AC-1.9] leading and trailing spaces are ignored', async ({ page }) => {
    await calculateLoan(page, { amount: ' 1000000 ', rate: ' 12 ', tenure: ' 1 ', unit: 'Years' })
    await expectSummary(page, LOANS.A)
  })

  test('[AC-1.10] a trailing percent sign on the rate is ignored', async ({ page }) => {
    await calculateLoan(page, { ...LOANS.A, rate: '12%' })
    await expectSummary(page, LOANS.A)
  })

  test('[AC-1.11] calculating again without changes shows the same results', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    const before = await readSchedule(page)
    await calculate(page)
    await expectSummary(page, LOANS.A)
    expect(await readSchedule(page)).toEqual(before)
    expect(before).toHaveLength(12)
  })

  test('[AC-1.12] first visit: Years selected, inputs empty, idle text, no results', async ({
    page,
  }) => {
    expect(await selectedText(unitSel(page))).toBe('Years')
    await expect(amountIn(page)).toHaveValue('')
    await expect(rateIn(page)).toHaveValue('')
    await expect(tenureIn(page)).toHaveValue('')
    await expectNoResults(page)
    await expect(page.getByText(COPY.idle, { exact: true })).toBeVisible()
    // The form really is there (guards against an empty page passing the negative checks).
    await expect(currencySel(page)).toBeVisible()
    await fillLoan(page, LOANS.A)
  })
})
