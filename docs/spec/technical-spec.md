# Technical Specification: Loan EMI Calculator (v1)

**Status:** Draft for human approval (Gate G1)
**Sources of truth, in priority order:**
1. `docs/user-stories.md` (acceptance criteria)
2. this document
3. `docs/spec/decision-log.md`

If two sources conflict, **stop and ask the human**. Never resolve a conflict silently.

---

## 1. Purpose and scope

A single-page, client-only web app that calculates the equal monthly instalment (EMI) of a reducing-balance loan, its total interest and total payable, and a month-by-month schedule. It also supports PKR/USD display, light/dark themes, history saved in the browser, full keyboard use and phone layouts.

**There is no backend.** The app makes no network requests after the static files load: no API calls, analytics, cookies or fonts from third-party servers.

**v1 scope:** stories S-1 to S-13. **Not in v1:** S-14 to S-19, and everything in §16.

## 2. Technology stack

| Concern | Choice | Notes |
|---|---|---|
| Runtime for tooling | Node.js 24 LTS | Pinned in `.nvmrc` and `package.json` `engines`. Verify it is still an LTS line at scaffold time; if not, use the current Active LTS and record it in the decision log. |
| Package manager | npm | `package-lock.json` committed; CI uses `npm ci`. |
| UI | React (latest stable) + TypeScript (latest stable, `strict: true`) | Function components and hooks only. |
| Build/dev server | Vite (latest stable) | Static output in `dist/`. |
| Decimal maths | `decimal.js` | **All money and rate arithmetic.** JS `number` must never hold a money value or be used in a calculation. |
| Unit/component tests | Vitest + @testing-library/react + @testing-library/user-event + jsdom | |
| Property tests | `fast-check` | For invariants in §5.4. |
| End-to-end tests | `@playwright/test` | Chromium, Firefox, WebKit. Edge is Chromium-based and is covered by the Chromium project; Safari by WebKit. |
| Lint/format | ESLint (flat config, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y) + Prettier | |
| Styling | Plain CSS with custom properties (one global stylesheet plus per-component CSS files) | No CSS framework, no UI library. |
| State | React `useReducer` + context | No state library, no router. |
| CI/CD | GitHub Actions | |
| Hosting | GitHub Pages | Free; static. |

Use exact versions installed at scaffold time (no `^latest` tags in docs), and list them in the README. **Do not add any dependency not listed here without asking the human.**

## 3. Architecture

### 3.1 Layers

```
src/
  domain/          Pure TypeScript. No React, no DOM, no storage. 100% unit-tested.
    money.ts         Decimal setup, round2(), money/number formatting
    parse.ts         Raw string → normalised value (trim, commas, %)
    validate.ts      Field rules → typed result or error codes
    loan.ts          EMI + schedule algorithm (§5)
    format.ts        Rate, tenure and date text for history entries
    types.ts
  storage/         Browser storage adapters. Never throw to callers.
    safeStorage.ts   Availability check plus get/set/remove wrapped in try/catch
    history.ts       Load/validate/save history (§9)
    settings.ts      Currency + theme preferences (§9)
  ui/
    App.tsx, appReducer.ts, AppContext.tsx
    components/      Header, ThemeSelect, LoanForm, CurrencySelect, ResultsPanel,
                     ResultsSummary, RoundingNote, ScheduleTable, HistoryPanel,
                     HistoryEntry, ConfirmDialog, ErrorBoundary
    copy.ts          Every user-visible string (§7). Components never hard-code text.
    theme.css, app.css
  main.tsx
e2e/               Playwright specs
scripts/trace.mjs  Traceability checker (§12.5)
```

**Rule:** `domain/` must not import from `ui/` or `storage/`, and `storage/` must not import from `ui/`. Enforce this with an ESLint `no-restricted-imports` rule.

### 3.2 Application state (reducer)

```
inputs:   { amount: string, rate: string, tenure: string, unit: 'years' | 'months' }   // raw text as typed
errors:   Partial<Record<'amount' | 'rate' | 'tenure', ErrorCode>>
results:  { status: 'idle' }
        | { status: 'shown', loan: CalculatedLoan }
        | { status: 'stale' }
settings: { currency: 'PKR' | 'USD', theme: 'system' | 'light' | 'dark' }
history:  { available: boolean, entries: HistoryEntry[] }
```

Transitions:

| Event | Effect |
|---|---|
| Edit any input or change unit | Update `inputs`. Clear **only that field's** error. If `results.status === 'shown'`, set it to `stale`. |
| Calculate with any invalid field | Set all field errors, set `results` to `idle` (removes old results), focus the first invalid field in order amount → rate → tenure. |
| Calculate with all fields valid | Clear errors, compute, set `results` to `shown`, add a history entry (§9.3). |
| Reset | Empty inputs, unit = `years`, clear errors, set `results` to `idle`, focus **Loan amount**. Settings and history are untouched. |
| Change currency or theme | Update settings and persist. Results status is unchanged. |
| Restore entry | Set inputs from the entry (canonical strings, §9.2) and currency from the entry, recompute (do not trust stored figures), set `results` to `shown`. No new history entry. |

## 4. Input parsing and validation

Inputs are `<input type="text">`, **not** `type="number"`. `type="number"` behaves differently across browsers: Firefox accepts letters, `value` becomes `""` for invalid text so errors can't be diagnosed, and the mouse wheel changes values. Add `inputmode` per AC-5.4 and `autocomplete="off"`.

### 4.1 Normalisation (before validation)

| Field | Steps |
|---|---|
| Loan amount | Trim whitespace, then remove **all** `,` characters (accepts `1,000,000` and lakh-style `10,00,000`). |
| Interest rate | Trim, remove **one** trailing `%`, trim again. |
| Loan tenure | Trim. |

### 4.2 Rules (checked in this order, stopping at the first failure per field)

Number pattern: `^-?(\d+(\.\d*)?|\.\d+)$`. It rejects `1e6`, `+5`, `1.2.3`, `abc` and the empty string. "Decimal places" means the count of digits after `.`, so `5.` has 0. **All comparisons use `Decimal`**, never `Number`, so 40-digit inputs compare correctly.

| Field | 1. Empty | 2. Format | 3. Precision | 4. Range |
|---|---|---|---|---|
| Loan amount | `AMOUNT_REQUIRED` | not a number → `AMOUNT_NAN` | more than 2 dp → `AMOUNT_DECIMALS` | outside 1,000 to 1,000,000,000 inclusive → `AMOUNT_RANGE` |
| Interest rate | `RATE_REQUIRED` | → `RATE_NAN` | more than 2 dp → `RATE_DECIMALS` | outside 0 to 50 inclusive → `RATE_RANGE` |
| Loan tenure | `TENURE_REQUIRED` | not `^-?\d+$` → `TENURE_WHOLE` (also covers `abc` and `2.5`) | n/a | Years: outside 1 to 40 → `TENURE_RANGE_YEARS`; Months: outside 1 to 480 → `TENURE_RANGE_MONTHS` |

A negative number passes the format check and fails on range, so `-500` gets the range message (AC-2.4).

### 4.3 Derived values

- `P` = loan amount as `Decimal`
- `n` = tenure × 12 when the unit is years, otherwise the tenure (an integer from 1 to 480)
- `annualRate` = `Decimal`
- `r = annualRate / 1200` (monthly rate as a fraction, kept exact)

## 5. Calculation algorithm (normative)

Configure `Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP })`. `round2(x)` = `x.toDecimalPlaces(2, Decimal.ROUND_HALF_UP)`.

### 5.1 EMI function

```
EMI(B, r, m) = B / m                                if r = 0
             = B × r × (1 + r)^m / ((1 + r)^m − 1)  otherwise
```

### 5.2 Schedule (re-amortising, cent-accurate)

```
balance ← P
for k = 1 … n:
    interest_k ← round2(balance × r)
    if k < n:
        payment_k   ← round2(EMI(balance, r, n − k + 1))
        principal_k ← payment_k − interest_k
    else:
        principal_k ← balance
        payment_k   ← principal_k + interest_k
    balance ← balance − principal_k
    row_k ← { month: k, payment_k, interest_k, principal_k, balance }
```

Outputs:
- **Monthly payment** (headline) = `payment_1` (the standard EMI rounded to 2 dp)
- **Total interest** = Σ interest_k
- **Total amount payable** = Σ payment_k
- **Rounding note shown** = true if any payment_k ≠ payment_1

### 5.3 Why this method (do not "simplify" it)

The common textbook method fixes the payment at `round2(EMI)` for every month and lets the last month absorb the difference. But the half-cent rounding error compounds at the loan rate. Within our accepted input range this produces wrong-looking results, for example:
- Rs 10,000 at 36% for 359 months: the loan is paid off **7 months early** (month 352).
- Rs 10,000.82 at 30% for 360 months: the fixed instalment is 250.05 but the final instalment is **1,767.73**.

Re-computing the instalment from the remaining balance each month stops the error compounding. We verified over the whole input range (exact decimal simulation, about 1,700 cases including every boundary corner) that it ends at exactly 0.00, never ends early, never produces a negative principal, and that **every payment is within 0.01 of the headline payment**. Every row stays verifiable by hand: interest = opening balance × r, rounded, and principal = payment − interest.

### 5.4 Invariants (property-tested with fast-check over the full valid input domain)

For every valid (P, rate, n):
1. Number of rows = n.
2. For every row: `payment = interest + principal` exactly.
3. For every row: `interest = round2(opening × r)`, where opening is P for row 1 and the previous row's balance after that.
4. For every row: `0 ≤ principal ≤ opening` and `balance ≥ 0`.
5. Final balance = 0.00 exactly. Σ principal = P exactly.
6. For every row: `|payment − payment_1| ≤ 0.01`.
7. Total amount payable = P + total interest, exactly.
8. Results are identical when the same tenure is entered as years or as the equivalent number of months.

If a property test finds a counterexample: **stop, record it, and report it to the human.** Do not change the algorithm or loosen an invariant without approval.

### 5.5 Reference values (must be reproduced exactly)

Use the reference loans table in `docs/user-stories.md`, plus these schedule rows:
- L-A row 1: `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`
- L-A row 6 balance: `514,921.05`
- L-A row 12: `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`
- L-A payments equal 88,848.78 in rows 9, 10 and 12, and 88,848.79 in all other rows
- L-Z3 rows: `333.33/0.00/333.33/666.67`, `333.34/0.00/333.34/333.33`, `333.33/0.00/333.33/0.00`

## 6. Formatting

Custom, deterministic formatters. **Do not use `Intl.NumberFormat` or `toLocaleString` for money or dates**, because their output differs between browsers and OS locales.

| What | Rule | Examples |
|---|---|---|
| Money (summary, history) | symbol + integer part grouped in 3s with `,` + `.` + exactly 2 decimals. PKR symbol `Rs ` (with a trailing space); USD symbol `$` (no space). | `Rs 88,848.79`, `$1,000,000.00`, `Rs 0.00`, `Rs 20,000,000,061.79` |
| Money (schedule cells) | Same, without the symbol | `921,151.21` |
| Rate (history) | Normalised decimal, no trailing zeros, then `%` | `12%`, `21.5%`, `0.01%`, `0%` |
| Tenure (history) | Unit as entered: `1 year`, `N years`, `1 month`, `N months` | `5 years`, `12 months` |
| Canonical input (restore) | Amount and rate as a normalised decimal without grouping or trailing zeros; tenure as an integer | `2500000`, `18`, `1500.5` |
| Date-time (history) | Local time `D Mon YYYY, HH:mm`, 24-hour clock, English 3-letter months | `17 Oct 2026, 20:45`, `5 Jan 2027, 09:05` |

## 7. Copy deck (all user-visible text; keep in `ui/copy.ts`)

| Key | Text |
|---|---|
| app.title | `Loan EMI Calculator` |
| app.tagline | `Work out the monthly payment, total cost and repayment schedule of a loan.` |
| theme.label | `Theme` (options `System`, `Light`, `Dark`) |
| currency.label | `Currency` (options `PKR (Rs)`, `USD ($)`) |
| currency.note | `Changing currency changes the symbol only. Amounts are not converted.` |
| field.amount | `Loan amount (Rs)` / `Loan amount ($)` |
| field.rate | `Annual interest rate (%)` |
| field.tenure | `Loan tenure` |
| field.unit | `Tenure unit` (options `Years`, `Months`) |
| btn.calculate | `Calculate` |
| btn.reset | `Reset` |
| results.idle | `Enter your loan details and select Calculate.` |
| results.stale | `Your inputs have changed. Select Calculate to see updated results.` |
| summary.monthly | `Monthly payment` |
| summary.interest | `Total interest` |
| summary.total | `Total amount payable` |
| note.rounding | `Some payments differ by 0.01 because amounts are rounded to 2 decimal places.` |
| schedule.title | `Repayment schedule` |
| schedule.cols | `Month`, `Payment (Rs)`, `Interest (Rs)`, `Principal (Rs)`, `Balance (Rs)` (`($)` for USD) |
| history.title | `Saved calculations` |
| history.empty | `No saved calculations yet.` |
| history.unavailable | `Saved calculations aren't available in this browser. Calculations still work.` |
| history.entry.line1 | `{amount} at {rate} for {tenure}` |
| history.entry.line2 | `{monthly} per month` |
| history.restore | `Restore` (accessible name: `Restore calculation from {datetime}`) |
| history.delete | `Delete` (accessible name: `Delete calculation from {datetime}`) |
| history.clearAll | `Clear all` |
| dialog.clear.text | `Clear all saved calculations? This can't be undone.` |
| dialog.cancel / dialog.confirm | `Cancel` / `Clear` |
| err.AMOUNT_REQUIRED | `Enter a loan amount.` |
| err.AMOUNT_NAN | `Loan amount must be a number.` |
| err.AMOUNT_DECIMALS | `Loan amount can have at most 2 decimal places.` |
| err.AMOUNT_RANGE | `Loan amount must be between 1,000 and 1,000,000,000.` |
| err.RATE_REQUIRED | `Enter an interest rate.` |
| err.RATE_NAN | `Interest rate must be a number.` |
| err.RATE_DECIMALS | `Interest rate can have at most 2 decimal places.` |
| err.RATE_RANGE | `Interest rate must be between 0 and 50%.` |
| err.TENURE_REQUIRED | `Enter a loan tenure.` |
| err.TENURE_WHOLE | `Loan tenure must be a whole number.` |
| err.TENURE_RANGE_YEARS | `Loan tenure must be between 1 and 40 years.` |
| err.TENURE_RANGE_MONTHS | `Loan tenure must be between 1 and 480 months.` |
| fatal | `Something went wrong. Please reload the page.` |

The apostrophes in `can't` and `aren't` are the ASCII `'` character.

## 8. UI behaviour

### 8.1 Layout (DOM order = visual order = tab order)

1. **Header:** title, tagline, **Theme** select (right-aligned on wide screens).
2. **Form card:** **Currency** select and its note, **Loan amount**, **Annual interest rate**, **Loan tenure** + **Tenure unit**, then **Calculate** (primary) and **Reset** (secondary). It is a `<form noValidate>`, so Enter submits.
3. **Results card:** idle text, or the stale message, or the summary (Monthly payment shown prominently, Total interest, Total amount payable), the rounding note when applicable, and the **Repayment schedule**.
4. **Saved calculations card:** heading (`tabindex="-1"` so focus can move there), the list or the empty/unavailable text, and **Clear all**.

Breakpoints: **≥ 769 px**: the form and results cards side by side (form roughly 40%, results roughly 60%) with Saved calculations full-width below; max content width 1200 px. **≤ 768 px**: a single column in DOM order. Never allow horizontal page scroll at any width ≥ 360 px. Long amounts wrap (`overflow-wrap: anywhere`) rather than overflow.

### 8.2 Schedule table

A semantic `<table>` with `<thead>` and `<th scope="col">`, inside a wrapper with `role="region"`, `aria-label="Repayment schedule"`, `tabindex="0"`, `overflow: auto` and `max-height: min(60vh, 480px)`. The header row is sticky. Number cells are right-aligned with `font-variant-numeric: tabular-nums`. On narrow screens the wrapper scrolls horizontally if needed; the page does not.

### 8.3 Errors and focus

- Each error renders in an element with an id. The input gets `aria-invalid="true"` and `aria-describedby` pointing to it, and the error text sits in an `aria-live="polite"` container.
- On a failed Calculate, focus moves to the first invalid field. On Reset, focus moves to **Loan amount**. On Delete, focus moves per AC-12.1. On Restore, focus stays on the Restore button.
- **Confirm dialog:** native `<dialog>` opened with `showModal()`, with `autofocus` on **Cancel**. Escape (the `cancel` event) closes it without action and returns focus to **Clear all**.

### 8.4 Theme

Resolved theme = the user's choice, or `prefers-color-scheme` when set to `system`. Apply it as `data-theme="light|dark"` on `<html>`. A tiny inline script in `index.html` applies the saved theme before first paint (wrapped in try/catch) so there is no flash of the wrong theme. Listen for `matchMedia('(prefers-color-scheme: dark)')` changes while `system` is selected.

Starting tokens (tests must prove ≥ 4.5:1 for text pairs):

| Token | Light | Dark |
|---|---|---|
| --bg | #FFFFFF | #0F141B |
| --surface | #F5F7FA | #18202B |
| --text | #1A1F2B | #E7ECF3 |
| --text-muted | #4A5568 | #A9B4C2 |
| --primary (button bg) / --on-primary | #1D4ED8 / #FFFFFF | #7AA2FF / #0F141B |
| --error | #B42318 | #FF8A80 |
| --border | #CBD2DC | #2E3A4A |
| --focus (2px outline, 2px offset) | #1D4ED8 | #7AA2FF |

Tap targets are at least 44 × 44 px. Body font is the system font stack (no web-font downloads).

## 9. Persistence

### 9.1 Safe storage

`safeStorage` checks availability once at start-up (set and remove a probe key inside try/catch). Every read and write is wrapped. Failures return `{ ok: false }` and are never thrown to the UI. If storage is unavailable: settings work in memory for the visit (AC-6.6), and history shows `history.unavailable` (AC-11.9).

### 9.2 Keys and schemas (version 1)

- `emi-calc.v1.settings` → `{ "currency": "PKR" | "USD", "theme": "system" | "light" | "dark" }`. Defaults: `PKR`, `system`.
- `emi-calc.v1.history` → array (newest first, at most 20) of:

```json
{
  "id": "string (crypto.randomUUID, or a timestamp-plus-counter fallback)",
  "createdAt": "ISO-8601 string",
  "currency": "PKR",
  "input": { "amount": "1000000", "rate": "12", "tenure": 1, "unit": "years" },
  "monthlyPayment": "88848.79"
}
```

Only these fields are stored, never the schedule. On load, validate each element with a type guard. **If the value is not valid JSON or not an array, treat the history as empty.** Invalid elements are dropped. Nothing throws (AC-11.10).

### 9.3 Saving rules

- Save only after a successful calculation.
- Skip the save if the newest entry has the same canonical `input` **and** `currency` (AC-11.5).
- Insert at index 0 and truncate to 20 (AC-11.6).
- If the write fails (for example, quota exceeded), switch to the unavailable state for the rest of the visit.
- **Clear all** removes the key entirely (AC-12.4).

## 10. Error handling

- No error may reach the user as a blank screen. Wrap `<App>` in an `ErrorBoundary` that renders the `fatal` message.
- The domain layer returns typed results for invalid input and never throws on user input.
- E2E tests attach `page.on('pageerror')` and `page.on('console', type === 'error')` listeners **globally** (via a fixture) and fail if either fires (AC-2.16).

## 11. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-1 | Works in the current stable Chrome, Edge, Firefox and Safari (CI runs Chromium, Firefox and WebKit). |
| NFR-2 | A fresh clone runs with `npm ci && npm run dev` on Node 24. No accounts, keys or services. |
| NFR-3 | No network requests after initial load (asserted in one E2E test via request interception). |
| NFR-4 | Calculate-to-rendered under 1 s for L-MAX on CI (AC-10.8). |
| NFR-5 | Production JS bundle under 150 KB gzipped (checked in `verify`). |
| NFR-6 | No `any` types, no `@ts-ignore`, and no ESLint warnings in committed code. |
| NFR-7 | Data stays in the browser. No cookies. |

## 12. Testing strategy

### 12.1 Layers

| Layer | Tool | Covers |
|---|---|---|
| Domain unit | Vitest | parse, validate (every message and boundary), EMI, schedule, formatting. All reference values. |
| Property | Vitest + fast-check | Invariants in §5.4 (at least 1,000 runs each, fixed seed recorded in test output). |
| Component | Vitest + Testing Library | Reducer transitions, focus rules, stale state, history panel states, storage-failure states (mocked). |
| E2E | Playwright (Chromium, Firefox, WebKit) | Every UI-observable AC, run against `vite preview` of the production build. Viewports set per test (360×740, 768×1024, 1280×800). Dark mode via `colorScheme`. Time fixed via Playwright's clock API (AC-11.2). |
| Smoke (deployed) | Playwright, tag `@smoke` | AC-1.1, AC-2.1, AC-7.2 and AC-11.2 against the live GitHub Pages URL. |

### 12.2 Naming

Every test that proves an acceptance criterion has a title starting `[AC-x.y]`. One test may prove several criteria (`[AC-3.1][AC-10.2] ...`). Tests that prove spec rules only use `[SPEC-§n]`.

### 12.3 Test independence

- Tests must not depend on order.
- E2E tests start from a clean `localStorage` unless the test is about persistence.
- To simulate blocked storage, stub `Storage.prototype` methods to throw (`addInitScript`).

### 12.4 Tests are the contract

After Gate G3 (tests approved), the developer must not change test files. If a test looks wrong, stop and raise it with the human, who decides. The reviewer checks `git log -p -- e2e/ 'src/**/*.test.*'` for changes made after G3.

### 12.5 Traceability script (`npm run trace`)

`scripts/trace.mjs` (Node, no dependencies):
1. Parses `app-roles.md` (R-ids), `jobs-to-be-done.md` (J-ids and their role) and `user-stories.md` (S-ids with role, job, scope and status, plus AC-ids).
2. Fails if a story references an unknown role or job, a job references an unknown role, or a job has no story.
3. Scans `src/**/*.test.ts(x)` and `e2e/**/*.spec.ts` for `[AC-x.y]` tags. It fails if any **v1** AC has no test or if a test references an unknown AC. It warns if a Backlog AC has a test.
4. With `--results`, it reads `reports/vitest.json` and `reports/playwright.json` (JSON reporters) and fails if any story marked `Implemented` has an AC whose tests did not all pass in all three browsers.
5. Prints a table: story, ACs, tests, pass/fail.

## 13. npm scripts

| Script | Does |
|---|---|
| `dev` | Vite dev server |
| `build` | `tsc -b && vite build` |
| `preview` | Serve `dist/` on port 4173 |
| `lint` / `format:check` / `typecheck` | ESLint / Prettier check / `tsc --noEmit` |
| `test` | Vitest run, writes `reports/vitest.json` |
| `test:e2e` | Playwright (builds and serves via `webServer`), writes `reports/playwright.json` |
| `trace` | §12.5 |
| `size` | Fails if the gzipped JS exceeds 150 KB |
| **`verify`** | `lint && format:check && typecheck && test && build && size && test:e2e && trace`. **This is the loop's exit condition.** |

## 14. CI/CD and deployment

- `.github/workflows/ci.yml`: on push and pull request, run Node from `.nvmrc`, `npm ci`, `npx playwright install --with-deps`, then `npm run verify`. Upload the reports as artifacts.
- `.github/workflows/deploy.yml`: on push to `main`, after `verify` passes, build with `BASE_PATH=/<repo-name>/`, then `actions/upload-pages-artifact` and `actions/deploy-pages`. A follow-up job runs the `@smoke` tests against `https://<user>.github.io/<repo-name>/`.
- `vite.config.ts`: `base: process.env.BASE_PATH ?? '/'`, so local dev and preview use `/`.
- Repository Settings → Pages → Source: **GitHub Actions** (a manual step for the human, listed in the README).

## 15. Definition of done (per story)

1. Every AC has at least one `[AC-x.y]` test, and all pass in Chromium, Firefox and WebKit.
2. `npm run verify` exits 0.
3. The reviewer subagent reports no blocking findings for the story.
4. The human has checked each AC by hand in the running app (checklist in `docs/process/loop-plan.md`).
5. Only then is the story's status changed to `Implemented`, by the human or with their explicit approval.

## 16. Out of scope (v1), stated as assumptions in the README

- Payment frequencies other than monthly; flat-rate loans; variable rates.
- Fees, insurance, taxes, processing charges and grace periods.
- Calendar dates for payments (rows are numbered by month).
- Currency conversion (the symbol only changes).
- Accounts, sync across devices, server storage.
- Languages other than English; right-to-left layouts.
- Printing/exporting, copying, comparing offers, prepayments, yearly summaries (backlog stories S-14 to S-19).
- Offline/PWA installation.
