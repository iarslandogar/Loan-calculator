# Subagent 11: test-designer: Update tests for D-54/D-55 limits

Subagent **`test-designer`**, task: *Update tests for D-54/D-55 limits*. Started 2026-10-18 13:58 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 13:58 PKT

> Owner-approved post-G3 update of the frozen tests (decisions D-54 and D-55 in docs/spec/decision-log.md — read both first, and the commit 8797b10 diff: `git show 8797b10 -- docs/user-stories.md docs/spec/technical-spec.md`). The ACs and spec changed; update the tests so they test exactly the NEW approved text. Change nothing that the new text does not require.
> 
> What changed (all now in docs/user-stories.md and docs/spec/technical-spec.md):
> - Limits: amount 10 to 1,000,000,000,000,000; rate 0 to 75%; tenure 1 to 100 years / 1 to 1,200 months.
> - Copy: `Loan amount must be between 10 and 1,000,000,000,000,000.` / `Interest rate must be between 0 and 75%.` / `Loan tenure must be between 1 and 100 years.` / `Loan tenure must be between 1 and 1,200 months.` / rounding note `Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.`
> - Reference loans: L-MIN = 10, 0.01%, 1 month → Rs 10.00 / Rs 0.00 / Rs 10.00. L-MAX = 1000000000000000, 75%, 100 Years (1,200 months) → monthly Rs 62,500,000,000,000.00, total interest Rs 74,000,000,000,000,003.34, total payable Rs 75,000,000,000,000,003.34.
> - AC-1.6, 1.7, 2.4 (0, -500, 9.99), 2.5 (1000000000000000.01 out; 1000000000000000 accepted), 2.7 (-1, 75.01 out; 0, 75 accepted), 2.10 (0/101 years, 0/1201 months out; 100 years and 1200 months accepted), 3.4, 3.5, 5.1 (1,200 rows), 10.5 (every payment except the last within 0.01; the last within 0.02), 10.6 (new note text), 10.8 (all 1,200 rows; the 1,200th row within 1 s).
> - Spec §4.2 [SPEC-§4.2] table rows changed (`10`, `10.00`, `1000`, `00012`, `1000000000000000` valid; `.5`, `9.99`, `1000000000000000.01` → AMOUNT_RANGE). §5.4 invariant 6 changed as in AC-10.5. §5.4 corner-biased generators: amounts 10–20,000, rates 45–75%, tenures 900–1,200 months, and every new exact bound (10; 10^15; 0%; 75%; 1 month; 1,200 months) must appear. NFR-4 / AC-10.8: 1,200th row.
> 
> Files likely affected (find every place with `grep`): e2e/fixtures.ts (COPY strings, LOANS.MIN, LOANS.MAX incl. amountCents/rateNum/rateDen/months/line1), e2e/s01, s02, s03, s05, s10, s13 specs, spec-rules if it uses bounds, src/domain/validate.test.ts, parse.test.ts (if it uses bounds), loan.test.ts (L-MIN/L-MAX), loan.property.test.ts (generator bounds, invariant 6, bound corners), format.test.ts (toCanonical "largest/smallest values" cases), test/helpers.ts, and docs/process/manual-test-checklist.md (the lines for the changed ACs).
> 
> Rules:
> - Expected values are hard-coded from the ACs/spec text above — never computed with app code.
> - No `.skip/.only/.fixme/.todo/.fails`; do not weaken any assertion that the new text doesn't require weakening; do not delete tests (a test may change its values to the new bounds).
> - Do NOT edit src/ (other than *.test.ts), configs, or anything else. Do not commit.
> - Then run: `npx prettier --check` and `npx eslint --max-warnings 0` on every file you changed, `npm run typecheck`, and `npx vitest run --project domain`. The implementation has NOT been updated yet, so tests for the new bounds/copy are expected to FAIL for the right reason (old limits in validate.ts / old copy) — list exactly which Vitest tests fail and why. Do not run the E2E suite (the developer will).
> 
> Report: every file changed with a one-line reason per change, the full `git diff --stat`, the list of failing Vitest tests with the reason, and anything in the new AC/spec text you found ambiguous.

<details><summary>🔧 2 tool call(s): Bash ×2</summary>

- **Bash**

```bash
git show 8797b10 --stat | head -20; git show 8797b10 -- docs/user-stories.md docs/spec/technical-spec.md | head -400; grep -n "D-54\|D-55" docs/spec/decision-log.md | head
```

  Result:
```
commit 8797b103abb45e2ff35a2fa2f0000badbf4a55c1
Author: Muhammad Arslan <arslan8954@gmail.com>
Date:   Sun Oct 18 13:58:04 2026 +0500

    docs(D-54, D-55): widen input limits and correct the payment guarantee; approve G4.4
    
    Owner-approved (2026-10-18). Limits: amount 10 to 10^15, rate 0 to 75%,
    tenure 1 to 100 years / 1 to 1,200 months (supersede D-02's bounds; verified
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
commit 8797b103abb45e2ff35a2fa2f0000badbf4a55c1
Author: Muhammad Arslan <arslan8954@gmail.com>
Date:   Sun Oct 18 13:58:04 2026 +0500

    docs(D-54, D-55): widen input limits and correct the payment guarantee; approve G4.4
    
    Owner-approved (2026-10-18). Limits: amount 10 to 10^15, rate 0 to 75%,
    tenure 1 to 100 years / 1 to 1,200 months (supersede D-02's bounds; verified
    by exact-decimal searches recorded in D-54). Guarantee (D-55): every payment
    within 0.01 of the headline except the final one, within 0.02. Updates spec
    §4.2, §5.3, §5.4, §7, NFR-4; ACs 1.6, 1.7, 2.4, 2.5, 2.7, 2.10, 3.4, 3.5,
    5.1, 10.5, 10.6, 10.8; L-MIN and L-MAX reference loans. G4.4 (D-52, D-53)
    approved.
    
    Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>

diff --git a/docs/spec/technical-spec.md b/docs/spec/technical-spec.md
index 33371cd..b37c8bc 100644
--- a/docs/spec/technical-spec.md
+++ b/docs/spec/technical-spec.md
@@ -164,9 +164,9 @@ Number pattern: `^-?(\d+(\.\d*)?|\.\d+)$`, where `\d` means the ASCII digits `0`
 
 | Field | 1. Empty | 2. Format | 3. Precision | 4. Range |
 |---|---|---|---|---|
-| Loan amount | `AMOUNT_REQUIRED` | not a number → `AMOUNT_NAN` | more than 2 dp → `AMOUNT_DECIMALS` | outside 1,000 to 1,000,000,000 inclusive → `AMOUNT_RANGE` |
-| Interest rate | `RATE_REQUIRED` | → `RATE_NAN` | more than 2 dp → `RATE_DECIMALS` | outside 0 to 50 inclusive → `RATE_RANGE` |
-| Loan tenure | `TENURE_REQUIRED` | not
… [22,650 more characters not shown; see raw/]
```

- **Bash**

```bash
git status --short | head; sed -n 436,480p docs/spec/decision-log.md; grep -rnE "1,?000,?000,?000|480|\b40\b|\b41\b|481|\b50\b|50\.01|999\.99|1000\.01|41,666|19,000|20,000,000|differ by 0\.01|0\.01|1,000 and|\b1000\b" e2e src --include=*.ts --include=*.tsx -l; ls e2e src/domain src/ui test
```

  Result:
```
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
- **Decision (owner, 2026-10-18):** **amount 10 to 1,000,000,000,000,000; rate 0 to 75%; tenure 1 to 100 years or 1 to 1,200 months** (75% rather than 90%, for margin below where failures start). This **supersedes the bounds in D-02**; D-02's other reasoning stands.
- **Copy:**
  - `Loan amount must be between 10 and 1,000,000,000,000,000.`
  - `Interest rate must be between 0 and 75%.`
  - `Loan tenure must be between 1 and 
… [3,888 more characters not shown; see raw/]
```

</details>

### 🤖 Claude · 2026-10-18 13:58 PKT

Let me start with fixtures.

<details><summary>🔧 18 tool call(s): Bash ×17, SubagentHandback</summary>

- **Bash**

```bash
cat e2e/fixtures.ts; ls e2e/review
```

  Result:
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
  rounding: 'Some payments differ by 0.01 because amounts are rounded to 2 decimal places.',
  historyEmpty: 'No saved calculations yet.',
  historyUnavailable:
    "Saved calculations aren't available in this browser. Calculations still work.",
  removeFailed:
    "Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.",
  dialogText: "Clear all saved calculations? This can't be undone.",
  dialogHint: "This doesn't clear the form. Select Reset to do that.",
  currencyNote: 'Changing currency changes the symbol only. Amounts are not converted.',
  amountRequired: 'Ente
… [18,375 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'EOF'
import re
p='e2e/fixtures.ts'
s=open(p,encoding='utf8').read()
def rep(a,b):
    global s
    assert a in s,a
    s=s.replace(a,b,1)
rep("differ by 0.01 because","differ by up to 0.02 because")
rep("between 1,000 and 1,000,000,000.'","between 10 and 1,000,000,000,000,000.'")
rep("between 0 and 50%.'","between 0 and 75%.'")
rep("between 1 and 40 years.'","between 1 and 100 years.'")
rep("between 1 and 480 months.'","between 1 and 1,200 months.'")
rep("""    amount: '1000',
    rate: '0.01',
    tenure: '1',
    unit: 'Months',
    monthly: 'Rs 1,000.01',
    interest: 'Rs 0.01',
    total: 'Rs 1,000.01',
    line1: 'Rs 1,000.00 at 0.01% for 1 month',
    amountCents: 100_000n,""","""    amount: '10',
    rate: '0.01',
    tenure: '1',
    unit: 'Months',
    monthly: 'Rs 10.00',
    interest: 'Rs 0.00',
    total: 'Rs 10.00',
    line1: 'Rs 10.00 at 0.01% for 1 month',
    amountCents: 1_000n,""")
rep("""    amount: '1000000000',
    rate: '50',
    tenure: '40',
    unit: 'Years',
    monthly: 'Rs 41,666,666.80',
    interest: 'Rs 19,000,000,061.79',
    total: 'Rs 20,000,000,061.79',
    line1: 'Rs 1,000,000,000.00 at 50% for 40 years',
    amountCents: 100_000_000_000n,
    rateNum: 50n,
    rateDen: 1n,
    months: 480,""","""    amount: '1000000000000000',
    rate: '75',
    tenure: '100',
    unit: 'Years',
    monthly: 'Rs 62,500,000,000,000.00',
    interest: 'Rs 74,000,000,000,000,003.34',
    total: 'Rs 75,000,000,000,000,003.34',
    line1: 'Rs 1,000,000,000,000,000.00 at 75% for 100 years',
    amountCents: 100_000_000_000_000_000n,
    rateNum: 75n,
    rateDen: 1n,
    months: 1200,""")
rep("""    expect(diff <= 1n, `row ${i + 1} payment within 0.01 of the headline`).toBe(true)""","""    // AC-10.5 (D-55): every payment except the last within 0.01 of the headline; the last within 0.02.
    const isLast = i === loan.months - 1
    expect(
      diff <= (isLast ? 2n : 1n),
      `row ${i + 1} payment within ${isLast ? '0.02' : '0.01'} of the headline`,
    ).toBe(true)""")
rep("AC-10.4, AC-10.5 and AC-13.3","AC-10.4, AC-10.5 (D-55) and AC-13.3")
open(p,'w',encoding='utf8').write(s)
EOF
grep -nE "1,?000,?000,?000|480|\b40\b|\b41\b|481|\b50\b|50\.01|999\.99|1000\.01|41,666|19,000|20,000,000|0\.01|1,000 and|MIN|MAX|\b1000\b|\b999" e2e/s0*.spec.ts e2e/s1*.spec.ts e2e/spec-rules.spec.ts | grep -v "^e2e/s11\|^e2e/s12"
```

  Result:
```
e2e/s01-calculate.spec.ts:52:  test('[AC-1.6] the smallest accepted values give Rs 1,000.01 (L-MIN)', async ({ page }) => {
e2e/s01-calculate.spec.ts:53:    await calculateLoan(page, LOANS.MIN)
e2e/s01-calculate.spec.ts:54:    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 1,000.01')
e2e/s01-calculate.spec.ts:57:  test('[AC-1.7] the largest accepted values give Rs 41,666,666.80 (L-MAX)', async ({ page }) => {
e2e/s01-calculate.spec.ts:58:    await calculateLoan(page, LOANS.MAX)
e2e/s01-calculate.spec.ts:59:    await expect(summary(page, 'Monthly payment')).toHaveText('Rs 41,666,666.80')
e2e/s02-validation.spec.ts:57:  test('[AC-2.4] amounts 0, -500 and 999.99 are out of range', async ({ page }) => {
e2e/s02-validation.spec.ts:58:    for (const amount of ['0', '-500', '999.99']) {
e2e/s02-validation.spec.ts:65:  test('[AC-2.5] 1000000000.01 is out of range; 1000000000 is accepted', async ({ page }) => {
e2e/s02-validation.spec.ts:66:    await tryAmount(page, '1000000000.01')
e2e/s02-validation.spec.ts:69:    await tryAmount(page, '1000000000')
e2e/s02-validation.spec.ts:74:  test('[AC-2.6] 1000.555 has too many decimal places', async ({ page }) => {
e2e/s02-validation.spec.ts:75:    await tryAmount(page, '1000.555')
e2e/s02-validation.spec.ts:80:  test('[AC-2.7] rates -1 and 50.01 are out of range; 0 and 50 are accepted', async ({ page }) => {
e2e/s02-validation.spec.ts:81:    for (const rate of ['-1', '50.01']) {
e2e/s02-validation.spec.ts:87:    for (const rate of ['0', '50']) {
e2e/s02-validation.spec.ts:112:  test('[AC-2.10] tenure ranges: 1-40 years and 1-480 months', async ({ page }) => {
e2e/s02-validation.spec.ts:113:    for (const tenure of ['0', '41']) {
e2e/s02-validation.spec.ts:118:    for (const tenure of ['0', '481']) {
e2e/s02-validation.spec.ts:123:    await fillLoan(page, { amount: '1000000', rate: '12', tenure: '40', unit: 'Years' })
e2e/s02-validation.spec.ts:127:    await fillLoan(page, { amount: '1000000', rate: '12', tenure: '480', unit: 'Months' })
e2e/s02-validation.spec.ts:169:    await amountIn(page).fill('1000')
e2e/s02-validation.spec.ts:185:  test('[AC-2.15] a 40-digit amount is out of range and the form recovers', async ({ page }) => {
e2e/s02-validation.spec.ts:186:    await tryAmount(page, '9'.repeat(40))
e2e/s02-validation.spec.ts:196:    const bad = ['', 'abc', '1e6', '0', '-500', '1000.555', '9'.repeat(40), '１２', '١٢', '1,,000']
e2e/s02-validation.spec.ts:198:      await fillLoan(page, { amount, rate: 'x', 
… [3,140 more characters not shown; see raw/]
```

- **Bash**

```bash
sed -n 45,62p e2e/s01-calculate.spec.ts; sed -n 20,32p e2e/s02-validation.spec.ts; sed -n 55,135p e2e/s02-validation.spec.ts; sed -n 180,215p e2e/s02-validation.spec.ts; sed -n 50,75p e2e/s03-totals.spec.ts; sed -n 20,35p e2e/s05-mobile.spec.ts; sed -n 88,115p e2e/s05-mobile.spec.ts; sed -n 40,150p e2e/s10-schedule.spec.ts; sed -n 30,90p e2e/s13-balance.spec.ts; sed -n 75,100p e2e/spec-rules.spec.ts
```

  Result:
```
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
      await expectFieldCle
… [12,743 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'EOF'
def edit(p,pairs):
    s=open(p,encoding='utf8').read()
    for a,b in pairs:
        assert a in s,(p,a)
        s=s.replace(a,b)
    open(p,'w',encoding='utf8').write(s)
edit('e2e/s01-calculate.spec.ts',[
("give Rs 1,000.01 (L-MIN)","give Rs 10.00 (L-MIN)"),
("toHaveText('Rs 1,000.01')","toHaveText('Rs 10.00')"),
("give Rs 41,666,666.80 (L-MAX)","give Rs 62,500,000,000,000.00 (L-MAX)"),
("toHaveText('Rs 41,666,666.80')","toHaveText('Rs 62,500,000,000,000.00')"),
])
edit('e2e/s02-validation.spec.ts',[
("amounts 0, -500 and 999.99 are","amounts 0, -500 and 9.99 are"),
("['0', '-500', '999.99']","['0', '-500', '9.99']"),
("1000000000.01 is out of range; 1000000000 is accepted","1000000000000000.01 is out of range; 1000000000000000 is accepted"),
("tryAmount(page, '1000000000.01')","tryAmount(page, '1000000000000000.01')"),
("tryAmount(page, '1000000000')","tryAmount(page, '1000000000000000')"),
("rates -1 and 50.01 are out of range; 0 and 50 are","rates -1 and 75.01 are out of range; 0 and 75 are"),
("['-1', '50.01']","['-1', '75.01']"),
("['0', '50']","['0', '75']"),
("1-40 years and 1-480 months","1-100 years and 1-1,200 months"),
("['0', '41']","['0', '101']"),
("['0', '481']","['0', '1201']"),
("tenure: '40', unit: 'Years'","tenure: '100', unit: 'Years'"),
("tenure: '480', unit: 'Months'","tenure: '1200', unit: 'Months'"),
])
edit('e2e/s03-totals.spec.ts',[
("toHaveText('Rs 0.01')","toHaveText('Rs 0.00')"),
("Total amount payable')).toHaveText('Rs 1,000.01')","Total amount payable')).toHaveText('Rs 10.00')"),
("toHaveText('Rs 19,000,000,061.79')","toHaveText('Rs 74,000,000,000,000,003.34')"),
("toHaveText('Rs 20,000,000,061.79')","toHaveText('Rs 75,000,000,000,000,003.34')"),
])
edit('e2e/s05-mobile.spec.ts',[
("toHaveCount(481)","toHaveCount(1201)"),
("(480 schedule","(1,200 schedule") if False else ("a","a"),
("'Rs 41,666,666.80'","'Rs 62,500,000,000,000.00'"),
("'Rs 19,000,000,061.79'","'Rs 74,000,000,000,000,003.34'"),
("'Rs 20,000,000,061.79'","'Rs 75,000,000,000,000,003.34'"),
])
edit('e2e/s10-schedule.spec.ts',[
("shows all 480 rows","shows all 1,200 rows"),
("header row + 480 data rows","header row + 1,200 data rows"),
(">= 481",">= 1201"),
("The 480th row did not","The 1,200th row did not"),
("to the 480th row in the DOM","to the 1,200th row in the DOM"),
("toHaveCount(481)","toHaveCount(1201)"),
("rowCells(page, 480)","rowCells(page, 1200)"),
("      '480',","      '1200',"),
])
edit('e2e/spec-rules.spec.ts',[
("rate: '12', te
… [390 more characters not shown; see raw/]
```

  Result:
```
e2e/fixtures.ts:158:    rate: '75',
e2e/s02-validation.spec.ts:134:    await fillLoan(page, { amount: 'abc', rate: '99', tenure: '1', unit: 'Years' })
e2e/s09-reset.spec.ts:62:    await fillLoan(page, { amount: 'abc', rate: '99', tenure: 'x', unit: 'Months' })
e2e/s11-history.spec.ts:176:    await fillLoan(page, { amount: '5000', rate: '7', tenure: '30', unit: 'Months' })
e2e/s11-history.spec.ts:252:        v: { amount: '100000', rate: '21.50', tenure: '24', unit: 'Months' },
e2e/spec-rules.spec.ts:54:    await fillLoan(page, { amount: 'abc', rate: '99', tenure: 'x', unit: 'Years' })
    await fillLoan(page, { amount: 'abc', rate: '99', tenure: '1', unit: 'Years' })
    await calculate(page)
    await expectFieldError(amountIn(page), COPY.amountNan)
    await expectFieldError(rateIn(page), COPY.rateRange)
    await expectFieldClean(tenureIn(page))
    await expect(amountIn(page)).toBeFocused()
    await expectNoResults(page)
  })

  test('[AC-2.11] focus goes to the first invalid field in order amount, rate, tenure', async ({
    page,
  }) => {
    await fillLoan(page, { amount: '1000000', rate: 'x', tenure: 'y', unit: 'Years' })
    await calculate(page)
    await expect(rateIn(page)).toBeFocused()
    await fillLoan(page, { amount: '1000000', rate: '12', tenure: 'y', unit: 'Years' })
    await calculate(page)
29:- [ ] **AC-2.4** Try amount `0`, then `-500`, then `999.99` (each with rate `12`, tenure `1` Years). Each time: `Loan amount must be between 1,000 and 1,000,000,000.`
30:- [ ] **AC-2.5** Amount `1000000000.01`: `Loan amount must be between 1,000 and 1,000,000,000.` Amount `1000000000`: no loan-amount message and results are shown.
32:- [ ] **AC-2.7** Rate `-1`, then `50.01`: `Interest rate must be between 0 and 50%.` Rate `0`, then `50`: no rate message and results are shown.
35:- [ ] **AC-2.10** Years with tenure `0`, then `41`: `Loan tenure must be between 1 and 40 years.` Months with `0`, then `481`: `Loan tenure must be between 1 and 480 months.` Tenure `40` Years and `480` Months: no tenure message.
40:- [ ] **AC-2.15** Paste 40 nines (`9999999999999999999999999999999999999999`) as the amount, rate `12`, tenure `1` Years. Calculate: `Loan amount must be between 1,000 and 1,000,000,000.` and the page keeps working. Then enter L-A and Calculate: L-A results show.
64:- [ ] **AC-5.1** At 360 px wide the page does not scroll sideways, on load and after calculating L-MAX (480 rows).
112:- [ ] **AC-10.8** Calculate L-MAX. All 480 rows appear almos
… [374 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -nE "MAX|MIN|1,000\.01|41,666|19,000|0\.01 |differ" e2e/s0[4-9]*.ts e2e/s1[1-2]*.ts e2e/spec-rules.spec.ts e2e/review/* docs/process/manual-test-checklist.md| head -40; grep -nE "L-M|0\.01|differ by" docs/process/manual-test-checklist.md
```

  Result:
```
grep: e2e/review/*: No such file or directory
e2e/s05-mobile.spec.ts:22:  test('[AC-5.1] no horizontal page scroll on load or after L-MAX', async ({ page }) => {
e2e/s05-mobile.spec.ts:29:    await calculateLoan(page, LOANS.MAX)
e2e/s05-mobile.spec.ts:92:  test('[AC-5.6] every L-MAX summary amount is fully visible', async ({ page }) => {
e2e/s05-mobile.spec.ts:94:    await calculateLoan(page, LOANS.MAX)
e2e/s11-history.spec.ts:133:  test('[AC-11.6] a 21st different calculation drops the oldest of 20 entries', async ({
e2e/s11-history.spec.ts:249:      { v: LOANS.MIN, line1: 'Rs 1,000.00 at 0.01% for 1 month' },
docs/process/manual-test-checklist.md:5:**Before you start:** open the app in a private window (clean storage), at a normal desktop width, with the device in light mode, unless a step says otherwise. Reference loans: **L-A** = `1000000`, `12`, `1` Years. **L-B** = `2500000`, `18`, `5` Years. **L-C** = `120000`, `0`, `12` Months. **L-D** = `100000`, `10`, `1` Months. **L-MIN** = `1000`, `0.01`, `1` Months. **L-MAX** = `1000000000`, `50`, `40` Years. **L-Z3** = `1000`, `0`, `3` Months. "Calculate" means the button or Enter in an input.
docs/process/manual-test-checklist.md:16:- [ ] **AC-1.6** Enter L-MIN (`1000`, `0.01`, `1`, Months). Calculate. **Monthly payment** reads `Rs 1,000.01`.
docs/process/manual-test-checklist.md:17:- [ ] **AC-1.7** Enter L-MAX (`1000000000`, `50`, `40`, Years). Calculate. **Monthly payment** reads `Rs 41,666,666.80`.
docs/process/manual-test-checklist.md:49:- [ ] **AC-3.4** L-MIN: **Total interest** `Rs 0.01`, **Total amount payable** `Rs 1,000.01`.
docs/process/manual-test-checklist.md:50:- [ ] **AC-3.5** L-MAX: **Total interest** `Rs 19,000,000,061.79`, **Total amount payable** `Rs 20,000,000,061.79`, shown in full (no `...`, no `e+`).
docs/process/manual-test-checklist.md:64:- [ ] **AC-5.1** At 360 px wide the page does not scroll sideways, on load and after calculating L-MAX (480 rows).
docs/process/manual-test-checklist.md:69:- [ ] **AC-5.6** At 360 px wide calculate L-MAX. All three summary amounts are fully visible (they may wrap onto a second line, but no digit is cut off).
docs/process/manual-test-checklist.md:109:- [ ] **AC-10.5** For L-A and L-B, every Payment in the schedule is within 0.01 of the **Monthly payment** shown in the summary.
docs/process/manual-test-checklist.md:110:- [ ] **AC-10.6** L-A shows `Some payments differ by 0.01 because amounts are rounded to 2 decimal places.` below the summary. L-C does
… [3,277 more characters not shown; see raw/]
```

- **Bash**

```bash
sed -n 236,275p e2e/s11-history.spec.ts; sed -n 26,40p docs/process/manual-test-checklist.md
```

- **Bash**

```bash
sed -n 108,112p docs/process/manual-test-checklist.md
```

  Result:
```
- [ ] **AC-10.4** For L-A, rows 1, 2 and 7: Payment = Interest + Principal; Interest = the previous Balance (the loan amount for row 1) x 12 / 1200, rounded to the nearest cent (row 1: 1,000,000 x 1% = 10,000.00).
- [ ] **AC-10.5** For L-A and L-B, every Payment in the schedule is within 0.01 of the **Monthly payment** shown in the summary.
- [ ] **AC-10.6** L-A shows `Some payments differ by 0.01 because amounts are rounded to 2 decimal places.` below the summary. L-C does not show it.
- [ ] **AC-10.7** Enter L-Z3 (`1000`, `0`, `3` Months). Rows read `1 | 333.33 | 0.00 | 333.33 | 666.67`, `2 | 333.34 | 0.00 | 333.34 | 333.33`, `3 | 333.33 | 0.00 | 333.33 | 0.00`.
- [ ] **AC-10.8** Calculate L-MAX. All 480 rows appear almost instantly (well under a second); scroll to the bottom to see row 480 with Balance `0.00`.
```

  Result:
```
await expect(historyItems(page).nth(1)).toContainText(zeroRateLine1(2))
    await expect(historyItems(page).nth(1)).toContainText('Rs 2,000.00 per month')
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toHaveCount(0)
    await expect(historyList(page)).toBeVisible()
  })

  test('[AC-11.11] entries describe the rate without trailing zeros and the tenure with its unit', async ({
    page,
  }) => {
    await open(page)
    const cases: { v: Parameters<typeof calculateLoan>[1]; line1: string }[] = [
      { v: LOANS.A, line1: 'Rs 1,000,000.00 at 12% for 1 year' },
      { v: LOANS.B, line1: 'Rs 2,500,000.00 at 18% for 5 years' },
      { v: LOANS.MIN, line1: 'Rs 1,000.00 at 0.01% for 1 month' },
      { v: LOANS.C, line1: 'Rs 120,000.00 at 0% for 12 months' },
      {
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
})
- [ ] **AC-2.1** On the empty form select Calculate. Under the fields you see `Enter a loan amount.`, `Enter an interest rate.` and `Enter a loan tenure.`; no figures; the results area says `Enter your loan details and select Calculate.`; the cursor is in **Loan amount**.
- [ ] **AC-2.2** Amount `abc`, rate `12`, tenure `1` Years. Calculate. Under Loan amount: `Loan amount must be a number.` No results.
- [ ] **AC-2.3** Amount `1e6`. Calculate. `Loan amount must be a number.`
- [ ] **AC-2.4** Try amount `0`, then `-500`, then `999.99` (each with rate `12`, tenure `1` Years). Each time: `Loan amount must be between 1,000 and 1,000,000,000.`
- [ ] **AC-2.5** Amount `1000000000.01`: `Loan amount must be between 1,000 and 1,000,000,000.` Amount `1000000000`: no loan-amount message and results are shown.
- [ ] **AC-2.6** Amount `1000.555`. Calculate. `Loan amount can have at most 2 decimal places.`
- [ ] **AC-2.7** Rate `-1`, then `50.01`: `Interest rate must be between 0 and 50%.` Rate `0`, then `50`: no rate message and results are shown.
- [ ] **AC-2.8** Rate `twelve`: `Interest rate must be a number.` Rate `12.345`: `Interest rate can have at most 2 decimal places.`
- [ ] **AC-2.9** Tenure `2.5`, unit Years. Calculate. `Loan tenure must be a whole number.`
- [ ] **AC-2.10** Years with tenure `0`, then `41`: `Loan tenure
… [1,199 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'EOF'
def edit(p,pairs):
    s=open(p,encoding='utf8').read()
    for a,b in pairs:
        assert a in s,(p,a)
        s=s.replace(a,b)
    open(p,'w',encoding='utf8').write(s)
edit('e2e/s11-history.spec.ts',[("line1: 'Rs 1,000.00 at 0.01% for 1 month'","line1: 'Rs 10.00 at 0.01% for 1 month'")])
M="Loan amount must be between 1,000 and 1,000,000,000."
N="Loan amount must be between 10 and 1,000,000,000,000,000."
edit('docs/process/manual-test-checklist.md',[
("**L-MIN** = `1000`, `0.01`, `1` Months. **L-MAX** = `1000000000`, `50`, `40` Years.","**L-MIN** = `10`, `0.01`, `1` Months. **L-MAX** = `1000000000000000`, `75`, `100` Years."),
("Enter L-MIN (`1000`, `0.01`, `1`, Months). Calculate. **Monthly payment** reads `Rs 1,000.01`.","Enter L-MIN (`10`, `0.01`, `1`, Months). Calculate. **Monthly payment** reads `Rs 10.00`."),
("Enter L-MAX (`1000000000`, `50`, `40`, Years). Calculate. **Monthly payment** reads `Rs 41,666,666.80`.","Enter L-MAX (`1000000000000000`, `75`, `100`, Years). Calculate. **Monthly payment** reads `Rs 62,500,000,000,000.00`."),
("then `999.99` (each","then `9.99` (each"),
(M,N),
("Amount `1000000000.01`","Amount `1000000000000000.01`"),
("Amount `1000000000`: no","Amount `1000000000000000`: no"),
("Rate `-1`, then `50.01`: `Interest rate must be between 0 and 50%.` Rate `0`, then `50`:","Rate `-1`, then `75.01`: `Interest rate must be between 0 and 75%.` Rate `0`, then `75`:"),
("then `41`: `Loan tenure must be between 1 and 40 years.` Months with `0`, then `481`: `Loan tenure must be between 1 and 480 months.` Tenure `40` Years and `480` Months:","then `101`: `Loan tenure must be between 1 and 100 years.` Months with `0`, then `1201`: `Loan tenure must be between 1 and 1,200 months.` Tenure `100` Years and `1200` Months:"),
("**Total interest** `Rs 0.01`, **Total amount payable** `Rs 1,000.01`.","**Total interest** `Rs 0.00`, **Total amount payable** `Rs 10.00`."),
("`Rs 19,000,000,061.79`, **Total amount payable** `Rs 20,000,000,061.79`","`Rs 74,000,000,000,000,003.34`, **Total amount payable** `Rs 75,000,000,000,000,003.34`"),
("L-MAX (480 rows)","L-MAX (1,200 rows)"),
("every Payment in the schedule is within 0.01 of the **Monthly payment** shown in the summary.","every Payment in the schedule except the last is within 0.01 of the **Monthly payment** shown in the summary, and the last Payment is within 0.02 of it."),
("differ by 0.01 because","differ by up to 0.02 because"),
("All 480 rows appear almost instantly (well
… [519 more characters not shown; see raw/]
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
src/domain/format.test.ts:10:    ['0.01', '0.01%'],
src/domain/format.test.ts:12:    ['50', '50%'],
src/domain/format.test.ts:13:    ['12.50', '12.5%'],
src/domain/format.test.ts:28:    [40, 'years', '40 years'],
src/domain/format.test.ts:33:    [480, 'months', '480 months'],
src/domain/format.test.ts:104:  it('[SPEC-§6] strips grouping and trailing zeros: 1,500.50 and 18.00 become 1500.5 and 18', () => {
src/domain/format.test.ts:105:    expect(toCanonical(inputOf('1,500.50', '18.00', '12', 'months'))).toEqual({
src/domain/format.test.ts:113:  it('[SPEC-§6] keeps meaningful decimals: 1500.5 and 0.01', () => {
src/domain/format.test.ts:114:    expect(toCanonical(inputOf('1500.5', '0.01', '1', 'months'))).toEqual({
src/domain/format.test.ts:116:      rate: '0.01',
src/domain/format.test.ts:138:    expect(toCanonical(inputOf('1000', '0.00', '3', 'months')).rate).toBe('0')
src/domain/format.test.ts:139:    expect
… [10,687 more characters not shown; see raw/]
```

- **Bash**

```bash
cat -n src/domain/validate.test.ts
```

  Result:
```
1	import { describe, expect, it } from 'vitest'
     2	import { validateInputs } from './validate'
     3	import type { ErrorCode, Field, RawInputs } from './types'
     4	
     5	const BASE: RawInputs = { amount: '1000000', rate: '12', tenure: '1', unit: 'years' }
     6	
     7	function errorsFor(over: Partial<RawInputs>): Partial<Record<Field, ErrorCode>> {
     8	  const result = validateInputs({ ...BASE, ...over })
     9	  return result.ok ? {} : result.errors
    10	}
    11	
    12	function valueFor(over: Partial<RawInputs>) {
    13	  const result = validateInputs({ ...BASE, ...over })
    14	  if (!result.ok) throw new Error(`expected ok, got ${JSON.stringify(result.errors)}`)
    15	  return result.value
    16	}
    17	
    18	const NINES = '9'.repeat(40)
    19	
    20	describe('validateInputs: successful parse', () => {
    21	  it('[AC-1.1] accepts L-A and derives amount, rate, tenure and months', () => {
    22	    const v = valueFor({})
    23	    expect(v.amount.toFixed(2)).toBe('1000000.00')
    24	    expect(v.annualRate.toFixed(2)).toBe('12.00')
    25	    expect(v.tenure).toBe(1)
    26	    expect(v.unit).toBe('years')
    27	    expect(v.months).toBe(12)
    28	  })
    29	
    30	  it('[AC-1.2] months unit: months equals tenure', () => {
    31	    const v = valueFor({ tenure: '12', unit: 'months' })
    32	    expect(v.tenure).toBe(12)
    33	    expect(v.unit).toBe('months')
    34	    expect(v.months).toBe(12)
    35	  })
    36	
    37	  it('[AC-1.8] accepts western and lakh grouping in the amount', () => {
    38	    expect(valueFor({ amount: '1,000,000' }).amount.toFixed(2)).toBe('1000000.00')
    39	    expect(valueFor({ amount: '10,00,000' }).amount.toFixed(2)).toBe('1000000.00')
    40	    expect(valueFor({ amount: '1,00,000' }).amount.toFixed(2)).toBe('100000.00')
    41	    expect(valueFor({ amount: '1,000.50' }).amount.toFixed(2)).toBe('1000.50')
    42	  })
    43	
    44	  it('[AC-1.9] ignores leading and trailing spaces in all three fields', () => {
    45	    const v = valueFor({ amount: ' 1000000 ', rate: ' 12 ', tenure: ' 1 ' })
    46	    expect(v.amount.toFixed(2)).toBe('1000000.00')
    47	    expect(v.annualRate.toFixed(2)).toBe('12.00')
    48	    expect(v.tenure).toBe(1)
    49	    expect(v.months).toBe(12)
    50	  })
    51	
    52	  it('[AC-1.10] accepts a trailing percent sign on the rate', () => {
    53	    expect(valueFor({ rate: '12%' }).annualRate.toFixed(2)).toBe('12.00')
    54	  })
    55	
    56	
… [12,667 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'EOF'
def edit(p,pairs):
    s=open(p,encoding='utf8').read()
    for a,b in pairs:
        assert s.count(a)==1,(p,a,s.count(a))
        s=s.replace(a,b)
    open(p,'w',encoding='utf8').write(s)
edit('src/domain/validate.test.ts',[
("""    expect(valueFor({ amount: '1000' }).amount.toFixed(2)).toBe('1000.00')
    expect(valueFor({ amount: '1000000000' }).amount.toFixed(2)).toBe('1000000000.00')
    expect(valueFor({ rate: '0' }).annualRate.isZero()).toBe(true)
    expect(valueFor({ rate: '50' }).annualRate.toFixed(2)).toBe('50.00')""","""    expect(valueFor({ amount: '10' }).amount.toFixed(2)).toBe('10.00')
    expect(valueFor({ amount: '1000000000000000' }).amount.toFixed(2)).toBe(
      '1000000000000000.00',
    )
    expect(valueFor({ rate: '0' }).annualRate.isZero()).toBe(true)
    expect(valueFor({ rate: '75' }).annualRate.toFixed(2)).toBe('75.00')"""),
("""    expect(valueFor({ tenure: '40', unit: 'years' }).months).toBe(480)
    expect(valueFor({ tenure: '1', unit: 'months' }).months).toBe(1)
    expect(valueFor({ tenure: '480', unit: 'months' }).months).toBe(480)""","""    expect(valueFor({ tenure: '100', unit: 'years' }).months).toBe(1200)
    expect(valueFor({ tenure: '1', unit: 'months' }).months).toBe(1)
    expect(valueFor({ tenure: '1200', unit: 'months' }).months).toBe(1200)"""),
("[['0'], ['-500'], ['999.99']])","[['0'], ['-500'], ['9.99']])"),
("""  it('[AC-2.5] amount 1000000000.01 is AMOUNT_RANGE and 1000000000 is accepted', () => {
    expect(errorsFor({ amount: '1000000000.01' })).toEqual({ amount: 'AMOUNT_RANGE' })
    expect(errorsFor({ amount: '1000000000' })).toEqual({})""","""  it('[AC-2.5] amount 1000000000000000.01 is AMOUNT_RANGE and 1000000000000000 is accepted', () => {
    expect(errorsFor({ amount: '1000000000000000.01' })).toEqual({ amount: 'AMOUNT_RANGE' })
    expect(errorsFor({ amount: '1000000000000000' })).toEqual({})"""),
("[['-1'], ['50.01']])","[['-1'], ['75.01']])"),
("it.each([['0'], ['50']])('[AC-2.7]","it.each([['0'], ['75']])('[AC-2.7]"),
("[['0'], ['41']])('[AC-2.10] years","[['0'], ['101']])('[AC-2.10] years"),
("[['0'], ['481']])('[AC-2.10] months","[['0'], ['1201']])('[AC-2.10] months"),
("""  it('[AC-2.10] tenure 40 years and 480 months show no tenure error', () => {
    expect(errorsFor({ tenure: '40', unit: 'years' })).toEqual({})
    expect(errorsFor({ tenure: '480', unit: 'months' })).toEqual({})""","""  it('[AC-2.10] tenure 100 years and 1200 months show no tenure error', () => {
    exp
… [2,065 more characters not shown; see raw/]
```

  Result:
```
import { describe, expect, it } from 'vitest'
import { normaliseAmount, normaliseRate, normaliseTenure } from './parse'

describe('normaliseAmount', () => {
  it.each([
import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { formatDateTime, formatRate, formatTenure, toCanonical } from './format'
import { inputOf } from '../../test/helpers'

describe('formatRate', () => {
  it.each([
    ['12', '12%'],
    ['21.5', '21.5%'],
    ['0.01', '0.01%'],
    ['0', '0%'],
    ['50', '50%'],
    ['12.50', '12.5%'],
    ['12.00', '12%'],
    ['0.10', '0.1%'],
    ['18', '18%'],
    ['-0', '0%'],
    ['5.25', '5.25%'],
  ])('[AC-11.11][SPEC-§6] formatRate(%s) = %s', (rate, expected) => {
    expect(formatRate(new Decimal(rate))).toBe(expected)
  })
})

describe('formatTenure', () => {
  it.each([
    [1, 'years', '1 year'],
    [5, 'years', '5 years'],
    [40, 'years', '40 years'],
    [12, 'years', '12 years'],
    [1, 'months', '1 month'],
    [12, 'months', '12 months'],
    [2, 'months', '2 months'],
    [480, 'months', '480 months'],
  ] as const)('[AC-11.11][SPEC-§6] formatTenure(%i, %s) = %s', (tenure, unit, expected) => {
    expect(formatTenure(tenure, unit)).toBe(expected)
  })

  it('[AC-11.11] keeps the unit as entered (12 months is not shown as 1 year)', () => {
    expect(formatTenure(12, 'months')).toBe('12 months')
    expect(formatTenure(1, 'years')).toBe('1 year')
  })

  it('[SPEC-§6] tenure with leading zeros is an integer: 012 -> 12', () => {
    expect(toCanonical(inputOf('1000000', '12', '012', 'years')).tenure).toBe(12)
  })

  it('[SPEC-§6] never uses exponent notation at the largest and smallest values', () => {
    expect(toCanonical(inputOf('1000000000', '50', '40', 'years'))).toEqual({
      amount: '1000000000',
      rate: '50',
      tenure: 40,
      unit: 'years',
    })
    expect(toCanonical(inputOf('1000', '0.01', '1', 'months'))).toEqual({
      amount: '1000',
      rate: '0.01',
      tenure: 1,
      unit: 'months',
    })
    expect(toCanonical(inputOf('1000000000.00', '0', '480', 'months')).amount).toBe('1000000000')
  })

  it('[SPEC-§6] amount "1000." canonicalises to 1000', () => {
    expect(toCanonical(inputOf('1000.', '12', '1', 'years')).amount).toBe('1000')
  })
})
```

- **Bash**

```bash
python - <<'EOF'
def edit(p,pairs):
    s=open(p,encoding='utf8').read()
    for a,b in pairs:
        assert s.count(a)==1,(p,a,s.count(a))
        s=s.replace(a,b)
    open(p,'w',encoding='utf8').write(s)
edit('src/domain/format.test.ts',[
("""    expect(toCanonical(inputOf('1000000000', '50', '40', 'years'))).toEqual({
      amount: '1000000000',
      rate: '50',
      tenure: 40,
      unit: 'years',
    })
    expect(toCanonical(inputOf('1000', '0.01', '1', 'months'))).toEqual({
      amount: '1000',
      rate: '0.01',
      tenure: 1,
      unit: 'months',
    })
    expect(toCanonical(inputOf('1000000000.00', '0', '480', 'months')).amount).toBe('1000000000')""","""    expect(toCanonical(inputOf('1000000000000000', '75', '100', 'years'))).toEqual({
      amount: '1000000000000000',
      rate: '75',
      tenure: 100,
      unit: 'years',
    })
    expect(toCanonical(inputOf('10', '0.01', '1', 'months'))).toEqual({
      amount: '10',
      rate: '0.01',
      tenure: 1,
      unit: 'months',
    })
    expect(toCanonical(inputOf('1000000000000000.00', '0', '1200', 'months')).amount).toBe(
      '1000000000000000',
    )"""),
])
EOF
sed -n 25,50p src/domain/loan.test.ts; sed -n 90,112p src/domain/loan.test.ts; sed -n 180,300p src/domain/loan.test.ts; sed -n 325,345p src/domain/loan.test.ts
```

  Result:
```
it('[AC-1.3] L-B (2500000, 18, 5 years) has monthly payment 63483.57', () => {
    expect(calc('2500000', '18', '5', 'years').monthlyPayment.toFixed(2)).toBe('63483.57')
  })

  it('[AC-1.4] L-C (120000, 0, 12 months) has monthly payment 10000.00', () => {
    expect(calc('120000', '0', '12', 'months').monthlyPayment.toFixed(2)).toBe('10000.00')
  })

  it('[AC-1.5] L-D (100000, 10, 1 month) has monthly payment 100833.33', () => {
    expect(calc('100000', '10', '1', 'months').monthlyPayment.toFixed(2)).toBe('100833.33')
  })

  it('[AC-1.6] L-MIN (1000, 0.01, 1 month) has monthly payment 1000.01', () => {
    expect(calc('1000', '0.01', '1', 'months').monthlyPayment.toFixed(2)).toBe('1000.01')
  })

  it('[AC-1.7] L-MAX (1000000000, 50, 40 years) has monthly payment 41666666.80', () => {
    expect(calc('1000000000', '50', '40', 'years').monthlyPayment.toFixed(2)).toBe('41666666.80')
  })

  it('[AC-1.8] thousands and lakh separators give the same result as 1000000', () => {
    expect(calc('1,000,000', '12', '1', 'years').monthlyPayment.toFixed(2)).toBe('88848.79')
    expect(calc('10,00,000', '12', '1', 'years').monthlyPayment.toFixed(2)).toBe('88848.79')
  })

  it('[AC-1.9] surrounding spaces are ignored', () => {

  it('[AC-3.3] L-C total interest 0.00 and total payable 120000.00', () => {
    const loan = calc('120000', '0', '12', 'months')
    expect(loan.totalInterest.toFixed(2)).toBe('0.00')
    expect(loan.totalPayable.toFixed(2)).toBe('120000.00')
  })

  it('[AC-3.4] L-MIN total interest 0.01 and total payable 1000.01', () => {
    const loan = calc('1000', '0.01', '1', 'months')
    expect(loan.totalInterest.toFixed(2)).toBe('0.01')
    expect(loan.totalPayable.toFixed(2)).toBe('1000.01')
  })

  it('[AC-3.5] L-MAX total interest 19000000061.79 and total payable 20000000061.79', () => {
    const loan = calc('1000000000', '50', '40', 'years')
    expect(loan.totalInterest.toFixed(2)).toBe('19000000061.79')
    expect(loan.totalPayable.toFixed(2)).toBe('20000000061.79')
  })

  it('[AC-3.1][AC-1.5] L-D total interest 833.33 and total payable 100833.33', () => {
    const loan = calc('100000', '10', '1', 'months')
    expect(figures(loan)).toEqual({ monthly: '100833.33', interest: '833.33', total: '100833.33' })
  })
  })

  it('[AC-13.2] L-B entered as 60 months gives the same 60 rows', () => {
    const loan = calc('2500000', '18', '60', 'months')
    expect(loan.rows).toHaveLength(60)
    expect(rowAt(loan, 59).balance.toFixed(2)).toBe('0.00
… [5,655 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'EOF'
def edit(p,pairs):
    s=open(p,encoding='utf8').read()
    for a,b,*n in pairs:
        c=n[0] if n else 1
        assert s.count(a)==c,(p,a,s.count(a))
        s=s.replace(a,b)
    open(p,'w',encoding='utf8').write(s)
edit('src/domain/loan.test.ts',[
("""  it('[AC-1.6] L-MIN (1000, 0.01, 1 month) has monthly payment 1000.01', () => {
    expect(calc('1000', '0.01', '1', 'months').monthlyPayment.toFixed(2)).toBe('1000.01')""","""  it('[AC-1.6] L-MIN (10, 0.01, 1 month) has monthly payment 10.00', () => {
    expect(calc('10', '0.01', '1', 'months').monthlyPayment.toFixed(2)).toBe('10.00')"""),
("""  it('[AC-1.7] L-MAX (1000000000, 50, 40 years) has monthly payment 41666666.80', () => {
    expect(calc('1000000000', '50', '40', 'years').monthlyPayment.toFixed(2)).toBe('41666666.80')""","""  it('[AC-1.7] L-MAX (1000000000000000, 75, 100 years) has monthly payment 62500000000000.00', () => {
    expect(calc('1000000000000000', '75', '100', 'years').monthlyPayment.toFixed(2)).toBe(
      '62500000000000.00',
    )"""),
("""  it('[AC-3.4] L-MIN total interest 0.01 and total payable 1000.01', () => {
    const loan = calc('1000', '0.01', '1', 'months')
    expect(loan.totalInterest.toFixed(2)).toBe('0.01')
    expect(loan.totalPayable.toFixed(2)).toBe('1000.01')""","""  it('[AC-3.4] L-MIN total interest 0.00 and total payable 10.00', () => {
    const loan = calc('10', '0.01', '1', 'months')
    expect(loan.totalInterest.toFixed(2)).toBe('0.00')
    expect(loan.totalPayable.toFixed(2)).toBe('10.00')"""),
("""  it('[AC-3.5] L-MAX total interest 19000000061.79 and total payable 20000000061.79', () => {
    const loan = calc('1000000000', '50', '40', 'years')
    expect(loan.totalInterest.toFixed(2)).toBe('19000000061.79')
    expect(loan.totalPayable.toFixed(2)).toBe('20000000061.79')""","""  it('[AC-3.5] L-MAX total interest 74000000000000003.34 and total payable 75000000000000003.34', () => {
    const loan = calc('1000000000000000', '75', '100', 'years')
    expect(loan.totalInterest.toFixed(2)).toBe('74000000000000003.34')
    expect(loan.totalPayable.toFixed(2)).toBe('75000000000000003.34')"""),
("""  it('[AC-10.1] L-MAX has 480 rows and ends at 0.00', () => {
    const loan = calc('1000000000', '50', '40', 'years')
    expect(loan.rows).toHaveLength(480)
    expect(rowAt(loan, 479).month).toBe(480)
    expect(rowAt(loan, 479).balance.toFixed(2)).toBe('0.00')""","""  it('[AC-10.1] L-MAX has 1200 rows and ends at 0.00', () => {
    const loan
… [2,397 more characters not shown; see raw/]
```

  Result:
```
1	import fc from 'fast-check'
     2	import { beforeAll, describe, it } from 'vitest'
     3	import { Decimal } from './money'
     4	import { calculateLoan } from './loan'
     5	import { validateInputs } from './validate'
     6	import { rowAt } from '../../test/helpers'
     7	import type { CalculatedLoan, Unit } from './types'
     8	
     9	const SEED = 20261017
    10	const RUNS = 1000
    11	const TIMEOUT = 600_000
    12	
    13	/** A generated loan, described by integers only: cents, basis points of a percent, months. */
    14	interface Case {
    15	  cents: number
    16	  bps: number
    17	  months: number
    18	  /** Use the years field when months is a multiple of 12 (and this flag is set). */
    19	  asYears: boolean
    20	}
    21	
    22	const AMOUNT_MIN_CENTS = 100_000 // 1,000.00
    23	const AMOUNT_MAX_CENTS = 100_000_000_000 // 1,000,000,000.00
    24	const RATE_MAX_BPS = 5_000 // 50.00%
    25	const MONTHS_MAX = 480
    26	
    27	// D-38: at least a quarter of runs draw from the corner where rounding errors are largest.
    28	const cornerCase = fc.record({
    29	  cents: fc.integer({ min: AMOUNT_MIN_CENTS, max: 2_000_000 }), // 1,000 to 20,000
    30	  bps: fc.integer({ min: 3_000, max: RATE_MAX_BPS }), // 30% to 50%
    31	  months: fc.integer({ min: 300, max: MONTHS_MAX }),
    32	  asYears: fc.boolean(),
    33	})
    34	
    35	// Every exact bound (and each combination of bounds) appears.
    36	const boundCase = fc.record({
    37	  cents: fc.constantFrom(AMOUNT_MIN_CENTS, AMOUNT_MAX_CENTS),
    38	  bps: fc.constantFrom(0, RATE_MAX_BPS),
    39	  months: fc.constantFrom(1, MONTHS_MAX),
    40	  asYears: fc.boolean(),
    41	})
    42	
    43	const wideCase = fc.record({
    44	  cents: fc.oneof(
    45	    fc.integer({ min: AMOUNT_MIN_CENTS, max: AMOUNT_MAX_CENTS }),
    46	    fc.integer({ min: AMOUNT_MIN_CENTS, max: 100_000_000 }),
    47	  ),
    48	  bps: fc.oneof(
    49	    fc.integer({ min: 0, max: RATE_MAX_BPS }),
    50	    fc.constantFrom(1, 99, 100, 1200, 1800, 3600),
    51	  ),
    52	  months: fc.integer({ min: 1, max: MONTHS_MAX }),
    53	  asYears: fc.boolean(),
    54	})
    55	
    56	const caseArb: fc.Arbitrary<Case> = fc.oneof(
    57	  { weight: 3, arbitrary: cornerCase },
    58	  { weight: 1, arbitrary: boundCase },
    59	  { weight: 4, arbitrary: wideCase },
    60	)
    61	
    62	/** Years-based cases: whole numbers of years, 1 to 40, same corner bias. */
    63	const yearsCaseArb = fc.oneof(
… [13,531 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'EOF'
p='src/domain/loan.property.test.ts'
L=open(p,encoding='utf8').read().split('\n')
# lines index: 1-based line n -> L[n-1]
head='\n'.join(L[:12])      # lines 1-12
mid='\n'.join(L[94:206])    # lines 95-206 (after twoDp.. through checkFinalBalance)
open('C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/x','w').write('')
s='\n'.join(L)
def rep(a,b):
    global s
    assert s.count(a)==1,a
    s=s.replace(a,b)
start=s.index("/** A generated loan, described by integers only")
end=s.index("function amountText")
new='''/**
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
  bps: fc.constantFrom(0, RATE_MAX_BPS),
  months: fc.constantFrom(1, MONTHS_MAX),
  asYears: fc.boolean(),
})

/** Amounts spread over every order of magnitude from 10 to 10^15. */
const wideCents = fc.oneof(
  fc.bigInt({ min: AMOUNT_MIN_CENTS, max: AMOUNT_MAX_CENTS }),
  fc.bigInt({ min: AMOUNT_MIN_CENTS, max: 100_000_000n }), // 10 to 1,000,000
  fc.bigInt({ min: 100_000_000n, max: 100_000_000_000_000n }), // 1 million to 10^12
  fc.bigInt({ min: 100_000_000_000_000n, max: AMOUNT_MAX_CENTS }), // 10^12 to 10^15
)

const wideCase = fc.record({
  cents: wideCents,
  bps: fc.oneof(
    fc.integer({ min: 0, max: RATE_MAX_BPS }),
    fc.constantFrom(1, 99, 100, 1200, 1800, 3600),
  ),
  months: fc.integer({ min: 1, max: MONTHS_MAX }),
  asYears: fc.boolean(),
})

const caseArb: fc.Arbitrary<Case> = fc.oneof(
  { weight: 3, arbitrary: cornerCase },
  { weight: 1, arbitrary: boundCase },
  { weight: 4, arbitra
… [4,872 more characters not shown; see raw/]
```

  Result:
```
256:  const asYears = loanFor({ ...base, months: y.years * 12, asYears: true })
363:    { cents: 100_000_000n, bps: 1200, months: 12, asYears: true }, // L-A
364:    { cents: 250_000_000n, bps: 1800, months: 60, asYears: true }, // L-B
368:    { cents: 100_000_000_000_000_000n, bps: 7500, months: 1200, asYears: true }, // L-MAX
65:  { weight: 3, arbitrary: cornerCase },
66:  { weight: 1, arbitrary: boundCase },
67:  { weight: 4, arbitrary: wideCase },
73:    weight: 3,
81:    weight: 1,
89:    weight: 4,
367:    { cents: 1_000n, bps: 1, months: 1, asYears: false }, // L-MIN
368:    { cents: 100_000_000_000_000_000n, bps: 7500, months: 1200, asYears: true }, // L-MAX
375:    '[AC-3.6][AC-10.4][AC-10.5][AC-13.3][SPEC-§5.4] all eight bound corners (and nearby) satisfy invariants 1 to 7',
```

- **Bash**

```bash
F="e2e/fixtures.ts e2e/s01-calculate.spec.ts e2e/s02-validation.spec.ts e2e/s03-totals.spec.ts e2e/s05-mobile.spec.ts e2e/s10-schedule.spec.ts e2e/s11-history.spec.ts e2e/spec-rules.spec.ts src/domain/validate.test.ts src/domain/format.test.ts src/domain/loan.test.ts src/domain/loan.property.test.ts"; npx prettier --write $F docs/process/manual-test-checklist.md 2>&1 | tail -15; npx prettier --check $F 2>&1 | tail -3; npx eslint --max-warnings 0 $F 2>&1 | tail -20; npm run typecheck 2>&1 | tail -15
```

  Result:
```
e2e/fixtures.ts 132ms
e2e/s01-calculate.spec.ts 11ms
e2e/s02-validation.spec.ts 30ms
e2e/s03-totals.spec.ts 8ms
e2e/s05-mobile.spec.ts 19ms
e2e/s10-schedule.spec.ts 14ms
e2e/s11-history.spec.ts 25ms
e2e/spec-rules.spec.ts 48ms
src/domain/validate.test.ts 30ms
src/domain/format.test.ts 10ms
src/domain/loan.test.ts 42ms
src/domain/loan.property.test.ts 38ms
Checking formatting...
All matched files use Prettier code style!

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b
[This command modified 8 files you've previously read: e2e\s02-validation.spec.ts, e2e\s05-mobile.spec.ts, e2e\spec-rules.spec.ts, e2e\s10-schedule.spec.ts, src\domain\validate.test.ts and 3 more. Call Read before editing.]
```

- **Bash**

```bash
git diff --stat; npx vitest run --project domain 2>&1 | grep -vE "^\s*$" | tail -150
```

  Result:
```
warning: in the working copy of 'docs/process/manual-test-checklist.md', CRLF will be replaced by LF the next time Git touches it
 docs/process/manual-test-checklist.md |  30 +++++-----
 e2e/fixtures.ts                       |  51 +++++++++--------
 e2e/s01-calculate.spec.ts             |  10 ++--
 e2e/s02-validation.spec.ts            |  28 ++++-----
 e2e/s03-totals.spec.ts                |   8 +--
 e2e/s05-mobile.spec.ts                |   8 +--
 e2e/s10-schedule.spec.ts              |  18 +++---
 e2e/s11-history.spec.ts               |   2 +-
 e2e/spec-rules.spec.ts                |   2 +-
 src/domain/format.test.ts             |  16 +++---
 src/domain/loan.property.test.ts      | 104 +++++++++++++++++++---------------
 src/domain/loan.test.ts               |  62 +++++++++++---------
 src/domain/validate.test.ts           |  78 +++++++++++++------------
 13 files changed, 229 insertions(+), 188 deletions(-)
       |           ^
     20|   }
     21|   return result.value
 ❯ calc test/helpers.ts:30:24
 ❯ src/domain/loan.test.ts:204:18
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[17/30]⎯
 FAIL  |domain| src/domain/loan.test.ts > rounding note flag > [AC-10.6] single-payment loans L-D and L-MIN do not show the note
Error: Expected valid inputs, got errors {"amount":"AMOUNT_RANGE"}
 ❯ inputOf test/helpers.ts:19:11
     17|   const result = validateInputs(raw(amount, rate, tenure, unit))
     18|   if (!result.ok) {
     19|     throw new Error(`Expected valid inputs, got errors ${JSON.stringif…
       |           ^
     20|   }
     21|   return result.value
 ❯ calc test/helpers.ts:30:24
 ❯ src/domain/loan.test.ts:241:12
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[18/30]⎯
 FAIL  |domain| src/domain/validate.test.ts > validateInputs: successful parse > [AC-2.5][AC-2.7][AC-2.10] accepts every exact bound
Error: expected ok, got {"amount":"AMOUNT_RANGE"}
 ❯ valueFor src/domain/validate.test.ts:14:25
     12| function valueFor(over: Partial<RawInputs>) {
     13|   const result = validateInputs({ ...BASE, ...over })
     14|   if (!result.ok) throw new Error(`expected ok, got ${JSON.stringify(r…
       |                         ^
     15|   return result.value
     16| }
 ❯ src/domain/validate.test.ts:57:12
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[19/30]⎯
 FAIL  |domain| src/domain/validate.test.ts > validateInputs: error codes > [AC-2.5] amount 1000000000000000.01 is AMOUNT_RANGE and 1000000000000000 is accepted
AssertionError: expected { amount: 'AMOUNT_RANGE' } to deeply equal {}
- Expected
+ Received
- {}
+ {
+   "am
… [4,748 more characters not shown; see raw/]
```

- **Bash**

```bash
git diff docs/process/manual-test-checklist.md | grep -c '^[-+]'; git diff --stat -w --ignore-cr-at-eol docs/process/manual-test-checklist.md | tail -1; file docs/process/manual-test-checklist.md; git show HEAD:docs/process/manual-test-checklist.md | file -; npx vitest run --project domain 2>&1 | grep -E "^ (FAIL|✓|×)|FAIL " | sort -u | sed 's/^ *//' ;
```

  Result:
```
warning: in the working copy of 'docs/process/manual-test-checklist.md', CRLF will be replaced by LF the next time Git touches it
32
warning: in the working copy of 'docs/process/manual-test-checklist.md', CRLF will be replaced by LF the next time Git touches it
 1 file changed, 15 insertions(+), 15 deletions(-)
docs/process/manual-test-checklist.md: Unicode text, UTF-8 text, with very long lines (504), with CRLF line terminators
/dev/stdin: Unicode text, UTF-8 text, with very long lines (499)
FAIL  |domain| src/domain/format.test.ts > toCanonical > [SPEC-§6] never uses exponent notation at the largest and smallest values
FAIL  |domain| src/domain/loan.property.test.ts > deterministic corners and reference loans > [AC-3.6][AC-10.4][AC-10.5][AC-13.3][SPEC-§5.4] all eight bound corners (and nearby) satisfy invariants 1 to 7
FAIL  |domain| src/domain/loan.property.test.ts > deterministic corners and reference loans > [AC-3.6][AC-10.4][AC-10.5][AC-13.3][SPEC-§5.4] every reference loan (and both SPEC-§5.3 regressions) satisfies invariants 1 to 7
FAIL  |domain| src/domain/loan.property.test.ts > deterministic corners and reference loans > [SPEC-§5.4] invariant 8 holds at the tenure bounds (1 year and 100 years) and for the reference loans in whole years
FAIL  |domain| src/domain/loan.property.test.ts > property tests over the full valid input domain > [AC-10.4][SPEC-§5.4] invariants 2 and 3: payment = interest + principal; interest = round2(opening x rate / 1200)
FAIL  |domain| src/domain/loan.property.test.ts > property tests over the full valid input domain > [AC-10.5][SPEC-§5.4] invariant 6: every payment but the last is within 0.01 of the monthly payment, the last within 0.02; the rounding note flag matches
FAIL  |domain| src/domain/loan.property.test.ts > property tests over the full valid input domain > [AC-13.3][SPEC-§5.4] invariant 1: the schedule has exactly as many rows as months, numbered 1..n
FAIL  |domain| src/domain/loan.property.test.ts > property tests over the full valid input domain > [AC-13.3][SPEC-§5.4] invariant 4: 0 <= principal <= opening, balance >= 0, balance = previous - principal, all at most 2 dp
FAIL  |domain| src/domain/loan.property.test.ts > property tests over the full valid input domain > [AC-13.3][SPEC-§5.4] invariant 5: final balance is exactly 0.00 and the principal column sums to P
FAIL  |domain| src/domain/loan.property.test.ts > property tests over the full valid input domain > [AC-3.6][SPEC-§5.4] invariant 7: payable = P 
… [2,929 more characters not shown; see raw/]
```

- **Bash**

```bash
npx vitest run --project domain src/domain/loan.property.test.ts src/domain/format.test.ts 2>&1 | grep -E "Error|generator" | sort | uniq -c | cut -c1-220
```

  Result:
```
1      19|     throw new Error(`Expected valid inputs, got errors ${JSON.stringif…
      3     133|     throw new Error(
      3     134|       `generator produced invalid input: ${describeCase(c)} ${JSON.str…
      7  ❯ buildError node_modules/fast-check/lib/fast-check.js:2469:16
      1 Caused by: Error: generator produced invalid input: amount=1000000000000.00 rate=0.00 months=12 asYears=true {"amount":"AMOUNT_RANGE"}
      6 Caused by: Error: generator produced invalid input: amount=1000000000000.00 rate=0.01 months=1 asYears=false {"amount":"AMOUNT_RANGE"}
      1 Error: Expected valid inputs, got errors {"amount":"AMOUNT_RANGE","rate":"RATE_RANGE","tenure":"TENURE_RANGE_YEARS"}
      7 Error: Property failed after 1 tests
      1 Error: generator produced invalid input: amount=10.00 rate=0.00 months=1 asYears=false {"amount":"AMOUNT_RANGE"}
      1 Error: generator produced invalid input: amount=10.00 rate=0.01 months=1 asYears=false {"amount":"AMOUNT_RANGE"}
      1 Error: generator produced invalid input: amount=10.00 rate=75.00 months=1200 asYears=true {"amount":"AMOUNT_RANGE","rate":"RATE_RANGE","tenure":"TENURE_RANGE_YEARS"}
```

- **SubagentHandback**

```json
{
 "message": "The frozen tests now match the D-54/D-55 text. Prettier, ESLint (--max-warnings 0) and `npm run typecheck` are clean on every file I changed. `npx vitest run --project domain` gives 30 failed and 267 passed. I did not run E2E.\n\nAll 30 failures are the expected red: the old `validate.ts` limits (amount 1,000 to 10^9, rate 0 to 50%, tenure 1 to 40 years / 480 months) still reject the new bounds. I confirmed this from the messages of the property and format failures (details below) and from the assertions of the others, but I did not read every failure message.\n\n## Files changed\n- `e2e/fixtures.ts`\n  - `COPY.rounding` now reads \"up to 0.02\".\n  - The four range messages carry the new bounds: 10 to 1,000,000,000,000,000 for amount; 0 to 75% for rate; 1 to 100 years and 1 to 1,200 months for tenure.\n  - `LOANS.MIN` is 10 / 0.01 / 1 month → Rs 10.00 / Rs 0.00 / Rs 10.00. Its `line1` is `Rs 10.00 at 0.01% for 1 month` and `amountCents` is 1_000n.\n  - `LOANS.MAX` is 1000000000000000 / 75 / 100 Years → Rs 62,500,000,000,000.00 / Rs 74,000,000,000,000,003.34 / Rs 75,000,000,000,000,003.34. Its `line1` is `Rs 1,000,000,000,000,000.00 at 75% for 100 years`, `amountCents` is 10^17n, `rateNum` is 75n and `months` is 1200.\n  - `checkScheduleArithmetic` allows 0.01 for every row except the last and 0.02 for the last row (AC-10.5).\n- `e2e/s01-calculate.spec.ts`: AC-1.6 expects `Rs 10.00`; AC-1.7 expects `Rs 62,500,000,000,000.00`.\n- `e2e/s02-validation.spec.ts`\n  
… [7,268 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

