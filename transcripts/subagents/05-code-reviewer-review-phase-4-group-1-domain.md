# Subagent 05: code-reviewer: Review Phase 4 group 1 (domain)

Subagent **`code-reviewer`**, task: *Review Phase 4 group 1 (domain)*. Started 2026-10-18 00:25 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 00:25 PKT

> Mini-gate G4.1 review: Phase 4, group 1 (domain layer) for stories S-1, S-2, S-3, S-10, S-13. Follow your agent instructions, scoped to this group.
> 
> Scope: src/domain/money.ts, parse.ts, validate.ts, loan.ts, format.ts (types.ts unchanged since Phase 2). Commits 9db17a8..47e14e4 on branch v1. The UI does not exist yet (group 2), so all E2E tests are expected to be red and are NOT part of this gate.
> 
> Step 1 (group-scoped, per your instructions for G4.1–G4.5): run `npx vitest run --project domain`, `npm run lint`, `npm run typecheck`, `npm run format:check`. Do not run full `verify`.
> Step 2: the freeze check from spec §12.4 against tag `g3-tests-approved`.
> Step 3: spec conformance — §4.1 normalisation (incl. D-26 grouping), §4.2 rules/order/codes and the [SPEC-§4.2] table, §4.3, §5.1/§5.2 line by line (incl. D-37 multiply-first interest and the last-month rule), §5.4 invariants, §6 formatting, §3.1.1 signatures, D-36 (single configured Decimal; no global Decimal.set; no JS number holding money). Check -0 handling, exponent notation, 40-digit inputs, `toNumber()` use on tenure, anything that could throw on user input.
> Step 4: exploratory testing beyond the ACs, at the domain level since there is no UI yet. Put any executable probes in `e2e/review/` (Playwright test files may import `../../src/domain/*` directly and need no page). Try hostile/unusual inputs through validateInputs/calculateLoan/formatters: e.g. '+5', '1e6', 'Infinity', 'NaN', '0x10', '١٢', '１２', '-0', '-0.00', '.5', '5.', '00012', '1,000,000.', '1,,000', ' 1 000', non-breaking spaces, a 10,000-character string, rate '50.00', tenure '40' vs '480' months, '0040'. Also time a calculateLoan for L-MAX. Turn each REAL defect into a failing `[REVIEW-n]` test; don't write tests for behaviour that is correct.
> Step 5: code quality (Minor unless it risks a wrong result).
> 
> Write your findings by appending a dated section to docs/process/review-findings.md (create it if missing), with the table your instructions specify, and end with `BLOCKING FINDINGS: <count>`. Do not edit src/ or any frozen test.

<details><summary>🔧 2 tool call(s): Bash ×2</summary>

- **Bash**

```bash
git log --oneline | head -20; ls; ls src/domain e2e docs/process; (npx vitest run --project domain 2>&1 | tail -15; echo EXIT $?); (npm run lint 2>&1 | tail -8; echo EXIT ${PIPESTATUS[0]}); (npm run typecheck 2>&1 | tail -8); (npm run format:check 2>&1 | tail -8)
```

- **Bash**

```bash
git log -p g3-tests-approved..HEAD --stat -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/' | head -50
```

  Result:
```
47e14e4 feat(S-11): rate, tenure, date-time and canonical-input formatters (spec §6)
d9dd337 feat(S-10): EMI and re-amortising schedule (spec §5.2, D-37; S-1, S-3, S-13)
6b6da5d feat(S-2): field validation with typed error codes (spec §4.2)
d85ab2b feat(S-2): input normalisation with strict comma grouping (spec §4.1, D-26)
9db17a8 feat(S-1): round2 and deterministic money formatting (spec §5, §6)
1ac54d0 docs(G3): approve D-43 and D-44; tests frozen from here
a8dbab0 docs(phase-3): record test-designer interpretations for G3 review (D-44)
06273a5 docs(test): manual test checklist, one line per v1 AC (94)
41aac8d test(e2e): Playwright specs for S-1 to S-13 and spec rules (Phase 3)
ada505f test(domain): unit and property tests for the domain API (Phase 3)
c54efbe docs(G2): approve D-41/D-42; add test-facing DOM contract (D-43, spec §8.3.1)
90be39d docs(phase-2): record D-41 (toolchain conflict) and D-42 (scaffold choices)
c78f28d ci: add verify and GitHub Pages deploy workflows
b322938 chore(scaffold): Vite + React + TS shell, test tooling, trace and size scripts
ae03c49 docs(G1): record Gate G1 decisions (D-25 to D-40) and spec fixes
b56ecb8 docs: apply planning-phase decisions (D-05, D-13 to D-24)
6d2986d chore: add requirements pack and agent definitions
CLAUDE.md
dist
docs
e2e
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
docs/process:
loop-plan.md
manual-test-checklist.md

e2e:
fixtures.ts
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
types.ts
validate.test.ts
validate.ts
 ✓ |domain| src/domain/validate.test.ts (114 tests) 33ms
 ✓ |domain| src/domain/loan.test.ts (47 tests) 136ms
 ✓ |domain| test/timezone.test.ts (1 test) 3ms
 ✓ |domain| src/domain/loan.property.test.ts (10 tests) 17822ms
   ✓ property tests over the full valid input domain (7)
     ✓ [AC-13.3][SPEC-§5.4] invariant 1: the schedule has exactly as many rows as months, numbered 1..n 4957ms
     ✓ [AC-10.4][SPEC-§5.4] invariants 2 and 3: payme
… [707 more characters not shown; see raw/]
```

  Result:
```
(Bash completed with no output)
```

</details>

### 🤖 Claude · 2026-10-18 00:26 PKT

Gate green, freeze clean. Now read the source.

<details><summary>🔧 8 tool call(s): Bash ×7, Write</summary>

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/domain && cat money.ts parse.ts validate.ts loan.ts format.ts types.ts
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/docs/spec && grep -n "^## \|^### " technical-spec.md | head -80
```

  Result:
```
// Decimal setup and money formatting (spec §3.1.1, §5, §6).
// The only module allowed to import decimal.js (D-36).
import DecimalJs from 'decimal.js'
import type { Currency } from './types'

/** The one configured Decimal constructor: 40 significant digits, half-up. */
export const Decimal = DecimalJs.clone({ precision: 40, rounding: DecimalJs.ROUND_HALF_UP })
export type Decimal = InstanceType<typeof Decimal>

const SYMBOL: Record<Currency, string> = { PKR: 'Rs ', USD: '$' }

/** x rounded half-up to 2 decimal places. */
export function round2(x: Decimal): Decimal {
  return x.toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
}

/** "Rs 88,848.79" or "$88,848.79". */
export function formatMoney(x: Decimal, currency: Currency): string {
  return SYMBOL[currency] + formatAmount(x)
}

/** "921,151.21" (no symbol). Rounds half-up to 2 dp first; never exponent notation. */
export function formatAmount(x: Decimal): string {
  // toFixed never uses exponent notation, whatever the size.
  const fixed = round2(x).toFixed(2)
  const negative = fixed.startsWith('-')
  const [whole = '0', cents = '00'] = (negative ? fixed.slice(1) : fixed).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${negative ? '-' : ''}${grouped}.${cents}`
}
// Raw string → normalised string (spec §4.1).

const WESTERN_GROUPING = /^\d{1,3}(,\d{3})+$/
const LAKH_GROUPING = /^\d{1,2}(,\d{2})*,\d{3}$/

/**
 * Trims, then removes commas only when they form valid western (1,000,000) or lakh
 * (10,00,000) grouping in the whole-number part (D-26). Otherwise the commas stay, so the
 * value fails the number pattern as "not a number".
 */
export function normaliseAmount(raw: string): string {
  const text = raw.trim()
  if (!text.includes(',')) return text

  const sign = text.startsWith('-') ? '-' : ''
  const unsigned = text.slice(sign.length)
  const dot = unsigned.indexOf('.')
  const whole = dot === -1 ? unsigned : unsigned.slice(0, dot)
  const fraction = dot === -1 ? '' : unsigned.slice(dot)

  if (fraction.includes(',')) return text
  if (!WESTERN_GROUPING.test(whole) && !LAKH_GROUPING.test(whole)) return text
  return sign + whole.replace(/,/g, '') + fraction
}

/** Trims, removes one trailing %, trims again. */
export function normaliseRate(raw: string): string {
  const text = raw.trim()
  return text.endsWith('%') ? text.slice(0, -1).trim() : text
}

export function normaliseTenure(raw: string): string {
  return raw.trim()
}
// Field rules → typed result or err
… [7,884 more characters not shown; see raw/]
```

  Result:
```
13:## 1. Purpose and scope
21:## 2. Technology stack
42:## 3. Architecture
44:### 3.1 Layers
73:### 3.1.1 Domain public API (D-16; frozen with the tests at Gate G3)
126:### 3.2 Application state (reducer)
149:## 4. Input parsing and validation
153:### 4.1 Normalisation (before validation)
161:### 4.2 Rules (checked in this order, stopping at the first failure per field)
189:### 4.3 Derived values
196:## 5. Calculation algorithm (normative)
200:### 5.1 EMI function
207:### 5.2 Schedule (re-amortising, cent-accurate)
231:### 5.3 Why this method (do not "simplify" it)
239:### 5.4 Invariants (property-tested with fast-check over the full valid input domain)
255:### 5.5 Reference values (must be reproduced exactly)
267:## 6. Formatting
282:## 7. Copy deck (all user-visible text; keep in `ui/copy.ts`)
334:## 8. UI behaviour
336:### 8.1 Layout (DOM order = visual order = tab order)
345:### 8.2 Schedule table
349:### 8.3 Errors and focus
355:### 8.3.1 Test-facing DOM contract (D-43; frozen with the tests at G3)
373:### 8.4 Theme
395:## 9. Persistence
397:### 9.1 Safe storage
401:### 9.2 Keys and schemas (version 1)
424:### 9.3 Saving rules
436:## 10. Error handling
442:## 11. Non-functional requirements
454:## 12. Testing strategy
456:### 12.1 Layers
474:### 12.2 Naming
478:### 12.3 Test independence
484:### 12.4 Tests are the contract
492:### 12.5 Traceability script (`npm run trace`)
501:## 13. npm scripts
517:## 14. CI/CD and deployment
524:## 15. Definition of done (per story)
532:## 16. Out of scope (v1), stated as assumptions in the README
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator/docs/spec && sed -n 73,125p technical-spec.md; sed -n 149,282p technical-spec.md
```

  Result:
````
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

// format.ts
formatRate(rate: Decimal): string                       // "12%", "21.5%"
formatTenure(tenure: number, unit: Unit): string        // "1 year", "
… [9,459 more characters not shown; see raw/]
````

- **Bash**

```bash
mkdir -p e2e/review && cat > /tmp/p.test.ts 2>/dev/null; cat > e2e/review/domain-probe.spec.ts <<'EOF'
import { test, expect } from '@playwright/test'
import { validateInputs } from '../../src/domain/validate'
import { calculateLoan } from '../../src/domain/loan'
import { formatAmount, formatMoney, Decimal } from '../../src/domain/money'
import { toCanonical, formatRate } from '../../src/domain/format'
import { normaliseAmount } from '../../src/domain/parse'

const v = (amount: string, rate = '12', tenure = '5', unit: 'years' | 'months' = 'years') =>
  validateInputs({ amount, rate, tenure, unit })

test('probe dump', () => {
  const out: string[] = []
  const amts = ['+5','1e6','Infinity','NaN','0x10','١٢','１２','-0','-0.00','.5','5.','00012','1,000,000.','1,,000',' 1 000','1 000',' 1000 ','1000\n','10\t00','1,000.50','10,00,000','-1,000','1,000.5,0','1000.','0001000','1'.repeat(10000),'1.'+ '0'.repeat(10000), '1000'+'0'.repeat(9000)+'.00']
  for (const a of amts) { let r; try { r = JSON.stringify(v(a), (_k, x) => (x instanceof Decimal ? x.toString() : x)) } catch (e) { r = 'THROW ' + e } out.push(`amount ${JSON.stringify(a.slice(0,30))}(${a.length}) => ${r.slice(0,160)}`) }
  for (const r of ['50.00','50.01','-0','0.00','12%','12 %','%','12%%','1e1','٥','0.005','.','-','00.5']) { let x; try { x = JSON.stringify(v('100000', r), (_k, y) => (y instanceof Decimal ? y.toString() : y)) } catch (e) { x = 'THROW ' + e } out.push(`rate ${JSON.stringify(r)} => ${x.slice(0,200)}`) }
  for (const [t,u] of [['40','years'],['40','months'],['480','months'],['481','months'],['0040','years'],['0','years'],['-0','months'],['-1','months'],['2.5','years'],['1e1','years'],['٤','years'],['9'.repeat(40),'years'],['1'.repeat(10000),'months'],['+5','years']] as const) { let x; try { x = JSON.stringify(v('100000','12',t,u), (_k, y) => (y instanceof Decimal ? y.toString() : y)) } catch (e) { x = 'THROW ' + e } out.push(`tenure ${JSON.stringify(t.slice(0,20))} ${u} => ${x.slice(0,200)}`) }
  for (const d of [new Decimal(-0), new Decimal('-0.001'), new Decimal('1e30'), new Decimal('0.005'), new Decimal('0.004999')]) out.push(`fmt ${d.toString()} => ${formatAmount(d)} | ${formatMoney(d,'PKR')}`)
  const z = v('1000','0.00','1','months'); if (z.ok) out.push('canon ' + JSON.stringify(toCanonical(z.value)) + formatRate(z.value.annualRate))
  const m = v('1000000000','50.00','480','months'); if (!m.ok) throw new Error('x')
  const t0 = Date.now(); const c = calculateLoan(m.value); out.pus
… [665 more characters not shown; see raw/]
```

  Result:
```
Command did not complete within its 120s timeout and was moved to the background (ID: bt0shau3h). Output is being written to: C:\Users\ARSLAN~1.NIN\AppData\Local\Temp\claude\c--Users-arslan-NINEALPHA-muhammad-arslan-calculator\9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5\tasks\bt0shau3h.output. You will be notified when it completes. To check interim output, use Read on that file path.
```

- **Bash**

```bash
cat playwright.config.ts | head -40; sleep 60; cat "C:/Users/ARSLAN~1.NIN/AppData/Local/Temp/claude/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5/tasks/bt0shau3h.output" | head -80
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
```

- **Bash**

```bash
pkill -f playwright; sed -e "s#import { test, expect } from '@playwright/test'#const test=(n:string,f:()=>void)=>f()#" e2e/review/domain-probe.spec.ts > src/__probe.ts && timeout 100 npx vite-node src/__probe.ts 2>&1 | head -90; rm -f src/__probe.ts
```

  Result:
```
/c/Users/arslan.NINEALPHA/.claude/shell-snapshots/snapshot-bash-1792251849760-aoygar.sh: line 42: pkill: command not found
sed: can't read e2e/review/domain-probe.spec.ts: No such file or directory
```

- **Bash**

```bash
ls e2e/review; git status --short | head
```

  Result:
```
(Bash completed with no output)
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\review\domain-probe.spec.ts

```
import { test } from '@playwright/test'
import { validateInputs } from '../../src/domain/validate'
import { calculateLoan } from '../../src/domain/loan'
import { formatAmount, formatMoney, Decimal } from '../../src/domain/money'
import { toCanonical, formatRate } from '../../src/domain/format'
import { normaliseAmount } from '../../src/domain/parse'

// Exploratory probe (prints observations; asserts nothing). Real defects get [REVIEW-n] tests.
const v = (amount: string, rate = '12', tenure = '5', unit: 'years' | 'months' = 'years') =>
  validateInputs({ amount, rate, tenure, unit })
const show = (x: unknown) => JSON.stringify(x, (_k, y) => (y instanceof Decimal ? y.toString() : y))

test('probe dump', () => {
  const out: string[] = []
  const amts = ['+5', '1e6', 'Infinity', 'NaN', '0x10', '١٢', '１２', '-0', '-0.00', '.5', '5.', '00012', '1,000,000.', '1,,000', ' 1 000', '1 000', ' 1000 ', '1000\n', '10\t00', '1,000.50', '10,00,000', '-1,000', '1,000.5,0', '1000.', '0001000', '1'.repeat(10000), '1.' + '0'.repeat(10000), '1000' + '0'.repeat(9000) + '.00']
  for (const a of amts) {
    let r: string
    try { r = show(v(a)) } catch (e) { r = 'THROW ' + e }
    out.push(`amount ${JSON.stringify(a.slice(0, 30))}(${a.length}) => ${r.slice(0, 160)}`)
  }
  for (const r of ['50.00', '50.01', '-0', '0.00', '12%', '12 %', '%', '12%%', '1e1', '٥', '0.005', '.', '-', '00.5']) {
    let x: string
    try { x = show(v('100000', r)) } catch (e) { x = 'THROW ' + e }
    out.push(`rate ${JSON.stringify(r)} => ${x.slice(0, 200)}`)
  }
  const tens: [string, 'years' | 'months'][] = [['40', 'years'], ['40', 'months'], ['480', 'months'], ['481', 'months'], ['0040', 'years'], ['0', 'years'], ['-0', 'months'], ['-1', 'months'], ['2.5', 'years'], ['1e1', 'years'], ['٤', 'years'], ['9'.repeat(40), 'years'], ['1'.repeat(10000), 'months'], ['+5', 'years']]
  for (const [t, u] of tens) {
    let x: string
    try { x = show(v('100000', '12', t, u)) } catch (e) { x = 'THROW ' + e }
    out.push(`tenure ${JSON.stringify(t.slice(0, 20))} ${u} => ${x.slice(0, 200)}`)
  }
  for (const d of [new Decimal(-0), new Decimal('-0.001'), new Decimal('1e30'), new Decimal('0.005'), new Decimal('0.004999')])
    out.push(`fmt ${d.toString()} => ${formatAmount(d)} | ${formatMoney(d, 'PKR')}`)
  const z = v('1000', '0.00', '1', 'months')
  if (z.ok) out.push('canon ' + show(toCanonical(z.value)) + formatRate(z.value.annualRate))
  const m = v('1000000000', '50.00', '480', 'months')
  if (!m.ok) throw new Error('x')
  const t0 = Date.now()
  const c = calculateLoan(m.value)
  out.push(`LMAX ${Date.now() - t0}ms rows=${c.rows.length} last=${c.rows[479]?.balance} pay=${formatMoney(c.monthlyPayment, 'PKR')} tot=${formatMoney(c.totalPayable, 'USD')}`)
  const m2 = v('1000', '0', '480', 'months')
  if (m2.ok) {
    const c2 = calculateLoan(m2.value)
    out.push(`zero-rate 1000/480 last=${c2.rows[479]?.balance} note=${c2.showRoundingNote} sumP=${c2.rows.reduce((s, r) => s.plus(r.principal), new 
… [141 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\review\domain-probe.spec.ts (file state is current in your context — no need to Read it back)
```

</details>

### 🤖 Claude · 2026-10-18 00:30 PKT

Run it via vite-node with a stubbed `test`.

<details><summary>🔧 7 tool call(s): Bash ×4, Write, SubagentHandback, Edit</summary>

- **Bash**

```bash
sed -e "s#import { test } from '@playwright/test'#const test=(n:string,f:()=>void)=>f()#" e2e/review/domain-probe.spec.ts > src/__probe.ts && timeout 100 npx vite-node src/__probe.ts 2>&1 | head -90; rm -f src/__probe.ts
```

  Result:
```
npm warn exec The following package was not found and will be installed: vite-node@6.0.0
file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:235
				const error = new Error(`Cannot find ${isBareImport(id) ? "package" : "module"} '${id}'${importer ? ` imported from '${importer}'` : ""}`, { cause });
				              ^

Error: Cannot find module '../../src/domain/validate' imported from 'C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/src/__probe.ts'
    at ViteNodeRunner._fetchModule (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:235:19)
    at ViteNodeRunner.directRequest (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:255:44)
    at ViteNodeRunner.cachedRequest (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:181:11)
    at ViteNodeRunner.dependencyRequest (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:228:10)
    at C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\__probe.ts:2:1
    at ViteNodeRunner.runModule (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:368:4)
    at ViteNodeRunner.directRequest (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:348:3)
    at ViteNodeRunner.cachedRequest (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:181:11)
    at ViteNodeRunner.executeFile (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/client.mjs:156:10)
    at CAC.run (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite-node/dist/cli.mjs:92:28) {
  code: 'ERR_MODULE_NOT_FOUND',
  [cause]: Error: Failed to load url ../../src/domain/validate (resolved id: ../../src/domain/validate). Does the file exist?
      at loadAndTransform (file:///C:/Users/arslan.NINEALPHA/AppData/Local/npm-cache/_npx/f2342a4b64a2bc92/node_modules/vite/dist/node/chunks/node.js:20173:31) {
    code: 'ERR_LOAD_URL'
  }
}

Node.js v24.16.0
```

- **Bash**

```bash
sed -e "s#import { test } from '@playwright/test'#const test=(n:string,f:()=>void)=>f()#" -e "s#\.\./\.\./src/domain/#./domain/#" e2e/review/domain-probe.spec.ts > src/__probe.ts && timeout 100 npx vite-node src/__probe.ts 2>&1 | head -90; rm -f src/__probe.ts
```

  Result:
```
amount "+5"(2) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "1e6"(3) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "Infinity"(8) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "NaN"(3) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "0x10"(4) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "١٢"(2) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "１２"(2) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "-0"(2) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount "-0.00"(5) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount ".5"(2) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount "5."(2) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount "00012"(5) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount "1,000,000."(10) => {"ok":true,"value":{"amount":"1000000","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "1,,000"(6) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount " 1 000"(6) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "1 000"(5) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount " 1000 "(6) => {"ok":true,"value":{"amount":"1000","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "1000\n"(5) => {"ok":true,"value":{"amount":"1000","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "10\t00"(5) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "1,000.50"(8) => {"ok":true,"value":{"amount":"1000.5","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "10,00,000"(9) => {"ok":true,"value":{"amount":"1000000","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "-1,000"(6) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount "1,000.5,0"(9) => {"ok":false,"errors":{"amount":"AMOUNT_NAN"}}
amount "1000."(5) => {"ok":true,"value":{"amount":"1000","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "0001000"(7) => {"ok":true,"value":{"amount":"1000","annualRate":"12","tenure":5,"unit":"years","months":60}}
amount "111111111111111111111111111111"(10000) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
amount "1.0000000000000000000000000000"(10002) => {"ok":false,"errors":{"amount":"AMOUNT_DECIMALS"}}
amount "100000000000000000000000000000"(9007) => {"ok":false,"errors":{"amount":"AMOUNT_RANGE"}}
rate "50.00" => {"ok":true,"value":{"amount":"100000","annualRate":"50","tenure":5,"unit":"years","months":60}}
rate "50.01" => {"ok":false,"errors":{"rate":"RATE_RANGE
… [2,634 more characters not shown; see raw/]
```

- **Bash**

```bash
grep -nE "Intl|toLocale|Decimal\.set|\bany\b|Number\(|parseFloat|parseInt|toNumber|from '\.\./(ui|storage)|from 'decimal" src/domain/*.ts | grep -v test; ls docs/process; git status --short
```

  Result:
```
src/domain/format.ts:2:// Deterministic by design: no Intl, no toLocaleString.
src/domain/money.ts:3:import DecimalJs from 'decimal.js'
src/domain/validate.ts:42:  // Compare as Decimal so 40-digit input is judged correctly before any conversion.
src/domain/validate.ts:47:  return { ok: true, value: value.toNumber() }
loop-plan.md
manual-test-checklist.md
?? e2e/review/
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md

```
# Review findings

## 2026-10-18: Mini-gate G4.1 (domain layer: S-1, S-2, S-3, S-10, S-13)

Scope: `src/domain/{money,parse,validate,loan,format}.ts`, commits 9db17a8..47e14e4 on `v1`. UI absent; E2E not part of this gate.

### Gate evidence

| Command | Result |
|---|---|
| `npx vitest run --project domain` | 7 files, 294 tests passed, exit 0 |
| `npm run lint` | exit 0 (0 warnings) |
| `npm run typecheck` | exit 0 |
| `npm run format:check` | "All matched files use Prettier code style!" |
| `git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'` | empty: no change in the freeze scope since G3; no skip/only/fixme/fail introduced |

### Conformance checked (no defect found)

- 4.1: trim; D-26 strict western/lakh grouping, sign handled, comma after `.` rejected; rate strips exactly one `%`.
- 4.2: order empty, format, precision, range; `\d` is ASCII only (`١٢`, `１٢` give NAN); all comparisons in `Decimal`; tenure 40-nines gives RANGE; `-0` rate gives 0 (normalised); `-0`/`-0.00` amount gives RANGE.
- 5.1/5.2: line-for-line match, including D-37 multiply-first interest and the last-month rule (principal = balance). L-MAX (1e9, 50%, 480 months): 16 ms, final balance 0, total payable $20,000,000,061.79 (matches spec 6 example). 0% rate with 480 months: sum of principal = 1000 exactly, balance 0.
- 6: no Intl or toLocaleString; `formatAmount` uses `toFixed` (no exponent; 1e30 prints in full); `-0` and `-0.001` print `0.00`; `0.005` gives `0.01`.
- D-36: single cloned Decimal, no `Decimal.set`, only `money.ts` imports `decimal.js`; no domain import from `ui/` or `storage/`.
- Money as `number`: none. Sole `toNumber()` is the tenure (1..480, already range-checked, so safe).
- Hostile input (probe `e2e/review/domain-probe.spec.ts`, output reviewed): `+5`, `1e6`, `Infinity`, `NaN`, `0x10`, `١٢`, `１２`, `10\t00`, `1 000`, `1,,000`, `1.2.3`-style all give the NAN/WHOLE codes; NBSP and trailing newline are trimmed; 10,000-char strings give RANGE or DECIMALS without throwing; `validateInputs` never threw on any probe.

### Findings

| ID | Severity | Story/AC | Evidence | Suggested fix |
|---|---|---|---|---|
| (none) | n/a | n/a | No Blocker or Major defect found in the domain layer. | n/a |
| M-1 | Minor | S-11 (formatDateTime) | `format.ts` does not zero-pad years below 1000; unreachable with real dates. | None needed; optional. |
| M-2 | Minor | Process | `e2e/review/domain-probe.spec.ts` is an observation-only probe (no assertions). `testDir: 'e2e'` means it also runs under `npm run test:e2e` in 3 browsers. | Delete it before `verify`, or keep it as a no-op; it asserts nothing. |
| M-3 | Minor | S-2 | `normaliseTenure` is a bare `trim()`, and `Partial<Record<Field, ErrorCode>>` is built imperatively; fine, just note `checkTenure` returns `value.toNumber()` of a `Decimal` that is only bounded by the range check above it (order matters; add a comment if reordered). | None. 
… [165 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md (file state is current in your context — no need to Read it back)
```

- **SubagentHandback**

```json
{
 "message": "G4.1 review (domain layer): I found no Blocker or Major defects.\n\n**Gate**\n- `npx vitest run --project domain`: 7 files, 294 tests passed, exit 0.\n- `npm run lint`: exit 0 with 0 warnings.\n- `npm run typecheck`: exit 0.\n- `npm run format:check`: all files formatted.\n- Freeze check: `git log -p g3-tests-approved..HEAD` over the §12.4 scope returned nothing. No frozen file changed since G3, and there is no skip, only, fixme or weakened assertion.\n\n**Spec conformance**\n- I checked §4.1 (including D-26 grouping), §4.2 order and codes, §4.3, §5.1/§5.2 (D-37 multiply-first, last-month rule), §6, §3.1.1 signatures and D-36. All match, and no domain file imports from `ui/` or `storage/`.\n- No JS `number` holds money. The only `toNumber()` is on tenure, after the 1..480 range check.\n- There is no `Intl`, no `toLocaleString`, no `Decimal.set`, and no `any`.\n- `validateInputs` never threw on any probe input.\n\n**Hostile input**\nI probed these through `validateInputs`, `calculateLoan` and the formatters:\n- Rejected as `AMOUNT_NAN`: `+5`, `1e6`, `Infinity`, `NaN`, `0x10`, `١٢`, `１２`, `1,,000`, `1 000`, and a tab inside the number.\n- Trimmed and accepted: a non-breaking space or trailing newline at the ends of a value.\n- Reached range or decimals checks without throwing: a 10,000-character string, and a 40-nines tenure (`TENURE_RANGE_*`).\n- Normalised to a valid 0: rate `-0`.\n- Rejected as `AMOUNT_RANGE`: amount `-0` and `-0.00`.\n- Accepted: `1,000,000.`
… [1,107 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

- **Bash**

```bash
rm -f e2e/review/domain-probe.spec.ts && ls e2e/review
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md

Replace:
```
Observation: the UI-level cases
```
With:
```
Update (coordinator request): the observation-only probe `e2e/review/domain-probe.spec.ts` (M-2) has been deleted; M-2 is resolved. Its results are recorded above.

Observation: the UI-level cases
```

  Result:
```
(Bash completed with no output)
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\review-findings.md has been updated successfully.
```

</details>

### 🤖 Claude · 2026-10-18 00:31 PKT

I deleted `e2e/review/domain-probe.spec.ts`; `e2e/review/` is now empty. I added a note to the G4.1 section of `docs/process/review-findings.md` saying the probe was removed and Minor finding M-2 (the probe) is resolved. The verdict is unchanged: BLOCKING FINDINGS: 0.

