import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectFieldClean,
  expectFieldError,
  expectNoResults,
  expectSummary,
  expectTheme,
  fillLoan,
  historyItems,
  LOANS,
  open,
  rateIn,
  resetBtn,
  selectedText,
  tenureIn,
  test,
  themeSel,
  unitSel,
} from './fixtures'

async function expectPristine(page: import('@playwright/test').Page) {
  await expect(amountIn(page)).toHaveValue('')
  await expect(rateIn(page)).toHaveValue('')
  await expect(tenureIn(page)).toHaveValue('')
  expect(await selectedText(unitSel(page))).toBe('Years')
  await expectNoResults(page)
  await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  await expectFieldClean(amountIn(page))
  await expectFieldClean(rateIn(page))
  await expectFieldClean(tenureIn(page))
  await expect(amountIn(page)).toBeFocused()
}

test.describe('S-9 Reset', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-9.1] Reset empties the form from the results, stale and error states', async ({
    page,
  }) => {
    // From results.
    await calculateLoan(page, { ...LOANS.A, unit: 'Months', tenure: '12' })
    await expectSummary(page, LOANS.A)
    await resetBtn(page).click()
    await expectPristine(page)

    // From the stale state.
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await unitSel(page).selectOption({ label: 'Months' })
    await expect(page.getByText(COPY.stale, { exact: true })).toBeVisible()
    await resetBtn(page).click()
    await expectPristine(page)

    // From error messages.
    await fillLoan(page, { amount: 'abc', rate: '99', tenure: 'x', unit: 'Months' })
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectFieldError(rateIn(page), COPY.rateRange)
    await expectFieldError(tenureIn(page), COPY.tenureWhole)
    await resetBtn(page).click()
    await expectPristine(page)
  })

  test('[AC-9.2] Reset leaves currency, theme and saved calculations alone', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)

    await resetBtn(page).click()

    await expectNoResults(page)
    expect(await selectedText(currencySel(page))).toBe('USD ($)')
    await expect(page.getByLabel('Loan amount ($)', { exact: true })).toBeVisible()
    expect(await selectedText(themeSel(page))).toBe('Dark')
    await expectTheme(page, 'dark')
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')
    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')
  })

  test('[AC-9.3] Reset on an empty form changes nothing and shows no error', async ({ page }) => {
    await expect(amountIn(page)).toHaveValue('')
    await resetBtn(page).click()
    await expect(amountIn(page)).toHaveValue('')
    await expect(rateIn(page)).toHaveValue('')
    await expect(tenureIn(page)).toHaveValue('')
    expect(await selectedText(unitSel(page))).toBe('Years')
    await expectFieldClean(amountIn(page))
    await expectFieldClean(rateIn(page))
    await expectFieldClean(tenureIn(page))
    await expectNoResults(page)
    await expect(page.getByText(COPY.amountRequired, { exact: true })).toHaveCount(0)
  })
})
