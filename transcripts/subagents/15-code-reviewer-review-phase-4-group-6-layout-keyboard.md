# Subagent 15: code-reviewer: Review Phase 4 group 6 (layout/keyboard)

Subagent **`code-reviewer`**, task: *Review Phase 4 group 6 (layout/keyboard)*. Started 2026-10-18 16:34 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 16:34 PKT

> Mini-gate G4.6 review: Phase 4, group 6 (layout and keyboard) for stories S-5 and S-8 — the LAST group, so from here the full gate applies. Follow your agent instructions. Append a dated "G4.6" section to docs/process/review-findings.md (use Edit; keep earlier sections). Read decision-log D-59 and D-60.
> 
> Scope: commits 04de524 (owner-approved D-59 test fix), 446b087 (src/ui: BreakAfterCommas.tsx, ResultsSummary.tsx, HistoryEntry.tsx, app.css), 525e012 (D-60).
> 
> IMPORTANT: run Playwright with `CI=1`, and never run it while anything else is running Playwright. Leave nothing on port 4173.
> 
> 1. Gate (full, per your instructions from G4.6 on): `CI=1 npm run verify`. Developer reports exit 0: Vitest 297/297, size 85.4 KB, E2E 453/453 (3 browsers, incl. your 6 REVIEW tests), `trace --results` OK with 94/94 v1 ACs passing. Reproduce and paste the summary lines + exit code.
> 2. Freeze check vs tag g3-tests-approved: authorised changes are exactly 749144e (D-46), 5751988 (D-48), 16c8cc8 (D-54/D-55), 04de524 (D-59). Verify 04de524 changes only the one AC-8.1 assertion and that the replacement still rejects focus on any other page element.
> 3. Conformance: §8.1 layout and breakpoints (side by side ≥ 769 px, single column ≤ 768 px, max width 1200, no horizontal page scroll ≥ 360 px), 44×44 tap targets, §8.2, focus ring ≥ 2 px in both themes, AC-8.1 tab order with results + entries, AC-8.6 keyboard-only session; that `<wbr>` changed no textContent or accessible name (check summary dd textContent and the Restore/Delete names).
> 4. Exploratory: every page state at 320, 360, 768, 769, 1280 and 1920 px and at 180 px (200% zoom), in both themes: horizontal overflow, clipped text, overlapping controls (bounding-box overlap checks), the dialog at 180 px, very long history lines; keyboard-only full flow in all 3 browsers; Windows high-contrast / forced-colors emulation (`page.emulateMedia({ forcedColors: 'active' })`) — focus ring and buttons still visible?; reduced motion is irrelevant (no animation) — confirm. Turn REAL defects into failing `[REVIEW-n]` tests; delete probes that found nothing.
> 5. Whole-app code quality pass (Minor unless it risks wrong data, a crash or an a11y failure).
> 
> End with `BLOCKING FINDINGS: <count>`. Do not edit src/ or any frozen test.

<details><summary>🔧 17 tool call(s): Bash ×14, Grep, Read, SubagentHandback</summary>

- **Bash**

```bash
git status --short | head; git log --oneline | head -8; (CI=1 npm run verify > $TEMP/verify.txt 2>&1; echo EXIT $? >> $TEMP/verify.txt; tail -25 $TEMP/verify.txt)
```

- **Grep** · D-59|D-60

```json
{
 "pattern": "D-59|D-60",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "output_mode": "content",
 "-A": 12
}
```

  Result:
```
525e012 docs(phase-4): record group 6 choices and the green verify run (D-60)
446b087 feat(S-5): narrow-viewport layout, wrapping button rows, figures break between digit groups (S-5, review D54-2/D54-3/M-5)
04de524 test(S-8): portable AC-8.1 "Tab past the last control" check (owner-approved, D-59)
2aeaa66 docs(G4.5): review findings for group 5 (0 blocking), reviewer tests REVIEW-1/2, D-58
b96b99b fix(S-12): focus falls back to the heading; local-time year check; stop parsing after 20 valid entries (G4.5 review G45-1..3)
c0d02c3 docs(phase-4): record group 5 implementation choices (D-57)
03d8e1d feat(S-12): Delete, Clear all with native confirm dialog, removal-failure message, two-tab sync (S-12)
77c3780 feat(S-11): save on calculate, saved-calculations entries and Restore (S-11)
    - Timeout 5000ms exceeded while waiting on the predicate

      188 |
      189 |     await page.keyboard.press('PageUp')
    > 190 |     await expect.poll(top).toBeLessThan(afterPage)
          |                            ^
      191 |     const afterPageUp = await top()
      192 |
      193 |     await page.keyboard.press('ArrowUp')
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s08-keyboard.spec.ts:190:28

    Error Context: test-results\s08-keyboard-S-8-Keyboard--65b63-scroll-the-focused-schedule-chromium\error-context.md

    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results\s08-keyboard-S-8-Keyboard--65b63-scroll-the-focused-schedule-chromium\trace.zip
    Usage:

        npx playwright show-trace test-results\s08-keyboard-S-8-Keyboard--65b63-scroll-the-focused-schedule-chromium\trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  1 failed
    [chromium] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule 
  452 passed (6.7m)
EXIT 1
```

  Result:
```
75:| D-59 | Post-G3 fix: portable AC-8.1 "Tab past the last control" assertion | Approved (owner), 2026-10-18 |
76:| D-60 | Group 6 implementation choices | **Proposed**: developer decisions, owner to review at G4.6 |
77-
78-**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.
79-
80----
81-
82-### D-01 Three roles
83-- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
84-- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One "user" role could not justify those stories.
85-- **Alternative:** Two roles (drop R-3). This saves no build work, because the schedule is needed anyway, but it weakens the product story.
86-
87-### D-02 Input bounds
88-- **Proposal:** Loan amount 1,000 to 1,000,000,000 (up to 2 dp); rate 0 to 50% (up to 2 dp); tenure 1 to 40 years or 1 to 480 months (whole numbers).
--
533:### D-59 Post-G3 fix: portable AC-8.1 assertion (owner-approved change to a frozen test)
534-- **Defect (G45-4):** in `e2e/s08-keyboard.spec.ts`, `[AC-8.1] Tab order on a first visit` asserts `expect(resetBtn(page)).not.toBeFocused()` after pressing Tab past Reset, the last tabbable control. Playwright's Firefox keeps focus on the last element in that case, while Chromium and WebKit move it to `BODY`. This was shown on a neutral page by both the developer and the reviewer. The line tests browser behaviour, not the app.
535-- **Decision (owner, 2026-10-18):** replace only that line with a portable check: after the Tab, focus is on Reset or has left the page content (`body` or `document`), but is **not on any other element of the page**. The `clearAllBtn not.toBeFocused()` check before it stays. The `test-designer` makes the edit, and the owner sees the diff.
536-- **Rejected:** removing the line (it loses the "no unexpected focus" check); leaving it failing (S-8 could never be Implemented).
537-
538:### D-60 Group 6 implementation choices (Proposed, owner to review at G4.6)
539:Every S-5 and S-8 test already passed before group 6, apart from the D-59 Firefox issue. So group 6 fixed the layout findings from earlier reviews i
… [1,360 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -nE "Test Files|Tests |size|passed|failed|flaky|EXIT" $TEMP/verify.txt | head -20; sed -n 160,200p e2e/s08-keyboard.spec.ts; for i in 1 2 3; do CI=1 npx playwright test --grep "AC-8.4" --project=chromium 2>&1 | tail -3; done; netstat -ano | grep 4173
```

  Result:
```
3:> npm run lint && npm run format:check && npm run typecheck && npm test && npm run build && npm run size && npm run test:e2e && npm run trace -- --results
43: Test Files  7 passed (7)
44:      Tests  297 passed (297)
57:computing gzip size...
64:> muhammad-arslan-calculator@0.0.0 size
65:> node scripts/size.mjs
68:size: 85.4 KB of 150 KB gzipped JS: OK
560:  1 failed
562:  452 passed (6.7m)
563:EXIT 1
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
  ok 1 [chromium] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (1.1s)

  1 passed (6.8s)

  1 failed
    [chromium] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule 
  ok 1 [chromium] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (863ms)

  1 passed (7.6s)
  TCP    [::1]:50463            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:52583            [::1]:4173             TIME_WAI
… [374 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -rn "scroll-behavior\|scroll-snap\|forced-colors\|prefers-reduced" src | head; for i in 1 2 3 4 5 6; do CI=1 npx playwright test --grep "AC-8.4" --project=chromium 2>&1 | grep -E "passed|failed" | head -1; done
```

  Result:
```
1 passed (7.1s)
  1 passed (7.6s)
  1 failed
  1 failed
  1 failed
  1 failed
```

- **Bash**

```bash
sed -n 1,40p e2e/s08-keyboard.spec.ts | head -60; ls e2e e2e/review
```

  Result:
```
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
e2e:
fixtures.ts
review
s01-calculate.spec.ts
s02-validation.spec.ts
s03-totals.spec.ts
s04-stale.spec.ts
s05-mobile.spec.ts
s06-theme.spec.ts
s07-currency.spec.ts
s08-keyboard.spec.ts
s09-reset.spec.ts
s10-schedule.spec.ts
s11-history.spec.ts
s12-delete.spec.ts
s13-balance.spec.ts
spec-rules.spec.ts

e2e/review:
g45.spec.ts
```

- **Bash**

```bash
cat > e2e/review/probe.spec.ts <<'EOF'
import { calculateLoan, LOANS, open, scheduleRegion, test } from '../fixtures'
test('probe scroll', async ({ page }) => {
  await open(page)
  await calculateLoan(page, LOANS.B)
  const region = scheduleRegion(page)
  await region.focus()
  const top = () => region.evaluate((el) => el.scrollTop)
  const log: string[] = []
  const snap = async (l: string) => { await page.waitForTimeout(600); log.push(l + ' ' + (await top())) }
  await page.keyboard.press('ArrowDown'); await snap('down')
  await page.keyboard.press('PageDown'); await snap('pgdn')
  await page.keyboard.press('PageUp'); await snap('pgup')
  await page.keyboard.press('ArrowUp'); await snap('up')
  console.log(log.join(' | '), await region.evaluate((el) => el.clientHeight + '/' + el.scrollHeight))
})
EOF
for i in 1 2 3; do CI=1 npx playwright test e2e/review/probe.spec.ts --project=chromium 2>&1 | grep -E "\|"; done
```

  Result:
```
down 40 | pgdn 416 | pgup 40 | up 0 430/2257
down 40 | pgdn 416 | pgup 40 | up 0 430/2257
down 40 | pgdn 416 | pgup 40 | up 0 430/2257
```

- **Bash**

```bash
cat > e2e/review/probe.spec.ts <<'EOF'
import { calculateLoan, LOANS, open, scheduleRegion, test } from '../fixtures'
test('probe scroll', async ({ page }) => {
  await open(page)
  await calculateLoan(page, LOANS.B)
  const region = scheduleRegion(page)
  await region.focus()
  const top = () => region.evaluate((el) => el.scrollTop)
  const log: string[] = []
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(50); log.push('d' + (await top()))
  await page.keyboard.press('PageDown'); await page.waitForTimeout(50); log.push('pd' + (await top()))
  const a = await top()
  await page.keyboard.press('PageUp')
  for (let i = 0; i < 12; i++) { await page.waitForTimeout(100); log.push(String(await top())) }
  console.log('R ' + log.join(' ') + ' a=' + a)
})
EOF
for i in 1 2 3 4; do CI=1 npx playwright test e2e/review/probe.spec.ts --project=chromium 2>&1 | grep -E "^R "; done
```

  Result:
```
R d32 pd191 54 40 40 40 40 40 40 40 40 40 40 40 a=262
R d33 pd262 54 40 40 40 40 40 40 40 40 40 40 40 a=327
R d40 pd40 2 0 0 0 0 0 0 0 0 0 0 0 a=40
R d33 pd183 91 40 40 40 40 40 40 40 40 40 40 40 a=254
```

- **Bash**

```bash
rm e2e/review/probe.spec.ts && git log --format='%h %s' g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'; git show 04de524 --stat --format=%s; git show 04de524 -- e2e | head -50; grep -rnE "\.(skip|only|fixme)\(|test\.fail" e2e src test 2>/dev/null | head
```

  Result:
```
04de524 test(S-8): portable AC-8.1 "Tab past the last control" check (owner-approved, D-59)
16c8cc8 test: update frozen tests to the D-54 limits and D-55 guarantee (owner-approved)
5751988 test(e2e): locate summary figures with getByLabel (owner-approved, D-48)
749144e test(S-9): fix AC-9.2 expected currency of USD-made entries (owner-approved, D-46)
test(S-8): portable AC-8.1 "Tab past the last control" check (owner-approved, D-59)

 docs/spec/decision-log.md | 10 ++++++++--
 e2e/s08-keyboard.spec.ts  | 13 ++++++++++++-
 2 files changed, 20 insertions(+), 3 deletions(-)
commit 04de524b1b1dc5841353d1ed6323c431d69b953e
Author: Muhammad Arslan <arslan8954@gmail.com>
Date:   Sun Oct 18 16:24:35 2026 +0500

    test(S-8): portable AC-8.1 "Tab past the last control" check (owner-approved, D-59)
    
    Post-G3 change to one assertion, authorised by the owner (decision-log
    D-59). Playwright's Firefox keeps focus on the last tabbable element when
    Tab is pressed past it; Chromium/WebKit move it to body. The check now
    accepts Reset or "left the page" and rejects any other element. Edit made
    by the test-designer subagent. Also records G4.5 approval (D-57, D-58).
    
    Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

diff --git a/e2e/s08-keyboard.spec.ts b/e2e/s08-keyboard.spec.ts
index a668acd..59e7a37 100644
--- a/e2e/s08-keyboard.spec.ts
+++ b/e2e/s08-keyboard.spec.ts
@@ -53,7 +53,18 @@ test.describe('S-8 Keyboard', () => {
     await expect(clearAllBtn(page)).toBeDisabled()
     await page.keyboard.press('Tab')
     await expect(clearAllBtn(page)).not.toBeFocused()
-    await expect(resetBtn(page)).not.toBeFocused()
+    // Portable across browsers (D-59): Firefox keeps focus on the last control, Chromium/WebKit move it to body.
+    const focusIsOnResetOrLeftPage = await resetBtn(page).evaluate(
+      (el) =>
+        document.activeElement === el ||
+        document.activeElement === null ||
+        document.activeElement === document.body ||
+        document.activeElement === document.documentElement,
+    )
+    expect(
+      focusIsOnResetOrLeftPage,
+      'after Tab past the last control, focus must be on Reset or have left the page content, not on any other element',
+    ).toBe(true)
 
     // Back in, then reverse the whole way.
     await resetBtn(page).focus()
```

- **Bash**

```bash
grep -nE "^export" e2e/fixtures.ts | head -60; cat e2e/review/g45.spec.ts | head -30; grep -n "@media\|min-height\|min-width\|outline\|forced" src/ui/app.css | head -50
```

  Result:
```
6:export const expect = baseExpect
12:export const test = base.extend({
36:export const COPY = {
62:export const HISTORY_KEY = 'emi-calc.v1.history'
63:export const SETTINGS_KEY = 'emi-calc.v1.settings'
68:export interface Loan {
85:export const LOANS = {
186:export type LoanInputValues = Pick<Loan, 'amount' | 'rate' | 'tenure' | 'unit'>
191:export const themeSel = (p: Page) => p.getByLabel('Theme', { exact: true })
192:export const currencySel = (p: Page) => p.getByLabel('Currency', { exact: true })
193:export const amountIn = (p: Page) => p.getByLabel(/^Loan amount \((Rs|\$)\)$/)
194:export const rateIn = (p: Page) => p.getByLabel('Annual interest rate (%)', { exact: true })
195:export const tenureIn = (p: Page) => p.getByLabel('Loan tenure', { exact: true })
196:export const unitSel = (p: Page) => p.getByLabel('Tenure unit', { exact: true })
197:export const calcBtn = (p: Page) => p.getByRole('button', { name: 'Calculate', exact: true })
198:export const resetBtn = (p: Page) => p.getByRole('button', { name: 'Reset', exact: true })
199:export const clearAllBtn = (p: Page) => p.getByRole('button', { name: 'Clear all', exact: true })
200:export const summary = (
204:export const scheduleTable = (p: Page) => p.getByRole('table', { name: 'Repayment schedule' })
205:export const scheduleRegion = (p: Page) => p.getByRole('region', { name: 'Repayment schedule' })
206:export const historyHeading = (p: Page) =>
208:export const historyList = (p: Page) => p.getByRole('list', { name: 'Saved calculations' })
209:export const historyItems = (p: Page) => historyList(p).getByRole('listitem')
210:export const restoreBtn = (p: Page, line1: string) =>
212:export const deleteBtn = (p: Page, line1: string) =>
214:export const confirmDialog = (p: Page) => p.getByRole('dialog', { name: COPY.dialogText })
219:export async function open(page: Page): Promise<void> {
223:export async function fillLoan(page: Page, v: LoanInputValues): Promise<void> {
230:export async function calculate(page: Page): Promise<void> {
234:export async function calculateLoan(page: Page, v: LoanInputValues): Promise<void> {
240:export async function calculateViaEnter(
248:export async function selectedText(select: Locator): Promise<string> {
258:export async function expectSummary(
267:export async function expectNoResults(page: Page): Promise<void> {
273:export async function expectFieldError(field: Locator, message: string): Promise<void> {
280:export async function expectFieldClean(field: Locator): P
… [2,910 more characters not shown; see raw/]
```

- **Bash**

```bash
sed -n 60,100p e2e/fixtures.ts; sed -n 85,100p e2e/fixtures.ts; sed -n 424,470p e2e/fixtures.ts
```

  Result:
```
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

/** History line 1 fo
… [437 more characters not shown; see raw/]
```

- **Bash**

```bash
cat > e2e/review/g46-probe.spec.ts <<'EOF'
import type { Page } from '@playwright/test'
import { amountIn, calcBtn, fillLoan, open, rateIn, seedHistory, tenureIn, unitSel, zeroRateEntry, themeSel, test, expect, LOANS, clearAllBtn } from '../fixtures'

const WIDTHS = [180, 320, 360, 768, 769, 1280, 1920]
async function audit(page: Page) {
  return page.evaluate(() => {
    const out: string[] = []
    const w = window.innerWidth
    const de = document.documentElement
    if (de.scrollWidth > w) out.push(`page overflow ${de.scrollWidth}>${w}`)
    const ctl = Array.from(document.querySelectorAll<HTMLElement>('button,input,select,a,[tabindex="0"]')).filter((e) => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden')
    const rects = ctl.map((e) => ({ e, r: e.getBoundingClientRect() }))
    const name = (e: HTMLElement) => (e.getAttribute('aria-label') || e.textContent || e.id || e.tagName).slice(0, 30)
    for (const { e, r } of rects) {
      if (r.right > w + 0.5 || r.left < -0.5) out.push(`offscreen ${name(e)} ${r.left}-${r.right}`)
      if (w >= 300 && e.tagName !== 'TABLE' && !e.matches('[role=region],.schedule-scroll') && (r.height < 43.5 || (e.tagName === 'BUTTON' && r.width < 43.5))) out.push(`small target ${name(e)} ${r.width}x${r.height}`)
    }
    for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
      const a = rects[i].r, b = rects[j].r
      if (rects[i].e.contains(rects[j].e) || rects[j].e.contains(rects[i].e)) continue
      const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
      if (ox > 1 && oy > 1) out.push(`overlap ${name(rects[i].e)} / ${name(rects[j].e)}`)
    }
    for (const e of Array.from(document.body.querySelectorAll<HTMLElement>('*'))) {
      if (!e.getClientRects().length || e.closest('table')) continue
      const cs = getComputedStyle(e)
      if (e.scrollWidth > e.clientWidth + 1 && e.clientWidth > 0 && cs.display !== 'inline' && !['auto', 'scroll'].includes(cs.overflowX) && e.tagName !== 'INPUT' && e.tagName !== 'SELECT') out.push(`clipped/overflowing ${e.tagName}.${e.className} ${e.scrollWidth}>${e.clientWidth}`)
    }
    return out
  })
}

const big = { amount: '999999999.99', rate: '50', tenure: '480', unit: 'Months' as const }
for (const theme of ['Light', 'Dark']) for (const w of WIDTHS) {
  test(`probe ${theme} ${w}`, async ({ page }) => {
    await page.setViewportSize({ width: w, heigh
… [1,134 more characters not shown; see raw/]
```

  Result:
```
Running 14 tests using 4 workers
  ok  1 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 360 (2.1s)
  ok  3 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 320 (2.3s)
  ok  2 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 768 (2.9s)
  ok  5 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 769 (3.4s)
  ok  6 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 1280 (3.0s)
  ok  7 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 1920 (3.2s)
  x   4 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 180 (4.2s)
  ok  9 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 320 (2.7s)
  ok 10 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 360 (2.4s)
  x   8 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 180 (3.6s)
  ok 11 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 769 (2.8s)
  ok 12 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 1280 (2.9s)
  ok 13 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 768 (2.8s)
  ok 14 [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 1920 (2.0s)
  1) [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Light 180 ──────────────────────────────
    Error: expect(received).toEqual(expected) // deep equality
    - Expected  - 1
    + Received  + 3
    - Array []
    + Array [
    +   "[dialog] overlap Delete Rs 999,999,999.99 at 50 / Cancel",
    + ]
      48 |     await clearAllBtn(page).click(); await rec('dialog')
      49 |     await page.screenshot({ path: `${process.env.TEMP}/shots/${theme}-${w}.png`, fullPage: true })
    > 50 |     expect(found).toEqual([])
         |                   ^
      51 |   })
      52 | }
      53 |
    Error Context: test-results\review-g46-probe-probe-Light-180-chromium\error-context.md
    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results\review-g46-probe-probe-Light-180-chromium\trace.zip
    Usage:
        npx playwright show-trace test-results\review-g46-probe-probe-Light-180-chromium\trace.zip
    ────────────────────────────────────────────────────────────────────────────────────────────────
  2) [chromium] › e2e\review\g46-probe.spec.ts:35:3 › probe Dark 180 ───────────────────────────────
    Error: expect(received).toEqual(expected) // deep equality
    - Expected  - 1
    + Received  + 3
    - Array []
    + Array [
    +   "[dialog] overlap Delete Rs 999,999,99
… [1,021 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\AppData\Local\Temp\shots\Dark-180.png

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\AppData\\Local\\Temp\\shots\\Dark-180.png"
}
```

  Result:
```
[image]
```

- **Bash**

```bash
sed -i 's/expect(found).toEqual(\[\])/expect(found.filter((f) => !f.startsWith("[dialog] overlap"))).toEqual([])/' e2e/review/g46-probe.spec.ts && cat > e2e/review/g46-fc.spec.ts <<'EOF'
import { calcBtn, calculateLoan, LOANS, open, amountIn, test } from '../fixtures'
test('fc', async ({ page, browserName }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await open(page)
  await calculateLoan(page, LOANS.A)
  await amountIn(page).focus()
  const r = async () => page.evaluate(() => { const e = document.activeElement as HTMLElement; const c = getComputedStyle(e); return `${e.tagName} outline=${c.outlineStyle} ${c.outlineWidth} ${c.outlineColor} border=${c.borderStyle} ${c.borderWidth} bg=${c.backgroundColor}` })
  const out: string[] = [await r()]
  for (let i = 0; i < 4; i++) { await page.keyboard.press('Tab'); out.push(await r()) }
  await calcBtn(page).focus(); out.push(await r())
  await page.screenshot({ path: `${process.env.TEMP}/shots/fc-${browserName}.png` })
  console.log('R\n' + out.join('\n'))
})
EOF
CI=1 npx playwright test e2e/review/g46-fc.spec.ts e2e/review/g46-probe.spec.ts 2>&1 | grep -E "^R|outline|passed|failed|overlap|overflow|clipped|small|offscreen"
```

  Result:
```
Running 45 tests using 4 workers
R
INPUT outline=solid 2px rgb(55, 0, 110) border=solid 1px bg=rgb(255, 255, 255)
INPUT outline=solid 2px rgb(55, 0, 110) border=solid 1px bg=rgb(255, 255, 255)
INPUT outline=solid 2px rgb(55, 0, 110) border=solid 1px bg=rgb(255, 255, 255)
SELECT outline=solid 2px rgb(55, 0, 110) border=solid 1px bg=rgb(255, 255, 255)
BUTTON outline=solid 2px rgb(55, 0, 110) border=solid 1px bg=rgb(255, 255, 255)
BUTTON outline=solid 2px rgb(55, 0, 110) border=solid 1px bg=rgb(255, 255, 255)
R
INPUT outline=solid 2px rgb(0, 0, 0) border=solid 1px bg=rgb(255, 255, 255)
INPUT outline=solid 2px rgb(0, 0, 0) border=solid 1px bg=rgb(255, 255, 255)
INPUT outline=solid 2px rgb(0, 0, 0) border=solid 1px bg=rgb(255, 255, 255)
SELECT outline=solid 2px rgb(0, 0, 0) border=solid 1px bg=rgb(233, 233, 237)
BUTTON outline=solid 2px rgb(0, 0, 0) border=solid 1px bg=rgb(208, 208, 215)
BUTTON outline=solid 2px rgb(0, 0, 0) border=solid 1px bg=rgb(208, 208, 215)
R
INPUT outline=solid 2px rgb(29, 78, 216) border=solid 1px bg=rgb(255, 255, 255)
INPUT outline=solid 2px rgb(29, 78, 216) border=solid 1px bg=rgb(255, 255, 255)
INPUT outline=solid 2px rgb(29, 78, 216) border=solid 1px bg=rgb(255, 255, 255)
SELECT outline=solid 2px rgb(29, 78, 216) border=solid 1px bg=rgb(255, 255, 255)
BUTTON outline=solid 2px rgb(29, 78, 216) border=solid 1px bg=rgb(29, 78, 216)
BUTTON outline=solid 2px rgb(29, 78, 216) border=solid 1px bg=rgb(29, 78, 216)
  45 passed (1.4m)
```

- **Bash**

```bash
rm e2e/review/g46-*.spec.ts; rm -rf test-results; netstat -ano | grep -c LISTENING.*4173; grep -rnE ": any|as any|TODO|console\.|toLocaleString|Intl\." src --include=*.ts --include=*.tsx | grep -v test | head; cat src/ui/BreakAfterCommas.tsx; tail -30 docs/process/review-findings.md; git status --short
```

  Result:
```
0
src/domain/format.ts:2:// Deterministic by design: no Intl, no toLocaleString.
cat: src/ui/BreakAfterCommas.tsx: No such file or directory

### The Firefox AC-8.1 failure: the developer's claim is confirmed
Own neutral-page probe (`<input><button>one</button><button>last</button>`, focus the last button, press Tab, report `document.activeElement`), run in all three browsers:
`chromium BODY`, `firefox BUTTON#c` (stays on the last button), `webkit BODY`.
So Playwright's Firefox does not move focus off the last tabbable element on a page with nothing after it, while Chromium and WebKit do. The app part of AC-8.1 passed in Firefox: all eight stops (Theme to Reset) were reached in order and the disabled Clear all was skipped (the failing line is the later `resetBtn not.toBeFocused`). The tab order is not at fault. This is a test-portability defect in a frozen test (the assertion `resetBtn not focused` after Tab past the end). Only the owner may change it (spec §12.4); a portable form would assert only `clearAllBtn not focused`, or compare against `document.activeElement` being outside the page controls. Until then `npm run verify` stays red in Firefox.

### Test integrity
- `git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'`: three commits only, 749144e (D-46), 5751988 (D-48), 16c8cc8 (D-54/D-55), all authorised. None of the group-5 commits (ec76864, 77c3780, 03d8e1d, c0d02c3) touches the scope. Grep of the whole patch for `.skip`, `.only`, `.fixme`, `test.fail`: no hits. No deleted test.

### Conformance
- **§9.2 load:** all four checks run in the spec order (type guard incl. year 2000..9999, `validateInputs`, canonical equality, `emi` equality), then dedupe by id, then `slice(0, 20)`. Non-JSON and non-array return empty; `Decimal` construction is in try/catch. Hostile stores tried in 3 browsers (null/number/string/array/`{}` elements, `{"a":1}`, `"str"`, 200,000 nested `[`, `__proto__`, duplicate ids, `monthlyPayment` `1e999999` and `NaN`, extra keys, year 9999): no throw, no console error, valid elements kept, invalid dropped.
- **§9.3:** `saveEntry`, `deleteEntry`, `clearHistory` all read first or are key-only; duplicate check is against the newest entry as just read; delete is by id; the last delete and Clear all remove the key (probe: key is `null` after deleting 3 of 3 by keyboard); a failed save (probe: `Storage.prototype.setItem` throws) shows the unavailable tex
… [4,213 more characters not shown; see raw/]
```

- **Bash**

```bash
git show 446b087 --stat --format= | head; grep -rn "wbr" src | head -5; ls e2e/review
```

  Result:
```
src/ui/app.css                         | 31 +++++++++++++++++++++++++++----
 src/ui/components/BreakAfterCommas.tsx | 24 ++++++++++++++++++++++++
 src/ui/components/HistoryEntry.tsx     |  9 +++++++--
 src/ui/components/ResultsSummary.tsx   |  8 ++++++--
 4 files changed, 64 insertions(+), 8 deletions(-)
src/ui/components/BreakAfterCommas.tsx:4: * Renders text with a line-break opportunity (<wbr>) after every comma, so long amounts wrap
src/ui/components/BreakAfterCommas.tsx:5: * between digit groups instead of mid-number (G4.3/D-54 review D54-3). <wbr> adds no text, so
src/ui/components/BreakAfterCommas.tsx:17:              ,<wbr />
g45.spec.ts
```

- **Bash**

```bash
cat >> docs/process/review-findings.md <<'EOF'

---

## G4.6 review (2026-10-18): group 6, layout and keyboard (S-5, S-8), full gate

Scope: 04de524, 446b087, 525e012. Reviewer tests: none added (no app defect found; probes deleted).

### Gate
`CI=1 npm run verify` (first run): lint, format, typecheck clean; Vitest 297/297; size 85.4 KB of 150 KB OK; E2E `452 passed, 1 failed`; **exit 1**. The failure: `[chromium] e2e/s08-keyboard.spec.ts:169 [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule` (`expect.poll(top).toBeLessThan(afterPage)` timed out after PageUp). `trace --results` did not run. The developer's "453/453, exit 0" did not reproduce.
Rerun of that one test alone, `CI=1 npx playwright test --grep AC-8.4 --project=chromium`: 3 runs gave pass, fail, pass; 6 more gave pass, pass, fail, fail, fail, fail. So it fails more than half the time here (Windows).
Diagnosis (probes since deleted): the app is right. With 600 ms waits scrollTop goes 40, 416, 40, 0 every time (arrow 40 px, page 376 px, as expected), and there is no `scroll-behavior` in `src`. Chromium's smooth keyboard scrolling animates, and the frozen test samples `afterArrow` and `afterPage` mid-animation without letting it settle, so PageUp can land in a race. It is a timing flake in a frozen test plus the OS smooth-scroll setting, not a layout or keyboard defect.

### Freeze check
`git log g3-tests-approved..HEAD -- <freeze scope>`: exactly 749144e, 5751988, 16c8cc8, 04de524. 04de524 changes one assertion in `e2e/s08-keyboard.spec.ts` (plus the decision log). `resetBtn not.toBeFocused` becomes an `evaluate` that is true only if `activeElement` is Reset, null, `body` or `documentElement`. Focus on any other page element (Calculate, Clear all, an input) gives false, so the failure is still caught. The `clearAllBtn not.toBeFocused` line is untouched. No `.skip/.only/.fixme/test.fail` anywhere in `e2e`, `src`, `test`. Note: a weaker point only, focus on `body` passes even if the app wrongly blurred Reset, which is what D-59 asks for.

### Conformance and exploratory (Chromium, Firefox, WebKit)
Probe: 7 widths (180, 320, 360, 768, 769, 1280, 1920) x light and dark x states (empty with 4 long history entries, validation errors, 999,999,999.99 / 50% / 480 months results, stale, Clear all dialog open), checking page overflow, controls off-screen, tap targets under 44 px (width 300 and up), overlapping control boxes, and clipped or overflowing non-scroll elements. Result: 0 problems in 
… [1,985 more characters not shown; see raw/]
```

- **SubagentHandback**

```json
{
 "message": "G4.6 review done; section appended to C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\review-findings.md.\n\nGate: the developer's \"453/453, verify exit 0\" did NOT reproduce. `CI=1 npm run verify` exited 1. Lint, format and typecheck were clean, Vitest was 297/297, and size was 85.4 KB. E2E was 452 passed, 1 failed: `[chromium] [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule`. `trace --results` did not run.\n\nRerun of that one test alone: 3 runs gave pass, fail, pass; 6 more gave pass, pass, fail, fail, fail, fail. It fails more than half the time here.\n\nThe app is correct. With waits, scrollTop goes 40, 416, 40, 0, and there is no `scroll-behavior` in `src`. The frozen test samples scrollTop mid-way through Chromium's smooth-scroll animation, so PageUp races. It is a timing flake plus the OS smooth-scroll setting, not an app defect. Verify is still red, though, so D-60's \"exit condition met\" line is false, and I rated it Blocker (G46-1). Fix options for the owner: add `--disable-smooth-scrolling` to the Chromium launch args in `playwright.config.ts`, or make the test wait for scrollTop to settle. Both are frozen scope and need owner approval. The developer should correct the D-60 claim (G46-2, Minor).\n\nFreeze check: changes after g3-tests-approved are exactly 749144e, 5751988, 16c8cc8 and 04de524. 04de524 changes only the one AC-8.1 assertion. The replacement still fails if focus sits on any page element other 
… [983 more characters not shown; see raw/]
```

  Result:
```
(Bash completed with no output)
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

