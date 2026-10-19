// Reviewer tests for Phase 5, round 1 (whole-app review). They fail until the findings are fixed.
import { test, expect, open, amountIn, calcBtn } from '../fixtures'

test('[REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form)', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 640 })
  await open(page)
  await amountIn(page).focus()
  // Loan amount -> rate -> tenure -> unit -> Calculate.
  for (let i = 0; i < 4; i++) await page.keyboard.press('Tab')
  await expect(calcBtn(page)).toBeFocused()
  // Let any scrolling settle.
  await page.waitForTimeout(500)
  const { top, bottom, height } = await page.evaluate(() => {
    const r = document.activeElement!.getBoundingClientRect()
    return { top: r.top, bottom: r.bottom, height: window.innerHeight }
  })
  expect(top, 'focused Calculate top').toBeGreaterThanOrEqual(0)
  expect(bottom, 'focused Calculate bottom vs viewport height').toBeLessThanOrEqual(height + 1)
})
