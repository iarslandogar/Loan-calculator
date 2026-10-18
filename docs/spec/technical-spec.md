# Technical Specification: Loan EMI Calculator (v1)

**Status:** Approved at Gate G1 (2026-10-17), including the G1 amendments (decision log D-25 to D-40)
**Sources of truth, in priority order:**
1. `docs/user-stories.md` (acceptance criteria)
2. this document
3. `docs/spec/decision-log.md`

If two sources conflict, **stop and ask the human**. Never resolve a conflict silently.

---

## 1. Purpose and scope

A single-page, client-only web app that calculates the equal monthly instalment (EMI) of a reducing-balance loan, its total interest and total payable, and a month-by-month schedule. It also supports PKR/USD display, light/dark themes, history saved in the browser, full keyboard use and phone layouts.

**There is no backend.** The app makes no network requests after the static files load: no API calls, analytics, cookies or fonts from third-party servers.

**v1 scope:** stories S-1 to S-13, plus S-19 to S-22 (the visuals, D-65). **Not in v1:** S-14 to S-18, and everything in §16.

## 2. Technology stack

| Concern | Choice | Notes |
|---|---|---|
| Runtime for tooling | Node.js 24 LTS | Pinned in `.nvmrc` and `package.json` `engines`. Verify it is still an LTS line at scaffold time; if not, use the current Active LTS and record it in the decision log. Checked 2026-10-17: Node 24 is still an LTS line (24.16.0 installed). |
| Package manager | npm | `package-lock.json` committed; CI uses `npm ci`. |
| UI | React (latest stable) + TypeScript (latest stable, `strict: true`) | Function components and hooks only. |
| Build/dev server | Vite (latest stable) | Static output in `dist/`. |
| Decimal maths | `decimal.js` | **All money and rate arithmetic.** JS `number` must never hold a money value or be used in a calculation. |
| Unit/component tests | Vitest + @testing-library/react + @testing-library/user-event + jsdom | `@testing-library/dom` is installed as the required peer of `@testing-library/react` (D-42). |
| Property tests | `fast-check` | For invariants in §5.4. |
| End-to-end tests | `@playwright/test` | Chromium, Firefox, WebKit. Edge is Chromium-based and is covered by the Chromium project; Safari by WebKit. |
| Lint/format | ESLint (flat config, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y) + Prettier | |
| Pre-approved tooling (D-17) | `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `@types/node`, `@eslint/js`, `globals`, `eslint-config-prettier` | May be added without asking. `@testing-library/jest-dom` is **not** used; tests use plain assertions. |
| Styling | Plain CSS with custom properties (one global stylesheet plus per-component CSS files) | No CSS framework, no UI library. |
| State | React `useReducer` + context | No state library, no router. |
| CI/CD | GitHub Actions | |
| Hosting | GitHub Pages | Free; static. |

Use exact versions installed at scaffold time (no `^latest` tags in docs), and list them in the README. **Do not add any dependency not listed here without asking the human.**

## 3. Architecture

### 3.1 Layers

```
src/
  domain/          Pure TypeScript. No React, no DOM, no storage. Every export unit-tested.
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

**Rule:** `domain/` must not import from `ui/` or `storage/`, and `storage/` must not import from `ui/`. Enforce this with an ESLint `no-restricted-imports` rule. The same rule forbids importing `decimal.js` anywhere except `src/domain/money.ts`.

### 3.1.1 Domain public API (D-16; frozen with the tests at Gate G3)

Domain tests call **only** these exports. UI and storage behaviour is tested only through the rendered `<App/>` (component tests) and E2E, so reducer and storage internals stay free to change. In Phase 2 the developer writes `types.ts` and the configured `Decimal` in full, and every other function below with this exact signature and the body `throw new Error('NOT_IMPLEMENTED')`, so that Phase 3 tests fail for the right reason.

```ts
// types.ts
type Unit = 'years' | 'months'
type Currency = 'PKR' | 'USD'
type Field = 'amount' | 'rate' | 'tenure'
type ErrorCode =
  | 'AMOUNT_REQUIRED' | 'AMOUNT_NAN' | 'AMOUNT_DECIMALS' | 'AMOUNT_RANGE'
  | 'RATE_REQUIRED' | 'RATE_NAN' | 'RATE_DECIMALS' | 'RATE_RANGE'
  | 'TENURE_REQUIRED' | 'TENURE_WHOLE' | 'TENURE_RANGE_YEARS' | 'TENURE_RANGE_MONTHS'
interface RawInputs { amount: string; rate: string; tenure: string; unit: Unit }
interface LoanInput { amount: Decimal; annualRate: Decimal; tenure: number; unit: Unit; months: number }
  // months = unit === 'years' ? tenure * 12 : tenure. Tests obtain a LoanInput only via validateInputs.
interface CanonicalInput { amount: string; rate: string; tenure: number; unit: Unit }
type ValidationResult =
  | { ok: true; value: LoanInput }
  | { ok: false; errors: Partial<Record<Field, ErrorCode>> }
interface ScheduleRow { month: number; payment: Decimal; interest: Decimal; principal: Decimal; balance: Decimal }
interface CalculatedLoan {
  input: LoanInput; monthlyPayment: Decimal; totalInterest: Decimal; totalPayable: Decimal
  showRoundingNote: boolean; rows: ScheduleRow[]
}

// money.ts
export const Decimal = DecimalJs.clone({ precision: 40, rounding: DecimalJs.ROUND_HALF_UP })
round2(x: Decimal): Decimal
formatMoney(x: Decimal, currency: Currency): string   // "Rs 88,848.79", "$88,848.79"
formatAmount(x: Decimal): string                        // "921,151.21" (no symbol)

// parse.ts
normaliseAmount(raw: string): string
normaliseRate(raw: string): string
normaliseTenure(raw: string): string

// validate.ts
validateInputs(raw: RawInputs): ValidationResult        // never throws

// loan.ts
emi(balance: Decimal, monthlyRate: Decimal, months: number): Decimal   // §5.1, unrounded
calculateLoan(input: LoanInput): CalculatedLoan                        // §5.2

// summary.ts (D-65)
costSplit(loan: CalculatedLoan): { interestPercent: Decimal; loanPercent: Decimal }
  // interestPercent = 100 x totalInterest / totalPayable, half-up to 1 dp; loanPercent = 100 - interestPercent
interestShare(payment: Decimal, interest: Decimal): Decimal          // 100 x interest / payment, half-up to 1 dp
yearlySummary(loan: CalculatedLoan): YearRow[]
  // YearRow = { year: number; months: number; interest: Decimal; principal: Decimal; balance: Decimal }
  // groups of 12 rows (the last group shorter if needed); exact sums; balance after the group's last month

// format.ts
formatRate(rate: Decimal): string                       // "12%", "21.5%"
formatTenure(tenure: number, unit: Unit): string        // "1 year", "12 months"
formatDateTime(date: Date): string                      // "17 Oct 2026, 20:45" (local time)
formatPercent(x: Decimal): string                       // always 1 dp, half-up: "6.2%", "0.0%" (D-65)
toCanonical(input: LoanInput): CanonicalInput           // never exponent notation; -0 becomes 0
```

`tenure`, `months` and `month` are counts, not money, so they may be JS `number`s. For §5.4 invariant 8, compare `rows`, the three totals and `showRoundingNote`, not `input`.

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
| Edit any input or change unit | Update `inputs`. Clear **only that field's** error (changing the unit clears the tenure error). If `results.status === 'shown'`, set it to `stale`; `idle` stays `idle`. Editing a value back to its original text still leaves results `stale`. |
| Calculate with any invalid field | Set all field errors, set `results` to `idle` (removes old results), focus the first invalid field in order amount → rate → tenure. |
| Calculate with all fields valid | Clear errors, compute, set `results` to `shown`, add a history entry (§9.3). |
| Reset | Empty inputs, unit = `years`, clear errors, set `results` to `idle`, focus **Loan amount**. Settings and history are untouched. |
| Change currency or theme | Update settings and persist. Results status is unchanged. |
| Restore entry | Set inputs from the entry (canonical strings, §9.2), clear **all** field errors, and set the currency from the entry and **persist** it like any currency change. Recompute (do not trust stored figures) and set `results` to `shown`. No new history entry. (D-14) |

## 4. Input parsing and validation

Inputs are `<input type="text">`, **not** `type="number"`. `type="number"` behaves differently across browsers: Firefox accepts letters, `value` becomes `""` for invalid text so errors can't be diagnosed, and the mouse wheel changes values. Add `inputmode` per AC-5.4 and `autocomplete="off"`.

### 4.1 Normalisation (before validation)

| Field | Steps |
|---|---|
| Loan amount | Trim whitespace. If the value contains `,`, remove the commas **only if** the part before any `.` (after an optional leading `-`) matches western grouping `^\d{1,3}(,\d{3})+$` or lakh grouping `^\d{1,2}(,\d{2})*,\d{3}$`, and no `,` appears after the `.`. Otherwise leave the commas in, so the value fails the number pattern with `AMOUNT_NAN` (D-26). Accepts `1,000,000`, `10,00,000`, `1,00,000` and `1,000.50`; rejects `1,,000`, `1000,50`, `1,5`, `,1000` and `10,0000`. |
| Interest rate | Trim, remove **one** trailing `%`, trim again. |
| Loan tenure | Trim. |

### 4.2 Rules (checked in this order, stopping at the first failure per field)

Number pattern: `^-?(\d+(\.\d*)?|\.\d+)$`, where `\d` means the ASCII digits `0`–`9` only, so Arabic-Indic (`١٢`) and full-width (`１２`) digits are "not a number". It rejects `1e6`, `+5`, `1.2.3`, `abc` and the empty string. "Decimal places" means the count of digits after `.`, so `5.` has 0. **All comparisons use `Decimal`**, never `Number`, so 40-digit inputs compare correctly.

| Field | 1. Empty | 2. Format | 3. Precision | 4. Range |
|---|---|---|---|---|
| Loan amount | `AMOUNT_REQUIRED` | not a number → `AMOUNT_NAN` | more than 2 dp → `AMOUNT_DECIMALS` | outside 10 to 1,000,000,000,000,000 inclusive → `AMOUNT_RANGE` (D-54) |
| Interest rate | `RATE_REQUIRED` | → `RATE_NAN` | more than 2 dp → `RATE_DECIMALS` | outside 0 to 75 inclusive → `RATE_RANGE` (D-54) |
| Loan tenure | `TENURE_REQUIRED` | not `^-?\d+$` → `TENURE_WHOLE` (also covers `abc` and `2.5`) | n/a | Years: outside 1 to 100 → `TENURE_RANGE_YEARS`; Months: outside 1 to 1,200 → `TENURE_RANGE_MONTHS` (D-54) |

A negative number passes the format check and fails on range, so `-500` gets the range message (AC-2.4).

**Input table for `[SPEC-§4.2]` tests** (raw text → result; other fields valid):

| Field | Raw | Result |
|---|---|---|
| Amount | `10`, `10.00`, `1000`, `00012`, `1000000000000000` | valid |
| Amount | `1000.500` | `AMOUNT_DECIMALS` (trailing zeros count) |
| Amount | `5000000000.555` | `AMOUNT_DECIMALS` (precision is checked before range) |
| Amount | `.5`, `9.99`, `1000000000000000.01` | `AMOUNT_RANGE` |
| Amount | `１２`, `١٢`, `1,,000`, `1000,50` | `AMOUNT_NAN` |
| Rate | `5.`, `-0`, `12 %` | valid (5, 0, 12) |
| Rate | `%` | `RATE_REQUIRED` (empty after normalisation) |
| Rate | `12%%` | `RATE_NAN` |
| Rate | 40 nines | `RATE_RANGE` |
| Tenure | `012` (Years) | valid (12 years) |
| Tenure | 40 nines (Years / Months) | `TENURE_RANGE_YEARS` / `TENURE_RANGE_MONTHS` |

### 4.3 Derived values

- `P` = loan amount as `Decimal`
- `n` = tenure × 12 when the unit is years, otherwise the tenure (an integer from 1 to 1,200)
- `annualRate` = `Decimal`
- `r = annualRate / 1200` (monthly rate as a fraction, held to 40 significant digits; used in the EMI formula)

## 5. Calculation algorithm (normative)

Use the configured constructor exported by `src/domain/money.ts`: `Decimal = DecimalJs.clone({ precision: 40, rounding: DecimalJs.ROUND_HALF_UP })` (D-36). Never call the global `Decimal.set`. `round2(x)` = `x.toDecimalPlaces(2, Decimal.ROUND_HALF_UP)`.

### 5.1 EMI function

```
EMI(B, r, m) = B / m                                if r = 0
             = B × r × (1 + r)^m / ((1 + r)^m − 1)  otherwise
```

### 5.2 Schedule (re-amortising, cent-accurate)

```
balance ← P
for k = 1 … n:
    interest_k ← round2(balance × annualRate / 1200)      // multiply first: exact (D-37)
    if k < n:
        payment_k   ← round2(EMI(balance, r, n − k + 1))
        principal_k ← payment_k − interest_k
    else:
        principal_k ← balance
        payment_k   ← principal_k + interest_k
    balance ← balance − principal_k
    row_k ← { month: k, payment_k, interest_k, principal_k, balance }
```

Why multiply first: `balance × annualRate` has at most 4 decimal places, so dividing by 1,200 gives the exact value whenever that value is a half-cent tie, and the half-up rounding is then exact. With `round2(balance × r)`, `r` is rounded to 40 digits first. An exhaustive check of 23,234 tie cases (every rate, smallest and largest balances) found no difference, but that holds by measurement, not by proof.

Outputs:
- **Monthly payment** (headline) = `payment_1` (the standard EMI rounded to 2 dp)
- **Total interest** = Σ interest_k
- **Total amount payable** = Σ payment_k
- **Rounding note shown** = true if any payment_k ≠ payment_1

### 5.3 Why this method (do not "simplify" it)

The common textbook method fixes the payment at `round2(EMI)` for every month and lets the last month absorb the difference. But the half-cent rounding error compounds at the loan rate. Within our accepted input range this produces wrong-looking results, for example:
- Rs 10,000 at 36% for 359 months: the loan is paid off **7 months early** (month 352).
- Rs 10,000.82 at 30% for 360 months: the fixed instalment is 250.05 but the final instalment is **1,767.73**.

Re-computing the instalment from the remaining balance each month stops the error compounding. We verified over the whole input range (exact decimal simulation; D-54 lists the searches, tens of thousands of cases including every boundary corner) that it ends at exactly 0.00, never ends early, never produces a negative principal, and that **every payment is within 0.01 of the headline payment, except the final payment, which is within 0.02** (D-55: about 0.02% of loans have a final payment 0.02 away; an earlier claim of 0.01 for every payment was wrong). Every row stays verifiable by hand: interest = opening balance × r, rounded, and principal = payment − interest.

### 5.4 Invariants (property-tested with fast-check over the full valid input domain)

For every valid (P, rate, n):
1. Number of rows = n.
2. For every row: `payment = interest + principal` exactly.
3. For every row: `interest = round2(opening × annualRate / 1200)`, where opening is P for row 1 and the previous row's balance after that.
4. For every row: `0 ≤ principal ≤ opening` and `balance ≥ 0`.
5. Final balance = 0.00 exactly. Σ principal = P exactly.
6. For every row except the last: `|payment − payment_1| ≤ 0.01`; for the last row: `|payment − payment_1| ≤ 0.02` (D-55).
7. Total amount payable = P + total interest, exactly.
8. Results are identical when the same tenure is entered as years or as the equivalent number of months.

If a property test finds a counterexample: **stop, record it, and report it to the human.** Do not change the algorithm or loosen an invariant without approval.

Generators must be biased towards the corners (D-38): at least a quarter of runs draw from small amounts (10 to 20,000), rates of 45–75% and tenures of 900–1,200 months, where rounding errors are largest. Every exact bound (10; 1,000,000,000,000,000; 0%; 75%; 1 month; 1,200 months) must also appear (D-54).

### 5.5 Reference values (must be reproduced exactly)

Use the reference loans table in `docs/user-stories.md`, plus these schedule rows:
- L-A row 1: `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`
- L-A row 6 balance: `514,921.05`
- L-A row 12: `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`
- L-A payments equal 88,848.78 in rows 9, 10 and 12, and 88,848.79 in all other rows
- L-Z3 rows: `333.33/0.00/333.33/666.67`, `333.34/0.00/333.34/333.33`, `333.33/0.00/333.33/0.00`
- `[SPEC-§5.3]` regression loans, where the fixed-instalment method fails:
  - `10000`, `36`, `359` months: headline `300.01`; exactly 359 rows; final balance `0.00`; every payment within 0.01 of `300.01` (the final one within 0.02, D-55). (The fixed method pays off at month 352.)
  - `10000.82`, `30`, `360` months: headline `250.05`; exactly 360 rows; final balance `0.00`; every payment within 0.01 of `250.05` (the final one within 0.02, D-55). (The fixed method's final instalment is `1,767.73`.)

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

Formatter contract: `formatMoney` and `formatAmount` receive non-negative values. A value with more than 2 dp is first rounded with `round2`. They never use exponent notation, whatever the size.

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
| note.rounding | `Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.` (D-55) |
| schedule.title | `Repayment schedule` (also the accessible name of the scroll region and of the table) |
| schedule.cols | `Month`, `Payment (Rs)`, `Interest (Rs)`, `Principal (Rs)`, `Balance (Rs)` (`($)` for USD) |
| history.title | `Saved calculations` |
| history.empty | `No saved calculations yet.` |
| history.unavailable | `Saved calculations aren't available in this browser. Calculations still work.` |
| history.entry.line1 | `{amount} at {rate} for {tenure}` |
| history.entry.line2 | `{monthly} per month` |
| history.entry.line3 | `{datetime}` |
| history.restore | `Restore` (accessible name: `Restore {line1}, saved {datetime}`, e.g. `Restore Rs 1,000,000.00 at 12% for 1 year, saved 17 Oct 2026, 20:45`) (D-29) |
| history.delete | `Delete` (accessible name: `Delete {line1}, saved {datetime}`) |
| history.removeFailed | `Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.` (D-28) |
| history.clearAll | `Clear all` |
| dialog.clear.text | `Clear all saved calculations? This can't be undone.` |
| dialog.clear.hint | `This doesn't clear the form. Select Reset to do that.` |
| dialog.cancel / dialog.confirm | `Cancel` / `Clear` |
| err.AMOUNT_REQUIRED | `Enter a loan amount.` |
| err.AMOUNT_NAN | `Loan amount must be a number.` |
| err.AMOUNT_DECIMALS | `Loan amount can have at most 2 decimal places.` |
| err.AMOUNT_RANGE | `Loan amount must be between 10 and 1,000,000,000,000,000.` |
| err.RATE_REQUIRED | `Enter an interest rate.` |
| err.RATE_NAN | `Interest rate must be a number.` |
| err.RATE_DECIMALS | `Interest rate can have at most 2 decimal places.` |
| err.RATE_RANGE | `Interest rate must be between 0 and 75%.` |
| err.TENURE_REQUIRED | `Enter a loan tenure.` |
| err.TENURE_WHOLE | `Loan tenure must be a whole number.` |
| err.TENURE_RANGE_YEARS | `Loan tenure must be between 1 and 100 years.` |
| err.TENURE_RANGE_MONTHS | `Loan tenure must be between 1 and 1,200 months.` |
| chart.cost.title | `Cost breakdown` |
| chart.cost.summary | `Interest is {pct} of the total amount payable.` |
| chart.cost.loan / chart.cost.interest | `Loan amount` / `Interest` |
| chart.balance.title | `Balance over time` |
| chart.balance.summary | `The balance falls from {amount} to {zero} over {n} months.` (`{n} month` when n = 1; `{n}` grouped like `1,200`, D-67) |
| chart.balance.tooltip | `Month {k}: {balance}` |
| chart.makeup.title | `Interest and principal in each payment` |
| chart.makeup.summary | `Interest is {first} of the first payment and {last} of the last.` |
| chart.makeup.tooltip | `Month {k}: principal {principal}, interest {interest}` |
| chart.series.principal / chart.series.interest | `Principal` / `Interest` |
| yearly.title | `Yearly summary` |
| yearly.chart.caption | `Interest and principal paid each year.` (the yearly chart's `<figcaption>`, D-67) |
| yearly.cols | `Year`, `Interest (Rs)`, `Principal (Rs)`, `Balance (Rs)` (`($)` for USD) |
| yearly.tooltip | `Year {y}: principal {principal}, interest {interest}` (amounts with the currency symbol, e.g. `Year 1: principal Rs 338,857.21, interest Rs 422,945.63`, D-67) |
| fatal | `Something went wrong. Please reload the page.` |

The apostrophes in `can't`, `aren't`, `doesn't`, `Couldn't` and `site's` are the ASCII `'` character.

## 8. UI behaviour

### 8.1 Layout (DOM order = visual order = tab order)

1. **Header:** title, tagline, **Theme** select (right-aligned on wide screens).
2. **Form card:** **Currency** select and its note, **Loan amount**, **Annual interest rate**, **Loan tenure** + **Tenure unit**, then **Calculate** (primary, `type="submit"`) and **Reset** (secondary, `type="button"`). It is a `<form noValidate>`, so Enter submits. The dialog buttons are also `type="button"`.
3. **Results card:** idle text (shown whenever `results` is `idle`, including next to field errors; D-27), or the stale message, or the summary (Monthly payment shown prominently, Total interest, Total amount payable), the rounding note when applicable, and the **Repayment schedule**.
4. **Saved calculations card:** heading (`tabindex="-1"` so focus can move there), the list or the empty/unavailable text, and **Clear all**.

Breakpoints: **≥ 769 px**: the form and results cards side by side (form roughly 40%, results roughly 60%) with Saved calculations full-width below; max content width 1200 px. **≤ 768 px**: a single column in DOM order. Never allow horizontal page scroll at any width ≥ 360 px. Long amounts wrap (`overflow-wrap: anywhere`) rather than overflow.

### 8.2 Schedule table

A semantic `<table>` with `<thead>` and `<th scope="col">`, inside a wrapper with `role="region"`, `aria-label` = `schedule.title`, `tabindex="0"`, `overflow: auto` and `max-height: min(60vh, 480px)`. The `<table>` has `aria-labelledby` pointing at the visible `schedule.title` heading, so tests can find both `getByRole('region', { name: 'Repayment schedule' })` and `getByRole('table', { name: 'Repayment schedule' })`. The header row is sticky. Number cells are right-aligned with `font-variant-numeric: tabular-nums`. On narrow screens the wrapper scrolls horizontally if needed; the page does not.

### 8.3 Errors and focus

- Each error renders in an element with an id. The input gets `aria-invalid="true"` and `aria-describedby` pointing to it, and the error text sits in an `aria-live="polite"` container.
- On a failed Calculate, focus moves to the first invalid field. On Reset, focus moves to **Loan amount**. On Delete, focus moves per AC-12.1. On Restore, focus stays on the Restore button.
- **Confirm dialog:** native `<dialog>` opened with `showModal()`. Focus targets are set **explicitly in code**, not with React's `autoFocus` (which fires at mount, not at `showModal()`) and not left to the browser's return-focus (macOS Safari and Firefox don't focus buttons on click). After `showModal()`, focus **Cancel**. **Cancel** or Escape (the `cancel` event) closes it without action and focuses **Clear all**. **Clear** clears the history and focuses the **Saved calculations** heading, because **Clear all** is now disabled (D-30). `aria-labelledby` points to the `dialog.clear.text` element and `aria-describedby` to `dialog.clear.hint`. **No JS focus trap** (D-20): Tab may leave the dialog to the browser's own UI, but must never reach page content behind the dialog (AC-8.5).

### 8.3.1 Test-facing DOM contract (D-43; frozen with the tests at G3)

Tests locate elements only by role and accessible name. The app must provide:

| What | Markup | How tests find it |
|---|---|---|
| Title | `<h1>` = `app.title` | `getByRole('heading', { level: 1 })` |
| Inputs and selects | `<label>` text from §7 | `getByLabel('Loan amount (Rs)')`, `getByLabel('Annual interest rate (%)')`, `getByLabel('Loan tenure')`, `getByLabel('Tenure unit')`, `getByLabel('Currency')`, `getByLabel('Theme')` |
| Field errors | Error element linked with `aria-describedby` | `expect(input).toHaveAccessibleDescription('Enter a loan amount.')` and `toHaveAttribute('aria-invalid', 'true')` |
| Summary figures | `<dl>`; each `<dd>` has `aria-labelledby` pointing at its `<dt>` (`summary.monthly`, `summary.interest`, `summary.total`) | `getByLabel('Monthly payment', { exact: true })` has text `Rs 88,848.79`. Playwright never names the `definition` role, so `getByRole('definition', { name })` cannot work (D-48). |
| Idle, stale and rounding texts | Plain text in the results card | `getByText(...)` with the exact §7 string |
| Schedule | `<h2>` = `schedule.title`; region and table named by it (§8.2); `<th scope="col">` per §7 | `getByRole('table', { name: 'Repayment schedule' })`, `getByRole('row')`, `getByRole('columnheader')`, `getByRole('cell')` |
| Saved calculations | `<h2 tabindex="-1">` = `history.title`; `<ul aria-labelledby>` that heading; one `<li>` per entry holding three lines (§7 line1, line2, line3) | `getByRole('list', { name: 'Saved calculations' })`, `getByRole('listitem')` |
| Entry buttons | Accessible names per §7 (D-29) | `getByRole('button', { name: 'Restore Rs 2,500,000.00 at 18% for 5 years, saved …' })` |
| Dialog | `<dialog>` named by `dialog.clear.text` | `getByRole('dialog', { name: "Clear all saved calculations? This can't be undone." })` |
| Theme | `data-theme` on `<html>` | `document.documentElement.dataset.theme` |
| Removal failure | Text in the Saved calculations card | `getByText(...)` with `history.removeFailed` |
| Charts (D-65) | `<figure>` whose `<figcaption>` is the chart's summary sentence; a heading with the chart title; the `<svg>` is `aria-hidden="true"`; the legend is HTML text | `getByRole('figure', { name: <summary> })`; `getByText(<title>)` |
| Yearly summary | `<h3>` = `yearly.title`; `<table aria-labelledby>` that heading; `<th scope="col">` per §7 | `getByRole('table', { name: 'Yearly summary' })` |
| Chart tooltips | An element with `role="tooltip"` shown on pointer hover | `getByRole('tooltip')` |
| Chart hover areas (D-66) | Inside each hoverable chart's `<figure>`, one element `[data-hit-area]` covering the plot. Months (or years) are spread evenly across its width: item *k* of *n* is under the point at (*k* − 0.5) / *n* of its width, at any height. | `figure.locator('[data-hit-area]')`, then `hover({ position })` |
| Cost bar segments (D-66) | Two elements `[data-segment="loan"]` and `[data-segment="interest"]` whose rendered widths are proportional to the two percentages | `boundingBox()` widths |
| Series marks (D-66) | Every filled or stroked chart mark carries `data-series="principal"`, `"interest"`, `"loan"` or `"balance"` | computed `fill` / `stroke` / `background-color` for AC-20.5 |

### 8.3.2 Charts (D-65)

- **Order inside the results card:**
  1. the three figures and the rounding note;
  2. **Cost breakdown** (S-20);
  3. **Balance over time** (S-21);
  4. **Interest and principal in each payment** (S-22);
  5. **Yearly summary**, a chart and table (S-19);
  6. the **Repayment schedule**, still last.
- **Hand-built inline SVG,** drawn from `CalculatedLoan`. No chart library (§2) and no network.
- **Each series is one `<path>`,** never one element per month, so 1,200 months stay within AC-10.8.
- **Never colour alone:**
  - every chart has a visible text summary (its `<figcaption>`);
  - two-series charts have an HTML legend, with Principal first and Interest second in every chart;
  - the data is also in a table (the schedule, the yearly table).
- **Colour:** two categorical series in a fixed order, validated with the dataviz validator against the light and dark card surfaces. Marks reach at least 3:1 against `--surface`, and chart text uses the text tokens (AC-20.5).
- **One y-axis per chart.** Axes and grid are quiet.
- **Hover:** a pointer tooltip (`role="tooltip"`) on the balance, payment and yearly charts, with the exact values. Keyboard and screen-reader users get the same values from the tables.
- **Layout:** fluid width with no fixed pixel widths, and no horizontal page scroll (AC-20.6).
- **Drawing numbers (D-71):** a chart may turn a dimensionless ratio (value ÷ max, computed in `Decimal`) or a percentage into a JS `number`, only for drawing geometry (path coordinates, widths). Money values never become a JS `number`, and nothing drawn is used in a calculation or shown as text.

### 8.4 Theme

Resolved theme = the user's choice, or `prefers-color-scheme` when set to `system`. Apply it as `data-theme="light|dark"` on `<html>`. A tiny inline script in `index.html` applies the saved theme before first paint (wrapped in try/catch) so there is no flash of the wrong theme. Listen for `matchMedia('(prefers-color-scheme: dark)')` changes while `system` is selected.

Starting tokens. Tests must prove ≥ 4.5:1 for these text pairs in both themes: text/bg, text/surface, text-muted/bg, text-muted/surface, error/bg, error/surface, on-primary/primary. The contrast tests read the **computed** custom properties (`getComputedStyle(document.documentElement)`) under each `data-theme` in the running app, not the values in this table (D-39).

| Token | Light | Dark |
|---|---|---|
| --bg | #FFFFFF | #0F141B |
| --surface | #F5F7FA | #18202B |
| --text | #1A1F2B | #E7ECF3 |
| --text-muted | #4A5568 | #A9B4C2 |
| --primary (button bg) / --on-primary | #1D4ED8 / #FFFFFF | #7AA2FF / #0F141B |
| --error | #B42318 | #FF8A80 |
| --border (decorative lines only) | #CBD2DC | #2E3A4A |
| --input-border (inputs and selects) | #7E8898 | #66768C |
| --focus (2px outline, 2px offset) | #1D4ED8 | #7AA2FF |

`--input-border` must have a contrast ratio of at least 3:1 against both `--bg` and `--surface` (WCAG 1.4.11; D-19). Starting values: light 3.58:1 on bg and 3.34:1 on surface; dark 3.99:1 on bg and 3.54:1 on surface. Prove it with a `[SPEC-§8.4]` test.

Tap targets are at least 44 × 44 px. Body font is the system font stack (no web-font downloads).

## 9. Persistence

### 9.1 Safe storage

`safeStorage` checks availability once at start-up (set and remove a probe key inside try/catch). Every read and write is wrapped, **including the access to `window.localStorage` itself**, which throws in Safari when storage is blocked. Failures return `{ ok: false }` and are never thrown to the UI. If storage is unavailable: settings work in memory for the visit (AC-6.6), and history shows `history.unavailable` (AC-11.9).

### 9.2 Keys and schemas (version 1)

- `emi-calc.v1.settings` → `{ "currency": "PKR" | "USD", "theme": "system" | "light" | "dark" }`. Defaults: `PKR`, `system`. On load, if the value is not valid JSON or not an object, use both defaults. Each field that is missing or not an allowed value falls back to its own default, and the other field is kept. The inline theme script in `index.html` applies the same rule. Nothing throws.
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

Only these fields are stored, never the schedule. **If the value is not valid JSON or not an array, treat the history as empty.** On load, an element is kept only if **all** of these hold, and otherwise it is dropped (D-14):
1. A type guard passes: the element and its `input` are non-null objects; string `id`; `createdAt` with `!isNaN(Date.parse(createdAt))` and a year from 2000 to 9999; `currency` is `PKR` or `USD`; `input.amount` and `input.rate` are strings; `Number.isInteger(input.tenure)`; `input.unit` is `years` or `months`; string `monthlyPayment`.
2. `validateInputs({ ...input, tenure: String(input.tenure) })` returns `ok`.
3. `toCanonical(value)` deep-equals the stored `input`, so only canonical entries are restored.
4. The stored `monthlyPayment` equals `round2(emi(P, r, n))` as a `Decimal`. Use `emi`, not a full schedule, so loading 20 entries stays cheap.

After that, later duplicates of an `id` are dropped and the list is truncated to 20. History line 2 (`{monthly} per month`) shows the recomputed value. Nothing throws (AC-11.10).

### 9.3 Saving rules

- Save only after a successful calculation.
- Skip the save if the newest entry has the same canonical `input` **and** `currency` (AC-11.5).
- Insert at index 0 and truncate to 20 (AC-11.6).
- If a **save** fails (for example, quota exceeded), switch to the unavailable state for the rest of the visit.
- If a **delete or Clear all** fails to write, never show it as done (D-28). Keep the entries on screen as they were and show `history.removeFailed` in the Saved calculations card. The message stays until the next successful change.
- **Clear all** removes the key entirely (AC-12.4).
- **Two tabs (D-13):** every save, delete and clear-all **re-reads storage first** and then writes, so stale in-memory state is never written back. The duplicate check compares against the newest entry as just re-read. Delete works by `id`, never by index.
- Listen for the `storage` event on the history key and reload the list. `newValue === null` means the list is now empty. An event with `key === null` (another tab called `localStorage.clear()`) also reloads it. Read-then-write narrows the two-tab window but cannot close it completely; the spec does not claim more. If the entry that had focus is removed this way, focus moves to the **Saved calculations** heading.
- These rules are proven by `[SPEC-§9.3]` tests.

## 10. Error handling

- No error may reach the user as a blank screen. Wrap `<App>` in an `ErrorBoundary` that renders the `fatal` message.
- The domain layer returns typed results for invalid input and never throws on user input.
- E2E tests attach `page.on('pageerror')` and `page.on('console', type === 'error')` listeners **globally** (via a fixture) and fail if either fires (AC-2.16).

## 11. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-1 | Tested on the Chromium, Firefox and WebKit engines (Playwright). Chromium covers Chrome and Edge; WebKit approximates Safari. The 3-browser evidence that counts is the Linux CI run; a local run on Windows uses Playwright's Windows WebKit build. |
| NFR-2 | A fresh clone runs with `npm ci && npm run dev` on Node 24. No accounts, keys or services. |
| NFR-3 | No network requests after initial load (asserted in one E2E test via request interception, **after** a calculation). The same test asserts `document.cookie === ''` and that the context holds no cookies (NFR-7). |
| NFR-4 | L-MAX: from the Calculate click to the 1,200th (last) schedule row being in the DOM, ≤ 1,000 ms, measured inside the page with `performance.now()`, in each browser. Checked locally from G4.3 and on CI by G4.6 (AC-10.8; D-32). |
| NFR-5 | Production JS bundle under 150 KB gzipped (checked in `verify`). |
| NFR-6 | No `any` types, no `@ts-ignore`, and no ESLint warnings in committed code (`eslint --max-warnings 0`). |
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

**Time zone (D-15):** every Playwright context uses `timezoneId: 'Asia/Karachi'`, and clock times are given with an explicit offset (for example `2026-10-17T20:45:00+05:00`). `vitest.config.ts` sets `process.env.TZ = 'Asia/Karachi'` before anything else runs. A `[SPEC-§12.1]` test asserts that `new Date('2026-10-17T15:45:00Z').getHours() === 20`, which proves the zone is applied on every OS, Windows included.

Dialog behaviour (AC-8.5, AC-12.2 to AC-12.4) is tested in E2E only, because jsdom does not implement `showModal()`. The Vitest setup file `test/setup.ts` stubs `matchMedia`, and gives `HTMLDialogElement` minimal `showModal()`/`close()` stubs so component tests that open the dialog don't crash. Those stubs prove nothing about dialog behaviour.

**Seeding saved calculations (D-35).** Tests that need entries already in storage (AC-11.6, AC-11.7, AC-12.x) either create them by driving the UI, or seed **0% loans**, whose payment is known by hand: amount `12000 × k` over `12` months gives `1000 × k` per month (for example `12000` gives `1000.00` and `240000` gives `20000.00`). They never compute `monthlyPayment` with the code under test.

**Phase 3 exceptions.** Tests whose only assertions are negative (for example, "no loan-amount message is shown" in AC-2.5, "the note is not shown" in AC-10.6), and the `[SPEC-§12.1]` time-zone test, may pass before implementation. The test-designer lists every such test in its report.

### 12.2 Naming

Every test that proves an acceptance criterion has a title starting `[AC-x.y]`. One test may prove several criteria (`[AC-3.1][AC-10.2] ...`). Tests that prove spec rules only use `[SPEC-§n]`.

### 12.3 Test independence

- Tests must not depend on order.
- E2E tests start from a clean `localStorage` unless the test is about persistence.
- To simulate blocked storage, stub `Storage.prototype` methods to throw (`addInitScript`). Also cover Safari's behaviour, where reading `window.localStorage` itself throws: redefine the getter to throw.

### 12.4 Tests are the contract

After Gate G3 (tests approved, tag `g3-tests-approved`), the developer must not change anything in the **freeze scope**: `src/**/*.test.ts(x)`, `e2e/**` (except `e2e/review/**`, which the reviewer adds to), `test/**`, `playwright.config.ts`, `vitest.config.ts` and `scripts/trace.mjs`. If a test looks wrong, stop and raise it with the human, who decides. The reviewer checks for changes made after G3 with:

```
git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'
```

### 12.5 Traceability script (`npm run trace`)

`scripts/trace.mjs` (Node, no dependencies):
1. Parses `app-roles.md` (R-ids), `jobs-to-be-done.md` (J-ids and their role) and `user-stories.md` (S-ids with role, job, scope and status, plus AC-ids).
2. Fails if a story references an unknown role or job, a job references an unknown role, or a job has no story.
3. Scans `src/**/*.test.ts(x)` and `e2e/**/*.spec.ts` for `[AC-x.y]` tags. It fails if any **v1** AC has no test or if a test references an unknown AC. It warns if a Backlog AC has a test.
4. With `--results`, it reads `reports/vitest.json` and `reports/playwright.json` (JSON reporters). It fails if any story marked `Implemented` has an AC that breaks either rule: (a) every test tagged with that AC, in Vitest or Playwright, passed; (b) every **Playwright** test tagged with it passed in all three browser projects. An AC proven only in Vitest (for example the property-test ACs) needs only rule (a) (D-31).
5. Prints a table: story, ACs, tests, pass/fail.

## 13. npm scripts

| Script | Does |
|---|---|
| `dev` | Vite dev server |
| `build` | `tsc -p tsconfig.app.json && vite build` (type-checks the app only, so red tests can't block the build; `typecheck` covers everything; D-42) |
| `preview` | Serve `dist/` on port 4173 |
| `lint` / `format:check` / `typecheck` | ESLint (`--max-warnings 0`) / Prettier check / `tsc` over app, tests and configs without emitting |
| `test` | Vitest run, writes `reports/vitest.json` (`passWithNoTests`, so Phase 2 can be green) |
| `test:e2e` | Playwright (builds and serves via `webServer`), writes `reports/playwright.json` (`--pass-with-no-tests`) |
| `trace` | §12.5 |
| `size` | Fails if the gzipped JS exceeds 150 KB |
| **`verify`** | `lint && format:check && typecheck && test && build && size && test:e2e && trace --results` (D-18). **This is the loop's exit condition.** |

The build tsconfig excludes `*.test.*`, `test/` and `e2e/`, so the app builds while tests are red. A separate tsconfig makes `typecheck` cover the tests too.

## 14. CI/CD and deployment

- `.github/workflows/ci.yml`: on push and pull request, run Node from `.nvmrc`, `npm ci`, `npx playwright install --with-deps`, then `npm run verify`. Upload the reports as artifacts.
- `.github/workflows/deploy.yml`: on push to `main`, after `verify` passes, build with `BASE_PATH=/<repo-name>/`, then `actions/upload-pages-artifact` and `actions/deploy-pages`. A follow-up job runs the `@smoke` tests against `https://<user>.github.io/<repo-name>/`.
- `vite.config.ts`: `base: process.env.BASE_PATH ?? '/'`, so local dev and preview use `/`.
- Repository Settings → Pages → Source: **GitHub Actions** (a manual step for the human, listed in the README).

## 15. Definition of done (per story)

1. Every AC has at least one `[AC-x.y]` test, and all pass in Chromium, Firefox and WebKit.
2. `npm run verify` exits 0.
3. The reviewer subagent reports no blocking findings for the story.
4. The human has checked each AC by hand in the running app (checklist in `docs/process/manual-test-checklist.md`).
5. Only then is the story's status changed to `Implemented`, by the human or with their explicit approval.

## 16. Out of scope (v1), stated as assumptions in the README

- Payment frequencies other than monthly; flat-rate loans; variable rates.
- Fees, insurance, taxes, processing charges and grace periods.
- Calendar dates for payments (rows are numbered by month).
- Flat-rate and markup-based quotes, common for Pakistani car loans and Islamic financing. The README states plainly that the app's figures will not match such quotes (D-33).
- Currency conversion (the symbol only changes).
- Accounts, sync across devices, server storage.
- Languages other than English; right-to-left layouts.
- Printing/exporting, copying, comparing offers, prepayments (backlog stories S-14 to S-18). Yearly summaries moved to v1 as S-19 (D-65).
- Offline/PWA installation.
