import {
  amountIn,
  calculateLoan,
  cents,
  currencySel,
  expect,
  LOANS,
  open,
  readSchedule,
  tenureIn,
  rateIn,
  test,
  unitSel,
  calcBtn,
} from './fixtures'
import {
  expectLegendPrincipalThenInterest,
  expectTooltip,
  fmtCents,
  yearlyFigure,
  yearlyTable,
  allFigures,
} from './visual-helpers'

const COLUMNS = ['Year', 'Interest (Rs)', 'Principal (Rs)', 'Balance (Rs)']

/** All cells (th or td) of body row n (1-based) of the yearly table. */
const yearRow = (page: import('@playwright/test').Page, n: number) =>
  yearlyTable(page).getByRole('row').nth(n).locator('th, td')

test.describe('S-19 Yearly summary', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-19.1] L-B: 5 rows, each interest and principal equal the sums of the matching 12 monthly rows', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    await expect(page.getByRole('heading', { name: 'Yearly summary', level: 3 })).toBeVisible()
    // header row + 5 year rows
    await expect(yearlyTable(page).getByRole('row')).toHaveCount(6)
    const monthly = await readSchedule(page)
    expect(monthly).toHaveLength(60)
    for (let y = 0; y < 5; y++) {
      const group = monthly.slice(y * 12, y * 12 + 12)
      const interest = group.reduce((a, r) => a + cents(r[2] ?? ''), 0n)
      const principal = group.reduce((a, r) => a + cents(r[3] ?? ''), 0n)
      const balance = group[11]?.[4] ?? ''
      await expect(yearRow(page, y + 1)).toHaveText([
        String(y + 1),
        fmtCents(interest),
        fmtCents(principal),
        balance,
      ])
    }
  })

  test('[AC-19.2] L-B: columns Year, Interest (Rs), Principal (Rs), Balance (Rs); first and last rows read the reference figures', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    const table = yearlyTable(page)
    await expect(table.getByRole('columnheader')).toHaveText(COLUMNS)
    await expect(yearRow(page, 1)).toHaveText(['1', '422,945.63', '338,857.21', '2,161,142.79'])
    await expect(yearRow(page, 5)).toHaveText(['5', '69,355.47', '692,447.31', '0.00'])
  })

  test('[AC-19.3] 100000 at 10% for 18 months: 2 rows, the second reads 2 | 1,028.07 | 35,006.16 | 0.00', async ({
    page,
  }) => {
    await calculateLoan(page, { amount: '100000', rate: '10', tenure: '18', unit: 'Months' })
    await expect(yearlyTable(page).getByRole('row')).toHaveCount(3)
    await expect(yearRow(page, 2)).toHaveText(['2', '1,028.07', '35,006.16', '0.00'])
  })

  test('[AC-19.4] L-B: the yearly chart has a hover bar for each of the 5 years and a Principal then Interest legend', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    await expect(allFigures(page)).toHaveCount(4)
    const figure = yearlyFigure(page)
    await expect(figure).toBeVisible()
    await expectLegendPrincipalThenInterest(figure)
    await expect(figure.locator('[data-series="principal"]').first()).toBeVisible()
    await expect(figure.locator('[data-series="interest"]').first()).toBeVisible()
    await expect(figure.locator('svg')).toHaveAttribute('aria-hidden', 'true')
    // one bar per year: each of the 5 equal slots of the hit area answers with its own year
    for (let year = 1; year <= 5; year++) {
      await expectTooltip(
        page,
        figure,
        year,
        5,
        new RegExp(`^Year ${year}: principal Rs [\\d,]+\\.\\d{2}, interest Rs [\\d,]+\\.\\d{2}$`),
      )
    }
  })

  test('[SPEC-§7] L-B: the yearly tooltips for year 1 and year 5 carry the table figures', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    const figure = yearlyFigure(page)
    await expectTooltip(
      page,
      figure,
      1,
      5,
      'Year 1: principal Rs 338,857.21, interest Rs 422,945.63',
    )
    await expectTooltip(
      page,
      figure,
      5,
      5,
      'Year 5: principal Rs 692,447.31, interest Rs 69,355.47',
    )
  })

  test('[SPEC-§7] USD: the yearly columns show ($)', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await calculateLoan(page, LOANS.B)
    await expect(yearlyTable(page).getByRole('columnheader')).toHaveText([
      'Year',
      'Interest ($)',
      'Principal ($)',
      'Balance ($)',
    ])
  })

  test('[SPEC-§3.1.1] L-D (1 month) has a single yearly row of 1 month', async ({ page }) => {
    await calculateLoan(page, LOANS.D)
    await expect(yearlyTable(page).getByRole('row')).toHaveCount(2)
    await expect(yearRow(page, 1)).toHaveText(['1', '833.33', '100,000.00', '0.00'])
  })

  test('[SPEC-§3.1.1] L-MAX has 100 yearly rows ending at year 100 with balance 0.00', async ({
    page,
  }) => {
    await amountIn(page).fill(LOANS.MAX.amount)
    await rateIn(page).fill(LOANS.MAX.rate)
    await tenureIn(page).fill(LOANS.MAX.tenure)
    await unitSel(page).selectOption({ label: LOANS.MAX.unit })
    await calcBtn(page).click()
    await expect(yearlyTable(page).getByRole('row')).toHaveCount(101)
    const last = yearRow(page, 100)
    await expect(last.first()).toHaveText('100')
    await expect(last.nth(3)).toHaveText('0.00')
  })
})
