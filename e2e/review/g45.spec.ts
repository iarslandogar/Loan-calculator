// Reviewer tests for G4.5 (saved calculations). They fail until the findings are fixed.
import { test, expect } from '../fixtures'

const KEY = 'emi-calc.v1.history'
const mk = (id: string, createdAt: string) => ({
  id,
  createdAt,
  currency: 'PKR',
  input: { amount: '1000000', rate: '12', tenure: 1, unit: 'years' },
  monthlyPayment: '88848.79',
})

test('[REVIEW-1] if another tab empties the list while the Clear-all dialog is open, Cancel still leaves focus on a control', async ({
  page,
  context,
}) => {
  await page.goto('./')
  await page.evaluate(({ k, v }: { k: string; v: string }) => localStorage.setItem(k, v), {
    k: KEY,
    v: JSON.stringify([mk('a', '2026-10-17T10:00:00.000Z')]),
  })
  await page.reload()
  const [b] = await Promise.all([
    context.waitForEvent('page'),
    page.evaluate(() => {
      window.open('./')
    }),
  ])
  await b.waitForLoadState()
  await page.getByRole('button', { name: 'Clear all' }).click()
  await b.evaluate((k) => localStorage.removeItem(k), KEY)
  await expect(page.getByText('No saved calculations yet.')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
  // Clear all is now disabled and cannot take focus; focus must not be dropped to <body>.
  await expect(page.locator('body')).not.toBeFocused()
  await expect(page.getByRole('heading', { name: 'Saved calculations' })).toBeFocused()
})

test('[REVIEW-2] a stored entry from 31 Dec 9999 (inside the allowed year range) shows a four-digit year', async ({
  page,
}) => {
  await page.goto('./')
  await page.evaluate(({ k, v }: { k: string; v: string }) => localStorage.setItem(k, v), {
    k: KEY,
    v: JSON.stringify([mk('z', '9999-12-31T23:59:59.000Z')]),
  })
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Saved calculations' })).toBeVisible()
  await expect(page.locator('body')).not.toContainText('10000')
})
