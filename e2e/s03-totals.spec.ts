import {
  calculateLoan,
  checkScheduleArithmetic,
  cents,
  expect,
  expectSummary,
  LOANS,
  open,
  readSchedule,
  summary,
  test,
} from './fixtures'

test.describe('S-3 Total interest and total amount payable', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-3.1] L-A totals', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 66,185.45')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 1,066,185.45')
  })

  test('[AC-3.2] L-B totals', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 1,309,014.14')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 3,809,014.14')
  })

  test('[AC-3.3] L-C totals at 0%', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 0.00')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 120,000.00')
  })

  test('[AC-3.4] L-MIN totals', async ({ page }) => {
    await calculateLoan(page, LOANS.MIN)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 0.01')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 1,000.01')
  })

  test('[AC-3.5] L-MAX totals are shown in full', async ({ page }) => {
    await calculateLoan(page, LOANS.MAX)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 19,000,000,061.79')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 20,000,000,061.79')
    for (const name of ['Monthly payment', 'Total interest', 'Total amount payable'] as const) {
      const text = (await summary(page, name).textContent()) ?? ''
      expect(text).not.toMatch(/[eE]\+?\d|…|\.\.\./)
    }
  })

  // The property test over random inputs lives in src/domain. This checks the same identities on
  // what the user actually sees, using integer cents.
  for (const key of ['A', 'B', 'C', 'D', 'MIN', 'Z3'] as const) {
    test(`[AC-3.6] on-screen totals reconcile with the schedule columns (L-${key})`, async ({
      page,
    }) => {
      const loan = LOANS[key]
      await calculateLoan(page, loan)
      await expectSummary(page, loan)
      const rows = await readSchedule(page)
      const sums = checkScheduleArithmetic(rows, loan, loan.monthly)
      const shownInterest = cents((await summary(page, 'Total interest').textContent()) ?? '')
      const shownTotal = cents((await summary(page, 'Total amount payable').textContent()) ?? '')
      expect(sums.sumInterest).toBe(shownInterest)
      expect(sums.sumPayment).toBe(shownTotal)
      expect(loan.amountCents + shownInterest).toBe(shownTotal)
    })
  }
})
