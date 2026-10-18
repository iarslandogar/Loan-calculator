# Subagent 19: code-reviewer: Review visuals and sticky form

Subagent **`code-reviewer`**, task: *Review visuals and sticky form*. Started 2026-10-18 19:38 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 19:38 PKT

> Mini-gate review of the "visuals" change cycle (S-19 moved to v1, new S-20, S-21, S-22) plus the owner-requested sticky form. Read decision-log D-65 to D-69 and docs/process/proposal-visuals.md first; the spec sections are §3.1.1 (summary.ts API), §7 (chart.*, yearly.* copy), §8.3.1 (DOM contract incl. D-66 hooks), §8.3.2 (chart rules). Append a dated "Visuals" section to docs/process/review-findings.md (use Edit; keep earlier sections).
> 
> Commits since tag g3b-visuals-tests-approved: a5ee7e7 (domain), 0d9967c..0dc743a (copy, chart components in src/ui/components/charts/, ResultsPanel, theme.css chart tokens, app.css chart styles), a19ea7f (sticky form: one wrapper div `.layout-main` in App.tsx + CSS), 4333476 (D-68/D-69).
> 
> Run Playwright only with `CI=1` and never while anything else runs Playwright; leave nothing on port 4173.
> 
> 1. Gate: `CI=1 npm run verify` (developer: exit 0; Vitest 345/345; size 87.1 KB; E2E 543/543; trace OK). Reproduce; paste summary + exit code. If a WebKit 8 s click timeout appears, re-run that test alone (developer saw one such load-only flake in AC-2.16 on one run, 5/5 alone, next full run green) and report honestly.
> 2. Freeze: no change since `g3-tests-approved` beyond the authorised commits (749144e, 5751988, 16c8cc8, 04de524, 95259bc), and no change at all to the G3b test files since `g3b-visuals-tests-approved`.
> 3. Conformance:
>    - domain: exact Decimal; costSplit sums to 100.0; yearlySummary groups/sums; formatPercent; no money value ever becomes a JS number (the charts use `ratio()` → toNumber() only for pixel geometry, and percentages as flex weights — judge whether that honours CLAUDE.md's "money is never a JS number").
>    - copy character-for-character vs §7 (incl. D-67 yearly caption and the singular "over 1 month").
>    - accessibility: each chart `<figure>` named by its figcaption; SVG `aria-hidden`; legend in HTML; no colour-only meaning; no new tab stops (AC-8.1 unchanged); tooltips pointer-only with values also in tables — is that acceptable per §8.3.2?
>    - palette: verify the D-68 claims yourself — run the dataviz validator if you can find it, or compute contrast of `--chart-principal` / `--chart-interest` against `--surface` in both themes from the live computed tokens; also chart text contrast.
>    - performance: L-MAX with all charts — measure click → 1,200th row + 4 figures + next frame in each browser a few times.
>    - sticky form (D-69): at ≥ 769 × ≥ 820 it sticks and stops above Saved calculations; below 820 px tall it doesn't stick; nothing overlaps at any scroll position; focus moving into the form while scrolled (Shift+Tab from the schedule) brings the focused field into view and isn't hidden; the wrapper adds no semantics.
> 4. Exploratory: 1-month, 13-month, 0%, 75%, 10^15 and 1,200-month loans; currency switch with charts shown; theme switch with a tooltip open; hover at the far left/right edges (tooltip stays inside, no page overflow); 180 px (200% zoom) and 360 px; forced-colors emulation (are chart marks still distinguishable? report).
> 5. Code quality (Minor unless it risks wrong figures, crashes or an a11y failure).
> 
> Turn REAL defects into failing `[REVIEW-n]` tests in e2e/review/ (typecheck-clean); delete probes that found nothing. End with `BLOCKING FINDINGS: <count>`. Do not edit src/ or any frozen test.

<details><summary>🔧 26 tool call(s): Bash ×25, Monitor</summary>

- **Bash**

```bash
git status --short | head; git tag; git log --oneline g3b-visuals-tests-approved..HEAD; grep -n "D-6[5-9]" docs/spec/decision-log.md | head -20; tail -40 docs/process/review-findings.md; ls src/ui/components/charts e2e e2e/review
```

  Result:
```
g3-tests-approved
g3b-visuals-tests-approved
4333476 docs: record the visuals implementation (D-68) and the sticky form (D-69)
a19ea7f feat(S-5): sticky loan form beside the results on wide, tall windows (owner request, D-69)
0dc743a feat(S-19): yearly summary chart and table; charts placed in the results card; validated chart palette
323f1f3 feat(S-22): interest and principal in each payment chart
0f656e4 feat(S-21): balance over time chart
e30a41d feat(S-20): cost breakdown bar
fd97fa6 feat(S-21): shared chart geometry, legend, axis ends, tooltip and hover band (D-66, D-68)
0d9967c feat(S-20): chart and yearly-summary copy (spec §7, D-65, D-67)
a5ee7e7 feat(S-19): costSplit, interestShare, yearlySummary and formatPercent (spec §3.1.1, D-65; S-20, S-22)
81:| D-65 | Add four visuals: S-20, S-21, S-22 new; S-19 Backlog to v1 | Approved (owner), 2026-10-18 |
82:| D-66 | Chart test hooks: `data-hit-area`, `data-segment`, `data-series` | Approved (owner, G3b), 2026-10-18 |
83:| D-67 | G3b: visuals tests approved and frozen; three copy gaps closed; test-designer readings | Approved (owner, G3b), 2026-10-18 |
84:| D-68 | Visuals implementation choices and evidence | **Proposed**: owner to review at the visuals mini-gate |
85:| D-69 | Sticky loan form on wide, tall windows (owner request) | Approved (owner), 2026-10-18; implementation for review at the visuals mini-gate |
606:### D-65 Visuals: four charts in the results (owner, 2026-10-18)
619:### D-66 Chart test hooks (Proposed, owner to review at G3b)
623:### D-67 Gate G3b: visuals tests approved and frozen (owner, 2026-10-18)
628:- **Decision (owner, 2026-10-18):** "approved". G3b is approved, and the new tests are frozen from tag `g3b-visuals-tests-approved` under the same rules as D-12 and D-23. D-66 is approved.
645:### D-68 Visuals implementation (Proposed, owner to review at the visuals mini-gate)
647:2. **Geometry:** every chart uses one band layout. Item *k* of *n* spans [*k*/*n*, (*k*+1)/*n*] of the plot, centred where the D-66 hover hook expects it.
663:### D-69 Sticky loan form (owner request, 2026-10-18)

**Deviations (D-64), verified**
1. Removing `body { overflow-x: hidden }` is correct: `scrollWidth` equals `clientWidth` at 180, 360, 768 and 1280 in Chromium, Firefox and WebKit, including the L-MAX case (1200 rows, 999999999999999 at 75% for 100 years) at 180 and 360, with no figure clipped.
2. The empty `.field-error` keeps its `aria-live` paragraph. Hiding only the "!" icon is correct. The old 
… [3,717 more characters not shown; see raw/]
```

- **Bash**

```bash
(netstat -ano | grep 4173; true); (CI=1 npm run verify > $TEMP/verify.log 2>&1; echo EXIT $? >> $TEMP/verify.log) ; tail -30 $TEMP/verify.log
```

- **Bash**

```bash
sed -n 600,700p docs/spec/decision-log.md
```

  Result:
```
Command running in background with ID: b1bjc6dyl. Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\b1bjc6dyl.output. You will be notified when it completes — do not poll that file or sleep while waiting. Read the file only if the user asks for progress, or if you need a line it prints before you can go on, such as a server's ready line or port.
```

  Result:
```
- **Verification:** `CI=1 npm run verify` **exit 0**: Vitest 297 of 297; size 85.4 KB (CSS adds no JavaScript); E2E **453 of 453** across 3 browsers; `trace --results` OK. Page width equals viewport width at 1280, 360 and 180 px. Screenshots match the bundle's reference boards.
  - An earlier full run had 3 WebKit click timeouts (load); the same three tests passed 15 of 15 in isolation.
  - A first L-MAX render probe suggested WebKit was 3× slower. A fair alternating A/B (3 rounds, WebKit, same method) disproved it: redesign medians 126 / 172 / 135 ms against old CSS 188 / 162 / 142 ms, all far under 1 s. The first probe was measurement noise, and the claim is retracted.
- **Open observation:** the full E2E suite takes about 8.3 minutes against 5.5 before. The cause isn't established, and it isn't a failure.
- **Note for the owner:** the design's reference board shows `Rs 66,185.46` and `Rs 1,066,185.46` for L-A. Those are example numbers in a static picture; the correct figures, which the app shows and the tests check, are 66,185.45 and 1,066,185.45.

### D-65 Visuals: four charts in the results (owner, 2026-10-18)
- **Request:** the owner asked for "a few visuals (like charts, diagrams)" and chose all four offered: a cost split bar, balance over time, payment make-up over time, and a yearly summary chart plus table.
- **Decision:** approved as written in `docs/process/proposal-visuals.md`.
  - New stories **S-20** (R-1/J-2), **S-21** (R-3/J-8) and **S-22** (R-2/J-5). **S-19** moves from Backlog to v1, with AC-19.2 to AC-19.4 added (AC-19.1 unchanged).
  - New domain functions `costSplit`, `interestShare` and `yearlySummary` (spec §3.1.1), plus `formatPercent` (always 1 dp, half-up).
  - New copy in spec §7, chart rules in §8.3.2, and the DOM contract rows in §8.3.1.
- **Owner-approved edits to owner-only files:**
  - `docs/jobs-to-be-done.md`: the owner explicitly approved exactly four edits ("You make exactly those edits"): J-2 + S-20, J-5 + S-22, J-8 + S-21, and J-9's S-19 no longer "(backlog)".
  - `docs/user-stories.md`: the new stories and ACs, and S-19's scope.
- **Reference values:** computed independently with exact decimal arithmetic (spec §5.2), and cross-checked: L-B's yearly interest sums to AC-3.2's Rs 1,309,014.14, and its principal to Rs 2,500,000.00.
- **Process:** the `test-designer` writes the new tests (red), and the owner approves them, frozen under the tag `g3b-visuals-tests-approved`. Then implementation, `verify`, an independent re
… [7,967 more characters not shown; see raw/]
```

- **Bash**

```bash
git diff --stat g3b-visuals-tests-approved..HEAD -- e2e src/'**'/'*.test.*' test playwright.config.ts vitest.config.ts scripts/trace.mjs ; echo ---; git diff --stat g3-tests-approved..HEAD -- e2e test playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/' ':(glob)src/**/*.test.*' | tail -30; git log --oneline g3-tests-approved..HEAD -- e2e test playwright.config.ts vitest.config.ts scripts/trace.mjs ':(glob)src/**/*.test.*' ':!e2e/review/'
```

- **Bash**

```bash
cat src/domain/summary.ts; grep -n "formatPercent" -A25 src/domain/format.ts | head -60
```

  Result:
```
// Loan summaries for the visuals (spec §3.1.1, D-65). Pure, exact Decimal arithmetic.
import { Decimal } from './money'
import type { CalculatedLoan } from './types'

/** One calendar-free "year" of the schedule: 12 months, or fewer for the final group. */
export interface YearRow {
  year: number
  months: number
  interest: Decimal
  principal: Decimal
  /** Balance after the group's last month. */
  balance: Decimal
}

const HUNDRED = new Decimal(100)
const round1 = (x: Decimal) => x.toDecimalPlaces(1, Decimal.ROUND_HALF_UP)

/** interestPercent = 100 × totalInterest / totalPayable, half-up to 1 dp; loanPercent = 100 − it. */
export function costSplit(loan: CalculatedLoan): {
  interestPercent: Decimal
  loanPercent: Decimal
} {
  const interestPercent = round1(loan.totalInterest.times(HUNDRED).div(loan.totalPayable))
  // Derived by subtraction so the two parts always sum to exactly 100.0.
  return { interestPercent, loanPercent: HUNDRED.minus(interestPercent) }
}

/** 100 × interest / payment, half-up to 1 dp. */
export function interestShare(payment: Decimal, interest: Decimal): Decimal {
  if (payment.isZero()) return new Decimal(0) // unreachable for validated loans; never divide by 0
  return round1(interest.times(HUNDRED).div(payment))
}

/** Groups of 12 schedule rows (the last shorter if needed), with exact sums. */
export function yearlySummary(loan: CalculatedLoan): YearRow[] {
  const years: YearRow[] = []
  const zero = new Decimal(0)
  for (let start = 0; start < loan.rows.length; start += 12) {
    const group = loan.rows.slice(start, start + 12)
    const last = group[group.length - 1]
    if (!last) break
    years.push({
      year: years.length + 1,
      months: group.length,
      interest: group.reduce((sum, row) => sum.plus(row.interest), zero),
      principal: group.reduce((sum, row) => sum.plus(row.principal), zero),
      balance: last.balance,
    })
  }
  return years
}
32:export function formatPercent(x: Decimal): string {
33-  const rounded = x.toDecimalPlaces(1, Decimal.ROUND_HALF_UP)
34-  return `${rounded.isZero() ? '0.0' : rounded.toFixed(1)}%`
35-}
36-
37-/** Never exponent notation; -0 becomes 0. */
38-export function toCanonical(input: LoanInput): CanonicalInput {
39-  return {
40-    amount: plainDecimal(input.amount),
41-    rate: plainDecimal(input.annualRate),
42-    tenure: input.tenure,
43-    unit: input.unit,
44-  }
45-}
```

  Result:
```
---
 e2e/fixtures.ts                   |  53 +++---
 e2e/s01-calculate.spec.ts         |  10 +-
 e2e/s02-validation.spec.ts        |  28 +--
 e2e/s03-totals.spec.ts            |   8 +-
 e2e/s05-mobile.spec.ts            |   8 +-
 e2e/s08-keyboard.spec.ts          |  33 +++-
 e2e/s09-reset.spec.ts             |   4 +-
 e2e/s10-schedule.spec.ts          |  18 +-
 e2e/s11-history.spec.ts           |   2 +-
 e2e/s19-yearly.spec.ts            | 151 ++++++++++++++++
 e2e/s20-cost.spec.ts              | 216 +++++++++++++++++++++++
 e2e/s21-balance-chart.spec.ts     | 127 ++++++++++++++
 e2e/s22-makeup.spec.ts            |  72 ++++++++
 e2e/spec-rules.spec.ts            |   2 +-
 e2e/visual-helpers.ts             | 191 ++++++++++++++++++++
 src/domain/format-percent.test.ts |  47 +++++
 src/domain/format.test.ts         |  16 +-
 src/domain/loan.property.test.ts  | 104 ++++++-----
 src/domain/loan.test.ts           |  62 ++++---
 src/domain/summary.test.ts        | 360 ++++++++++++++++++++++++++++++++++++++
 src/domain/validate.test.ts       |  78 +++++----
 21 files changed, 1410 insertions(+), 180 deletions(-)
52f75ad test(D-65): E2E specs for S-19..S-22 visuals (G3b)
892d518 test(D-65): domain and property tests for costSplit, interestShare, yearlySummary, formatPercent (G3b)
95259bc test(S-8): AC-8.4 waits for keyboard scrolling to settle before each baseline (owner-approved, D-61)
04de524 test(S-8): portable AC-8.1 "Tab past the last control" check (owner-approved, D-59)
16c8cc8 test: update frozen tests to the D-54 limits and D-55 guarantee (owner-approved)
5751988 test(e2e): locate summary figures with getByLabel (owner-approved, D-48)
749144e test(S-9): fix AC-9.2 expected currency of USD-made entries (owner-approved, D-46)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/ui/components/charts && cat chartGeometry.ts ChartParts.tsx CostBreakdown.tsx
```

  Result:
```
// Shared chart geometry (spec §8.3.2, D-66, D-68). Every chart uses the same band layout:
// item k (0-based) of n occupies [k/n, (k+1)/n] of the plot width, so its centre is at
// (k + 0.5) / n, which is where the hover hook in the DOM contract expects it.
import { useState, type PointerEvent } from 'react'
import { Decimal } from '../../../domain/money'

/** The SVG plot is drawn in this viewBox and stretched to the card (preserveAspectRatio="none"). */
export const VIEW_W = 1000
export const VIEW_H = 100

/**
 * A dimensionless 0..1 ratio for drawing. Computed in Decimal; only the ratio (never a money
 * value) becomes a JS number, and only for pixel geometry (D-68).
 */
export function ratio(value: Decimal, max: Decimal): number {
  if (max.isZero()) return 0
  return value.div(max).toDecimalPlaces(6).toNumber()
}

/** y coordinate (0 = top) for a ratio of the plot height. */
const y = (r: number) => VIEW_H - r * VIEW_H

/**
 * One closed path: a stepped band between `bottom` and `top` ratios for every item.
 * Drawing all items as one path keeps 1,200 months to a single SVG element.
 */
export function stepBandPath(top: number[], bottom?: number[]): string {
  const n = top.length
  if (n === 0) return ''
  const w = VIEW_W / n
  const upper: string[] = []
  const lower: string[] = []
  for (let k = 0; k < n; k++) {
    const x0 = (k * w).toFixed(3)
    const x1 = ((k + 1) * w).toFixed(3)
    const t = y(top[k] ?? 0).toFixed(3)
    const b = y(bottom?.[k] ?? 0).toFixed(3)
    upper.push(`L${x0},${t}L${x1},${t}`)
    lower.unshift(`L${x1},${b}L${x0},${b}`)
  }
  const start = y(bottom?.[0] ?? 0).toFixed(3)
  return `M0,${start}${upper.join('')}${lower.join('')}Z`
}

/** One path of separate bars (one per item) between `bottom` and `top` ratios. */
export function barsPath(top: number[], bottom: number[], fill = 0.64): string {
  const n = top.length
  const band = VIEW_W / n
  const width = band * fill
  return top
    .map((t, k) => {
      const x = k * band + (band - width) / 2
      const yTop = y(t)
      const yBottom = y(bottom[k] ?? 0)
      const h = yBottom - yTop
      if (h <= 0) return ''
      return `M${x.toFixed(3)},${yTop.toFixed(3)}h${width.toFixed(3)}v${h.toFixed(3)}h${(-width).toFixed(3)}Z`
    })
    .join('')
}

/** The x position, as a percentage of the plot width, of the centre of item k of n. */
export const centrePercent = (k: number, n: number) => ((k + 0.5) / n) * 100

/** Pointer hover over the plot: which item (0-based) i
… [3,741 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/ui/components/charts && cat BalanceChart.tsx PaymentMakeupChart.tsx YearlySummary.tsx
```

  Result:
```
import { formatMoney } from '../../../domain/money'
import { Decimal } from '../../../domain/money'
import type { CalculatedLoan, Currency } from '../../../domain/types'
import { copy } from '../../copy'
import { AxisEnds, HoverBand, Tooltip } from './ChartParts'
import { VIEW_H, VIEW_W, groupCount, ratio, stepBandPath, useBandHover } from './chartGeometry'

/** S-21: the balance after each month, as one stepped area falling to zero. */
export function BalanceChart({ loan, currency }: { loan: CalculatedLoan; currency: Currency }) {
  const { rows, input } = loan
  const n = rows.length
  const { index, handlers } = useBandHover(n)
  const tops = rows.map((row) => ratio(row.balance, input.amount))
  const summary = copy.chart.balance.summary(
    formatMoney(input.amount, currency),
    formatMoney(new Decimal(0), currency),
    groupCount(n),
    n,
  )
  const hovered = index === null ? undefined : rows[index]
  return (
    <div className="chart-block">
      <h3 className="chart-title">{copy.chart.balance.title}</h3>
      <figure className="chart">
        <div className="chart-plot-wrap">
          <svg
            className="chart-plot"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            data-hit-area=""
            {...handlers}
          >
            <HoverBand index={index} count={n} />
            <path className="mark-principal" data-series="balance" d={stepBandPath(tops)} />
          </svg>
          <Tooltip index={index} count={n}>
            {hovered &&
              copy.chart.balance.tooltip(hovered.month, formatMoney(hovered.balance, currency))}
          </Tooltip>
        </div>
        <AxisEnds count={n} />
        <figcaption>{summary}</figcaption>
      </figure>
    </div>
  )
}
import { formatPercent } from '../../../domain/format'
import { formatMoney } from '../../../domain/money'
import { interestShare } from '../../../domain/summary'
import type { CalculatedLoan, Currency } from '../../../domain/types'
import { copy } from '../../copy'
import { AxisEnds, HoverBand, Legend, Tooltip } from './ChartParts'
import { VIEW_H, VIEW_W, ratio, stepBandPath, useBandHover } from './chartGeometry'

/** S-22: each payment stacked as principal (bottom) and interest (top). */
export function PaymentMakeupChart({
  loan,
  currency,
}: {
  loan: CalculatedLoan
  currency: Currency
}) {
  const { rows } = loan
  const n = rows.length
  const { index, handlers } = u
… [4,690 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/ui && cat components/ResultsPanel.tsx; grep -n "layout-main" -B3 -A8 App.tsx; grep -n "chart\|yearly" copy.ts | head -50
```

  Result:
```
import { useApp } from '../AppContext'
import { copy } from '../copy'
import { BalanceChart } from './charts/BalanceChart'
import { CostBreakdown } from './charts/CostBreakdown'
import { PaymentMakeupChart } from './charts/PaymentMakeupChart'
import { YearlySummary } from './charts/YearlySummary'
import { ResultsSummary } from './ResultsSummary'
import { RoundingNote } from './RoundingNote'
import { ScheduleTable } from './ScheduleTable'

export function ResultsPanel() {
  const { state } = useApp()
  const { results, settings } = state
  return (
    <section className="card results-card">
      {/* The idle and stale texts are announced politely when they appear (D-49). */}
      <div aria-live="polite">
        {results.status === 'idle' && <p className="status">{copy.results.idle}</p>}
        {/* status-stale lets the design make the stale state unmistakable (D-63, P1). */}
        {results.status === 'stale' && <p className="status status-stale">{copy.results.stale}</p>}
      </div>
      {results.status === 'shown' && (
        <>
          <ResultsSummary loan={results.loan} currency={settings.currency} />
          {results.loan.showRoundingNote && <RoundingNote />}
          {/* Spec §8.3.2 order: cost, balance, payment make-up, yearly, then the schedule. */}
          <CostBreakdown loan={results.loan} />
          <BalanceChart loan={results.loan} currency={settings.currency} />
          <PaymentMakeupChart loan={results.loan} currency={settings.currency} />
          <YearlySummary loan={results.loan} currency={settings.currency} />
          <ScheduleTable rows={results.loan.rows} currency={settings.currency} />
        </>
      )}
    </section>
  )
}
13-          <Header />
14-          <main className="layout">
15-            {/* No semantics: bounds the sticky form to the form/results row (D-69). */}
16:            <div className="layout-main">
17-              <LoanForm />
18-              <ResultsPanel />
19-            </div>
20-            <HistoryPanel />
21-          </main>
22-        </div>
23-      </AppProvider>
24-    </ErrorBoundary>
86:  chart: {
109:  yearly: {
111:    chartCaption: 'Interest and principal paid each year.',
```

- **Bash**

```bash
sed -n 80,125p src/ui/copy.ts; grep -n "chart\.\|yearly\." docs/spec/technical-spec.md | head -60
```

  Result:
```
RATE_RANGE: 'Interest rate must be between 0 and 75%.',
    TENURE_REQUIRED: 'Enter a loan tenure.',
    TENURE_WHOLE: 'Loan tenure must be a whole number.',
    TENURE_RANGE_YEARS: 'Loan tenure must be between 1 and 100 years.',
    TENURE_RANGE_MONTHS: 'Loan tenure must be between 1 and 1,200 months.',
  } satisfies Record<ErrorCode, string>,
  chart: {
    cost: {
      title: 'Cost breakdown',
      summary: (pct: string) => `Interest is ${pct} of the total amount payable.`,
      loan: 'Loan amount',
      interest: 'Interest',
    },
    balance: {
      title: 'Balance over time',
      /** `months` is grouped text such as "1,200"; `count` picks month/months. */
      summary: (amount: string, zero: string, months: string, count: number) =>
        `The balance falls from ${amount} to ${zero} over ${months} ${count === 1 ? 'month' : 'months'}.`,
      tooltip: (month: number, balance: string) => `Month ${month}: ${balance}`,
    },
    makeup: {
      title: 'Interest and principal in each payment',
      summary: (first: string, last: string) =>
        `Interest is ${first} of the first payment and ${last} of the last.`,
      tooltip: (month: number, principal: string, interest: string) =>
        `Month ${month}: principal ${principal}, interest ${interest}`,
    },
    series: { principal: 'Principal', interest: 'Interest' },
  },
  yearly: {
    title: 'Yearly summary',
    chartCaption: 'Interest and principal paid each year.',
    cols: (currency: Currency) => {
      const s = `(${symbol(currency)})`
      return ['Year', `Interest ${s}`, `Principal ${s}`, `Balance ${s}`]
    },
    tooltip: (year: number, principal: string, interest: string) =>
      `Year ${year}: principal ${principal}, interest ${interest}`,
  },
  fatal: 'Something went wrong. Please reload the page.',
} as const
339:| chart.cost.title | `Cost breakdown` |
340:| chart.cost.summary | `Interest is {pct} of the total amount payable.` |
341:| chart.cost.loan / chart.cost.interest | `Loan amount` / `Interest` |
342:| chart.balance.title | `Balance over time` |
343:| chart.balance.summary | `The balance falls from {amount} to {zero} over {n} months.` (`{n} month` when n = 1; `{n}` grouped like `1,200`, D-67) |
344:| chart.balance.tooltip | `Month {k}: {balance}` |
345:| chart.makeup.title | `Interest and principal in each payment` |
346:| chart.makeup.summary | `Interest is {first} of the first payment and {last} of the last.` |
347:| chart.makeup.tooltip | `Month {k}: princ
… [781 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/ui && grep -n "chart\|cost-\|layout-main\|sticky\|yearly\|swatch" -n app.css | head -80; grep -n "chart" theme.css
```

  Result:
```
115:/* Form left, results right. The form/results row is its own box so the sticky form stops at
117:.layout-main {
142:    position: sticky;
438:  border-collapse: separate; /* keeps sticky header borders in all engines */
445:  position: sticky;
635:  .layout-main {
717:    position: sticky;
813:.chart-block {
818:.chart-title {
826:figure.chart {
835:.chart figcaption {
844:.chart-plot-wrap {
848:.chart-plot {
856:  fill: var(--chart-principal);
859:  fill: var(--chart-interest);
863:.chart-hover-band {
869:.chart-axis {
878:.chart-legend {
889:.chart-legend li {
895:.swatch {
900:.swatch-principal {
901:  background: var(--chart-principal);
903:.swatch-interest {
904:  background: var(--chart-interest);
908:.chart-tooltip {
926:.cost-bar {
931:.cost-segment {
937:.cost-segment[data-segment='loan'] {
938:  background: var(--chart-principal);
941:.cost-segment[data-segment='interest'] {
942:  background: var(--chart-interest);
945:.cost-segment:only-child {
950:.yearly-table {
958:.yearly-table th {
969:.yearly-table td {
975:.yearly-table th:first-child,
976:.yearly-table td:first-child {
979:.yearly-table tbody tr:nth-child(even) td {
984:  figure.chart {
987:  .chart-plot {
990:  .yearly-table th,
991:  .yearly-table td {
34:  /* chart series (D-68): validated with the dataviz validator against --surface #FFFFFF */
35:  --chart-principal: #6a50d3;
36:  --chart-interest: #c4512e;
79:  /* chart series (D-68): validated against --surface #201D2B */
80:  --chart-principal: #957eec;
81:  --chart-interest: #d4703c;
108:    --chart-principal: #957eec;
109:    --chart-interest: #d4703c;
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/ui && sed -n 105,160p app.css; sed -n 625,650p app.css; sed -n 700,730p app.css; sed -n 805,1010p app.css; grep -n "forced-colors" -A15 app.css | head -40
```

  Result:
```
}

/* ---------- 4. Layout ---------------------------------------------------- */

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6);
}

/* Form left, results right. The form/results row is its own box so the sticky form stops at
   the end of the results and never covers Saved calculations (D-69). */
.layout-main {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 6fr);
  gap: var(--space-6);
  align-items: start;
}

.card {
  min-width: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: var(--space-7);
  box-shadow: var(--shadow-card);
}

.history-card {
  grid-column: 1 / -1;
}

/* The form stays in view while the results scroll (owner request, D-69). Only side by side
   (≥ 769px) and only when the window is tall enough to show the whole form, so Calculate is
   never out of reach. It stops at the end of the results row, above Saved calculations. */
@media (min-width: 769px) and (min-height: 820px) {
  .form-card {
    position: sticky;
    top: var(--space-6);
  }
}

/* ---------- 5. Form ------------------------------------------------------ */

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
  min-width: 0;
}

label {
  font-size: 14px;
  font-weight: 650;
}
  box-shadow: none;
}

/* ---------- 11. Tablet + phone (≤ 768px) --------------------------------- */

@media (max-width: 768px) {
  .page {
    padding: 28px 24px 40px;
  }
  .layout,
  .layout-main {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }
  .history-card {
    grid-column: auto;
  }
  .card {
    padding: var(--space-6);
    border-radius: 26px;
  }
}

@media (max-width: 560px) {
  .page {
    padding: 20px 16px 32px;
    line-height: 1.25;
  }
  .figure.headline {
    padding: 18px 18px var(--space-5);
  }

  .schedule h2 {
    margin-top: var(--space-6);
  }
  .schedule th,
  .schedule td {
    padding-left: 14px;
    padding-right: 14px;
  }
  /* Month column stays put while the table scrolls sideways (proposal P3; pure CSS). */
  .schedule th:first-child,
  .schedule td:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }
  .schedule th:first-child {
    z-index: 3;
  }
  .schedule td:first-child {
    background: var(--surface);
    box-shadow: 1px 0 0 var(--border);
  }
  .schedule tbody tr:nth-child(even) td:first-child {
    background: var(--band);
  }
  color: var(--text);
  
… [3,754 more characters not shown; see raw/]
```

- **Bash**

```bash
sleep 240; tail -5 $TEMP/verify.log
```

  Result (error):
```
<tool_use_error>Blocked: sleep 240 followed by: tail -5 $TEMP/verify.log. To wait for a condition, use Monitor with an until-loop (e.g. `until <check>; do sleep 2; done`). To wait for a command you started, use run_in_background: true. Do not chain shorter sleeps to work around this block.</tool_use_error>
```

- **Bash**

```bash
sed -n 1,40p src/ui/theme.css | grep -n "surface\|text\|border" ; sed -n 60,100p src/ui/theme.css | grep -n "surface\|--text\|border"; find / -iname "*dataviz*" -not -path "*/node_modules/*" 2>/dev/null | head; ls .claude 2>/dev/null; ls docs/process
```

  Result:
```
12:  --surface: #ffffff; /* cards, inputs, dialog */
13:  --text: #2a2540; /* 13.3:1 bg · 14.6:1 surface */
14:  --text-muted: #5c5672; /*  6.3:1 bg ·  6.9:1 surface */
17:  --error: #a8324b; /*  5.9:1 bg ·  6.5:1 surface · 4.8:1 on rose */
18:  --border: #e6e0f1; /* decorative only */
19:  --input-border: #867e9e; /*  3.5:1 bg ·  3.8:1 surface */
20:  --focus: #6a50d3; /*  5.2:1 bg ·  5.7:1 surface */
34:  /* chart series (D-68): validated with the dataviz validator against --surface #FFFFFF */
1:  --text-muted: #b4adc9; /*  8.5:1 bg ·  7.7:1 surface */
4:  --error: #ff9db2; /*  9.3:1 bg ·  8.4:1 surface · 7.3:1 on rose */
5:  --border: #332e43;
6:  --input-border: #7f7699; /*  4.3:1 bg ·  3.9:1 surface */
7:  --focus: #c9b8f6; /* 10.1:1 bg ·  9.2:1 surface */
20:  /* chart series (D-68): validated against --surface #201D2B */
30:    --surface: #201d2b;
31:    --text: #eeeaf8;
32:    --text-muted: #b4adc9;
36:    --border: #332e43;
37:    --input-border: #7f7699;
/tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz
agents
loop-plan.md
manual-test-checklist.md
proposal-visuals.md
review-findings.md
```

- **Bash**

```bash
ls -R /tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz | head -30
```

  Result:
```
/tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz:
references
scripts

/tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz/references:
anti-patterns.md
choosing-a-form.md
color-formula.md
components.md
interaction.md
marks-and-anatomy.md
palette.md

/tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz/scripts:
validate_palette.js
validate_palette.py
```

- **Bash**

```bash
cd /tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz/scripts && head -50 validate_palette.js
```

  Result:
```
/**
 * Validate a categorical chart palette against the computable data-viz checks.
 *
 * Design-system-agnostic: feed it ANY palette's hex values plus the mode and
 * surface, and it computes - never eyeballs - the five checks that can be
 * measured from color alone:
 *
 *   2. Lightness band   - OKLCH L within the mode's band
 *   3. Chroma floor     - OKLCH C >= floor (below it a hue reads as gray)
 *   4. CVD separation   - OKLab Delta E (×100) between slots under simulated protan/deutan
 *                         (tritan reported); adjacent pairs by default, pairs:"all"
 *                         for scatter/bubble/maps
 *   4b. Normal-vision floor - worst OKLab Delta E (×100) on the active pairlist
 *       (adjacent by default; all pairs with --pairs all) under unsimulated vision;
 *                         full-color readers must be able to tell neighbors apart too
 *   5. Contrast vs surface - WCAG ratio of each mark against the chart surface
 *
 * Checks 1 (fixed hue order) and 6 (values are from the documented palette) are
 * structural rules the skill enforces, not measurable from hexes alone.
 *
 * Usage (node):
 *   node validate_palette.js "#2a78d6,#eb6834,#1baf7a,#eda100,#e87ba4,#008300,#6250d6,#e34948" --mode light
 *   node validate_palette.js "#256abf,#199e70,..." --mode dark --surface "#1a1a19"
 *   node validate_palette.js "#86b6ef,#5598e7,#256abf,#104281" --ordinal
 *
 * Usage (browser - as a module script):
 *   <body data-palette="#2a78d6,#eb6834,..." data-mode="light">
 *   <script type="module" src="validate_palette.js"></script>
 *   -> logs a console.table of the report and console.warn on any FAIL.
 *
 * Exit code 0 unless a check hard-FAILs; 1 on any FAIL. WARN bands do not fail:
 * adjacent CVD in the 6-8 floor band, and contrast in the sub-3:1 relief band,
 * are reported as WARNs and still exit 0 (each is legal only with mandatory
 * secondary encoding: direct labels, gaps, or texture). The normal-vision floor
 * is a hard gate: a worst unsimulated pair below 15 FAILs the run.
 */

// -- thresholds ----------------------------------------------------------------
const BAND = { light: [0.43, 0.77], dark: [0.48, 0.67] }; // OKLCH L
const CHROMA_FLOOR = 0.10; // OKLCH C
// Delta E is Euclidean distance in OKLab ×100. The CVD thresholds are calibrated to
// the Machado-Oliveira-Fernandes (2009) severity-1.0 simulation below - the sim
// model is part of the standard, not an implementat
… [572 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /tmp/claude/bundled-skills/2.1.301/52f7d127e17b9e02f0f34d025daca9c4/dataviz/scripts && node validate_palette.js "#6a50d3,#c4512e" --mode light --surface "#ffffff"; echo $?; node validate_palette.js "#957eec,#d4703c" --mode dark --surface "#201d2b"; echo $?
```

  Result:
```
Palette (light, surface #ffffff, categorical): 2 slots
  [PASS] Lightness band         all 2 inside L 0.43–0.77
  [PASS] Chroma floor           all 2 >= 0.1
  [PASS] CVD separation         worst adjacent #c4512e↔#6a50d3 ΔE 26.5 (protan) · tritan 25.8
  [PASS] Normal-vision floor    worst adjacent #c4512e↔#6a50d3 ΔE 29.0 (normal)
  [PASS] Contrast vs surface    all 2 >= 3:1

  → ALL CHECKS PASS  (CVD in the 6–8 floor band is legal ONLY with secondary encoding: direct labels, gaps, or texture)
  scope: categorical palettes only. For a lone status/text color check WCAG text contrast; for a sequential ramp, lightness monotonicity.

0

Palette (dark, surface #201d2b, categorical): 2 slots
  [PASS] Lightness band         all 2 inside L 0.48–0.67
  [PASS] Chroma floor           all 2 >= 0.1
  [PASS] CVD separation         worst adjacent #d4703c↔#957eec ΔE 25.5 (protan) · tritan 20.2
  [PASS] Normal-vision floor    worst adjacent #d4703c↔#957eec ΔE 25.5 (normal)
  [PASS] Contrast vs surface    all 2 >= 3:1

  → ALL CHECKS PASS  (CVD in the 6–8 floor band is legal ONLY with secondary encoding: direct labels, gaps, or texture)
  scope: categorical palettes only. For a lone status/text color check WCAG text contrast; for a sequential ramp, lightness monotonicity.

0
```

- **Monitor** · wait for verify

```json
{
 "command": "until grep -q \"^EXIT\" $TEMP/verify.log; do sleep 5; done; tail -25 $TEMP/verify.log",
 "timeout_ms": "900000",
 "persistent": "false",
 "description": "wait for verify"
}
```

  Result (error):
```
<tool_use_error>Error: No such tool available: Monitor. Monitor is not among the tools available here. Continue with the tools you have.</tool_use_error>
```

- **Bash**

```bash
until grep -q "^EXIT" $TEMP/verify.log 2>/dev/null; do sleep 5; done; tail -25 $TEMP/verify.log
```

  Result:
```
Command did not complete within its 600s timeout and was moved to the background (ID: bnox1eg2r). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bnox1eg2r.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
cat playwright.config.ts; sed -n 1,40p e2e/review/g45.spec.ts; sed -n 1,60p e2e/fixtures.ts; ls $TEMP/verify.log; tail -3 $TEMP/verify.log
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
// Reviewer tests for G4.5 (saved calculations). They fail until the findings are fixed.
import { test, expect } from '../fixtures'

const KEY = 'emi-calc.v1.history'
const mk = (id: string, createdAt: string) => ({
  id,
  createdAt,
  currency: 'PKR',
  input: { amount: '1000000', rate: '12', tenure: 1, unit: 'years' },
  monthlyPayment: '88848.79',
})

test('[REVIEW-1] if another tab empties the list while the Clear-all dialog is open, Cancel still leaves focus on a control', async ({
  page,
  context,
}) => {
  await page.goto('./')
  await page.evaluate(({ k, v }: { k: string; v: string }) => localStorage.setItem(k, v), {
    k: KEY,
    v: JSON.stringify([mk('a', '2026-10-17T10:00:00.000Z')]),
  })
  await page.reload()
  const [b] = await Promise.all([
    context.waitForEvent('page'),
    page.evaluate(() => {
      window.open('./')
    }),
  ])
  await b.waitForLoadState()
  await page.getByRole('button', { name: 'Clear all' }).click()
  await b.evaluate((k) => localStorage.removeItem(k), KEY)
  await expect(page.getByText('No saved calculations yet.')).toBeVisible()
  await page.getByRole('button', { name: 'Cancel' }).click()
  // Clear all is now disabled and cannot take focus; focus must not be dropped to <body>.
  await expect(page.locator('body')).not.toBeFocused()
  await expect(page.getByRole('heading', { name: 'Saved calculations'
… [3,536 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -n "failed\|flaky\|✘\|Test timeout\|passed\|Vitest\|Tests \|KB\|trace" $TEMP/verify.log | head -30; netstat -ano | grep 4173
```

  Result:
```
3:> npm run lint && npm run format:check && npm run typecheck && npm test && npm run build && npm run size && npm run test:e2e && npm run trace -- --results
48: Test Files  9 passed (9)
49:      Tests  345 passed (345)
72:  index-D01yfaX8.js  87.1 KB gzipped
73:size: 87.1 KB of 150 KB gzipped JS: OK
628:    Test timeout of 30000ms exceeded.
632:    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
633:    test-results\spec-rules-Spec-rules-§9-3-e1fe0-ng-the-cleared-entries-back-webkit\trace.zip
636:        npx playwright show-trace test-results\spec-rules-Spec-rules-§9-3-e1fe0-ng-the-cleared-entries-back-webkit\trace.zip
642:    Test timeout of 30000ms exceeded.
646:    attachment #2: trace (application/zip) ─────────────────────────────────────────────────────────
647:    test-results\spec-rules-Spec-rules-§9-3-61492-ewest-entry-as-just-re-read-webkit\trace.zip
650:        npx playwright show-trace test-results\spec-rules-Spec-rules-§9-3-61492-ewest-entry-as-just-re-read-webkit\trace.zip
654:  2 failed
657:  541 passed (9.9m)
```

- **Bash**

```bash
sed -n 612,656p $TEMP/verify.log | cut -c1-220; CI=1 npx playwright test e2e/spec-rules.spec.ts --project=webkit --grep "9.3" --repeat-each=5 2>&1 | tail -8; netstat -ano | grep 4173
```

  Result:
```
ok 531 [webkit] › e2e\spec-rules.spec.ts:261:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] Clear all in tab B empties tab A through the storage event (15.0s)
  ok 534 [webkit] › e2e\spec-rules.spec.ts:327:3 › Spec rules: §9.1 / §12.3 Safari-style blocked storage › [SPEC-§9.1] when every storage method throws, the unavailable message shows from the start (1.9s)
  ok 533 [webkit] › e2e\spec-rules.spec.ts:299:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] if a save fails, saved calculations are unavailable for the rest of the visit (5.2s)
  ok 537 [webkit] › e2e\spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Light: --input-border has 3:1 contrast on --bg and --surface (2.9s)
  ok 538 [webkit] › e2e\spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Dark: --input-border has 3:1 contrast on --bg and --surface (2.4s)
  ok 539 [webkit] › e2e\spec-rules.spec.ts:355:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§4] the three fields are text inputs with autocomplete off, never type=number (2.2s)
  ok 536 [webkit] › e2e\spec-rules.spec.ts:314:3 › Spec rules: §9.1 / §12.3 Safari-style blocked storage › [SPEC-§9.1] when reading window.localStorage throws, the app calculates and says history is unavailable 
  ok 535 [webkit] › e2e\spec-rules.spec.ts:285:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] if the focused entry is removed by another tab, focus moves to the heading (7.0s)
  ok 542 [webkit] › e2e\spec-rules.spec.ts:386:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator (2.6s)
  ok 541 [webkit] › e2e\spec-rules.spec.ts:378:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.3] error text sits in an aria-live polite container (3.9s)
  ok 540 [webkit] › e2e\spec-rules.spec.ts:365:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.2] the schedule region and table are named, scrollable by keyboard, with column scopes (6.4s)
  ok 543 [webkit] › e2e\spec-rules.spec.ts:396:3 › Spec rules: §11 NFR-3 and NFR-7 (no network, no cookies) › [SPEC-§11] after a calculation there are no further requests, no cookies (6.8s)


  1) [webkit] › e2e\spec-rules.spec.ts:177:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] after Clear all in tab B, a Calculate in tab A must not bring the cleared entries back 

    Test timeout of 30000ms exceeded.

    Error Context: test-results\spec-rules-Spec-rules-§9-3-e1fe0-ng-the-clea
… [2,488 more characters not shown; see raw/]
```

- **Bash**

```bash
CI=1 npx playwright test e2e/spec-rules.spec.ts --project=webkit --grep "9.3" --repeat-each=5 --workers=1 2>&1 | grep -v "^  *ok" | tail -15; netstat -ano | grep 4173
```

  Result:
```
Running 40 tests using 1 worker


  40 passed (4.3m)
  TCP    [::1]:4173             [::1]:54074            TIME_WAIT       0
  TCP    [::1]:4173             [::1]:54075            TIME_WAIT       0
```

- **Bash**

```bash
S=$(cygpath -u "$TEMP")/wt && rm -rf $S; git worktree add $S a5ee7e7^ >/dev/null 2>&1; cd $S && git log --oneline -1 && cmd //c "mklink /J node_modules C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\node_modules" && CI=1 npx playwright test e2e/spec-rules.spec.ts --project=webkit --grep "9.3" --repeat-each=5 2>&1 | grep -v "^  *ok" | tail -12; netstat -ano | grep LISTEN | grep 4173
```

  Result:
```
c62d9c2 docs(G3b): approve the visuals tests, close three copy gaps, record readings (D-66, D-67)
Junction created for node_modules <<===>> C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\node_modules

Running 40 tests using 4 workers


  40 passed (2.0m)
```

- **Bash**

```bash
CI=1 npx playwright test e2e/spec-rules.spec.ts --project=webkit --grep "9.3" --repeat-each=5 2>&1 | grep -v "^  *ok" | tail -12; netstat -ano | grep LISTEN | grep 4173
```

  Result:
```
Running 40 tests using 4 workers


  40 passed (2.0m)
```

- **Bash**

```bash
git worktree remove --force $(cygpath -u "$TEMP")/wt; git worktree prune; sed -n 60,140p e2e/fixtures.ts; sed -n 1,80p e2e/visual-helpers.ts
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
exp
… [3,021 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -n "export" e2e/fixtures.ts | sed -n 1,60p; grep -n "async function enter\|async function fill" -A22 e2e/fixtures.ts | head -60
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
… [2,510 more characters not shown; see raw/]
```

</details>

### 🤖 Claude · 2026-10-18 20:02 PKT

Probe 1: loans, text, tokens, geometry, overflow.

<details><summary>🔧 21 tool call(s): Bash ×16, Read ×3, Edit, SubagentHandback</summary>

- **Bash**

```bash
cat > e2e/review/probe1.spec.ts <<'EOF'
import { test, calculateLoan, open, themeSel, currencySel, expect, type LoanInputValues } from '../fixtures'

const loans: Record<string, LoanInputValues> = {
  m1: { amount: '100000', rate: '10', tenure: '1', unit: 'Months' },
  m13: { amount: '100000', rate: '10', tenure: '13', unit: 'Months' },
  z: { amount: '120000', rate: '0', tenure: '12', unit: 'Months' },
  r75: { amount: '1000000', rate: '75', tenure: '30', unit: 'Years' },
  big: { amount: '1000000000000000', rate: '12', tenure: '5', unit: 'Years' },
  max: { amount: '999999999999999', rate: '75', tenure: '100', unit: 'Years' },
  min: { amount: '10', rate: '75', tenure: '1', unit: 'Months' },
  lowint: { amount: '1000000000000000', rate: '0.01', tenure: '1200', unit: 'Months' },
}
for (const [name, loan] of Object.entries(loans)) {
  test(`probe ${name}`, async ({ page }) => {
    await open(page)
    await calculateLoan(page, loan)
    await page.waitForSelector('figure')
    const info = await page.evaluate(() => {
      const figs = [...document.querySelectorAll('figure')].map((f) => f.querySelector('figcaption')?.textContent)
      const segs = [...document.querySelectorAll('[data-segment]')].map((s) => (s as HTMLElement).getBoundingClientRect().width)
      const paths = [...document.querySelectorAll('svg path')].map((p) => ({ s: p.getAttribute('data-series'), len: (p.getAttribute('d') || '').length, nan: /NaN|Infinity/.test(p.getAttribute('d') || '') }))
      const rows = [...document.querySelectorAll('.yearly-table tbody tr')].map((r) => [...r.children].map((c) => c.textContent).join('|'))
      return { figs, segs, paths, nrows: rows.length, first: rows[0], last: rows[rows.length - 1], ow: document.documentElement.scrollWidth - document.documentElement.clientWidth }
    })
    console.log('PROBE', name, JSON.stringify(info))
  })
}
EOF
CI=1 npx playwright test e2e/review/probe1.spec.ts --project=chromium 2>&1 | grep -E "PROBE|passed|failed|Error" ; netstat -ano | grep LISTEN | grep 4173
```

  Result:
```
PROBE m13 {"figs":["Interest is 5.6% of the total amount payable.","The balance falls from Rs 100,000.00 to Rs 0.00 over 13 months.","Interest is 10.2% of the first payment and 0.8% of the last.","Interest and principal paid each year."],"segs":[532.046875,31.5625],"paths":[{"s":"balance","len":811,"nan":false},{"s":"principal","len":787,"nan":false},{"s":"interest","len":734,"nan":false},{"s":"principal","len":77,"nan":false},{"s":"interest","len":76,"nan":false}],"nrows":2,"first":"1|5,862.78|91,918.87|8,081.13","last":"2|67.34|8,081.13|0.00","ow":0}
PROBE m1 {"figs":["Interest is 0.8% of the total amount payable.","The balance falls from Rs 100,000.00 to Rs 0.00 over 1 month.","Interest is 0.8% of the first payment and 0.8% of the last.","Interest and principal paid each year."],"segs":[559.09375,4.515625],"paths":[{"s":"balance","len":73,"nan":false},{"s":"principal","len":69,"nan":false},{"s":"interest","len":63,"nan":false},{"s":"principal","len":39,"nan":false},{"s":"interest","len":38,"nan":false}],"nrows":1,"first":"1|833.33|100,000.00|0.00","last":"1|833.33|100,000.00|0.00","ow":0}
PROBE z {"figs":["Interest is 0.0% of the total amount payable.","The balance falls from Rs 120,000.00 to Rs 0.00 over 12 months.","Interest is 0.0% of the first payment and 0.0% of the last.","Interest and principal paid each year."],"segs":[565.609375],"paths":[{"s":"balance","len":749,"nan":false},{"s":"principal","len":725,"nan":false},{"s":"interest","len":675,"nan":false},{"s":"principal","len":40,"nan":false},{"s":"interest","len":0,"nan":false}],"nrows":1,"first":"1|0.00|120,000.00|0.00","last":"1|0.00|120,000.00|0.00","ow":0}
PROBE r75 {"figs":["Interest is 95.6% of the total amount payable.","The balance falls from Rs 1,000,000.00 to Rs 0.00 over 360 months.","Interest is 100.0% of the first payment and 5.9% of the last.","Interest and principal paid each year."],"segs":[24.796875,538.8125],"paths":[{"s":"balance","len":21535,"nan":false},{"s":"principal","len":22489,"nan":false},{"s":"interest","len":21049,"nan":false},{"s":"principal","len":746,"nan":false},{"s":"interest","len":1119,"nan":false}],"nrows":30,"first":"1|750,000.00|0.00|1,000,000.00","last":"30|233,117.48|516,882.58|0.00","ow":0}
PROBE min {"figs":["Interest is 5.9% of the total amount payable.","The balance falls from Rs 10.00 to Rs 0.00 over 1 month.","Interest is 5.9% of the first payment and 5.9% of the last.","Interest and principal paid each year."],"segs":[530.359375,33.25],"paths":[{"
… [2,223 more characters not shown; see raw/]
```

- **Bash**

```bash
cat > e2e/review/probe2.spec.ts <<'EOF'
import { test, calculateLoan, open, themeSel, currencySel, expect, LOANS, type LoanInputValues } from '../fixtures'

const MAX: LoanInputValues = { amount: '999999999999999', rate: '75', tenure: '100', unit: 'Years' }
const log = (...a: unknown[]) => console.log('PROBE', ...a)

test('tokens+text contrast', async ({ page }) => {
  await open(page)
  await calculateLoan(page, LOANS.B)
  for (const th of ['light', 'dark']) {
    await themeSel(page).selectOption({ label: th === 'light' ? 'Light' : 'Dark' })
    const r = await page.evaluate(() => {
      const cs = (e: Element) => getComputedStyle(e)
      const root = cs(document.documentElement)
      const fig = document.querySelector('figure.chart')!
      const caps = ['figcaption', '.chart-axis span', '.chart-legend li', '.chart-title', '.yearly-table th', '.yearly-table td'].map((s) => { const e = document.querySelector(s)!; return [s, cs(e).color, cs(e).backgroundColor] })
      return { p: root.getPropertyValue('--chart-principal'), i: root.getPropertyValue('--chart-interest'), surface: root.getPropertyValue('--surface'), figBg: cs(fig).backgroundColor, caps,
       fills: [...document.querySelectorAll('[data-series]')].map((e) => cs(e).fill || cs(e).backgroundColor) }
    })
    log(th, JSON.stringify(r))
  }
})

test('forced colors', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await open(page)
  await calculateLoan(page, LOANS.B)
  const r = await page.evaluate(() => [...document.querySelectorAll('[data-series]')].map((e) => { const c = getComputedStyle(e); return [e.getAttribute('data-series'), c.fill, c.stroke, c.backgroundColor, c.borderTopColor, c.borderTopWidth] }))
  log('forced', JSON.stringify(r))
  await page.locator('figure').first().screenshot({ path: 'test-results/forced-cost.png' })
  await page.locator('figure').nth(2).screenshot({ path: 'test-results/forced-makeup.png' })
})

test('edges tooltip', async ({ page }) => {
  for (const w of [1280, 360, 180]) {
    await page.setViewportSize({ width: w, height: 900 })
    await open(page)
    await calculateLoan(page, MAX)
    for (const idx of [1, 2, 3]) {
      const area = page.locator('figure').nth(idx).locator('[data-hit-area]')
      await area.scrollIntoViewIfNeeded()
      const b = (await area.boundingBox())!
      for (const fx of [0, 0.5, 0.999]) {
        await page.mouse.move(b.x + b.width * fx, b.y + b.height / 2)
        const t = page.getByRole('tool
… [569 more characters not shown; see raw/]
```

  Result:
```
PROBE light {"p":"#6a50d3","i":"#c4512e","surface":"#fff","figBg":"rgb(255, 255, 255)","caps":[["figcaption","rgb(42, 37, 64)","rgba(0, 0, 0, 0)"],[".chart-axis span","rgb(92, 86, 114)","rgba(0, 0, 0, 0)"],[".chart-legend li","rgb(42, 37, 64)","rgba(0, 0, 0, 0)"],[".chart-title","rgb(42, 37, 64)","rgba(0, 0, 0, 0)"],[".yearly-table th","rgb(92, 86, 114)","rgb(239, 234, 251)"],[".yearly-table td","rgb(42, 37, 64)","rgba(0, 0, 0, 0)"]],"fills":["rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(106, 80, 211)","rgb(106, 80, 211)","rgb(196, 81, 46)","rgb(106, 80, 211)","rgb(196, 81, 46)"]}
PROBE dark {"p":"#957eec","i":"#d4703c","surface":"#201d2b","figBg":"rgb(32, 29, 43)","caps":[["figcaption","rgb(238, 234, 248)","rgba(0, 0, 0, 0)"],[".chart-axis span","rgb(180, 173, 201)","rgba(0, 0, 0, 0)"],[".chart-legend li","rgb(238, 234, 248)","rgba(0, 0, 0, 0)"],[".chart-title","rgb(238, 234, 248)","rgba(0, 0, 0, 0)"],[".yearly-table th","rgb(180, 173, 201)","rgb(42, 38, 56)"],[".yearly-table td","rgb(238, 234, 248)","rgba(0, 0, 0, 0)"]],"fills":["rgb(0, 0, 0)","rgb(0, 0, 0)","rgb(149, 126, 236)","rgb(149, 126, 236)","rgb(212, 112, 60)","rgb(149, 126, 236)","rgb(212, 112, 60)"]}
PROBE forced [["loan","rgb(0, 0, 0)","none","rgb(255, 255, 255)","rgb(0, 0, 0)","0px"],["interest","rgb(0, 0, 0)","none","rgb(255, 255, 255)","rgb(0, 0, 0)","0px"],["balance","rgb(106, 80, 211)","none","rgba(0, 0, 0, 0)","rgb(0, 0, 0)","0px"],["principal","rgb(106, 80, 211)","none","rgba(0, 0, 0, 0)","rgb(0, 0, 0)","0px"],["interest","rgb(196, 81, 46)","none","rgba(0, 0, 0, 0)","rgb(0, 0, 0)","0px"],["principal","rgb(106, 80, 211)","none","rgba(0, 0, 0, 0)","rgb(0, 0, 0)","0px"],["interest","rgb(196, 81, 46)","none","rgba(0, 0, 0, 0)","rgb(0, 0, 0)","0px"]]
PROBE edge 1280 1 0 {"tl":0.13275146484375,"tr":-321.63287353515625,"tw":243.84375,"text":"Month 1: Rs 999,999,999,999,999.00","ow":0,"vw":1280}
PROBE edge 1280 1 0.5 {"tl":153.52496337890625,"tr":-153.28753662109375,"tw":258.796875,"text":"Month 601: Rs 999,999,999,999,998.96","ow":0,"vw":1280}
PROBE edge 1280 1 0.999 {"tl":405.8397216796875,"tr":-0.5196533203125,"tw":159.25,"text":"Month 1199: Rs 58,823,529,411,764.66","ow":0,"vw":1280}
PROBE edge 1280 2 0 {"tl":0.070068359375,"tr":-171.211181640625,"tw":394.328125,"text":"Month 1: principal Rs 0.00, interest Rs 62,499,999,999,999.94","ow":0,"vw":1280}
PROBE edge 1280 2 0.5 {"tl":141.62445068359375,"tr":-141.40679931640625,"tw":282.578125,"text":"Month 601: principal Rs 0.00, interest Rs 62,499,999,999,
… [3,909 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\test-results\forced-cost.png

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\test-results\\forced-cost.png"
}
```

  Result:
```
[image]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\test-results\forced-makeup.png

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\test-results\\forced-makeup.png"
}
```

  Result:
```
[image]
```

- **Bash**

```bash
cat > e2e/review/probe3.spec.ts <<'EOF'
import { test, calculateLoan, open, LOANS, type LoanInputValues } from '../fixtures'
const MAX: LoanInputValues = { amount: '999999999999999', rate: '75', tenure: '100', unit: 'Years' }
test('180 overflow', async ({ page }) => {
  for (const [name, loan] of [['B', LOANS.B], ['MAX', MAX]] as const) {
  await page.setViewportSize({ width: 180, height: 900 })
  await open(page)
  await calculateLoan(page, loan)
  const r = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth
    const bad = [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > vw + 1 && !e.closest('.schedule-scroll')).slice(0, 8).map((e) => `${e.tagName}.${(e as HTMLElement).className}:${Math.round(e.getBoundingClientRect().right)}`)
    return { ow: document.documentElement.scrollWidth - vw, bad }
  })
  console.log('PROBE', name, JSON.stringify(r))
  }
})
EOF
CI=1 npx playwright test e2e/review/probe3.spec.ts --project=chromium 2>&1 | grep -E "PROBE|passed|failed|Error"
```

  Result:
```
PROBE B {"ow":129,"bad":["TABLE.yearly-table:309","THEAD.:309","TR.:309","TH.:234","TH.:309","TBODY.:309","TR.:309","TD.:234"]}
PROBE MAX {"ow":129,"bad":["TABLE.yearly-table:309","THEAD.:309","TR.:309","TH.:234","TH.:309","TBODY.:309","TR.:309","TD.:234"]}
  1 passed (6.3s)
```

- **Bash**

```bash
grep -n "180\|200%\|horizontal" docs/user-stories.md | head -20; grep -n "overflow\|180" e2e/s05-mobile.spec.ts | head
```

  Result:
```
128:- **AC-5.1** Given a viewport 360 px wide, when the page loads and after I calculate L-MAX (1,200 schedule rows), then the page never scrolls horizontally (document width ≤ viewport width).
129:- **AC-5.2** Given a viewport 360 px wide, then every input, select and button is at least 44 × 44 CSS px, and its bounding box lies horizontally within the viewport (from 0 to 360 px).
256:- **AC-20.6** Given a viewport 360 px wide and L-MAX results, then the page does not scroll horizontally and every chart fits inside its card.
113:            const overflow = getComputedStyle(node).overflow
114:            if (overflow !== 'visible') return `${node.tagName} clips (overflow: ${overflow})`
119:        return style.textOverflow === 'ellipsis' ? 'text-overflow: ellipsis' : ''
```

- **Bash**

```bash
cat > e2e/review/probe4.spec.ts <<'EOF'
import { test, calculateLoan, open, themeSel, currencySel, amountIn, calcBtn, scheduleRegion, expect, LOANS, type LoanInputValues } from '../fixtures'
const MAX: LoanInputValues = { amount: '999999999999999', rate: '75', tenure: '100', unit: 'Years' }
const log = (...a: unknown[]) => console.log('PROBE', ...a)

for (const [w, h] of [[1280, 900], [1280, 800], [769, 820], [768, 900], [1280, 819]] as const) {
  test(`sticky ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h })
    await open(page)
    await calculateLoan(page, MAX)
    const out: unknown[] = []
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    for (const y of [0, 400, 1000, 2000, 4000, 8000, total]) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(50)
      out.push(await page.evaluate(() => {
        const f = document.querySelector('.form-card')!.getBoundingClientRect()
        const hcard = document.querySelector('.history-card')!.getBoundingClientRect()
        const res = document.querySelector('.results-card')!.getBoundingClientRect()
        return { sy: Math.round(scrollY), ft: Math.round(f.top), fb: Math.round(f.bottom), hist: Math.round(hcard.top), resb: Math.round(res.bottom), overlap: f.bottom > hcard.top + 0.5 && f.top < hcard.bottom, vh: innerHeight, pos: getComputedStyle(document.querySelector('.form-card')!).position }
      }))
    }
    log('sticky', w, h, JSON.stringify(out))
  })
}

test('focus from schedule via shift+tab when scrolled', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await open(page)
  await calculateLoan(page, MAX)
  await scheduleRegion(page).focus()
  await page.evaluate(() => window.scrollTo(0, 5000))
  await scheduleRegion(page).focus()
  for (let i = 0; i < 6; i++) await page.keyboard.press('Shift+Tab')
  const r = await page.evaluate(() => { const a = document.activeElement!; const b = a.getBoundingClientRect(); return { tag: a.tagName, id: (a as HTMLElement).id || (a as HTMLElement).textContent?.slice(0, 20), top: b.top, bottom: b.bottom, vh: innerHeight, covered: (() => { const e = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2); return e === a || a.contains(e) })() } })
  log('focus', JSON.stringify(r))
})

test('theme+currency with tooltip open', async ({ page }) => {
  await open(page)
  await calculateLoan(page, LOANS.B)
  const a
… [1,191 more characters not shown; see raw/]
```

  Result:
```
PROBE sticky 1280 900 [{"sy":0,"ft":139,"fb":683,"hist":6069,"resb":6045,"overlap":false,"vh":900,"pos":"sticky"},{"sy":400,"ft":24,"fb":568,"hist":5669,"resb":5645,"overlap":false,"vh":900,"pos":"sticky"},{"sy":1000,"ft":24,"fb":568,"hist":5069,"resb":5045,"overlap":false,"vh":900,"pos":"sticky"},{"sy":2000,"ft":24,"fb":568,"hist":4069,"resb":4045,"overlap":false,"vh":900,"pos":"sticky"},{"sy":4000,"ft":24,"fb":568,"hist":2069,"resb":2045,"overlap":false,"vh":900,"pos":"sticky"},{"sy":5582,"ft":-82,"fb":463,"hist":487,"resb":463,"overlap":false,"vh":900,"pos":"sticky"},{"sy":5582,"ft":-82,"fb":463,"hist":487,"resb":463,"overlap":false,"vh":900,"pos":"sticky"}]
PROBE sticky 769 820 [{"sy":0,"ft":216,"fb":839,"hist":10537,"resb":10513,"overlap":false,"vh":820,"pos":"sticky"},{"sy":400,"ft":24,"fb":647,"hist":10137,"resb":10113,"overlap":false,"vh":820,"pos":"sticky"},{"sy":1000,"ft":24,"fb":647,"hist":9537,"resb":9513,"overlap":false,"vh":820,"pos":"sticky"},{"sy":2000,"ft":24,"fb":647,"hist":8537,"resb":8513,"overlap":false,"vh":820,"pos":"sticky"},{"sy":4000,"ft":24,"fb":647,"hist":6537,"resb":6513,"overlap":false,"vh":820,"pos":"sticky"},{"sy":8000,"ft":24,"fb":647,"hist":2537,"resb":2513,"overlap":false,"vh":820,"pos":"sticky"},{"sy":10046,"ft":-156,"fb":467,"hist":491,"resb":467,"overlap":false,"vh":820,"pos":"sticky"}]
PROBE sticky 768 900 [{"sy":0,"ft":208,"fb":726,"hist":6605,"resb":6589,"overlap":false,"vh":900,"pos":"static"},{"sy":400,"ft":-192,"fb":326,"hist":6205,"resb":6189,"overlap":false,"vh":900,"pos":"static"},{"sy":1000,"ft":-792,"fb":-274,"hist":5605,"resb":5589,"overlap":false,"vh":900,"pos":"static"},{"sy":2000,"ft":-1792,"fb":-1274,"hist":4605,"resb":4589,"overlap":false,"vh":900,"pos":"static"},{"sy":4000,"ft":-3792,"fb":-3274,"hist":2605,"resb":2589,"overlap":false,"vh":900,"pos":"static"},{"sy":6011,"ft":-5803,"fb":-5285,"hist":594,"resb":578,"overlap":false,"vh":900,"pos":"static"},{"sy":6011,"ft":-5803,"fb":-5285,"hist":594,"resb":578,"overlap":false,"vh":900,"pos":"static"}]
PROBE sticky 1280 800 [{"sy":0,"ft":139,"fb":683,"hist":6069,"resb":6045,"overlap":false,"vh":800,"pos":"static"},{"sy":400,"ft":-261,"fb":283,"hist":5669,"resb":5645,"overlap":false,"vh":800,"pos":"static"},{"sy":1000,"ft":-861,"fb":-317,"hist":5069,"resb":5045,"overlap":false,"vh":800,"pos":"static"},{"sy":2000,"ft":-1861,"fb":-1317,"hist":4069,"resb":4045,"overlap":false,"vh":800,"pos":"static"},{"sy":4000,"ft":-3861,"fb":-3317,"hist":2069,"resb":2045,"ov
… [1,404 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -c "rem\b" src/ui/app.css; grep -n "font-size" src/ui/app.css | head -5; grep -n "html\|body" src/ui/app.css | head
```

  Result:
```
1
20:  font-size: 16px;
90:  font-size: 30px;
98:  font-size: 15px;
158:  font-size: 14px;
211:  font-size: 14px;
12:html {
17:body {
476:.schedule tbody tr:nth-child(even) td {
479:.schedule tbody tr:nth-child(12n) td {
482:.schedule tbody tr:last-child td {
485:.schedule tbody tr:last-child td:last-child {
728:  .schedule tbody tr:nth-child(even) td:first-child {
979:.yearly-table tbody tr:nth-child(even) td {
```

- **Bash**

```bash
cat > e2e/review/probe5.spec.ts <<'EOF'
import { test, calculateLoan, open, amountIn, rateIn, tenureIn, calcBtn, fillLoan, expect, type LoanInputValues } from '../fixtures'
const MAX: LoanInputValues = { amount: '999999999999999', rate: '75', tenure: '100', unit: 'Years' }
const log = (...a: unknown[]) => console.log('PROBE', ...a)

test('errors in sticky form 769x820', async ({ page }) => {
  await page.setViewportSize({ width: 769, height: 820 })
  await open(page)
  await amountIn(page).fill('abc'); await rateIn(page).fill('99.999'); await tenureIn(page).fill('1.5')
  await calcBtn(page).click()
  await page.waitForTimeout(100)
  const r = await page.evaluate(() => { const f = document.querySelector('.form-card')!.getBoundingClientRect(); const b = [...document.querySelectorAll('button')].find((x) => x.textContent === 'Calculate')!.getBoundingClientRect(); return { fb: f.bottom, ft: f.top, calcBottom: b.bottom, vh: innerHeight } })
  log('errs', JSON.stringify(r))
})

test('perf L-MAX', async ({ page, browserName }) => {
  await open(page)
  await fillLoan(page, MAX)
  const times: number[] = []
  for (let i = 0; i < 4; i++) {
    const t = await page.evaluate(async () => {
      const btn = [...document.querySelectorAll('button')].find((x) => x.textContent === 'Calculate') as HTMLElement
      const t0 = performance.now()
      btn.click()
      await new Promise<void>((res) => {
        const chk = () => { if (document.querySelectorAll('figure').length === 4 && document.querySelectorAll('.schedule tbody tr').length === 1200) requestAnimationFrame(() => requestAnimationFrame(() => res())); else requestAnimationFrame(chk) }
        chk()
      })
      return performance.now() - t0
    })
    times.push(Math.round(t))
    // force a recalculation next round: edit then recalc
    await rateIn(page).fill(i % 2 ? '75' : '74')
  }
  log('perf', browserName, JSON.stringify(times))
})

test('forced colors other engines', async ({ page, browserName }) => {
  await page.emulateMedia({ forcedColors: 'active' })
  await open(page)
  await fillLoan(page, { amount: '2500000', rate: '18', tenure: '5', unit: 'Years' })
  await calcBtn(page).click()
  const r = await page.evaluate(() => [...document.querySelectorAll('[data-series]')].map((e) => { const c = getComputedStyle(e); return [e.getAttribute('data-series'), c.fill, c.backgroundColor] }))
  const sw = await page.evaluate(() => [...document.querySelectorAll('.swatch')].map((e) => getComputedStyle(e).backgroundCo
… [1,052 more characters not shown; see raw/]
```

  Result:
```
PROBE errs {"fb":1008.578125,"ft":216,"calcBottom":919.578125,"vh":820}
PROBE perf chromium [157,145,115,125]
PROBE forced chromium [["loan","rgb(0, 0, 0)","rgb(255, 255, 255)"],["interest","rgb(0, 0, 0)","rgb(255, 255, 255)"],["balance","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["principal","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["interest","rgb(196, 81, 46)","rgba(0, 0, 0, 0)"],["principal","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["interest","rgb(196, 81, 46)","rgba(0, 0, 0, 0)"]] ["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"]
PROBE edges chromium [[0,-16,0],[101,0,0],[0,0,0],[97,0,0],[0,-1,0],[89,0,0]]
  4 passed (9.9s)
PROBE errs {"fb":1008.7000122070312,"ft":216,"calcBottom":919.7000122070312,"vh":820}
PROBE perf firefox [138,117,106,137]
PROBE forced firefox [["loan","rgb(0, 0, 0)","rgb(255, 255, 255)"],["interest","rgb(0, 0, 0)","rgb(255, 255, 255)"],["balance","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["principal","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["interest","rgb(196, 81, 46)","rgba(0, 0, 0, 0)"],["principal","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["interest","rgb(196, 81, 46)","rgba(0, 0, 0, 0)"]] ["rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)","rgb(255, 255, 255)"]
PROBE edges firefox [[0,-16,0],[93,0,0],[0,0,0],[97,0,0],[0,-1,0],[89,0,0]]
  4 passed (22.1s)
PROBE errs {"fb":1008.578125,"ft":216,"calcBottom":919.578125,"vh":820}
PROBE perf webkit [450,345,294,341]
PROBE forced webkit [["loan","rgb(0, 0, 0)","rgb(106, 80, 211)"],["interest","rgb(0, 0, 0)","rgb(196, 81, 46)"],["balance","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["principal","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["interest","rgb(196, 81, 46)","rgba(0, 0, 0, 0)"],["principal","rgb(106, 80, 211)","rgba(0, 0, 0, 0)"],["interest","rgb(196, 81, 46)","rgba(0, 0, 0, 0)"]] ["rgb(106, 80, 211)","rgb(196, 81, 46)","rgb(106, 80, 211)","rgb(196, 81, 46)","rgb(106, 80, 211)","rgb(196, 81, 46)"]
PROBE edges webkit [[0,-16,0],[93,0,0],[0,0,0],[97,-1,0],[0,-1,0],[89,-1,0]]
  4 passed (14.7s)
```

- **Bash**

```bash
sed -n 398,450p docs/spec/technical-spec.md
```

  Result:
```
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

### 8.4 Theme

Resolved theme = the user's choice, or `prefers-color-scheme` when set to `system`. Apply it as `data-theme="light|dark"` on `<html>`. A tiny inline script in `index.html` applies the saved theme before first paint (wrapped in try/catch) so there is no flash of the wrong theme. Listen for `matchMedia('(prefers-color-scheme: dark)')` changes while `system` is selected.

Starting tokens. Tests must prove ≥ 4.5:1 for these text pa
… [1,627 more characters not shown; see raw/]
```

- **Bash**

```bash
node -e '
const L=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const r=(a,b)=>{const x=L(a),y=L(b);return ((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2)};
console.log("light",r("#6a50d3","#ffffff"),r("#c4512e","#ffffff"),r("#5c5672","#ffffff"),r("#2a2540","#ffffff"));
console.log("dark",r("#957eec","#201d2b"),r("#d4703c","#201d2b"),r("#b4adc9","#201d2b"),r("#eeeaf8","#201d2b"));
console.log("th light",r("#5c5672","#efeafb"),"dark th",r("#b4adc9","#2a2638"));
'
```

  Result:
```
light 5.67 4.60 6.93 14.61
dark 5.09 4.86 7.67 13.96
th light 5.89 dark th 6.81
```

- **Bash**

```bash
grep -rn "cost\.interest\|chart\.series" src --include=*.ts* | grep -v test | head; grep -rn "toNumber\|Number(\|parseFloat" src --include=*.ts --include=*.tsx | grep -v "\.test\." | head
```

  Result:
```
src/ui/components/charts/ChartParts.tsx:6:export function Legend({ first = copy.chart.series.principal }: { first?: string }) {
src/ui/components/charts/ChartParts.tsx:15:        {copy.chart.series.interest}
src/domain/validate.ts:49:  return { ok: true, value: value.toNumber() }
src/ui/components/charts/chartGeometry.ts:17:  return value.div(max).toDecimalPlaces(6).toNumber()
src/ui/components/charts/CostBreakdown.tsx:21:            style={{ flexGrow: loanPercent.toNumber() }}
src/ui/components/charts/CostBreakdown.tsx:28:              style={{ flexGrow: interestPercent.toNumber() }}
```

- **Bash**

```bash
git diff g3-tests-approved..HEAD -- e2e test playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/' ':(glob)src/**/*.test.*' | grep -E "^\+.*(\.skip|\.only|\.fixme|test\.fail|todo)" ; echo "grep done"; git diff --stat g3b-visuals-tests-approved..HEAD -- e2e ':!e2e/review' ':(glob)src/**/*.test.*' playwright.config.ts vitest.config.ts scripts | tail -2; git status --short | head; git diff g3-tests-approved 52f75ad --stat -- e2e/s0* e2e/s1[0-3]* e2e/fixtures.ts e2e/spec-rules.spec.ts | tail -3; git diff 892d518^..52f75ad --stat | tail -12
```

  Result:
```
grep done
?? e2e/review/probe1.spec.ts
?? e2e/review/probe2.spec.ts
?? e2e/review/probe3.spec.ts
?? e2e/review/probe4.spec.ts
?? e2e/review/probe5.spec.ts
 e2e/s11-history.spec.ts    |  2 +-
 e2e/spec-rules.spec.ts     |  2 +-
 10 files changed, 101 insertions(+), 65 deletions(-)
 e2e/s19-yearly.spec.ts            | 151 ++++++++++++++++
 e2e/s20-cost.spec.ts              | 216 +++++++++++++++++++++++
 e2e/s21-balance-chart.spec.ts     | 127 ++++++++++++++
 e2e/s22-makeup.spec.ts            |  72 ++++++++
 e2e/visual-helpers.ts             | 191 ++++++++++++++++++++
 src/domain/format-percent.test.ts |  47 +++++
 src/domain/summary.test.ts        | 360 ++++++++++++++++++++++++++++++++++++++
 7 files changed, 1164 insertions(+)
```

- **Bash**

```bash
rm e2e/review/probe*.spec.ts test-results/forced-*.png && cat > e2e/review/visuals.spec.ts <<'EOF'
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
EOF
npm run typecheck 2>&1 | tail -3; npm run lint 2>&1 | tail -3; for b in chromium firefox webkit; do CI=1 npx playwright test e2e/review/visuals.spec.ts --project=$b 2>&1 | grep -E "✘|passed|failed|^\s+[0-9]\)" ; done; netstat -ano | grep LISTEN | grep 4173
```

  Result:
```
rm: cannot remove 'test-results/forced-*.png': No such file or directory
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

> muhammad-arslan-calculator@0.0.0 lint
> eslint . --max-warnings 0
```

- **Bash**

```bash
ls e2e/review; cat > e2e/review/visuals.spec.ts <<'EOF'
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
EOF
npm run typecheck 2>&1 | tail -3; npm run lint 2>&1 | tail -3; for b in chromium firefox webkit; do CI=1 npx playwright test e2e/review/visuals.spec.ts --project=$b 2>&1 | grep -E "✘|passed|failed|^\s+[0-9]\)" ; done; netstat -ano | grep LISTEN | grep 4173
```

  Result:
```
g45.spec.ts
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

> muhammad-arslan-calculator@0.0.0 lint
> eslint . --max-warnings 0

  1) [chromium] › e2e\review\visuals.spec.ts:4:1 › [REVIEW-V1] at 180 px wide (200% zoom of 360) the yearly summary does not make the page scroll sideways 
  2) [chromium] › e2e\review\visuals.spec.ts:17:1 › [REVIEW-V2] in forced-colors mode the cost-bar segments and legend swatches stay visible 
  2 failed
  1) [firefox] › e2e\review\visuals.spec.ts:4:1 › [REVIEW-V1] at 180 px wide (200% zoom of 360) the yearly summary does not make the page scroll sideways 
  2) [firefox] › e2e\review\visuals.spec.ts:17:1 › [REVIEW-V2] in forced-colors mode the cost-bar segments and legend swatches stay visible 
  2 failed
  1) [webkit] › e2e\review\visuals.spec.ts:4:1 › [REVIEW-V1] at 180 px wide (200% zoom of 360) the yearly summary does not make the page scroll sideways 
  1 failed
  1 passed (8.3s)
```

- **Bash**

```bash
netstat -ano | grep LISTEN | grep 4173; tail -c 300 docs/process/review-findings.md | cat -A | tail -4; git status --short
```

  Result:
```
- the app shows a focus ring on the first invalid field after a failed Calculate, which is by spec;$
  - the board's figures (66,185.46) are known to be wrong.$
$
BLOCKING FINDINGS: 0$
?? e2e/review/visuals.spec.ts
```

- **Bash**

```bash
cat >> docs/process/review-findings.md <<'EOF'

---

## Visuals mini-gate review (2026-10-18)

Scope: S-19 (v1), S-20, S-21, S-22 and the sticky form (D-69). Commits a5ee7e7 to 4333476. Reviewer: code-reviewer (Sonnet), independent of the developer.

### Gate
- `CI=1 npm run verify` on my run: **exit 1**. Lint, format, typecheck OK; Vitest 345 of 345; size 87.1 KB of 150 KB; E2E **541 passed, 2 failed** (both WebKit, 30 s test timeouts, both in `[SPEC-§9.3]` two-tab tests: "after Clear all in tab B, a Calculate in tab A must not bring the cleared entries back" and "the duplicate check compares with the newest entry as just re-read"). The `trace --results` step did not run because E2E failed.
- Re-runs of the same tests (`--project=webkit --grep "9.3" --repeat-each=5`): one run 34 passed and 6 failed of 40 (right after the full run); a second run 40 of 40 (2.0 min); one with `--workers=1` 40 of 40 (4.3 min). The same filter on the commit before the visuals (c62d9c2) passed 40 of 40 in 2.0 min. So the failures are load-sensitive WebKit timeouts in two-tab tests, not AC-2.16 as in the developer's run. I cannot show they are caused by the charts, but I also could not show they are not (the one failing parallel run was the only one that failed at HEAD). Reported as F-4.
- Port 4173 is free after my runs.

### Freeze
- No change to any file in the §12.4 freeze scope since `g3b-visuals-tests-approved` (`git diff --stat` empty for `e2e`, `src/**/*.test.*`, configs, `scripts/`, excluding `e2e/review/`).
- Since `g3-tests-approved` the only commits in scope are 749144e, 5751988, 16c8cc8, 04de524, 95259bc (authorised) and the two G3b additions 892d518 and 52f75ad (purely additive: 7 new files, 1,164 insertions, 0 deletions). No added `.skip`, `.only`, `.fixme`, `test.fail` or `todo` anywhere in the diff.

### Findings

| ID | Severity | Story/AC | Evidence | Suggested fix |
|---|---|---|---|---|
| F-1 | Major | S-19 (yearly table), NFR reflow; D-64 claim "no overflow at 180 px" no longer true | At a 180 px viewport (200% zoom of 360), after Calculate on L-B (2,500,000 / 18 / 5 yr) or L-MAX, `scrollWidth - clientWidth` = **129 px** in Chromium, Firefox and WebKit. Elements past the viewport: `table.yearly-table` (right edge 309 px), its `th`/`td`. The yearly table is not in a scroll region, and the long headers ("INTEREST (RS)", uppercase and letter-spaced) and 15-digit amounts cannot shrink. Before the visuals the redesign review found 0 at 180 px. AC-5.1 and AC-20.6
… [7,285 more characters not shown; see raw/]
```

  Result (error):
```
Exit code 2
/usr/bin/bash: -c: line 32: unexpected EOF while looking for matching `''
```

- **Bash**

```bash
tail -3 docs/process/review-findings.md; wc -l docs/process/review-findings.md
```

  Result:
```
- the board's figures (66,185.46) are known to be wrong.

BLOCKING FINDINGS: 0
355 docs/process/review-findings.md
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\review-findings.md",
 "offset": 345
}
```

  Result:
```
345	- **Focus:** 3px solid outline (offset 3px), on the inputs, buttons, `.schedule-scroll` and the history h2 after Delete, in all 3 browsers.
346	- **Targets at 360 and 180 px:** no visible button, input, select or scroll region under 44×44, dialog open. Dialog width is 328 at 360 and 148 at 180, with no overflow.
347	- **Sticky:** at 360 px with `scrollLeft = 200`, the Month header and cells stay at the container's left edge (38 px against a container at 37 px) and the header row stays at the top, in Chromium, Firefox and WebKit. The Month column is opaque, with zebra rows handled.
348	- **Dialog:** blurred scrim, Clear has a rose fill and a 2px error border, Cancel is focused first, in both themes. Looks right.
349	- **Visual comparison against the four reference PNGs (Chromium):** layout, colours, icons, the stale peach state with border, mint tile, butter note, dialog and header mark all match. Meaningful differences, all from the boards' example data:
350	  - the board shows `10,00,000` in the amount input; the app keeps the raw text, as the spec says;
351	  - the board's field-error texts ("Interest rate must be between 0 and 75%") differ from the §7 copy the app uses;
352	  - the app shows a focus ring on the first invalid field after a failed Calculate, which is by spec;
353	  - the board's figures (66,185.46) are known to be wrong.
354	
355	BLOCKING FINDINGS: 0
356
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md

Replace:
```
- the board's figures (66,185.46) are known to be wrong.

BLOCKING FINDINGS: 0
```
With:
```
- the board's figures (66,185.46) are known to be wrong.

BLOCKING FINDINGS: 0

---

## Visuals mini-gate review (2026-10-18)

Scope: S-19 (v1), S-20, S-21, S-22 and the sticky form (D-69). Commits a5ee7e7 to 4333476. Reviewer: code-reviewer (Sonnet), independent of the developer.

### Gate
- `CI=1 npm run verify` on my run: **exit 1**. Lint, format, typecheck OK; Vitest 345 of 345; size 87.1 KB of 150 KB; E2E **541 passed, 2 failed**. Both failures are WebKit 30 s test timeouts in `[SPEC-§9.3]` two-tab tests ("after Clear all in tab B, a Calculate in tab A must not bring the cleared entries back" and "the duplicate check compares with the newest entry as just re-read"). The `trace --results` step did not run because E2E failed.
- Re-runs of the same tests (`--project=webkit --grep "9.3" --repeat-each=5`): one run right after the full run gave 34 passed and 6 failed of 40; a second run gave 40 of 40 (2.0 min); a `--workers=1` run gave 40 of 40 (4.3 min). The same filter on the commit before the visuals (c62d9c2) passed 40 of 40 in 2.0 min. So the failures are load-sensitive WebKit timeouts in two-tab tests, not AC-2.16 as in the developer's run. I cannot show they are caused by the charts, but only HEAD ever failed. Reported as F-4.
- Port 4173 is free after my runs.

### Freeze
- No change to any file in the §12.4 freeze scope since `g3b-visuals-tests-approved` (`git diff --stat` empty for `e2e`, `src/**/*.test.*`, configs and `scripts/`, excluding `e2e/review/`).
- Since `g
… [8,149 more characters not shown; see raw/]
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md has been updated successfully.
```

- **SubagentHandback**

```json
{
 "message": "Visuals mini-gate review is done and appended to docs/process/review-findings.md. There are no Blockers, but `CI=1 npm run verify` did not exit 0 on my run (exit 1).\n\n**Gate**\n- Lint, format and typecheck pass. Vitest is 345/345 and the bundle is 87.1 KB.\n- E2E was 541 passed, 2 failed, so `trace --results` never ran. Both failures are WebKit 30 s timeouts in two-tab `[SPEC-§9.3]` tests (\"Clear all in tab B…\" and \"duplicate check compares with the newest entry\"). They are not AC-2.16.\n- Re-run with `--grep \"9.3\" --repeat-each=5`:\n  - **At HEAD:** the first run (right after verify) failed 6 of 40; a second run passed 40/40; a `--workers=1` run passed 40/40.\n  - **On c62d9c2 (pre-visuals commit):** 40/40.\n  - So it is a load flake, but only HEAD has ever failed. Logged as F-4 (Minor).\n- Port 4173 is free.\n\n**Freeze**\n- Nothing in the §12.4 freeze scope has changed since `g3b-visuals-tests-approved`.\n- Since `g3-tests-approved` the only commits in scope are the five authorised ones plus the two additive G3b commits (892d518, 52f75ad: 7 new files, 0 deletions).\n- No `.skip`, `.only`, `.fixme`, `test.fail` or `todo` was added.\n\n**Findings**\n- **F-1 Major, 180 px reflow.** At 180 px (200% zoom of 360), after Calculate on L-B or L-MAX, the page scrolls sideways by 129 px in all 3 browsers. The cause is `table.yearly-table`, which is not in a scroll region and cannot shrink. The redesign review measured 0 at 180 px, and AC-5.1 and AC-20.6 only te
… [3,308 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

