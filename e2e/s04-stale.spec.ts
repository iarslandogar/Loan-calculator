import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectSummary,
  LOANS,
  open,
  rateIn,
  scheduleTable,
  selectedText,
  summary,
  tenureIn,
  test,
  themeSel,
  unitSel,
  expectTheme,
} from './fixtures'

async function expectStale(page: import('@playwright/test').Page) {
  await expect(page.getByText(COPY.stale, { exact: true })).toBeVisible()
  await expect(summary(page, 'Monthly payment')).toHaveCount(0)
  await expect(page.getByRole('definition')).toHaveCount(0)
  await expect(scheduleTable(page)).toHaveCount(0)
}

test.describe('S-4 Results always match the inputs on screen', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await expect(scheduleTable(page)).toBeVisible()
  })

  test('[AC-4.1] changing the amount, rate or tenure hides the results', async ({ page }) => {
    await amountIn(page).fill('1000001')
    await expectStale(page)
    await amountIn(page).fill('1000000')
    await calculate(page)
    await expectSummary(page, LOANS.A)

    await rateIn(page).fill('13')
    await expectStale(page)
    await rateIn(page).fill('12')
    await calculate(page)
    await expectSummary(page, LOANS.A)

    await tenureIn(page).fill('2')
    await expectStale(page)
  })

  test('[AC-4.2] changing the unit hides the results and keeps the tenure number', async ({
    page,
  }) => {
    await unitSel(page).selectOption({ label: 'Months' })
    await expectStale(page)
    await expect(tenureIn(page)).toHaveValue('1')
    expect(await selectedText(unitSel(page))).toBe('Months')
  })

  test('[AC-4.3] calculating after a change shows new results and removes the message', async ({
    page,
  }) => {
    await amountIn(page).fill('2500000')
    await rateIn(page).fill('18')
    await tenureIn(page).fill('5')
    await expectStale(page)
    await calculate(page)
    await expectSummary(page, LOANS.B)
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })

  test('[AC-4.4] changing currency or theme keeps the results visible', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(scheduleTable(page)).toBeVisible()
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)

    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(scheduleTable(page)).toBeVisible()
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })
})
