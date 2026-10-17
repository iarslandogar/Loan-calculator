import {
  calcBtn,
  calculateLoan,
  checkScheduleArithmetic,
  COPY,
  expect,
  LOANS,
  open,
  readSchedule,
  scheduleTable,
  summary,
  test,
} from './fixtures'

const rowCells = (page: import('@playwright/test').Page, n: number) =>
  scheduleTable(page).getByRole('row').nth(n).getByRole('cell')

test.describe('S-10 Repayment schedule', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-10.1] L-A shows a 12-row Repayment schedule with the five columns', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    const table = scheduleTable(page)
    await expect(table).toBeVisible()
    await expect(table.getByRole('columnheader')).toHaveText([
      'Month',
      'Payment (Rs)',
      'Interest (Rs)',
      'Principal (Rs)',
      'Balance (Rs)',
    ])
    // One header row plus 12 data rows.
    await expect(table.getByRole('row')).toHaveCount(13)
    expect(await readSchedule(page)).toHaveLength(12)
  })

  test('[AC-10.2] L-A row 1', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(rowCells(page, 1)).toHaveText([
      '1',
      '88,848.79',
      '10,000.00',
      '78,848.79',
      '921,151.21',
    ])
  })

  test('[AC-10.3] L-A row 12', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(rowCells(page, 12)).toHaveText(['12', '88,848.78', '879.69', '87,969.09', '0.00'])
  })

  test('[AC-10.4][AC-10.5] every L-A and L-B row satisfies the interest and payment rules', async ({
    page,
  }) => {
    for (const loan of [LOANS.A, LOANS.B]) {
      await calculateLoan(page, loan)
      await expect(summary(page, 'Monthly payment')).toHaveText(loan.monthly)
      checkScheduleArithmetic(await readSchedule(page), loan, loan.monthly)
    }
  })

  test('[AC-10.5] L-A payments are 88,848.78 in rows 9, 10 and 12 and 88,848.79 elsewhere', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    const rows = await readSchedule(page)
    expect(rows).toHaveLength(12)
    const payments = rows.map((r) => r[1])
    const low = new Set([9, 10, 12])
    payments.forEach((p, i) => {
      expect(p, `row ${i + 1} payment`).toBe(low.has(i + 1) ? '88,848.78' : '88,848.79')
    })
  })

  test('[AC-10.6] the rounding note shows for L-A and not for L-C', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText(COPY.rounding, { exact: true })).toBeVisible()
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 10,000.00')
    await expect(page.getByText(COPY.rounding, { exact: true })).toHaveCount(0)
  })

  test('[AC-10.7] L-Z3 rows', async ({ page }) => {
    await calculateLoan(page, LOANS.Z3)
    await expect(rowCells(page, 1)).toHaveText(['1', '333.33', '0.00', '333.33', '666.67'])
    await expect(rowCells(page, 2)).toHaveText(['2', '333.34', '0.00', '333.34', '333.33'])
    await expect(rowCells(page, 3)).toHaveText(['3', '333.33', '0.00', '333.33', '0.00'])
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(4)
  })

  test('[AC-10.8] L-MAX shows all 480 rows within 1 second of Calculate (timed in the page)', async ({
    page,
  }) => {
    await page.getByLabel(/^Loan amount/).fill(LOANS.MAX.amount)
    await page.getByLabel('Annual interest rate (%)', { exact: true }).fill(LOANS.MAX.rate)
    await page.getByLabel('Loan tenure', { exact: true }).fill(LOANS.MAX.tenure)
    await expect(calcBtn(page)).toBeEnabled()

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
          // header row + 480 data rows
          const done = () => document.querySelectorAll('table tr').length >= 481
          const observer = new MutationObserver(() => {
            if (done()) {
              observer.disconnect()
              resolve(performance.now() - start)
            }
          })
          observer.observe(document.body, { childList: true, subtree: true })
          setTimeout(() => {
            observer.disconnect()
            reject(new Error('The 480th row did not appear within 10 s'))
          }, 10_000)
          const start = performance.now()
          button.click()
          if (done()) {
            observer.disconnect()
            resolve(performance.now() - start)
          }
        }),
    )
    expect(elapsed, 'ms from Calculate click to the 480th row in the DOM').toBeLessThanOrEqual(1000)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(481)
    await expect(rowCells(page, 480)).toHaveText([
      '480',
      /^[\d,]+\.\d{2}$/,
      /^[\d,]+\.\d{2}$/,
      /^[\d,]+\.\d{2}$/,
      '0.00',
    ])
  })
})
