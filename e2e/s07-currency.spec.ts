import {
  amountIn,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectSummary,
  historyItems,
  LOANS,
  open,
  scheduleTable,
  selectedText,
  summary,
  test,
} from './fixtures'

test.describe('S-7 Currency', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-7.1] first visit defaults to PKR (Rs)', async ({ page }) => {
    expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
    await expect(page.getByLabel('Loan amount (Rs)', { exact: true })).toBeVisible()
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-7.2] @smoke switching to USD changes symbols only and keeps the results', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    const rowBefore = await scheduleTable(page)
      .getByRole('row')
      .nth(1)
      .getByRole('cell')
      .allTextContents()

    await currencySel(page).selectOption({ label: 'USD ($)' })

    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(summary(page, 'Total interest')).toHaveText('$66,185.45')
    await expect(summary(page, 'Total amount payable')).toHaveText('$1,066,185.45')
    await expect(scheduleTable(page).getByRole('columnheader')).toHaveText([
      'Month',
      'Payment ($)',
      'Interest ($)',
      'Principal ($)',
      'Balance ($)',
    ])
    await expect(page.getByLabel('Loan amount ($)', { exact: true })).toBeVisible()
    await expect(amountIn(page)).toHaveValue('1000000')
    const rowAfter = await scheduleTable(page)
      .getByRole('row')
      .nth(1)
      .getByRole('cell')
      .allTextContents()
    expect(rowAfter).toEqual(rowBefore)
    expect(rowAfter).toEqual(['1', '88,848.79', '10,000.00', '78,848.79', '921,151.21'])
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })

  test('[AC-7.3] the chosen currency survives a reload', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await page.reload()
    expect(await selectedText(currencySel(page))).toBe('USD ($)')
    await expect(page.getByLabel('Loan amount ($)', { exact: true })).toBeVisible()
  })

  test('[AC-7.4] the currency note is shown', async ({ page }) => {
    await expect(currencySel(page)).toBeVisible()
    await expect(page.getByText(COPY.currencyNote, { exact: true })).toBeVisible()
  })

  test('[AC-7.5] a saved PKR entry keeps its Rs amounts after switching to USD', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    const item = historyItems(page).first()
    await expect(item).toContainText('Rs 1,000,000.00 at 12% for 1 year')
    await expect(item).toContainText('Rs 88,848.79 per month')
    await expect(item).not.toContainText('$')
  })
})
