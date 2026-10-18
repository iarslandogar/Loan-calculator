import { calculateLoan, expect, LOANS, open, test } from './fixtures'
import {
  expectLegendPrincipalThenInterest,
  expectTooltip,
  figureNamed,
  SUMMARY,
} from './visual-helpers'

test.describe('S-22 Interest and principal in each payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-22.1] L-A shows the chart, a Principal then Interest legend, and 11.3% / 1.0%', async ({
    page,
  }) => {
    await expect(
      page.getByText('Interest and principal in each payment', { exact: true }),
    ).toHaveCount(0)
    await calculateLoan(page, LOANS.A)
    await expect(
      page.getByText('Interest and principal in each payment', { exact: true }),
    ).toBeVisible()
    const figure = figureNamed(page, SUMMARY.makeupA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.makeupA, { exact: true })).toBeVisible()
    await expectLegendPrincipalThenInterest(figure)
    await expect(figure.locator('[data-series="principal"]').first()).toBeVisible()
    await expect(figure.locator('[data-series="interest"]').first()).toBeVisible()
    await expect(figure.locator('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  test('[AC-22.2] L-B reads 59.1% of the first payment and 1.5% of the last', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    const figure = figureNamed(page, SUMMARY.makeupB)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.makeupB, { exact: true })).toBeVisible()
  })

  test('[AC-22.3] L-A: hovering month 1 shows "Month 1: principal Rs 78,848.79, interest Rs 10,000.00"', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectTooltip(
      page,
      figureNamed(page, SUMMARY.makeupA),
      1,
      12,
      'Month 1: principal Rs 78,848.79, interest Rs 10,000.00',
    )
  })

  test('[SPEC-§7] L-A: hovering month 12 shows the last payment split (spec 5.5 row 12)', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectTooltip(
      page,
      figureNamed(page, SUMMARY.makeupA),
      12,
      12,
      'Month 12: principal Rs 87,969.09, interest Rs 879.69',
    )
  })

  test('[SPEC-§7] L-C (0%): zero interest in every payment', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    const figure = figureNamed(page, 'Interest is 0.0% of the first payment and 0.0% of the last.')
    await expect(figure).toBeVisible()
    await expectTooltip(page, figure, 1, 12, 'Month 1: principal Rs 10,000.00, interest Rs 0.00')
  })
})
