# Subagent 20: code-reviewer: Phase 5 whole-app review

Subagent **`code-reviewer`**, task: *Phase 5 whole-app review*. Started 2026-10-19 09:40 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-19 09:40 PKT

> Phase 5, round 1: independent review of the WHOLE Loan EMI Calculator app, including exploratory testing. Follow your agent instructions in full (.claude/agents/code-reviewer.md). This is the last review before the owner's manual check at Gate G5, so be thorough and adversarial.
> 
> Scope: every v1 story (S-1 to S-13 and S-19 to S-22, 110 ACs in docs/user-stories.md) against docs/spec/technical-spec.md and docs/spec/decision-log.md (D-00 to D-75). Also review the new root README.md (commit 10a67df / bf745ad) for accuracy against the repo: every command, version, link and claim must be true. The README has one intentional TODO(owner) left (story statuses, pending G5); don't flag that one.
> 
> Required checks:
> 1. Freeze integrity: `git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'`. The authorised post-freeze changes are D-46 (749144e), D-48 (5751988), D-54/55 (16c8cc8), D-59 (04de524), D-61 (95259bc), and the G3b visual tests frozen at tag g3b-visuals-tests-approved (c62d9c2). Anything else is a Blocker. Also check nothing changed in the G3b tests after that tag.
> 2. Hard rules from CLAUDE.md: money never a JS number (D-71 allows dimensionless drawing ratios and percentages for geometry only); Decimal imported only from src/domain/money.ts; all visible text from src/ui/copy.ts matching spec §7 exactly; inputs type="text" with inputmode; no new dependencies beyond spec §2; no runtime network; layer boundaries.
> 3. Run `CI=1 npm run verify` once (always CI=1: a stale preview on 4173 can otherwise be reused). The laptop must be on mains power (check `(Get-CimInstance Win32_Battery).BatteryStatus` = 2 in PowerShell); on battery, WebKit times out (D-73). Known: on Windows, WebKit can still time out occasionally under the full parallel run (D-64, D-68, F-4). If a WebKit test fails with a timeout, re-run that test alone in WebKit (`--repeat-each=5`) before classifying it, and report both results honestly. The developer will not run Playwright while you work. The Linux CI runs are green (runs 39150790709, 39153885811, 39157457308, 39159243645).
> 4. Exploratory testing beyond the ACs: a dev server is already running at http://localhost:5173/ (don't stop it), and the live site is https://iarslandogar.github.io/Loan-calculator/. Try to break it: odd inputs, rapid edits, keyboard-only use, narrow and zoomed widths (360 px, 180 px), dark mode, forced colours, two tabs, blocked storage, Restore/Delete/Clear all edge cases, the charts and tooltips, the sticky form (D-69) on short and tall windows.
> 5. The pre-submission audit (submission-audit.md §8) lists four known UX issues that are NOT covered by any AC: (a) on a phone the page doesn't scroll to the results after Calculate (at 360x740 the results start at 738 px); (b) no undo on a single Delete; (c) no favicon (favicon.ico 404); (d) the chart axis shows "1200" next to the caption "over 1,200 months". For each, give a severity and say whether it breaks any AC, spec rule or role guarantee in docs/app-roles.md, or is an improvement outside the spec. Don't inflate: a gap the spec never asked for isn't a Blocker.
> 
> Output: append a "Phase 5, round 1" section to docs/process/review-findings.md in the existing format (ID, severity Blocker/Major/Minor, story/AC, evidence with reproduction steps, suggested fix). You may add reviewer tests under e2e/review/ for anything you can prove fails; tag them [REVIEW-P5-n]. Don't edit any other file. Your final reply must end with the exact line `BLOCKING FINDINGS: N` (Blockers plus Majors), and a short list of each finding with its severity, plus the verify result (exit code and pass/fail counts per browser).

<details><summary>🔧 38 tool call(s): Bash ×38</summary>

- **Bash**

```bash
git status --short | head; git log --oneline | head -30; git tag; git log --format='%h %s' g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'
```

- **Bash**

```bash
tail -60 docs/process/review-findings.md; ls e2e/review; powershell -c "(Get-CimInstance Win32_Battery).BatteryStatus"
```

  Result:
```
bf745ad docs: README reason and hand-edits from the owner; D-75 Phase 5 start
de68a27 docs: add the pre-submission audit report
10a67df docs: add the root README for the submission (owner TODOs marked)
68c9e02 style: format eslint.config.js
bf08ec1 docs: add development transcripts and PDF (D-74)
edd3994 docs: record the first deploy and CI results (D-73)
182e87d docs: visuals mini-gate decisions, D-71 spec line, D-72, D-73
85e494c perf(S-19): no forced layout in the yearly overflow check (AC-10.8, D-72)
ed23f6b fix(S-5): sticky form whenever side by side; card scrolls in short windows (D-69)
c5d197a docs: record the D-70 verify result
bf060cd docs: record D-70 visuals review fixes
61e51b9 fix(S-19..S-22): yearly table scroll region, forced-colors marks, memoised charts
6c5edee test(review): visuals review findings and REVIEW-V1/V2 tests
4333476 docs: record the visuals implementation (D-68) and the sticky form (D-69)
a19ea7f feat(S-5): sticky loan form beside the results on wide, tall windows (owner request, D-69)
0dc743a feat(S-19): yearly summary chart and table; charts placed in the results card; validated chart palette
323f1f3 feat(S-22): interest and principal in each payment chart
0f656e4 feat(S-21): balance over time chart
e30a41d feat(S-20): cost breakdown bar
fd97fa6 feat(S-21): shared chart geometry, legend, axis ends, tooltip and hover band (D-66, D-68)
0d9967c feat(S-20): chart and yearly-summary copy (spec §7, D-65, D-67)
a5ee7e7 feat(S-19): costSplit, interestShare, yearlySummary and formatPercent (spec §3.1.1, D-65; S-20, S-22)
c62d9c2 docs(G3b): approve the visuals tests, close three copy gaps, record readings (D-66, D-67)
1a70f9d docs(test): manual checklist lines for the 16 visual ACs
52f75ad test(D-65): E2E specs for S-19..S-22 visuals (G3b)
892d518 test(D-65): domain and property tests for costSplit, interestShare, yearlySummary, formatPercent (G3b)
77c223f docs(D-66): define chart test hooks before the G3b tests are written
c1ce542 chore(D-65): throwing stubs for costSplit, interestShare, yearlySummary and formatPercent
19d044b docs(D-65): add visuals S-20..S-22, move S-19 to v1, spec chart rules and copy (owner-approved)
4063ea4 docs: code-review findings for the redesign (0 blocking, 4 Minor)
g3-tests-approved
g3b-visuals-tests-approved
52f75ad test(D-65): E2E specs for S-19..S-22 visuals (G3b)
892d518 test(D-65): domain and property tests for costSplit, interestShare, yearlySummary, formatPercent (G3b)
95259bc test(S-8): AC-8.4 wai
… [432 more characters not shown; see raw/]
```

  Result:
```
| disabled button text (--text-muted on --bg) | 6.32 | 8.47 |
| --on-primary on primary | 8.22 | 10.12 |
| --input-border on bg | 3.48 | 4.30 |
| --focus on bg / surface | 5.17 / 5.67 | 10.12 / 9.17 |

  All pass 4.5:1 for text and 3:1 for UI. Lowest: `--error` on rose, light, 4.83. The invalid-field border is `--error`, not `--input-border`, so the 2.84 of `--input-border` on rose in light is not a failing pair.
- **Focus:** 3px solid outline (offset 3px), on the inputs, buttons, `.schedule-scroll` and the history h2 after Delete, in all 3 browsers.
- **Targets at 360 and 180 px:** no visible button, input, select or scroll region under 44×44, dialog open. Dialog width is 328 at 360 and 148 at 180, with no overflow.
- **Sticky:** at 360 px with `scrollLeft = 200`, the Month header and cells stay at the container's left edge (38 px against a container at 37 px) and the header row stays at the top, in Chromium, Firefox and WebKit. The Month column is opaque, with zebra rows handled.
- **Dialog:** blurred scrim, Clear has a rose fill and a 2px error border, Cancel is focused first, in both themes. Looks right.
- **Visual comparison against the four reference PNGs (Chromium):** layout, colours, icons, the stale peach state with border, mint tile, butter note, dialog and header mark all match. Meaningful differences, all from the boards' example data:
  - the board shows `10,00,000` in the amount input; the app keeps the raw text, as the spec says;
  - the board's field-error texts ("Interest rate must be between 0 and 75%") differ from the §7 copy the app uses;
  - the app shows a focus ring on the first invalid field after a failed Calculate, which is by spec;
  - the board's figures (66,185.46) are known to be wrong.

BLOCKING FINDINGS: 0

---

## Visuals mini-gate review (2026-10-18)

Scope: S-19 (v1), S-20, S-21, S-22 and the sticky form (D-69). Commits a5ee7e7 to 4333476. Reviewer: code-reviewer (Sonnet), independent of the developer.

### Gate
- `CI=1 npm run verify` on my run: **exit 1**. Lint, format, typecheck OK; Vitest 345 of 345; size 87.1 KB of 150 KB; E2E **541 passed, 2 failed**. Both failures are WebKit 30 s test timeouts in `[SPEC-§9.3]` two-tab tests ("after Clear all in tab B, a Calculate in tab A must not bring the cleared entries back" and "the duplicate check compares with the newest entry as just re-read"). The `trace --results` step did not run because E2E failed.
- Re-runs of the same tests (`--project=webkit --grep "9.3" --repeat-eac
… [8,868 more characters not shown; see raw/]
```

- **Bash**

```bash
git diff --stat g3b-visuals-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'; git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/' | grep -nE '^[+-].*(\.skip|\.only|\.fixme|test\.fail|todo)' | head; git status --short | head
```

- **Bash**

```bash
(CI=1 npm run verify > /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log 2>&1; echo EXIT $? >> /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log) ; tail -40 /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log
```

  Result:
```
(Bash completed with no output)
```

  Result:
```
Command running in background with ID: bbwkxlldn. Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bbwkxlldn.output. You will be notified when it completes — do not poll that file or sleep while waiting. Read the file only if the user asks for progress, or if you need a line it prints before you can go on, such as a server's ready line or port.
```

- **Bash**

```bash
git ls-files src | grep -v test; wc -l src/domain/*.ts src/storage/*.ts | tail -20; cat src/domain/loan.ts src/domain/parse.ts src/domain/validate.ts
```

  Result:
```
src/domain/format.ts
src/domain/loan.ts
src/domain/money.ts
src/domain/parse.ts
src/domain/summary.ts
src/domain/types.ts
src/domain/validate.ts
src/main.tsx
src/storage/history.ts
src/storage/safeStorage.ts
src/storage/settings.ts
src/ui/App.tsx
src/ui/AppContext.tsx
src/ui/app.css
src/ui/appReducer.ts
src/ui/components/BreakAfterCommas.tsx
src/ui/components/ConfirmDialog.tsx
src/ui/components/CurrencySelect.tsx
src/ui/components/ErrorBoundary.tsx
src/ui/components/Header.tsx
src/ui/components/HistoryEntry.tsx
src/ui/components/HistoryPanel.tsx
src/ui/components/LoanForm.tsx
src/ui/components/ResultsPanel.tsx
src/ui/components/ResultsSummary.tsx
src/ui/components/RoundingNote.tsx
src/ui/components/ScheduleTable.tsx
src/ui/components/ThemeSelect.tsx
src/ui/components/charts/BalanceChart.tsx
src/ui/components/charts/ChartParts.tsx
src/ui/components/charts/CostBreakdown.tsx
src/ui/components/charts/PaymentMakeupChart.tsx
src/ui/components/charts/YearlySummary.tsx
src/ui/components/charts/chartGeometry.ts
src/ui/copy.ts
src/ui/theme.css
   47 src/domain/format-percent.test.ts
  167 src/domain/format.test.ts
   45 src/domain/format.ts
  415 src/domain/loan.property.test.ts
  358 src/domain/loan.test.ts
   46 src/domain/loan.ts
   95 src/domain/money.test.ts
   30 src/domain/money.ts
   80 src/domain/parse.test.ts
   34 src/domain/parse.ts
  360 src/domain/summary.test.ts
   51 src/domain/summary.ts
   65 src/domain/types.ts
  354 src/domain/validate.test.ts
   85 src/domain/validate.ts
  166 src/storage/history.ts
   49 src/storage/safeStorage.ts
   53 src/storage/settings.ts
 2500 total
// EMI and schedule algorithm (spec §5, normative). Do not "simplify" it (§5.3).
import { Decimal, round2 } from './money'
import type { CalculatedLoan, LoanInput, ScheduleRow } from './types'

/** §5.1, unrounded: B / m when r = 0, otherwise B × r × (1 + r)^m / ((1 + r)^m − 1). */
export function emi(balance: Decimal, monthlyRate: Decimal, months: number): Decimal {
  if (monthlyRate.isZero()) return balance.div(months)
  const growth = monthlyRate.plus(1).pow(months)
  return balance.times(monthlyRate).times(growth).div(growth.minus(1))
}

/** §5.2 re-amortising, cent-accurate schedule. */
export function calculateLoan(input: LoanInput): CalculatedLoan {
  const { amount, annualRate, months } = input
  const monthlyRate = annualRate.div(1200)
  const rows: ScheduleRow[] = []
  let balance = amount

  for (let month = 1; month <= months; month++) {
    // Multiply first, so h
… [5,513 more characters not shown; see raw/]
```

- **Bash**

```bash
cat src/ui/appReducer.ts src/ui/App.tsx src/storage/history.ts src/storage/safeStorage.ts src/storage/settings.ts
```

  Result:
```
// Application state and transitions (spec §3.2).
import type { CalculatedLoan, Currency, ErrorCode, Field, RawInputs, Unit } from '../domain/types'
import type { HistoryEntry } from '../storage/history'
import { defaultSettings, type Settings, type Theme } from '../storage/settings'

export type Results =
  { status: 'idle' } | { status: 'shown'; loan: CalculatedLoan } | { status: 'stale' }

export interface HistoryState {
  /** False when storage is blocked, or after a failed save, for the rest of the visit (§9.1, §9.3). */
  available: boolean
  entries: HistoryEntry[]
  /** A delete or Clear all could not be written (D-28); cleared by the next successful change. */
  removeFailed: boolean
}

export interface AppState {
  inputs: RawInputs
  errors: Partial<Record<Field, ErrorCode>>
  results: Results
  settings: Settings
  history: HistoryState
}

export type Action =
  | { type: 'edit'; field: 'amount' | 'rate' | 'tenure'; value: string }
  | { type: 'setUnit'; unit: Unit }
  | { type: 'invalid'; errors: Partial<Record<Field, ErrorCode>> }
  | { type: 'calculated'; loan: CalculatedLoan }
  | { type: 'reset' }
  | { type: 'setCurrency'; currency: Currency }
  | { type: 'setTheme'; theme: Theme }
  | { type: 'restore'; inputs: RawInputs; currency: Currency; loan: CalculatedLoan }
  | { type: 'historyChanged'; entries: HistoryEntry[] }
  | { type: 'historyReloaded'; entries: HistoryEntry[] }
  | { type: 'historyUnavailable' }
  | { type: 'historyRemoveFailed' }

export const emptyInputs: RawInputs = { amount: '', rate: '', tenure: '', unit: 'years' }

export const initialState: AppState = {
  inputs: emptyInputs,
  errors: {},
  results: { status: 'idle' },
  settings: defaultSettings,
  history: { available: true, entries: [], removeFailed: false },
}

function withoutError(errors: AppState['errors'], field: Field): AppState['errors'] {
  if (!(field in errors)) return errors
  const next = { ...errors }
  delete next[field]
  return next
}

/** Shown results become stale on any input change; idle stays idle. */
function staleIfShown(results: Results): Results {
  return results.status === 'shown' ? { status: 'stale' } : results
}

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'edit':
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
        errors: withoutError(state.errors, action.field),
        results: staleIfShown(state.results),
      }
 
… [11,605 more characters not shown; see raw/]
```

- **Bash**

```bash
cat src/ui/AppContext.tsx src/ui/components/LoanForm.tsx src/ui/components/HistoryPanel.tsx src/ui/components/ConfirmDialog.tsx src/ui/components/ResultsPanel.tsx
```

  Result:
```
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import { loadHistory } from '../storage/history'
import { loadSettings, saveSettings, type Settings, type Theme } from '../storage/settings'
import { appReducer, initialState, type Action, type AppState } from './appReducer'

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<Action>
  /** Changes a setting and persists it (spec §3.2: "Update settings and persist"). */
  updateSettings: (change: Partial<Settings>) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const DARK_QUERY = '(prefers-color-scheme: dark)'

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/** Applies the resolved theme to <html> and follows the device while "System" is chosen. */
function useAppliedTheme(theme: Theme) {
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(theme)
    }
    apply()
    if (theme !== 'system') return
    const media = window.matchMedia(DARK_QUERY)
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])
}

// Settings and history are read before the first render, so nothing flashes the defaults.
const init = (): AppState => ({
  ...initialState,
  settings: loadSettings(),
  history: { ...loadHistory(), removeFailed: false },
})

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, init)
  useAppliedTheme(state.settings.theme)

  function updateSettings(change: Partial<Settings>) {
    if (change.currency) dispatch({ type: 'setCurrency', currency: change.currency })
    if (change.theme) dispatch({ type: 'setTheme', theme: change.theme })
    // Merge over what is stored now, not this tab's copy, so another tab's change to the
    // other setting is not overwritten (G4.4 review G44-1; same idea as D-13).
    saveSettings({ ...loadSettings(), ...change })
  }

  return (
    <AppContext.Provider value={{ state, dispatch, updateSettings }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const value = useContext(AppContext)
  if (!value) throw new Error('useApp must be used inside <AppProvider>')
  return value
}
import { useRef, type FormEvent, type
… [13,850 more characters not shown; see raw/]
```

- **Bash**

```bash
cat src/ui/copy.ts src/domain/money.ts src/domain/format.ts src/domain/summary.ts src/ui/components/ResultsSummary.tsx src/ui/components/HistoryEntry.tsx src/ui/components/BreakAfterCommas.tsx
```

  Result:
```
// Every user-visible string (spec §7), character for character. Components never hard-code text.
// Apostrophes are the ASCII ' character.
import type { Currency, ErrorCode, Unit } from '../domain/types'

const symbol = (currency: Currency) => (currency === 'PKR' ? 'Rs' : '$')

export const copy = {
  app: {
    title: 'Loan EMI Calculator',
    tagline: 'Work out the monthly payment, total cost and repayment schedule of a loan.',
  },
  theme: {
    label: 'Theme',
    options: { system: 'System', light: 'Light', dark: 'Dark' },
  },
  currency: {
    label: 'Currency',
    options: { PKR: 'PKR (Rs)', USD: 'USD ($)' } satisfies Record<Currency, string>,
    note: 'Changing currency changes the symbol only. Amounts are not converted.',
  },
  field: {
    amount: (currency: Currency) => `Loan amount (${symbol(currency)})`,
    rate: 'Annual interest rate (%)',
    tenure: 'Loan tenure',
    unit: 'Tenure unit',
    unitOptions: { years: 'Years', months: 'Months' } satisfies Record<Unit, string>,
  },
  btn: {
    calculate: 'Calculate',
    reset: 'Reset',
  },
  results: {
    idle: 'Enter your loan details and select Calculate.',
    stale: 'Your inputs have changed. Select Calculate to see updated results.',
  },
  summary: {
    monthly: 'Monthly payment',
    interest: 'Total interest',
    total: 'Total amount payable',
  },
  note: {
    rounding: 'Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.',
  },
  schedule: {
    title: 'Repayment schedule',
    cols: (currency: Currency) => {
      const s = `(${symbol(currency)})`
      return ['Month', `Payment ${s}`, `Interest ${s}`, `Principal ${s}`, `Balance ${s}`]
    },
  },
  history: {
    title: 'Saved calculations',
    empty: 'No saved calculations yet.',
    unavailable: "Saved calculations aren't available in this browser. Calculations still work.",
    line1: (amount: string, rate: string, tenure: string) => `${amount} at ${rate} for ${tenure}`,
    line2: (monthly: string) => `${monthly} per month`,
    line3: (datetime: string) => datetime,
    restore: 'Restore',
    restoreName: (line1: string, datetime: string) => `Restore ${line1}, saved ${datetime}`,
    delete: 'Delete',
    deleteName: (line1: string, datetime: string) => `Delete ${line1}, saved ${datetime}`,
    clearAll: 'Clear all',
    removeFailed:
      "Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.",
  },
  dialog: {
    cl
… [11,070 more characters not shown; see raw/]
```

- **Bash**

```bash
cat README.md; cat package.json; cat .nvmrc; ls; ls .github/workflows
```

  Result:
````
# Loan EMI Calculator

A browser app that works out the equal monthly instalment (EMI), the total interest, the total amount payable and the month-by-month repayment schedule of a reducing-balance loan. It shows amounts in PKR or USD, has light and dark themes, saves recent calculations in the browser, and works from the keyboard and on a phone. It is client-only: there is no backend, and after the page loads it makes no network requests.

**Who it's for** (from [docs/app-roles.md](docs/app-roles.md)):

- **R-1 Prospective Borrower:** "Can I afford this, and what will it really cost me?" Not a finance expert, often on a phone.
- **R-2 Loan Advisor:** "Give the customer an exact, defensible quote, fast." Many quotes a day, keyboard-first, needs recall and privacy between customers.
- **R-3 Existing Borrower:** "Where is my money going, and what do I still owe?" Already repaying; cares about the schedule and the remaining balance.

**Why a loan EMI calculator:** it is a highly practical, mathematically deterministic problem space, well suited to demonstrating core software engineering principles.

## Live app

**https://iarslandogar.github.io/Loan-calculator/**

It is deployed by GitHub Actions on every push to `main`, after the full test suite passes. A smoke test then runs against the live URL.

## Prerequisites

- **Node.js 24** (any 24.x; developed on 24.16.0). This is pinned in `.nvmrc` (`24`) and in `package.json` (`"engines": { "node": ">=24 <25" }`). **Other Node major versions are not supported.**
- **npm**, which comes with Node (developed with npm 11.13.0).
- For the end-to-end tests only: the Playwright browsers. See [Tests](#tests).

No accounts, keys or services are needed.

## Install and start

```bash
npm ci
npm run dev
```

`npm run dev` starts Vite and prints the local URL: **http://localhost:5173/** (if that port is busy, Vite picks the next free one and prints it).

Production build and local preview:

```bash
npm run build      # type-checks the app and writes dist/
npm run preview    # serves dist/ at http://localhost:4173/
```

## Tests

| Command | What it runs |
|---|---|
| `npm test` | Unit and property tests (Vitest, with fast-check for the property tests). |
| `npm run test:e2e` | End-to-end tests (Playwright) in Chromium, Firefox and WebKit, against the production build, which it builds and serves itself. |
| `npm run trace` | Traceability check: roles → jobs → stories → acceptance criteria → tests. Fails if any v1 acceptance cr
… [8,075 more characters not shown; see raw/]
````

- **Bash**

```bash
node -v; npm -v; git remote -v; ls transcripts | head -30; ls transcripts/* | head -50; cat .github/workflows/deploy.yml; tail -5 docs/spec/decision-log.md | cut -c1-200; grep -n "^| D-7" docs/spec/decision-log.md | cut -c1-200; ls docs/process; cat index.html; cat .gitignore
```

  Result:
```
v24.16.0
11.13.0
origin	https://github.com/iarslandogar/Loan-calculator.git (fetch)
origin	https://github.com/iarslandogar/Loan-calculator.git (push)
README.md
make_pdf.cjs
make_pdf.py
make_transcripts.py
raw
session-01-claude-code.md
session-01-conversation.html
session-01-conversation.pdf
subagents
transcripts/README.md
transcripts/make_pdf.cjs
transcripts/make_pdf.py
transcripts/make_transcripts.py
transcripts/session-01-claude-code.md
transcripts/session-01-conversation.html
transcripts/session-01-conversation.pdf

transcripts/raw:
session-01-claude-code.jsonl
subagents

transcripts/subagents:
01-Plan-critique-emi-calculator-plan.md
02-spec-critic-phase-1-spec-challenge.md
03-test-designer-phase-3-domain-tests.md
04-test-designer-phase-3-ui-e2e-tests.md
05-code-reviewer-review-phase-4-group-1-domain.md
06-test-designer-fix-ac-9-2-expected-strings.md
07-test-designer-fix-summary-locator-per-d-48.md
08-code-reviewer-review-phase-4-group-2-core-ui.md
09-code-reviewer-review-phase-4-group-3-schedule.md
10-code-reviewer-review-phase-4-group-4-settings.md
11-test-designer-update-tests-for-d-54-d-55-limits.md
12-code-reviewer-review-d-54-d-55-limits-change.md
13-code-reviewer-review-phase-4-group-5-history.md
14-test-designer-make-ac-8-1-assertion-portable.md
15-code-reviewer-review-phase-4-group-6-layout-keyboard.md
16-test-designer-fix-ac-8-4-smooth-scroll-race.md
17-code-reviewer-review-the-pastel-redesign-change.md
18-test-designer-write-g3b-tests-for-the-visuals.md
19-code-reviewer-review-visuals-and-sticky-form.md
# Spec §14: on push to main, verify, deploy to GitHub Pages, then smoke-test the live URL.
# One-time manual step: Settings → Pages → Source: GitHub Actions.
name: Deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  verify:
    uses: ./.github/workflows/ci.yml

  deploy:
    needs: verify
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    outputs:
      page_url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version-file: .nvmrc
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          BASE_PATH: /${{ github.event.repository.name }}/
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@
… [3,736 more characters not shown; see raw/]
```

- **Bash**

```bash
git ls-files | grep -E '^(node_modules|dist|reports|test-results)/' | head -3; grep -rlE 'ghp_|github_pat_|sk-ant|AKIA[0-9A-Z]{12}|BEGIN (RSA|PRIVATE)' transcripts README.md docs 2>/dev/null | head; grep -c . submission-audit.md; sed -n '/## 8/,/^## 9/p' submission-audit.md | head -60
```

  Result:
```
transcripts/make_transcripts.py
transcripts/raw/session-01-claude-code.jsonl
transcripts/session-01-claude-code.md
290
## 8. Known defects

**Defect list in the repo:** no dedicated defect or issues file. `docs/process/review-findings.md` is the code-reviewer's findings log, and `docs/process/manual-test-checklist.md` is the manual checklist; neither mentions the five items below.

| Item | Verdict | Evidence |
|---|---|---|
| Results don't scroll into view on mobile after Calculate | **Not fixed** | No `scrollIntoView` or `scrollTo` in `src/`. On success, `LoanForm.tsx` (lines 54–70) moves focus only on errors (to the first invalid field) and on Reset. Probe on the live site at 360 × 740 after Calculate with L-A: `scrollY 0`, results card top at **738 px** of a 740 px screen, Monthly payment **not visible**. |
| No undo on delete | **Not fixed** | No "undo" anywhere in `src/` (the only match is the dialog copy "This can't be undone."). A single **Delete** removes the entry at once (`HistoryEntry.tsx:50` → `HistoryPanel.tsx:81`); only **Clear all** asks to confirm. No AC requires undo. |
| Duplicate saves possible | **Partly; by design** | `src/storage/history.ts:136–148`: a save is skipped when the newest stored entry has the same currency, amount, rate, tenure and unit (AC-11.5, tested). A repeat that isn't the newest entry *is* saved again, as AC-11.5's second case requires ("a new L-A entry is added at the top and the older one stays"). Saves re-read storage first, which narrows two-tab races (spec §9.3). |
| Inconsistent number formatting | **Mostly consistent; one minor inconsistency** | Money uses one deterministic formatter (`src/domain/money.ts`; no `Intl` or `toLocaleString`, enforced by lint; 43 tests). Inconsistency: the chart axis end shows **"1200"** ungrouped (`ChartParts.tsx:32`), while the caption beside it says "over **1,200** months". The schedule's Month column is also ungrouped ("1200"), as the frozen AC-10.8 test expects. Inputs keep the text as typed (by design). |
| Missing favicon | **Not fixed** | `index.html` has no `<link rel="icon">`; there is no `public/` folder and no favicon file. `https://iarslandogar.github.io/Loan-calculator/favicon.ico` returns **HTTP 404**. |

Git log: no commit message mentions scroll-into-view, undo, favicon or number-format fixes.

## 9. Session transcripts
```

- **Bash**

```bash
grep -ohE 'ghp_[A-Za-z0-9]{0,10}|github_pat_[A-Za-z0-9_]{0,10}|sk-ant[A-Za-z0-9-]{0,10}|AKIA[0-9A-Z]{12}|BEGIN (RSA|PRIVATE)[A-Z ]*' transcripts/make_transcripts.py transcripts/raw/session-01-claude-code.jsonl transcripts/session-01-claude-code.md | sort | uniq -c | head
```

  Result:
```
9 github_pat_
      9 sk-ant-
```

- **Bash**

```bash
grep -rnE "toNumber|Number\(|parseFloat|parseInt|Intl|toLocale|decimal\.js|: any|as any|@ts-ignore|fetch\(|XMLHttp|http[s]?://" src --include=*.ts --include=*.tsx --include=*.css | grep -v "\.test\." ; cat src/ui/components/charts/chartGeometry.ts src/ui/components/charts/ChartParts.tsx
```

  Result:
```
src/domain/format.ts:2:// Deterministic by design: no Intl, no toLocaleString.
src/domain/money.ts:2:// The only module allowed to import decimal.js (D-36).
src/domain/money.ts:3:import DecimalJs from 'decimal.js'
src/domain/validate.ts:49:  return { ok: true, value: value.toNumber() }
src/ui/app.css:337:  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none' stroke='%232A2540' stroke-linecap='round'%3E%3Crect x='12' y='9' width='16' height='22' rx='3.5' stroke-width='2'/%3E%3Cpath d='M16 14h8M16 20h.01M20 20h.01M24 20h.01M16 25h.01M20 25h.01M24 25h.01' stroke-width='2.4'/%3E%3C/svg%3E");
src/ui/app.css:340:  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none' stroke='%23EEEAF8' stroke-linecap='round'%3E%3Crect x='12' y='9' width='16' height='22' rx='3.5' stroke-width='2'/%3E%3Cpath d='M16 14h8M16 20h.01M20 20h.01M24 20h.01M16 25h.01M20 25h.01M24 25h.01' stroke-width='2.4'/%3E%3C/svg%3E");
src/ui/app.css:348:  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none' stroke='%232A2540' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M28 16a9 9 0 0 0-15.5-2.5M12 24a9 9 0 0 0 15.5 2.5M12 9v5h5M28 31v-5h-5'/%3E%3C/svg%3E");
src/ui/app.css:351:  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='none' stroke='%23EEEAF8' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M28 16a9 9 0 0 0-15.5-2.5M12 24a9 9 0 0 0 15.5 2.5M12 9v5h5M28 31v-5h-5'/%3E%3C/svg%3E");
src/ui/app.css:539:  overflow-wrap: anywhere;
src/ui/app.css:844:  overflow-wrap: anywhere;
src/ui/app.css:981:  overflow-wrap: anywhere;
src/ui/components/charts/chartGeometry.ts:17:  return value.div(max).toDecimalPlaces(6).toNumber()
src/ui/components/charts/CostBreakdown.tsx:21:            style={{ flexGrow: loanPercent.toNumber() }}
src/ui/components/charts/CostBreakdown.tsx:28:              style={{ flexGrow: interestPercent.toNumber() }}
// Shared chart geometry (spec §8.3.2, D-66, D-68). Every chart uses the same band layout:
// item k (0-based) of n occupies [k/n, (k+1)/n] of the plot width, so its centre is at
// (k + 0.5) / n, which is where the hover hook in the DOM contract expects it.
import { useState, type PointerEvent } from 'react'
import { Decimal } from '../../../domain/money'

/** The SVG 
… [4,656 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -n -B3 -A18 "sticky" src/ui/app.css | sed -n 1,140p
```

  Result:
```
112-  gap: var(--space-6);
113-}
114-
115:/* Form left, results right. The form/results row is its own box so the sticky form stops at
116-   the end of the results and never covers Saved calculations (D-69). */
117-.layout-main {
118-  display: grid;
119-  grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
120-  gap: var(--space-6);
121-  align-items: start;
122-}
123-
124-.card {
125-  min-width: 0;
126-  background: var(--surface);
127-  border: 1px solid var(--border);
128-  border-radius: var(--radius-card);
129-  padding: var(--space-7);
130-  box-shadow: var(--shadow-card);
131-}
132-
133-.history-card {
--
140-   calculations. */
141-@media (min-width: 769px) {
142-  .form-card {
143:    position: sticky;
144-    top: var(--space-6);
145-    max-height: calc(100vh - 2 * var(--space-6));
146-    overflow-y: auto;
147-  }
148-}
149-
150-/* ---------- 5. Form ------------------------------------------------------ */
151-
152-.field {
153-  display: flex;
154-  flex-direction: column;
155-  gap: 6px;
156-  margin-bottom: 18px;
157-  min-width: 0;
158-}
159-
160-label {
161-  font-size: 14px;
--
438-
439-.schedule table {
440-  width: 100%;
441:  border-collapse: separate; /* keeps sticky header borders in all engines */
442-  border-spacing: 0;
443-  font-size: 14px;
444-  font-variant-numeric: tabular-nums;
445-}
446-
447-.schedule th {
448:  position: sticky;
449-  top: 0;
450-  z-index: 1;
451-  padding: var(--space-3) var(--space-4);
452-  background: var(--wash);
453-  border-bottom: 1.5px solid var(--input-border);
454-  color: var(--text-muted);
455-  font-size: 12px;
456-  font-weight: 700;
457-  text-transform: uppercase;
458-  letter-spacing: 0.06em;
459-  text-align: right;
460-  white-space: nowrap;
461-}
462-
463-.schedule td {
464-  padding: 10px var(--space-4);
465-  border-bottom: 1px solid var(--border);
466-  text-align: right;
--
717-  /* Month column stays put while the table scrolls sideways (proposal P3; pure CSS). */
718-  .schedule th:first-child,
719-  .schedule td:first-child {
720:    position: sticky;
721-    left: 0;
722-    z-index: 2;
723-  }
724-  .schedule th:first-child {
725-    z-index: 3;
726-  }
727-  .schedule td:first-child {
728-    background: var(--surface);
729-    box-shadow: 1px 0 0 var(--border);
730-  }
731-  .schedule tbody tr:nth-child(even) td:first-child {
732-    background: var(--band);
733-  }
734-
735-  .history-list {
736-    grid-template-columns: minmax(0, 1fr);
737-  }
738-  .history-entry 
… [1 more characters not shown; see raw/]
```

- **Bash**

```bash
sleep 240; tail -5 /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log
```

  Result (error):
```
<tool_use_error>Blocked: sleep 240 followed by: tail -5 /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log. To wait for a condition, use Monitor with an until-loop (e.g. `until <check>; do sleep 2; done`). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.</tool_use_error>
```

- **Bash**

```bash
until grep -q '^EXIT' /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log 2>/dev/null; do sleep 5; done; tail -30 /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: b5bfvujqx). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\b5bfvujqx.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
cat src/ui/components/charts/YearlySummary.tsx src/ui/components/charts/CostBreakdown.tsx src/ui/components/charts/BalanceChart.tsx src/ui/components/ScheduleTable.tsx src/ui/components/ErrorBoundary.tsx src/main.tsx
```

  Result:
```
import { useEffect, useMemo, useRef, useState } from 'react'
import { formatAmount, formatMoney } from '../../../domain/money'
import { yearlySummary } from '../../../domain/summary'
import type { CalculatedLoan, Currency } from '../../../domain/types'
import { copy } from '../../copy'
import { AxisEnds, HoverBand, Legend, Tooltip } from './ChartParts'
import { VIEW_H, VIEW_W, barsPath, ratio, useBandHover } from './chartGeometry'

/**
 * True while the element's content is wider than the element. Then (and only then) the yearly
 * table's wrapper becomes a named, focusable scroll region, so keyboard users can scroll it at
 * very narrow widths without adding a tab stop at normal widths (AC-8.1, F-1, D-70).
 */
function useOverflows<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [overflows, setOverflows] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const check = () => setOverflows(el.scrollWidth > el.clientWidth)
    // No synchronous check here: reading scrollWidth in this effect forces a layout of the whole
    // page (1,200 schedule rows) straight after Calculate. ResizeObserver reports each observed
    // element once after layout anyway, so the first check comes from it (AC-10.8, D-72).
    const observer = new ResizeObserver(check)
    observer.observe(el)
    if (el.firstElementChild) observer.observe(el.firstElementChild)
    return () => observer.disconnect()
  }, [])
  return { ref, overflows }
}

/** S-19: interest vs principal per year, as stacked bars plus the same figures in a table. */
export function YearlySummary({ loan, currency }: { loan: CalculatedLoan; currency: Currency }) {
  const years = useMemo(() => yearlySummary(loan), [loan])
  const n = years.length
  const { index, handlers } = useBandHover(n)
  const { ref: scrollRef, overflows } = useOverflows<HTMLDivElement>()
  const paths = useMemo(() => {
    const totals = years.map((y) => y.principal.plus(y.interest))
    const max = totals.reduce((m, t) => (t.gt(m) ? t : m), totals[0]!)
    const principalTops = years.map((y) => ratio(y.principal, max))
    const totalTops = totals.map((t) => ratio(t, max))
    return {
      principal: barsPath(principalTops, new Array<number>(n).fill(0)),
      interest: barsPath(totalTops, principalTops),
    }
  }, [years, n])
  const hovered = index === null ? undefined : years[index]
  return (
    <div className="chart-block yearly">
      
… [7,537 more characters not shown; see raw/]
```

- **Bash**

```bash
until grep -q '^EXIT' /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log 2>/dev/null; do sleep 5; done; tail -30 /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log
```

  Result:
```
Error Context: test-results\s07-currency-S-7-Currency--f8955--currency-survives-a-reload-firefox\error-context.md

    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results\s07-currency-S-7-Currency--f8955--currency-survives-a-reload-firefox\trace.zip
    Usage:

        npx playwright show-trace test-results\s07-currency-S-7-Currency--f8955--currency-survives-a-reload-firefox\trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  3) [webkit] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states 

    Test timeout of 30000ms exceeded.

    Error Context: test-results\s09-reset-S-9-Reset-AC-9-1-bee68-ults-stale-and-error-states-webkit\error-context.md

    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results\s09-reset-S-9-Reset-AC-9-1-bee68-ults-stale-and-error-states-webkit\trace.zip
    Usage:

        npx playwright show-trace test-results\s09-reset-S-9-Reset-AC-9-1-bee68-ults-stale-and-error-states-webkit\trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  3 failed
    [firefox] › e2e\s01-calculate.spec.ts:37:3 › S-1 Calculate the monthly payment › [AC-1.3] L-B gives Rs 63,483.57 
    [firefox] › e2e\s07-currency.spec.ts:64:3 › S-7 Currency › [AC-7.3] the chosen currency survives a reload 
    [webkit] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states 
  546 passed (10.7m)
EXIT 1
```

- **Bash**

```bash
grep -nE "^\s+(1|2)\) |Error:|Test timeout|Timeout|waiting for|Received|Expected" /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log | head -30; grep -nE "Test Files|Tests  |size|OK|passed|lint" /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify.log | head -20
```

  Result:
```
632:  1) [firefox] › e2e\s01-calculate.spec.ts:37:3 › S-1 Calculate the monthly payment › [AC-1.3] L-B gives Rs 63,483.57 
634:    Test timeout of 30000ms exceeded while running "beforeEach" hook.
645:    TimeoutError: page.goto: Timeout 30000ms exceeded.
674:  2) [firefox] › e2e\s07-currency.spec.ts:64:3 › S-7 Currency › [AC-7.3] the chosen currency survives a reload 
676:    Error: page.goto: NS_ERROR_CONNECTION_REFUSED
705:    Test timeout of 30000ms exceeded.
3:> npm run lint && npm run format:check && npm run typecheck && npm test && npm run build && npm run size && npm run test:e2e && npm run trace -- --results
6:> muhammad-arslan-calculator@0.0.0 lint
7:> eslint . --max-warnings 0
48: Test Files  9 passed (9)
49:      Tests  345 passed (345)
62:computing gzip size...
69:> muhammad-arslan-calculator@0.0.0 size
70:> node scripts/size.mjs
73:size: 87.4 KB of 150 KB gzipped JS: OK
721:  546 passed (10.7m)
```

- **Bash**

```bash
CI=1 npx playwright test e2e/s01-calculate.spec.ts:37 e2e/s07-currency.spec.ts:64 e2e/s09-reset.spec.ts:44 --repeat-each=5 2>&1 | tail -8
```

  Result:
```
ok 35 [webkit] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states (15.5s)
  ok 43 [webkit] › e2e\s01-calculate.spec.ts:37:3 › S-1 Calculate the monthly payment › [AC-1.3] L-B gives Rs 63,483.57 (2.5s)
  ok 44 [webkit] › e2e\s07-currency.spec.ts:64:3 › S-7 Currency › [AC-7.3] the chosen currency survives a reload (2.4s)
  ok 39 [webkit] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states (14.3s)
  ok 41 [webkit] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states (12.2s)
  ok 45 [webkit] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states (7.7s)

  45 passed (2.1m)
```

- **Bash**

```bash
sed -n 1,80p e2e/review/visuals.spec.ts; grep -n "export" e2e/fixtures.ts; cat playwright.config.ts | head -60
```

  Result:
```
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
196:export const unitSe
… [4,544 more characters not shown; see raw/]
```

- **Bash**

```bash
mkdir -p /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && pwd -W && cat > probe1.mjs <<'EOF'
import { chromium } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, timezoneId: 'Asia/Karachi' })
const page = await ctx.newPage()
const errs = []
page.on('pageerror', e => errs.push('pageerror ' + e.message))
page.on('console', m => m.type() === 'error' && errs.push('console ' + m.text()))
await page.goto('http://localhost:5173/')
async function setv(sel, v) {
  await page.evaluate(([s, v]) => {
    const el = document.querySelector(s)
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v)
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }, [sel, v])
}
async function run(amount, rate = '12', tenure = '1', unit = 'years') {
  await page.getByRole('button', { name: 'Reset' }).click()
  await setv('#amount', amount); await setv('#rate', rate); await setv('#tenure', tenure)
  await page.selectOption('#unit', unit)
  await page.getByRole('button', { name: 'Calculate' }).click()
  const errsText = await page.locator('.field-error').allInnerTexts()
  const mp = await page.getByLabel('Monthly payment', { exact: true }).count() ? await page.getByLabel('Monthly payment', { exact: true }).innerText() : null
  return { errs: errsText.filter(Boolean), mp }
}
const amounts = ['\t1000000\t', '1\t000', '١٢٠٠٠', '１２０００', '00012', '.5', '5.', '-0', '1,,000', '10,00,000', '1,00,00,000.50', '1,000.5', '1000.', '1 000 000', '+1000', '0x10', '1_000', '\u00a01000000\u00a0', '1000000\u200b', 'Infinity', 'NaN', '9'.repeat(10000), '1'.repeat(5000)+'.'+'1'.repeat(5000), '0'.repeat(10000)+'12']
for (const a of amounts) { const r = await run(a); console.log(JSON.stringify(a.length>30?a.slice(0,10)+'...len'+a.length:a), JSON.stringify(r)) }
for (const [r,t,u] of [['5.','12','months'],['-0','12','months'],['12 %','12','months'],['12%%','12','months'],['%','12','months'],['.5%','12','months'],['0.001','12','months'],['0012','12','months'],['1e1','12','months'],['12','1.0','years'],['12','-1','years'],['12','012','years'],['12','1,0',
… [250 more characters not shown; see raw/]
```

  Result:
```
C:/Users/arslan.NINEALPHA/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad
"\t1000000\t" {"errs":[],"mp":"Rs 88,848.79"}
"1\t000" {"errs":["Loan amount must be a number."],"mp":null}
"١٢٠٠٠" {"errs":["Loan amount must be a number."],"mp":null}
"１２０００" {"errs":["Loan amount must be a number."],"mp":null}
"00012" {"errs":[],"mp":"Rs 1.07"}
".5" {"errs":["Loan amount must be between 10 and 1,000,000,000,000,000."],"mp":null}
"5." {"errs":["Loan amount must be between 10 and 1,000,000,000,000,000."],"mp":null}
"-0" {"errs":["Loan amount must be between 10 and 1,000,000,000,000,000."],"mp":null}
"1,,000" {"errs":["Loan amount must be a number."],"mp":null}
"10,00,000" {"errs":[],"mp":"Rs 88,848.79"}
"1,00,00,000.50" {"errs":[],"mp":"Rs 888,487.93"}
"1,000.5" {"errs":[],"mp":"Rs 88.89"}
"1000." {"errs":[],"mp":"Rs 88.85"}
"1 000 000" {"errs":["Loan amount must be a number."],"mp":null}
"+1000" {"errs":["Loan amount must be a number."],"mp":null}
"0x10" {"errs":["Loan amount must be a number."],"mp":null}
"1_000" {"errs":["Loan amount must be a number."],"mp":null}
" 1000000 " {"errs":[],"mp":"Rs 88,848.79"}
"1000000​" {"errs":["Loan amount must be a number."],"mp":null}
"Infinity" {"errs":["Loan amount must be a number."],"mp":null}
"NaN" {"errs":["Loan amount must be a number."],"mp":null}
"9999999999...len10000" {"errs":["Loan amount must be between 10 and 1,000,000,000,000,000."],"mp":null}
"1111111111...len10001" {"errs":["Loan amount can have at most 2 decimal places."],"mp":null}
"0000000000...len10002" {"errs":[],"mp":"Rs 1.07"}
rate "5." tenure "12" months {"errs":[],"mp":"Rs 8,560.75"}
rate "-0" tenure "12" months {"errs":[],"mp":"Rs 8,333.33"}
rate "12 %" tenure "12" months {"errs":[],"mp":"Rs 8,884.88"}
rate "12%%" tenure "12" months {"errs":["Interest rate must be a number."],"mp":null}
rate "%" tenure "12" months {"errs":["Enter an interest rate."],"mp":null}
rate ".5%" tenure "12" months {"errs":[],"mp":"Rs 8,355.92"}
rate "0.001" tenure "12" months {"errs":["Interest rate can have at most 2 decimal places."],"mp":null}
rate "0012" tenure "12" months {"errs":[],"mp":"Rs 8,884.88"}
rate "1e1" tenure "12" months {"errs":["Interest rate must be a number."],"mp":null}
rate "12" tenure "1.0" years {"errs":["Loan tenure must be a whole number."],"mp":null}
rate "12" tenure "-1" years {"errs":["Loan tenure must be between 1 and 100 years."],"mp":null}
rate "12" tenure "012" year
… [375 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe2.mjs <<'EOF'
import { chromium, firefox, webkit } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
const URL='http://localhost:5173/'
const b = await chromium.launch()
async function mk(opts={}) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, timezoneId: 'Asia/Karachi', ...opts })
  const page = await ctx.newPage(); page.errs=[]
  page.on('pageerror', e => page.errs.push('pageerror ' + e.message))
  page.on('console', m => m.type() === 'error' && page.errs.push('console ' + m.text()))
  return {ctx,page}
}
const fill = async (p,a,r,t,u='years')=>{await p.fill('#amount',a);await p.fill('#rate',r);await p.fill('#tenure',t);await p.selectOption('#unit',u)}
const hist = p => p.evaluate(()=>JSON.parse(localStorage.getItem('emi-calc.v1.history')||'null'))
// 1 rapid double calc
{ const {ctx,page}=await mk(); await page.goto(URL); await fill(page,'1000000','12','1')
  await page.locator('button:has-text("Calculate")').dblclick(); await page.waitForTimeout(300)
  console.log('double calc entries', (await hist(page))?.length, page.errs)
  await page.keyboard.press('Enter');
  // enter in amount rapid
  await page.focus('#amount'); for (let i=0;i<5;i++) await page.keyboard.press('Enter')
  console.log('after enters', (await hist(page))?.length, page.errs)
  await ctx.close() }
// 2 corrupt storage
for (const [name,val] of [['badjson','{{{'],['obj','{}'],['nullarr','[null]'],['huge', JSON.stringify(Array.from({length:200000},()=>null))],['str5MB','"'+'x'.repeat(4_000_000)+'"'],['nested','['.repeat(5000)+']'.repeat(5000)]]) {
  const {ctx,page}=await mk(); 
  await page.addInitScript(([k,v])=>{ try{localStorage.setItem(k,v)}catch(e){} },['emi-calc.v1.history',val])
  await page.addInitScript(([k,v])=>{ try{localStorage.setItem(k,v)}catch(e){} },['emi-calc.v1.settings',val.length<100?val:'[1]'])
  const t=Date.now(); await page.goto(URL); 
  const txt = await page.locator('.history-card').innerText()
  await fill(page,'1000000','12','1'); await page.click('text=Calculate')
  await page.waitForTimeout(200)
  console.log(name, 'load ms', Date.now()-t, JSON.stringify(txt.slice(0,60)), 'after calc entries', (await hist(page))?.length, page.errs)
  await ctx.close() }
// 3 settings corrupt
for (const v of ['{"currency":"EUR"
… [945 more characters not shown; see raw/]
```

  Result:
```
double calc entries 1 []
after enters 1 []
badjson load ms 537 "Saved calculations\n\nNo saved calculations yet.\n\nClear all" after calc entries 1 []
obj load ms 567 "Saved calculations\n\nNo saved calculations yet.\n\nClear all" after calc entries 1 []
nullarr load ms 661 "Saved calculations\n\nNo saved calculations yet.\n\nClear all" after calc entries 1 []
huge load ms 719 "Saved calculations\n\nNo saved calculations yet.\n\nClear all" after calc entries 1 []
str5MB load ms 923 "Saved calculations\n\nNo saved calculations yet.\n\nClear all" after calc entries 1 []
nested load ms 710 "Saved calculations\n\nNo saved calculations yet.\n\nClear all" after calc entries 1 []
settings {"currency":"EUR","theme":"dark"} PKR dark dark []
settings {"currency":"USD","theme":42} USD system light []
settings null PKR system light []
settings [] PKR system light []
settings "dark" PKR system light []
quota: Saved calculations

Rs 1,000,000.00 at 12% for 1 year

Rs 88,848.79 per month

19 Oct 2026, 09:56

Restore
Delete
Clear all Rs 88,848.79 []
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe3.mjs <<'EOF'
import { chromium, firefox, webkit } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
const URL='http://localhost:5173/'
for (const [name,type] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]) {
  const b = await type.launch()
  for (const w of [360,180]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 740 }, timezoneId: 'Asia/Karachi' })
    const page = await ctx.newPage(); const errs=[]; page.on('pageerror',e=>errs.push(e.message))
    await page.goto(URL)
    const ov = () => page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)
    const res = {}
    res.idle = await ov()
    await page.click('text=Calculate'); res.errors = await ov()
    await page.fill('#amount','1000000000000000'); await page.fill('#rate','75'); await page.fill('#tenure','100'); await page.click('text=Calculate'); res.lmax = await ov()
    // L-MAX saved entry, currency USD
    await page.selectOption('#currency','USD'); res.usd = await ov()
    await page.click('text=Calculate'); res.second = await ov()
    // dialog
    await page.click('text=Clear all'); res.dialog = await ov()
    const dlg = await page.locator('dialog').boundingBox(); res.dlg = dlg && [Math.round(dlg.x),Math.round(dlg.width)]
    await page.keyboard.press('Escape')
    // small controls
    res.small = await page.evaluate(()=>[...document.querySelectorAll('input,select,button')].filter(e=>{const r=e.getBoundingClientRect(); return r.width>0 && (r.width<44||r.height<44||r.left<0||r.right>innerWidth+0.5)}).map(e=>(e.textContent||e.id).trim().slice(0,20)+':'+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)))
    console.log(name,w,JSON.stringify(res),errs)
    await ctx.close()
  }
  await b.close()
}
EOF
node probe3.mjs
```

  Result:
```
chromium 360 {"idle":0,"errors":0,"lmax":0,"usd":0,"second":0,"dialog":0,"dlg":[16,328],"small":[]} []
chromium 180 {"idle":0,"errors":0,"lmax":0,"usd":0,"second":0,"dialog":0,"dlg":[16,148],"small":[]} []
firefox 360 {"idle":0,"errors":0,"lmax":0,"usd":0,"second":0,"dialog":0,"dlg":[16,328],"small":[]} []
firefox 180 {"idle":0,"errors":0,"lmax":0,"usd":0,"second":0,"dialog":0,"dlg":[16,148],"small":[]} []
webkit 360 {"idle":0,"errors":0,"lmax":0,"usd":0,"second":0,"dialog":0,"dlg":[16,328],"small":[]} []
webkit 180 {"idle":0,"errors":0,"lmax":0,"usd":0,"second":0,"dialog":0,"dlg":[16,148],"small":[]} []
```

- **Bash**

```bash
grep -oE '^- \*\*AC-[0-9]+\.[0-9]+\*\*' docs/user-stories.md | wc -l; grep -oE '^- \*\*AC-1[4-8]\.[0-9]+\*\*' docs/user-stories.md | wc -l; npm run trace 2>&1 | tail -8; grep -n "5173\|4173" README.md | head; curl -s -o /dev/null -w "%{http_code}\n" https://iarslandogar.github.io/Loan-calculator/; curl -s -o /dev/null -w "fav %{http_code}\n" https://iarslandogar.github.io/Loan-calculator/favicon.ico; curl -s -o /dev/null -w "dev fav %{http_code}\n" http://localhost:5173/favicon.ico
```

  Result:
```
115
5
S-17   Backlog  Not implemented  1    0/1    
S-18   Backlog  Not implemented  1    0/1    
S-19   v1       Not implemented  4    4/4    
S-20   v1       Not implemented  6    6/6    
S-21   v1       Not implemented  3    3/3    
S-22   v1       Not implemented  3    3/3    

trace: OK
34:`npm run dev` starts Vite and prints the local URL: **http://localhost:5173/** (if that port is busy, Vite picks the next free one and prints it).
40:npm run preview    # serves dist/ at http://localhost:4173/
200
fav 404
dev fav 404
```

- **Bash**

```bash
curl -s https://iarslandogar.github.io/Loan-calculator/ | grep -o 'build-id[^>]*'; git rev-parse HEAD; git log origin/main --oneline 2>/dev/null | head -3; git branch -a
```

  Result:
```
build-id" content="68c9e024e26ef80f22ddb7f197b3464663678ee8" /
bf745adbecdf576c9c01cb1a60b4657d6d57daea
68c9e02 style: format eslint.config.js
bf08ec1 docs: add development transcripts and PDF (D-74)
edd3994 docs: record the first deploy and CI results (D-73)
  main
* v1
  remotes/origin/main
  remotes/origin/v1
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe4.mjs <<'EOF'
import { chromium } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
const b = await chromium.launch(); const page = await (await b.newContext({viewport:{width:1280,height:900}})).newPage()
await page.goto('http://localhost:5173/')
const rdiv=(a,b)=> (2n*a+b)/(2n*b) // round half up, a,b>0
function sched(Bc, ra, n){ // ra = rate*100 integer
  const rows=[]; let bal=Bc; const D=120000n, N=D+BigInt(ra)
  for(let k=1;k<=n;k++){
    const interest=rdiv(bal*BigInt(ra),D)
    let pay,pr
    if(k<n){ const m=BigInt(n-k+1)
      pay = ra===0 ? rdiv(bal,m) : rdiv(bal*BigInt(ra)*N**m, D*(N**m-D**m))
      pr=pay-interest } else { pr=bal; pay=pr+interest }
    bal-=pr; rows.push([pay,interest,pr,bal])
  } return rows }
const fmt=c=>{const s=c.toString().padStart(3,'0');return (s.slice(0,-2).replace(/\B(?=(\d{3})+(?!\d))/g,',')||'0')+'.'+s.slice(-2)}
let seed=12345; const rnd=()=> (seed=(seed*1103515245+12345)%2147483648)/2147483648
const rint=(lo,hi)=>lo+Math.floor(rnd()*(hi-lo+1))
const cases=[[10_00n,1,1],[10n*100n,7500,1200],[10n**17n,7500,1200],[10n**17n,0,1200],[1000n*100n,0,3],[10000_00n,3600,359],[1000082n,3000,360],[100000n*100n,1000,1]]
for(let i=0;i<30;i++){ const small=i%3==0; cases.push([BigInt(small?rint(1000,2_000_000):rint(1000,10**9)*1000+rint(0,999)), small?rint(4500,7500):rint(0,7500), small?rint(900,1200):rint(1,1200)]) }
let bad=0
for(const [Bc,ra,n] of cases){
  const amt=(Bc/100n).toString()+'.'+(Bc%100n).toString().padStart(2,'0'), rate=(ra/100|0)+'.'+String(ra%100).padStart(2,'0')
  await page.fill('#amount',amt);await page.fill('#rate',rate);await page.fill('#tenure',String(n));await page.selectOption('#unit','months');await page.click('text=Calculate')
  const err=await page.locator('.field-error').allInnerTexts(); if(err.some(Boolean)){console.log('ERR',amt,rate,n,err);bad++;continue}
  const got=await page.evaluate(()=>[...document.querySelectorAll('.schedule tbody tr')].map(tr=>[...tr.children].map(td=>td.textContent)))
  const exp=sched(Bc,ra,n); let ok=got.length===n
  for(let k=0;ok&&k<n;k++){ const e=[String(k+1),...exp[k].map(fmt)]; if(e.join('|')!==got[k].join('|')){ok=false;console.log('MISMATCH',amt,rate,n,'row',k+1,e.join('|'),got[k].join('|'))} }
  if(!ok)bad++
}
console.log('cases',cases.length
… [47 more characters not shown; see raw/]
```

  Result:
```
cases 38 bad 0
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe5.mjs <<'EOF'
import { chromium, firefox, webkit } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
for (const [name,type] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]) {
const b = await type.launch()
for (const [w,h] of [[1000,400],[1280,500],[769,820]]) {
  const ctx=await b.newContext({viewport:{width:w,height:h}}); const page=await ctx.newPage()
  await page.goto('http://localhost:5173/')
  await page.click('text=Calculate') // all errors
  // keyboard: tab through to Reset, check each focused element is visible in viewport & not covered
  await page.focus('#amount'); const res=[]
  for (let i=0;i<8;i++){ 
    const r=await page.evaluate(()=>{const e=document.activeElement; const b=e.getBoundingClientRect(); const top=document.elementFromPoint(b.left+b.width/2,b.top+b.height/2); return [e.id||e.textContent.trim().slice(0,12), Math.round(b.top), Math.round(b.bottom), innerHeight, top===e||e.contains(top)]})
    res.push(r); await page.keyboard.press('Tab') }
  const bad=res.filter(r=>!r[4]||r[1]<0||r[2]>r[3]+1)
  const info=await page.evaluate(()=>{const f=document.querySelector('.form-card'); return [f.scrollHeight,f.clientHeight,getComputedStyle(f).position]})
  console.log(name,w,h,'card scroll/client',info,'unreachable:',JSON.stringify(bad))
  await ctx.close() }
await b.close() }
EOF
node probe5.mjs
```

  Result:
```
chromium 1000 400 card scroll/client [ 618, 350, 'sticky' ] unreachable: [["Loan EMI Cal",-62,736,400,true]]
chromium 1280 500 card scroll/client [ 599, 450, 'sticky' ] unreachable: [["Loan EMI Cal",-316,582,500,true]]
chromium 769 820 card scroll/client [ 715, 715, 'sticky' ] unreachable: [["Loan EMI Cal",-420,820,820,true]]
firefox 1000 400 card scroll/client [ 618, 350, 'sticky' ] unreachable: [["tenure",369,417,400,true],["unit",369,417,400,true]]
firefox 1280 500 card scroll/client [ 599, 450, 'sticky' ] unreachable: [["tenure",462,510,500,true],["unit",462,510,500,true]]
firefox 769 820 card scroll/client [ 715, 715, 'sticky' ] unreachable: [["Calculate",796,844,820,false]]
webkit 1000 400 card scroll/client [ 618, 350, 'sticky' ] unreachable: [["amount",-101,-53,400,false],["Calculate",251,299,400,false],["Loan EMI Cal",-239,559,400,true],["theme",-176,-128,400,false]]
webkit 1280 500 card scroll/client [ 599, 450, 'sticky' ] unreachable: [["amount",-51,-3,500,false],["Calculate",282,330,500,false],["Reset",282,330,500,false],["Loan EMI Cal",-289,609,500,true]]
webkit 769 820 card scroll/client [ 715, 715, 'sticky' ] unreachable: [["Calculate",796,844,820,false],["Reset",832,880,820,false],["Loan EMI Cal",-24,1216,820,true]]
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && sed -i 's/for (let i=0;i<8;i++){/for (let i=0;i<5;i++){ await page.waitForTimeout(250);/; s/await page.focus(.#amount.);/await page.focus("#amount"); await page.waitForTimeout(250);/' probe5.mjs && node probe5.mjs
```

  Result:
```
chromium 1000 400 card scroll/client [ 618, 350, 'sticky' ] unreachable: []
chromium 1280 500 card scroll/client [ 599, 450, 'sticky' ] unreachable: []
chromium 769 820 card scroll/client [ 715, 715, 'sticky' ] unreachable: []
firefox 1000 400 card scroll/client [ 618, 350, 'sticky' ] unreachable: [["tenure",369,417,400,true],["unit",369,417,400,true]]
firefox 1280 500 card scroll/client [ 599, 450, 'sticky' ] unreachable: [["tenure",462,510,500,true],["unit",462,510,500,true]]
firefox 769 820 card scroll/client [ 715, 715, 'sticky' ] unreachable: [["Calculate",796,844,820,false]]
webkit 1000 400 card scroll/client [ 618, 350, 'sticky' ] unreachable: [["amount",-13,35,400,true]]
webkit 1280 500 card scroll/client [ 599, 450, 'sticky' ] unreachable: [["amount",-13,35,500,true]]
webkit 769 820 card scroll/client [ 715, 715, 'sticky' ] unreachable: []
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe6.mjs <<'EOF'
import { chromium, firefox, webkit } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
for (const [name,type] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]) {
const b = await type.launch()
for (const [w,h,errors] of [[1366,768,true],[1280,720,true],[1280,720,false],[1024,768,true],[900,700,true]]) {
  const ctx=await b.newContext({viewport:{width:w,height:h}}); const page=await ctx.newPage()
  await page.goto('http://localhost:5173/')
  if(errors) await page.click('text=Calculate'); 
  await page.evaluate(()=>window.scrollTo(0,0)); await page.focus('#amount'); 
  await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); await page.waitForTimeout(400)
  const r=await page.evaluate(()=>{const e=document.activeElement; const b=e.getBoundingClientRect(); return [e.id||e.textContent.trim(), Math.round(b.top), Math.round(b.bottom), innerHeight, Math.round(scrollY)]})
  await page.keyboard.press('Tab'); await page.waitForTimeout(400)
  const r2=await page.evaluate(()=>{const e=document.activeElement; const b=e.getBoundingClientRect(); return [e.id||e.textContent.trim(), Math.round(b.top), Math.round(b.bottom), innerHeight, Math.round(scrollY)]})
  console.log(name,w,h,errors,JSON.stringify(r),JSON.stringify(r2))
  await ctx.close() }
await b.close() }
EOF
node probe6.mjs
```

  Result:
```
chromium 1366 768 true ["unit",566,614,768,0] ["Calculate",663,711,768,0]
chromium 1280 720 true ["unit",566,614,720,0] ["Calculate",663,711,720,0]
chromium 1280 720 false ["unit",528,576,720,0] ["Calculate",606,654,720,0]
chromium 1024 768 true ["unit",566,614,768,0] ["Calculate",682,730,768,0]
chromium 900 700 true ["unit",566,614,700,0] ["Calculate",652,700,700,30]
firefox 1366 768 true ["unit",566,614,768,0] ["Calculate",663,711,768,0]
firefox 1280 720 true ["unit",566,614,720,0] ["Calculate",663,711,720,0]
firefox 1280 720 false ["unit",528,576,720,0] ["Calculate",606,654,720,0]
firefox 1024 768 true ["unit",566,614,768,0] ["Calculate",682,730,768,0]
firefox 900 700 true ["unit",566,614,700,0] ["Calculate",682,730,700,0]
webkit 1366 768 true ["unit",566,614,768,0] ["Calculate",663,711,768,0]
webkit 1280 720 true ["unit",566,614,720,0] ["Calculate",663,711,720,0]
webkit 1280 720 false ["unit",528,576,720,0] ["Calculate",606,654,720,0]
webkit 1024 768 true ["unit",566,614,768,0] ["Calculate",682,730,768,0]
webkit 900 700 true ["unit",566,614,700,0] ["Calculate",652,700,700,30]
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe7.mjs <<'EOF'
import { chromium, firefox } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
for (const [name,type] of [['chromium',chromium],['firefox',firefox]]) {
const b = await type.launch()
for (const [w,h,errors] of [[1280,600,false],[1280,640,false],[1280,560,false],[1100,620,true],[900,650,true],[1366,660,false]]) {
  const ctx=await b.newContext({viewport:{width:w,height:h}}); const page=await ctx.newPage()
  await page.goto('http://localhost:5173/')
  if(errors) await page.click('text=Calculate'); 
  await page.evaluate(()=>window.scrollTo(0,0)); await page.focus('#amount'); 
  const out=[]
  for(let i=0;i<5;i++){ await page.keyboard.press('Tab'); await page.waitForTimeout(350)
   out.push(await page.evaluate(()=>{const e=document.activeElement; const b=e.getBoundingClientRect(); return [e.id||e.textContent.trim().slice(0,9), Math.round(b.top), Math.round(b.bottom), innerHeight, Math.round(scrollY)]}))}
  const bad = out.filter(o=>o[2]>o[3]||o[1]<0)
  console.log(name,w,h,errors,'offscreen:',JSON.stringify(bad))
  await ctx.close() }
await b.close() }
EOF
node probe7.mjs
```

  Result (error):
```
Exit code 1
chromium 1280 600 false offscreen: []
chromium 1280 640 false offscreen: []
chromium 1280 560 false offscreen: []
chromium 1100 620 true offscreen: []
chromium 900 650 true offscreen: []
node:internal/modules/run_main:107
    triggerUncaughtException(
    ^

page.focus: Timeout 30000ms exceeded.
Call log:
[2m  - waiting for locator('#amount')[22m

    at C:\Users\arslan.NINEALPHA\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\scratchpad\probe7.mjs:8:61 {
  log: [ "  - waiting for locator('#amount')" ],
  name: 'TimeoutError'
}

Node.js v24.16.0
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/ && sed -i "s/\['chromium',chromium\],//" probe7.mjs && node probe7.mjs
```

  Result:
```
200
firefox 1280 600 false offscreen: []
firefox 1280 640 false offscreen: [["Calculate",606,654,640,0],["Reset",606,654,640,0]]
firefox 1280 560 false offscreen: [["tenure",528,576,560,0],["unit",528,576,560,0]]
firefox 1100 620 true offscreen: []
firefox 900 650 true offscreen: []
firefox 1366 660 false offscreen: []
```

- **Bash**

```bash
git show bf745ad --stat | head -20; grep -n "D-75" docs/spec/decision-log.md | head -3; sed -n '/^### D-75/,/^### D-/p' docs/spec/decision-log.md | head -30
```

  Result:
```
commit bf745adbecdf576c9c01cb1a60b4657d6d57daea
Author: Muhammad Arslan <arslan8954@gmail.com>
Date:   Mon Oct 19 09:40:19 2026 +0500

    docs: README reason and hand-edits from the owner; D-75 Phase 5 start
    
    Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

 README.md                 |  4 ++--
 docs/spec/decision-log.md | 11 +++++++++++
 2 files changed, 13 insertions(+), 2 deletions(-)
91:| D-75 | README owner inputs; Phase 5 started | Owner, 2026-10-19 |
754:### D-75 README owner inputs; Phase 5 started (owner, 2026-10-19)
### D-75 README owner inputs; Phase 5 started (owner, 2026-10-19)
- **README, from the owner's own words:**
  - **Why a loan EMI calculator:** "it provides a highly practical, mathematically deterministic problem space to demonstrate core software engineering principles."
  - **Code changed by hand:** "None".
- **Story statuses:** the owner chose "do the check and get everything approved". This starts **Phase 5** (loop plan):
  - the `code-reviewer` reviews the whole app, including exploratory testing;
  - the developer fixes every Blocker and Major without touching frozen tests, re-reviewing until `BLOCKING FINDINGS: 0`, at most 3 rounds;
  - the owner then ticks `docs/process/manual-test-checklist.md` (110 lines) on desktop and on a phone, and decides each story's Status at **G5**.
- **Rule kept:** no Status changes until the owner has done that hand check and approved each story (CLAUDE.md, spec §15). The developer can't do the owner's manual check.

### D-47 Group 2 builds the schedule table; cross-group ACs reported as pending
```

- **Bash**

```bash
grep -rn "^import" src/domain/*.ts src/storage/*.ts | grep -v "\.test\." | grep -E "ui/|storage/|react|\.\./ui" ; echo ---; grep -rn "from '\.\./storage\|from '\.\./\.\./storage" src/domain | grep -v test; echo ---; grep -rnE "console\.|debugger|TODO|FIXME|eslint-disable" src --include=*.ts --include=*.tsx | grep -v "\.test\."; git ls-files src | grep -E "test" | wc -l; grep -n "no-explicit-any" eslint.config.js
```

  Result:
```
src/storage/history.ts:2:import { toCanonical } from '../domain/format'
src/storage/history.ts:3:import { emi } from '../domain/loan'
src/storage/history.ts:4:import { Decimal, round2 } from '../domain/money'
src/storage/history.ts:5:import type { CalculatedLoan, CanonicalInput, Currency } from '../domain/types'
src/storage/history.ts:6:import { validateInputs } from '../domain/validate'
src/storage/history.ts:7:import { readItem, removeItem, storageAvailable, writeItem } from './safeStorage'
src/storage/settings.ts:2:import type { Currency } from '../domain/types'
src/storage/settings.ts:3:import { readItem, writeItem } from './safeStorage'
---
---
8
```

- **Bash**

```bash
grep -rnE ">\s*[A-Za-z][A-Za-z ,.']+\s*<|aria-label=\"|title=\"|placeholder=\"|alt=\"" src/ui --include=*.tsx | grep -v "\.test\."; grep -rn "Select\b\|aria-label" src/ui/components/ThemeSelect.tsx src/ui/components/CurrencySelect.tsx src/ui/components/Header.tsx | head
```

  Result:
```
src/ui/components/ResultsSummary.tsx:6:// Spec §8.3.1: each <dd> is labelled by its <dt> (aria-labelledby), so tests find a figure
src/ui/components/ThemeSelect.tsx:7:export function ThemeSelect() {
src/ui/components/CurrencySelect.tsx:7:export function CurrencySelect() {
src/ui/components/Header.tsx:2:import { ThemeSelect } from './ThemeSelect'
src/ui/components/Header.tsx:11:      <ThemeSelect />
```

- **Bash**

```bash
for k in "cost.interest" "history.line3" "app.tagline" "yearly.tooltip" "note.rounding" "history.restore\b"; do :; done; grep -rn "copy\.chart\.cost\.\|copy\.history\.line3\|copy\.note\|copy\.app\|copy\.theme\|copy\.currency" src/ui --include=*.tsx | grep -v test | sed 's/^\(.\{140\}\).*/\1/'; echo; grep -rn "export" src/domain/types.ts | head -20; grep -rn "formatAmount\|costSplit" src --include=*.tsx -l
```

  Result:
```
src/ui/components/charts/CostBreakdown.tsx:10:  const summary = copy.chart.cost.summary(formatPercent(interestPercent))
src/ui/components/charts/CostBreakdown.tsx:13:      <h3 className="chart-title">{copy.chart.cost.title}</h3>
src/ui/components/charts/CostBreakdown.tsx:32:        <Legend first={copy.chart.cost.loan} second={copy.chart.cost.interest} />
src/ui/components/CurrencySelect.tsx:11:      <label htmlFor="currency">{copy.currency.label}</label>
src/ui/components/CurrencySelect.tsx:20:            {copy.currency.options[c]}
src/ui/components/CurrencySelect.tsx:25:        {copy.currency.note}
src/ui/components/Header.tsx:8:        <h1>{copy.app.title}</h1>
src/ui/components/Header.tsx:9:        <p className="tagline">{copy.app.tagline}</p>
src/ui/components/HistoryEntry.tsx:34:        <p className="entry-time">{copy.history.line3(datetime)}</p>
src/ui/components/RoundingNote.tsx:4:  return <p className="rounding-note">{copy.note.rounding}</p>
src/ui/components/ThemeSelect.tsx:11:      <label htmlFor="theme">{copy.theme.label}</label>
src/ui/components/ThemeSelect.tsx:19:            {copy.theme.options[t]}

4:export type Unit = 'years' | 'months'
5:export type Currency = 'PKR' | 'USD'
6:export type Field = 'amount' | 'rate' | 'tenure'
8:export type ErrorCode =
23:export interface RawInputs {
31:export interface LoanInput {
40:export interface CanonicalInput {
47:export type ValidationResult =
50:export interface ScheduleRow {
58:export interface CalculatedLoan {
src/ui/components/charts/CostBreakdown.tsx
src/ui/components/charts/YearlySummary.tsx
src/ui/components/ScheduleTable.tsx
```

- **Bash**

```bash
cat > e2e/review/phase5.spec.ts <<'EOF'
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
  expect(bottom, 'focused Calculate bottom vs viewport height').toBeLessThanOrEqual(height)
})
EOF
CI=1 npx playwright test e2e/review/phase5.spec.ts --repeat-each=3 2>&1 | tail -25; npx eslint e2e/review/phase5.spec.ts && npx prettier --check e2e/review/phase5.spec.ts
```

  Result:
```
|                                                                 ^
      21 | })
      22 |
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\review\phase5.spec.ts:20:65

    Error Context: test-results\review-phase5--REVIEW-P5-1-18405-0-x-640-window-sticky-form--webkit-repeat2\error-context.md

    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results\review-phase5--REVIEW-P5-1-18405-0-x-640-window-sticky-form--webkit-repeat2\trace.zip
    Usage:

        npx playwright show-trace test-results\review-phase5--REVIEW-P5-1-18405-0-x-640-window-sticky-form--webkit-repeat2\trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  9 failed
    [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [webkit] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [webkit] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
    [webkit] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
Checking formatting...
All matched files use Prettier code style!
```

- **Bash**

```bash
CI=1 npx playwright test e2e/review/phase5.spec.ts --project=chromium 2>&1 | grep -B3 -A12 "Error:" | head -30
```

  Result:
```
1) [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 

    Error: focused Calculate bottom vs viewport height

    expect(received).toBeLessThanOrEqual(expected)

    Expected: <= 640
    Received:    640.375

      18 |   })
      19 |   expect(top, 'focused Calculate top').toBeGreaterThanOrEqual(0)
    > 20 |   expect(bottom, 'focused Calculate bottom vs viewport height').toBeLessThanOrEqual(height)
         |                                                                 ^
      21 | })
      22 |
```

</details>

### 🤖 Claude · 2026-10-19 10:04 PKT

Sub-pixel; allow 1px tolerance (Firefox misses by ~14px).

<details><summary>🔧 5 tool call(s): Bash ×5</summary>

- **Bash**

```bash
sed -i 's/toBeLessThanOrEqual(height)/toBeLessThanOrEqual(height + 1)/' e2e/review/phase5.spec.ts && CI=1 npx playwright test e2e/review/phase5.spec.ts --repeat-each=3 2>&1 | grep -E "^\s+(ok|✓|✘|[0-9]+ (passed|failed))|passed|failed|\[(chromium|firefox|webkit)\]" | sort | uniq -c | head; npx prettier --check e2e/review/phase5.spec.ts
```

  Result:
```
3     [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
      1   1) [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
      1   2) [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
      1   3 failed
      1   3) [firefox] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) 
      1   6 passed (31.7s)
      1   ok 1 [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) (1.7s)
      1   ok 2 [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) (1.5s)
      1   ok 3 [chromium] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) (1.5s)
      1   ok 7 [webkit] › e2e\review\phase5.spec.ts:4:1 › [REVIEW-P5-1] keyboard focus on Calculate is fully inside the viewport in a 1280 x 640 window (sticky form) (3.6s)
Checking formatting...
All matched files use Prettier code style!
```

- **Bash**

```bash
npm run typecheck 2>&1 | tail -3; npx eslint e2e/review; echo lint=$?; git status --short
```

  Result:
```
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

lint=0
?? e2e/review/phase5.spec.ts
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe8.mjs <<'EOF'
import { chromium } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
const b=await chromium.launch(); const page=await (await b.newContext({viewport:{width:360,height:740},hasTouch:true,isMobile:true})).newPage()
await page.goto('http://localhost:5173/')
await page.fill('#amount','1000000');await page.fill('#rate','12');await page.fill('#tenure','1')
await page.tap('text=Calculate'); await page.waitForTimeout(300)
console.log(await page.evaluate(()=>({scrollY, resultsTop:Math.round(document.querySelector('.results-card').getBoundingClientRect().top), mp:Math.round(document.querySelector('.headline').getBoundingClientRect().top), vh:innerHeight, liveRegions:[...document.querySelectorAll('[aria-live]')].map(e=>e.className+':'+e.textContent.slice(0,30))})))
// restore from history after scrolling to bottom
await page.evaluate(()=>scrollTo(0,document.body.scrollHeight)); await page.tap('text=Restore'); await page.waitForTimeout(200)
console.log('after restore scrollY',await page.evaluate(()=>scrollY), 'summary top', await page.evaluate(()=>Math.round(document.querySelector('.headline').getBoundingClientRect().top)))
await b.close()
EOF
node probe8.mjs
```

  Result:
```
{
  scrollY: 0,
  resultsTop: 738,
  mp: 759,
  vh: 740,
  liveRegions: [ 'field-error:', 'field-error:', 'field-error:', ':', ':' ]
}
after restore scrollY 2477 summary top -1718
```

- **Bash**

```bash
cat >> docs/process/review-findings.md <<'EOF'

---

## Phase 5, round 1: whole-app review (2026-10-19)

Scope: all 17 v1 stories (110 v1 ACs) against the spec and decision log (D-00 to D-75), the README, and exploratory testing. HEAD `bf745ad`. Reviewer: code-reviewer (Sonnet), independent of the developer. Laptop on mains power (`BatteryStatus` = 2).

### Gate
- `CI=1 npm run verify`: **exit 1**. lint, format:check and typecheck clean; Vitest **345 of 345**; build OK; size **87.4 KB of 150 KB**; E2E **546 passed, 3 failed of 549** (183 per browser): chromium 183/183, firefox 181/183, webkit 182/183; run took 10.7 min. `trace --results` did not run because E2E failed. A plain `npm run trace` gives `trace: OK` (115 ACs, every v1 AC tested).
- The 3 failures are all load/infrastructure timeouts, none an assertion:
  - `[firefox] [AC-1.3]`: `page.goto` timed out after 30 s in `beforeEach`.
  - `[firefox] [AC-7.3]`: `page.goto` failed with `NS_ERROR_CONNECTION_REFUSED` (the preview server on 4173 refused a connection mid-run).
  - `[webkit] [AC-9.1]`: 30 s test timeout.
- Re-run alone (`CI=1 npx playwright test e2e/s01-calculate.spec.ts:37 e2e/s07-currency.spec.ts:64 e2e/s09-reset.spec.ts:44 --repeat-each=5`): **45 of 45 passed** (all 3 browsers). Observation: `[AC-9.1]` in WebKit took 7.7 to 15.5 s on its own, against a 30 s test timeout, so it has little headroom on this machine.
- So on this Windows machine `verify` was not green in a single run (F-P5-8), and I cannot show the 3 failures are the app's fault. The Linux CI runs named in the brief are the evidence that counts (NFR-1).

### Freeze integrity
- `git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'` lists exactly: 749144e (D-46), 5751988 (D-48), 16c8cc8 (D-54/55), 04de524 (D-59), 95259bc (D-61), and the additive G3b commits 892d518 and 52f75ad. All authorised.
- `git diff --stat g3b-visuals-tests-approved..HEAD` over the same scope: **empty**. Nothing changed in the G3b tests after the tag.
- No added `.skip`, `.only`, `.fixme`, `test.fail` or `todo` anywhere in that history (grep over the full diff: no matches). `forbidOnly: true` is still set.

### Findings

| ID | Severity | Story/AC | Evidence | Suggested fix |
|---|---|---|---|---|
| F-P5-1 | Minor | S-8 keyboard use; D-69 sticky form (no AC fails) | In Firefox only, with the form sticky (>= 769 px), Tab to **Calculate** does not scroll it into view when th
… [10,297 more characters not shown; see raw/]
```

  Result (error):
```
Exit code 2
/usr/bin/bash: -c: line 31: unexpected EOF while looking for matching `''
```

- **Bash**

```bash
tail -c 300 docs/process/review-findings.md; grep -c "Phase 5, round 1" docs/process/review-findings.md; wc -l docs/process/review-findings.md
```

  Result:
```
tabs with charts open at once (the history storage path was not touched in this change).

Reviewer tests added: `e2e/review/visuals.spec.ts` (`[REVIEW-V1]`, `[REVIEW-V2]`), typecheck and lint clean, both red as described. All exploratory probes that found nothing were deleted.

BLOCKING FINDINGS: 0
0
398 docs/process/review-findings.md
```

</details>

### 🤖 Claude · 2026-10-19 10:06 PKT

Nothing appended. I'll use Edit on the last line.

<details><summary>🔧 4 tool call(s): Edit, SubagentHandback, Bash ×2</summary>

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md

Replace:
```
Reviewer tests added: `e2e/review/visuals.spec.ts` (`[REVIEW-V1]`, `[REVIEW-V2]`), typecheck and lint clean, both red as described. All exploratory probes that found nothing were deleted.

BLOCKING FINDINGS: 0
```
With:
```
Reviewer tests added: `e2e/review/visuals.spec.ts` (`[REVIEW-V1]`, `[REVIEW-V2]`), typecheck and lint clean, both red as described. All exploratory probes that found nothing were deleted.

BLOCKING FINDINGS: 0

---

## Phase 5, round 1: whole-app review (2026-10-19)

Scope: all 17 v1 stories (110 v1 ACs) against the spec and decision log (D-00 to D-75), the README, and exploratory testing. HEAD `bf745ad`. Reviewer: code-reviewer (Sonnet), independent of the developer. Laptop on mains power (`BatteryStatus` = 2).

### Gate
- `CI=1 npm run verify`: **exit 1**. lint, format:check and typecheck clean; Vitest **345 of 345**; build OK; size **87.4 KB of 150 KB**; E2E **546 passed, 3 failed of 549** (183 per browser): chromium 183/183, firefox 181/183, webkit 182/183; the run took 10.7 min. `trace --results` did not run because E2E failed. A plain `npm run trace` gives `trace: OK` (115 ACs, every v1 AC tested).
- The 3 failures are all load or infrastructure timeouts, none an assertion:
  - `[firefox] [AC-1.3]`: `page.goto` timed out after 30 s in `beforeEach`.
  - `[firefox] [AC-7.3]`: `page.goto` failed with `NS_ERROR_CONNECTION_REFUSED` (the preview server on 4173 refused a connection mid-run).
  - `[webkit] [AC-9.1]`: 30 s test timeout.
- Re-run alone (`CI=1 npx playwright test e2e/s01-calculate.spec.ts:37 e2e/s07-currency.spec.ts:64 e2e/s09-reset.spec.ts:44 --repeat-each=5`): **45 of 45 passed** (all 3 browsers). Observation: `[AC-9.1]` in WebKit took 7.7 to 15.5 s on its own, 
… [11,248 more characters not shown; see raw/]
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md has been updated successfully.
```

- **SubagentHandback**

```json
{
 "message": "Phase 5, round 1 review is done. I found no Blockers and no Majors. `CI=1 npm run verify` exited 1 on three load timeouts, so it was not green in one run on this machine.\n\nFindings are appended to `C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\review-findings.md` under \"Phase 5, round 1\". I added one reviewer test, `C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\review\\phase5.spec.ts` (`[REVIEW-P5-1]`). ESLint and typecheck are clean on it. It is red in Firefox only (3 of 3) and green in Chromium and WebKit. Nothing else was edited.\n\n**Verify result** (laptop on mains power, `CI=1 npm run verify`): **exit 1**.\n- Lint, format and typecheck were clean.\n- Vitest passed 345 of 345.\n- Build was OK, and size was 87.4 KB of 150 KB.\n- E2E passed 546 of 549, taking 10.7 minutes:\n\n  | Browser | Passed |\n  |---|---|\n  | chromium | 183/183 |\n  | firefox | 181/183 |\n  | webkit | 182/183 |\n\n- `trace --results` did not run because E2E failed. A plain `npm run trace` printed `trace: OK`.\n- The three failures were timeouts, not assertion failures:\n  - `[firefox] AC-1.3`: `page.goto` timed out after 30 s.\n  - `[firefox] AC-7.3`: `page.goto` got `NS_ERROR_CONNECTION_REFUSED` from the preview server.\n  - `[webkit] AC-9.1`: hit the 30 s test timeout.\n- I re-ran the three tests alone with `--repeat-each=5`: **45 of 45 passed** across all three browsers. `AC-9.1` in WebKit still took 7.7 to 15.5 s alone, so it has littl
… [3,848 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

- **Bash**

```bash
git log --oneline | head -8; git diff bf745ad..HEAD --stat | tail -15; git diff bf745ad..HEAD -- src index.html | head -200; git diff g3b-visuals-tests-approved..HEAD --stat -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'; powershell -c "(Get-CimInstance Win32_Battery).BatteryStatus"
```

  Result:
```
3439360 docs(README): mark the known issues fixed before submission
db71d5e docs: D-76 Phase 5 round 1 fixes
0d84ccf fix(S-21): group the chart axis end like the caption (F-P5-5, D-76)
fa26524 feat: inline SVG favicon, no extra request (F-P5-4, D-76)
b37fd88 fix(S-5): bring new results into view on the phone layout (F-P5-2, D-76)
92e635a fix(S-8): scroll a focused form control into view in the sticky form (F-P5-1, D-76)
5ac54c8 docs(README): correct the decision range and the Windows timeout note (F-P5-7)
c4efefe test(review): Phase 5 round 1 findings and REVIEW-P5-1
 README.md                               | 16 ++++++-----
 docs/process/review-findings.md         | 51 +++++++++++++++++++++++++++++++++
 docs/spec/decision-log.md               | 20 +++++++++++++
 e2e/review/phase5.spec.ts               | 21 ++++++++++++++
 index.html                              |  5 ++++
 src/ui/app.css                          |  9 ++++++
 src/ui/components/LoanForm.tsx          | 10 +++++--
 src/ui/components/ResultsPanel.tsx      | 23 +++++++++++++--
 src/ui/components/charts/ChartParts.tsx |  6 ++--
 9 files changed, 147 insertions(+), 14 deletions(-)
diff --git a/index.html b/index.html
index 05d98f0..3f79c27 100644
--- a/index.html
+++ b/index.html
@@ -4,6 +4,11 @@
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     <title>Loan EMI Calculator</title>
+    <!-- Inline icon: no extra file and no network request (F-P5-4, D-76). -->
+    <link
+      rel="icon"
+      href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%236A50D3'/%3E%3Cpath d='M9 11h14M9 16h14M9 21h9' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E"
+    />
     <script>
       // Spec §8.4: apply the saved theme before first paint, so there is no flash of the wrong
       // theme. Same rules as src/storage/settings.ts parseSettings; never throws.
diff --git a/src/ui/app.css b/src/ui/app.css
index 92e7b62..a84ec7c 100644
--- a/src/ui/app.css
+++ b/src/ui/app.css
@@ -138,6 +138,15 @@ ul {
    (≥ 769px). In a window too short for the whole form, the card scrolls on its own, so
    Calculate is never out of reach. It stops at the end of the results row, above Saved
    calculations. */
+/* Room for the 3px focus ring and its 3px offset when a control is scrolled into view (F-P5-1),
+   and a small gap above the results card when it is brought int
… [4,461 more characters not shown; see raw/]
```

- **Bash**

```bash
(CI=1 npm run verify > /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log 2>&1; echo EXIT $? >> /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log); grep -nE "Tests  |size:|passed|failed|trace:|EXIT|^\s+\[(chromium|firefox|webkit)\]" /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log | tail -15
```

  Result:
```
Command running in background with ID: bzhd1tx5q. Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bzhd1tx5q.output. You will be notified when it completes — do not poll that file or sleep while waiting. Read the file only if the user asks for progress, or if you need a line it prints before you can go on, such as a server's ready line or port.
```

</details>

### 🤖 Claude · 2026-10-19 10:29 PKT

Meanwhile, read README diff and D-76.

<details><summary>🔧 8 tool call(s): Bash ×6, Edit, SubagentHandback</summary>

- **Bash**

```bash
git diff bf745ad..HEAD -- README.md; sed -n '/^### D-76/,/^### D-4/p' docs/spec/decision-log.md | head -30
```

  Result:
```
diff --git a/README.md b/README.md
index 4019e10..b2003d5 100644
--- a/README.md
+++ b/README.md
@@ -59,7 +59,7 @@ npx playwright install --with-deps  # Linux (also installs system libraries)
 **Notes:**
 - The full end-to-end run takes **about 9 minutes** (549 tests: 183 in each browser).
 - **On Windows, plug the laptop in.** On battery, the throttled CPU made some WebKit tests time out, and the same tests pass on mains power (decision D-73 in the [decision log](docs/spec/decision-log.md)).
-- **On Windows, an occasional WebKit timeout can still happen under the full parallel run, even on mains power.** For example, one click timed out after 8 s in 1 of 549 tests, and the same test then passed 5 of 5 when run alone (`npx playwright test --project=webkit <file>:<line>`). The three-browser run that counts is the Linux CI run (spec NFR-1), and it passes.
+- **On Windows, an occasional timeout (seen in WebKit and Firefox) can still happen under the full parallel run, even on mains power.** For example, one click timed out after 8 s in 1 of 549 tests, and the same test then passed 5 of 5 when run alone (`npx playwright test --project=<browser> <file>:<line>`). The three-browser run that counts is the Linux CI run (spec NFR-1), and it passes.
 - Every test that proves an acceptance criterion is titled with its ID, for example `[AC-2.4] …`.
 
 ## Product docs
@@ -68,7 +68,7 @@ npx playwright install --with-deps  # Linux (also installs system libraries)
 - [docs/jobs-to-be-done.md](docs/jobs-to-be-done.md): what they need to get done (11 jobs).
 - [docs/user-stories.md](docs/user-stories.md): 22 stories (17 in v1, 5 in the backlog) and 115 acceptance criteria, with the reference loans.
 - [docs/spec/technical-spec.md](docs/spec/technical-spec.md): stack, architecture, the calculation algorithm, copy, storage, testing and CI.
-- [docs/spec/decision-log.md](docs/spec/decision-log.md): every decision, D-00 to D-74, and who approved it.
+- [docs/spec/decision-log.md](docs/spec/decision-log.md): every decision, numbered from D-00, and who approved it.
 
 **Story statuses** follow one rule: a story is marked `Implemented` only when all of its acceptance criteria pass in the automated tests in all three browsers **and** in the owner's manual check at Gate G5 ([docs/process/manual-test-checklist.md](docs/process/manual-test-checklist.md)).
 
@@ -107,14 +107,16 @@ From [technical-spec §16](docs/spec/technical-spec.md) and the decision log:
 
 ## Known issues
 
-These wer
… [4,742 more characters not shown; see raw/]
```

- **Bash**

```bash
until grep -q '^EXIT' /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log 2>/dev/null; do sleep 5; done; grep -nE "Tests  |size:|passed|failed|trace:|EXIT|^\s+\[(chromium|firefox|webkit)\] ›" /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log | tail -12
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: by0gerpgh). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\by0gerpgh.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
until grep -q '^EXIT' /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log 2>/dev/null; do sleep 5; done; grep -nE "Tests  |size:|passed|failed|trace:|EXIT|^\s+\[(chromium|firefox|webkit)\] ›" /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/verify2.log | tail -12
```

  Result:
```
49: Test Files  9 passed (9)
50:      Tests  345 passed (345)
74:size: 87.6 KB of 150 KB gzipped JS: OK
635:  552 passed (9.6m)
667:trace: OK
668:EXIT 0
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe9.mjs <<'EOF'
import { chromium, firefox, webkit } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
const U='http://localhost:5173/'
for (const [name,type] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]) {
  const b=await type.launch()
  for (const [w,h,rm] of [[360,740,'no-preference'],[360,740,'reduce'],[180,740,'no-preference'],[768,1024,'no-preference'],[1280,800,'no-preference']]) {
    const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:rm}); const page=await ctx.newPage(); const reqs=[]; const errs=[]
    page.on('request',r=>reqs.push(r.url())); page.on('pageerror',e=>errs.push(e.message))
    await page.goto(U); const base=reqs.length
    await page.fill('#amount','1000000');await page.fill('#rate','12');await page.fill('#tenure','1')
    await page.evaluate(()=>document.querySelector('button[type=submit]').focus())
    await page.click('button[type=submit]'); await page.waitForTimeout(500)
    const q=()=>page.evaluate(()=>({y:Math.round(scrollY),top:Math.round(document.querySelector('.results-card').getBoundingClientRect().top),focus:document.activeElement.textContent.trim().slice(0,10),ox:document.documentElement.scrollWidth-document.documentElement.clientWidth}))
    const r1=await q()
    // calculate again while card already at top: should not move
    await page.click('button[type=submit]'); await page.waitForTimeout(400); const r2=await q()
    // restore from bottom
    await page.evaluate(()=>scrollTo(0,document.body.scrollHeight)); await page.waitForTimeout(100)
    await page.click('[data-action=restore]'); await page.waitForTimeout(500); const r3=await q()
    console.log(name,w,h,rm,'calc',JSON.stringify(r1),'again',r2.y,'restore',JSON.stringify(r3),'favReq',reqs.filter(u=>/favicon/.test(u)).length,'axis',await page.locator('.chart-axis').first().innerText().then(t=>t.replace(/\n/g,' ')),errs)
    await ctx.close() }
  await b.close() }
EOF
node probe9.mjs
```

  Result:
```
chromium 360 740 no-preference calc {"y":726,"top":12,"focus":"Calculate","ox":0} again 726 restore {"y":726,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
chromium 360 740 reduce calc {"y":726,"top":12,"focus":"Calculate","ox":0} again 726 restore {"y":726,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
chromium 180 740 no-preference calc {"y":1037,"top":12,"focus":"Calculate","ox":0} again 1037 restore {"y":1037,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
chromium 768 1024 no-preference calc {"y":730,"top":12,"focus":"Calculate","ox":0} again 730 restore {"y":730,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
chromium 1280 800 no-preference calc {"y":0,"top":139,"focus":"Calculate","ox":0} again 0 restore {"y":1819,"top":-1680,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
firefox 360 740 no-preference calc {"y":726,"top":12,"focus":"Calculate","ox":0} again 726 restore {"y":726,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
firefox 360 740 reduce calc {"y":726,"top":12,"focus":"Calculate","ox":0} again 726 restore {"y":726,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
firefox 180 740 no-preference calc {"y":1037,"top":12,"focus":"Calculate","ox":0} again 1037 restore {"y":1037,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
firefox 768 1024 no-preference calc {"y":730,"top":12,"focus":"Calculate","ox":0} again 730 restore {"y":730,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
firefox 1280 800 no-preference calc {"y":0,"top":139,"focus":"Calculate","ox":0} again 0 restore {"y":1819,"top":-1680,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
webkit 360 740 no-preference calc {"y":726,"top":12,"focus":"Loan EMI C","ox":0} again 726 restore {"y":726,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
webkit 360 740 reduce calc {"y":726,"top":12,"focus":"Loan EMI C","ox":0} again 726 restore {"y":726,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
webkit 180 740 no-preference calc {"y":1037,"top":12,"focus":"Loan EMI C","ox":0} again 1037 restore {"y":1037,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
webkit 768 1024 no-preference calc {"y":730,"top":12,"focus":"Loan EMI C","ox":0} again 730 restore {"y":730,"top":12,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
webkit 1280 800 no-preference calc {"y":0,"top":139,"focus":"Loan EMI C","ox":0} again 0 restore {"y":1819,"top":-1680,"focus":"Restore","ox":0} favReq 0 axis 1 12 []
```

- **Bash**

```bash
cd /c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad && cat > probe10.mjs <<'EOF'
import { chromium, firefox, webkit } from 'file:///C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/node_modules/playwright-core/index.mjs'
for (const [name,type] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]) {
  const b=await type.launch()
  for (const w of [360,1280]) {
    const ctx=await b.newContext({viewport:{width:w,height:w==360?740:800}}); const page=await ctx.newPage()
    await page.goto('http://localhost:5173/')
    await page.fill('#amount','1000000000000000');await page.fill('#rate','75');await page.fill('#tenure','100')
    const ts=[]
    for(let i=0;i<3;i++){
      await page.evaluate(()=>{window.__t=new Promise(res=>{const t0=performance.now();const mo=new MutationObserver(()=>{if(document.querySelectorAll('.schedule tbody tr').length===1200){mo.disconnect();res(performance.now()-t0)}});mo.observe(document.body,{childList:true,subtree:true});document.querySelector('button[type=submit]').click()})})
      ts.push(Math.round(await page.evaluate(()=>window.__t))); await page.fill('#tenure','100'); await page.click('text=Reset'); await page.fill('#amount','1000000000000000');await page.fill('#rate','75');await page.fill('#tenure','100') }
    await page.click('button[type=submit]'); await page.waitForTimeout(600)
    console.log(name,w,'L-MAX ms',ts,'axes',await page.locator('.chart-axis').allInnerTexts().then(a=>a.map(t=>t.replace(/\n/g,' '))))
    await ctx.close() }
  // sticky ring check
  for (const h of [560,640,700]) { const ctx=await b.newContext({viewport:{width:1280,height:h}}); const page=await ctx.newPage(); await page.goto('http://localhost:5173/'); await page.focus('#amount'); const o=[]
    for(let i=0;i<5;i++){await page.keyboard.press('Tab');await page.waitForTimeout(300);o.push(await page.evaluate(()=>{const r=document.activeElement.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight})) }
    console.log(name,'1280x'+h,'all focused controls fully visible:',o.every(Boolean), 'scrollY', await page.evaluate(()=>scrollY)); await ctx.close() }
  await b.close() }
EOF
node probe10.mjs
```

  Result:
```
chromium 360 L-MAX ms [ 284, 160, 273 ] axes [ '1 1,200', '1 1,200', '1 100' ]
chromium 1280 L-MAX ms [ 261, 148, 241 ] axes [ '1 1,200', '1 1,200', '1 100' ]
chromium 1280x560 all focused controls fully visible: true scrollY 334
chromium 1280x640 all focused controls fully visible: true scrollY 26
chromium 1280x700 all focused controls fully visible: true scrollY 0
firefox 360 L-MAX ms [ 285, 156, 194 ] axes [ '1 1,200', '1 1,200', '1 100' ]
firefox 1280 L-MAX ms [ 279, 152, 185 ] axes [ '1 1,200', '1 1,200', '1 100' ]
firefox 1280x560 all focused controls fully visible: true scrollY 350
firefox 1280x640 all focused controls fully visible: true scrollY 26
firefox 1280x700 all focused controls fully visible: true scrollY 0
webkit 360 L-MAX ms [ 222, 146, 133 ] axes [ '1 1,200', '1 1,200', '1 100' ]
webkit 1280 L-MAX ms [ 202, 152, 140 ] axes [ '1 1,200', '1 1,200', '1 100' ]
webkit 1280x560 all focused controls fully visible: true scrollY 90
webkit 1280x640 all focused controls fully visible: true scrollY 26
webkit 1280x700 all focused controls fully visible: true scrollY 0
```

- **Bash**

```bash
tail -c 200 docs/process/review-findings.md; grep -n "549\|183" README.md; git status --short
```

  Result:
```
sts added: `e2e/review/phase5.spec.ts` (`[REVIEW-P5-1]`). Typecheck and ESLint clean; red in Firefox only, as described. My other probe scripts were kept outside the repository.

BLOCKING FINDINGS: 0
60:- The full end-to-end run takes **about 9 minutes** (549 tests: 183 in each browser).
62:- **On Windows, an occasional timeout (seen in WebKit and Firefox) can still happen under the full parallel run, even on mains power.** For example, one click timed out after 8 s in 1 of 549 tests, and the same test then passed 5 of 5 when run alone (`npx playwright test --project=<browser> <file>:<line>`). The three-browser run that counts is the Linux CI run (spec NFR-1), and it passes.
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md

Replace:
```
My other probe scripts were kept outside the repository.

BLOCKING FINDINGS: 0
```
With:
```
My other probe scripts were kept outside the repository.

BLOCKING FINDINGS: 0

---

## Phase 5, round 2: re-review of the D-76 fixes (2026-10-19)

Scope: commits 92e635a (F-P5-1), b37fd88 (F-P5-2), fa26524 (F-P5-4), 0d84ccf (F-P5-5), db71d5e (D-76), 3439360 (README), on top of 5ac54c8 (F-P5-7). HEAD `3439360`. Laptop on mains power (`BatteryStatus` = 2).

### Gate
- `CI=1 npm run verify`: **exit 0**. lint, format and typecheck clean; Vitest **345 of 345**; size **87.6 KB of 150 KB**; E2E **552 of 552 passed** (9.6 min); `trace: OK`. No timeouts this time, so there was nothing to re-run alone. The `[AC-2.6]` WebKit timeout the developer saw in their run did not recur in mine; I cannot say whether the fixes change its rate (their A/B is 36/36 against 35/36).
- `[REVIEW-P5-1]` passes in all three browsers in that run (it was red 3 of 3 in Firefox in round 1).

### Freeze integrity
- `git diff --stat g3b-visuals-tests-approved..HEAD` over the freeze scope (excluding `e2e/review/`) is **empty**. No test, fixture or config changed since round 1. The only test-side change is the reviewer's own `e2e/review/phase5.spec.ts`.

### Fix by fix (my probes, dev server, Chromium, Firefox and WebKit)
| ID | Result | Evidence |
|---|---|---|
| F-P5-1 | Fixed | 1280 x 560, 640 and 700, Tab through the form: every focused control is fully inside the viewport in all three browsers (Firefox at 640 previously hid Calculate and Reset by 14 px). Page `scrollY` after the Tabs is 26 at 640 and 334 to 
… [2,869 more characters not shown; see raw/]
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md has been updated successfully.
```

- **SubagentHandback**

```json
{
 "message": "Phase 5, round 2: all four fixes (F-P5-1, F-P5-2, F-P5-4, F-P5-5) work in Chromium, Firefox and WebKit, and I found no regression. I found one new Minor, a stale test count in the README. I appended a \"Phase 5, round 2\" section to `C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\review-findings.md`. I added no new tests.\n\n**Gate** (`CI=1 npm run verify`, laptop on mains power, HEAD 3439360):\n- Exit 0, with lint, format and typecheck clean.\n- Vitest passed 345 of 345.\n- Size was 87.6 KB of 150 KB.\n- E2E passed 552 of 552 in 9.6 minutes, and `trace: OK`.\n- There were no timeouts, so I had nothing to re-run alone. Your WebKit `[AC-2.6]` timeout did not recur in my run. I can't say whether the fixes change how often it happens; your A/B was 36/36 with the fixes against 35/36 without.\n- `[REVIEW-P5-1]` passes in all three browsers; it was red 3 of 3 in Firefox in round 1.\n\n**Freeze:** `git diff --stat g3b-visuals-tests-approved..HEAD` over the freeze scope, excluding `e2e/review/`, is empty. Nothing changed in the frozen tests.\n\n**Fix by fix** (my own probes against the dev server):\n- **F-P5-1 (sticky form focus):** at 1280×560, 640 and 700, every focused control stays fully inside the viewport in all three browsers. Focus order is unchanged, since `scrollIntoView({ block: 'nearest' })` moves the viewport, not focus.\n- **F-P5-2 (results into view on a phone):**\n  - **Layouts:** at 360×740, 180×740 and 768×1024 the results car
… [1,481 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

