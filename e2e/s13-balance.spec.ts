import {
  calculateLoan,
  checkScheduleArithmetic,
  expect,
  LOANS,
  open,
  readSchedule,
  scheduleTable,
  test,
} from './fixtures'

const rowCells = (page: import('@playwright/test').Page, n: number) =>
  scheduleTable(page).getByRole('row').nth(n).getByRole('cell')

test.describe('S-13 Balance after each payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-13.1] L-A balance is 514,921.05 after month 6 and 0.00 after month 12', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(rowCells(page, 6).nth(4)).toHaveText('514,921.05')
    await expect(rowCells(page, 12).nth(4)).toHaveText('0.00')
  })

  test('[AC-13.2] L-B entered as 5 Years has exactly 60 rows ending at 0.00', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(61)
    expect(await readSchedule(page)).toHaveLength(60)
    await expect(rowCells(page, 60)).toHaveText([
      '60',
      /^[\d,]+\.\d{2}$/,
      /^[\d,]+\.\d{2}$/,
      /^[\d,]+\.\d{2}$/,
      '0.00',
    ])
  })

  // The property test over random inputs lives in src/domain; these check the same rules on the
  // numbers a user sees, with integer cents.
  for (const key of ['A', 'B', 'C', 'D', 'MIN', 'Z3', 'MAX'] as const) {
    test(`[AC-13.3] balances reconcile row by row and end at 0.00 (L-${key})`, async ({ page }) => {
      const loan = LOANS[key]
      await calculateLoan(page, loan)
      await expect(scheduleTable(page).getByRole('row')).toHaveCount(loan.months + 1)
      const rows = await readSchedule(page)
      checkScheduleArithmetic(rows, loan, loan.monthly)
      expect(rows[rows.length - 1]?.[4]).toBe('0.00')
    })
  }

  test('[AC-13.3] the same tenure as years or months gives the same schedule', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    const years = await readSchedule(page)
    await calculateLoan(page, { ...LOANS.A, tenure: '12', unit: 'Months' })
    expect(await readSchedule(page)).toEqual(years)
    expect(years).toHaveLength(12)
  })
})
