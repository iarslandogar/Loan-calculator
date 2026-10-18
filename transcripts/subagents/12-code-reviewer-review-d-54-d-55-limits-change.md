# Subagent 12: code-reviewer: Review D-54/D-55 limits change

Subagent **`code-reviewer`**, task: *Review D-54/D-55 limits change*. Started 2026-10-18 14:07 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 14:07 PKT

> Mini-gate review of an owner-approved change cycle: widened input limits (decision D-54) and a corrected payment guarantee (D-55), with test readings in D-56. Read D-54, D-55, D-56 in docs/spec/decision-log.md first. Append a dated "D-54/D-55 change" section to docs/process/review-findings.md (use Edit; keep earlier sections intact).
> 
> Commits to review on branch v1: 8797b10 (spec + ACs + decisions), 16c8cc8 (frozen tests updated by the test-designer, owner-authorised), 34a06b8 (code: src/domain/validate.ts limits, src/ui/copy.ts strings), 0c510f5 (D-56).
> 
> ALWAYS run Playwright with `CI=1` (fresh build). Leave nothing on port 4173.
> 
> 1. Gate: `npx vitest run` (developer reports 297/297), lint, typecheck, format:check. E2E for groups 1–4 in 3 browsers excluding saved-calculation and group-6 layout tests — the developer used: specs s01,s02,s03,s04,s05,s06,s07,s09,s10,s13,spec-rules with `--grep-invert "§9\.3|§9\.1|Restore|tampered|AC-9\.2\]|AC-7\.5\]|AC-5\.2\]|AC-5\.4\]|AC-5\.5\]"` → 282 passed. Reproduce, and use `--list` to confirm what the filter excludes (Playwright grep is case-insensitive).
> 2. Test integrity (most important): diff 16c8cc8 against the new AC/spec text in 8797b10. Every test change must be required by the new text. Flag any assertion weakened beyond what D-55 allows (only: last row may differ from the headline by ≤ 0.02; all other rows still ≤ 0.01), any deleted test, any skip/only/fixme, any expected value that looks computed rather than hard-coded. Confirm the L-MIN/L-MAX figures in the tests equal the ACs exactly. Then the freeze check vs tag g3-tests-approved: the only authorised changes are D-46, D-48 and now D-54/D-55 (16c8cc8).
> 3. Spec conformance of the code change: limits exactly as §4.2 (10 to 1,000,000,000,000,000; 0 to 75; 1–100 years / 1–1,200 months; inclusive), copy strings exactly as §7, nothing else changed in validate.ts.
> 4. Independent verification (don't just trust the developer's searches): write a throwaway Playwright test in e2e/review/ that imports `../../src/domain/validate` and `../../src/domain/loan` directly (no page needed), and fuzzes the REAL code with your own seeds — at least 20,000 random valid loans over the new bounds, biased to corners (small amounts 10–20,000, rates 45–75%, tenures 900–1,200 months, exact bounds) — checking: rows = months; payment = interest + principal; 0 ≤ principal ≤ opening; final balance 0.00; Σprincipal = amount; every non-final payment within 0.01 of the headline; final payment within 0.02. Run it in one project only (e.g. `--project=chromium`). Report counts and any counterexample (a counterexample is a Blocker: per spec §5.4 the developer must stop and report it to the owner). Delete the probe afterwards unless it found a real defect (then keep it as a failing `[REVIEW-n]` test).
> 5. Exploratory in the app: the new L-MAX at 360 px and 200% zoom (Rs 75,000,000,000,000,003.34 must stay fully visible, no horizontal page scroll), error messages at the new bounds, 1,200-row schedule keyboard scrolling, rate 75 vs 75.01 vs 75.001.
> 
> End with `BLOCKING FINDINGS: <count>`. Do not edit src/ or any frozen test.

<details><summary>🔧 4 tool call(s): Bash ×4</summary>

- **Bash**

```bash
git status --short | head; git log --oneline | head -8; grep -n "D-54\|D-55\|D-56" docs/spec/decision-log.md | head
```

  Result:
```
0c510f5 docs: record test-designer readings for the D-54/D-55 test update (D-56)
34a06b8 feat(S-2): widen input limits and correct the rounding note (D-54, D-55)
16c8cc8 test: update frozen tests to the D-54 limits and D-55 guarantee (owner-approved)
8797b10 docs(D-54, D-55): widen input limits and correct the payment guarantee; approve G4.4
aa6a34a docs: D-55 decided (owner): keep algorithm, final payment may differ by up to 0.02
a47dae7 docs: record D-54 (widen limits) and D-55 (counterexample to invariant 6 / AC-10.5, open)
0d163d4 docs(G4.4): code-review findings for group 4 (0 blocking) and D-53
3fcc8d8 fix(S-6): merge settings over freshly stored values so another tab's change survives (G4.4 review G44-1)
70:| D-54 | Widen the input limits (supersedes D-02's bounds) | Approved (owner), 2026-10-18: amount 10 to 10^15, rate 0 to 75%, 1 to 100 years / 1 to 1,200 months |
71:| D-55 | Counterexample to invariant 6 / AC-10.5 within the current limits | Approved (owner), 2026-10-18: option A, state it truthfully |
72:| D-56 | Test-designer readings for the D-54/D-55 test update | **Proposed**: owner to review at the D-54 mini-gate |
439:### D-54 Widen the input limits (owner request, 2026-10-18)
446:- **Status:** the bounds search found D-55 first. The exact bounds waited on the D-55 decision.
447:- **Verification** (exact decimal arithmetic, spec §5.2 exactly, under the D-55 guarantee: every payment within 0.01 of the headline except the final one, within 0.02; principal never negative; balance ends at 0.00):
452:  - **Today's limits:** 0 failures in 20,000 under the D-55 guarantee.
460:  - The rounding note (D-55) becomes `Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.` This is currency-neutral, and true by D-55.
466:### D-55 Counterexample to invariant 6 / AC-10.5 within the CURRENT limits (open)
467:- **Finding (Claude Code, 2026-10-18, while verifying D-54):** spec §5.3 says "every payment is within 0.01 of the headline payment", and §5.4 invariant 6, AC-10.5 and the `note.rounding` copy say the same. That is **not true**, even within the approved D-02 limits.
```

- **Bash**

```bash
sed -n 436,520p docs/spec/decision-log.md; grep -n "D-56" docs/spec/decision-log.md
```

- **Bash**

```bash
git show 34a06b8 --stat && git show 34a06b8 -- src | head -150
```

  Result:
```
2. **G44-2, the context value isn't memoised, and a failed settings save is silent:** **won't fix.** Same reasoning as D-50 item 4, and AC-6.6 requires the silence.
3. **G44-3, the inline pre-paint script duplicates `parseSettings`:** **accepted.** The script must run before any bundle loads, so it can't import the module. The three `[SPEC-§9.2]` settings tests plus AC-6.3 guard against the two drifting apart.

### D-54 Widen the input limits (owner request, 2026-10-18)
- **Request:** the owner asked to remove the limits on loan amount, interest rate and tenure.
- **Developer analysis:** removing them entirely isn't safe.
  - Above about 10^38 the 40-digit precision is exceeded.
  - An unbounded tenure would hang the browser while it draws the schedule.
  - A 1,000% rate broke the 0.01 guarantee in 11 months of one loan.
- **Decision (owner, 2026-10-18):** widen to **wide, verified limits** (for example amount up to 10^15, rate up to 100%, tenure up to 100 years or 1,200 months, with exact values set by verification). Do it **now, before group 5**.
- **Status:** the bounds search found D-55 first. The exact bounds waited on the D-55 decision.
- **Verification** (exact decimal arithmetic, spec §5.2 exactly, under the D-55 guarantee: every payment within 0.01 of the headline except the final one, within 0.02; principal never negative; balance ends at 0.00):
  - **Smallest amount:** Rs 1 fails, because at 0% over long tenures the headline rounds to 0.00. **Rs 10 passes** an exhaustive grid of 216 rate × tenure cases up to 1,200 months.
  - **Rate × tenure:** near 100% over 1,100 to 1,200 months, a month's principal can be −0.01 (11 of 20,000 failed at 100%; a failure was seen at 97.77%).
  - **Up to 90%:** 0 failures in 20,000 corner-biased random loans per maximum (50%, 60%, 75%, 90%), each over amounts 10 to 10^15 and 1 to 1,200 months.
  - **At the edge:** 0 failures in a dense sweep of 5,082 schedules each at 75% and at 90% (rates within 5 points of the maximum, 1,100 to 1,200 months, past-failure amounts).
  - **Today's limits:** 0 failures in 20,000 under the D-55 guarantee.
  - **New references:** L-MIN and L-MAX satisfy every invariant, and an exact-rational cross-check gives identical rows.
- **Decision (owner, 2026-10-18):** **amount 10 to 1,000,000,000,000,000; rate 0 to 75%; tenure 1 to 100 years or 1 to 1,200 months** (75% rather than 90%, for margin below where failures start). This **supersedes the bounds in D-02**; D-02's other reasoning stand
… [6,257 more characters not shown; see raw/]
```

  Result:
```
commit 34a06b8ca89f24462c8ddcf06114d4ddc78ffb85
Author: Muhammad Arslan <arslan8954@gmail.com>
Date:   Sun Oct 18 14:07:27 2026 +0500

    feat(S-2): widen input limits and correct the rounding note (D-54, D-55)
    
    Amount 10 to 10^15, rate 0 to 75%, tenure 1 to 100 years / 1 to 1,200 months; range messages and rounding note per spec §7.
    
    Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

 src/domain/validate.ts | 11 ++++++-----
 src/ui/copy.ts         | 10 +++++-----
 2 files changed, 11 insertions(+), 10 deletions(-)
commit 34a06b8ca89f24462c8ddcf06114d4ddc78ffb85
Author: Muhammad Arslan <arslan8954@gmail.com>
Date:   Sun Oct 18 14:07:27 2026 +0500

    feat(S-2): widen input limits and correct the rounding note (D-54, D-55)
    
    Amount 10 to 10^15, rate 0 to 75%, tenure 1 to 100 years / 1 to 1,200 months; range messages and rounding note per spec §7.
    
    Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

diff --git a/src/domain/validate.ts b/src/domain/validate.ts
index 096a1bc..991354b 100644
--- a/src/domain/validate.ts
+++ b/src/domain/validate.ts
@@ -7,11 +7,12 @@ import type { ErrorCode, Field, RawInputs, ValidationResult } from './types'
 const NUMBER = /^-?(\d+(\.\d*)?|\.\d+)$/
 const WHOLE_NUMBER = /^-?\d+$/
 
-const AMOUNT_MIN = new Decimal(1000)
-const AMOUNT_MAX = new Decimal(1_000_000_000)
+// Limits (spec §4.2, D-54), verified with exact arithmetic against every §5.4 invariant.
+const AMOUNT_MIN = new Decimal(10)
+const AMOUNT_MAX = new Decimal('1000000000000000')
 const RATE_MIN = new Decimal(0)
-const RATE_MAX = new Decimal(50)
-const TENURE_MAX = { years: new Decimal(40), months: new Decimal(480) } as const
+const RATE_MAX = new Decimal(75)
+const TENURE_MAX = { years: new Decimal(100), months: new Decimal(1200) } as const
 
 type FieldResult<T> = { ok: true; value: T } | { ok: false; error: ErrorCode }
 
@@ -44,7 +45,7 @@ function checkTenure(text: string, unit: RawInputs['unit']): FieldResult<number>
   if (value.lt(1) || value.gt(TENURE_MAX[unit])) {
     return { ok: false, error: unit === 'years' ? 'TENURE_RANGE_YEARS' : 'TENURE_RANGE_MONTHS' }
   }
-  // Safe only because the range check above has already bounded the value to 1..480.
+  // Safe only because the range check above has already bounded the value to 1..1,200.
   return { ok: true, value: value.toNumber() }
 }
 
diff --git a/src/ui/copy.ts b/src/ui/copy.ts
index 7e1e2e3..0a2ad02 100644
--- a/src/ui/copy.ts
+++ b/src/ui/copy.ts
@@ -39,7 +
… [1,505 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -rnE "480|1,000,000,000|1000000000|\b40 years|50%|maxLength|maxlength|\b1,?000\b" src --include=*.ts --include=*.tsx --include=*.css --include=*.html index.html | grep -v test | head -30; git diff --stat g3-tests-approved..HEAD -- e2e src/'**'/'*.test.*' test playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'; git log --oneline g3-tests-approved..HEAD -- e2e test 'src/**/*.test.*' playwright.config.ts vitest.config.ts scripts/trace.mjs
```

  Result:
```
src/domain/parse.ts:7: * Trims, then removes commas only when they form valid western (1,000,000) or lakh
src/domain/validate.ts:12:const AMOUNT_MAX = new Decimal('1000000000000000')
src/ui/app.css:197:  max-height: min(60vh, 480px);
src/ui/copy.ts:76:    AMOUNT_RANGE: 'Loan amount must be between 10 and 1,000,000,000,000,000.',
 e2e/fixtures.ts                  |  53 +++++++++++---------
 e2e/s01-calculate.spec.ts        |  10 ++--
 e2e/s02-validation.spec.ts       |  28 ++++++-----
 e2e/s03-totals.spec.ts           |   8 +--
 e2e/s05-mobile.spec.ts           |   8 +--
 e2e/s09-reset.spec.ts            |   4 +-
 e2e/s10-schedule.spec.ts         |  18 ++++---
 e2e/s11-history.spec.ts          |   2 +-
 e2e/spec-rules.spec.ts           |   2 +-
 src/domain/format.test.ts        |  16 +++---
 src/domain/loan.property.test.ts | 104 ++++++++++++++++++++++-----------------
 src/domain/loan.test.ts          |  62 +++++++++++++----------
 src/domain/validate.test.ts      |  78 +++++++++++++++--------------
 13 files changed, 217 insertions(+), 176 deletions(-)
16c8cc8 test: update frozen tests to the D-54 limits and D-55 guarantee (owner-approved)
5751988 test(e2e): locate summary figures with getByLabel (owner-approved, D-48)
749144e test(S-9): fix AC-9.2 expected currency of USD-made entries (owner-approved, D-46)
```

</details>

### 🤖 Claude · 2026-10-18 14:08 PKT

Now the gate runs.

<details><summary>🔧 22 tool call(s): Bash ×19, Read ×3</summary>

- **Bash**

```bash
(npx vitest run 2>&1 | tail -8; echo vitest=$?; npm run lint 2>&1 | tail -4; echo lint=${PIPESTATUS[0]}; npm run typecheck 2>&1 | tail -4; echo tc=${PIPESTATUS[0]}; npm run format:check 2>&1 | tail -4; echo fmt=${PIPESTATUS[0]})
```

- **Bash**

```bash
git diff 8797b10 16c8cc8 --stat | tail -3; git show 8797b10 --stat | tail -12; git diff 8797b10^ 8797b10 -- docs/user-stories.md docs/spec/technical-spec.md
```

  Result:
```
✓ [SPEC-§5.4] invariant 8: the same tenure entered as years or as months gives identical rows, totals and note 24895ms

 Test Files  7 passed (7)
      Tests  297 passed (297)
   Start at  14:08:09
   Duration  40.49s (tests 99%, import 1%)

JSON report written to C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/reports/vitest.json
vitest=0

> muhammad-arslan-calculator@0.0.0 lint
> eslint . --max-warnings 0

lint=0

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

tc=0
> prettier --check .

Checking formatting...
All matched files use Prettier code style!
fmt=0
```

  Result:
```
src/domain/loan.test.ts               |  62 +++++++++++---------
 src/domain/validate.test.ts           |  78 +++++++++++++------------
 13 files changed, 229 insertions(+), 188 deletions(-)
    by exact-decimal searches recorded in D-54). Guarantee (D-55): every payment
    within 0.01 of the headline except the final one, within 0.02. Updates spec
    §4.2, §5.3, §5.4, §7, NFR-4; ACs 1.6, 1.7, 2.4, 2.5, 2.7, 2.10, 3.4, 3.5,
    5.1, 10.5, 10.6, 10.8; L-MIN and L-MAX reference loans. G4.4 (D-52, D-53)
    approved.
    
    Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

 docs/spec/decision-log.md   | 26 ++++++++++++++++++++++----
 docs/spec/technical-spec.md | 34 +++++++++++++++++-----------------
 docs/user-stories.md        | 28 ++++++++++++++--------------
 3 files changed, 53 insertions(+), 35 deletions(-)
diff --git a/docs/spec/technical-spec.md b/docs/spec/technical-spec.md
index 33371cd..b37c8bc 100644
--- a/docs/spec/technical-spec.md
+++ b/docs/spec/technical-spec.md
@@ -164,9 +164,9 @@ Number pattern: `^-?(\d+(\.\d*)?|\.\d+)$`, where `\d` means the ASCII digits `0`
 
 | Field | 1. Empty | 2. Format | 3. Precision | 4. Range |
 |---|---|---|---|---|
-| Loan amount | `AMOUNT_REQUIRED` | not a number → `AMOUNT_NAN` | more than 2 dp → `AMOUNT_DECIMALS` | outside 1,000 to 1,000,000,000 inclusive → `AMOUNT_RANGE` |
-| Interest rate | `RATE_REQUIRED` | → `RATE_NAN` | more than 2 dp → `RATE_DECIMALS` | outside 0 to 50 inclusive → `RATE_RANGE` |
-| Loan tenure | `TENURE_REQUIRED` | not `^-?\d+$` → `TENURE_WHOLE` (also covers `abc` and `2.5`) | n/a | Years: outside 1 to 40 → `TENURE_RANGE_YEARS`; Months: outside 1 to 480 → `TENURE_RANGE_MONTHS` |
+| Loan amount | `AMOUNT_REQUIRED` | not a number → `AMOUNT_NAN` | more than 2 dp → `AMOUNT_DECIMALS` | outside 10 to 1,000,000,000,000,000 inclusive → `AMOUNT_RANGE` (D-54) |
+| Interest rate | `RATE_REQUIRED` | → `RATE_NAN` | more than 2 dp → `RATE_DECIMALS` | outside 0 to 75 inclusive → `RATE_RANGE` (D-54) |
+| Loan tenure | `TENURE_REQUIRED` | not `^-?\d+$` → `TENURE_WHOLE` (also covers `abc` and `2.5`) | n/a | Years: outside 1 to 100 → `TENURE_RANGE_YEARS`; Months: outside 1 to 1,200 → `TENURE_RANGE_MONTHS` (D-54) |
 
 A negative number passes the format check and fails on range, so `-500` gets the range message (AC-2.4).
 
@@ -174,10 +174,10 @@ A negative number passes the format check and fails on range, so `-500` gets the
 
 | Field | Raw | Result |
 |---|---|---|
-| Amount | `1000`, `1000.00`, 
… [19,924 more characters not shown; see raw/]
```

- **Bash**

```bash
git diff 8797b10 16c8cc8 -- e2e src | grep -v '^index'
```

  Result:
```
<persisted-output>
Output too large (39.8KB). Full output saved to: C:\Users\arslan.NINEALPHA\.claude\projects\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tool-results\beg2ph1z5.txt

Preview (first 2KB):
diff --git a/e2e/fixtures.ts b/e2e/fixtures.ts
--- a/e2e/fixtures.ts
+++ b/e2e/fixtures.ts
@@ -36,7 +36,7 @@ export const test = base.extend({
 export const COPY = {
   idle: 'Enter your loan details and select Calculate.',
   stale: 'Your inputs have changed. Select Calculate to see updated results.',
-  rounding: 'Some payments differ by 0.01 because amounts are rounded to 2 decimal places.',
+  rounding: 'Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.',
   historyEmpty: 'No saved calculations yet.',
   historyUnavailable:
     "Saved calculations aren't available in this browser. Calculations still work.",
@@ -48,15 +48,15 @@ export const COPY = {
   amountRequired: 'Enter a loan amount.',
   amountNan: 'Loan amount must be a number.',
   amountDecimals: 'Loan amount can have at most 2 decimal places.',
-  amountRange: 'Loan amount must be between 1,000 and 1,000,000,000.',
+  amountRange: 'Loan amount must be between 10 and 1,000,000,000,000,000.',
   rateRequired: 'Enter an interest rate.',
   rateNan: 'Interest rate must be a number.',
   rateDecimals: 'Interest rate can have at most 2 decimal places.',
-  rateRange: 'Interest rate must be between 0 and 50%.',
+  rateRange: 'Interest rate must be between 0 and 75%.',
   tenureRequired: 'Enter a loan tenure.',
   tenureWhole: 'Loan tenure must be a whole number.',
-  tenureYears: 'Loan tenure must be between 1 and 40 years.',
-  tenureMonths: 'Loan tenure must be between 1 and 480 months.',
+  tenureYears: 'Loan tenure must be between 1 and 100 years.',
+  tenureMonths: 'Loan tenure must be between 1 and 1,200 months.',
 }
 
 export const HISTORY_KEY = 'emi-calc.v1.history'
@@ -140,32 +140,32 @@ export const LOANS = {
     months: 1,
   },
   MIN: {
-    amount: '1000',
+    amount: '10',
     rate: '0.01',
     tenure: '1',
     unit: 'Months',
-    monthly: 'Rs 1,000.01',
-    interest: 'Rs 0.01',
-    total: 'Rs 1,000.01',
-    line1: 'Rs 1,000.00 at 0.01% for 1 month',
...
</persisted-output>
```

- **Bash**

```bash
git diff 8797b10 16c8cc8 -- e2e | grep -v '^index' | sed -n 40,400p
```

  Result:
```
tenure: '1',
     unit: 'Months',
-    monthly: 'Rs 1,000.01',
-    interest: 'Rs 0.01',
-    total: 'Rs 1,000.01',
-    line1: 'Rs 1,000.00 at 0.01% for 1 month',
-    amountCents: 100_000n,
+    monthly: 'Rs 10.00',
+    interest: 'Rs 0.00',
+    total: 'Rs 10.00',
+    line1: 'Rs 10.00 at 0.01% for 1 month',
+    amountCents: 1_000n,
     rateNum: 1n,
     rateDen: 100n,
     months: 1,
   },
   MAX: {
-    amount: '1000000000',
-    rate: '50',
-    tenure: '40',
+    amount: '1000000000000000',
+    rate: '75',
+    tenure: '100',
     unit: 'Years',
-    monthly: 'Rs 41,666,666.80',
-    interest: 'Rs 19,000,000,061.79',
-    total: 'Rs 20,000,000,061.79',
-    line1: 'Rs 1,000,000,000.00 at 50% for 40 years',
-    amountCents: 100_000_000_000n,
-    rateNum: 50n,
+    monthly: 'Rs 62,500,000,000,000.00',
+    interest: 'Rs 74,000,000,000,000,003.34',
+    total: 'Rs 75,000,000,000,000,003.34',
+    line1: 'Rs 1,000,000,000,000,000.00 at 75% for 100 years',
+    amountCents: 100_000_000_000_000_000n,
+    rateNum: 75n,
     rateDen: 1n,
-    months: 480,
+    months: 1200,
   },
   Z3: {
     amount: '1000',
@@ -307,7 +307,7 @@ export function cents(text: string): bigint {
 }
 
 /**
- * Checks every row against AC-10.4, AC-10.5 and AC-13.3 using integer cents and the formula in
+ * Checks every row against AC-10.4, AC-10.5 (D-55) and AC-13.3 using integer cents and the formula in
  * the ACs: interest = round-half-up(opening x annual rate / 1200), payment = interest + principal,
  * balance = opening - principal, final balance 0.00. Returns the column sums.
  */
@@ -343,7 +343,12 @@ export function checkScheduleArithmetic(
     expect(bal >= 0n, `row ${i + 1} balance not negative`).toBe(true)
     expect(pr >= 0n, `row ${i + 1} principal not negative`).toBe(true)
     const diff = p > headline ? p - headline : headline - p
-    expect(diff <= 1n, `row ${i + 1} payment within 0.01 of the headline`).toBe(true)
+    // AC-10.5 (D-55): every payment except the last within 0.01 of the headline; the last within 0.02.
+    const isLast = i === loan.months - 1
+    expect(
+      diff <= (isLast ? 2n : 1n),
+      `row ${i + 1} payment within ${isLast ? '0.02' : '0.01'} of the headline`,
+    ).toBe(true)
     opening = bal
     sumPayment += p
     sumInterest += it
diff --git a/e2e/s01-calculate.spec.ts b/e2e/s01-calculate.spec.ts
--- a/e2e/s01-calculate.spec.ts
+++ b/e2e/s01-calculate.spec.ts
@@ -49,14 +49,16 @@ test.describe('S-1 Calculate the monthly pa
… [10,638 more characters not shown; see raw/]
```

- **Bash**

```bash
git diff 8797b10 16c8cc8 -- src | grep -v '^index'
```

  Result:
```
diff --git a/src/domain/format.test.ts b/src/domain/format.test.ts
--- a/src/domain/format.test.ts
+++ b/src/domain/format.test.ts
@@ -144,19 +144,21 @@ describe('toCanonical', () => {
   })
 
   it('[SPEC-§6] never uses exponent notation at the largest and smallest values', () => {
-    expect(toCanonical(inputOf('1000000000', '50', '40', 'years'))).toEqual({
-      amount: '1000000000',
-      rate: '50',
-      tenure: 40,
+    expect(toCanonical(inputOf('1000000000000000', '75', '100', 'years'))).toEqual({
+      amount: '1000000000000000',
+      rate: '75',
+      tenure: 100,
       unit: 'years',
     })
-    expect(toCanonical(inputOf('1000', '0.01', '1', 'months'))).toEqual({
-      amount: '1000',
+    expect(toCanonical(inputOf('10', '0.01', '1', 'months'))).toEqual({
+      amount: '10',
       rate: '0.01',
       tenure: 1,
       unit: 'months',
     })
-    expect(toCanonical(inputOf('1000000000.00', '0', '480', 'months')).amount).toBe('1000000000')
+    expect(toCanonical(inputOf('1000000000000000.00', '0', '1200', 'months')).amount).toBe(
+      '1000000000000000',
+    )
   })
 
   it('[SPEC-§6] amount "1000." canonicalises to 1000', () => {
diff --git a/src/domain/loan.property.test.ts b/src/domain/loan.property.test.ts
--- a/src/domain/loan.property.test.ts
+++ b/src/domain/loan.property.test.ts
@@ -10,25 +10,28 @@ const SEED = 20261017
 const RUNS = 1000
 const TIMEOUT = 600_000
 
-/** A generated loan, described by integers only: cents, basis points of a percent, months. */
+/**
+ * A generated loan, described by integers only: cents, basis points of a percent, months.
+ * Cents is a bigint because the largest amount, 10^15, is 10^17 cents (above 2^53).
+ */
 interface Case {
-  cents: number
+  cents: bigint
   bps: number
   months: number
   /** Use the years field when months is a multiple of 12 (and this flag is set). */
   asYears: boolean
 }
 
-const AMOUNT_MIN_CENTS = 100_000 // 1,000.00
-const AMOUNT_MAX_CENTS = 100_000_000_000 // 1,000,000,000.00
-const RATE_MAX_BPS = 5_000 // 50.00%
-const MONTHS_MAX = 480
+const AMOUNT_MIN_CENTS = 1_000n // 10.00
+const AMOUNT_MAX_CENTS = 100_000_000_000_000_000n // 1,000,000,000,000,000.00
+const RATE_MAX_BPS = 7_500 // 75.00%
+const MONTHS_MAX = 1_200
 
-// D-38: at least a quarter of runs draw from the corner where rounding errors are largest.
+// D-38 / D-54: at least a quarter of runs draw from the corner where rounding errors are largest.
 const cornerCase = fc.record({
-  cents: f
… [23,283 more characters not shown; see raw/]
```

- **Bash**

```bash
ls e2e; cat package.json | grep -n "e2e\|verify"; (netstat -ano | grep 4173 | head -3)
```

  Result:
```
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
19:    "test:e2e": "playwright test --pass-with-no-tests",
22:    "verify": "npm run lint && npm run format:check && npm run typecheck && npm test && npm run build && npm run size && npm run test:e2e && npm run trace -- --results"
```

- **Bash**

```bash
export CI=1; G='§9\.3|§9\.1|Restore|tampered|AC-9\.2\]|AC-7\.5\]|AC-5\.2\]|AC-5\.4\]|AC-5\.5\]'; F="e2e/s01-calculate.spec.ts e2e/s02-validation.spec.ts e2e/s03-totals.spec.ts e2e/s04-stale.spec.ts e2e/s05-mobile.spec.ts e2e/s06-theme.spec.ts e2e/s07-currency.spec.ts e2e/s09-reset.spec.ts e2e/s10-schedule.spec.ts e2e/s13-balance.spec.ts e2e/spec-rules.spec.ts"; npx playwright test $F --grep-invert "$G" 2>&1 | tail -15; echo exit=${PIPESTATUS[0]}
```

- **Bash**

```bash
export CI=1; G='§9\.3|§9\.1|Restore|tampered|AC-9\.2\]|AC-7\.5\]|AC-5\.2\]|AC-5\.4\]|AC-5\.5\]'; F="e2e/s01-calculate.spec.ts e2e/s02-validation.spec.ts e2e/s03-totals.spec.ts e2e/s04-stale.spec.ts e2e/s05-mobile.spec.ts e2e/s06-theme.spec.ts e2e/s07-currency.spec.ts e2e/s09-reset.spec.ts e2e/s10-schedule.spec.ts e2e/s13-balance.spec.ts e2e/spec-rules.spec.ts"; sleep 1; echo
```

  Result:
```
ok 272 [webkit] › e2e\spec-rules.spec.ts:105:3 › Spec rules: §3.2 state transitions › [SPEC-§3.2] editing while idle keeps the idle text (1.1s)
  ok 271 [webkit] › e2e\spec-rules.spec.ts:91:3 › Spec rules: §3.2 state transitions › [SPEC-§3.2] editing a value back to its original text still leaves results stale (2.1s)
  ok 273 [webkit] › e2e\spec-rules.spec.ts:133:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown currency in settings falls back to PKR and keeps the theme (1.4s)
  ok 274 [webkit] › e2e\spec-rules.spec.ts:142:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] an unknown theme in settings falls back to System and keeps the currency (1.7s)
  ok 276 [webkit] › e2e\spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Light: --input-border has 3:1 contrast on --bg and --surface (1.3s)
  ok 277 [webkit] › e2e\spec-rules.spec.ts:339:5 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.4] Dark: --input-border has 3:1 contrast on --bg and --surface (1.5s)
  ok 278 [webkit] › e2e\spec-rules.spec.ts:355:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§4] the three fields are text inputs with autocomplete off, never type=number (1.6s)
  ok 275 [webkit] › e2e\spec-rules.spec.ts:152:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] settings that are not valid JSON, or not an object, give both defaults (3.6s)
  ok 281 [webkit] › e2e\spec-rules.spec.ts:386:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.3.1] the page has an h1 and the document title is Loan EMI Calculator (900ms)
  ok 280 [webkit] › e2e\spec-rules.spec.ts:378:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.3] error text sits in an aria-live polite container (1.4s)
  ok 279 [webkit] › e2e\spec-rules.spec.ts:365:3 › Spec rules: §8.4 input borders and §8 markup › [SPEC-§8.2] the schedule region and table are named, scrollable by keyboard, with column scopes (2.4s)
  ok 282 [webkit] › e2e\spec-rules.spec.ts:396:3 › Spec rules: §11 NFR-3 and NFR-7 (no network, no cookies) › [SPEC-§11] after a calculation there are no further requests, no cookies (2.5s)
  ok 268 [webkit] › e2e\s13-balance.spec.ts:44:5 › S-13 Balance after each payment › [AC-13.3] balances reconcile row by row and end at 0.00 (L-MAX) (15.7s)

  282 passed (3.6m)
exit=0
```

  Result:
```
(Bash completed with no output)
```

- **Bash**

```bash
export CI=1; G='§9\.3|§9\.1|Restore|tampered|AC-9\.2\]|AC-7\.5\]|AC-5\.2\]|AC-5\.4\]|AC-5\.5\]'; F="e2e/s01-calculate.spec.ts e2e/s02-validation.spec.ts e2e/s03-totals.spec.ts e2e/s04-stale.spec.ts e2e/s05-mobile.spec.ts e2e/s06-theme.spec.ts e2e/s07-currency.spec.ts e2e/s09-reset.spec.ts e2e/s10-schedule.spec.ts e2e/s13-balance.spec.ts e2e/spec-rules.spec.ts"; npx playwright test $F --project=chromium --list 2>&1 | grep -E "^\s+\[" > $TMP/all.txt 2>/dev/null || npx playwright test $F --project=chromium --list > /dev/null; npx playwright test $F --project=chromium --list 2>&1 | grep "›" | sed 's/.*› e2e/e2e/' | sort > /tmp/all.txt; npx playwright test $F --project=chromium --grep-invert "$G" --list 2>&1 | grep "›" | sed 's/.*› e2e/e2e/' | sort > /tmp/kept.txt; wc -l /tmp/all.txt /tmp/kept.txt; comm -23 /tmp/all.txt /tmp/kept.txt
```

  Result:
```
114 /tmp/all.txt
   94 /tmp/kept.txt
  208 total
  [chromium] › s05-mobile.spec.ts:127:3 › S-5 Layout and keypads › [AC-5.4] decimal keypad for amount and rate, numeric for tenure
  [chromium] › s05-mobile.spec.ts:137:5 › S-5 Layout and keypads › wide › [AC-5.5] at 1280 px the form and results sit side by side
  [chromium] › s05-mobile.spec.ts:153:5 › S-5 Layout and keypads › tablet › [AC-5.5] at 768 px they are stacked with the form above the results
  [chromium] › s05-mobile.spec.ts:168:5 › S-5 Layout and keypads › phone › [AC-5.5] at 360 px they are stacked with the form above the results
  [chromium] › s05-mobile.spec.ts:37:3 › S-5 Phone use at 360 x 740 › [AC-5.2] every input, select and button is at least 44 x 44 and inside the viewport
  [chromium] › s07-currency.spec.ts:76:3 › S-7 Currency › [AC-7.5] a saved PKR entry keeps its Rs amounts after switching to USD
  [chromium] › s09-reset.spec.ts:71:3 › S-9 Reset › [AC-9.2] Reset leaves currency, theme and saved calculations alone
  [chromium] › spec-rules.spec.ts:114:3 › Spec rules: §9.2 stored data is validated on load › [SPEC-§9.2] tampered, non-canonical, duplicate-id and bad-date entries are dropped
  [chromium] › spec-rules.spec.ts:177:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] after Clear all in tab B, a Calculate in tab A must not bring the cleared entries back
  [chromium] › spec-rules.spec.ts:206:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] the duplicate check compares with the newest entry as just re-read
  [chromium] › spec-rules.spec.ts:226:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] Delete works by id, not by position, on stale lists
  [chromium] › spec-rules.spec.ts:248:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] a save in tab B appears in tab A through the storage event
  [chromium] › spec-rules.spec.ts:261:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] Clear all in tab B empties tab A through the storage event
  [chromium] › spec-rules.spec.ts:275:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] localStorage.clear() in tab B empties tab A
  [chromium] › spec-rules.spec.ts:285:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] if the focused entry is removed by another tab, focus moves to the heading
  [chromium] › spec-rules.spec.ts:299:3 › Spec rules: §9.3 two tabs › [SPEC-§9.3] if a save fails, saved calculations are unavailable for the rest of the visit
  [chromium] › spec-rules.spec.ts:314:3 › Spec rules: §9.1 / §12.3 Safari-style blocked storage › [SPEC-§9.1] when reading window.localStorage th
… [544 more characters not shown; see raw/]
```

- **Bash**

```bash
ls e2e/review; cat src/domain/types.ts | head -60; grep -n "export" src/domain/loan.ts src/domain/validate.ts; cat playwright.config.ts | head -40
```

  Result:
```
// Domain types (spec §3.1.1). Frozen with the tests at Gate G3.
import type { Decimal } from './money'

export type Unit = 'years' | 'months'
export type Currency = 'PKR' | 'USD'
export type Field = 'amount' | 'rate' | 'tenure'

export type ErrorCode =
  | 'AMOUNT_REQUIRED'
  | 'AMOUNT_NAN'
  | 'AMOUNT_DECIMALS'
  | 'AMOUNT_RANGE'
  | 'RATE_REQUIRED'
  | 'RATE_NAN'
  | 'RATE_DECIMALS'
  | 'RATE_RANGE'
  | 'TENURE_REQUIRED'
  | 'TENURE_WHOLE'
  | 'TENURE_RANGE_YEARS'
  | 'TENURE_RANGE_MONTHS'

/** Raw text exactly as typed. */
export interface RawInputs {
  amount: string
  rate: string
  tenure: string
  unit: Unit
}

/** Validated input. `months = unit === 'years' ? tenure * 12 : tenure`. Obtain only via validateInputs. */
export interface LoanInput {
  amount: Decimal
  annualRate: Decimal
  tenure: number
  unit: Unit
  months: number
}

/** Normalised input as stored in history (spec §6, §9.2). */
export interface CanonicalInput {
  amount: string
  rate: string
  tenure: number
  unit: Unit
}

export type ValidationResult =
  { ok: true; value: LoanInput } | { ok: false; errors: Partial<Record<Field, ErrorCode>> }

export interface ScheduleRow {
  month: number
  payment: Decimal
  interest: Decimal
  principal: Decimal
  balance: Decimal
}

export interface CalculatedLoan {
  input: LoanInput
  monthlyPayment: Decimal
src/domain/loan.ts:6:export function emi(balance: Decimal, monthlyRate: Decimal, months: number): Decimal {
src/domain/loan.ts:13:export function calculateLoan(input: LoanInput): CalculatedLoan {
src/domain/validate.ts:52:export function validateInputs(raw: RawInputs): ValidationResult {
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
    { name: 'webkit', use: { ...devi
… [264 more characters not shown; see raw/]
```

- **Bash**

```bash
sed -n 200,232p docs/spec/technical-spec.md; cat src/domain/loan.ts
```

  Result:
````
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
    // Multiply first, so half-cent ties are exact (D-37).
    const interest = round2(balance.times(annualRate).div(1200))
    let payment: Decimal
    let principal: Decimal
    if (month < months) {
      payment = round2(emi(balance, monthlyRate, months - month + 1))
      principal = payment.minus(interes
… [645 more characters not shown; see raw/]
````

- **Bash**

```bash
cat > e2e/review/probe-fuzz.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
import DecimalLib from 'decimal.js'
import { validateInputs } from '../../src/domain/validate'
import { calculateLoan } from '../../src/domain/loan'

// Own PRNG (mulberry32), seeds unrelated to the developer's 20261017.
function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const D = DecimalLib.clone({ precision: 120, rounding: DecimalLib.ROUND_HALF_UP })

test('probe: fuzz 20k loans', async () => {
  test.setTimeout(3_000_000)
  const N = Number(process.env.PROBE_N ?? 20000)
  const rand = rng(Number(process.env.PROBE_SEED ?? 90210))
  const ri = (lo: number, hi: number) => lo + Math.floor(rand() * (hi - lo + 1))
  const bigAmount = () => {
    const mag = ri(1, 15)
    const whole = BigInt(Math.floor(rand() * 10 ** Math.min(mag, 15))) * 10n ** BigInt(Math.max(0, mag - 15))
    const w = whole < 10n ? 10n : whole > 10n ** 15n ? 10n ** 15n : whole
    return `${w}.${String(ri(0, 99)).padStart(2, '0')}`
  }
  let fails: string[] = []
  let ran = 0, maxLast = 0, lastOver1 = 0
  const bounds = [
    ['10', '0', 1], ['10', '75', 1200], ['1000000000000000', '75', 1200], ['1000000000000000', '0', 1200],
    ['10', '0.01', 1], ['10', '0', 1200], ['1000000000000000', '0.01', 1], ['1000000000000000', '75', 1],
    ['10', '75', 1], ['1000000000000000', '0', 1],
  ] as const
  const cases: { a: string; r: string; m: number }[] = bounds.map(([a, r, m]) => ({ a, r, m }))
  for (let i = 0; i < N; i++) {
    const k = rand()
    let a: string, r: string, m: number
    if (k < 0.35) {
      a = `${ri(10, 20000)}.${String(ri(0, 99)).padStart(2, '0')}`
      r = `${ri(45, 74)}.${String(ri(0, 99)).padStart(2, '0')}`
      m = ri(900, 1200)
    } else if (k < 0.5) {
      a = `${ri(10, 20000)}`; r = String(ri(0, 75)); m = ri(1, 1200)
    } else {
      a = bigAmount(); r = `${ri(0, 74)}.${String(ri(0, 99)).padStart(2, '0')}`; m = ri(1, 1200)
    }
    if (a === '1000000000000000.00') a = '1000000000000000'
    if (Number(a) > 1e15) a = '1000000000000000'
    cases.push({ a, r, m })
  }
  for (const c of cases) {
    const v = validateInputs({ amount: c.a, rate: c.r, tenure: String(c.m), unit: 'months' })
    if (!v.ok) { fails.push(`invalid ${JSON.stringify(c)} ${JSON.stringify(v.errors)}`
… [2,289 more characters not shown; see raw/]
```

  Result:
```
Running 1 test using 1 worker

[1/1] [chromium] › e2e\review\probe-fuzz.spec.ts:19:1 › probe: fuzz 20k loans
[chromium] › e2e\review\probe-fuzz.spec.ts:19:1 › probe: fuzz 20k loans
PROBE ran=310 oracle=8 maxLastDev=0.01 lastOver0.01=0 fails=0



  1 passed (10.0s)

real	0m12.199s
user	0m0.152s
sys	0m0.167s
```

- **Bash**

```bash
export CI=1; PROBE_N=20000 timeout 590 npx playwright test e2e/review/probe-fuzz.spec.ts --project=chromium --reporter=line 2>&1 | tail -30
```

  Result:
```
Running 1 test using 1 worker

[1/1] [chromium] › e2e\review\probe-fuzz.spec.ts:19:1 › probe: fuzz 20k loans
[chromium] › e2e\review\probe-fuzz.spec.ts:19:1 › probe: fuzz 20k loans
PROBE ran=20010 oracle=501 maxLastDev=0.02 lastOver0.01=22 fails=0



  Slow test file: [chromium] › e2e\review\probe-fuzz.spec.ts (6.1m)
  Consider running tests from slow files in parallel. See: https://playwright.dev/docs/test-parallel
  1 passed (6.1m)
```

- **Bash**

```bash
rm e2e/review/probe-fuzz.spec.ts && cat > e2e/review/explore-d54.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'

async function calc(page, a: string, r: string, t: string, unit = 'Years') {
  await page.getByLabel(/^Loan amount/).fill(a)
  await page.getByLabel(/^Annual interest rate/).fill(r)
  await page.getByLabel(/^Loan tenure/).fill(t)
  await page.getByLabel(/^Tenure unit|Unit/).first().selectOption({ label: unit }).catch(() => {})
  await page.getByRole('button', { name: 'Calculate' }).click()
}

test.use({ viewport: { width: 360, height: 740 } })

test('L-MAX at 360px', async ({ page }) => {
  await page.goto('./')
  await calc(page, '1000000000000000', '75', '100')
  await page.waitForTimeout(500)
  const info = await page.evaluate(() => {
    const out: Record<string, unknown> = {
      doc: document.documentElement.scrollWidth, view: window.innerWidth,
    }
    const dds = [...document.querySelectorAll('dd, output, [data-testid]')].map((e) => {
      const r = e.getBoundingClientRect()
      return { t: e.textContent, l: r.left, r: r.right, sw: (e as HTMLElement).scrollWidth, cw: (e as HTMLElement).clientWidth }
    }).filter((x) => x.t && /Rs/.test(x.t))
    out.dds = dds
    return out
  })
  console.log('R1', JSON.stringify(info))
  await page.screenshot({ path: process.env.SHOT_DIR + '/max360.png', fullPage: false })
})

test('L-MAX at 360px dark with 200% zoom approximation (180px css)', async ({ page }) => {
  await page.setViewportSize({ width: 180, height: 740 })
  await page.goto('./')
  await calc(page, '1000000000000000', '75', '100')
  await page.waitForTimeout(500)
  const info = await page.evaluate(() => ({
    doc: document.documentElement.scrollWidth, view: window.innerWidth,
    dds: [...document.querySelectorAll('dd')].map((e) => { const r = e.getBoundingClientRect(); return { t: e.textContent, l: r.left, r: r.right, sw: e.scrollWidth, cw: e.clientWidth } }),
  }))
  console.log('R2', JSON.stringify(info))
  await page.screenshot({ path: process.env.SHOT_DIR + '/max200.png' })
})

test('error messages and rate edges', async ({ page }) => {
  await page.goto('./')
  for (const rate of ['75', '75.01', '75.001', '75.00', '74.99']) {
    await calc(page, '1000000', rate, '1')
    const errs = await page.locator('[id*="error"], [role="alert"], .error').allTextContents()
    const m = await page.getByText(/Monthly payment/).first().isVisible().catch(() => false)
    console.log('R3 rate', rate, JSON.stringify(errs),
… [1,608 more characters not shown; see raw/]
```

  Result:
```
Running 4 tests using 4 workers
[2/4] [chromium] › e2e\review\explore-d54.spec.ts:45:1 › error messages and rate edges
[chromium] › e2e\review\explore-d54.spec.ts:45:1 › error messages and rate edges
R3 rate 75 ["","",""] results true
R3 rate 75.01 ["","Interest rate must be between 0 and 75%.",""] results false
R3 rate 75.001 ["","Interest rate can have at most 2 decimal places.",""] results false
R3 rate 75.00 ["","",""] results true
R1 {"doc":360,"view":360,"dds":[{"t":"Rs 62,500,000,000,000.00","l":33,"r":307.03125,"sw":274,"cw":274},{"t":"Rs 74,000,000,000,000,003.34","l":33,"r":245.890625,"sw":213,"cw":213},{"t":"Rs 75,000,000,000,000,003.34","l":33,"r":245.890625,"sw":213,"cw":213}]}
[chromium] › e2e\review\explore-d54.spec.ts:45:1 › error messages and rate edges
R3 rate 74.99 ["","",""] results true
R3 9.99 1 Years ["Loan amount must be between 10 and 1,000,000,000,000,000.","",""]
R3 1000000000000000.01 1 Years ["Loan amount must be between 10 and 1,000,000,000,000,000.","",""]
R3 10 101 Years ["","","Loan tenure must be between 1 and 100 years."]
R3 10 1201 Months ["","","Loan tenure must be between 1 and 1,200 months."]
R4 {"top":43995,"h":44437,"c":442} 1200 62,500,000,000,000.00 3,676,470,588,235.29 58,823,529,411,764.71 0.00
R2 {"doc":180,"view":180,"dds":[{"t":"Rs 62,500,000,000,000.00","l":33,"r":147,"sw":114,"cw":114},{"t":"Rs 74,000,000,000,000,003.34","l":33,"r":147,"sw":114,"cw":114},{"t":"Rs 75,000,000,000,000,003.34","l":33,"r":147,"sw":114,"cw":114}]}
R4 after PageUp x5 42065
[chromium] › e2e\review\explore-d54.spec.ts:45:1 › error messages and rate edges
R3 10 1200 Months ["","",""]
R4 doc width 360
[chromium] › e2e\review\explore-d54.spec.ts:45:1 › error messages and rate edges
R3 10 100 Years ["","",""]
  4 passed (11.1s)
/c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad
```

- **Read** · C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\scratchpad\max200.png

```json
{
 "file_path": "C:\\Users\\ARSLAN~1.NIN\\AppData\\Local\\Temp\\claude\\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\\scratchpad\\max200.png"
}
```

  Result:
```
[image]
```

- **Read** · C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\scratchpad\max360.png

```json
{
 "file_path": "C:\\Users\\ARSLAN~1.NIN\\AppData\\Local\\Temp\\claude\\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\\scratchpad\\max360.png"
}
```

  Result:
```
[image]
```

- **Bash**

```bash
cat > e2e/review/explore2.spec.ts <<'EOF'
import { test } from '@playwright/test'
test.use({ viewport: { width: 180, height: 740 } })
test('r', async ({ page }) => {
  await page.goto('./')
  await page.getByLabel(/^Loan amount/).fill('1000000000000000')
  await page.getByLabel(/^Annual interest rate/).fill('75')
  await page.getByLabel(/^Loan tenure/).fill('100')
  await page.getByRole('button', { name: 'Calculate' }).click()
  await page.getByText('Total interest').first().scrollIntoViewIfNeeded()
  await page.screenshot({ path: process.env.SHOT_DIR + '/max200b.png' })
  const clipped = await page.evaluate(() => [...document.querySelectorAll('button,input,select,dd,dt,th,td')].filter(e => e.scrollWidth > e.clientWidth + 1).map(e => e.tagName + ':' + (e.textContent||'').slice(0,30) + ' ' + e.scrollWidth + '>' + e.clientWidth))
  console.log('R5', JSON.stringify(clipped.slice(0, 15)))
})
EOF
SHOT=/c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad; export CI=1 SHOT_DIR="$SHOT"; npx playwright test e2e/review/explore2.spec.ts --project=chromium --reporter=line 2>&1 | grep -E "^R5|passed|failed"
```

- **Read** · C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\scratchpad\max200b.png

```json
{
 "file_path": "C:\\Users\\ARSLAN~1.NIN\\AppData\\Local\\Temp\\claude\\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\\scratchpad\\max200b.png"
}
```

  Result:
```
R5 ["INPUT: 158>112","BUTTON:Calculate 80>56","BUTTON:Reset 54>46"]
  1 passed (6.1s)
```

  Result:
```
[image]
```

- **Bash**

```bash
ls src src/*; grep -rn "validateInputs\|AMOUNT_MAX\|1000000000" src --include=*.ts --include=*.tsx -l | grep -v test; grep -n "L-MAX\|481\|480\|40 years\|1,000,000,000\b" docs/user-stories.md docs/spec/technical-spec.md docs/process/*.md README.md 2>/dev/null | grep -v "review-findings" | head -20; rm e2e/review/explore2.spec.ts e2e/review/explore-d54.spec.ts; netstat -ano | grep 4173; git status --short
```

  Result:
```
src/main.tsx

src:
domain
main.tsx
storage
ui

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
types.ts
validate.test.ts
validate.ts

src/storage:
safeStorage.ts
settings.ts

src/ui:
App.tsx
AppContext.tsx
app.css
appReducer.ts
components
copy.ts
theme.css
src/domain/types.ts
src/domain/validate.ts
src/ui/components/LoanForm.tsx
docs/user-stories.md:48:| L-MAX | 1,000,000,000,000,000 | 75% | 100 years (1,200 months) | Rs 62,500,000,000,000.00 | Rs 74,000,000,000,000,003.34 | Rs 75,000,000,000,000,003.34 |
docs/user-stories.md:66:- **AC-1.7** Given the largest accepted values (L-MAX: `1000000000000000`, `75`, `100` **Years**), when I Calculate, then **Monthly payment** shows `Rs 62,500,000,000,000.00`.
docs/user-stories.md:83:- **AC-2.4** Given loan amount `0`, `-500` or `9.99` (each tried separately), when I Calculate, then I see `Loan amount must be between 10 and 1,000,000,000,000,000.`
docs/user-stories.md:84:- **AC-2.5** Given loan amount `1000000000000000.01`, when I Calculate, then I see `Loan amount must be between 10 and 1,000,000,000,000,000.`; and given loan amount `1000000000000000`, no loan-amount message is shown.
docs/user-stories.md:94:- **AC-2.15** Given a loan amount of 40 nines (`9999999999999999999999999999999999999999`), when I Calculate, then I see `Loan amount must be between 1,000 and 1,000,000,000.`, and when I then correct the inputs to L-A values and Calculate, the L-A results are shown.
docs/user-stories.md:107:- **AC-3.5** Given L-MAX, when I Calculate, then **Total interest** shows `Rs 74,000,000,000,000,003.34` and **Total amount payable** shows `Rs 75,000,000,000,000,003.34`, in full, with no truncation, ellipsis or scientific notation.
docs/user-stories.md:125:- **AC-5.1** Given a viewport 360 px wide, when the page loads and after I calculate L-MAX (1,200 schedule rows), then the page never scrolls horizontally (document width ≤ viewport width).
docs/user-stories.md:130:- **AC-5.6** Given a viewport 360 px wide and L-MAX results, then every amount in the summary is fully visible (wrapping onto a new line is allowed; clipping is not).
docs/user-stories.md:188:- **AC-10.8** Given L-MAX, when I Calculate, then all 1,200 rows are shown, and the 1,200th row is in the page within 1 second of selecting Calculate. The time is measured inside the page, in each browser, both locally and on the CI test machine.
docs/spec/technical-spec.md:167:| Loan amount |
… [3,994 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -rn "2\.15" e2e src --include=*.ts | head; grep -rnE "1,000 and|between 1 and (40|480)|0 and 50%|by 0\.01 because|within 0\.01|\b50%|1,000,000,000[^,0]" docs/user-stories.md docs/spec/technical-spec.md README.md docs/process/*.md 2>/dev/null | grep -v "review-findings\|loop-plan" | head -20
```

  Result:
```
e2e/s02-validation.spec.ts:187:  test('[AC-2.15] a 40-digit amount is out of range and the form recovers', async ({ page }) => {
src/domain/validate.test.ts:160:  it('[AC-2.15] 40 nines as the amount is AMOUNT_RANGE, compared exactly, and nothing throws', () => {
src/domain/validate.test.ts:164:  it('[AC-2.15] after a 40-nines failure, L-A values validate normally', () => {
docs/user-stories.md:94:- **AC-2.15** Given a loan amount of 40 nines (`9999999999999999999999999999999999999999`), when I Calculate, then I see `Loan amount must be between 1,000 and 1,000,000,000.`, and when I then correct the inputs to L-A values and Calculate, the L-A results are shown.
docs/spec/technical-spec.md:237:Re-computing the instalment from the remaining balance each month stops the error compounding. We verified over the whole input range (exact decimal simulation; D-54 lists the searches, tens of thousands of cases including every boundary corner) that it ends at exactly 0.00, never ends early, never produces a negative principal, and that **every payment is within 0.01 of the headline payment, except the final payment, which is within 0.02** (D-55: about 0.02% of loans have a final payment 0.02 away; an earlier claim of 0.01 for every payment was wrong). Every row stays verifiable by hand: interest = opening balance × r, rounded, and principal = payment − interest.
docs/spec/technical-spec.md:264:  - `10000`, `36`, `359` months: headline `300.01`; exactly 359 rows; final balance `0.00`; every payment within 0.01 of `300.01` (the final one within 0.02, D-55). (The fixed method pays off at month 352.)
docs/spec/technical-spec.md:265:  - `10000.82`, `30`, `360` months: headline `250.05`; exactly 360 rows; final balance `0.00`; every payment within 0.01 of `250.05` (the final one within 0.02, D-55). (The fixed method's final instalment is `1,767.73`.)
docs/process/manual-test-checklist.md:109:- [ ] **AC-10.5** For L-A and L-B, every Payment in the schedule except the last is within 0.01 of the **Monthly payment** shown in the summary, and the last Payment is within 0.02 of it.
```

- **Bash**

```bash
grep -nE "\b(480|481|40 years|41)\b|50\.01|999\.99|1,000\.0|1000\.01|41,666|19,000" docs/user-stories.md docs/spec/technical-spec.md docs/process/manual-test-checklist.md README.md 2>/dev/null | head -20; tail -30 docs/process/review-findings.md
```

  Result:
```
docs/user-stories.md:49:| L-Z3 | 1,000 | 0% | 3 months | Rs 333.33 | Rs 0.00 | Rs 1,000.00 |
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
- Corrupt settings (`null`, `{}`, `{"theme":null}`, `{"currency":"usd"}`, `"dark"`, `[]`, `0`, `true`, `{"theme":"DARK"}`, 2,000,000-character string): selects show System / PKR, no console errors. `{"theme":"dark","currency":"EUR"}` keeps
… [2,350 more characters not shown; see raw/]
```

- **Bash**

```bash
netstat -ano | grep 4173 | grep -c LISTEN; ls e2e/review; git status --short; git log -p g3-tests-approved..HEAD -- e2e src/'**'/'*.test.*' test playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/' | grep -nE "^\+.*(\.skip|\.only|\.fixme|test\.fail)" | head
```

  Result:
```
0
```

</details>

### 🤖 Claude · 2026-10-18 14:21 PKT

Now append to the findings file.

<details><summary>🔧 2 tool call(s): Bash ×2</summary>

- **Bash**

```bash
cat >> docs/process/review-findings.md <<'EOF'

---

## 2026-10-18: D-54/D-55 change (widened limits, corrected payment guarantee, D-56 readings)
Reviewer: code-reviewer. Commits: 8797b10 (spec, ACs, decisions), 16c8cc8 (frozen tests, owner-authorised), 34a06b8 (code), 0c510f5 (D-56).

### Gate
- `npx vitest run`: 7 files, 297 tests passed, exit 0 (matches the developer).
- `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run format:check` exit 0.
- `CI=1 npx playwright test s01 s02 s03 s04 s05 s06 s07 s09 s10 s13 spec-rules --grep-invert "§9\.3|§9\.1|Restore|tampered|AC-9\.2\]|AC-7\.5\]|AC-5\.2\]|AC-5\.4\]|AC-5\.5\]"`: **282 passed (3.6m)**, exit 0. Reproduced.
- `--list` (chromium): 114 tests in those specs, 94 kept, 20 excluded. The 20 are: AC-5.2, AC-5.4, AC-5.5 x3 (group 6 layout), AC-7.5, AC-9.2 (group 5), `[SPEC-§9.2]` tampered, all 8 `[SPEC-§9.3]` tests, both `[SPEC-§9.1]` blocked-storage tests, and both Restore `[SPEC-§3.2]` tests. 94 x 3 = 282, so nothing else is dropped. s08, s11 and s12 are not in the run. Note that the case-insensitive `Restore` also matches only the two intended tests.
- Port 4173: no listener left (only TIME_WAIT sockets). Probe files deleted; `e2e/review/` is empty and `git status` is clean.

### Test integrity (16c8cc8 against the new text in 8797b10)
- Every changed expected value is a hard-coded literal that matches the AC/spec text exactly: L-MIN `Rs 10.00 / Rs 0.00 / Rs 10.00`, `Rs 10.00 at 0.01% for 1 month`; L-MAX `Rs 62,500,000,000,000.00 / Rs 74,000,000,000,000,003.34 / Rs 75,000,000,000,000,003.34`; 1,200 rows (1,201 `<tr>`), 100 years; limits 10, 10^15, 75, 100 years, 1,200 months, the new messages and the note. Nothing is computed from the code under test.
- D-55 weakening is exactly as authorised: `e2e/fixtures.ts` `checkScheduleArithmetic` uses `diff <= 2n` for the last row only (index `months - 1`), `<= 1n` for all others; `loan.property.test.ts` uses `TWO_CENTS` for the last row only; the two §5.3 regression tests check rows 1..n-1 at 0.01 and the last at 0.02. `showRoundingNote === differs` is unchanged. No other assertion is looser.
- No deleted test, no `.skip/.only/.fixme/test.fail` added (grep of the whole `g3-tests-approved..HEAD` patch). Test counts unchanged (297).
- Incidental edits are each forced by an old invalid value becoming valid (SPEC-§3.2 tenure 41 to 101, AC-2.11 rate 60 to 99, validate cases moved to 75.01, 5000 and 1201). `[SPEC-§4.2]` `00012` now valid and `.5`, `9.99`, `10000000
… [5,250 more characters not shown; see raw/]
```

  Result (error):
```
Exit code 2
/usr/bin/bash: -c: line 49: unexpected EOF while looking for matching `''
```

- **Bash**

```bash
grep -c "D-54/D-55 change" docs/process/review-findings.md; git log --oneline -3 -- e2e/s09-reset.spec.ts; tail -3 docs/process/review-findings.md | cut -c1-80
```

  Result:
```
0
749144e test(S-9): fix AC-9.2 expected currency of USD-made entries (owner-approved, D-46)
41aac8d test(e2e): Playwright specs for S-1 to S-13 and spec rules (Phase 3)
Pending, not defects: AC-7.5 and AC-9.2 (need saved calculations, group 5).

BLOCKING FINDINGS: 0
```

</details>

### 🤖 Claude · 2026-10-18 14:22 PKT

Not appended. I'll write the section to the scratchpad via heredoc with a quoted delimiter, then append.

<details><summary>🔧 2 tool call(s): Bash, SubagentHandback</summary>

- **Bash**

```bash
cat > "$TMP/sec.md" <<'EOFSEC' 2>/dev/null || true
EOFSEC
S=/c/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/scratchpad/sec.md
cat > "$S" <<'EOFSEC'

---

## 2026-10-18: D-54/D-55 change (widened limits, corrected payment guarantee, D-56 readings)
Reviewer: code-reviewer. Commits: 8797b10 (spec, ACs, decisions), 16c8cc8 (frozen tests, owner-authorised), 34a06b8 (code), 0c510f5 (D-56).

### Gate
- `npx vitest run`: 7 files, 297 tests passed, exit 0 (matches the developer).
- `npm run lint` exit 0; `npm run typecheck` exit 0; `npm run format:check` exit 0.
- `CI=1 npx playwright test` on specs s01 s02 s03 s04 s05 s06 s07 s09 s10 s13 spec-rules with the developer's `--grep-invert`: **282 passed (3.6m)**, exit 0. Reproduced.
- `--list` (chromium): 114 tests in those specs, 94 kept, 20 excluded (94 x 3 = 282). The 20 are: AC-5.2, AC-5.4, AC-5.5 x3 (group 6 layout), AC-7.5, AC-9.2 (group 5), the `[SPEC-§9.2]` tampered test, all 8 `[SPEC-§9.3]` tests, both `[SPEC-§9.1]` blocked-storage tests, and both Restore `[SPEC-§3.2]` tests. Nothing else is dropped. s08, s11 and s12 are not in the run.
- Port 4173: no listener left. Probe files deleted; `e2e/review/` is empty and `git status` is clean.

### Test integrity (16c8cc8 against the new text in 8797b10)
- Every changed expected value is a hard-coded literal that matches the AC/spec text exactly: L-MIN `Rs 10.00 / Rs 0.00 / Rs 10.00` and `Rs 10.00 at 0.01% for 1 month`; L-MAX `Rs 62,500,000,000,000.00 / Rs 74,000,000,000,000,003.34 / Rs 75,000,000,000,000,003.34`; 1,200 rows (1,201 `<tr>`), 100 years; limits 10, 10^15, 75, 100 years, 1,200 months; the new messages and the note. Nothing is computed from the code under test.
- D-55 loosening is exactly as authorised: `e2e/fixtures.ts` `checkScheduleArithmetic` allows `2n` for the last row only (index `months - 1`) and `1n` for all others; `loan.property.test.ts` uses `TWO_CENTS` for the last row only; the two §5.3 regression tests check rows 1..n-1 at 0.01 and the last at 0.02. `showRoundingNote === differs` is unchanged. No other assertion is looser.
- No deleted test and no `.skip/.only/.fixme/test.fail` added (grep over the whole `g3-tests-approved..HEAD` patch). Vitest count is 297.
- Incidental edits are each forced by an old invalid value becoming valid (SPEC-§3.2 tenure 41 to 101, AC-2.11 rate 60 to 99, validate cases moved to 75.01, 5000 and 1201). `00012` now valid and `.
… [4,509 more characters not shown; see raw/]
```

  Result:
```
1
Checking formatting...
All matched files use Prettier code style!
 M docs/process/review-findings.md
```

- **SubagentHandback**

```json
{
 "message": "I found no blocking defects in the D-54/D-55 change; the one Major finding is a stale acceptance criterion (AC-2.15) in `docs/user-stories.md`. I appended the dated \"D-54/D-55 change\" section to `C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\review-findings.md`. Earlier sections are untouched and the file passes prettier. I did not edit `src/` or any frozen test, and no probe files remain.\n\n**1. Gate**\n- `npx vitest run`: 297 of 297 passed, exit 0.\n- `npm run lint`, `npm run typecheck` and `npm run format:check` all exited 0.\n- The developer's e2e command with `CI=1`: 282 passed in 3.6 minutes, exit 0. I reproduced it.\n- `--list` on chromium shows 114 tests in those specs, 94 kept and 20 excluded, and 94 × 3 = 282. The 20 excluded tests are:\n  - AC-5.2, AC-5.4 and AC-5.5 (three tests);\n  - AC-7.5 and AC-9.2;\n  - the `[SPEC-§9.2]` tampered test;\n  - all eight `[SPEC-§9.3]` tests;\n  - both `[SPEC-§9.1]` blocked-storage tests;\n  - both Restore `[SPEC-§3.2]` tests.\n- The s08, s11 and s12 specs are not in this run.\n- Nothing is listening on port 4173.\n\n**2. Test integrity**\n- Every changed expectation in 16c8cc8 is a hard-coded literal that matches the new text exactly. That covers the L-MIN and L-MAX figures, 1,200 rows (1,201 `<tr>`), the new limits, messages and note.\n- The only loosening is the one D-55 allows. The last row gets 0.02 (`diff <= 2n` in `e2e/fixtures.ts`, `TWO_CENTS` in `loan.property.test.ts`, and the 
… [2,888 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

