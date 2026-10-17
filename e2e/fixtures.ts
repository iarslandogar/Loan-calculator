// Shared Playwright fixtures and helpers (spec §8.3.1, §10, §12).
// Every expected figure in the specs is hard-coded from docs/user-stories.md and spec §5.5.
// Nothing here imports from src/ so the tests stay independent of the code under test.
import { test as base, expect as baseExpect, type Locator, type Page } from '@playwright/test'

export const expect = baseExpect

// ---------------------------------------------------------------------------
// Test fixture: any pageerror or console error fails the test (spec §10, AC-2.16).
// The listener is attached to every page opened in the context (two-tab tests).
// ---------------------------------------------------------------------------
export const test = base.extend({
  page: async ({ page, context }, use) => {
    // Fail fast when an element is missing (a missing control is the normal red state) instead of
    // waiting the 30 s default; every real action completes in well under a second.
    page.setDefaultTimeout(8_000)
    context.setDefaultTimeout(8_000)
    page.setDefaultNavigationTimeout(30_000)
    const problems: string[] = []
    const watch = (p: Page) => {
      p.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`))
      p.on('console', (m) => {
        if (m.type() === 'error') problems.push(`console.error: ${m.text()}`)
      })
    }
    watch(page)
    context.on('page', watch)
    await use(page)
    expect(problems, 'uncaught page errors or console errors').toEqual([])
  },
})

// ---------------------------------------------------------------------------
// Copy (spec §7), hard-coded character for character.
// ---------------------------------------------------------------------------
export const COPY = {
  idle: 'Enter your loan details and select Calculate.',
  stale: 'Your inputs have changed. Select Calculate to see updated results.',
  rounding: 'Some payments differ by 0.01 because amounts are rounded to 2 decimal places.',
  historyEmpty: 'No saved calculations yet.',
  historyUnavailable:
    "Saved calculations aren't available in this browser. Calculations still work.",
  removeFailed:
    "Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.",
  dialogText: "Clear all saved calculations? This can't be undone.",
  dialogHint: "This doesn't clear the form. Select Reset to do that.",
  currencyNote: 'Changing currency changes the symbol only. Amounts are not converted.',
  amountRequired: 'Enter a loan amount.',
  amountNan: 'Loan amount must be a number.',
  amountDecimals: 'Loan amount can have at most 2 decimal places.',
  amountRange: 'Loan amount must be between 1,000 and 1,000,000,000.',
  rateRequired: 'Enter an interest rate.',
  rateNan: 'Interest rate must be a number.',
  rateDecimals: 'Interest rate can have at most 2 decimal places.',
  rateRange: 'Interest rate must be between 0 and 50%.',
  tenureRequired: 'Enter a loan tenure.',
  tenureWhole: 'Loan tenure must be a whole number.',
  tenureYears: 'Loan tenure must be between 1 and 40 years.',
  tenureMonths: 'Loan tenure must be between 1 and 480 months.',
}

export const HISTORY_KEY = 'emi-calc.v1.history'
export const SETTINGS_KEY = 'emi-calc.v1.settings'

// ---------------------------------------------------------------------------
// Reference loans (docs/user-stories.md "Reference loans used in the criteria").
// ---------------------------------------------------------------------------
export interface Loan {
  amount: string
  rate: string
  tenure: string
  unit: 'Years' | 'Months'
  monthly: string
  interest: string
  total: string
  /** History line 1 (spec §7) for PKR. */
  line1: string
  /** Facts for the independent schedule arithmetic (cents and a rate fraction). */
  amountCents: bigint
  rateNum: bigint
  rateDen: bigint
  months: number
}

export const LOANS = {
  A: {
    amount: '1000000',
    rate: '12',
    tenure: '1',
    unit: 'Years',
    monthly: 'Rs 88,848.79',
    interest: 'Rs 66,185.45',
    total: 'Rs 1,066,185.45',
    line1: 'Rs 1,000,000.00 at 12% for 1 year',
    amountCents: 100_000_000n,
    rateNum: 12n,
    rateDen: 1n,
    months: 12,
  },
  B: {
    amount: '2500000',
    rate: '18',
    tenure: '5',
    unit: 'Years',
    monthly: 'Rs 63,483.57',
    interest: 'Rs 1,309,014.14',
    total: 'Rs 3,809,014.14',
    line1: 'Rs 2,500,000.00 at 18% for 5 years',
    amountCents: 250_000_000n,
    rateNum: 18n,
    rateDen: 1n,
    months: 60,
  },
  C: {
    amount: '120000',
    rate: '0',
    tenure: '12',
    unit: 'Months',
    monthly: 'Rs 10,000.00',
    interest: 'Rs 0.00',
    total: 'Rs 120,000.00',
    line1: 'Rs 120,000.00 at 0% for 12 months',
    amountCents: 12_000_000n,
    rateNum: 0n,
    rateDen: 1n,
    months: 12,
  },
  D: {
    amount: '100000',
    rate: '10',
    tenure: '1',
    unit: 'Months',
    monthly: 'Rs 100,833.33',
    interest: 'Rs 833.33',
    total: 'Rs 100,833.33',
    line1: 'Rs 100,000.00 at 10% for 1 month',
    amountCents: 10_000_000n,
    rateNum: 10n,
    rateDen: 1n,
    months: 1,
  },
  MIN: {
    amount: '1000',
    rate: '0.01',
    tenure: '1',
    unit: 'Months',
    monthly: 'Rs 1,000.01',
    interest: 'Rs 0.01',
    total: 'Rs 1,000.01',
    line1: 'Rs 1,000.00 at 0.01% for 1 month',
    amountCents: 100_000n,
    rateNum: 1n,
    rateDen: 100n,
    months: 1,
  },
  MAX: {
    amount: '1000000000',
    rate: '50',
    tenure: '40',
    unit: 'Years',
    monthly: 'Rs 41,666,666.80',
    interest: 'Rs 19,000,000,061.79',
    total: 'Rs 20,000,000,061.79',
    line1: 'Rs 1,000,000,000.00 at 50% for 40 years',
    amountCents: 100_000_000_000n,
    rateNum: 50n,
    rateDen: 1n,
    months: 480,
  },
  Z3: {
    amount: '1000',
    rate: '0',
    tenure: '3',
    unit: 'Months',
    monthly: 'Rs 333.33',
    interest: 'Rs 0.00',
    total: 'Rs 1,000.00',
    line1: 'Rs 1,000.00 at 0% for 3 months',
    amountCents: 100_000n,
    rateNum: 0n,
    rateDen: 1n,
    months: 3,
  },
} satisfies Record<string, Loan>

export type LoanInputValues = Pick<Loan, 'amount' | 'rate' | 'tenure' | 'unit'>

// ---------------------------------------------------------------------------
// Locators (spec §8.3.1: role and accessible name only).
// ---------------------------------------------------------------------------
export const themeSel = (p: Page) => p.getByLabel('Theme', { exact: true })
export const currencySel = (p: Page) => p.getByLabel('Currency', { exact: true })
export const amountIn = (p: Page) => p.getByLabel(/^Loan amount \((Rs|\$)\)$/)
export const rateIn = (p: Page) => p.getByLabel('Annual interest rate (%)', { exact: true })
export const tenureIn = (p: Page) => p.getByLabel('Loan tenure', { exact: true })
export const unitSel = (p: Page) => p.getByLabel('Tenure unit', { exact: true })
export const calcBtn = (p: Page) => p.getByRole('button', { name: 'Calculate', exact: true })
export const resetBtn = (p: Page) => p.getByRole('button', { name: 'Reset', exact: true })
export const clearAllBtn = (p: Page) => p.getByRole('button', { name: 'Clear all', exact: true })
export const summary = (
  p: Page,
  name: 'Monthly payment' | 'Total interest' | 'Total amount payable',
) => p.getByLabel(name, { exact: true })
export const scheduleTable = (p: Page) => p.getByRole('table', { name: 'Repayment schedule' })
export const scheduleRegion = (p: Page) => p.getByRole('region', { name: 'Repayment schedule' })
export const historyHeading = (p: Page) =>
  p.getByRole('heading', { name: 'Saved calculations', level: 2 })
export const historyList = (p: Page) => p.getByRole('list', { name: 'Saved calculations' })
export const historyItems = (p: Page) => historyList(p).getByRole('listitem')
export const restoreBtn = (p: Page, line1: string) =>
  p.getByRole('button', { name: `Restore ${line1}` })
export const deleteBtn = (p: Page, line1: string) =>
  p.getByRole('button', { name: `Delete ${line1}` })
export const confirmDialog = (p: Page) => p.getByRole('dialog', { name: COPY.dialogText })

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------
export async function open(page: Page): Promise<void> {
  await page.goto('./')
}

export async function fillLoan(page: Page, v: LoanInputValues): Promise<void> {
  await amountIn(page).fill(v.amount)
  await rateIn(page).fill(v.rate)
  await tenureIn(page).fill(v.tenure)
  await unitSel(page).selectOption({ label: v.unit })
}

export async function calculate(page: Page): Promise<void> {
  await calcBtn(page).click()
}

export async function calculateLoan(page: Page, v: LoanInputValues): Promise<void> {
  await fillLoan(page, v)
  await calculate(page)
}

/** Press Enter in one of the three text inputs (AC-8.2). */
export async function calculateViaEnter(
  page: Page,
  field: 'amount' | 'rate' | 'tenure' = 'tenure',
): Promise<void> {
  const target = { amount: amountIn, rate: rateIn, tenure: tenureIn }[field](page)
  await target.press('Enter')
}

export async function selectedText(select: Locator): Promise<string> {
  return select.evaluate((el) => {
    const s = el as HTMLSelectElement
    return s.options[s.selectedIndex]?.text ?? ''
  })
}

// ---------------------------------------------------------------------------
// Assertions
// ---------------------------------------------------------------------------
export async function expectSummary(
  page: Page,
  loan: Pick<Loan, 'monthly' | 'interest' | 'total'>,
): Promise<void> {
  await expect(summary(page, 'Monthly payment')).toHaveText(loan.monthly)
  await expect(summary(page, 'Total interest')).toHaveText(loan.interest)
  await expect(summary(page, 'Total amount payable')).toHaveText(loan.total)
}

export async function expectNoResults(page: Page): Promise<void> {
  await expect(page.getByText(COPY.idle, { exact: true })).toBeVisible()
  await expect(page.getByRole('definition')).toHaveCount(0)
  await expect(scheduleTable(page)).toHaveCount(0)
}

export async function expectFieldError(field: Locator, message: string): Promise<void> {
  await expect(field).toBeVisible()
  await expect(field).toHaveAttribute('aria-invalid', 'true')
  await expect(field).toHaveAccessibleDescription(message)
}

/** The field is present and carries no error (guards against passing on a missing field). */
export async function expectFieldClean(field: Locator): Promise<void> {
  await expect(field).toBeVisible()
  await expect(field).not.toHaveAttribute('aria-invalid', 'true')
  await expect(field).toHaveAccessibleDescription('')
}

export async function expectResultsShown(page: Page): Promise<void> {
  await expect(summary(page, 'Monthly payment')).toBeVisible()
  await expect(scheduleTable(page)).toBeVisible()
}

// ---------------------------------------------------------------------------
// Schedule reading and independent arithmetic (BigInt cents; no app code).
// ---------------------------------------------------------------------------
export async function readSchedule(page: Page): Promise<string[][]> {
  return scheduleTable(page).evaluate((t) => {
    const table = t as HTMLTableElement
    return Array.from(table.tBodies)
      .flatMap((b) => Array.from(b.rows))
      .map((r) => Array.from(r.cells).map((c) => (c.textContent ?? '').trim()))
  })
}

export function cents(text: string): bigint {
  const t = text.replace(/^Rs /, '').replace(/^\$/, '')
  expect(t, `money text "${text}"`).toMatch(/^\d{1,3}(,\d{3})*\.\d{2}$/)
  return BigInt(t.replace(/[,.]/g, ''))
}

/**
 * Checks every row against AC-10.4, AC-10.5 and AC-13.3 using integer cents and the formula in
 * the ACs: interest = round-half-up(opening x annual rate / 1200), payment = interest + principal,
 * balance = opening - principal, final balance 0.00. Returns the column sums.
 */
export function checkScheduleArithmetic(
  rows: string[][],
  loan: Pick<Loan, 'amountCents' | 'rateNum' | 'rateDen' | 'months'>,
  headlineMonthly: string,
): { sumPayment: bigint; sumInterest: bigint } {
  expect(rows).toHaveLength(loan.months)
  const headline = cents(headlineMonthly)
  let opening = loan.amountCents
  let sumPayment = 0n
  let sumInterest = 0n
  const den = 1200n * loan.rateDen
  rows.forEach((row, i) => {
    expect(row, `row ${i + 1} has 5 cells`).toHaveLength(5)
    const [month, payment, interest, principal, balance] = row as [
      string,
      string,
      string,
      string,
      string,
    ]
    expect(month).toBe(String(i + 1))
    const p = cents(payment)
    const it = cents(interest)
    const pr = cents(principal)
    const bal = cents(balance)
    const expectedInterest = (2n * opening * loan.rateNum + den) / (2n * den)
    expect(it, `row ${i + 1} interest`).toBe(expectedInterest)
    expect(p, `row ${i + 1} payment = interest + principal`).toBe(it + pr)
    expect(bal, `row ${i + 1} balance = opening - principal`).toBe(opening - pr)
    expect(bal >= 0n, `row ${i + 1} balance not negative`).toBe(true)
    expect(pr >= 0n, `row ${i + 1} principal not negative`).toBe(true)
    const diff = p > headline ? p - headline : headline - p
    expect(diff <= 1n, `row ${i + 1} payment within 0.01 of the headline`).toBe(true)
    opening = bal
    sumPayment += p
    sumInterest += it
  })
  expect(opening, 'final balance').toBe(0n)
  return { sumPayment, sumInterest }
}

// ---------------------------------------------------------------------------
// Storage helpers (spec §9, §12.1, §12.3)
// ---------------------------------------------------------------------------

/**
 * Makes the browser refuse storage before any page script runs.
 * 'methods': Storage.prototype get/set/remove/clear throw.
 * 'getter': reading window.localStorage itself throws (Safari behaviour).
 */
export async function blockStorage(page: Page, mode: 'methods' | 'getter' = 'methods') {
  await page.addInitScript((m: string) => {
    if (m === 'getter') {
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        get() {
          throw new DOMException('The operation is insecure.', 'SecurityError')
        },
      })
      return
    }
    const refuse = () => {
      throw new DOMException('Storage is blocked.', 'QuotaExceededError')
    }
    Storage.prototype.getItem = refuse
    Storage.prototype.setItem = refuse
    Storage.prototype.removeItem = refuse
    Storage.prototype.clear = refuse
  }, mode)
}

interface WriteGuardWindow {
  __refuseWrites?: boolean
}

/** Storage works until `refuseWrites(page)` is called; reads keep working (AC-12.7). */
export async function allowStorageThenGuardWrites(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as WriteGuardWindow
    const refuse = () => new DOMException('Storage writes are refused.', 'QuotaExceededError')
    const origSet = Storage.prototype.setItem
    const origRemove = Storage.prototype.removeItem
    const origClear = Storage.prototype.clear
    Storage.prototype.setItem = function (k: string, v: string) {
      if (w.__refuseWrites) throw refuse()
      origSet.call(this, k, v)
    }
    Storage.prototype.removeItem = function (k: string) {
      if (w.__refuseWrites) throw refuse()
      origRemove.call(this, k)
    }
    Storage.prototype.clear = function () {
      if (w.__refuseWrites) throw refuse()
      origClear.call(this)
    }
  })
}

export async function refuseWrites(page: Page) {
  await page.evaluate(() => {
    ;(window as unknown as WriteGuardWindow).__refuseWrites = true
  })
}

/** Writes raw strings into localStorage, then reloads so the app starts from them. */
export async function seedRaw(page: Page, items: Record<string, string>): Promise<void> {
  await page.goto('./')
  await page.evaluate((kv) => {
    for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v)
  }, items)
  await page.reload()
}

export interface SeedEntry {
  id: string
  createdAt: string
  currency: 'PKR' | 'USD'
  input: { amount: string; rate: string; tenure: number; unit: 'years' | 'months' }
  monthlyPayment: string
}

/**
 * A 0% loan: amount 12000 x k over 12 months pays 1000 x k per month (spec §12.1, D-35).
 * The monthly payment is written by hand here, never computed by the app.
 */
export function zeroRateEntry(k: number, overrides: Partial<SeedEntry> = {}): SeedEntry {
  return {
    id: `seed-${k}`,
    createdAt: new Date(Date.UTC(2026, 9, 1, 8, k, 0)).toISOString(),
    currency: 'PKR',
    input: { amount: String(12000 * k), rate: '0', tenure: 12, unit: 'months' },
    monthlyPayment: `${1000 * k}.00`,
    ...overrides,
  }
}

export function group3(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** History line 1 for zeroRateEntry(k), PKR. */
export function zeroRateLine1(k: number): string {
  return `Rs ${group3(12000 * k)}.00 at 0% for 12 months`
}

export async function seedHistory(page: Page, entries: unknown[]): Promise<void> {
  await seedRaw(page, { [HISTORY_KEY]: JSON.stringify(entries) })
}

export async function readStored(page: Page, key: string): Promise<string | null> {
  return page.evaluate((k) => localStorage.getItem(k), key)
}

// ---------------------------------------------------------------------------
// Clock (spec §12.1, D-15): always give an explicit offset.
// ---------------------------------------------------------------------------
export const T_2045 = new Date('2026-10-17T20:45:00+05:00')

export async function fixClock(page: Page, at: Date = T_2045): Promise<void> {
  await page.clock.setFixedTime(at)
}

// ---------------------------------------------------------------------------
// Theme and colour helpers (WCAG 2.x relative luminance), computed in the test.
// ---------------------------------------------------------------------------
export async function dataTheme(page: Page): Promise<string | undefined> {
  return page.evaluate(() => document.documentElement.dataset.theme)
}

export async function expectTheme(page: Page, theme: 'light' | 'dark'): Promise<void> {
  await expect.poll(() => dataTheme(page)).toBe(theme)
}

export type Rgb = [number, number, number]

/** Resolves each CSS custom property of <html> to an RGB triple using the browser's own parser. */
export async function readColourTokens(page: Page, names: string[]): Promise<Record<string, Rgb>> {
  const raw = await page.evaluate((tokens) => {
    const out: Record<string, string> = {}
    const probe = document.createElement('span')
    document.body.appendChild(probe)
    for (const t of tokens) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(t).trim()
      if (!value) {
        out[t] = ''
        continue
      }
      probe.style.color = ''
      probe.style.color = value
      out[t] = getComputedStyle(probe).color
    }
    probe.remove()
    return out
  }, names)
  const result: Record<string, Rgb> = {}
  for (const name of names) {
    const text = raw[name] ?? ''
    expect(text, `custom property ${name} is defined and a valid colour`).not.toBe('')
    const m = text.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/)
    expect(m, `custom property ${name} resolves to rgb(), got "${text}"`).not.toBeNull()
    result[name] = [Number(m?.[1]), Number(m?.[2]), Number(m?.[3])]
  }
  return result
}

function channel(v: number): number {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

export function luminance([r, g, b]: Rgb): number {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrast(a: Rgb, b: Rgb): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

export async function box(locator: Locator) {
  const b = await locator.boundingBox()
  expect(b, 'element has a bounding box (is it rendered?)').not.toBeNull()
  return b as { x: number; y: number; width: number; height: number }
}

/** Page never scrolls horizontally: document width <= viewport width. */
export async function pageOverflowX(
  page: Page,
): Promise<{ doc: number; body: number; view: number }> {
  return page.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
    view: window.innerWidth,
  }))
}

/**
 * Opens a second tab of the app that shares storage with `page` and is delivered `storage` events.
 * It is opened with window.open (a related page): in Playwright's WebKit, a page made by
 * context.newPage() never receives `storage` events from its siblings.
 */
export async function openSecondTab(page: Page): Promise<Page> {
  const [tab] = await Promise.all([
    page.waitForEvent('popup'),
    page.evaluate(() => {
      window.open('./', '_blank')
    }),
  ])
  await tab.waitForLoadState('load')
  return tab
}
