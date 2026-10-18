# Subagent 04: test-designer: Phase 3 UI/E2E tests

Subagent **`test-designer`**, task: *Phase 3 UI/E2E tests*. Started 2026-10-17 22:30 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-17 22:30 PKT

> Phase 3 (tests first) for the Loan EMI Calculator. You own the UI / END-TO-END tests and the manual checklist. Another test-designer is writing the domain unit/property tests in parallel (it owns src/domain/*.test.ts and test/**). Follow your agent instructions in full, with this scope.
> 
> ## Read first
> CLAUDE.md; docs/user-stories.md (all 94 v1 ACs, S-1 to S-13); docs/spec/technical-spec.md, especially §3.2 (state transitions), §7 (copy deck — exact strings), §8 incl. **§8.3.1 test-facing DOM contract (locate ONLY this way)**, §9 (storage, schemas, load validation, two-tab rules), §10, §11 (NFRs), §12 (testing strategy, seeding rule, time zone, Phase 3 exceptions); docs/spec/decision-log.md D-13 to D-43.
> 
> ## State of the repo
> - The app is an empty shell: only `<h1>Loan EMI Calculator</h1>`. Nearly everything you test is missing, so tests must fail on missing elements/text — not on fixture bugs, syntax or type errors.
> - playwright.config.ts (developer-owned; do not edit): testDir `e2e`, projects chromium/firefox/webkit, `timezoneId: 'Asia/Karachi'`, `locale: 'en-GB'`, `forbidOnly: true`, retries 0, webServer builds and serves `vite preview` on :4173, baseURL `http://localhost:4173/`. In SMOKE_URL mode it greps `@smoke` against the deployed sub-path, so **always navigate with `page.goto('./')`, never `'/'`**. Report any config change you need instead of making it.
> - Each Playwright test gets a fresh browser context, so localStorage starts clean; persistence tests reload within one test.
> 
> ## Your files
> - `e2e/fixtures.ts`: extended `test` with (1) a global listener that fails the test on `pageerror` or `console` type `error` (spec §10, AC-2.16); (2) `blockStorage(page)` via `addInitScript` stubbing `Storage.prototype` getItem/setItem/removeItem/clear to throw, plus a Safari-style variant where reading `window.localStorage` itself throws (spec §12.3); (3) a way to start allowing storage then refuse writes mid-visit (AC-12.7), e.g. a window flag the init script checks; (4) `seedHistory(page, entries)` writing `emi-calc.v1.history` before load, using **0% loans only** (amount `12000 × k`, 12 months → monthlyPayment `1000 × k`, e.g. "1000.00") per spec §12.1 / D-35, with the exact §9.2 schema (canonical input, valid ISO `createdAt` with year 2000–9999, unique id, currency); (5) clock helper: `page.clock.setFixedTime(new Date('2026-10-17T20:45:00+05:00'))` etc. (explicit offset); (6) small helpers to fill the form and Calculate (both via button and via Enter).
> - `e2e/s01-*.spec.ts` … `e2e/s13-*.spec.ts`: one spec file per v1 story, every AC of that story covered by at least one test titled `[AC-x.y] …` (one test may carry several tags).
> - `e2e/spec-rules.spec.ts`: `[SPEC-§n]` tests — §3.2 (Restore clears all field errors; Restore persists currency across reload; changing unit clears the tenure error; editing back to the original text stays stale), §9.2 (tampered monthlyPayment, non-canonical input and duplicate ids are dropped; corrupt settings fall back per field), §9.3 (two pages in one context: Clear all in B then Calculate in A must not bring cleared entries back; a save in B appears in A via the storage event; `localStorage.clear()` in B empties A), §9.1/§12.3 (Safari getter-throws: app calculates, history shows the unavailable message), §8.4 (`--input-border` computed ≥ 3:1 against `--bg` and `--surface` in both themes), §11 NFR-3/NFR-7 (after a calculation no network requests beyond the initial load, `document.cookie === ''`, `context.cookies()` empty), and that `document.title` equals `Loan EMI Calculator`.
> - Optional: Vitest + Testing Library component tests in `src/ui/**/*.test.tsx` rendering `<App/>` only (the "ui" Vitest project, jsdom, setup file test/setup.ts). Prefer E2E; don't duplicate without reason. Dialog behaviour is E2E-only.
> - `docs/process/manual-test-checklist.md`: one checkbox line per v1 AC (all 94), exact manual steps and expected result.
> 
> ## Specifics that bite
> - Exact copy from §7 character for character (ASCII apostrophes). Summary figures: `getByRole('definition', { name: 'Monthly payment' })` etc. Errors: `toHaveAccessibleDescription(...)` + `aria-invalid`. History entry buttons have names like `Restore Rs 1,000,000.00 at 12% for 1 year, saved 17 Oct 2026, 20:45` (D-29); entries are `listitem`s of the list named `Saved calculations`.
> - Tag the tests for AC-1.1, AC-2.1, AC-7.2 and AC-11.2 with `@smoke` in the title (spec §12.1).
> - AC-10.8: measure inside the page with `performance.now()` from the Calculate click until the 480th row is in the DOM (e.g. a MutationObserver set up in `page.evaluate`), assert ≤ 1000 ms; also assert all 480 rows.
> - AC-5.x viewports via `test.use({ viewport })` (360×740, 768×1024, 1280×800). Dark/light via `colorScheme` or `page.emulateMedia`; AC-6.4 switches emulation while the page is open. AC-6.5/§8.4 read computed custom properties under each `data-theme` and compute contrast in the test (WCAG formula).
> - AC-8.x keyboard: real `page.keyboard.press('Tab')` sequences; note WebKit needs Tab to reach buttons — if a browser-specific behaviour forces a branch, explain it in the report rather than skipping.
> - Never compute an expected figure with app code; hard-code values from the ACs.
> - Never `.skip`, `.only`, `.fixme`, `test.fail`.
> - Your files must pass `npx eslint <your files> --max-warnings 0`, `npx prettier --check <your files>` and `npm run typecheck` (errors in the other agent's in-progress domain test files are not yours — mention them, don't fix them). Iterate with `npx playwright test --project=chromium`; do the final run on all three browsers.
> 
> ## Finish with
> Your agent report: tests per story, ACs that were hard to automate and how, tests that PASS before implementation (expected: only negative-only ones and the document.title check — list and justify each), ambiguous ACs (quote), any config change you need, and the final `npx playwright test` summary (per browser pass/fail counts) plus `npm run trace` output.

<details><summary>🔧 8 tool call(s): Read ×2, Bash ×5, Write</summary>

- **Read** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\user-stories.md

```json
{
 "file_path": "c:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\user-stories.md"
}
```

- **Read** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md

```json
{
 "file_path": "c:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\technical-spec.md"
}
```

  Result:
```
1	# Technical Specification: Loan EMI Calculator (v1)
2	
3	**Status:** Approved at Gate G1 (2026-10-17), including the G1 amendments (decision log D-25 to D-40)
4	**Sources of truth, in priority order:**
5	1. `docs/user-stories.md` (acceptance criteria)
6	2. this document
7	3. `docs/spec/decision-log.md`
8	
9	If two sources conflict, **stop and ask the human**. Never resolve a conflict silently.
10	
11	---
12	
13	## 1. Purpose and scope
14	
15	A single-page, client-only web app that calculates the equal monthly instalment (EMI) of a reducing-balance loan, its total interest and total payable, and a month-by-month schedule. It also supports PKR/USD display, light/dark themes, history saved in the browser, full keyboard use and phone layouts.
16	
17	**There is no backend.** The app makes no network requests after the static files load: no API calls, analytics, cookies or fonts from third-party servers.
18	
19	**v1 scope:** stories S-1 to S-13. **Not in v1:** S-14 to S-19, and everything in §16.
20	
21	## 2. Technology stack
22	
23	| Concern | Choice | Notes |
24	|---|---|---|
25	| Runtime for tooling | Node.js 24 LTS | Pinned in `.nvmrc` and `package.json` `engines`. Verify it is still an LTS line at scaffold time; if not, use the current Active LTS and record it in the decision log. Checked 2026-10-17: Node 24 is still an LTS line (24.16.0 installed). |
26	| Package manager | npm | `package-lock.json` committed; CI uses `npm ci`. |
27	| UI | React (latest stable) + TypeScript (latest stable, `strict: true`) | Function components and hooks only. |
28	| Build/dev server | Vite (latest stable) | Static output in `dist/`. |
29	| Decimal maths | `decimal.js` | **All money and rate arithmetic.** JS `number` must never hold a money value or be used in a calculation. |
30	| Unit/component tests | Vitest + @testing-library/react + @testing-library/user-event + jsdom | `@testing-library/dom` is installed as the required peer of `@testing-library/react` (D-42). |
31	| Property tests | `fast-check` | For invariants in §5.4. |
32	| End-to-end tests | `@playwright/test` | Chromium, Firefox, WebKit. Edge is Chromium-based and is covered by the Chromium project; Safari by WebKit. |
33	| Lint/format | ESLint (flat config, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y) + Prettier | |
34	| Pre-approved tooling (D-17) | `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `@types/node`, `@eslint/js`, `globals`, `eslint-config-prettier` | May be ad
… [39,768 more characters not shown; see raw/]
```

  Result:
```
1	# User Stories with Acceptance Criteria
2	
3	## Conventions
4	
5	- **Story ID** `S-n`. **Acceptance criterion ID** `AC-n.m`, where n is the story number.
6	- Each story names its **role** (`app-roles.md`) and the **job** it serves (`jobs-to-be-done.md`).
7	- **Scope**: `v1` means we are building it now. `Backlog` means it is recorded for later and will not be built.
8	- **Status** reflects what the running app does *today*. Every story starts as `Not implemented`. A story moves to `Implemented` only when **all** of its acceptance criteria pass in automated tests **and** in a manual check by the human reviewer. If any criterion is not met, the story stays `Not implemented`, and a note says which criterion fails.
9	- Every acceptance criterion is covered by at least one automated test whose title starts with its ID, for example `[AC-2.4] ...`.
10	- Exact on-screen text (labels, messages) is defined in `spec/technical-spec.md` §7 (copy deck). Messages quoted below must match it character for character.
11	- Unless stated otherwise, examples assume the currency is **PKR**. Amounts in the summary are shown as `Rs 1,234.56`. In the schedule, the currency symbol appears only in the column headers.
12	- "Calculate" means selecting the **Calculate** button or pressing **Enter** in any input field.
13	- All reference figures were computed independently with exact decimal arithmetic using the algorithm in `spec/technical-spec.md` §5.
14	
15	## Story index
16	
17	| Story | Title | Role | Job | Scope | Status |
18	|---|---|---|---|---|---|
19	| S-1 | Calculate the monthly payment | R-1 | J-1 | v1 | Not implemented |
20	| S-2 | Clear messages for invalid input | R-1 | J-1 | v1 | Not implemented |
21	| S-3 | See total interest and total amount payable | R-1 | J-2 | v1 | Not implemented |
22	| S-4 | Results always match the inputs on screen | R-1 | J-1 | v1 | Not implemented |
23	| S-5 | Use it comfortably on a phone | R-1 | J-11 | v1 | Not implemented |
24	| S-6 | Choose a light or dark display | R-1 | J-10 | v1 | Not implemented |
25	| S-7 | Choose the currency amounts are shown in | R-1 | J-3 | v1 | Not implemented |
26	| S-8 | Work entirely from the keyboard | R-2 | J-4 | v1 | Not implemented |
27	| S-9 | Start a fresh quote in one step | R-2 | J-4 | v1 | Not implemented |
28	| S-10 | See how each payment splits into interest and principal | R-2 | J-5 | v1 | Not implemented |
29	| S-11 | Recall earlier calculations | R-2 | J-6 | v1 | Not implemented |
30	| S-12 | De
… [27,673 more characters not shown; see raw/]
```

- **Bash**

```bash
ls && cat package.json playwright.config.ts && ls e2e test src src/* 2>/dev/null | head -50 && grep -n "D-1[3-9]\|D-[2-4][0-9]" docs/spec/decision-log.md | head -60 && cat scripts/trace.mjs | head -60
```

  Result:
```
CLAUDE.md
dist
docs
eslint.config.js
index.html
node_modules
package-lock.json
package.json
playwright.config.ts
reports
scripts
src
test
test-results
transcripts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
tsconfig.test.json
vite.config.ts
vitest.config.ts
{
  "name": "muhammad-arslan-calculator",
  "private": true,
  "version": "0.0.0",
  "description": "Loan EMI Calculator: monthly payment, total cost and repayment schedule of a reducing-balance loan.",
  "type": "module",
  "engines": {
    "node": ">=24 <25"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc -p tsconfig.app.json && vite build",
    "preview": "vite preview --port 4173 --strictPort",
    "lint": "eslint . --max-warnings 0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc -b",
    "test": "vitest run",
    "test:e2e": "playwright test --pass-with-no-tests",
    "trace": "node scripts/trace.mjs",
    "size": "node scripts/size.mjs",
    "verify": "npm run lint && npm run format:check && npm run typecheck && npm test && npm run build && npm run size && npm run test:e2e && npm run trace -- --results"
  },
  "dependencies": {
    "decimal.js": "10.6.0",
    "react": "19.3.1",
    "react-dom": "19.3.1"
  },
  "devDependencies": {
    "@eslint/js": "9.39.5",
    "@playwright/test": "1.64.1",
    "@testing-library/dom": "10.4.2",
    "@testing-library/react": "16.3.3",
    "@testing-library/user-event": "14.6.8",
    "@types/node": "24.19.2",
    "@types/react": "19.3.0",
    "@types/react-dom": "19.3.0",
    "@vitejs/plugin-react": "6.1.2",
    "eslint": "9.39.5",
    "eslint-config-prettier": "10.1.8",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-react-hooks": "7.1.1",
    "fast-check": "4.10.2",
    "globals": "17.13.0",
    "jsdom": "30.1.3",
    "prettier": "3.9.10",
    "typescript": "6.0.3",
    "typescript-eslint": "8.71.2",
    "vite": "8.3.4",
    "vitest": "5.0.5"
  }
}
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
  ...(smokeUrl ? { grep: /@smoke/ } : 
… [8,272 more characters not shown; see raw/]
```

- **Bash**

```bash
cat src/ui/App.tsx index.html tsconfig.test.json tsconfig.json eslint.config.js; ls reports test-results; sed -n 125,240p docs/spec/decision-log.md; ls docs docs/process; cat .prettierrc* 2>/dev/null
```

  Result:
```
import { copy } from './copy'

// Phase 2 shell: renders the title only. No features yet.
export function App() {
  return (
    <header>
      <h1>{copy.app.title}</h1>
    </header>
  )
}
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Loan EMI Calculator</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.test.tsbuildinfo",
    "types": ["vite/client", "node"]
  },
  "include": ["src", "test", "e2e"],
  "exclude": []
}
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.test.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

// Hard rules from CLAUDE.md and spec §3.1, §6, NFR-6, enforced mechanically.
const decimalOnlyFromMoney = {
  name: 'decimal.js',
  message: 'Import Decimal from src/domain/money.ts, never from decimal.js directly (D-36).',
}
const noDirectDecimal = { paths: [decimalOnlyFromMoney] }

export default defineConfig([
  globalIgnores(['dist', 'reports', 'test-results', 'playwright-report', 'node_modules']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    extends: [reactHooks.configs.flat.recommended, jsxA11y.flatConfigs.recommended],
    rules: {
      // Spec §6: no locale-dependent formatting of money or dates.
      'no-restricted-globals': [
        'error',
        { name: 'Intl', message: 'Use the custom formatters in src/domain (spec §6).' },
        { name: 'parseFloat', message: 'Money is never a JS number; use Decimal.' },
      ],
      'no-restricted-properties': [
        'error',
        { property: 'toLocaleString', message: 'Use the custom formatters (sp
… [12,941 more characters not shown; see raw/]
```

- **Bash**

```bash
cat test/setup.ts vitest.config.ts tsconfig.app.json; git log --oneline 2>&1 | head -3; ls src/domain; sed -n 60,140p scripts/trace.mjs
```

  Result:
```
// Vitest setup for the jsdom ("ui") project (spec §12.1).
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Testing Library only auto-cleans when test globals are enabled; they are not.
afterEach(() => {
  cleanup()
})

// jsdom has no matchMedia. Default: light mode, no changes.
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}

// Minimal dialog stubs so component tests that open the dialog don't crash.
// They prove nothing about dialog behaviour; that is tested in E2E only.
const dialogProto = HTMLDialogElement.prototype
if (typeof dialogProto.showModal !== 'function') {
  dialogProto.showModal = function (this: HTMLDialogElement) {
    this.setAttribute('open', '')
  }
}
if (typeof dialogProto.close !== 'function') {
  dialogProto.close = function (this: HTMLDialogElement) {
    this.removeAttribute('open')
    this.dispatchEvent(new Event('close'))
  }
}
// Spec §12.1 (D-15): every Vitest run uses the Asia/Karachi time zone.
process.env.TZ = 'Asia/Karachi'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    passWithNoTests: true,
    env: { TZ: 'Asia/Karachi' },
    reporters: ['default', 'json'],
    outputFile: { json: 'reports/vitest.json' },
    projects: [
      {
        test: {
          name: 'domain',
          environment: 'node',
          include: ['src/domain/**/*.test.ts', 'test/**/*.test.ts'],
        },
      },
      {
        plugins: [react()],
        test: {
          name: 'ui',
          environment: 'jsdom',
          include: ['src/ui/**/*.test.{ts,tsx}', 'src/storage/**/*.test.{ts,tsx}'],
          setupFiles: ['test/setup.ts'],
        },
      },
    ],
  },
})
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "types": ["vite/client"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "verb
… [3,401 more characters not shown; see raw/]
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts

```
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
  historyUnavailable: "Saved calculations aren't available in this browser. Calculations still work.",
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

// --------------------------------------------------------
… [17,045 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e && cat > s01-calculate.spec.ts <<'EOF'
import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectNoResults,
  expectSummary,
  fillLoan,
  LOANS,
  open,
  rateIn,
  readSchedule,
  selectedText,
  summary,
  tenureIn,
  test,
  unitSel,
} from './fixtures'

test.describe('S-1 Calculate the monthly payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-1.1] @smoke 1000000 at 12% for 1 year gives Rs 88,848.79', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-1.2] 12 months gives the same payment as 1 year', async ({ page }) => {
    await calculateLoan(page, { amount: '1000000', rate: '12', tenure: '12', unit: 'Months' })
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-1.3] L-B gives Rs 63,483.57', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 63,483.57')
  })

  test('[AC-1.4] a zero rate gives Rs 10,000.00 (L-C)', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 10,000.00')
  })

  test('[AC-1.5] a one-month loan gives Rs 100,833.33 (L-D)', async ({ page }) => {
    await calculateLoan(page, LOANS.D)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 100,833.33')
  })

  test('[AC-1.6] the smallest accepted values give Rs 1,000.01 (L-MIN)', async ({ page }) => {
    await calculateLoan(page, LOANS.MIN)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 1,000.01')
  })

  test('[AC-1.7] the largest accepted values give Rs 41,666,666.80 (L-MAX)', async ({ page }) => {
    await calculateLoan(page, LOANS.MAX)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 41,666,666.80')
  })

  test('[AC-1.8] thousands and lakh separators give the same result as AC-1.1', async ({ page }) => {
    for (const typed of ['1,000,000', '10,00,000']) {
      await calculateLoan(page, { ...LOANS.A, amount: typed })
      await expectSummary(page, LOANS.A)
      await expect(amountIn(page)).toHaveValue(typed)
    }
  })

  test('[AC-1.9] leading and trailing spaces are ignored', async ({ page }) => {
    await calculateLoan(page, { amount: ' 1000000 ', rate: ' 12 ', tenure: ' 1 ', unit: 'Yea
… [9,640 more characters not shown; see raw/]
```

  Result (error):
```
Exit code 2
/usr/bin/bash: -c: line 207: unexpected EOF while looking for matching `''
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e && ls
```

  Result:
```
fixtures.ts
```

</details>

### 🤖 Claude · 2026-10-17 22:35 PKT

Nothing was written; I'll use the Write tool.

<details><summary>🔧 21 tool call(s): Write ×14, Bash ×4, Edit ×3</summary>

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s01-calculate.spec.ts

```
import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectNoResults,
  expectSummary,
  fillLoan,
  LOANS,
  open,
  rateIn,
  readSchedule,
  selectedText,
  summary,
  tenureIn,
  test,
  unitSel,
} from './fixtures'

test.describe('S-1 Calculate the monthly payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-1.1] @smoke 1000000 at 12% for 1 year gives Rs 88,848.79', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-1.2] 12 months gives the same payment as 1 year', async ({ page }) => {
    await calculateLoan(page, { amount: '1000000', rate: '12', tenure: '12', unit: 'Months' })
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-1.3] L-B gives Rs 63,483.57', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 63,483.57')
  })

  test('[AC-1.4] a zero rate gives Rs 10,000.00 (L-C)', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 10,000.00')
  })

  test('[AC-1.5] a one-month loan gives Rs 100,833.33 (L-D)', async ({ page }) => {
    await calculateLoan(page, LOANS.D)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 100,833.33')
  })

  test('[AC-1.6] the smallest accepted values give Rs 1,000.01 (L-MIN)', async ({ page }) => {
    await calculateLoan(page, LOANS.MIN)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 1,000.01')
  })

  test('[AC-1.7] the largest accepted values give Rs 41,666,666.80 (L-MAX)', async ({ page }) => {
    await calculateLoan(page, LOANS.MAX)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 41,666,666.80')
  })

  test('[AC-1.8] thousands and lakh separators give the same result as AC-1.1', async ({
    page,
  }) => {
    for (const typed of ['1,000,000', '10,00,000']) {
      await calculateLoan(page, { ...LOANS.A, amount: typed })
      await expectSummary(page, LOANS.A)
      await expect(amountIn(page)).toHaveValue(typed)
    }
  })

  test('[AC-1.9] leading and trailing spaces are ignored', async ({ page }) => {
    await calculateLoan(page, { amount: ' 1000000 ', rate: ' 12 ', tenure: ' 1 ', unit: 'Years' })
    await expectSummary(page, LOANS.A)
  })

  test('[AC-1.10] a trailing percent sign on the rate is ignored', async ({ page }) => {
    await calculateLoan(page, { ...LOANS.A, rate: '12%' })
    await expectSummary(page, LOANS.A)
  })

  test('[AC-1.11] calculating again without changes shows the same results', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    const before = await readSchedule(page)
    await calculate(page)
    await expectSummary(page, LOANS.A)
    expect(await readSchedule(page)).toEqual(before)
    expe
… [643 more characters not shown; see raw/]
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s02-validation.spec.ts

```
import type { Page } from '@playwright/test'
import {
  amountIn,
  calcBtn,
  calculate,
  calculateLoan,
  COPY,
  expect,
  expectFieldClean,
  expectFieldError,
  expectNoResults,
  expectResultsShown,
  expectSummary,
  fillLoan,
  LOANS,
  open,
  rateIn,
  summary,
  tenureIn,
  test,
  unitSel,
} from './fixtures'

async function tryAmount(page: Page, amount: string) {
  await fillLoan(page, { amount, rate: '12', tenure: '1', unit: 'Years' })
  await calculate(page)
}

test.describe('S-2 Clear messages for invalid input', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-2.1] @smoke an empty form shows three messages, no results, focus on Loan amount', async ({
    page,
  }) => {
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountRequired)
    await expectFieldError(rateIn(page), COPY.rateRequired)
    await expectFieldError(tenureIn(page), COPY.tenureRequired)
    await expectNoResults(page)
    await expect(amountIn(page)).toBeFocused()
  })

  test('[AC-2.2] loan amount abc is not a number', async ({ page }) => {
    await tryAmount(page, 'abc')
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectNoResults(page)
  })

  test('[AC-2.3] scientific notation 1e6 is not a number', async ({ page }) => {
    await tryAmount(page, '1e6')
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectNoResults(page)
  })

  test('[AC-2.4] amounts 0, -500 and 999.99 are out of range', async ({ page }) => {
    for (const amount of ['0', '-500', '999.99']) {
      await tryAmount(page, amount)
      await expectFieldError(amountIn(page), COPY.amountRange)
      await expectNoResults(page)
    }
  })

  test('[AC-2.5] 1000000000.01 is out of range; 1000000000 is accepted', async ({ page }) => {
    await tryAmount(page, '1000000000.01')
    await expectFieldError(amountIn(page), COPY.amountRange)
    await expectNoResults(page)
    await tryAmount(page, '1000000000')
    await expectResultsShown(page)
    await expectFieldClean(amountIn(page))
  })

  test('[AC-2.6] 1000.555 has too many decimal places', async ({ page }) => {
    await tryAmount(page, '1000.555')
    await expectFieldError(amountIn(page), COPY.amountDecimals)
    await expectNoResults(page)
  })

  test('[AC-2.7] rates -1 and 50.01 are out of range; 0 and 50 are accepted', async ({ page }) => {
    for (const rate of ['-1', '50.01']) {
      await fillLoan(page, { amount: '1000000', rate, tenure: '1', unit: 'Years' })
      await calculate(page)
      await expectFieldError(rateIn(page), COPY.rateRange)
      await expectNoResults(page)
    }
    for (const rate of ['0', '50']) {
      await fillLoan(page, { amount: '1000000', rate, tenure: '1', unit: 'Years' })
      await calculate(page)
      await expectResultsShown(page)
      await expectFieldClean(rateIn(page))
    }
  })

  test('[AC-2.8] rate twelve is not a number; 12.345 has too many decimals', async ({ page }) => {
   
… [5,304 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s01-calculate.spec.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s02-validation.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s03-totals.spec.ts

```
import {
  calculateLoan,
  checkScheduleArithmetic,
  cents,
  expect,
  expectSummary,
  LOANS,
  open,
  readSchedule,
  summary,
  test,
} from './fixtures'

test.describe('S-3 Total interest and total amount payable', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-3.1] L-A totals', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 66,185.45')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 1,066,185.45')
  })

  test('[AC-3.2] L-B totals', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 1,309,014.14')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 3,809,014.14')
  })

  test('[AC-3.3] L-C totals at 0%', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 0.00')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 120,000.00')
  })

  test('[AC-3.4] L-MIN totals', async ({ page }) => {
    await calculateLoan(page, LOANS.MIN)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 0.01')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 1,000.01')
  })

  test('[AC-3.5] L-MAX totals are shown in full', async ({ page }) => {
    await calculateLoan(page, LOANS.MAX)
    await expect(summary(page, 'Total interest')).toHaveText('Rs 19,000,000,061.79')
    await expect(summary(page, 'Total amount payable')).toHaveText('Rs 20,000,000,061.79')
    for (const name of ['Monthly payment', 'Total interest', 'Total amount payable'] as const) {
      const text = (await summary(page, name).textContent()) ?? ''
      expect(text).not.toMatch(/[eE]\+?\d|…|\.\.\./)
    }
  })

  // The property test over random inputs lives in src/domain. This checks the same identities on
  // what the user actually sees, using integer cents.
  for (const key of ['A', 'B', 'C', 'D', 'MIN', 'Z3'] as const) {
    test(`[AC-3.6] on-screen totals reconcile with the schedule columns (L-${key})`, async ({
      page,
    }) => {
      const loan = LOANS[key]
      await calculateLoan(page, loan)
      await expectSummary(page, loan)
      const rows = await readSchedule(page)
      const sums = checkScheduleArithmetic(rows, loan, loan.monthly)
      const shownInterest = cents((await summary(page, 'Total interest').textContent()) ?? '')
      const shownTotal = cents((await summary(page, 'Total amount payable').textContent()) ?? '')
      expect(sums.sumInterest).toBe(shownInterest)
      expect(sums.sumPayment).toBe(shownTotal)
      expect(loan.amountCents + shownInterest).toBe(shownTotal)
    })
  }
})
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s04-stale.spec.ts

```
import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectSummary,
  LOANS,
  open,
  rateIn,
  scheduleTable,
  selectedText,
  summary,
  tenureIn,
  test,
  themeSel,
  unitSel,
  expectTheme,
} from './fixtures'

async function expectStale(page: import('@playwright/test').Page) {
  await expect(page.getByText(COPY.stale, { exact: true })).toBeVisible()
  await expect(summary(page, 'Monthly payment')).toHaveCount(0)
  await expect(page.getByRole('definition')).toHaveCount(0)
  await expect(scheduleTable(page)).toHaveCount(0)
}

test.describe('S-4 Results always match the inputs on screen', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await expect(scheduleTable(page)).toBeVisible()
  })

  test('[AC-4.1] changing the amount, rate or tenure hides the results', async ({ page }) => {
    await amountIn(page).fill('1000001')
    await expectStale(page)
    await amountIn(page).fill('1000000')
    await calculate(page)
    await expectSummary(page, LOANS.A)

    await rateIn(page).fill('13')
    await expectStale(page)
    await rateIn(page).fill('12')
    await calculate(page)
    await expectSummary(page, LOANS.A)

    await tenureIn(page).fill('2')
    await expectStale(page)
  })

  test('[AC-4.2] changing the unit hides the results and keeps the tenure number', async ({
    page,
  }) => {
    await unitSel(page).selectOption({ label: 'Months' })
    await expectStale(page)
    await expect(tenureIn(page)).toHaveValue('1')
    expect(await selectedText(unitSel(page))).toBe('Months')
  })

  test('[AC-4.3] calculating after a change shows new results and removes the message', async ({
    page,
  }) => {
    await amountIn(page).fill('2500000')
    await rateIn(page).fill('18')
    await tenureIn(page).fill('5')
    await expectStale(page)
    await calculate(page)
    await expectSummary(page, LOANS.B)
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })

  test('[AC-4.4] changing currency or theme keeps the results visible', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(scheduleTable(page)).toBeVisible()
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)

    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(scheduleTable(page)).toBeVisible()
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })
})
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s03-totals.spec.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s04-stale.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s05-mobile.spec.ts

```
import {
  amountIn,
  box,
  calcBtn,
  calculateLoan,
  COPY,
  expect,
  LOANS,
  open,
  pageOverflowX,
  rateIn,
  scheduleRegion,
  scheduleTable,
  summary,
  tenureIn,
  test,
} from './fixtures'

test.describe('S-5 Phone use at 360 x 740', () => {
  test.use({ viewport: { width: 360, height: 740 } })

  test('[AC-5.1] no horizontal page scroll on load or after L-MAX', async ({ page }) => {
    await open(page)
    await expect(calcBtn(page)).toBeVisible()
    let m = await pageOverflowX(page)
    expect(m.doc).toBeLessThanOrEqual(m.view)
    expect(m.body).toBeLessThanOrEqual(m.view)

    await calculateLoan(page, LOANS.MAX)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(481)
    m = await pageOverflowX(page)
    expect(m.view).toBe(360)
    expect(m.doc).toBeLessThanOrEqual(360)
    expect(m.body).toBeLessThanOrEqual(360)
  })

  test('[AC-5.2] every input, select and button is at least 44 x 44 and inside the viewport', async ({
    page,
  }) => {
    await open(page)
    // After a calculation so that the history Restore and Delete buttons exist too.
    await calculateLoan(page, LOANS.A)
    await expect(scheduleTable(page)).toBeVisible()

    const groups = [
      { role: 'textbox' as const, expected: 3 },
      { role: 'combobox' as const, expected: 3 },
      { role: 'button' as const, expected: 5 },
    ]
    for (const g of groups) {
      const all = await page.getByRole(g.role).all()
      expect(all.length, `number of ${g.role} elements`).toBeGreaterThanOrEqual(g.expected)
      for (const el of all) {
        const b = await box(el)
        const label = (await el.getAttribute('aria-label')) ?? (await el.textContent()) ?? g.role
        expect(b.width, `${g.role} "${label}" width`).toBeGreaterThanOrEqual(44)
        expect(b.height, `${g.role} "${label}" height`).toBeGreaterThanOrEqual(44)
        expect(b.x, `${g.role} "${label}" left edge`).toBeGreaterThanOrEqual(0)
        expect(b.x + b.width, `${g.role} "${label}" right edge`).toBeLessThanOrEqual(360)
      }
    }
  })

  test('[AC-5.3] the schedule scrolls inside its own area with a sticky header', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.B)
    const region = scheduleRegion(page)
    await expect(region).toBeVisible()
    const dims = await region.evaluate((el) => ({ sh: el.scrollHeight, ch: el.clientHeight }))
    expect(dims.sh).toBeGreaterThan(dims.ch)

    const header = scheduleTable(page).getByRole('columnheader').first()
    const firstRow = scheduleTable(page).getByRole('row').nth(1)
    const headerBefore = await box(header)
    const rowBefore = await box(firstRow)

    await region.evaluate((el) => {
      el.scrollTop = 400
    })
    await expect.poll(() => region.evaluate((el) => el.scrollTop)).toBeGreaterThan(100)

    const headerAfter = await box(header)
    const rowAfter = await box(firstRow)
    expect(Math.abs(headerAfter.y - headerBefore.y)).toBeLessThanOrEqual(1)
    expect(rowAf
… [3,497 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s05-mobile.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s06-theme.spec.ts

```
import {
  blockStorage,
  calculateLoan,
  contrast,
  dataTheme,
  expect,
  expectSummary,
  expectTheme,
  LOANS,
  open,
  readColourTokens,
  selectedText,
  test,
  themeSel,
} from './fixtures'

test.describe('S-6 Light or dark display', () => {
  test('[AC-6.1] with no saved preference the app follows the device setting', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await open(page)
    await expectTheme(page, 'dark')
    expect(await selectedText(themeSel(page))).toBe('System')

    await page.emulateMedia({ colorScheme: 'light' })
    await page.reload()
    await expectTheme(page, 'light')
    expect(await selectedText(themeSel(page))).toBe('System')
  })

  test('[AC-6.2] choosing Dark on a light device switches at once, and Light on a dark device', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    await expectTheme(page, 'light')
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')

    await page.emulateMedia({ colorScheme: 'dark' })
    await themeSel(page).selectOption({ label: 'Light' })
    await expectTheme(page, 'light')

    await expect(themeSel(page).getByRole('option')).toHaveText(['System', 'Light', 'Dark'])
  })

  test('[AC-6.3] a chosen theme survives a reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await page.reload()
    await expectTheme(page, 'dark')
    expect(await selectedText(themeSel(page))).toBe('Dark')
  })

  test('[AC-6.4] with System selected the app follows device changes without a reload', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    expect(await selectedText(themeSel(page))).toBe('System')
    await expectTheme(page, 'light')
    await page.emulateMedia({ colorScheme: 'dark' })
    await expectTheme(page, 'dark')
    await page.emulateMedia({ colorScheme: 'light' })
    await expectTheme(page, 'light')
  })

  test('[AC-6.4] a fixed Light choice ignores device changes', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await open(page)
    await themeSel(page).selectOption({ label: 'Light' })
    await expectTheme(page, 'light')
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.emulateMedia({ colorScheme: 'light' })
    await page.emulateMedia({ colorScheme: 'dark' })
    expect(await dataTheme(page)).toBe('light')
  })

  for (const theme of ['Light', 'Dark'] as const) {
    test(`[AC-6.5][SPEC-§8.4] ${theme}: text and error colours reach 4.5:1`, async ({ page }) => {
      await open(page)
      await themeSel(page).selectOption({ label: theme })
      await expectTheme(page, theme === 'Light' ? 'light' : 'dark')
      const t = await readColourTokens(page, [
        '--bg',
        '--surface',
        '--te
… [1,761 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s06-theme.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s07-currency.spec.ts

```
import {
  amountIn,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectSummary,
  historyItems,
  LOANS,
  open,
  scheduleTable,
  selectedText,
  summary,
  test,
} from './fixtures'

test.describe('S-7 Currency', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-7.1] first visit defaults to PKR (Rs)', async ({ page }) => {
    expect(await selectedText(currencySel(page))).toBe('PKR (Rs)')
    await expect(page.getByLabel('Loan amount (Rs)', { exact: true })).toBeVisible()
    await calculateLoan(page, LOANS.A)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 88,848.79')
  })

  test('[AC-7.2] @smoke switching to USD changes symbols only and keeps the results', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    const rowBefore = await scheduleTable(page).getByRole('row').nth(1).getByRole('cell').allTextContents()

    await currencySel(page).selectOption({ label: 'USD ($)' })

    await expect(summary(page, 'Monthly payment')).toHaveText('$88,848.79')
    await expect(summary(page, 'Total interest')).toHaveText('$66,185.45')
    await expect(summary(page, 'Total amount payable')).toHaveText('$1,066,185.45')
    await expect(scheduleTable(page).getByRole('columnheader')).toHaveText([
      'Month',
      'Payment ($)',
      'Interest ($)',
      'Principal ($)',
      'Balance ($)',
    ])
    await expect(page.getByLabel('Loan amount ($)', { exact: true })).toBeVisible()
    await expect(amountIn(page)).toHaveValue('1000000')
    const rowAfter = await scheduleTable(page).getByRole('row').nth(1).getByRole('cell').allTextContents()
    expect(rowAfter).toEqual(rowBefore)
    expect(rowAfter).toEqual(['1', '88,848.79', '10,000.00', '78,848.79', '921,151.21'])
    await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  })

  test('[AC-7.3] the chosen currency survives a reload', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await page.reload()
    expect(await selectedText(currencySel(page))).toBe('USD ($)')
    await expect(page.getByLabel('Loan amount ($)', { exact: true })).toBeVisible()
  })

  test('[AC-7.4] the currency note is shown', async ({ page }) => {
    await expect(currencySel(page)).toBeVisible()
    await expect(page.getByText(COPY.currencyNote, { exact: true })).toBeVisible()
  })

  test('[AC-7.5] a saved PKR entry keeps its Rs amounts after switching to USD', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await currencySel(page).selectOption({ label: 'USD ($)' })
    const item = historyItems(page).first()
    await expect(item).toContainText('Rs 1,000,000.00 at 12% for 1 year')
    await expect(item).toContainText('Rs 88,848.79 per month')
    await expect(item).not.toContainText('$')
  })
})
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s07-currency.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s08-keyboard.spec.ts

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
    await tabThrough(page, [...afterReset].reverse().slice(1).concat([resetBtn(page)]), 'Shift+Tab')
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
      await expect(scheduleTable(page).getByRole('row')).toHav
… [7,972 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s08-keyboard.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s09-reset.spec.ts

```
import {
  amountIn,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectFieldClean,
  expectFieldError,
  expectNoResults,
  expectSummary,
  expectTheme,
  fillLoan,
  historyItems,
  LOANS,
  open,
  rateIn,
  resetBtn,
  selectedText,
  tenureIn,
  test,
  themeSel,
  unitSel,
} from './fixtures'

async function expectPristine(page: import('@playwright/test').Page) {
  await expect(amountIn(page)).toHaveValue('')
  await expect(rateIn(page)).toHaveValue('')
  await expect(tenureIn(page)).toHaveValue('')
  expect(await selectedText(unitSel(page))).toBe('Years')
  await expectNoResults(page)
  await expect(page.getByText(COPY.stale, { exact: true })).toHaveCount(0)
  await expectFieldClean(amountIn(page))
  await expectFieldClean(rateIn(page))
  await expectFieldClean(tenureIn(page))
  await expect(amountIn(page)).toBeFocused()
}

test.describe('S-9 Reset', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-9.1] Reset empties the form from the results, stale and error states', async ({
    page,
  }) => {
    // From results.
    await calculateLoan(page, { ...LOANS.A, unit: 'Months', tenure: '12' })
    await expectSummary(page, LOANS.A)
    await resetBtn(page).click()
    await expectPristine(page)

    // From the stale state.
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await unitSel(page).selectOption({ label: 'Months' })
    await expect(page.getByText(COPY.stale, { exact: true })).toBeVisible()
    await resetBtn(page).click()
    await expectPristine(page)

    // From error messages.
    await fillLoan(page, { amount: 'abc', rate: '99', tenure: 'x', unit: 'Months' })
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectFieldError(rateIn(page), COPY.rateRange)
    await expectFieldError(tenureIn(page), COPY.tenureWhole)
    await resetBtn(page).click()
    await expectPristine(page)
  })

  test('[AC-9.2] Reset leaves currency, theme and saved calculations alone', async ({ page }) => {
    await currencySel(page).selectOption({ label: 'USD ($)' })
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)

    await resetBtn(page).click()

    await expectNoResults(page)
    expect(await selectedText(currencySel(page))).toBe('USD ($)')
    await expect(page.getByLabel('Loan amount ($)', { exact: true })).toBeVisible()
    expect(await selectedText(themeSel(page))).toBe('Dark')
    await expectTheme(page, 'dark')
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')
    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')
  })

  test('[AC-9.3] Reset on an empty form changes nothing and shows no error', async
… [556 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s09-reset.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s10-schedule.spec.ts

```
import {
  calcBtn,
  calculateLoan,
  checkScheduleArithmetic,
  COPY,
  expect,
  LOANS,
  open,
  readSchedule,
  scheduleTable,
  summary,
  test,
} from './fixtures'

const rowCells = (page: import('@playwright/test').Page, n: number) =>
  scheduleTable(page).getByRole('row').nth(n).getByRole('cell')

test.describe('S-10 Repayment schedule', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-10.1] L-A shows a 12-row Repayment schedule with the five columns', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    const table = scheduleTable(page)
    await expect(table).toBeVisible()
    await expect(table.getByRole('columnheader')).toHaveText([
      'Month',
      'Payment (Rs)',
      'Interest (Rs)',
      'Principal (Rs)',
      'Balance (Rs)',
    ])
    // One header row plus 12 data rows.
    await expect(table.getByRole('row')).toHaveCount(13)
    expect(await readSchedule(page)).toHaveLength(12)
  })

  test('[AC-10.2] L-A row 1', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(rowCells(page, 1)).toHaveText([
      '1',
      '88,848.79',
      '10,000.00',
      '78,848.79',
      '921,151.21',
    ])
  })

  test('[AC-10.3] L-A row 12', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(rowCells(page, 12)).toHaveText(['12', '88,848.78', '879.69', '87,969.09', '0.00'])
  })

  test('[AC-10.4][AC-10.5] every L-A and L-B row satisfies the interest and payment rules', async ({
    page,
  }) => {
    for (const loan of [LOANS.A, LOANS.B]) {
      await calculateLoan(page, loan)
      await expect(summary(page, 'Monthly payment')).toHaveText(loan.monthly)
      checkScheduleArithmetic(await readSchedule(page), loan, loan.monthly)
    }
  })

  test('[AC-10.5] L-A payments are 88,848.78 in rows 9, 10 and 12 and 88,848.79 elsewhere', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    const rows = await readSchedule(page)
    expect(rows).toHaveLength(12)
    const payments = rows.map((r) => r[1])
    const low = new Set([9, 10, 12])
    payments.forEach((p, i) => {
      expect(p, `row ${i + 1} payment`).toBe(low.has(i + 1) ? '88,848.78' : '88,848.79')
    })
  })

  test('[AC-10.6] the rounding note shows for L-A and not for L-C', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText(COPY.rounding, { exact: true })).toBeVisible()
    await calculateLoan(page, LOANS.C)
    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 10,000.00')
    await expect(page.getByText(COPY.rounding, { exact: true })).toHaveCount(0)
  })

  test('[AC-10.7] L-Z3 rows', async ({ page }) => {
    await calculateLoan(page, LOANS.Z3)
    await expect(rowCells(page, 1)).toHaveText(['1', '333.33', '0.00', '333.33', '666.67'])
    await expect(rowCells(page, 2)).toHaveText(['2', '333.34', '0.00', '333.34', '333.33'])
    await expect(rowCells(page, 3)).toHaveText(['3', '333.33', '0.00', 
… [2,041 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s10-schedule.spec.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e && python - <<'PY'
import re
p='s10-schedule.spec.ts'
s=open(p,encoding='utf8').read()
s=s.replace("expect.stringMatching(/^[\\d,]+\\.\\d{2}$/)","/^[\\d,]+\\.\\d{2}$/")
open(p,'w',encoding='utf8').write(s)
PY
grep -n "d,\]" s10-schedule.spec.ts
```

  Result:
```
<stdin>:4: SyntaxWarning: invalid escape sequence '\d'
<stdin>:4: SyntaxWarning: invalid escape sequence '\d'
139:      /^[\d,]+\.\d{2}$/,
140:      /^[\d,]+\.\d{2}$/,
141:      /^[\d,]+\.\d{2}$/,
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s11-history.spec.ts

```
import {
  amountIn,
  blockStorage,
  calculate,
  calculateLoan,
  COPY,
  currencySel,
  expect,
  expectFieldClean,
  expectNoResults,
  expectSummary,
  fillLoan,
  fixClock,
  HISTORY_KEY,
  historyItems,
  historyList,
  LOANS,
  open,
  rateIn,
  readStored,
  restoreBtn,
  scheduleTable,
  seedHistory,
  seedRaw,
  selectedText,
  summary,
  tenureIn,
  test,
  unitSel,
  zeroRateEntry,
  zeroRateLine1,
} from './fixtures'

test.describe('S-11 Recall earlier calculations', () => {
  test('[AC-11.1] with nothing saved the area says so', async ({ page }) => {
    await open(page)
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })

  test('[AC-11.2] @smoke an entry shows three lines with the saved time (20:45, 17 Oct 2026)', async ({
    page,
  }) => {
    await fixClock(page)
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    const item = historyItems(page).first()
    await expect(item).toContainText('Rs 1,000,000.00 at 12% for 1 year')
    await expect(item).toContainText('Rs 88,848.79 per month')
    await expect(item).toContainText('17 Oct 2026, 20:45')
    // The three lines come in this order.
    const lines = (await item.innerText())
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '' && l !== 'Restore' && l !== 'Delete')
    expect(lines).toEqual([
      'Rs 1,000,000.00 at 12% for 1 year',
      'Rs 88,848.79 per month',
      '17 Oct 2026, 20:45',
    ])
    // Accessible names of the entry buttons (D-29).
    await expect(
      page.getByRole('button', {
        name: 'Restore Rs 1,000,000.00 at 12% for 1 year, saved 17 Oct 2026, 20:45',
        exact: true,
      }),
    ).toBeVisible()
    await expect(
      page.getByRole('button', {
        name: 'Delete Rs 1,000,000.00 at 12% for 1 year, saved 17 Oct 2026, 20:45',
        exact: true,
      }),
    ).toBeVisible()
  })

  test('[AC-11.3] a calculation that shows errors saves nothing', async ({ page }) => {
    await open(page)
    await calculate(page)
    await expect(page.getByText(COPY.amountRequired, { exact: true })).toBeVisible()
    await fillLoan(page, { amount: 'abc', rate: '12', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expect(page.getByText(COPY.amountNan, { exact: true })).toBeVisible()
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
    expect(await readStored(page, HISTORY_KEY)).toBeNull()
  })

  test('[AC-11.4] the newest calculation is listed first', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')
    await expect(historyItems(page).nth(0)).toContainTe
… [7,536 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s11-history.spec.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e && python3 - <<'PY'
p='s11-history.spec.ts'
s=open(p,encoding='utf8').read()
i=s.index("  test('[AC-11.3][AC-11.10] nothing is shown")
j=s.index("})\n", s.index("catch(() => undefined)"))
s=s[:i].rstrip()+"\n})\n"
s=s.replace("  expectFieldClean,\n  expectNoResults,\n","")
open(p,'w',encoding='utf8').write(s)
PY
tail -20 s11-history.spec.ts
```

  Result:
```
Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings > Apps > Advanced app settings > App execution aliases.
        v: { amount: '100000', rate: '21.50', tenure: '24', unit: 'Months' },
        line1: 'Rs 100,000.00 at 21.5% for 24 months',
      },
    ]
    for (const c of cases) {
      await calculateLoan(page, c.v)
      await expect(historyItems(page).first()).toContainText(c.line1)
    }
    await expect(historyItems(page)).toHaveCount(cases.length)
  })

  test('[AC-11.3][AC-11.10] nothing is shown as results after a failed calculation (control)', async ({
    page,
  }) => {
    await open(page)
    await calculate(page)
    await expectNoResults(page)
    await expectFieldClean(rateIn(page).and(rateIn(page))).catch(() => undefined)
  })
})
```

- **Edit** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s11-history.spec.ts

Replace:
```
test('[AC-11.3][AC-11.10] nothing is shown as results after a failed calculation (control)', async ({
    page,
  }) => {
    await open(page)
    await calculate(page)
    await expectNoResults(page)
    await expectFieldClean(rateIn(page).and(rateIn(page))).catch(() => undefined)
  })
})
```
With:
```
})
```

- **Edit** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s11-history.spec.ts

Replace:
```
expectFieldClean,
  expectNoResults,
```
With:
```

```

  Result:
```
The file c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s11-history.spec.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

  Result:
```
The file c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s11-history.spec.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s12-delete.spec.ts

```
import {
  allowStorageThenGuardWrites,
  amountIn,
  calculateLoan,
  clearAllBtn,
  confirmDialog,
  COPY,
  deleteBtn,
  expect,
  expectSummary,
  HISTORY_KEY,
  historyHeading,
  historyItems,
  LOANS,
  open,
  readStored,
  refuseWrites,
  restoreBtn,
  test,
} from './fixtures'

test.describe('S-12 Delete saved calculations', () => {
  test('[AC-12.1] Delete removes one entry for good and moves focus to the next entry', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await calculateLoan(page, LOANS.C)
    // Newest first: C, B, A.
    await expect(historyItems(page)).toHaveCount(3)

    await deleteBtn(page, LOANS.B.line1).click()
    await expect(historyItems(page)).toHaveCount(2)
    await expect(page.getByRole('button', { name: `Restore ${LOANS.B.line1}` })).toHaveCount(0)
    await expect(restoreBtn(page, LOANS.A.line1)).toBeFocused()
    await expect(historyItems(page).nth(0)).toContainText(LOANS.C.line1)
    await expect(historyItems(page).nth(1)).toContainText(LOANS.A.line1)

    await page.reload()
    await expect(historyItems(page)).toHaveCount(2)
    await expect(page.getByRole('button', { name: `Restore ${LOANS.B.line1}` })).toHaveCount(0)
    await expect(historyItems(page).nth(1)).toContainText('Rs 88,848.79 per month')

    // Deleting the last entry moves focus to the previous entry.
    await deleteBtn(page, LOANS.A.line1).click()
    await expect(historyItems(page)).toHaveCount(1)
    await expect(restoreBtn(page, LOANS.C.line1)).toBeFocused()

    // Deleting the only entry moves focus to the heading.
    await deleteBtn(page, LOANS.C.line1).click()
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyHeading(page)).toBeFocused()
  })

  test('[AC-12.2] Clear all opens a confirmation with the two sentences and two buttons', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await clearAllBtn(page).click()
    const dialog = confirmDialog(page)
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText(COPY.dialogText, { exact: true })).toBeVisible()
    await expect(dialog.getByText(COPY.dialogHint, { exact: true })).toBeVisible()
    await expect(dialog.getByRole('button')).toHaveText(['Cancel', 'Clear'])
    await expect(dialog).toHaveAccessibleDescription(COPY.dialogHint)
  })

  test('[AC-12.3] Cancel and Escape delete nothing', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)

    await clearAllBtn(page).click()
    await confirmDialog(page).getByRole('button', { name: 'Cancel', exact: true }).click()
    await expect(confirmDialog(page)).toBeHidden()
    await expect(historyItems(page)).toHaveCount(2)

    await clearAllBtn(page).click()
    await exp
… [3,510 more characters not shown; see raw/]
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s13-balance.spec.ts

```
import {
  calculateLoan,
  checkScheduleArithmetic,
  expect,
  LOANS,
  open,
  readSchedule,
  scheduleTable,
  test,
} from './fixtures'

const rowCells = (page: import('@playwright/test').Page, n: number) =>
  scheduleTable(page).getByRole('row').nth(n).getByRole('cell')

test.describe('S-13 Balance after each payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-13.1] L-A balance is 514,921.05 after month 6 and 0.00 after month 12', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(rowCells(page, 6).nth(4)).toHaveText('514,921.05')
    await expect(rowCells(page, 12).nth(4)).toHaveText('0.00')
  })

  test('[AC-13.2] L-B entered as 5 Years has exactly 60 rows ending at 0.00', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    await expect(scheduleTable(page).getByRole('row')).toHaveCount(61)
    expect(await readSchedule(page)).toHaveLength(60)
    await expect(rowCells(page, 60)).toHaveText([
      '60',
      expect.anything() as unknown as string,
      expect.anything() as unknown as string,
      expect.anything() as unknown as string,
      '0.00',
    ])
  })

  // The property test over random inputs lives in src/domain; these check the same rules on the
  // numbers a user sees, with integer cents.
  for (const key of ['A', 'B', 'C', 'D', 'MIN', 'Z3', 'MAX'] as const) {
    test(`[AC-13.3] balances reconcile row by row and end at 0.00 (L-${key})`, async ({ page }) => {
      const loan = LOANS[key]
      await calculateLoan(page, loan)
      await expect(scheduleTable(page).getByRole('row')).toHaveCount(loan.months + 1)
      const rows = await readSchedule(page)
      checkScheduleArithmetic(rows, loan, loan.monthly)
      expect(rows[rows.length - 1]?.[4]).toBe('0.00')
    })
  }

  test('[AC-13.3] the same tenure as years or months gives the same schedule', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    const years = await readSchedule(page)
    await calculateLoan(page, { ...LOANS.A, tenure: '12', unit: 'Months' })
    expect(await readSchedule(page)).toEqual(years)
    expect(years).toHaveLength(12)
  })
})
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s12-delete.spec.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s13-balance.spec.ts (file state is current in your context — no need to Read it back)
```

- **Edit** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s13-balance.spec.ts

Replace:
```
expect.anything() as unknown as string,
      expect.anything() as unknown as string,
      expect.anything() as unknown as string,
```
With:
```
/^[\d,]+\.\d{2}$/,
      /^[\d,]+\.\d{2}$/,
      /^[\d,]+\.\d{2}$/,
```

  Result:
```
The file c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s13-balance.spec.ts has been updated successfully. (file state is current in your context — no need to Read it back)
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\spec-rules.spec.ts

```
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
    await fillLoan(page, { amount: 'abc', rate: '12', tenure: '41', unit: 'Years' })
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
    await expect(page.getByText(COPY.stale, { exact: tr
… [13,519 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\spec-rules.spec.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
sed -i "s/heading, tagline-free title and document title/the page has an h1 and the document title is Loan EMI Calculator/" e2e/spec-rules.spec.ts && npx prettier --write e2e >/dev/null && npx eslint e2e --max-warnings 0; npx tsc -p tsconfig.test.json --noEmit 2>&1 | grep -v "^src/domain" | head -30
```

  Result:
```
[This command modified 8 files you've previously read: e2e\s11-history.spec.ts, e2e\s06-theme.spec.ts, e2e\fixtures.ts, e2e\spec-rules.spec.ts, e2e\s08-keyboard.spec.ts and 3 more. Call Read before editing.]
```

- **Bash**

```bash
npx eslint e2e --max-warnings 0; echo eslint=$?; npm run typecheck 2>&1 | tail -15; npx prettier --check e2e | tail -3
```

  Result:
```
eslint=0

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

Checking formatting...
All matched files use Prettier code style!
```

</details>

### 🤖 Claude · 2026-10-17 22:40 PKT

Now run chromium.

<details><summary>🔧 27 tool call(s): Bash ×24, Write, Edit, SubagentHandback</summary>

- **Bash**

```bash
(npx playwright test --project=chromium --reporter=line 2>&1 | tail -60); ls node_modules/.cache 2>/dev/null | head -1
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: bztg8ilox). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bztg8ilox.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Write** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\manual-test-checklist.md

```
# Manual test checklist (v1)

For the human to tick in a real browser (`npm run dev`, or the deployed site). One line per v1 acceptance criterion (94 in all). Tick a box only if the expected result is exactly what you see. Tick nothing on a guess.

**Before you start:** open the app in a private window (clean storage), at a normal desktop width, with the device in light mode, unless a step says otherwise. Reference loans: **L-A** = `1000000`, `12`, `1` Years. **L-B** = `2500000`, `18`, `5` Years. **L-C** = `120000`, `0`, `12` Months. **L-D** = `100000`, `10`, `1` Months. **L-MIN** = `1000`, `0.01`, `1` Months. **L-MAX** = `1000000000`, `50`, `40` Years. **L-Z3** = `1000`, `0`, `3` Months. "Calculate" means the button or Enter in an input.

If a step fails, leave the box empty and write which AC failed. Do not change a story's Status yourself unless you have checked every AC of that story.

## S-1 Calculate the monthly payment

- [ ] **AC-1.1** Empty form. Enter `1000000`, `12`, `1`, unit Years. Calculate. **Monthly payment** reads `Rs 88,848.79`.
- [ ] **AC-1.2** Empty form. Enter `1000000`, `12`, `12`, unit Months. Calculate. **Monthly payment** reads `Rs 88,848.79`.
- [ ] **AC-1.3** Enter L-B (`2500000`, `18`, `5`, Years). Calculate. **Monthly payment** reads `Rs 63,483.57`.
- [ ] **AC-1.4** Enter L-C (`120000`, `0`, `12`, Months). Calculate. **Monthly payment** reads `Rs 10,000.00`.
- [ ] **AC-1.5** Enter L-D (`100000`, `10`, `1`, Months). Calculate. **Monthly payment** reads `Rs 100,833.33`.
- [ ] **AC-1.6** Enter L-MIN (`1000`, `0.01`, `1`, Months). Calculate. **Monthly payment** reads `Rs 1,000.01`.
- [ ] **AC-1.7** Enter L-MAX (`1000000000`, `50`, `40`, Years). Calculate. **Monthly payment** reads `Rs 41,666,666.80`.
- [ ] **AC-1.8** Enter the amount as `1,000,000`, rate `12`, tenure `1` Years, Calculate: `Rs 88,848.79`. Change the amount to `10,00,000`, Calculate: `Rs 88,848.79` again.
- [ ] **AC-1.9** Type a space before and after each value (`␣1000000␣`, `␣12␣`, `␣1␣`), Years. Calculate. `Rs 88,848.79`, no error.
- [ ] **AC-1.10** Enter `1000000`, rate `12%`, tenure `1` Years. Calculate. `Rs 88,848.79`, no error.
- [ ] **AC-1.11** Calculate L-A, then select Calculate again without touching anything. Monthly payment, Total interest, Total amount payable and the schedule are unchanged.
- [ ] **AC-1.12** Open the app in a fresh private window. All three inputs are empty, the unit shows **Years**, no figures are shown, and the results area says `Enter your loan details and select Calculate.`

## S-2 Clear messages for invalid input

- [ ] **AC-2.1** On the empty form select Calculate. Under the fields you see `Enter a loan amount.`, `Enter an interest rate.` and `Enter a loan tenure.`; no figures; the results area says `Enter your loan details and select Calculate.`; the cursor is in **Loan amount**.
- [ ] **AC-2.2** Amount `abc`, rate `12`, tenure `1` Years. Calculate. Under Loan amount: `Loan amount must be a number.` No results.
- [ ] **
… [15,036 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\manual-test-checklist.md (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
npx prettier --write docs/process/manual-test-checklist.md; tail -c 1500 "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/tasks/bztg8ilox.output"
```

  Result:
```
(Bash completed with no output)
```

- **Bash**

```bash
npx playwright test --list --project=chromium 2>&1 | tail -3; nproc 2>/dev/null; echo $NUMBER_OF_PROCESSORS
```

  Result:
```
[chromium] › spec-rules.spec.ts:392:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator
  [chromium] › spec-rules.spec.ts:402:3 › Spec rules: §11 NFR-3 and NFR-7 (no network, no cookies) › [SPEC-§11] after a calculation there are no further requests, no cookies
Total: 149 tests in 14 files
8
8
```

- **Bash**

```bash
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -match 'playwright|vite' } | Select-Object ProcessId, @{n='cmd';e={\$_.CommandLine.Substring(0,[Math]::Min(150,\$_.CommandLine.Length))}} | Format-List"
```

  Result:
```
ProcessId : 21464
cmd       : "node"   "C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\.bin\\..\vite\bin\vite.js" 
            --strictPort --port 5173

ProcessId : 20780
cmd       : "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs/node_modules/npm/bin/npx-cli.js" playwright 
            test --project=chromium --reporter=line

ProcessId : 21192
cmd       : "node"   
            "C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\.bin\\..\@playwright\test\cli.js" test 
            --project=chromium --reporter=line

ProcessId : 23088
cmd       : "node"   "C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\.bin\\..\vite\bin\vite.js" 
            preview --port 4173 --strictPort

ProcessId : 19732
cmd       : "C:\Program Files\nodejs\node.exe" C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwr
            ight\lib\worker\workerProcessEntry.js

ProcessId : 23804
cmd       : "C:\Program Files\nodejs\node.exe" C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwr
            ight\lib\worker\workerProcessEntry.js

ProcessId : 21224
cmd       : "C:\Program Files\nodejs\node.exe" C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwr
            ight\lib\worker\workerProcessEntry.js

ProcessId : 14156
cmd       : "C:\Program Files\nodejs\node.exe" C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwr
            ight\lib\worker\workerProcessEntry.js
```

- **Bash**

```bash
powershell -NoProfile -Command "Stop-Process -Id 20780,21192,19732,23804,21224,14156 -Force -ErrorAction SilentlyContinue; 'done'"
```

- **Edit** · c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts

Replace:
```
const problems: string[] = []
    const watch
```
With:
```
// Fail fast when an element is missing (a missing control is the normal red state) instead of
    // waiting the 30 s default; every real action completes in well under a second.
    page.setDefaultTimeout(8_000)
    context.setDefaultTimeout(8_000)
    const problems: string[] = []
    const watch
```

  Result:
```
done
```

  Result:
```
The file c:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts has been updated successfully.
```

- **Bash**

```bash
time (npx playwright test --project=chromium --reporter=json > "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/chromium.json" 2>/dev/null); echo exit=$?
```

  Result:
```
real	5m38.184s
user	0m0.182s
sys	0m0.123s
exit=1
```

- **Bash**

```bash
cat > "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/sum.mjs" <<'EOF'
import fs from 'node:fs'
const j = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const rows = []
const walk = (s) => { for (const sp of s.specs ?? []) for (const t of sp.tests) { const r = t.results.at(-1); rows.push({ title: sp.title, project: t.projectName, status: r.status, err: (r.error?.message ?? '').replace(/\x1b\[[0-9;]*m/g,'').split('\n').slice(0,4).join(' | ').slice(0,260), dur: r.duration }) } for (const c of s.suites ?? []) walk(c) }
for (const s of j.suites) walk(s)
const c = {}
for (const r of rows) c[r.status] = (c[r.status]||0)+1
console.log(c, rows.length)
const mode = process.argv[3]
for (const r of rows) if (mode==='pass' ? r.status==='passed' : r.status!=='passed') console.log(r.status, '|', r.title.slice(0,90), '|', r.err)
EOF
node "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/sum.mjs" "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/chromium.json" pass
```

  Result:
```
{ failed: 148, passed: 1 } 149
passed | [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator |
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; node $S/sum.mjs $S/chromium.json fail | awk -F'|' 'NR>1{ $1=""; $2=""; print }' | sed 's/^ *//' | cut -c1-130 | sort | uniq -c | sort -rn | head -50
```

  Result:
```
95 TimeoutError: locator.fill: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel(/^Loan amount \((Rs \$)\)$/)   
     10 TimeoutError: locator.selectOption: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel('Theme', { exact: true })   
      7 Error: expect(locator).toHaveCount(expected) failed      Locator:  getByRole('list', { name: 'Saved calculations' }).getByRole('li
      7 Error: expect(locator).toBeVisible() failed      Locator: getByText('No saved calculations yet.', { exact: true })   Expected: vis
      4 TimeoutError: locator.evaluate: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel('Currency', { exact: true })   
      4 TimeoutError: locator.click: Timeout 8000ms exceeded.   Call log:     - waiting for getByRole('button', { name: 'Calculate', exact
      3 Error: expect(locator).toBeVisible() failed      Locator: getByText('Enter your loan details and select Calculate.', { exact: true
      2 TimeoutError: locator.selectOption: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel('Currency', { exact: true })
      2 Error: expect(locator).toHaveValue(expected) failed      Locator: getByLabel(/^Loan amount \((Rs \$)\)$/)   Expected: ""
      2 Error: expect(locator).toBeVisible() failed      Locator: getByText('Saved calculations aren\'t available in this browser. Calcula
      1 TimeoutError: locator.fill: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel(/^Loan amount/)   
      1 TimeoutError: locator.evaluate: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel('Theme', { exact: true })   
      1 TimeoutError: locator.evaluate: Timeout 8000ms exceeded.   Call log:     - waiting for getByLabel('Tenure unit', { exact: true }) 
      1 Error: expect(received).toBe(expected) // Object.is equality      Expected: "light"   Received: undefined
      1 Error: expect(received).toBe(expected) // Object.is equality      Expected: "dark"   Received: undefined
      1 Error: expect(locator).toHaveAttribute(expected) failed      Locator: getByLabel(/^Loan amount \((Rs \$)\)$/)   Expected: "text"
      1 Error: expect(locator).toHaveAttribute(expected) failed      Locator: getByLabel(/^Loan amount \((Rs \$)\)$/)   Expected: "decimal
      1 Error: expect(locator).toBeVisible() failed      Locator: getByRole('button', { name: 'Calculate', exact: true })   Expected: visi
      1 Error: expect(locator).toBeVisible() failed      Locator: getByLabel(/^Loan amount \((
… [406 more characters not shown; see raw/]
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; mkdir -p $S/mock && cat > $S/mock/playwright.config.ts <<'EOF'
import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: '.',
  timeout: 30000,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:4173/', timezoneId: 'Asia/Karachi', locale: 'en-GB' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
})
EOF
cat > $S/mock/mock.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
import {
  blockStorage, allowStorageThenGuardWrites, refuseWrites, readColourTokens, contrast, fixClock,
} from 'C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e/fixtures'

const html = (body: string, head = '') => `<!doctype html><html data-theme="light"><head><title>t</title><style>:root{--x:#1A1F2B;--y:#FFFFFF}[data-theme=dark]{--x:#E7ECF3;--y:#0F141B}${head}</style></head><body>${body}</body></html>`
async function serve(ctx: import('@playwright/test').BrowserContext, body: string, head = '') {
  await ctx.route('http://localhost:4173/**', (r) => r.fulfill({ contentType: 'text/html', body: html(body, head) }))
}

test('block methods', async ({ page, context }) => {
  await serve(context, `<script>let r=[];for (const f of [()=>localStorage.getItem('a'),()=>localStorage.setItem('a','b'),()=>localStorage.removeItem('a'),()=>localStorage.clear()]) {try{f();r.push('ok')}catch(e){r.push('throw')}} document.title=r.join(',')</script>`)
  await blockStorage(page, 'methods')
  await page.goto('./')
  expect(await page.title()).toBe('throw,throw,throw,throw')
})
test('block getter', async ({ page, context }) => {
  await serve(context, `<script>try{window.localStorage;document.title='ok'}catch(e){document.title='throw'}</script>`)
  await blockStorage(page, 'getter')
  await page.goto('./')
  expect(await page.title()).toBe('throw')
})
test('guard writes', async ({ page, context }) => {
  await serve(context, `<script>window.t=(n)=>{try{localStorage.setItem('k',n);return 'ok'}catch(e){return 'throw'}}</script>`)
  await allowStorageThenGuardWrites(page)
  await page.goto('./')
  expect(await page.evaluate(() => (window as any).t('1'))).toBe('ok')
  await refuseWrites(page)
  expect(await page.evaluate(() => (wind
… [3,247 more characters not shown; see raw/]
```

  Result:
```
Require stack:
- C:\Users\arslan.NINEALPHA\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\scratchpad\mock\playwright.config.ts
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwright\lib\common\index.js
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwright\lib\program.js
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\@playwright\test\cli.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1500:15)
    at wrapResolveFilename (node:internal/modules/cjs/loader:1071:27)
    at defaultResolveImplForCJSLoading (node:internal/modules/cjs/loader:1095:10)
    at defaultResolve (node:internal/modules/cjs/loader:1146:20)
    at nextStep (node:internal/modules/customization_hooks:189:26)
    at resolve (C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwright\lib\common\index.js:829:19)
    at nextStep (node:internal/modules/customization_hooks:189:26)
    at resolveWithHooks (node:internal/modules/customization_hooks:417:10)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1159:25)
    at Module._load (node:internal/modules/cjs/loader:1285:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1600:12)
    at require (node:internal/modules/helpers:153:16)
    at Object.<anonymous> (C:\Users\arslan.NINEALPHA\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\scratchpad\mock\playwright.config.ts:1:1)
    at Module._compile (node:internal/modules/cjs/loader:1854:14)
    at Object.<anonymous> (node:internal/modules/cjs/loader:1985:10)
    at Module.load (node:internal/modules/cjs/loader:1577:32)
    at Module._load (node:internal/modules/cjs/loader:1379:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.require (node:internal/modules/cjs/loader:1600:12)
    at require (node:internal/modules/helpers:153:16)
    at requireOrImport (C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwright\lib\common\index.js:1098:18)
    at loadUserConfig (C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwright\lib\common\index.js:1283:52)
    at loadConfig (C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules\playwright\lib\common\index.js:1290:28)
    at Object.loadConfigFromFile (C:\User
… [921 more characters not shown; see raw/]
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; mkdir -p .mocktmp && cp $S/mock/*.ts .mocktmp/ && sed -i "s#C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e/fixtures#../e2e/fixtures#" .mocktmp/mock.spec.ts && cd .mocktmp && npx playwright test -c playwright.config.ts 2>&1 | tail -50
```

  Result:
```
Running 21 tests using 3 workers

  ok  1 [chromium] › mock.spec.ts:11:1 › block methods (312ms)
  ok  4 [chromium] › mock.spec.ts:17:1 › block getter (141ms)
  ok  5 [chromium] › mock.spec.ts:23:1 › guard writes (159ms)
  ok  3 [webkit] › mock.spec.ts:11:1 › block methods (1.0s)
  ok  6 [chromium] › mock.spec.ts:32:1 › ignore storage events + seed (1.2s)
  ok  7 [webkit] › mock.spec.ts:17:1 › block getter (776ms)
  ok  8 [chromium] › mock.spec.ts:52:1 › tokens + contrast + theme emulate (537ms)
  ok 10 [chromium] › mock.spec.ts:64:1 › clock (412ms)
  ok 11 [chromium] › mock.spec.ts:70:1 › timing script (439ms)
  ok  9 [webkit] › mock.spec.ts:23:1 › guard writes (1.8s)
  ok  2 [firefox] › mock.spec.ts:11:1 › block methods (4.7s)
  ok 13 [firefox] › mock.spec.ts:17:1 › block getter (1.4s)
  ok 14 [firefox] › mock.spec.ts:23:1 › guard writes (682ms)
  ok 15 [firefox] › mock.spec.ts:32:1 › ignore storage events + seed (3.3s)
  x  12 [webkit] › mock.spec.ts:32:1 › ignore storage events + seed (7.9s)
  ok 16 [firefox] › mock.spec.ts:52:1 › tokens + contrast + theme emulate (677ms)
  ok 17 [firefox] › mock.spec.ts:64:1 › clock (569ms)
  ok 19 [firefox] › mock.spec.ts:70:1 › timing script (698ms)
  ok 18 [webkit] › mock.spec.ts:52:1 › tokens + contrast + theme emulate (661ms)
  ok 20 [webkit] › mock.spec.ts:64:1 › clock (442ms)
  ok 21 [webkit] › mock.spec.ts:70:1 › timing script (439ms)


  1) [webkit] › mock.spec.ts:32:1 › ignore storage events + seed ───────────────────────────────────

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: "got"
    Received: "t"

    Call Log:
    - Timeout 5000ms exceeded while waiting on the predicate

      48 |   await d.goto('./')
      49 |   await d.evaluate(() => localStorage.setItem('z', '2'))
    > 50 |   await expect.poll(() => c.title()).toBe('got')
         |                                      ^
      51 | })
      52 | test('tokens + contrast + theme emulate', async ({ page, context }) => {
      53 |   await serve(context, `<script>matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>{document.documentElement.dataset.theme=e.matches?'dark':'light'})</script>`)
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.mocktmp\mock.spec.ts:50:38

    Error Context: ..\test-results\mock-ignore-storage-events-seed-webkit\error-context.md

  1 failed
    [webkit] › mock.spec.ts:32:1 › ignore storage events + seed ────────────────────────────────────
  20 passed (
… [6 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/.mocktmp && cat > ev.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
test('storage event', async ({ page, context }) => {
  await context.route('http://localhost:4173/**', (r) => r.fulfill({ contentType: 'text/html', body: `<title>t</title><script>addEventListener('storage',(e)=>{document.title='got '+e.key})</script>` }))
  await page.goto('./')
  const b = await context.newPage()
  await b.goto('./')
  await b.evaluate(() => localStorage.setItem('z', String(Math.random())))
  await expect.poll(() => page.title(), { timeout: 4000 }).toContain('got')
})
test('storage event via b click', async ({ page, context }) => {
  await context.route('http://localhost:4173/**', (r) => r.fulfill({ contentType: 'text/html', body: `<title>t</title><button onclick="localStorage.setItem('z',Date.now())">go</button><script>addEventListener('storage',(e)=>{document.title='got '+e.key})</script>` }))
  await page.goto('./')
  const b = await context.newPage()
  await b.goto('./')
  await b.bringToFront()
  await b.getByRole('button').click()
  await expect.poll(() => page.title(), { timeout: 4000 }).toContain('got')
})
EOF
npx playwright test -c playwright.config.ts ev.spec.ts 2>&1 | tail -30
```

  Result:
```
10 | test('storage event via b click', async ({ page, context }) => {
      11 |   await context.route('http://localhost:4173/**', (r) => r.fulfill({ contentType: 'text/html', body: `<title>t</title><button onclick="localStorage.setItem('z',Date.now())">go</button><script>addEventListener('storage',(e)=>{document.title='got '+e.key})</script>` }))
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.mocktmp\ev.spec.ts:8:60

    Error Context: ..\test-results\ev-storage-event-webkit\error-context.md

  2) [webkit] › ev.spec.ts:10:1 › storage event via b click ────────────────────────────────────────

    Error: expect(received).toContain(expected) // indexOf

    Expected substring: "got"
    Received string:    "t"

    Call Log:
    - Timeout 4000ms exceeded while waiting on the predicate

      15 |   await b.bringToFront()
      16 |   await b.getByRole('button').click()
    > 17 |   await expect.poll(() => page.title(), { timeout: 4000 }).toContain('got')
         |                                                            ^
      18 | })
      19 |
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.mocktmp\ev.spec.ts:17:60

    Error Context: ..\test-results\ev-storage-event-via-b-click-webkit\error-context.md

  2 failed
    [webkit] › ev.spec.ts:2:1 › storage event ──────────────────────────────────────────────────────
    [webkit] › ev.spec.ts:10:1 › storage event via b click ─────────────────────────────────────────
  4 passed (12.3s)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/.mocktmp && cat > ev.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
test('storage event real origin', async ({ page, context }) => {
  await page.addInitScript(() => { addEventListener('storage', (e) => { (window as unknown as {got: string}).got = 'got ' + e.key }) })
  await page.goto('./')
  const b = await context.newPage()
  await b.goto('./')
  await b.evaluate(() => localStorage.setItem('z', String(Math.random())))
  await expect.poll(() => page.evaluate(() => (window as unknown as {got?: string}).got), { timeout: 4000 }).toContain('got')
})
test('storage event, popup style', async ({ page }) => {
  await page.addInitScript(() => { addEventListener('storage', (e) => { (window as unknown as {got: string}).got = 'got ' + e.key }) })
  await page.goto('./')
  const [b] = await Promise.all([page.waitForEvent('popup'), page.evaluate(() => { window.open('/', '_blank') })])
  await b.waitForLoadState()
  await b.evaluate(() => localStorage.setItem('z', String(Math.random())))
  await expect.poll(() => page.evaluate(() => (window as unknown as {got?: string}).got), { timeout: 4000 }).toContain('got')
})
EOF
npx playwright test -c playwright.config.ts ev.spec.ts --project=webkit 2>&1 | tail -30
```

  Result:
```
x  1 [webkit] › ev.spec.ts:2:1 › storage event real origin (4.6s)
  ok 2 [webkit] › ev.spec.ts:10:1 › storage event, popup style (402ms)


  1) [webkit] › ev.spec.ts:2:1 › storage event real origin ─────────────────────────────────────────

    Error: expect(received).toContain(expected) // indexOf

    Matcher error: received value must not be null nor undefined

    Received has value: undefined

    Call Log:
    - Timeout 4000ms exceeded while waiting on the predicate

       6 |   await b.goto('./')
       7 |   await b.evaluate(() => localStorage.setItem('z', String(Math.random())))
    >  8 |   await expect.poll(() => page.evaluate(() => (window as unknown as {got?: string}).got), { timeout: 4000 }).toContain('got')
         |                                                                                                              ^
       9 | })
      10 | test('storage event, popup style', async ({ page }) => {
      11 |   await page.addInitScript(() => { addEventListener('storage', (e) => { (window as unknown as {got: string}).got = 'got ' + e.key }) })
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.mocktmp\ev.spec.ts:8:110

    Error Context: ..\test-results\ev-storage-event-real-origin-webkit\error-context.md

  1 failed
    [webkit] › ev.spec.ts:2:1 › storage event real origin ──────────────────────────────────────────
  1 passed (6.6s)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/.mocktmp && cat > ev.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
test('storage event, popup style', async ({ page }) => {
  await page.addInitScript(() => { addEventListener('storage', (e) => { (window as unknown as {got: string}).got = 'got ' + e.key }) })
  await page.goto('./')
  const [b] = await Promise.all([page.waitForEvent('popup'), page.evaluate(() => { window.open('./', '_blank') })])
  await b.waitForLoadState()
  await b.evaluate(() => localStorage.setItem('z', String(Math.random())))
  await expect.poll(() => page.evaluate(() => (window as unknown as {got?: string}).got), { timeout: 4000 }).toContain('got')
  await b.evaluate(() => localStorage.clear())
  await expect.poll(() => page.evaluate(() => (window as unknown as {got?: string}).got), { timeout: 4000 }).toBe('got null')
  // and the other direction
  await b.addInitScript(() => {})
  await page.evaluate(() => { (window as unknown as {got?: string}).got = '' })
  await b.evaluate(() => { (window as unknown as {n?: string}).n = ''; addEventListener('storage', (e) => { (window as unknown as {n: string}).n = 'n ' + e.key }) })
  await page.evaluate(() => localStorage.setItem('q', '1'))
  await expect.poll(() => b.evaluate(() => (window as unknown as {n?: string}).n), { timeout: 4000 }).toBe('n q')
})
EOF
npx playwright test -c playwright.config.ts ev.spec.ts 2>&1 | tail -30
```

  Result:
```
Running 3 tests using 3 workers

  ok 1 [chromium] › ev.spec.ts:2:1 › storage event, popup style (290ms)
  ok 3 [webkit] › ev.spec.ts:2:1 › storage event, popup style (619ms)
  ok 2 [firefox] › ev.spec.ts:2:1 › storage event, popup style (3.3s)

  3 passed (5.7s)
```

- **Bash**

```bash
cat >> e2e/fixtures.ts <<'EOF'

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
EOF
sed -i "s/const b = await page.context().newPage()/const b = await openSecondTab(page)/; /^    await b.goto('.\/')$/d" e2e/spec-rules.spec.ts
sed -i "s/^  zeroRateEntry,$/  openSecondTab,\n  zeroRateEntry,/" e2e/spec-rules.spec.ts
grep -n "openSecondTab\|b.goto" e2e/spec-rules.spec.ts
```

  Result:
```
42:  openSecondTab,
185:    const b = await openSecondTab(page)
215:    const b = await openSecondTab(page)
231:    const b = await openSecondTab(page)
253:    const b = await openSecondTab(page)
266:    const b = await openSecondTab(page)
278:    const b = await openSecondTab(page)
292:    const b = await openSecondTab(page)
```

- **Bash**

```bash
rm -rf .mocktmp && npx prettier --write e2e >/dev/null && npx eslint e2e --max-warnings 0 && npm run typecheck 2>&1 | tail -5; npx prettier --check docs/process e2e | tail -2; npm run trace 2>&1 | tail -40
```

  Result:
```
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

Checking formatting...
All matched files use Prettier code style!

> muhammad-arslan-calculator@0.0.0 trace
> node scripts/trace.mjs


Traceability: 3 roles, 11 jobs, 19 stories, 100 ACs, 20 test files

Story  Scope    Status           ACs  Tested 
S-1    v1       Not implemented  12   12/12  
S-2    v1       Not implemented  17   17/17  
S-3    v1       Not implemented  6    6/6    
S-4    v1       Not implemented  4    4/4    
S-5    v1       Not implemented  6    6/6    
S-6    v1       Not implemented  6    6/6    
S-7    v1       Not implemented  5    5/5    
S-8    v1       Not implemented  6    6/6    
S-9    v1       Not implemented  3    3/3    
S-10   v1       Not implemented  8    8/8    
S-11   v1       Not implemented  11   11/11  
S-12   v1       Not implemented  7    7/7    
S-13   v1       Not implemented  3    3/3    
S-14   Backlog  Not implemented  1    0/1    
S-15   Backlog  Not implemented  1    0/1    
S-16   Backlog  Not implemented  1    0/1    
S-17   Backlog  Not implemented  1    0/1    
S-18   Backlog  Not implemented  1    0/1    
S-19   Backlog  Not implemented  1    0/1    

trace: OK
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; (time npx playwright test --reporter=json > $S/all.json 2>$S/all.err) 2> $S/all.time; echo done
```

  Result:
```
Command running in background with ID: by56y07hu. Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\by56y07hu.output. You will be notified when it completes — do not poll that file or sleep while waiting. Read the file only if the user asks for progress, or if you need a line it prints before you can go on, such as a server's ready line or port.
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/e2e && for f in s*.spec.ts spec-rules.spec.ts; do echo "$f $(grep -c "^\s*test(\`\?'\?\[\|test(\`\[" $f)"; done; grep -c "\[AC-3.6\]" s03-totals.spec.ts
```

  Result:
```
s01-calculate.spec.ts 12
s02-validation.spec.ts 18
s03-totals.spec.ts 6
s04-stale.spec.ts 4
s05-mobile.spec.ts 8
s06-theme.spec.ts 8
s07-currency.spec.ts 5
s08-keyboard.spec.ts 10
s09-reset.spec.ts 3
s10-schedule.spec.ts 8
s11-history.spec.ts 14
s12-delete.spec.ts 8
s13-balance.spec.ts 4
spec-rules.spec.ts 25
spec-rules.spec.ts 25
1
```

- **Bash**

```bash
sleep 600; cat "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/all.time" 2>/dev/null
```

  Result (error):
```
<tool_use_error>Blocked: sleep 600 followed by: cat "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/all.time". To wait for a condition, use Monitor with an until-loop (e.g. `until <check>; do sleep 2; done`). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.</tool_use_error>
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; until [ -s $S/all.time ]; do sleep 5; done; cat $S/all.time
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: bikpgvkwc). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bikpgvkwc.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; until [ -s $S/all.time ]; do sleep 5; done; cat $S/all.time
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: b02o3g4p6). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\b02o3g4p6.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; until [ -s $S/all.time ]; do sleep 5; done; cat $S/all.time
```

  Result:
```
real	24m16.271s
user	0m0.167s
sys	0m0.106s
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; cat > $S/sum2.mjs <<'EOF'
import fs from 'node:fs'
const j = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
const rows = []
const walk = (s) => { for (const sp of s.specs ?? []) for (const t of sp.tests) { const r = t.results.at(-1); rows.push({ title: sp.title, project: t.projectName, status: r.status, err: (r.error?.message ?? '').replace(/\x1b\[[0-9;]*m/g,'').split('\n').slice(0,3).join(' | ').slice(0,200) }) } for (const c of s.suites ?? []) walk(c) }
for (const s of j.suites) walk(s)
for (const p of ['chromium','firefox','webkit']) { const c = {}; for (const r of rows.filter(r=>r.project===p)) c[r.status]=(c[r.status]||0)+1; console.log(p, c) }
for (const r of rows) if (r.status==='passed') console.log('PASS', r.project, r.title)
const kinds = {}
for (const r of rows) if (r.status!=='passed') { const k = r.err.replace(/Timeout \d+ms/,'T').slice(0,110); kinds[k]=(kinds[k]||0)+1 }
console.log(Object.entries(kinds).sort((a,b)=>b[1]-a[1]).slice(0,25))
// tests per story
const per = {}
for (const r of rows.filter(r=>r.project==='chromium')) { const m = r.title.match(/\[(AC-(\d+)\.\d+|SPEC)/); const k = m ? (m[2] ? 'S-'+m[2] : 'SPEC') : '?'; per[k]=(per[k]||0)+1 }
console.log(per)
EOF
node $S/sum2.mjs $S/all.json
```

  Result:
```
chromium { failed: 148, passed: 1 }
firefox { failed: 148, passed: 1 }
webkit { failed: 148, passed: 1 }
PASS chromium [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator
PASS firefox [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator
PASS webkit [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator
[
  [
    'TimeoutError: locator.fill: T exceeded. | Call log: |   - waiting for getByLabel(/^Loan amount \\((Rs|\\$)\\)$/)',
    284
  ],
  [
    "TimeoutError: locator.selectOption: T exceeded. | Call log: |   - waiting for getByLabel('Theme', { exact: tru",
    30
  ],
  [
    "Error: expect(locator).toBeVisible() failed |  | Locator: getByText('No saved calculations yet.', { exact: tru",
    21
  ],
  [
    "Error: expect(locator).toHaveCount(expected) failed |  | Locator:  getByRole('list', { name: 'Saved calculatio",
    20
  ],
  [
    "TimeoutError: locator.click: T exceeded. | Call log: |   - waiting for getByRole('button', { name: 'Calculate'",
    11
  ],
  [
    "TimeoutError: locator.evaluate: T exceeded. | Call log: |   - waiting for getByLabel('Currency', { exact: true",
    11
  ],
  [
    "Error: expect(locator).toBeVisible() failed |  | Locator: getByText('Enter your loan details and select Calcul",
    9
  ],
  [
    'Error: expect(locator).toHaveAttribute(expected) failed |  | Locator: getByLabel(/^Loan amount \\((Rs|\\$)\\)$/)',
    6
  ],
  [
    'Error: expect(locator).toHaveValue(expected) failed |  | Locator: getByLabel(/^Loan amount \\((Rs|\\$)\\)$/)',
    6
  ],
  [
    "Error: expect(locator).toBeVisible() failed |  | Locator: getByText('Saved calculations aren\\'t available in t",
    6
  ],
  [
    'TimeoutError: page.goto: T exceeded. | Call log: |   - navigating to "http://localhost:4173/", waiting until "',
    5
  ],
  [
    "TimeoutError: locator.selectOption: T exceeded. | Call log: |   - waiting for getByLabel('Currency', { exact: ",
    5
  ],
  [
    "TimeoutError: locator.evaluate: T exceeded. | Call log: |   - waiting for getByLabel('Tenure unit', { exact: t",
    3
  ],
  [
    "Error: expect(locator).toBeVisible() failed |  | Locator: getByRole('button', { name: 'Calculate', exact: true",
    3
  ],
  [
    'Error: expect(received).toBe(expected) // Object.is equality |  | Expected: "dark"',
    3
  ],
  [
    'Error: expect(received).toBe(expected) // Object.is equality |  | Expected: "light"',
    3
  ],
  [
    "TimeoutError: locator.eva
… [882 more characters not shown; see raw/]
```

- **Bash**

```bash
S="C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad"; node -e "
const j=JSON.parse(require('fs').readFileSync('$S/all.json','utf8'));
const w=s=>{for(const sp of s.specs??[])for(const t of sp.tests){const r=t.results.at(-1);const m=r.error?.message??'';if(/page.goto/.test(m))console.log(t.projectName,sp.title.slice(0,80))}for(const c of s.suites??[])w(c)};j.suites.forEach(w)"
```

  Result:
```
firefox [AC-1.2] 12 months gives the same payment as 1 year
firefox [AC-7.1] first visit defaults to PKR (Rs)
firefox [AC-7.3] the chosen currency survives a reload
firefox [AC-11.3] a calculation that shows errors saves nothing
firefox [SPEC-§9.3] if the focused entry is removed by another tab, focus moves to the h
```

- **Bash**

```bash
sed -i "s/    context.setDefaultTimeout(8_000)/    context.setDefaultTimeout(8_000)\n    page.setDefaultNavigationTimeout(30_000)/" e2e/fixtures.ts && npx prettier --write e2e >/dev/null && npx eslint e2e --max-warnings 0 && npm run typecheck 2>&1 | tail -3 && npx playwright test s09-reset --project=firefox --reporter=line 2>&1 | tail -5; npm test 2>&1 | tail -8
```

  Result:
```
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b


  3 failed
    [firefox] › e2e\s09-reset.spec.ts:44:3 › S-9 Reset › [AC-9.1] Reset empties the form from the results, stale and error states 
    [firefox] › e2e\s09-reset.spec.ts:71:3 › S-9 Reset › [AC-9.2] Reset leaves currency, theme and saved calculations alone 
    [firefox] › e2e\s09-reset.spec.ts:91:3 › S-9 Reset › [AC-9.3] Reset on an empty form changes nothing and shows no error 


 Test Files  6 failed | 1 passed (7)
      Tests  292 failed | 2 passed (294)
   Start at  23:25:47
   Duration  3.04s (transform 48%, import 43%, tests 6%, worker 2%)

JSON report written to C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/reports/vitest.json
[This command modified 1 file you've previously read: e2e\fixtures.ts. Call Read before editing.]
```

- **SubagentHandback**

```json
{
 "message": "Phase 3 UI/E2E report. All 149 Playwright tests are written, and 148 of 149 fail (expected), in each of chromium, firefox and webkit. The one pass is the document.title check, explained below. Lint, prettier and typecheck are clean on my files, and `npm run trace` shows every v1 AC tested.\n\n## Files (all under C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator)\n- e2e/fixtures.ts\n- e2e/s01-calculate.spec.ts, s02-validation.spec.ts, s03-totals.spec.ts, s04-stale.spec.ts, s05-mobile.spec.ts, s06-theme.spec.ts, s07-currency.spec.ts, s08-keyboard.spec.ts, s09-reset.spec.ts, s10-schedule.spec.ts, s11-history.spec.ts, s12-delete.spec.ts, s13-balance.spec.ts\n- e2e/spec-rules.spec.ts\n- docs/process/manual-test-checklist.md (94 checkbox lines, one per v1 AC)\n- I wrote no Vitest component tests (`src/ui/**/*.test.tsx`). Everything UI-observable is in E2E, as you preferred. I touched nothing under `src/`, `test/` or the configs.\n\n## Tests per story (per browser, counted from the Playwright run)\n| Story | Tests | Story | Tests |\n|---|---|---|---|\n| S-1 | 12 | S-8 | 11 |\n| S-2 | 18 | S-9 | 3 |\n| S-3 | 11 | S-10 | 8 |\n| S-4 | 4 | S-11 | 16 |\n| S-5 | 8 | S-12 | 8 |\n| S-6 | 9 | S-13 | 10 |\n| S-7 | 5 | SPEC rules | 26 |\n\nThat is 149 per browser, 447 across the three.\n\nThe fixtures cover each point in your brief:\n- **Error listener:** a global listener on every page in the context fails the test on `pageerror` or console error.\n- **Storage blocking:**
… [7,823 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

