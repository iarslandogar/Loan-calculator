# Subagent 18: test-designer: Write G3b tests for the visuals

Subagent **`test-designer`**, task: *Write G3b tests for the visuals*. Started 2026-10-18 18:11 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 18:11 PKT

> Phase "G3b" (tests first) for an owner-approved scope addition: four visuals. Follow your agent instructions in full. Read first: decision-log D-65 and D-66; docs/process/proposal-visuals.md; docs/user-stories.md stories S-19 (now v1), S-20, S-21, S-22 (16 ACs: AC-19.1–19.4, AC-20.1–20.6, AC-21.1–21.3, AC-22.1–22.3); spec §3.1.1 (new domain API: `costSplit`, `interestShare`, `yearlySummary`/`YearRow` in src/domain/summary.ts; `formatPercent` in src/domain/format.ts — all throwing NOT_IMPLEMENTED stubs today), §7 (new copy keys chart.* and yearly.*), §8.3.1 (DOM contract incl. the D-66 hooks `[data-hit-area]`, `[data-segment]`, `[data-series]`, charts as `<figure>` named by `<figcaption>`, tooltips `role="tooltip"`, the "Yearly summary" table), §8.3.2 (chart rules).
> 
> HARD CONSTRAINTS
> - All EXISTING tests and test infrastructure are frozen: do NOT modify any existing file under e2e/ (including e2e/fixtures.ts), src/**/*.test.ts, test/**, or any config. Put shared helpers you need in a NEW file (e.g. e2e/visual-helpers.ts) that may import from './fixtures'.
> - New files only: src/domain/summary.test.ts (and formatPercent tests in a new file, e.g. src/domain/format-percent.test.ts), e2e/s19-yearly.spec.ts, e2e/s20-cost.spec.ts, e2e/s21-balance-chart.spec.ts, e2e/s22-makeup.spec.ts, optional e2e/visual-helpers.ts. Append lines for the 16 new ACs to docs/process/manual-test-checklist.md (append only; don't change existing lines).
> - Hard-code every expected value from the AC text (they were computed independently); never compute expectations with app code. For domain tests you may also add `[SPEC-§3.1.1]` cases: costSplit percentages always sum to exactly 100.0; formatPercent always shows 1 dp (`6.2%`, `0.0%`, `100.0%`), half-up (`6.25` → `6.3%`); yearlySummary groups of 12 with a shorter last group, sums equal to the loan's totals, last balance 0.00 — a fast-check property (≥ 1,000 runs, seed 20261017, using validateInputs to build inputs, the Decimal from money.ts directly as oracle) that Σ yearly interest = totalInterest, Σ yearly principal = amount, Σ months = months.
> - E2E: navigate with `page.goto('./')` via the existing `open()`; locate by role/name and the D-66 hooks only. Hover positions follow D-66: item k of n is at x = (k − 0.5)/n × width of `[data-hit-area]` (any y; use the middle). Tooltip text must equal the AC text exactly. AC-20.4: compare `[data-segment="loan"]` width to the sum of both segments' widths (93.8% ± 1 point). AC-20.5: read computed colours of every `[data-series]` mark (fill, or stroke when fill is none/transparent, or background-color for HTML marks) and of the chart text, compare with the card surface (`--surface`) using the existing `contrast()` helper — ≥ 3:1 for marks, ≥ 4.5:1 for text, in Light and Dark (select the theme with the Theme control). AC-20.6: at 360 px with L-MAX, document scrollWidth ≤ 360 and every `figure` box within the results card box. AC-21.3: reuse AC-10.8's in-page timing approach (MutationObserver from the Calculate click until the 480th… no — until the schedule's 1,200th row AND every chart figure is in the DOM), ≤ 1000 ms.
> - Run Playwright ONLY with `CI=1`, and first check nothing is listening on port 4173; leave nothing behind. Iterate with `--project=chromium`; final run all three browsers for your new specs only.
> - Every new test must FAIL for the right reason now (NOT_IMPLEMENTED or missing element). Report any that pass early.
> - Never `.skip/.only/.fixme/.fails`. Your files must pass `npx eslint <files> --max-warnings 0`, `npx prettier --check <files>`, `npm run typecheck`.
> 
> Finish with: tests per AC; early passes (should be none); anything in the AC/spec text you found ambiguous (quote it); and the final `npx vitest run` summary and `CI=1 npx playwright test <your 4 specs>` per-browser counts, plus `npm run trace` output (expected: 0 untested v1 ACs).

<details><summary>🔧 26 tool call(s): Grep ×3, Read ×5, Bash ×10, Write ×7, Edit</summary>

- **Grep** · ^## |^### D-6[56]|D-65|D-66

```json
{
 "pattern": "^## |^### D-6[56]|D-65|D-66",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "output_mode": "content",
 "head_limit": 40
}
```

  Result:
```
81:| D-65 | Add four visuals: S-20, S-21, S-22 new; S-19 Backlog to v1 | Approved (owner), 2026-10-18 |
82:| D-66 | Chart test hooks: `data-hit-area`, `data-segment`, `data-series` | **Proposed**: owner to review at G3b |
149:## Planning-phase decisions (2026-10-17, Claude Code session `session-00b-planning`)
211:## Gate G1 decisions (2026-10-17)
312:## Phase 2 decisions (2026-10-17)
355:## Phase 3 decisions (2026-10-17)
385:## Phase 4 decisions
603:### D-65 Visuals: four charts in the results (owner, 2026-10-18)
616:### D-66 Chart test hooks (Proposed, owner to review at G3b)
627:## Change history
```

- **Grep** · ^## S-(19|20|21|22)\b|^#+ .*S-(19|20|21|22)

```json
{
 "pattern": "^## S-(19|20|21|22)\\b|^#+ .*S-(19|20|21|22)",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\user-stories.md",
 "output_mode": "content"
}
```

  Result:
```
234:## S-19 See interest versus principal for each year
246:## S-20 See what share of the total cost is interest
258:## S-21 See the balance fall over time
267:## S-22 See how each payment splits between interest and principal
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\user-stories.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\user-stories.md",
 "offset": 225,
 "limit": 90
}
```

  Result:
```
225	## S-13 See the balance remaining after each payment
226	**Role:** R-3 Existing Borrower · **Serves:** J-8 · **Scope:** v1 · **Status:** Not implemented
227	
228	"As an Existing Borrower, I want to see what I still owe after each payment, so that I can plan an early repayment or a refinance."
229	
230	- **AC-13.1** Given L-A, then the Balance after month 6 is `514,921.05` and after month 12 is `0.00`.
231	- **AC-13.2** Given L-B entered as `5` **Years**, then the schedule has exactly 60 rows and the Balance after month 60 is `0.00`.
232	- **AC-13.3** Given any valid inputs, then the schedule has exactly as many rows as the tenure in months, every Balance equals the previous Balance minus that row's Principal, no Balance is negative, and the final Balance is exactly `0.00`. *(Property test.)*
233	
234	## S-19 See interest versus principal for each year
235	**Role:** R-3 Existing Borrower · **Serves:** J-9 · **Scope:** v1 · **Status:** Not implemented
236	
237	"As an Existing Borrower, I want a yearly summary of interest versus principal paid, so that I can see how much of my money went to interest each year."
238	
239	*Moved from Backlog to v1 by the owner on 2026-10-18 (decision D-65, docs/process/proposal-visuals.md).*
240	
241	- **AC-19.1** Given L-B, when I view the yearly summary, then 5 rows are shown, and each row's interest and principal equal the sums of the matching 12 monthly rows.
242	- **AC-19.2** Given L-B, then the **Yearly summary** table has the columns **Year**, **Interest (Rs)**, **Principal (Rs)**, **Balance (Rs)**, and its first and last rows read `1 | 422,945.63 | 338,857.21 | 2,161,142.79` and `5 | 69,355.47 | 692,447.31 | 0.00`.
243	- **AC-19.3** Given `100000`, `10`, `18` **Months**, when I Calculate, then the yearly summary has 2 rows and the second (covering 6 months) reads `2 | 1,028.07 | 35,006.16 | 0.00`.
244	- **AC-19.4** Given L-B, then a yearly chart shows one stacked bar per year, with a legend naming **Principal** and **Interest**.
245	
246	## S-20 See what share of the total cost is interest
247	**Role:** R-1 Prospective Borrower · **Serves:** J-2 · **Scope:** v1 · **Status:** Not implemented
248	
249	"As a Prospective Borrower, I want to see at a glance how much of what I repay is interest, so that I can judge the true cost of an offer."
250	
251	- **AC-20.1** Given L-A, when I Calculate, then a **Cost breakdown** bar shows two parts, **Loan amount** and **Interest**, and the text `Interest is 6.2% of the total amoun
… [4,740 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\decision-log.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "offset": 600,
 "limit": 27
}
```

  Result:
```
600	- **Open observation:** the full E2E suite takes about 8.3 minutes against 5.5 before. The cause isn't established, and it isn't a failure.
601	- **Note for the owner:** the design's reference board shows `Rs 66,185.46` and `Rs 1,066,185.46` for L-A. Those are example numbers in a static picture; the correct figures, which the app shows and the tests check, are 66,185.45 and 1,066,185.45.
602	
603	### D-65 Visuals: four charts in the results (owner, 2026-10-18)
604	- **Request:** the owner asked for "a few visuals (like charts, diagrams)" and chose all four offered: a cost split bar, balance over time, payment make-up over time, and a yearly summary chart plus table.
605	- **Decision:** approved as written in `docs/process/proposal-visuals.md`.
606	  - New stories **S-20** (R-1/J-2), **S-21** (R-3/J-8) and **S-22** (R-2/J-5). **S-19** moves from Backlog to v1, with AC-19.2 to AC-19.4 added (AC-19.1 unchanged).
607	  - New domain functions `costSplit`, `interestShare` and `yearlySummary` (spec §3.1.1), plus `formatPercent` (always 1 dp, half-up).
608	  - New copy in spec §7, chart rules in §8.3.2, and the DOM contract rows in §8.3.1.
609	- **Owner-approved edits to owner-only files:**
610	  - `docs/jobs-to-be-done.md`: the owner explicitly approved exactly four edits ("You make exactly those edits"): J-2 + S-20, J-5 + S-22, J-8 + S-21, and J-9's S-19 no longer "(backlog)".
611	  - `docs/user-stories.md`: the new stories and ACs, and S-19's scope.
612	- **Reference values:** computed independently with exact decimal arithmetic (spec §5.2), and cross-checked: L-B's yearly interest sums to AC-3.2's Rs 1,309,014.14, and its principal to Rs 2,500,000.00.
613	- **Process:** the `test-designer` writes the new tests (red), and the owner approves them, frozen under the tag `g3b-visuals-tests-approved`. Then implementation, `verify`, an independent review and a mini-gate, before Phase 5. **Existing frozen tests are not changed.**
614	- **Still open from the redesign mini-gate:** D-64 approval, and whether to add the RD-3 forced-colors borders. The owner moved on to this request without answering.
615	
616	### D-66 Chart test hooks (Proposed, owner to review at G3b)
617	- **Decision:** spec §8.3.1 gains three `data-` hooks: `[data-hit-area]` (hover geometry: item *k* of *n* at (*k* − 0.5) / *n* of its width), `[data-segment]` (the cost bar's parts) and `[data-series]` (every chart mark).
618	- **Why:** the chart SVG is deliberately `aria-hidden`, because the figca
… [763 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\proposal-visuals.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\proposal-visuals.md"
}
```

  Result:
```
1	# Proposal: visuals in the results (charts)
2	
3	**Status:** Proposed by Claude Code, 2026-10-18, for owner approval. Nothing here is built or added to the ACs yet.
4	**Requested by:** the owner ("add a few visuals, like charts"). The owner chose all four visuals.
5	
6	## Summary
7	
8	Four visuals, all inside the results card, all built from the schedule the app already computes:
9	
10	| # | Visual | Story | Role / job | What it answers |
11	|---|---|---|---|---|
12	| 1 | Cost split bar | **S-20** (new) | R-1 / J-2 | "How much of what I repay is interest?" |
13	| 2 | Balance over time | **S-21** (new) | R-3 / J-8 | "What will I still owe, and when?" |
14	| 3 | Payment make-up over time | **S-22** (new) | R-2 / J-5 | "Why does the interest part shrink?" |
15	| 4 | Yearly summary (chart + table) | **S-19** (Backlog → v1) | R-3 / J-9 | "How much interest did each year cost?" |
16	
17	**Order in the results card:**
18	1. the three figures and the rounding note (unchanged);
19	2. Cost breakdown;
20	3. Balance over time;
21	4. Interest and principal in each payment;
22	5. Yearly summary;
23	6. the Repayment schedule (unchanged, still last).
24	
25	## Rules every visual follows
26	
27	- **No new dependencies.** Each chart is hand-built inline SVG, drawn in React from the existing `CalculatedLoan`. There's no charting library and no network.
28	- **Never colour alone.** Each chart sits in a `<figure>` whose `<figcaption>` holds a one-sentence text summary (exact wording below). The data is also always available as a table: the existing schedule, plus a new yearly table. The SVG itself is `aria-hidden="true"`, because the figcaption and the tables carry the information for assistive technology.
29	- **Legends:** charts with two series (principal and interest) show an HTML legend, plus direct labels where they fit. One-series charts have no legend; the title names the series.
30	- **Colour:** two categorical series in a fixed order, Principal first and Interest second, the same in every chart. The pairs are checked with the data-visualisation validator script against the light and dark surfaces, not by eye. The marks may need deeper shades than the pastel fills to reach 3:1 against the surface (WCAG 1.4.11). Text uses text tokens only.
31	- **One axis per chart,** no dual axes. Axes and grid are kept quiet.
32	- **Hover:** a tooltip on the balance, payment and yearly charts (crosshair or per-bar) showing the exact values. Keyboard and screen-reader users get the s
… [7,048 more characters not shown; see raw/]
```

- **Grep** · ^#+

```json
{
 "pattern": "^#+ ",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\technical-spec.md",
 "output_mode": "content"
}
```

  Result:
```
1:# Technical Specification: Loan EMI Calculator (v1)
13:## 1. Purpose and scope
21:## 2. Technology stack
42:## 3. Architecture
44:### 3.1 Layers
73:### 3.1.1 Domain public API (D-16; frozen with the tests at Gate G3)
135:### 3.2 Application state (reducer)
158:## 4. Input parsing and validation
162:### 4.1 Normalisation (before validation)
170:### 4.2 Rules (checked in this order, stopping at the first failure per field)
198:### 4.3 Derived values
205:## 5. Calculation algorithm (normative)
209:### 5.1 EMI function
216:### 5.2 Schedule (re-amortising, cent-accurate)
240:### 5.3 Why this method (do not "simplify" it)
248:### 5.4 Invariants (property-tested with fast-check over the full valid input domain)
264:### 5.5 Reference values (must be reproduced exactly)
276:## 6. Formatting
291:## 7. Copy deck (all user-visible text; keep in `ui/copy.ts`)
356:## 8. UI behaviour
358:### 8.1 Layout (DOM order = visual order = tab order)
367:### 8.2 Schedule table
371:### 8.3 Errors and focus
377:### 8.3.1 Test-facing DOM contract (D-43; frozen with the tests at G3)
401:### 8.3.2 Charts (D-65)
421:### 8.4 Theme
443:## 9. Persistence
445:### 9.1 Safe storage
449:### 9.2 Keys and schemas (version 1)
472:### 9.3 Saving rules
484:## 10. Error handling
490:## 11. Non-functional requirements
502:## 12. Testing strategy
504:### 12.1 Layers
522:### 12.2 Naming
526:### 12.3 Test independence
532:### 12.4 Tests are the contract
540:### 12.5 Traceability script (`npm run trace`)
549:## 13. npm scripts
565:## 14. CI/CD and deployment
572:## 15. Definition of done (per story)
580:## 16. Out of scope (v1), stated as assumptions in the README
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\technical-spec.md",
 "offset": 73,
 "limit": 62
}
```

  Result:
````
73	### 3.1.1 Domain public API (D-16; frozen with the tests at Gate G3)
74	
75	Domain tests call **only** these exports. UI and storage behaviour is tested only through the rendered `<App/>` (component tests) and E2E, so reducer and storage internals stay free to change. In Phase 2 the developer writes `types.ts` and the configured `Decimal` in full, and every other function below with this exact signature and the body `throw new Error('NOT_IMPLEMENTED')`, so that Phase 3 tests fail for the right reason.
76	
77	```ts
78	// types.ts
79	type Unit = 'years' | 'months'
80	type Currency = 'PKR' | 'USD'
81	type Field = 'amount' | 'rate' | 'tenure'
82	type ErrorCode =
83	  | 'AMOUNT_REQUIRED' | 'AMOUNT_NAN' | 'AMOUNT_DECIMALS' | 'AMOUNT_RANGE'
84	  | 'RATE_REQUIRED' | 'RATE_NAN' | 'RATE_DECIMALS' | 'RATE_RANGE'
85	  | 'TENURE_REQUIRED' | 'TENURE_WHOLE' | 'TENURE_RANGE_YEARS' | 'TENURE_RANGE_MONTHS'
86	interface RawInputs { amount: string; rate: string; tenure: string; unit: Unit }
87	interface LoanInput { amount: Decimal; annualRate: Decimal; tenure: number; unit: Unit; months: number }
88	  // months = unit === 'years' ? tenure * 12 : tenure. Tests obtain a LoanInput only via validateInputs.
89	interface CanonicalInput { amount: string; rate: string; tenure: number; unit: Unit }
90	type ValidationResult =
91	  | { ok: true; value: LoanInput }
92	  | { ok: false; errors: Partial<Record<Field, ErrorCode>> }
93	interface ScheduleRow { month: number; payment: Decimal; interest: Decimal; principal: Decimal; balance: Decimal }
94	interface CalculatedLoan {
95	  input: LoanInput; monthlyPayment: Decimal; totalInterest: Decimal; totalPayable: Decimal
96	  showRoundingNote: boolean; rows: ScheduleRow[]
97	}
98	
99	// money.ts
100	export const Decimal = DecimalJs.clone({ precision: 40, rounding: DecimalJs.ROUND_HALF_UP })
101	round2(x: Decimal): Decimal
102	formatMoney(x: Decimal, currency: Currency): string   // "Rs 88,848.79", "$88,848.79"
103	formatAmount(x: Decimal): string                        // "921,151.21" (no symbol)
104	
105	// parse.ts
106	normaliseAmount(raw: string): string
107	normaliseRate(raw: string): string
108	normaliseTenure(raw: string): string
109	
110	// validate.ts
111	validateInputs(raw: RawInputs): ValidationResult        // never throws
112	
113	// loan.ts
114	emi(balance: Decimal, monthlyRate: Decimal, months: number): Decimal   // §5.1, unrounded
115	calculateLoan(input: LoanInput): CalculatedLoan                        // §5.2
116	
117	// s
… [1,296 more characters not shown; see raw/]
````

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\technical-spec.md",
 "offset": 264,
 "limit": 160
}
```

  Result:
```
264	### 5.5 Reference values (must be reproduced exactly)
265	
266	Use the reference loans table in `docs/user-stories.md`, plus these schedule rows:
267	- L-A row 1: `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`
268	- L-A row 6 balance: `514,921.05`
269	- L-A row 12: `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`
270	- L-A payments equal 88,848.78 in rows 9, 10 and 12, and 88,848.79 in all other rows
271	- L-Z3 rows: `333.33/0.00/333.33/666.67`, `333.34/0.00/333.34/333.33`, `333.33/0.00/333.33/0.00`
272	- `[SPEC-§5.3]` regression loans, where the fixed-instalment method fails:
273	  - `10000`, `36`, `359` months: headline `300.01`; exactly 359 rows; final balance `0.00`; every payment within 0.01 of `300.01` (the final one within 0.02, D-55). (The fixed method pays off at month 352.)
274	  - `10000.82`, `30`, `360` months: headline `250.05`; exactly 360 rows; final balance `0.00`; every payment within 0.01 of `250.05` (the final one within 0.02, D-55). (The fixed method's final instalment is `1,767.73`.)
275	
276	## 6. Formatting
277	
278	Custom, deterministic formatters. **Do not use `Intl.NumberFormat` or `toLocaleString` for money or dates**, because their output differs between browsers and OS locales.
279	
280	| What | Rule | Examples |
281	|---|---|---|
282	| Money (summary, history) | symbol + integer part grouped in 3s with `,` + `.` + exactly 2 decimals. PKR symbol `Rs ` (with a trailing space); USD symbol `$` (no space). | `Rs 88,848.79`, `$1,000,000.00`, `Rs 0.00`, `Rs 20,000,000,061.79` |
283	| Money (schedule cells) | Same, without the symbol | `921,151.21` |
284	| Rate (history) | Normalised decimal, no trailing zeros, then `%` | `12%`, `21.5%`, `0.01%`, `0%` |
285	| Tenure (history) | Unit as entered: `1 year`, `N years`, `1 month`, `N months` | `5 years`, `12 months` |
286	| Canonical input (restore) | Amount and rate as a normalised decimal without grouping or trailing zeros; tenure as an integer | `2500000`, `18`, `1500.5` |
287	| Date-time (history) | Local time `D Mon YYYY, HH:mm`, 24-hour clock, English 3-letter months | `17 Oct 2026, 20:45`, `5 Jan 2027, 09:05` |
288	
289	Formatter contract: `formatMoney` and `formatAmount` receive non-negative values. A value with more than 2 dp is first rounded with `round2`. They never use exponent notation, whatever the size.
290	
291	## 7. Copy deck (all user-visible text; keep in `ui/copy.ts`)
292	
293	| Key | Text |
294	|---|---|
295	| app.title | `Loan EMI Calculator` |
296	| app.tagline
… [12,600 more characters not shown; see raw/]
```

- **Bash**

```bash
ls e2e src/domain test && cat e2e/fixtures.ts && cat package.json | head -40 && cat src/domain/summary.ts && netstat -ano | grep 4173
```

  Result:
```
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

src/domain:
format.test.ts
format.ts
loan.property.test.ts
loan.test.ts
loan.ts
money.test.ts
money.ts
parse.test.ts
parse.ts
summary.ts
types.ts
validate.test.ts
validate.ts

test:
helpers.ts
setup.ts
timezone.test.ts
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
  rounding: 'Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.',
  historyEmpty:
… [21,595 more characters not shown; see raw/]
```

- **Bash**

```bash
sed -n 1,40p src/domain/loan.property.test.ts && grep -n "10.8" -B3 -A45 e2e/s10-schedule.spec.ts | head -120 && grep -n "contrast\|selectOption\|use(" e2e/s06-theme.spec.ts | head -20 && sed -n 1,30p e2e/s05-mobile.spec.ts && tail -8 docs/process/manual-test-checklist.md && cat playwright.config.ts && grep -n "AC-\|test" scripts/trace.mjs | head -40; cat src/domain/format.ts | head -20; ls src/domain; sed -n 1,15p src/domain/format.test.ts
```

  Result:
```
import fc from 'fast-check'
import { beforeAll, describe, it } from 'vitest'
import { Decimal } from './money'
import { calculateLoan } from './loan'
import { validateInputs } from './validate'
import { rowAt } from '../../test/helpers'
import type { CalculatedLoan, Unit } from './types'

const SEED = 20261017
const RUNS = 1000
const TIMEOUT = 600_000

/**
 * A generated loan, described by integers only: cents, basis points of a percent, months.
 * Cents is a bigint because the largest amount, 10^15, is 10^17 cents (above 2^53).
 */
interface Case {
  cents: bigint
  bps: number
  months: number
  /** Use the years field when months is a multiple of 12 (and this flag is set). */
  asYears: boolean
}

const AMOUNT_MIN_CENTS = 1_000n // 10.00
const AMOUNT_MAX_CENTS = 100_000_000_000_000_000n // 1,000,000,000,000,000.00
const RATE_MAX_BPS = 7_500 // 75.00%
const MONTHS_MAX = 1_200

// D-38 / D-54: at least a quarter of runs draw from the corner where rounding errors are largest.
const cornerCase = fc.record({
  cents: fc.bigInt({ min: AMOUNT_MIN_CENTS, max: 2_000_000n }), // 10 to 20,000
  bps: fc.integer({ min: 4_500, max: RATE_MAX_BPS }), // 45% to 75%
  months: fc.integer({ min: 900, max: MONTHS_MAX }),
  asYears: fc.boolean(),
})

// Every exact bound (and each combination of bounds) appears.
const boundCase = fc.record({
  cents: fc.constantFrom(AMOUNT_MIN_CENTS, AMOUNT_MAX_CENTS),
93-    await expect(scheduleTable(page).getByRole('row')).toHaveCount(4)
94-  })
95-
96:  test('[AC-10.8] L-MAX shows all 1,200 rows within 1 second of Calculate (timed in the page)', async ({
97-    page,
98-  }) => {
99-    await page.getByLabel(/^Loan amount/).fill(LOANS.MAX.amount)
100-    await page.getByLabel('Annual interest rate (%)', { exact: true }).fill(LOANS.MAX.rate)
101-    await page.getByLabel('Loan tenure', { exact: true }).fill(LOANS.MAX.tenure)
102-    await expect(calcBtn(page)).toBeEnabled()
103-
104-    const elapsed = await page.evaluate(
105-      () =>
106-        new Promise<number>((resolve, reject) => {
107-          const button = Array.from(document.querySelectorAll('button')).find(
108-            (b) => (b.textContent ?? '').trim() === 'Calculate',
109-          )
110-          if (!button) {
111-            reject(new Error('Calculate button not found'))
112-            return
113-          }
114-          // header row + 1,200 data rows
115-          const done = () => document.querySelectorAll('table tr').length >= 1201
116-          const ob
… [8,278 more characters not shown; see raw/]
```

- **Bash**

```bash
cat test/helpers.ts | head -60; sed -n 75,115p e2e/s06-theme.spec.ts; grep -n "surface" -r src/ui/*.css | head -5; sed -n 95,135p src/domain/loan.property.test.ts
```

  Result:
```
// Shared helpers for domain tests. Not a test file. Uses only the spec §3.1.1 API.
import { calculateLoan } from '../src/domain/loan'
import { validateInputs } from '../src/domain/validate'
import type { CalculatedLoan, LoanInput, RawInputs, ScheduleRow, Unit } from '../src/domain/types'

export function raw(amount: string, rate: string, tenure: string, unit: Unit = 'years'): RawInputs {
  return { amount, rate, tenure, unit }
}

/** Obtain a LoanInput only through validateInputs; fails loudly if the inputs are rejected. */
export function inputOf(
  amount: string,
  rate: string,
  tenure: string,
  unit: Unit = 'years',
): LoanInput {
  const result = validateInputs(raw(amount, rate, tenure, unit))
  if (!result.ok) {
    throw new Error(`Expected valid inputs, got errors ${JSON.stringify(result.errors)}`)
  }
  return result.value
}

export function calc(
  amount: string,
  rate: string,
  tenure: string,
  unit: Unit = 'years',
): CalculatedLoan {
  return calculateLoan(inputOf(amount, rate, tenure, unit))
}

/** A row as "month | payment | interest | principal | balance", 2 dp, no grouping. */
export function rowAt(loan: CalculatedLoan, index: number): ScheduleRow {
  const r = loan.rows[index]
  if (!r) throw new Error(`no schedule row at index ${index} (have ${loan.rows.length})`)
  return r
}

export function rowText(loan: CalculatedLoan, index: number): string {
  const r = rowAt(loan, index)
  return [
    r.month,
    r.payment.toFixed(2),
    r.interest.toFixed(2),
    r.principal.toFixed(2),
    r.balance.toFixed(2),
  ].join(' | ')
}
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
        '--text',
        '--text-muted',
        '--error',
        '--primary',
        '--on-primary',
      ])
      const pairs: [string, string][] = [
        ['--text', '--bg'],
        ['--text', '--surface'],
        ['--text-muted', '--bg'],
        ['--text-muted', '--surface'],
        ['--error', '--bg'],
        ['--error', '--surface'],
        ['--on-primary',
… [1,923 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -n "AC-4\.\|AC-9\.\|AC-7\." docs/user-stories.md | cut -c1-300; sed -n 1,25p e2e/s13-balance.spec.ts; ls reports 2>/dev/null; cat .gitignore | head
```

  Result:
```
118:- **AC-4.1** Given results for L-A are showing, when I change the loan amount, the rate or the tenure value, then the results summary and the schedule are hidden and I see `Your inputs have changed. Select Calculate to see updated results.`
119:- **AC-4.2** Given results for L-A are showing, when I change the tenure unit from **Years** to **Months**, then the behaviour is the same as AC-4.1, and the tenure field keeps the number `1` (it is not converted).
120:- **AC-4.3** Given the message from AC-4.1 is showing, when I Calculate with valid inputs, then results for the new inputs are shown and the message disappears.
121:- **AC-4.4** Given results are showing, when I change the currency or the theme, then the results stay visible (these settings do not change the calculation).
152:- **AC-7.1** Given a first visit, when the page loads, then **Currency** is `PKR (Rs)`, the loan amount label reads `Loan amount (Rs)`, and results for L-A show `Rs 88,848.79`.
153:- **AC-7.2** Given L-A results in PKR, when I select `USD ($)`, then every amount in the summary shows the `$` symbol (e.g. `$88,848.79`), the schedule headers show `($)`, the loan amount label reads `Loan amount ($)`, the numbers themselves are unchanged (no conversion), and the results stay vi
154:- **AC-7.3** Given I selected `USD ($)`, when I reload the page, then `USD ($)` is still selected.
155:- **AC-7.4** Given the currency control is visible, then the note `Changing currency changes the symbol only. Amounts are not converted.` is shown next to it.
156:- **AC-7.5** Given a saved calculation made in PKR, when I switch to USD, then that saved entry still shows its amounts in `Rs`.
175:- **AC-9.1** Given inputs, results and/or error messages are showing, when I select **Reset**, then all three inputs are empty, the unit returns to **Years**, results, schedule, stale-results message and error messages are removed, the results area shows `Enter your loan details and select Calcu
176:- **AC-9.2** Given currency `USD ($)`, theme `Dark` and two saved calculations, when I select **Reset**, then currency, theme and saved calculations are unchanged.
177:- **AC-9.3** Given an already empty form, when I select **Reset**, then the form stays empty and no error is shown.
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
  scheduleTable(page).get
… [644 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -n "formatPercent" -r src | head; sed -n 135,175p src/domain/loan.property.test.ts; cat vitest.config.ts
```

  Result:
```
src/domain/format.ts:32:export function formatPercent(_x: Decimal): string {
    )
  }
  const loan = calculateLoan(result.value)
  cache.set(key, loan)
  return loan
}

const HALF_UP = Decimal.ROUND_HALF_UP
const CENT = new Decimal('0.01')
const TWO_CENTS = new Decimal('0.02')
const rate = (c: Case) => new Decimal(rateText(c))
const principalAmount = (c: Case) => new Decimal(amountText(c))

function sum(values: Decimal[]) {
  return values.reduce((acc, v) => acc.plus(v), new Decimal(0))
}

/** Cheap assertion: the message is only built on failure (these run millions of times). */
function check(condition: boolean, message: () => string): void {
  if (!condition) throw new Error(message())
}

// Each checker throws a descriptive error on the first violation.
function checkRowCount(c: Case): void {
  const loan = loanFor(c)
  check(loan.rows.length === c.months, () => `${describeCase(c)}: ${loan.rows.length} rows`)
  loan.rows.forEach((r, i) => {
    check(r.month === i + 1, () => `${describeCase(c)}: row ${i} has month ${r.month}`)
  })
}

function checkPaymentSplit(c: Case): void {
  const loan = loanFor(c)
  let opening = principalAmount(c)
  for (const r of loan.rows) {
    check(
      r.payment.eq(r.interest.plus(r.principal)),
      () => `${describeCase(c)} month ${r.month}: payment != interest + principal`,
    )
    const expected = opening.mul(rate(c)).div(1200).toDecimalPlaces(2, HALF_UP)
    check(
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
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\format-percent.test.ts

```
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { formatPercent } from './format'

describe('formatPercent (spec 3.1.1, D-65)', () => {
  it.each([
    ['6.2', '6.2%'],
    ['0', '0.0%'],
    ['100', '100.0%'],
    ['12', '12.0%'],
    ['93.8', '93.8%'],
    ['34.4', '34.4%'],
    ['0.1', '0.1%'],
  ])('[SPEC-§3.1.1] formatPercent(%s) shows exactly 1 dp: %s', (input, expected) => {
    expect(formatPercent(new Decimal(input))).toBe(expected)
  })

  it.each([
    ['6.25', '6.3%'],
    ['6.24', '6.2%'],
    ['6.249', '6.2%'],
    ['0.05', '0.1%'],
    ['0.04', '0.0%'],
    ['34.35', '34.4%'],
    ['99.95', '100.0%'],
    ['99.949', '99.9%'],
    ['1.25', '1.3%'],
  ])('[SPEC-§3.1.1] formatPercent(%s) rounds half-up to 1 dp: %s', (input, expected) => {
    expect(formatPercent(new Decimal(input))).toBe(expected)
  })

  it('[SPEC-§3.1.1] never uses exponent notation, even for tiny values', () => {
    expect(formatPercent(new Decimal('0.0000001'))).toBe('0.0%')
  })

  it('[SPEC-§3.1.1] property: every tenth from 0.0 to 100.0 prints as whole.tenth%', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1000 }), (tenths) => {
        const whole = Math.floor(tenths / 10)
        const frac = tenths % 10
        return formatPercent(new Decimal(tenths).div(10)) === `${whole}.${frac}%`
      }),
      { seed: 20261017, numRuns: 1000 },
    )
  })
})
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\summary.test.ts

```
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { calculateLoan } from './loan'
import { validateInputs } from './validate'
import { costSplit, interestShare, yearlySummary } from './summary'
import { calc, rowAt } from '../../test/helpers'
import type { CalculatedLoan } from './types'

const SEED = 20261017
const RUNS = 1000
const TIMEOUT = 600_000

/** Reduces a YearRow to "year | months | interest | principal | balance", 2 dp, no grouping. */
function yearText(y: {
  year: number
  months: number
  interest: Decimal
  principal: Decimal
  balance: Decimal
}): string {
  return [
    y.year,
    y.months,
    y.interest.toFixed(2),
    y.principal.toFixed(2),
    y.balance.toFixed(2),
  ].join(' | ')
}

// ---------------------------------------------------------------------------
// costSplit
// ---------------------------------------------------------------------------
describe('costSplit (S-20)', () => {
  it('[AC-20.1] L-A: interest is 6.2% and the loan amount 93.8%', () => {
    const s = costSplit(calc('1000000', '12', '1'))
    expect(s.interestPercent.toFixed(1)).toBe('6.2')
    expect(s.loanPercent.toFixed(1)).toBe('93.8')
    expect(s.interestPercent.eq(new Decimal('6.2'))).toBe(true)
    expect(s.loanPercent.eq(new Decimal('93.8'))).toBe(true)
  })

  it('[AC-20.2] L-B: interest is 34.4% and the loan amount 65.6%', () => {
    const s = costSplit(calc('2500000', '18', '5'))
    expect(s.interestPercent.eq(new Decimal('34.4'))).toBe(true)
    expect(s.loanPercent.eq(new Decimal('65.6'))).toBe(true)
  })

  it('[AC-20.3] L-C (0%): interest is 0.0% and the loan amount 100.0%', () => {
    const s = costSplit(calc('120000', '0', '12', 'months'))
    expect(s.interestPercent.isZero()).toBe(true)
    expect(s.loanPercent.eq(new Decimal('100'))).toBe(true)
  })

  it('[SPEC-§3.1.1] L-D (1 month): interest is 0.8% and the loan amount 99.2%', () => {
    const s = costSplit(calc('100000', '10', '1', 'months'))
    expect(s.interestPercent.eq(new Decimal('0.8'))).toBe(true)
    expect(s.loanPercent.eq(new Decimal('99.2'))).toBe(true)
  })

  it('[SPEC-§3.1.1] rounds half-up to 1 dp at the tie (625 of 10,000 is 6.25 -> 6.3)', () => {
    const loan: CalculatedLoan = {
      ...calc('1000', '12', '1'),
      totalInterest: new Decimal('625'),
      totalPayable: new Decimal('10000'),
    }
    const s = costSplit(loan)
    expect(s.interestPercent.eq(new Decimal('6.3'))).toBe(true)
    expect(s.loanPercent.eq(new Decimal('93.7'))).toBe(true)
  })

  it('[SPEC-§3.1.1] a share just above half a tenth rounds up, just below rounds down', () => {
    const base = calc('1000', '12', '1')
    const up = costSplit({
      ...base,
      totalInterest: new Decimal('5'),
      totalPayable: new Decimal('10000'),
    })
    expect(up.interestPercent.eq(new Decimal('0.1'))).toBe(true)
    expect(up.loanPercent.eq(new Decimal('99.9'))).toBe(true)
    const down = costSplit({
      ...base,
  
… [10,782 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\format-percent.test.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\summary.test.ts (file state is current in your context — no need to Read it back)
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\visual-helpers.ts

```
// Helpers for the chart specs (S-19 to S-22; D-65, D-66). Imports only from ./fixtures, never from src/.
// Hover geometry follows D-66: item k of n sits at x = (k - 0.5) / n of the width of [data-hit-area].
import type { Locator, Page } from '@playwright/test'
import { box, expect, type Rgb } from './fixtures'

export const CHART_TITLES = [
  'Cost breakdown',
  'Balance over time',
  'Interest and principal in each payment',
  'Yearly summary',
] as const

/** Chart summary sentences (spec section 7), hard-coded for the reference loans. */
export const SUMMARY = {
  costA: 'Interest is 6.2% of the total amount payable.',
  costB: 'Interest is 34.4% of the total amount payable.',
  costC: 'Interest is 0.0% of the total amount payable.',
  costD: 'Interest is 0.8% of the total amount payable.',
  balanceA: 'The balance falls from Rs 1,000,000.00 to Rs 0.00 over 12 months.',
  balanceB: 'The balance falls from Rs 2,500,000.00 to Rs 0.00 over 60 months.',
  balanceD: 'The balance falls from Rs 100,000.00 to Rs 0.00 over 1 month.',
  makeupA: 'Interest is 11.3% of the first payment and 1.0% of the last.',
  makeupB: 'Interest is 59.1% of the first payment and 1.5% of the last.',
} as const

/** A chart figure, named by its figcaption (spec 8.3.1). */
export const figureNamed = (page: Page, summary: string): Locator =>
  page.getByRole('figure', { name: summary, exact: true })

export const allFigures = (page: Page): Locator => page.getByRole('figure')

/**
 * The yearly chart's caption is not fixed by the spec, so it is found by position: the four charts are
 * in the order cost, balance, make-up, yearly (spec 8.3.2).
 */
export const yearlyFigure = (page: Page): Locator => allFigures(page).nth(3)

export const yearlyTable = (page: Page): Locator =>
  page.getByRole('table', { name: 'Yearly summary' })

/** Integer cents -> "1,234.56" (independent of the app's formatter). */
export function fmtCents(c: bigint): string {
  const whole = (c / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${whole}.${String(c % 100n).padStart(2, '0')}`
}

/** Moves the pointer over item k of n inside the figure's [data-hit-area] (D-66). */
export async function hoverItem(figure: Locator, k: number, n: number): Promise<void> {
  const area = figure.locator('[data-hit-area]')
  await expect(area, 'the figure has exactly one [data-hit-area]').toHaveCount(1)
  const b = await box(area)
  await area.hover({ position: { x: ((k - 0.5) / n) * b.width, y: b.height / 2 } })
}

/** Hover item k of n and expect the single tooltip to read exactly `text`. */
export async function expectTooltip(
  page: Page,
  figure: Locator,
  k: number,
  n: number,
  text: string | RegExp,
): Promise<void> {
  await hoverItem(figure, k, n)
  await expect(page.getByRole('tooltip')).toHaveText(text)
}

/** Legend entries are HTML text; Principal must come before Interest (spec 8.3.2). */
export async function expectLegendPrincipalThenInterest(figure: Locator): Promise<void> {
  
… [4,654 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\visual-helpers.ts (file state is current in your context — no need to Read it back)
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s20-cost.spec.ts

```
import {
  allFigures,
  box,
  calculateLoan,
  contrast,
  expect,
  expectTheme,
  LOANS,
  open,
  pageOverflowX,
  readColourTokens,
  summary,
  test,
  themeSel,
} from './fixtures'
import {
  CHART_TITLES,
  figureNamed,
  over,
  readChartTextColours,
  readMarkColours,
  SUMMARY,
} from './visual-helpers'

const segmentShare = async (figure: import('@playwright/test').Locator) => {
  const loan = await box(figure.locator('[data-segment="loan"]'))
  const interestSeg = figure.locator('[data-segment="interest"]')
  const interestWidth = (await interestSeg.count()) === 0 ? 0 : (await box(interestSeg)).width
  return { loan: loan.width, interest: interestWidth }
}

test.describe('S-20 Cost breakdown', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-20.1] L-A shows the Cost breakdown bar with Loan amount and Interest parts and 6.2%', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText('Cost breakdown', { exact: true })).toBeVisible()
    const figure = figureNamed(page, SUMMARY.costA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.costA, { exact: true })).toBeVisible()
    await expect(figure.getByText('Loan amount', { exact: true }).first()).toBeVisible()
    await expect(figure.getByText('Interest', { exact: true }).first()).toBeVisible()
    await expect(figure.locator('[data-segment="loan"]')).toHaveCount(1)
    await expect(figure.locator('[data-segment="interest"]')).toHaveCount(1)
    const w = await segmentShare(figure)
    expect(w.loan).toBeGreaterThan(0)
    expect(w.interest).toBeGreaterThan(0)
  })

  test('[AC-20.2] L-B reads Interest is 34.4% of the total amount payable.', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    const figure = figureNamed(page, SUMMARY.costB)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.costB, { exact: true })).toBeVisible()
    const w = await segmentShare(figure)
    const loanPct = (100 * w.loan) / (w.loan + w.interest)
    expect(loanPct).toBeGreaterThanOrEqual(64.6)
    expect(loanPct).toBeLessThanOrEqual(66.6)
  })

  test('[AC-20.3] L-C (0%) reads 0.0% and the bar shows the loan amount only', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.C)
    const figure = figureNamed(page, SUMMARY.costC)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.costC, { exact: true })).toBeVisible()
    await expect(figure.locator('[data-segment="loan"]')).toHaveCount(1)
    const w = await segmentShare(figure)
    expect(w.loan, 'loan segment has width').toBeGreaterThan(20)
    expect(w.interest, 'no visible interest segment').toBeLessThan(0.5)
  })

  test('[AC-20.4] L-A: the loan-amount part takes 93.8% (+/- 1 point) of the bar width', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    const figure = figureNamed(page, SUMMARY.costA)
    await expect(figure.locator('[data-s
… [6,074 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s20-cost.spec.ts (file state is current in your context — no need to Read it back)
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s21-balance-chart.spec.ts

```
import {
  allFigures,
  amountIn,
  calcBtn,
  calculateLoan,
  currencySel,
  expect,
  LOANS,
  open,
  rateIn,
  tenureIn,
  test,
  unitSel,
} from './fixtures'
import { expectTooltip, figureNamed, SUMMARY } from './visual-helpers'

test.describe('S-21 Balance over time', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-21.1] L-A shows the Balance over time chart and its summary sentence', async ({
    page,
  }) => {
    await expect(page.getByText('Balance over time', { exact: true })).toHaveCount(0)
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText('Balance over time', { exact: true })).toBeVisible()
    const figure = figureNamed(page, SUMMARY.balanceA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.balanceA, { exact: true })).toBeVisible()
    await expect(figure.locator('[data-series="balance"]').first()).toBeVisible()
    await expect(figure.locator('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  test('[AC-21.2] L-A: hovering month 6 shows the tooltip "Month 6: Rs 514,921.05"', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectTooltip(
      page,
      figureNamed(page, SUMMARY.balanceA),
      6,
      12,
      'Month 6: Rs 514,921.05',
    )
  })

  test('[AC-21.3] L-MAX: the chart is shown and every chart plus the 1,200th row is in the DOM within 1 second of Calculate', async ({
    page,
  }) => {
    await amountIn(page).fill(LOANS.MAX.amount)
    await rateIn(page).fill(LOANS.MAX.rate)
    await tenureIn(page).fill(LOANS.MAX.tenure)
    await expect(calcBtn(page)).toBeEnabled()
    await expect(allFigures(page)).toHaveCount(0)

    const elapsed = await page.evaluate(
      () =>
        new Promise<number>((resolve, reject) => {
          const button = Array.from(document.querySelectorAll('button')).find(
            (b) => (b.textContent ?? '').trim() === 'Calculate',
          )
          if (!button) {
            reject(new Error('Calculate button not found'))
            return
          }
          // the schedule's 1,200th data row AND all four chart figures
          const done = () =>
            Array.from(document.querySelectorAll('table')).some(
              (t) => (t.tBodies[0]?.rows.length ?? 0) >= 1200,
            ) && document.querySelectorAll('figure').length >= 4
          const observer = new MutationObserver(() => {
            if (done()) {
              observer.disconnect()
              resolve(performance.now() - start)
            }
          })
          observer.observe(document.body, { childList: true, subtree: true })
          setTimeout(() => {
            observer.disconnect()
            reject(new Error('The 1,200th row and the four charts did not appear within 10 s'))
          }, 10_000)
          const start = performance.now()
          button.click()
          if (done()) {
            observer.disconnect()
            resolve(performance.now() - start
… [1,941 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s21-balance-chart.spec.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
python - <<'EOF'
p='e2e/s21-balance-chart.spec.ts'
s=open(p,encoding='utf-8').read()
a=s.index("    await expect(\n      figureNamed(page, 'The balance falls from Rs 1,000,000,000,000,000.00")
b=s.index("  test('[SPEC-§7] hovering month 1")
new="""    await expect(page.getByText('Balance over time', { exact: true })).toBeVisible()
    // {n} is a count: "1200" or "1,200" are both accepted (the spec does not say; see the report)
    await expect(
      allFigures(page).filter({
        hasText:
          /^The balance falls from Rs 1,000,000,000,000,000\\.00 to Rs 0\\.00 over 1,?200 months\\.$/,
      }),
    ).toHaveCount(1)
  })

"""
s=s[:a]+new+s[b:]
open(p,'w',encoding='utf-8').write(s)
EOF
```

  Result:
```
<stdin>:10: SyntaxWarning: invalid escape sequence '\.'
```

- **Bash**

```bash
sed -n 95,115p e2e/s21-balance-chart.spec.ts
```

  Result:
```
await expect(page.getByText('Balance over time', { exact: true })).toBeVisible()
    // {n} is a count: "1200" or "1,200" are both accepted (the spec does not say; see the report)
    await expect(
      allFigures(page).filter({
        hasText:
          /^The balance falls from Rs 1,000,000,000,000,000\.00 to Rs 0\.00 over 1,?200 months\.$/,
      }),
    ).toHaveCount(1)
  })

  test('[SPEC-§7] hovering month 1 and month 12 shows their balances', async ({ page }) => {
    await calculateLoan(page, LOANS.A)
    const figure = figureNamed(page, SUMMARY.balanceA)
    await expectTooltip(page, figure, 1, 12, 'Month 1: Rs 921,151.21')
    await expectTooltip(page, figure, 12, 12, 'Month 12: Rs 0.00')
  })

  test('[SPEC-§7] a 1-month loan says "over 1 month." (singular)', async ({ page }) => {
    await calculateLoan(page, LOANS.D)
    await expect(figureNamed(page, SUMMARY.balanceD)).toBeVisible()
  })
```

- **Bash**

```bash
sed -i 's#/^The balance falls from Rs 1,000,000,000,000,000\\.00 to Rs 0\\.00 over 1,?200 months\\.\$/#/The balance falls from Rs 1,000,000,000,000,000\\.00 to Rs 0\\.00 over 1,?200 months\\./#' e2e/s21-balance-chart.spec.ts && sed -n 98,101p e2e/s21-balance-chart.spec.ts
```

  Result:
```
allFigures(page).filter({
        hasText:
          /^The balance falls from Rs 1,000,000,000,000,000\.00 to Rs 0\.00 over 1,?200 months\.$/,
      }),
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s21-balance-chart.spec.ts

Replace:
```
/^The balance falls from Rs 1,000,000,000,000,000\.00 to Rs 0\.00 over 1,?200 months\.$/,
```
With:
```
/The balance falls from Rs 1,000,000,000,000,000\.00 to Rs 0\.00 over 1,?200 months\./,
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s21-balance-chart.spec.ts has been updated successfully.
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s22-makeup.spec.ts

```
import { calculateLoan, expect, LOANS, open, test } from './fixtures'
import {
  expectLegendPrincipalThenInterest,
  expectTooltip,
  figureNamed,
  SUMMARY,
} from './visual-helpers'

test.describe('S-22 Interest and principal in each payment', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-22.1] L-A shows the chart, a Principal then Interest legend, and 11.3% / 1.0%', async ({
    page,
  }) => {
    await expect(
      page.getByText('Interest and principal in each payment', { exact: true }),
    ).toHaveCount(0)
    await calculateLoan(page, LOANS.A)
    await expect(
      page.getByText('Interest and principal in each payment', { exact: true }),
    ).toBeVisible()
    const figure = figureNamed(page, SUMMARY.makeupA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.makeupA, { exact: true })).toBeVisible()
    await expectLegendPrincipalThenInterest(figure)
    await expect(figure.locator('[data-series="principal"]').first()).toBeVisible()
    await expect(figure.locator('[data-series="interest"]').first()).toBeVisible()
    await expect(figure.locator('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  test('[AC-22.2] L-B reads 59.1% of the first payment and 1.5% of the last', async ({ page }) => {
    await calculateLoan(page, LOANS.B)
    const figure = figureNamed(page, SUMMARY.makeupB)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.makeupB, { exact: true })).toBeVisible()
  })

  test('[AC-22.3] L-A: hovering month 1 shows "Month 1: principal Rs 78,848.79, interest Rs 10,000.00"', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectTooltip(
      page,
      figureNamed(page, SUMMARY.makeupA),
      1,
      12,
      'Month 1: principal Rs 78,848.79, interest Rs 10,000.00',
    )
  })

  test('[SPEC-§7] L-A: hovering month 12 shows the last payment split (spec 5.5 row 12)', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.A)
    await expectTooltip(
      page,
      figureNamed(page, SUMMARY.makeupA),
      12,
      12,
      'Month 12: principal Rs 87,969.09, interest Rs 879.69',
    )
  })

  test('[SPEC-§7] L-C (0%): zero interest in every payment', async ({ page }) => {
    await calculateLoan(page, LOANS.C)
    const figure = figureNamed(
      page,
      'Interest is 0.0% of the first payment and 0.0% of the last.',
    )
    await expect(figure).toBeVisible()
    await expectTooltip(page, figure, 1, 12, 'Month 1: principal Rs 10,000.00, interest Rs 0.00')
  })
})
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s19-yearly.spec.ts

```
import {
  allFigures,
  amountIn,
  calculateLoan,
  cents,
  currencySel,
  expect,
  LOANS,
  open,
  readSchedule,
  tenureIn,
  rateIn,
  test,
  unitSel,
  calcBtn,
} from './fixtures'
import {
  expectLegendPrincipalThenInterest,
  expectTooltip,
  fmtCents,
  yearlyFigure,
  yearlyTable,
} from './visual-helpers'

const COLUMNS = ['Year', 'Interest (Rs)', 'Principal (Rs)', 'Balance (Rs)']

/** All cells (th or td) of body row n (1-based) of the yearly table. */
const yearRow = (page: import('@playwright/test').Page, n: number) =>
  yearlyTable(page).getByRole('row').nth(n).locator('th, td')

test.describe('S-19 Yearly summary', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-19.1] L-B: 5 rows, each interest and principal equal the sums of the matching 12 monthly rows', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    await expect(page.getByRole('heading', { name: 'Yearly summary', level: 3 })).toBeVisible()
    // header row + 5 year rows
    await expect(yearlyTable(page).getByRole('row')).toHaveCount(6)
    const monthly = await readSchedule(page)
    expect(monthly).toHaveLength(60)
    for (let y = 0; y < 5; y++) {
      const group = monthly.slice(y * 12, y * 12 + 12)
      const interest = group.reduce((a, r) => a + cents(r[2] ?? ''), 0n)
      const principal = group.reduce((a, r) => a + cents(r[3] ?? ''), 0n)
      const balance = group[11]?.[4] ?? ''
      await expect(yearRow(page, y + 1)).toHaveText([
        String(y + 1),
        fmtCents(interest),
        fmtCents(principal),
        balance,
      ])
    }
  })

  test('[AC-19.2] L-B: columns Year, Interest (Rs), Principal (Rs), Balance (Rs); first and last rows read the reference figures', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    const table = yearlyTable(page)
    await expect(table.getByRole('columnheader')).toHaveText(COLUMNS)
    await expect(yearRow(page, 1)).toHaveText(['1', '422,945.63', '338,857.21', '2,161,142.79'])
    await expect(yearRow(page, 5)).toHaveText(['5', '69,355.47', '692,447.31', '0.00'])
  })

  test('[AC-19.3] 100000 at 10% for 18 months: 2 rows, the second reads 2 | 1,028.07 | 35,006.16 | 0.00', async ({
    page,
  }) => {
    await calculateLoan(page, { amount: '100000', rate: '10', tenure: '18', unit: 'Months' })
    await expect(yearlyTable(page).getByRole('row')).toHaveCount(3)
    await expect(yearRow(page, 2)).toHaveText(['2', '1,028.07', '35,006.16', '0.00'])
  })

  test('[AC-19.4] L-B: the yearly chart has a hover bar for each of the 5 years and a Principal then Interest legend', async ({
    page,
  }) => {
    await calculateLoan(page, LOANS.B)
    await expect(allFigures(page)).toHaveCount(4)
    const figure = yearlyFigure(page)
    await expect(figure).toBeVisible()
    await expectLegendPrincipalThenInterest(figure)
    await expect(figure.locator('[data-series="principal"]').first()).toBeVisible()
    await expect(figure.locator('[data-se
… [2,142 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s22-makeup.spec.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s19-yearly.spec.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
tail -c 200 docs/process/manual-test-checklist.md | od -c | tail -3; cat >> docs/process/manual-test-checklist.md <<'EOF'

## S-19 Yearly summary

- [ ] **AC-19.1** Calculate L-B (2500000, 18, 5 Years). Under **Yearly summary** there are 5 rows. Pick year 2 and add up the Interest column of schedule months 13 to 24 with a calculator: it equals the year 2 Interest. Do the same for Principal.
- [ ] **AC-19.2** L-B: the **Yearly summary** table has the columns `Year`, `Interest (Rs)`, `Principal (Rs)`, `Balance (Rs)`. The first row reads `1 | 422,945.63 | 338,857.21 | 2,161,142.79` and the last row reads `5 | 69,355.47 | 692,447.31 | 0.00`.
- [ ] **AC-19.3** Enter `100000`, `10`, `18`, unit **Months**, then Calculate. The yearly summary has 2 rows, and the second reads `2 | 1,028.07 | 35,006.16 | 0.00`.
- [ ] **AC-19.4** L-B: the yearly chart shows 5 stacked bars (one per year) and a legend naming **Principal** and **Interest**. Hover each bar: a tooltip appears reading `Year n: principal ..., interest ...`.

## S-20 Cost breakdown

- [ ] **AC-20.1** Calculate L-A. A **Cost breakdown** bar with two parts, **Loan amount** and **Interest**, appears, with the text `Interest is 6.2% of the total amount payable.`
- [ ] **AC-20.2** Calculate L-B: the text reads `Interest is 34.4% of the total amount payable.`
- [ ] **AC-20.3** Calculate L-C (120000, 0, 12 Months): the text reads `Interest is 0.0% of the total amount payable.` and the bar is all one colour (loan amount only).
- [ ] **AC-20.4** Calculate L-A: the loan-amount part fills about 93.8% of the bar (use a ruler or browser dev tools; within 1 percentage point).
- [ ] **AC-20.5** In **Light** and then **Dark** theme, with L-B calculated, all four charts are easy to see against the card: each bar, line and area is clearly distinguishable from the card background, and all chart text (titles, legend, axis labels, summary sentences) is easy to read.
- [ ] **AC-20.6** Make the browser window 360 px wide (dev tools device toolbar) and calculate L-MAX (1000000000000000, 75, 100 Years). There is no horizontal scroll bar on the page, and every chart stays inside the results card.

## S-21 Balance over time

- [ ] **AC-21.1** Calculate L-A. A **Balance over time** chart appears with the text `The balance falls from Rs 1,000,000.00 to Rs 0.00 over 12 months.`
- [ ] **AC-21.2** L-A: hover the pointer over month 6 of the chart (about the middle). A tooltip reads `Month 6: Rs 514,921.05`.
- [ ] **AC-21.3** Enter L-MAX and 
… [1,112 more characters not shown; see raw/]
```

  Result:
```
0000260   o   n   t   h   s       (   1   2   ,       6   0   ,       1
0000300   ,   2   0   0   )   .  \r  \n
0000310
[90me2e/visual-helpers.ts[39m 89ms (unchanged)
[90me2e/s19-yearly.spec.ts[39m 30ms (unchanged)
e2e/s20-cost.spec.ts 31ms
e2e/s21-balance-chart.spec.ts 10ms
e2e/s22-makeup.spec.ts 5ms
src/domain/summary.test.ts 37ms
[90msrc/domain/format-percent.test.ts[39m 4ms (unchanged)

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

e2e/s19-yearly.spec.ts(2,3): error TS2305: Module '"./fixtures"' has no exported member 'allFigures'.
e2e/s20-cost.spec.ts(2,3): error TS2305: Module '"./fixtures"' has no exported member 'allFigures'.
e2e/s21-balance-chart.spec.ts(2,3): error TS2305: Module '"./fixtures"' has no exported member 'allFigures'.
[This command modified 4 files you've previously read: e2e\s21-balance-chart.spec.ts, e2e\s20-cost.spec.ts, src\domain\summary.test.ts, e2e\s22-makeup.spec.ts. Call Read before editing.]
```

- **Bash**

```bash
for f in s19-yearly s20-cost s21-balance-chart; do sed -i '0,/^  allFigures,$/{/^  allFigures,$/d}' e2e/$f.spec.ts; sed -i '0,/^import {$/! {0,/^} from '"'"'.\/visual-helpers'"'"'/ s/^} from '"'"'.\/visual-helpers'"'"'/  allFigures,\n} from '"'"'.\/visual-helpers'"'"'/}' e2e/$f.spec.ts; done; head -30 e2e/s21-balance-chart.spec.ts
```

  Result:
```
import {
  amountIn,
  calcBtn,
  calculateLoan,
  currencySel,
  expect,
  LOANS,
  open,
  rateIn,
  tenureIn,
  test,
  unitSel,
} from './fixtures'
import { expectTooltip, figureNamed, SUMMARY } from './visual-helpers'

test.describe('S-21 Balance over time', () => {
  test.beforeEach(async ({ page }) => {
    await open(page)
  })

  test('[AC-21.1] L-A shows the Balance over time chart and its summary sentence', async ({
    page,
  }) => {
    await expect(page.getByText('Balance over time', { exact: true })).toHaveCount(0)
    await calculateLoan(page, LOANS.A)
    await expect(page.getByText('Balance over time', { exact: true })).toBeVisible()
    const figure = figureNamed(page, SUMMARY.balanceA)
    await expect(figure).toBeVisible()
    await expect(figure.getByText(SUMMARY.balanceA, { exact: true })).toBeVisible()
    await expect(figure.locator('[data-series="balance"]').first()).toBeVisible()
```

</details>

### 🤖 Claude · 2026-10-18 18:16 PKT

My sed was clumsy; I'll fix the imports by hand.

<details><summary>🔧 1 tool call(s): Bash</summary>

- **Bash**

```bash
sed -i "s#^import { expectTooltip, figureNamed, SUMMARY } from './visual-helpers'#import { allFigures, expectTooltip, figureNamed, SUMMARY } from './visual-helpers'#" e2e/s21-balance-chart.spec.ts && grep -n "allFigures" e2e/s19-yearly.spec.ts e2e/s20-cost.spec.ts | head -4; sed -n 1,30p e2e/s19-yearly.spec.ts; sed -n 1,25p e2e/s20-cost.spec.ts
```

  Result:
```
e2e/s19-yearly.spec.ts:22:  allFigures,
e2e/s19-yearly.spec.ts:81:    await expect(allFigures(page)).toHaveCount(4)
e2e/s20-cost.spec.ts:22:  allFigures,
e2e/s20-cost.spec.ts:97:      await expect(allFigures(page)).toHaveCount(4)
import {
  amountIn,
  calculateLoan,
  cents,
  currencySel,
  expect,
  LOANS,
  open,
  readSchedule,
  tenureIn,
  rateIn,
  test,
  unitSel,
  calcBtn,
} from './fixtures'
import {
  expectLegendPrincipalThenInterest,
  expectTooltip,
  fmtCents,
  yearlyFigure,
  yearlyTable,
  allFigures,
} from './visual-helpers'

const COLUMNS = ['Year', 'Interest (Rs)', 'Principal (Rs)', 'Balance (Rs)']

/** All cells (th or td) of body row n (1-based) of the yearly table. */
const yearRow = (page: import('@playwright/test').Page, n: number) =>
  yearlyTable(page).getByRole('row').nth(n).locator('th, td')

import {
  box,
  calculateLoan,
  contrast,
  expect,
  expectTheme,
  LOANS,
  open,
  pageOverflowX,
  readColourTokens,
  summary,
  test,
  themeSel,
} from './fixtures'
import {
  CHART_TITLES,
  figureNamed,
  over,
  readChartTextColours,
  readMarkColours,
  SUMMARY,
  allFigures,
} from './visual-helpers'

const segmentShare = async (figure: import('@playwright/test').Locator) => {
```

</details>

### 🤖 Claude · 2026-10-18 18:16 PKT

Fine. Now check everything and run vitest.

<details><summary>🔧 9 tool call(s): Bash ×8, SubagentHandback</summary>

- **Bash**

```bash
F="e2e/visual-helpers.ts e2e/s19-yearly.spec.ts e2e/s20-cost.spec.ts e2e/s21-balance-chart.spec.ts e2e/s22-makeup.spec.ts src/domain/summary.test.ts src/domain/format-percent.test.ts"; npx prettier --write $F >/dev/null; npx eslint $F --max-warnings 0 && echo ESLINT_OK; npx prettier --check $F docs/process/manual-test-checklist.md; npm run typecheck 2>&1 | tail -5; npx vitest run src/domain/summary.test.ts src/domain/format-percent.test.ts 2>&1 | grep -v "^$" | tail -80
```

  Result:
```
ESLINT_OK
Checking formatting...
All matched files use Prettier code style!

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

    255|     () => {
    256|       fc.assert(
       |          ^
    257|         fc.property(caseArb, (c) => {
    258|           const loan = loanFor(c)
Caused by: Error: NOT_IMPLEMENTED
 ❯ yearlySummary src/domain/summary.ts:30:9
 ❯ src/domain/summary.test.ts:259:25
 ❯ Property.predicate node_modules/fast-check/lib/fast-check.js:1355:99
 ❯ Property.run node_modules/fast-check/lib/fast-check.js:1324:24
 ❯ propertyExecution node_modules/fast-check/lib/fast-check.js:2549:23
 ❯ run node_modules/fast-check/lib/fast-check.js:2639:91
 ❯ runIt node_modules/fast-check/lib/fast-check.js:2542:15
 ❯ check node_modules/fast-check/lib/fast-check.js:2655:14
 ❯ Module.assert node_modules/fast-check/lib/fast-check.js:2660:14
 ❯ src/domain/summary.test.ts:256:10
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[21/48]⎯
 FAIL  |domain| src/domain/summary.test.ts > visual summaries: properties (>= 1,000 runs, seed 20261017) > [SPEC-§3.1.1] costSplit: the two percentages always sum to exactly 100.0 and stay within 0..100
Error: Property failed after 1 tests
{ seed: 20261017, path: "0:0:0:0:0", endOnFailure: true }
Counterexample: [{"cents":1000n,"bps":0,"months":1}]
Shrunk 4 time(s)
Hint: Enable verbose mode in order to have the list of all failing values encountered during the run
 ❯ buildError node_modules/fast-check/lib/fast-check.js:2469:16
 ❯ throwIfFailed node_modules/fast-check/lib/fast-check.js:2476:8
 ❯ reportRunDetails node_modules/fast-check/lib/fast-check.js:2492:14
 ❯ Module.assert node_modules/fast-check/lib/fast-check.js:2662:7
 ❯ src/domain/summary.test.ts:310:10
    308|     '[SPEC-§3.1.1] costSplit: the two percentages always sum to exactl…
    309|     () => {
    310|       fc.assert(
       |          ^
    311|         fc.property(caseArb, (c) => {
    312|           const s = costSplit(loanFor(c))
Caused by: Error: NOT_IMPLEMENTED
 ❯ costSplit src/domain/summary.ts:20:9
 ❯ src/domain/summary.test.ts:312:21
 ❯ Property.predicate node_modules/fast-check/lib/fast-check.js:1355:99
 ❯ Property.run node_modules/fast-check/lib/fast-check.js:1324:24
 ❯ propertyExecution node_modules/fast-check/lib/fast-check.js:2549:23
 ❯ run node_modules/fast-check/lib/fast-check.js:2639:91
 ❯ runIt node_modules/fast-check/lib/fast-check.js:2542:15
 ❯ check node_modules/fast-check/lib/fast-check.js:2655:14
 ❯ Module.assert node_modules/fast-check/lib/fast-check.js:2660:
… [1,958 more characters not shown; see raw/]
```

- **Bash**

```bash
npx vitest run src/domain/summary.test.ts src/domain/format-percent.test.ts 2>&1 | grep -E "^(Error|AssertionError|TypeError)|Caused by" | sort | uniq -c; netstat -ano | grep -c ":4173 "
```

  Result:
```
4 Caused by: Error: NOT_IMPLEMENTED
     19 Error: NOT_IMPLEMENTED
      4 Error: Property failed after 1 tests
0
```

- **Bash**

```bash
CI=1 timeout 580 npx playwright test e2e/s19-yearly.spec.ts e2e/s20-cost.spec.ts e2e/s21-balance-chart.spec.ts e2e/s22-makeup.spec.ts --project=chromium --reporter=list 2>&1 | tail -90
```

  Result:
```
- unexpected value "0"


       at visual-helpers.ts:50

      48 | export async function hoverItem(figure: Locator, k: number, n: number): Promise<void> {
      49 |   const area = figure.locator('[data-hit-area]')
    > 50 |   await expect(area, 'the figure has exactly one [data-hit-area]').toHaveCount(1)
         |                                                                    ^
      51 |   const b = await box(area)
      52 |   await area.hover({ position: { x: ((k - 0.5) / n) * b.width, y: b.height / 2 } })
      53 | }
        at hoverItem (C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\visual-helpers.ts:50:68)
        at expectTooltip (C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\visual-helpers.ts:63:9)
        at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s22-makeup.spec.ts:57:11

    Error Context: test-results\s22-makeup-S-22-Interest-a-f03b1-ment-split-spec-5-5-row-12--chromium\error-context.md

    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results\s22-makeup-S-22-Interest-a-f03b1-ment-split-spec-5-5-row-12--chromium\trace.zip
    Usage:

        npx playwright show-trace test-results\s22-makeup-S-22-Interest-a-f03b1-ment-split-spec-5-5-row-12--chromium\trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  30) [chromium] › e2e\s22-makeup.spec.ts:66:3 › S-22 Interest and principal in each payment › [SPEC-§7] L-C (0%): zero interest in every payment 

    Error: expect(locator).toBeVisible() failed

    Locator: getByRole('figure', { name: 'Interest is 0.0% of the first payment and 0.0% of the last.', exact: true })
    Expected: visible
    Timeout: 5000ms
    Error: element(s) not found

    Call log:
      - Expect "toBeVisible" getByRole('figure', { name: 'Interest is 0.0% of the first payment and 0.0% of the last.', exact: true }) with timeout 5000ms
      - waiting for getByRole('figure', { name: 'Interest is 0.0% of the first payment and 0.0% of the last.', exact: true })


      67 |     await calculateLoan(page, LOANS.C)
      68 |     const figure = figureNamed(page, 'Interest is 0.0% of the first payment and 0.0% of the last.')
    > 69 |     await expect(figure).toBeVisible()
         |                          ^
      70 |     await expectTooltip(page, figure, 1, 12, 'Month 1: principal Rs 10,000.00, interest Rs 0.00')
      71 |   })
      72 | })
        at C:\Users\ars
… [5,428 more characters not shown; see raw/]
```

- **Bash**

```bash
CI=1 timeout 580 npx playwright test e2e/s19-yearly.spec.ts e2e/s20-cost.spec.ts e2e/s21-balance-chart.spec.ts e2e/s22-makeup.spec.ts --project=chromium --reporter=list 2>&1 | grep -E "^\s+(Error|TimeoutError|TypeError|ReferenceError)|^\s+[0-9]+\) " | paste - - | sed 's/\s\+/ /g' | cut -c1-260
```

  Result:
```
1) [chromium] › e2e\s19-yearly.spec.ts:36:3 › S-19 Yearly summary › [AC-19.1] L-B: 5 rows, each interest and principal equal the sums of the matching 12 monthly rows Error: expect(locator).toBeVisible() failed
 Error: element(s) not found Error Context: test-results\s19-yearly-S-19-Yearly-sum-00daa-he-matching-12-monthly-rows-chromium\error-context.md
 2) [chromium] › e2e\s19-yearly.spec.ts:59:3 › S-19 Yearly summary › [AC-19.2] L-B: columns Year, Interest (Rs), Principal (Rs), Balance (Rs); first and last rows read the reference figures Error: expect(locator).toHaveText(expected) failed
 Error Context: test-results\s19-yearly-S-19-Yearly-sum-ae024--read-the-reference-figures-chromium\error-context.md 3) [chromium] › e2e\s19-yearly.spec.ts:69:3 › S-19 Yearly summary › [AC-19.3] 100000 at 10% for 18 months: 2 rows, the second reads 2 | 1,
 Error: expect(locator).toHaveCount(expected) failed Error Context: test-results\s19-yearly-S-19-Yearly-sum-574ff-s-2-1-028-07-35-006-16-0-00-chromium\error-context.md
 4) [chromium] › e2e\s19-yearly.spec.ts:77:3 › S-19 Yearly summary › [AC-19.4] L-B: the yearly chart has a hover bar for each of the 5 years and a Principal then Interest legend Error: expect(locator).toHaveCount(expected) failed
 Error Context: test-results\s19-yearly-S-19-Yearly-sum-b739e-ncipal-then-Interest-legend-chromium\error-context.md 5) [chromium] › e2e\s19-yearly.spec.ts:100:3 › S-19 Yearly summary › [SPEC-§7] L-B: the yearly tooltips for year 1 and year 5 carry the t
 Error: the figure has exactly one [data-hit-area] Error Context: test-results\s19-yearly-S-19-Yearly-sum-103c8-r-5-carry-the-table-figures-chromium\error-context.md
 6) [chromium] › e2e\s19-yearly.spec.ts:121:3 › S-19 Yearly summary › [SPEC-§7] USD: the yearly columns show ($) Error: expect(locator).toHaveText(expected) failed
 Error Context: test-results\s19-yearly-S-19-Yearly-sum-b2932-SD-the-yearly-columns-show--chromium\error-context.md 7) [chromium] › e2e\s19-yearly.spec.ts:132:3 › S-19 Yearly summary › [SPEC-§3.1.1] L-D (1 month) has a single yearly row of 1 month 
 Error: expect(locator).toHaveCount(expected) failed Error Context: test-results\s19-yearly-S-19-Yearly-sum-b6b33-ingle-yearly-row-of-1-month-chromium\error-context.md
 8) [chromium] › e2e\s19-yearly.spec.ts:138:3 › S-19 Yearly summary › [SPEC-§3.1.1] L-MAX has 100 yearly rows ending at year 100 with balance 0.00 Error: expect(locator).toHaveCount(expected) failed
 Error Context: test-results\s19-yearly-S-19-Yearly-
… [7,240 more characters not shown; see raw/]
```

- **Bash**

```bash
cat > e2e/zz-tmp.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
import { readMarkColours, readChartTextColours, hoverItem, over } from './visual-helpers'
test('tmp helpers', async ({ page }) => {
  await page.setContent(`<h3>Yearly summary</h3><figure><svg aria-hidden="true" width="300" height="100">
  <path data-series="principal" d="M0 0H10V10H0Z" fill="#336699"/>
  <path data-series="balance" d="M0 0L50 50" fill="none" stroke="oklch(50% 0.1 200)" stroke-width="2"/>
  <rect data-hit-area x="0" y="0" width="300" height="100" fill="transparent" onmousemove="document.getElementById('t').textContent=Math.round(event.offsetX)"/>
  <text x="5" y="50" fill="#222">axis</text></svg>
  <div data-series="loan" style="width:20px;height:5px;background:rgb(10,20,30)"></div><figcaption style="color:#444">cap</figcaption></figure><div id="t"></div>`)
  console.log(JSON.stringify(await readMarkColours(page)))
  console.log(JSON.stringify(await readChartTextColours(page, ['Yearly summary'])))
  await hoverItem(page.locator('figure'), 3, 4)
  console.log(await page.locator('#t').textContent())
  console.log(over([0,0,0,0.5],[255,255,255]))
  expect(1).toBe(1)
})
EOF
CI=1 npx playwright test e2e/zz-tmp.spec.ts --project=chromium --reporter=line 2>&1 | head -30; rm e2e/zz-tmp.spec.ts
```

  Result:
```
Running 1 test using 1 worker

[1/1] [chromium] › e2e\zz-tmp.spec.ts:3:1 › tmp helpers
[chromium] › e2e\zz-tmp.spec.ts:3:1 › tmp helpers
[{"series":"principal","tag":"path","rgba":[51,102,153,1]},{"series":"balance","tag":"path","rgba":[0,116,122,1]},{"series":"loan","tag":"div","rgba":[10,20,30,1]}]

[{"text":"axis","rgba":[34,34,34,1]},{"text":"cap","rgba":[68,68,68,1]},{"text":"Yearly summary","rgba":[0,0,0,1]}]

188

[ 128, 128, 128 ]

  1 passed (10.3s)
```

- **Bash**

```bash
netstat -ano | grep -c ":4173 "; CI=1 timeout 590 npx playwright test e2e/s19-yearly.spec.ts e2e/s20-cost.spec.ts e2e/s21-balance-chart.spec.ts e2e/s22-makeup.spec.ts --reporter=line 2>&1 | grep -E "^\s+[0-9]+ (failed|passed|skipped|did not)" ; CI=1 npx playwright test e2e/s19-yearly.spec.ts e2e/s20-cost.spec.ts e2e/s21-balance-chart.spec.ts e2e/s22-makeup.spec.ts --reporter=json 2>/dev/null | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);const c={};const w=(su)=>{(su.specs||[]).forEach(sp=>sp.tests.forEach(t=>{const k=t.projectName+":"+t.results.at(-1).status;c[k]=(c[k]||0)+1}));(su.suites||[]).forEach(w)};j.suites.forEach(w);console.log(c)})'; netstat -ano | grep -c ":4173 "
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: bbazdeye6). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bbazdeye6.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
npx vitest run 2>&1 | grep -E "Test Files|Tests |Duration"; npm run trace 2>&1 | tail -40
```

  Result:
```
⎯⎯⎯⎯⎯⎯ Failed Tests 48 ⎯⎯⎯⎯⎯⎯⎯
 Test Files  2 failed | 7 passed (9)
      Tests  48 failed | 297 passed (345)
   Duration  229.31s (tests 97%, transform 2%, import 1%)

> muhammad-arslan-calculator@0.0.0 trace
> node scripts/trace.mjs


Traceability: 3 roles, 11 jobs, 22 stories, 115 ACs, 27 test files

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
S-19   v1       Not implemented  4    4/4    
S-20   v1       Not implemented  6    6/6    
S-21   v1       Not implemented  3    3/3    
S-22   v1       Not implemented  3    3/3    

trace: OK
```

- **Bash**

```bash
cat "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/tasks/bbazdeye6.output"; netstat -ano | grep -c ":4173 "; cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; grep -c "it(\|test(" src/domain/summary.test.ts e2e/s19-yearly.spec.ts
```

  Result:
```
59
  90 failed
{ 'chromium:failed': 30, 'firefox:failed': 30, 'webkit:failed': 30 }
7

[exited with code 0]
0
src/domain/summary.test.ts:25
e2e/s19-yearly.spec.ts:8
```

- **SubagentHandback**

```json
{
 "message": "G3b visuals tests are written and all of them fail for the right reason. None passed early, and `npm run trace` shows every v1 AC tested (S-19 4/4, S-20 6/6, S-21 3/3, S-22 3/3).\n\n**Files (all new except the checklist append)**\n- `src/domain/summary.test.ts` and `src/domain/format-percent.test.ts`.\n- `e2e/visual-helpers.ts`, which imports only from `./fixtures`.\n- `e2e/s19-yearly.spec.ts`, `e2e/s20-cost.spec.ts`, `e2e/s21-balance-chart.spec.ts` and `e2e/s22-makeup.spec.ts`.\n- 16 lines appended to `docs/process/manual-test-checklist.md`, with new S-19 to S-22 sections. Existing lines are untouched.\n- I touched no existing test, fixture, config or `src/` non-test file.\n- eslint `--max-warnings 0`, prettier `--check` and `npm run typecheck` are clean on my files.\n\n**Tests per AC** (V = Vitest, E = Playwright; each E test runs in 3 browsers)\n\n| AC | Tests |\n|---|---|\n| 19.1 | V1, E1 (the yearly table is checked against sums of the schedule, in integer cents) |\n| 19.2 | V1, E1 |\n| 19.3 | V1, E1 |\n| 19.4 | E1 (five hover slots, plus a legend with Principal before Interest) |\n| 20.1 | V1, E1 |\n| 20.2 | V1, E1 |\n| 20.3 | V1, E1 |\n| 20.4 | E1 |\n| 20.5 | E2 (Light and Dark) |\n| 20.6 | E1 |\n| 21.1 | E1 |\n| 21.2 | E1 |\n| 21.3 | E1 |\n| 22.1 | V1, E1 |\n| 22.2 | V1, E1 |\n| 22.3 | E1 |\n\n- **Extra `[SPEC-§…]` Vitest cases** (three of them are property tests):\n  - `formatPercent` 1-dp and half-up cases, and a property test over every tenth from 0.
… [4,689 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

