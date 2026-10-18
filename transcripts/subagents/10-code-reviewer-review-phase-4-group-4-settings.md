# Subagent 10: code-reviewer: Review Phase 4 group 4 (settings)

Subagent **`code-reviewer`**, task: *Review Phase 4 group 4 (settings)*. Started 2026-10-18 08:37 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 08:37 PKT

> Mini-gate G4.4 review: Phase 4, group 4 (settings) for stories S-6 (theme) and S-7 (currency). Follow your agent instructions, scoped to this group. Append a dated "G4.4" section to docs/process/review-findings.md (use Edit; keep earlier sections intact). Read decision-log D-52.
> 
> Scope: commits 44c6afe..babc602 on branch v1 — src/storage/safeStorage.ts, src/storage/settings.ts, src/ui/AppContext.tsx, src/ui/appReducer.ts, src/ui/components/{ThemeSelect,Header,CurrencySelect}.tsx, src/ui/theme.css, src/ui/app.css (header part), index.html (inline pre-paint script).
> 
> ALWAYS run Playwright with `CI=1` (forces a fresh build; a stale preview on 4173 can otherwise be reused). Leave nothing listening on 4173.
> 
> Step 1 (group-scoped): `CI=1 npx playwright test e2e/s06-theme.spec.ts e2e/s07-currency.spec.ts` plus the settings/§8.4 spec rules (`e2e/spec-rules.spec.ts --grep "settings|input-border"`) in all 3 browsers; also re-run group 2's five specs (s01, s02, s03, s04, s09) for regressions. Developer reports all group-4 tests pass; AC-7.5 and AC-9.2 still need saved calculations (group 5). NOTE: Playwright --grep is case-insensitive — if you filter, use `--list` to confirm exactly which tests you included/excluded. Also `npm run lint`, `npm run typecheck`, `npm run format:check`, `npx vitest run`.
> Step 2: freeze check per spec §12.4 vs tag g3-tests-approved — only D-46 and D-48 changes expected.
> Step 3: conformance — §8.4 (data-theme on <html>, pre-paint script, matchMedia only while System, tokens exactly as the §8.4 table + D-19, focus outline), §9.1 (every access wrapped incl. window.localStorage getter; failures never thrown), §9.2 settings key/schema/defaults/per-field fallback (and the inline script applying the same rule), §3.2 "change currency or theme: update settings and persist; results unchanged", layer rules (storage imports nothing from ui), copy strings.
> Step 4: exploratory, in the real app: no flash of the wrong theme on reload in dark mode (e.g. screenshot or check data-theme at DOMContentLoaded before React mounts), theme switching mid-flow (with errors showing, while stale, with L-MAX shown), System + device toggling many times, corrupt settings variants (`null`, `{}`, `{"theme":null}`, huge string, `{"currency":"usd"}` lowercase), storage blocked via both methods and getter, two tabs changing theme (no requirement to sync — just must not break), contrast of focus outline and disabled/secondary button text in dark mode (report numbers). Turn REAL defects into failing `[REVIEW-n]` tests; delete probes that found nothing.
> Step 5: code quality (Minor unless it risks a wrong result, a crash or an a11y failure).
> 
> End with `BLOCKING FINDINGS: <count>`. Do not edit src/ or any frozen test.

<details><summary>🔧 16 tool call(s): Bash ×15, SubagentHandback</summary>

- **Bash**

```bash
git log --oneline | head -20 && git status --short | head && grep -n "D-52" -A12 docs/spec/decision-log.md | head -40 && tail -40 docs/process/review-findings.md
```

  Result:
```
babc602 docs(phase-4): record group 4 implementation choices (D-52)
e6e639a feat(S-6): theme select, dark tokens, system-follow and pre-paint theme script; persist currency (S-6, S-7)
44c6afe feat(S-7): safe storage wrapper and validated settings load/save (spec §9.1, §9.2)
5b68f29 docs(G4.3): group 3 verified with no new code; review findings (0 blocking) and D-51
58f6bcc docs(G4.2): code-review findings for group 2 (0 blocking) and D-50
b49e75b fix(S-7): link the currency note to its select with aria-describedby (G4.2 review M-2)
8c6590a docs(phase-4): record group 2 implementation choices (D-49)
d9213e0 feat(S-1): copy deck, app state machine, loan form and results panel (S-1, S-2, S-4, S-9)
7a7707e chore(lint): allow tabIndex on role=region for the scrollable schedule (D-49)
1f6467a feat(S-2): error boundary renders the fatal message instead of a blank screen (spec §10)
556a060 feat(S-3): results summary (monthly payment, totals) and rounding note
9f2c633 feat(S-10): repayment schedule table in a focusable scroll region (spec §8.2)
5751988 test(e2e): locate summary figures with getByLabel (owner-approved, D-48)
749144e test(S-9): fix AC-9.2 expected currency of USD-made entries (owner-approved, D-46)
4fa3508 docs(G4.1): code-review findings for group 1 (0 blocking) and D-45
f4002cb refactor(S-2): note why tenure toNumber() is safe (G4.1 review M-3)
47e14e4 feat(S-11): rate, tenure, date-time and canonical-input formatters (spec §6)
d9dd337 feat(S-10): EMI and re-amortising schedule (spec §5.2, D-37; S-1, S-3, S-13)
6b6da5d feat(S-2): field validation with typed error codes (spec §4.2)
d85ab2b feat(S-2): input normalisation with strict comma grouping (spec §4.1, D-26)
68:| D-52 | Group 4 implementation choices | **Proposed**: developer decisions, owner to review at G4.4 |
69-
70-**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.
71-
72----
73-
74-### D-01 Three roles
75-- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
76-- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One "user" role could not justify t
… [6,014 more characters not shown; see raw/]
```

- **Bash**

```bash
for f in src/storage/safeStorage.ts src/storage/settings.ts src/ui/AppContext.tsx src/ui/appReducer.ts src/ui/components/ThemeSelect.tsx src/ui/components/Header.tsx src/ui/components/CurrencySelect.tsx src/ui/theme.css index.html; do echo "=== $f"; cat $f; done; grep -n "header" -i src/ui/app.css | head -30
```

- **Bash**

```bash
grep -n "8.4" -A40 docs/spec/technical-spec.md | sed -n 1,120p; grep -n "^### 9" -A40 docs/spec/technical-spec.md | head -90
```

  Result:
```
=== src/storage/safeStorage.ts
// Browser storage that never throws to callers (spec §9.1).
// Every access is wrapped, including reading `window.localStorage` itself, which throws in
// Safari when storage is blocked.

export type StorageResult<T> = { ok: true; value: T } | { ok: false }

const PROBE_KEY = 'emi-calc.v1.probe'
let available: boolean | undefined

/** Checks once per visit that storage can be written and removed. */
export function storageAvailable(): boolean {
  if (available === undefined) {
    try {
      const store = window.localStorage
      store.setItem(PROBE_KEY, PROBE_KEY)
      store.removeItem(PROBE_KEY)
      available = true
    } catch {
      available = false
    }
  }
  return available
}

export function readItem(key: string): StorageResult<string | null> {
  try {
    return { ok: true, value: window.localStorage.getItem(key) }
  } catch {
    return { ok: false }
  }
}

export function writeItem(key: string, value: string): StorageResult<void> {
  try {
    window.localStorage.setItem(key, value)
    return { ok: true, value: undefined }
  } catch {
    return { ok: false }
  }
}

export function removeItem(key: string): StorageResult<void> {
  try {
    window.localStorage.removeItem(key)
    return { ok: true, value: undefined }
  } catch {
    return { ok: false }
  }
}
=== src/storage/settings.ts
// Currency and theme preferences (spec §9.2).
import type { Currency } from '../domain/types'
import { readItem, writeItem } from './safeStorage'

export type Theme = 'system' | 'light' | 'dark'

export interface Settings {
  currency: Currency
  theme: Theme
}

export const SETTINGS_KEY = 'emi-calc.v1.settings'
export const defaultSettings: Settings = { currency: 'PKR', theme: 'system' }

const CURRENCIES: readonly string[] = ['PKR', 'USD']
const THEMES: readonly string[] = ['system', 'light', 'dark']

/**
 * Not valid JSON, or not a plain object → both defaults. Each field that is missing or not an
 * allowed value falls back to its own default; the other field is kept. Never throws.
 * The inline script in index.html applies the same rule to the theme before first paint.
 */
export function parseSettings(raw: string | null): Settings {
  if (raw === null) return defaultSettings
  let value: unknown
  try {
    value = JSON.parse(raw)
  } catch {
    return defaultSettings
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return defaultSettings
  const { currency, theme } = value as Record<st
… [9,710 more characters not shown; see raw/]
```

  Result:
```
373:### 8.4 Theme
374-
375-Resolved theme = the user's choice, or `prefers-color-scheme` when set to `system`. Apply it as `data-theme="light|dark"` on `<html>`. A tiny inline script in `index.html` applies the saved theme before first paint (wrapped in try/catch) so there is no flash of the wrong theme. Listen for `matchMedia('(prefers-color-scheme: dark)')` changes while `system` is selected.
376-
377-Starting tokens. Tests must prove ≥ 4.5:1 for these text pairs in both themes: text/bg, text/surface, text-muted/bg, text-muted/surface, error/bg, error/surface, on-primary/primary. The contrast tests read the **computed** custom properties (`getComputedStyle(document.documentElement)`) under each `data-theme` in the running app, not the values in this table (D-39).
378-
379-| Token | Light | Dark |
380-|---|---|---|
381-| --bg | #FFFFFF | #0F141B |
382-| --surface | #F5F7FA | #18202B |
383-| --text | #1A1F2B | #E7ECF3 |
384-| --text-muted | #4A5568 | #A9B4C2 |
385-| --primary (button bg) / --on-primary | #1D4ED8 / #FFFFFF | #7AA2FF / #0F141B |
386-| --error | #B42318 | #FF8A80 |
387-| --border (decorative lines only) | #CBD2DC | #2E3A4A |
388-| --input-border (inputs and selects) | #7E8898 | #66768C |
389-| --focus (2px outline, 2px offset) | #1D4ED8 | #7AA2FF |
390-
391:`--input-border` must have a contrast ratio of at least 3:1 against both `--bg` and `--surface` (WCAG 1.4.11; D-19). Starting values: light 3.58:1 on bg and 3.34:1 on surface; dark 3.99:1 on bg and 3.54:1 on surface. Prove it with a `[SPEC-§8.4]` test.
392-
393-Tap targets are at least 44 × 44 px. Body font is the system font stack (no web-font downloads).
394-
395-## 9. Persistence
396-
397-### 9.1 Safe storage
398-
399-`safeStorage` checks availability once at start-up (set and remove a probe key inside try/catch). Every read and write is wrapped, **including the access to `window.localStorage` itself**, which throws in Safari when storage is blocked. Failures return `{ ok: false }` and are never thrown to the UI. If storage is unavailable: settings work in memory for the visit (AC-6.6), and history shows `history.unavailable` (AC-11.9).
400-
401-### 9.2 Keys and schemas (version 1)
402-
403-- `emi-calc.v1.settings` → `{ "currency": "PKR" | "USD", "theme": "system" | "light" | "dark" }`. Defaults: `PKR`, `system`. On load, if the value is not valid JSON or not an object, use both defaults. Each field that is missing or not an allowed value falls back to its own default, and the other fie
… [10,753 more characters not shown; see raw/]
```

- **Bash**

```bash
(npm run lint 2>&1 | tail -3; echo lint=$?; npm run typecheck 2>&1 | tail -3; npm run format:check 2>&1 | tail -3; echo fmt=${PIPESTATUS[0]}; npx vitest run 2>&1 | tail -8); git diff --stat g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'
```

  Result:
```
> muhammad-arslan-calculator@0.0.0 lint
> eslint . --max-warnings 0

lint=0
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b


Checking formatting...
All matched files use Prettier code style!
fmt=0
     ✓ [SPEC-§5.4] invariant 8: the same tenure entered as years or as months gives identical rows, totals and note 10734ms

 Test Files  7 passed (7)
      Tests  294 passed (294)
   Start at  08:37:45
   Duration  18.04s (tests 98%, import 1%, transform 1%)

JSON report written to C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/reports/vitest.json
 e2e/fixtures.ts       | 2 +-
 e2e/s09-reset.spec.ts | 4 ++--
 2 files changed, 3 insertions(+), 3 deletions(-)
```

- **Bash**

```bash
CI=1 npx playwright test e2e/spec-rules.spec.ts --grep "settings|input-border" --list 2>&1 | tail -15; CI=1 npx playwright test e2e/s06-theme.spec.ts e2e/s07-currency.spec.ts e2e/s01*.spec.ts e2e/s02*.spec.ts e2e/s03*.spec.ts e2e/s04*.spec.ts e2e/s09*.spec.ts 2>&1 | tail -15; echo exit=$?
```

  Result:
```
[chromium] › spec-rules.spec.ts:142:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown theme in settings falls back to System and keeps the currency
  [chromium] › spec-rules.spec.ts:152:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] settings that are not valid JSON, or not an object, give both defaults
  [chromium] › spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Light: --input-border has 3:1 contrast on --bg and --surface
  [chromium] › spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Dark: --input-border has 3:1 contrast on --bg and --surface
  [firefox] › spec-rules.spec.ts:133:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown currency in settings falls back to PKR and keeps the theme
  [firefox] › spec-rules.spec.ts:142:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown theme in settings falls back to System and keeps the currency
  [firefox] › spec-rules.spec.ts:152:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] settings that are not valid JSON, or not an object, give both defaults
  [firefox] › spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Light: --input-border has 3:1 contrast on --bg and --surface
  [firefox] › spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Dark: --input-border has 3:1 contrast on --bg and --surface
  [webkit] › spec-rules.spec.ts:133:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown currency in settings falls back to PKR and keeps the theme
  [webkit] › spec-rules.spec.ts:142:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown theme in settings falls back to System and keeps the currency
  [webkit] › spec-rules.spec.ts:152:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] settings that are not valid JSON, or not an object, give both defaults
  [webkit] › spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Light: --input-border has 3:1 contrast on --bg and --surface
  [webkit] › spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Dark: --input-border has 3:1 contrast on --bg and --surface
Total: 15 tests in 1 file
    test-results\s09-reset-S-9-Reset-AC-9-2-e9d5f-nd-saved-calculations-alone-webkit\trace.zip
    Usa
… [1,050 more characters not shown; see raw/]
```

- **Bash**

```bash
CI=1 npx playwright test e2e/spec-rules.spec.ts --grep "settings|input-border" 2>&1 | tail -4; netstat -ano | grep 4173 | grep LISTEN; grep -n "prefers-color\|matchMedia\|data-theme\|emulateMedia" e2e/*.ts | head -20; sed -n 1,80p src/ui/app.css
```

  Result:
```
ok 15 [webkit] › e2e\spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Light: --input-border has 3:1 contrast on --bg and --surface (1.0s)
  ok 13 [webkit] › e2e\spec-rules.spec.ts:152:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] settings that are not valid JSON, or not an object, give both defaults (2.8s)

  15 passed (28.5s)
e2e/s06-theme.spec.ts:19:    await page.emulateMedia({ colorScheme: 'dark' })
e2e/s06-theme.spec.ts:24:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:33:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:39:    await page.emulateMedia({ colorScheme: 'dark' })
e2e/s06-theme.spec.ts:47:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:59:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:63:    await page.emulateMedia({ colorScheme: 'dark' })
e2e/s06-theme.spec.ts:65:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:70:    await page.emulateMedia({ colorScheme: 'dark' })
e2e/s06-theme.spec.ts:74:    await page.emulateMedia({ colorScheme: 'dark' })
e2e/s06-theme.spec.ts:75:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:76:    await page.emulateMedia({ colorScheme: 'dark' })
e2e/s06-theme.spec.ts:114:    await page.emulateMedia({ colorScheme: 'light' })
e2e/s06-theme.spec.ts:130:    await page.emulateMedia({ colorScheme: 'light' })
e2e/spec-rules.spec.ts:145:    await page.emulateMedia({ colorScheme: 'light' })
e2e/spec-rules.spec.ts:155:    await page.emulateMedia({ colorScheme: 'light' })
/* Layout and components (spec §8). Responsive breakpoints are refined with S-5. */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.5;
}

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--gap);
}

.app-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px var(--gap);
}

.theme-field {
  min-width: 140px;
}

.app-header h1 {
  margin: 0;
  font-size: 1.75rem;
}

.tagline {
  margin: 4px 0 var(--gap);
  color: var(--text-muted);
}

.layout {
  display: grid;
  gap: var(--gap);
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  align-items: start;
}

@media (max-width: 768px) {
  .layout {
    grid-template
… [316 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -n "focus\|disabled\|secondary\|button\|opacity\|select\|#[0-9a-fA-F]\{3,6\}\b" src/ui/app.css | head -60
```

  Result:
```
83:.field select {
123:button {
132:button.primary {
138:button.secondary {
144::focus-visible {
145:  outline: 2px solid var(--focus);
```

- **Bash**

```bash
sed -n 80,160p src/ui/app.css; ls e2e e2e/review 2>/dev/null; sed -n 1,40p e2e/fixtures.ts
```

  Result:
```
}

.field input,
.field select {
  font: inherit;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--input-border);
  border-radius: 6px;
  min-height: 44px;
  padding: 8px 10px;
  width: 100%;
}

.field input[aria-invalid='true'] {
  border-color: var(--error);
}

.field-error {
  margin: 0;
  min-height: 1.5em;
  color: var(--error);
  font-size: 0.95rem;
}

.hint {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.9rem;
}

.tenure-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
}

.actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

button {
  font: inherit;
  min-height: 44px;
  min-width: 44px;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

button.primary {
  background: var(--primary);
  color: var(--on-primary);
  border: 1px solid var(--primary);
}

button.secondary {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--input-border);
}

:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}

/* Results */
.status {
  margin: 0;
  color: var(--text-muted);
}

.summary {
  margin: 0 0 var(--gap);
  display: grid;
  gap: 8px;
}

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
    page.setDefaultTimeout(8_00
… [1,008 more characters not shown; see raw/]
```

- **Bash**

```bash
sed -n 1,60p playwright.config.ts; sed -n 40,120p e2e/fixtures.ts; ls dist 2>/dev/null | head
```

  Result:
```
import { defineConfig, devices } from '@playwright/test'

// SMOKE_URL set: run only @smoke tests against the deployed site (spec §12.1, §14).
// Tests navigate with page.goto('./') so they work under the GitHub Pages sub-path.
const smokeUrl = process.env.SMOKE_URL
const localUrl = 'http://localhost:4173/'

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: true,
  retries: smokeUrl ? 2 : 0,
  reporter: [['list'], ['json', { outputFile: 'reports/playwright.json' }]],
  ...(smokeUrl ? { grep: /@smoke/ } : {}),
  use: {
    baseURL: smokeUrl ?? localUrl,
    timezoneId: 'Asia/Karachi',
    locale: 'en-GB',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  ...(smokeUrl
    ? {}
    : {
        webServer: {
          command: 'npm run build && npm run preview',
          url: localUrl,
          reuseExistingServer: !process.env.CI,
          timeout: 180_000,
        },
      }),
})
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
// R
… [1,323 more characters not shown; see raw/]
```

- **Bash**

```bash
mkdir -p e2e/review && cat > e2e/review/probe-g44.spec.ts <<'EOF'
import { test, expect, SETTINGS_KEY } from '../fixtures'

const dt = (p: import('@playwright/test').Page) =>
  p.evaluate(() => document.documentElement.getAttribute('data-theme'))

test('probe: pre-paint theme before React', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.addInitScript((k) => localStorage.setItem(k, '{"theme":"dark"}'), SETTINGS_KEY)
  await page.route('**/assets/*.js', (r) => r.abort())
  await page.goto('./')
  console.log('PREPAINT dark-saved/light-os:', await dt(page))
})

const variants = ['null', '{}', '{"theme":null}', '{"currency":"usd"}', '"dark"', '[]', '0', 'true', '{"theme":"dark","currency":"EUR"}', '{"theme":"DARK"}', 'x'.repeat(2_000_000)]
for (const v of variants) {
  test(`probe: variant ${v.slice(0, 40)}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.addInitScript(([k, val]) => localStorage.setItem(k, val), [SETTINGS_KEY, v])
    await page.goto('./')
    const theme = await page.getByLabel('Theme').inputValue()
    const cur = await page.getByLabel('Currency').inputValue()
    console.log('VARIANT', v.slice(0, 40), '=> select', theme, cur, 'data-theme', await dt(page))
  })
}

test('probe: blocked storage methods and getter', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('x', 'SecurityError') } })
  })
  await page.goto('./')
  await page.getByLabel('Theme').selectOption('dark')
  await page.getByLabel('Currency').selectOption('USD')
  console.log('GETTER blocked', await dt(page), await page.getByLabel('Currency').inputValue())
})
test('probe: blocked setItem throws', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => { throw new DOMException('q', 'QuotaExceededError') }
    Storage.prototype.getItem = () => { throw new DOMException('q', 'SecurityError') }
  })
  await page.goto('./')
  await page.getByLabel('Theme').selectOption('dark')
  console.log('METHODS blocked', await dt(page))
})

test('probe: mid-flow switching + system toggling', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.goto('./')
  await page.getByLabel('Loan amount').fill('2500000')
  await page.getByLabel('Interest rate').fill('18')
  await page.getByLabel('Loan tenure').fill('5')
  await page.getByRole('button', { name: 'Calcu
… [2,107 more characters not shown; see raw/]
```

  Result:
```
Running 17 tests using 4 workers
PREPAINT dark-saved/light-os: dark
VARIANT null => select system PKR data-theme light
  ok  2 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant null (530ms)
VARIANT {} => select system PKR data-theme light
  ok  3 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant {} (436ms)
VARIANT "dark" => select system PKR data-theme light
VARIANT {"theme":null} => select system PKR data-theme light
  ok  6 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant "dark" (336ms)
  ok  4 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant {"theme":null} (448ms)
VARIANT {"currency":"usd"} => select system PKR data-theme light
  ok  5 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant {"currency":"usd"} (525ms)
VARIANT [] => select system PKR data-theme light
  ok  7 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant [] (337ms)
VARIANT 0 => select system PKR data-theme light
  ok  8 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant 0 (363ms)
VARIANT true => select system PKR data-theme light
  ok  9 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant true (372ms)
VARIANT {"theme":"dark","currency":"EUR"} => select dark PKR data-theme dark
  ok 10 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant {"theme":"dark","currency":"EUR"} (344ms)
VARIANT {"theme":"DARK"} => select system PKR data-theme light
  ok 11 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant {"theme":"DARK"} (355ms)
VARIANT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx => select system PKR data-theme light
  ok 12 [chromium] › e2e\review\probe-g44.spec.ts:16:3 › probe: variant xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (511ms)
  x   1 [chromium] › e2e\review\probe-g44.spec.ts:6:1 › probe: pre-paint theme before React (550ms)
GETTER blocked dark USD
METHODS blocked dark
  ok 13 [chromium] › e2e\review\probe-g44.spec.ts:26:1 › probe: blocked storage methods and getter (439ms)
  ok 14 [chromium] › e2e\review\probe-g44.spec.ts:35:1 › probe: blocked setItem throws (411ms)
TWO TABS {"currency":"USD","theme":"system"} light USD
  ok 16 [chromium] › e2e\review\probe-g44.spec.ts:86:1 › probe: two tabs + back button (800ms)
SYSTEM after 30 toggles ends light: light
SYSTEM dark: dark
FIXED light vs dark OS: light
before len 3145 {"currency":"PKR","theme":"light"}
  ok 15 [chromium] › e2e\review\probe-g44.spec.ts:45:1 › probe: mid-flow switching + system toggling (1.5s)
T
… [1,657 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -rn "disabled" src --include=*.tsx | head; node -e '
const L=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const r=(a,b)=>{const x=L(a),y=L(b);return ((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};
console.log("dark focus/bg",r("#7aa2ff","#0f141b"),"focus/surface",r("#7aa2ff","#18202b"),"text/bg",r("#e7ecf3","#0f141b"),"on-primary/primary",r("#0f141b","#7aa2ff"));
console.log("light focus/bg",r("#1d4ed8","#ffffff"),"focus/surface",r("#1d4ed8","#f5f7fa"));
console.log("dark input-border/bg",r("#66768c","#0f141b"),"surf",r("#66768c","#18202b"));'
```

  Result:
```
dark focus/bg 7.43 focus/surface 6.59 text/bg 15.57 on-primary/primary 7.43
light focus/bg 6.70 focus/surface 6.24
dark input-border/bg 3.99 surf 3.54
```

- **Bash**

```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgb\(|white|black" src --include=*.css --include=*.tsx | grep -v theme.css | head; grep -rn "setTimeout\|any\b" src/ui src/storage --include=*.ts --include=*.tsx | head; grep -rn "from '../ui\|from '../../ui" src/storage src/domain | head
```

  Result:
```
src/ui/app.css:213:  white-space: nowrap;
src/ui/appReducer.ts:40:/** Shown results become stale on any input change; idle stays idle. */
```

- **Bash**

```bash
sed -i "s#await page.route('\*\*/assets/\*.js', (r) => r.abort())#await page.route('**/assets/*.js', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }))#" e2e/review/probe-g44.spec.ts && CI=1 npx playwright test e2e/review/probe-g44.spec.ts --project=firefox --project=webkit --reporter=list 2>&1 | grep -E "PREPAINT|GETTER|METHODS|SYSTEM|FIXED|TWO|passed|failed|VARIANT \{\"theme\":\"dark\""
```

  Result:
```
PREPAINT dark-saved/light-os: dark
VARIANT {"theme":"dark","currency":"EUR"} => select dark PKR data-theme dark
GETTER blocked dark USD
METHODS blocked dark
SYSTEM after 30 toggles ends light: light
SYSTEM dark: dark
FIXED light vs dark OS: light
PREPAINT dark-saved/light-os: dark
TWO TABS {"currency":"USD","theme":"system"} light USD
VARIANT {"theme":"dark","currency":"EUR"} => select dark PKR data-theme dark
GETTER blocked dark USD
METHODS blocked dark
SYSTEM after 30 toggles ends light: light
SYSTEM dark: dark
FIXED light vs dark OS: light
TWO TABS {"currency":"USD","theme":"system"} light USD
  34 passed (37.7s)
```

- **Bash**

```bash
cat > e2e/review/probe-g44.spec.ts <<'EOF'
import { test } from '../fixtures'
test('probe: lmax + theme + narrow', async ({ page }) => {
  await page.setViewportSize({ width: 180, height: 740 })
  await page.goto('./')
  await page.getByLabel('Loan amount').fill('1000000000')
  await page.getByLabel('Interest rate').fill('50')
  await page.getByLabel('Loan tenure').fill('40')
  await page.getByRole('button', { name: 'Calculate' }).click()
  await page.getByLabel('Theme').focus()
  await page.keyboard.press('ArrowDown')
  await page.getByLabel('Currency').selectOption('USD')
  const o = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth, document.querySelectorAll('tbody tr').length, document.documentElement.dataset.theme])
  console.log('NARROW', JSON.stringify(o))
})
EOF
CI=1 npx playwright test e2e/review/probe-g44.spec.ts --reporter=list 2>&1 | grep -E "NARROW|passed|failed"; rm e2e/review/probe-g44.spec.ts; netstat -ano | grep 4173 | grep LISTEN; git status --short
```

  Result:
```
NARROW [180,180,480,"light"]
NARROW [180,180,480,"light"]
NARROW [180,180,480,"light"]
  3 passed (11.1s)
```

- **Bash**

```bash
cat >> docs/process/review-findings.md <<'EOF'

---

## 2026-10-18, G4.4 (settings, S-6 theme and S-7 currency)

Reviewer: code-reviewer. Scope 44c6afe..babc602. No `src/` or frozen test edited. All Playwright runs used `CI=1`; nothing is left listening on 4173.

### Gate evidence
- `CI=1 npx playwright test e2e/s06-theme.spec.ts e2e/s07-currency.spec.ts e2e/s01* s02* s03* s04* s09*`: 180 passed, 6 failed (2.9 min). The 6 failures are exactly [AC-7.5] and [AC-9.2] in chromium, firefox and webkit: both need saved calculations (group 5) and are pending, not defects. No regression in group 2 specs.
- `CI=1 npx playwright test e2e/spec-rules.spec.ts --grep "settings|input-border"`: `--list` showed 15 tests (5 per browser: three [SPEC-§9.2] settings rules, [SPEC-§8.4] Light and Dark input-border); 15 passed. No other tests were included or dropped by the filter.
- `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run format:check` exit 0; `npx vitest run`: 7 files, 294 tests passed.
- Freeze check (`git diff --stat g3-tests-approved..HEAD` over the §12.4 scope): only `e2e/fixtures.ts` (D-48) and `e2e/s09-reset.spec.ts` (D-46). No `.skip/.only/.fixme/test.fail`, no deleted or weakened tests.

### Conformance
- 8.4: `data-theme` is set on `<html>` by the inline script in `index.html` and again by `useAppliedTheme`; the `matchMedia` change listener is attached only while System is selected and removed otherwise. Tokens in `theme.css` match the §8.4 table exactly, including `--input-border` light #7E8898 / dark #66768C (D-19). Focus is `2px solid var(--focus)` with 2px offset on `:focus-visible`.
- 9.1: all four helpers wrap `window.localStorage` access inside try/catch and return `{ ok: false }`; nothing throws. `saveSettings` ignores failure (AC-6.6). 9.2: key `emi-calc.v1.settings`, defaults PKR/system, per-field fallback; the inline script applies the same rule for theme.
- 3.2: `updateSettings` dispatches only `setCurrency`/`setTheme`; the reducer leaves `inputs`, `errors` and `results` untouched, and persists. Layers: `storage/` imports only `domain/types`, no `ui/`. Copy strings come from `copy.ts`. No hard-coded colours outside `theme.css`; no `any`.

### Exploratory (chromium, firefox, webkit; probe deleted, nothing real found)
- Pre-paint: saved `dark` with OS light and React bundle replaced by an empty script gives `data-theme="dark"`, so the attribute is set before React mounts, in all 3 browsers.
- Corrupt settings (`null`, `{}`, `{"theme":null}`
… [2,543 more characters not shown; see raw/]
```

  Result:
```
(Bash completed with no output)
```

- **SubagentHandback**

```json
{
 "message": "G4.4 review (S-6 theme, S-7 currency): no blocking findings. I appended the dated section to docs/process/review-findings.md.\n\n**Gate results (all Playwright runs used `CI=1`)**\n- The group-4 specs plus the group-2 specs (s01–s04, s09), run in all 3 browsers: 180 passed, 6 failed. The 6 failures are [AC-7.5] and [AC-9.2] in each browser. Both need saved calculations (group 5), so they are pending rather than defects. There are no regressions in group 2.\n- `e2e/spec-rules.spec.ts --grep \"settings|input-border\"`: `--list` showed 15 tests, 5 per browser. All 15 passed.\n- `npm run lint`, `npm run typecheck` and `npm run format:check` all exit 0. `npx vitest run`: 294 tests passed.\n- Freeze check against `g3-tests-approved`: only `e2e/fixtures.ts` (D-48) and `e2e/s09-reset.spec.ts` (D-46) changed. I found no skips, `.only`, deleted tests or weakened assertions.\n- Nothing is left listening on 4173, and the working tree is clean.\n\n**Conformance**\n- §8.4: `data-theme` is set on `<html>` by the inline script and again by the app. The `matchMedia` listener exists only while System is selected. The tokens match the §8.4 table and D-19 exactly, and the focus outline matches.\n- §9.1 and §9.2: every storage access is wrapped, including the `window.localStorage` getter. The key, defaults and per-field fallback match the spec, and the inline script applies the same rule.\n- §3.2: a currency or theme change leaves inputs, errors and results untouched.\n- Layers and
… [2,010 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

