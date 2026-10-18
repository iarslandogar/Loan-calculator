// Reviewer tests for the visuals mini-gate (S-19..S-22, D-65, D-68). They fail until the findings are fixed.
import { test, expect, calculateLoan, open, LOANS } from '../fixtures'

test('[REVIEW-V1] at 180 px wide (200% zoom of 360) the yearly summary does not make the page scroll sideways', async ({
  page,
}) => {
  await page.setViewportSize({ width: 180, height: 900 })
  await open(page)
  await calculateLoan(page, LOANS.B)
  await expect(page.getByRole('table', { name: 'Yearly summary' })).toBeVisible()
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow, 'horizontal page overflow in CSS px').toBeLessThanOrEqual(0)
})

test('[REVIEW-V2] in forced-colors mode the cost-bar segments and legend swatches stay visible', async ({
  page,
}) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await open(page)
  await calculateLoan(page, LOANS.B)
  await expect(page.getByRole('figure').first()).toBeVisible()
  const hidden = await page.evaluate(() => {
    const canvas = getComputedStyle(document.querySelector('figure.chart')!).backgroundColor
    const marks = [...document.querySelectorAll('[data-segment], .swatch')]
    return marks
      .filter((el) => {
        const cs = getComputedStyle(el)
        const hasFill = cs.backgroundColor !== canvas && cs.backgroundColor !== 'rgba(0, 0, 0, 0)'
        const hasBorder = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none'
        return !(hasFill || hasBorder)
      })
      .map((el) => el.className || el.getAttribute('data-segment'))
  })
  expect(hidden, 'marks that render as Canvas on Canvas').toEqual([])
})
