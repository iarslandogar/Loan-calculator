# Proposal: visuals in the results (charts)

**Status:** Proposed by Claude Code, 2026-10-18, for owner approval. Nothing here is built or added to the ACs yet.
**Requested by:** the owner ("add a few visuals, like charts"). The owner chose all four visuals.

## Summary

Four visuals, all inside the results card, all built from the schedule the app already computes:

| # | Visual | Story | Role / job | What it answers |
|---|---|---|---|---|
| 1 | Cost split bar | **S-20** (new) | R-1 / J-2 | "How much of what I repay is interest?" |
| 2 | Balance over time | **S-21** (new) | R-3 / J-8 | "What will I still owe, and when?" |
| 3 | Payment make-up over time | **S-22** (new) | R-2 / J-5 | "Why does the interest part shrink?" |
| 4 | Yearly summary (chart + table) | **S-19** (Backlog → v1) | R-3 / J-9 | "How much interest did each year cost?" |

**Order in the results card:**
1. the three figures and the rounding note (unchanged);
2. Cost breakdown;
3. Balance over time;
4. Interest and principal in each payment;
5. Yearly summary;
6. the Repayment schedule (unchanged, still last).

## Rules every visual follows

- **No new dependencies.** Each chart is hand-built inline SVG, drawn in React from the existing `CalculatedLoan`. There's no charting library and no network.
- **Never colour alone.** Each chart sits in a `<figure>` whose `<figcaption>` holds a one-sentence text summary (exact wording below). The data is also always available as a table: the existing schedule, plus a new yearly table. The SVG itself is `aria-hidden="true"`, because the figcaption and the tables carry the information for assistive technology.
- **Legends:** charts with two series (principal and interest) show an HTML legend, plus direct labels where they fit. One-series charts have no legend; the title names the series.
- **Colour:** two categorical series in a fixed order, Principal first and Interest second, the same in every chart. The pairs are checked with the data-visualisation validator script against the light and dark surfaces, not by eye. The marks may need deeper shades than the pastel fills to reach 3:1 against the surface (WCAG 1.4.11). Text uses text tokens only.
- **One axis per chart,** no dual axes. Axes and grid are kept quiet.
- **Hover:** a tooltip on the balance, payment and yearly charts (crosshair or per-bar) showing the exact values. Keyboard and screen-reader users get the same values from the tables.
- **Performance:** each series is a single SVG `<path>`, never 1,200 elements, so L-MAX (1,200 months) keeps AC-10.8's 1-second budget.
- **Layout:** fluid width with no fixed pixel sizes, so there's no horizontal page scroll from 180 px up; works in both themes.

## New domain functions (pure, unit-tested)

- `costSplit(loan): { interestPercent: Decimal, loanPercent: Decimal }`
  - `interestPercent = round1(100 × totalInterest / totalPayable)`, where `round1` rounds half-up to 1 dp;
  - `loanPercent = 100 − interestPercent`, so the two always sum to exactly 100.0.
- `yearlySummary(loan): { year, months, interest, principal, balance }[]`
  - groups of 12 schedule rows, with a shorter final group when the tenure isn't a whole number of years;
  - sums are exact `Decimal`s;
  - `balance` is the balance after the group's last month.
- `formatPercent(x: Decimal): string`: always 1 dp, for example `6.2%` or `0.0%`.

## Proposed stories and ACs

Values were computed independently with exact decimal arithmetic using spec §5.2, and cross-checked: L-B's yearly interest sums to AC-3.2's total, and its principal to the loan amount.

### S-19 See interest versus principal for each year *(Backlog → v1)*
- **AC-19.1** *(existing, unchanged)* Given L-B, when I view the yearly summary, then 5 rows are shown, and each row's interest and principal equal the sums of the matching 12 monthly rows.
- **AC-19.2** Given L-B, then the **Yearly summary** table has the columns **Year**, **Interest (Rs)**, **Principal (Rs)**, **Balance (Rs)**, and its rows read:
  - `1 | 422,945.63 | 338,857.21 | 2,161,142.79`
  - `5 | 69,355.47 | 692,447.31 | 0.00`
- **AC-19.3** Given `100000`, `10`, `18` **Months**, then the yearly summary has 2 rows, and the second (6 months) reads `2 | 1,028.07 | 35,006.16 | 0.00`.
- **AC-19.4** Given L-B, then a yearly chart shows one stacked bar per year, with a legend naming **Principal** and **Interest**.

### S-20 See what share of the total cost is interest *(new, R-1, J-2)*
- **AC-20.1** Given L-A, then a **Cost breakdown** bar shows two parts, **Loan amount** and **Interest**, and reads `Interest is 6.2% of the total amount payable.`
- **AC-20.2** Given L-B, then it reads `Interest is 34.4% of the total amount payable.`
- **AC-20.3** Given L-C (0%), then it reads `Interest is 0.0% of the total amount payable.`, and the bar shows the loan amount only.
- **AC-20.4** Given L-A, then the loan-amount part takes 93.8% of the bar's width (±1 percentage point).

### S-21 See the balance fall over time *(new, R-3, J-8)*
- **AC-21.1** Given L-A, then a **Balance over time** chart is shown, reading `The balance falls from Rs 1,000,000.00 to Rs 0.00 over 12 months.`
- **AC-21.2** Given L-A, when I hover over month 6 in the chart, then a tooltip reads `Month 6: Rs 514,921.05`.
- **AC-21.3** Given L-MAX, then the chart is drawn, and AC-10.8's 1-second budget still holds with all charts present.

### S-22 See how each payment splits between interest and principal *(new, R-2, J-5)*
- **AC-22.1** Given L-A, then an **Interest and principal in each payment** chart reads `Interest is 11.3% of the first payment and 1.0% of the last.`, with a legend naming **Principal** and **Interest**.
- **AC-22.2** Given L-B, then it reads `Interest is 59.1% of the first payment and 1.5% of the last.`
- **AC-22.3** Given L-A, when I hover over month 1, then a tooltip reads `Month 1: principal Rs 78,848.79, interest Rs 10,000.00`.

### Applies to all four
- **AC-20.5** Given either theme, the chart marks have a contrast of at least 3:1 against the card surface, and all chart text at least 4.5:1.
- **AC-20.6** Given a viewport 360 px wide and L-MAX results, the page doesn't scroll horizontally, and every chart fits its card.

## New copy (spec §7)

| Key | Text |
|---|---|
| chart.cost.title | `Cost breakdown` |
| chart.cost.summary | `Interest is {pct} of the total amount payable.` |
| chart.cost.loan / chart.cost.interest | `Loan amount` / `Interest` |
| chart.balance.title | `Balance over time` |
| chart.balance.summary | `The balance falls from {amount} to {zero} over {n} months.` (`{n} month` when n = 1) |
| chart.balance.tooltip | `Month {k}: {balance}` |
| chart.makeup.title | `Interest and principal in each payment` |
| chart.makeup.summary | `Interest is {first} of the first payment and {last} of the last.` |
| chart.makeup.tooltip | `Month {k}: principal {principal}, interest {interest}` |
| chart.series.principal / chart.series.interest | `Principal` / `Interest` |
| yearly.title | `Yearly summary` |
| yearly.cols | `Year`, `Interest (Rs)`, `Principal (Rs)`, `Balance (Rs)` (`($)` for USD) |
| yearly.tooltip | `Year {y}: principal {principal}, interest {interest}` |

## Documents this changes (owner approval needed)

- `docs/user-stories.md`:
  - new stories S-20, S-21 and S-22;
  - S-19's Scope goes from Backlog to v1;
  - the ACs above;
  - the index table.
- `docs/jobs-to-be-done.md`, "Served by stories": J-2 gains S-20, J-5 gains S-22, J-8 gains S-21, and J-9's S-19 is no longer backlog. **CLAUDE.md says only the owner edits this file.** Either the owner edits it, or explicitly approves Claude Code making exactly these edits. `npm run trace` checks that this table agrees with the story index.
- `docs/spec/technical-spec.md`: §3.1.1 (the three new domain functions), §7 (copy), §8 (chart rules above), and §8.3.1 (the DOM contract: each chart is a `<figure>` named by its `<figcaption>`, and the yearly table is named "Yearly summary").
- `docs/spec/decision-log.md`: a new decision entry.

## How it would be built (same process as before)

1. Owner approves this proposal, or edits it.
2. Claude Code updates the docs above and records the decision.
3. The `test-designer` writes the new tests, which fail for the right reason. They are new tests, so existing frozen tests don't change. The owner approves them, and they are frozen under a new tag, `g3b-visuals-tests-approved`.
4. Claude Code implements: domain functions, chart components and styles in the pastel design tokens. The palette is checked with the validator script.
5. `verify` must be green, then an independent review, then a mini-gate.
6. Then Phase 5, on the final app.

## Risks

- **Page length on phones:** four charts make the results card much longer. Mitigation: compact chart heights. Collapsible sections would add behaviour and need ACs, so they're not proposed.
- **Performance at 1,200 months:** mitigated by single-path series, and checked by AC-21.3 and AC-10.8.
- **Colour:** the pastel fills are probably too light for chart marks at 3:1. Chart marks will likely use deeper shades of the same hues, which is a small design extension; the designer can be consulted.
