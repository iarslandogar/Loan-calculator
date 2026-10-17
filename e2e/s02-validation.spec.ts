import type { Page } from '@playwright/test'
import {
  amountIn,
  calcBtn,
  calculate,
  calculateLoan,
  COPY,
  expect,
  expectFieldClean,
  expectFieldError,
  expectNoResults,
  expectResultsShown,
  expectSummary,
  fillLoan,
  LOANS,
  open,
  rateIn,
  summary,
  tenureIn,
  test,
  unitSel,
} from './fixtures'

async function tryAmount(page: Page, amount: string) {
  await fillLoan(page, { amount, rate: '12', tenure: '1', unit: 'Years' })
  await calculate(page)
}

test.describe('S-2 Clear messages for invalid input', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-2.1] @smoke an empty form shows three messages, no results, focus on Loan amount', async ({
    page,
  }) => {
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountRequired)
    await expectFieldError(rateIn(page), COPY.rateRequired)
    await expectFieldError(tenureIn(page), COPY.tenureRequired)
    await expectNoResults(page)
    await expect(amountIn(page)).toBeFocused()
  })

  test('[AC-2.2] loan amount abc is not a number', async ({ page }) => {
    await tryAmount(page, 'abc')
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectNoResults(page)
  })

  test('[AC-2.3] scientific notation 1e6 is not a number', async ({ page }) => {
    await tryAmount(page, '1e6')
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectNoResults(page)
  })

  test('[AC-2.4] amounts 0, -500 and 999.99 are out of range', async ({ page }) => {
    for (const amount of ['0', '-500', '999.99']) {
      await tryAmount(page, amount)
      await expectFieldError(amountIn(page), COPY.amountRange)
      await expectNoResults(page)
    }
  })

  test('[AC-2.5] 1000000000.01 is out of range; 1000000000 is accepted', async ({ page }) => {
    await tryAmount(page, '1000000000.01')
    await expectFieldError(amountIn(page), COPY.amountRange)
    await expectNoResults(page)
    await tryAmount(page, '1000000000')
    await expectResultsShown(page)
    await expectFieldClean(amountIn(page))
  })

  test('[AC-2.6] 1000.555 has too many decimal places', async ({ page }) => {
    await tryAmount(page, '1000.555')
    await expectFieldError(amountIn(page), COPY.amountDecimals)
    await expectNoResults(page)
  })

  test('[AC-2.7] rates -1 and 50.01 are out of range; 0 and 50 are accepted', async ({ page }) => {
    for (const rate of ['-1', '50.01']) {
      await fillLoan(page, { amount: '1000000', rate, tenure: '1', unit: 'Years' })
      await calculate(page)
      await expectFieldError(rateIn(page), COPY.rateRange)
      await expectNoResults(page)
    }
    for (const rate of ['0', '50']) {
      await fillLoan(page, { amount: '1000000', rate, tenure: '1', unit: 'Years' })
      await calculate(page)
      await expectResultsShown(page)
      await expectFieldClean(rateIn(page))
    }
  })

  test('[AC-2.8] rate twelve is not a number; 12.345 has too many decimals', async ({ page }) => {
    await fillLoan(page, { amount: '1000000', rate: 'twelve', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expectFieldError(rateIn(page), COPY.rateNan)
    await fillLoan(page, { amount: '1000000', rate: '12.345', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expectFieldError(rateIn(page), COPY.rateDecimals)
    await expectNoResults(page)
  })

  test('[AC-2.9] tenure 2.5 years must be a whole number', async ({ page }) => {
    await fillLoan(page, { amount: '1000000', rate: '12', tenure: '2.5', unit: 'Years' })
    await calculate(page)
    await expectFieldError(tenureIn(page), COPY.tenureWhole)
    await expectNoResults(page)
  })

  test('[AC-2.10] tenure ranges: 1-40 years and 1-480 months', async ({ page }) => {
    for (const tenure of ['0', '41']) {
      await fillLoan(page, { amount: '1000000', rate: '12', tenure, unit: 'Years' })
      await calculate(page)
      await expectFieldError(tenureIn(page), COPY.tenureYears)
    }
    for (const tenure of ['0', '481']) {
      await fillLoan(page, { amount: '1000000', rate: '12', tenure, unit: 'Months' })
      await calculate(page)
      await expectFieldError(tenureIn(page), COPY.tenureMonths)
    }
    await fillLoan(page, { amount: '1000000', rate: '12', tenure: '40', unit: 'Years' })
    await calculate(page)
    await expectResultsShown(page)
    await expectFieldClean(tenureIn(page))
    await fillLoan(page, { amount: '1000000', rate: '12', tenure: '480', unit: 'Months' })
    await calculate(page)
    await expectResultsShown(page)
    await expectFieldClean(tenureIn(page))
  })

  test('[AC-2.11] two invalid fields show both messages and focus the first', async ({ page }) => {
    await fillLoan(page, { amount: 'abc', rate: '99', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectFieldError(rateIn(page), COPY.rateRange)
    await expectFieldClean(tenureIn(page))
    await expect(amountIn(page)).toBeFocused()
    await expectNoResults(page)
  })

  test('[AC-2.11] focus goes to the first invalid field in order amount, rate, tenure', async ({
    page,
  }) => {
    await fillLoan(page, { amount: '1000000', rate: 'x', tenure: 'y', unit: 'Years' })
    await calculate(page)
    await expect(rateIn(page)).toBeFocused()
    await fillLoan(page, { amount: '1000000', rate: '12', tenure: 'y', unit: 'Years' })
    await calculate(page)
    await expect(tenureIn(page)).toBeFocused()
  })

  test('[AC-2.12] invalid input after results removes the old results', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await amountIn(page).fill('abc')
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectNoResults(page)
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })

  test('[AC-2.13] typing in Loan amount clears only its own message', async ({ page }) => {
    await fillLoan(page, { amount: 'abc', rate: 'twelve', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectFieldError(rateIn(page), COPY.rateNan)
    await amountIn(page).fill('1000')
    await expectFieldClean(amountIn(page))
    await expectFieldError(rateIn(page), COPY.rateNan)
    await expect(page.getByText(COPY.amountNan, { exact: true })).toHaveCount(0)
  })

  test('[AC-2.14] correcting the inputs and calculating clears every message', async ({ page }) => {
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountRequired)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await expectFieldClean(amountIn(page))
    await expectFieldClean(rateIn(page))
    await expectFieldClean(tenureIn(page))
  })

  test('[AC-2.15] a 40-digit amount is out of range and the form recovers', async ({ page }) => {
    await tryAmount(page, '9'.repeat(40))
    await expectFieldError(amountIn(page), COPY.amountRange)
    await expectNoResults(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
  })

  test('[AC-2.16] any invalid input leaves the page working with no console errors', async ({
    page,
  }) => {
    const bad = ['', 'abc', '1e6', '0', '-500', '1000.555', '9'.repeat(40), '１２', '١٢', '1,,000']
    for (const amount of bad) {
      await fillLoan(page, { amount, rate: 'x', tenure: '9'.repeat(40), unit: 'Months' })
      await calculate(page)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Loan EMI Calculator')
      await expect(calcBtn(page)).toBeVisible()
      await expect(page.getByText('Something went wrong. Please reload the page.')).toHaveCount(0)
    }
    await expect(unitSel(page)).toBeVisible()
    // The global fixture additionally fails this test on any pageerror or console error.
  })

  test('[AC-2.17] malformed thousands separators are not numbers', async ({ page }) => {
    for (const amount of ['1,,000', '1000,50', '1,5', ',1000', '10,0000']) {
      await tryAmount(page, amount)
      await expectFieldError(amountIn(page), COPY.amountNan)
      await expectNoResults(page)
      await expect(summary(page, 'Monthly payment')).toHaveCount(0)
    }
  })
})
