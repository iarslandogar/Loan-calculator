import type { Page } from '@playwright/test'
import {
  amountIn,
  calcBtn,
  calculateLoan,
  clearAllBtn,
  confirmDialog,
  COPY,
  currencySel,
  deleteBtn,
  expect,
  expectSummary,
  fixClock,
  HISTORY_KEY,
  historyHeading,
  historyItems,
  LOANS,
  open,
  rateIn,
  readStored,
  resetBtn,
  restoreBtn,
  scheduleRegion,
  scheduleTable,
  tenureIn,
  test,
  themeSel,
  unitSel,
} from './fixtures'

async function tabThrough(page: Page, expected: ReturnType<Page['locator']>[], key = 'Tab') {
  for (const target of expected) {
    await page.keyboard.press(key)
    await expect(target).toBeFocused()
  }
}

test.describe('S-8 Keyboard', () => {
  test('[AC-8.1] Tab order on a first visit, and Shift+Tab in reverse', async ({ page }) => {
    await open(page)
    const forward = [
      themeSel(page),
      currencySel(page),
      amountIn(page),
      rateIn(page),
      tenureIn(page),
      unitSel(page),
      calcBtn(page),
      resetBtn(page),
    ]
    await tabThrough(page, forward)
    // Clear all is disabled and is skipped.
    await expect(clearAllBtn(page)).toBeDisabled()
    await page.keyboard.press('Tab')
    await expect(clearAllBtn(page)).not.toBeFocused()
    await expect(resetBtn(page)).not.toBeFocused()

    // Back in, then reverse the whole way.
    await resetBtn(page).focus()
    await tabThrough(page, [...forward].reverse().slice(1), 'Shift+Tab')
  })

  test('[AC-8.1] Tab order continues through the schedule, each entry, and Clear all', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(1)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(2)
    await expectSummary(page, LOANS.A)

    // Newest first: L-A, then L-B.
    const afterReset = [
      scheduleRegion(page),
      restoreBtn(page, LOANS.A.line1),
      deleteBtn(page, LOANS.A.line1),
      restoreBtn(page, LOANS.B.line1),
      deleteBtn(page, LOANS.B.line1),
      clearAllBtn(page),
    ]
    await resetBtn(page).focus()
    // Reset clears the results, so approach it by focus only; do not activate it.
    await tabThrough(page, afterReset)

    // Reverse from Clear all back to Reset.
    await tabThrough(
      page,
      [...afterReset]
        .reverse()
        .slice(1)
        .concat([resetBtn(page)]),
      'Shift+Tab',
    )
  })

  test('[AC-8.2] Enter in any of the three inputs calculates', async ({ page }) => {
    await open(page)
    for (const field of ['amount', 'rate', 'tenure'] as const) {
      await page.reload()
      await expect(amountIn(page)).toHaveValue('')
      await amountIn(page).fill(LOANS.A.amount)
      await rateIn(page).fill(LOANS.A.rate)
      await tenureIn(page).fill(LOANS.A.tenure)
      const target = { amount: amountIn, rate: rateIn, tenure: tenureIn }[field](page)
      await target.focus()
      await page.keyboard.press('Enter')
      await expectSummary(page, LOANS.A)
      await expect(scheduleTable(page).getByRole('row')).toHaveCount(13)
    }
  })

  for (const theme of ['Light', 'Dark'] as const) {
    test(`[AC-8.3] ${theme}: every focusable element shows an outline of at least 2px`, async ({
      page,
    }) => {
      await open(page)
      await themeSel(page).selectOption({ label: theme })
      await calculateLoan(page, LOANS.A)
      await expect(historyItems(page)).toHaveCount(1)

      const probe = () =>
        page.evaluate(() => {
          const el = document.activeElement
          if (!el || el === document.body) return null
          const s = getComputedStyle(el)
          return {
            tag: el.tagName,
            width: parseFloat(s.outlineWidth),
            style: s.outlineStyle,
            colour: s.outlineColor,
          }
        })

      // Start from Currency and step back once so Theme is reached by keyboard too.
      await currencySel(page).focus()
      await page.keyboard.press('Shift+Tab')
      await expect(themeSel(page)).toBeFocused()
      const stops: (Awaited<ReturnType<typeof probe>> | 'missing')[] = [await probe()]
      // Currency, amount, rate, tenure, unit, Calculate, Reset, schedule, Restore, Delete, Clear all.
      for (let i = 0; i < 11; i++) {
        await page.keyboard.press('Tab')
        stops.push((await probe()) ?? 'missing')
      }
      expect(stops).toHaveLength(12)
      stops.forEach((s, i) => {
        expect(s, `stop ${i} has focus`).not.toBe('missing')
        expect(s, `stop ${i} has focus`).not.toBeNull()
        if (s && s !== 'missing') {
          expect(s.style, `stop ${i} (${s.tag}) outline style`).not.toBe('none')
          expect(s.width, `stop ${i} (${s.tag}) outline width`).toBeGreaterThanOrEqual(2)
        }
      })
      await expect(clearAllBtn(page)).toBeFocused()
    })
  }

  test('[AC-8.4] arrow keys and Page Up/Down scroll the focused schedule', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.B)
    const region = scheduleRegion(page)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(61)
    const dims = await region.evaluate((el) => ({ sh: el.scrollHeight, ch: el.clientHeight }))
    expect(dims.sh).toBeGreaterThan(dims.ch)
    await region.focus()
    await expect(region).toBeFocused()
    const top = () => region.evaluate((el) => el.scrollTop)
    expect(await top()).toBe(0)

    await page.keyboard.press('ArrowDown')
    await expect.poll(top).toBeGreaterThan(0)
    const afterArrow = await top()

    await page.keyboard.press('PageDown')
    await expect.poll(top).toBeGreaterThan(afterArrow + 20)
    const afterPage = await top()

    await page.keyboard.press('PageUp')
    await expect.poll(top).toBeLessThan(afterPage)
    const afterPageUp = await top()

    await page.keyboard.press('ArrowUp')
    await expect.poll(top).toBeLessThan(afterPageUp)
  })

  test.describe('Clear all dialog', () => {
    test.beforeEach(async ({ page }) => {
      await open(page)
      await calculateLoan(page, LOANS.A)
      await expect(historyItems(page)).toHaveCount(1)
    })

    async function focusIsNeverBehindDialog(page: Page) {
      const ok = await page.evaluate(() => {
        const a = document.activeElement
        const d = document.querySelector('dialog[open]')
        return !a || a === document.body || a === document.documentElement || !!d?.contains(a)
      })
      expect(ok, 'focus stays in the dialog or leaves the page, never behind it').toBe(true)
    }

    test('[AC-8.5] focus starts on Cancel and Tab/Shift+Tab never reach the page behind', async ({
      page,
    }) => {
      await clearAllBtn(page).click()
      const dialog = confirmDialog(page)
      await expect(dialog).toBeVisible()
      await expect(dialog.getByRole('button', { name: 'Cancel', exact: true })).toBeFocused()
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab')
        await focusIsNeverBehindDialog(page)
      }
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Shift+Tab')
        await focusIsNeverBehindDialog(page)
      }
    })

    test('[AC-8.5] Escape closes without clearing and focuses Clear all', async ({ page }) => {
      await clearAllBtn(page).click()
      await expect(confirmDialog(page)).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(confirmDialog(page)).toBeHidden()
      await expect(clearAllBtn(page)).toBeFocused()
      await expect(historyItems(page)).toHaveCount(1)
      expect(await readStored(page, HISTORY_KEY)).not.toBeNull()
    })

    test('[AC-8.5] the Cancel button closes without clearing and focuses Clear all', async ({
      page,
    }) => {
      await clearAllBtn(page).click()
      const dialog = confirmDialog(page)
      await dialog.getByRole('button', { name: 'Cancel', exact: true }).click()
      await expect(dialog).toBeHidden()
      await expect(clearAllBtn(page)).toBeFocused()
      await expect(historyItems(page)).toHaveCount(1)
    })

    test('[AC-8.5] Tab from Cancel to Clear, Enter clears and focuses the Saved calculations heading', async ({
      page,
    }) => {
      await clearAllBtn(page).click()
      const dialog = confirmDialog(page)
      await expect(dialog.getByRole('button', { name: 'Cancel', exact: true })).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(dialog.getByRole('button', { name: 'Clear', exact: true })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(dialog).toBeHidden()
      await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
      await expect(historyHeading(page)).toBeFocused()
    })
  })

  test('[AC-8.6] a whole session works from the keyboard alone', async ({ page }) => {
    await fixClock(page)
    await open(page)
    const kb = page.keyboard

    // Theme, Currency, Loan amount.
    await kb.press('Tab')
    await kb.press('Tab')
    await kb.press('Tab')
    await expect(amountIn(page)).toBeFocused()
    await kb.type(LOANS.A.amount)
    await kb.press('Tab')
    await kb.type(LOANS.A.rate)
    await kb.press('Tab')
    await kb.type(LOANS.A.tenure)
    await kb.press('Enter')
    await expectSummary(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)

    // Back to Loan amount and enter L-B.
    await kb.press('Shift+Tab')
    await kb.press('Shift+Tab')
    await expect(amountIn(page)).toBeFocused()
    await kb.press('ControlOrMeta+a')
    await kb.type(LOANS.B.amount)
    await kb.press('Tab')
    await kb.press('ControlOrMeta+a')
    await kb.type(LOANS.B.rate)
    await kb.press('Tab')
    await kb.press('ControlOrMeta+a')
    await kb.type(LOANS.B.tenure)
    await kb.press('Enter')
    await expectSummary(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)

    // Unit, Calculate, Reset, schedule, then Restore L-B, Delete L-B, Restore L-A.
    for (let i = 0; i < 7; i++) await kb.press('Tab')
    await expect(restoreBtn(page, LOANS.A.line1)).toBeFocused()
    await kb.press('Enter')
    await expectSummary(page, LOANS.A)
    await expect(amountIn(page)).toHaveValue(LOANS.A.amount)
    await expect(historyItems(page)).toHaveCount(2)

    // Shift+Tab to Delete L-B and delete it.
    await kb.press('Shift+Tab')
    await expect(deleteBtn(page, LOANS.B.line1)).toBeFocused()
    await kb.press('Enter')
    await expect(historyItems(page)).toHaveCount(1)
    await expect(restoreBtn(page, LOANS.A.line1)).toBeFocused()

    // Delete L-A is next, then Clear all.
    await kb.press('Tab')
    await kb.press('Tab')
    await expect(clearAllBtn(page)).toBeFocused()
    await kb.press('Enter')
    const dialog = confirmDialog(page)
    await expect(dialog).toBeVisible()
    await kb.press('Tab')
    await expect(dialog.getByRole('button', { name: 'Clear', exact: true })).toBeFocused()
    await kb.press('Enter')
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyHeading(page)).toBeFocused()
  })
})
