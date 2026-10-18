import type { Page } from '@playwright/test'
import {
  allowStorageThenGuardWrites,
  amountIn,
  blockStorage,
  calculate,
  calculateLoan,
  clearAllBtn,
  confirmDialog,
  contrast,
  COPY,
  currencySel,
  deleteBtn,
  expect,
  expectFieldClean,
  expectFieldError,
  expectNoResults,
  expectSummary,
  expectTheme,
  fillLoan,
  HISTORY_KEY,
  historyHeading,
  historyItems,
  LOANS,
  open,
  rateIn,
  readColourTokens,
  readStored,
  refuseWrites,
  restoreBtn,
  scheduleRegion,
  scheduleTable,
  seedHistory,
  seedRaw,
  selectedText,
  SETTINGS_KEY,
  summary,
  tenureIn,
  test,
  themeSel,
  unitSel,
  openSecondTab,
  zeroRateEntry,
  zeroRateLine1,
} from './fixtures'

test.describe('Spec rules: §3.2 state transitions', () => {
  test('[SPEC-§3.2] Restore clears every field error and shows the restored results', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await fillLoan(page, { amount: 'abc', rate: '99', tenure: 'x', unit: 'Years' })
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectFieldError(rateIn(page), COPY.rateRange)
    await expectFieldError(tenureIn(page), COPY.tenureWhole)

    await restoreBtn(page, LOANS.A.line1).click()

    await expectSummary(page, LOANS.A)
    await expectFieldClean(amountIn(page))
    await expectFieldClean(rateIn(page))
    await expectFieldClean(tenureIn(page))
    await expect(amountIn(page)).toHaveValue('1000000')
  })

  test('[SPEC-§3.2] Restore persists the restored currency across a reload', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.B)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await restoreBtn(page, LOANS.B.line1).click()
    expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
    await page.reload()
    expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
    await expect(page.getByLabel('Loan amount (Rs)', { exact: true })).toBeVisible()
  })

  test('[SPEC-§3.2] changing the tenure unit clears the tenure error only', async ({ page }) => {
    await open(page)
    await fillLoan(page, { amount: 'abc', rate: '12', tenure: '101', unit: 'Years' })
    await calculate(page)
    await expectFieldError(tenureIn(page), COPY.tenureYears)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await unitSel(page).selectOption({ label: 'Months' })
    await expectFieldClean(tenureIn(page))
    await expectFieldError(amountIn(page), COPY.amountNan)
  })

  test('[SPEC-§3.2] editing a value back to its original text still leaves results stale', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await amountIn(page).fill('999999')
    await expect(page.getByText(COPY.stale, { exact: true })).toBeVisible()
    await amountIn(page).fill('1000000')
    await expect(page.getByText(COPY.stale, { exact: true })).toBeVisible()
    await expect(summary(page, 'Monthly payment')).toHaveCount(0)
    await expect(scheduleTable(page)).toHaveCount(0)
  })

  test('[SPEC-§3.2] editing while idle keeps the idle text', async ({ page }) => {
    await open(page)
    await amountIn(page).fill('5000')
    await expectNoResults(page)
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })
})

test.describe('Spec rules: §9.2 stored data is validated on load', () => {
  test('[SPEC-§9.2] tampered, non-canonical, duplicate-id and bad-date entries are dropped', async ({
    page,
  }) => {
    await seedHistory(page, [
      zeroRateEntry(1),
      zeroRateEntry(2, { monthlyPayment: '1999.99' }), // tampered payment
      zeroRateEntry(3, { input: { amount: '36000.00', rate: '0', tenure: 12, unit: 'months' } }), // not canonical
      zeroRateEntry(4, { id: 'seed-1' }), // duplicate id
      zeroRateEntry(5, { createdAt: '1999-12-31T00:00:00.000Z' }), // year before 2000
      zeroRateEntry(6, { input: { amount: 'abc', rate: '0', tenure: 12, unit: 'months' } }), // invalid input
      zeroRateEntry(7, { currency: 'USD' }),
      zeroRateEntry(8, { currency: 'EUR' as unknown as 'PKR' }), // unknown currency
    ])
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText(zeroRateLine1(1))
    await expect(historyItems(page).nth(1)).toContainText('$84,000.00 at 0% for 12 months')
    await expect(historyItems(page).nth(1)).toContainText('$7,000.00 per month')
  })

  test('[SPEC-§9.2] an unknown currency in settings falls back to PKR and keeps the theme', async ({
    page,
  }) => {
    await seedRaw(page, { [SETTINGS_KEY]: '{"currency":"EUR","theme":"dark"}' })
    expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
    expect(await selectedText(themeSel(page))).toBe('Dark')
    await expectTheme(page, 'dark')
  })

  test('[SPEC-§9.2] an unknown theme in settings falls back to System and keeps the currency', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await seedRaw(page, { [SETTINGS_KEY]: '{"currency":"USD","theme":"neon"}' })
    expect(await selectedText(currencySel(page))).toBe('USD ($)')
    expect(await selectedText(themeSel(page))).toBe('System')
    await expectTheme(page, 'light')
  })

  test('[SPEC-§9.2] settings that are not valid JSON, or not an object, give both defaults', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    for (const raw of ['{broken', '[1,2]', '"dark"']) {
      await seedRaw(page, { [SETTINGS_KEY]: raw })
      expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
      expect(await selectedText(themeSel(page))).toBe('System')
    }
  })
})

test.describe('Spec rules: §9.3 two tabs', () => {
  /** Makes the page ignore `storage` events, so only the re-read-before-write rule can protect it. */
  async function ignoreStorageEvents(page: Page) {
    await page.addInitScript(() => {
      const original = window.addEventListener.bind(window)
      const patched = (type: string, ...rest: unknown[]) => {
        if (type === 'storage') return
        ;(original as (t: string, ...r: unknown[]) => void)(type, ...rest)
      }
      window.addEventListener = patched as unknown as typeof window.addEventListener
    })
  }

  test('[SPEC-§9.3] after Clear all in tab B, a Calculate in tab A must not bring the cleared entries back', async ({
    page,
  }) => {
    await ignoreStorageEvents(page)
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)

    const b = await openSecondTab(page)
    await expect(historyItems(b)).toHaveCount(1)
    await clearAllBtn(b).click()
    await confirmDialog(b).getByRole('button', { name: 'Clear', exact: true }).click()
    await expect(b.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    expect(await readStored(b, HISTORY_KEY)).toBeNull()

    // Tab A still holds L-A in memory and never heard about the clear.
    await expect(historyItems(page)).toHaveCount(1)
    await calculateLoan(page, LOANS.B)
    await expectSummary(page, LOANS.B)

    await expect(historyItems(page)).toHaveCount(1)
    await expect(historyItems(page).first()).toContainText(LOANS.B.line1)
    const stored = JSON.parse((await readStored(page, HISTORY_KEY)) ?? '[]') as {
      input: { amount: string }
    }[]
    expect(stored).toHaveLength(1)
    expect(stored[0]?.input.amount).toBe('2500000')
  })

  test('[SPEC-§9.3] the duplicate check compares with the newest entry as just re-read', async ({
    page,
  }) => {
    await ignoreStorageEvents(page)
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)

    // Tab B saves L-B on top of L-A.
    const b = await openSecondTab(page)
    await calculateLoan(b, LOANS.B)
    await expect(historyItems(b)).toHaveCount(2)

    // Tab A (stale: newest is L-A) calculates L-B: the newest stored entry is already L-B.
    await calculateLoan(page, LOANS.B)
    await expectSummary(page, LOANS.B)
    const stored = JSON.parse((await readStored(page, HISTORY_KEY)) ?? '[]') as unknown[]
    expect(stored).toHaveLength(2)
  })

  test('[SPEC-§9.3] Delete works by id, not by position, on stale lists', async ({ page }) => {
    await ignoreStorageEvents(page)
    await seedHistory(page, [zeroRateEntry(1), zeroRateEntry(2), zeroRateEntry(3)])
    await expect(historyItems(page)).toHaveCount(3)

    const b = await openSecondTab(page)
    await expect(historyItems(b)).toHaveCount(3)
    await deleteBtn(b, zeroRateLine1(1)).click()
    await expect(historyItems(b)).toHaveCount(2)

    // Tab A still lists entries 1, 2, 3 and deletes entry 2.
    await expect(deleteBtn(page, zeroRateLine1(2))).toBeVisible()
    await deleteBtn(page, zeroRateLine1(2)).click()

    const stored = JSON.parse((await readStored(page, HISTORY_KEY)) ?? '[]') as {
      id: string
      input: { amount: string }
    }[]
    expect(stored.map((e) => e.id)).toEqual(['seed-3'])
    expect(stored[0]?.input.amount).toBe('36000')
  })

  test('[SPEC-§9.3] a save in tab B appears in tab A through the storage event', async ({
    page,
  }) => {
    await open(page)
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    const b = await openSecondTab(page)
    await calculateLoan(b, LOANS.A)
    await expect(historyItems(b)).toHaveCount(1)

    await expect(historyItems(page)).toHaveCount(1)
    await expect(historyItems(page).first()).toContainText(LOANS.A.line1)
  })

  test('[SPEC-§9.3] Clear all in tab B empties tab A through the storage event', async ({
    page,
  }) => {
    await seedHistory(page, [zeroRateEntry(1), zeroRateEntry(2)])
    await expect(historyItems(page)).toHaveCount(2)
    const b = await openSecondTab(page)
    await expect(historyItems(b)).toHaveCount(2)
    await clearAllBtn(b).click()
    await confirmDialog(b).getByRole('button', { name: 'Clear', exact: true }).click()

    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })

  test('[SPEC-§9.3] localStorage.clear() in tab B empties tab A', async ({ page }) => {
    await seedHistory(page, [zeroRateEntry(1), zeroRateEntry(2)])
    await expect(historyItems(page)).toHaveCount(2)
    const b = await openSecondTab(page)
    await b.evaluate(() => localStorage.clear())

    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })

  test('[SPEC-§9.3] if the focused entry is removed by another tab, focus moves to the heading', async ({
    page,
  }) => {
    await seedHistory(page, [zeroRateEntry(1), zeroRateEntry(2)])
    await expect(historyItems(page)).toHaveCount(2)
    await restoreBtn(page, zeroRateLine1(1)).focus()
    await expect(restoreBtn(page, zeroRateLine1(1))).toBeFocused()
    const b = await openSecondTab(page)
    await b.evaluate((key) => localStorage.removeItem(key), HISTORY_KEY)

    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyHeading(page)).toBeFocused()
  })

  test('[SPEC-§9.3] if a save fails, saved calculations are unavailable for the rest of the visit', async ({
    page,
  }) => {
    await allowStorageThenGuardWrites(page)
    await open(page)
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await refuseWrites(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await expect(page.getByText(COPY.historyUnavailable, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })
})

test.describe('Spec rules: §9.1 / §12.3 Safari-style blocked storage', () => {
  test('[SPEC-§9.1] when reading window.localStorage throws, the app calculates and says history is unavailable', async ({
    page,
  }) => {
    await blockStorage(page, 'getter')
    await open(page)
    await expect(page.getByText(COPY.historyUnavailable, { exact: true })).toBeVisible()
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(historyItems(page)).toHaveCount(0)
  })

  test('[SPEC-§9.1] when every storage method throws, the unavailable message shows from the start', async ({
    page,
  }) => {
    await blockStorage(page, 'methods')
    await open(page)
    await expect(page.getByText(COPY.historyUnavailable, { exact: true })).toBeVisible()
    await expect(clearAllBtn(page)).toBeDisabled()
  })
})

test.describe('Spec rules: §8.4 input borders and §8 markup', () => {
  for (const theme of ['Light', 'Dark'] as const) {
    test(`[SPEC-§8.4] ${theme}: --input-border has 3:1 contrast on --bg and --surface`, async ({
      page,
    }) => {
      await open(page)
      await themeSel(page).selectOption({ label: theme })
      await expectTheme(page, theme === 'Light' ? 'light' : 'dark')
      const t = await readColourTokens(page, ['--input-border', '--bg', '--surface'])
      const border = t['--input-border'] ?? [0, 0, 0]
      expect(contrast(border, t['--bg'] ?? [0, 0, 0]), `${theme} on --bg`).toBeGreaterThanOrEqual(3)
      expect(
        contrast(border, t['--surface'] ?? [0, 0, 0]),
        `${theme} on --surface`,
      ).toBeGreaterThanOrEqual(3)
    })
  }

  test('[SPEC-§4] the three fields are text inputs with autocomplete off, never type=number', async ({
    page,
  }) => {
    await open(page)
    for (const field of [amountIn(page), rateIn(page), tenureIn(page)]) {
      await expect(field).toHaveAttribute('type', 'text')
      await expect(field).toHaveAttribute('autocomplete', 'off')
    }
  })

  test('[SPEC-§8.2] the schedule region and table are named, scrollable by keyboard, with column scopes', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(scheduleRegion(page)).toHaveAttribute('tabindex', '0')
    await expect(scheduleTable(page)).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Repayment schedule', level: 2 })).toBeVisible()
    const headers = scheduleTable(page).getByRole('columnheader')
    await expect(headers).toHaveCount(5)
    for (const h of await headers.all()) await expect(h).toHaveAttribute('scope', 'col')
  })

  test('[SPEC-§8.3] error text sits in an aria-live polite container', async ({ page }) => {
    await open(page)
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountRequired)
    const live = page.locator('[aria-live="polite"]').filter({ hasText: COPY.amountRequired })
    await expect.poll(() => live.count()).toBeGreaterThan(0)
  })

  test('[SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator', async ({
    page,
  }) => {
    await open(page)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Loan EMI Calculator')
    await expect(page).toHaveTitle('Loan EMI Calculator')
  })
})

test.describe('Spec rules: §11 NFR-3 and NFR-7 (no network, no cookies)', () => {
  test('[SPEC-§11] after a calculation there are no further requests, no cookies', async ({
    page,
    context,
  }) => {
    const requests: string[] = []
    page.on('request', (r) => requests.push(r.url()))
    await open(page)
    await expect(amountIn(page)).toBeVisible()
    await page.waitForLoadState('networkidle')

    const origin = new URL(page.url()).origin
    const afterLoad = requests.length
    expect(afterLoad).toBeGreaterThan(0)

    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await themeSel(page).selectOption({ label: 'Dark' })
    await page.waitForTimeout(500)

    expect(requests.slice(afterLoad), 'requests after the initial load').toEqual([])
    const foreign = requests.filter((u) => !u.startsWith(origin) && !u.startsWith('data:'))
    expect(foreign, 'requests to other origins').toEqual([])
    expect(await page.evaluate(() => document.cookie)).toBe('')
    expect(await context.cookies()).toEqual([])
  })
})
