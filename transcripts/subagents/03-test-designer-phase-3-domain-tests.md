# Subagent 03: test-designer: Phase 3 domain tests

Subagent **`test-designer`**, task: *Phase 3 domain tests*. Started 2026-10-17 22:30 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-17 22:30 PKT

> Phase 3 (tests first) for the Loan EMI Calculator. You own the DOMAIN tests only; another test-designer is writing the Playwright/UI tests in parallel (it owns e2e/**, src/ui/**, docs/process/manual-test-checklist.md). Follow your agent instructions in full, with this scope.
> 
> ## Read first
> CLAUDE.md; docs/user-stories.md (all v1 ACs); docs/spec/technical-spec.md, especially §3.1.1 (domain public API — call ONLY these exports), §4 (parsing/validation incl. the `[SPEC-§4.2]` input table), §5 (algorithm, invariants, reference values incl. §5.5 `[SPEC-§5.3]` loans), §6 (formatting), §12; docs/spec/decision-log.md D-13 to D-43.
> 
> ## State of the repo
> - The developer has created throwing stubs (`throw new Error('NOT_IMPLEMENTED')`) for every §3.1.1 function in src/domain/{money,parse,validate,loan,format}.ts; `types.ts` and the configured `Decimal` (exported from src/domain/money.ts) are real. Do NOT edit any non-test file under src/, and do NOT edit vitest.config.ts / playwright.config.ts / tsconfig*.json (report needed changes instead).
> - Vitest "domain" project runs `src/domain/**/*.test.ts` and `test/**/*.test.ts` in Node with TZ=Asia/Karachi. Imports from 'vitest' explicitly (no globals). No @testing-library/jest-dom.
> 
> ## Your files
> `src/domain/*.test.ts` (e.g. parse.test.ts, validate.test.ts, money.test.ts, format.test.ts, loan.test.ts, loan.property.test.ts) and `test/timezone.test.ts`.
> 
> ## What to cover (titles start with the tag; one test may carry several tags)
> - Domain-level proof for: AC-1.1–1.10 (validateInputs + calculateLoan → monthlyPayment.toFixed(2)), AC-2.2–2.11, AC-2.15, AC-2.17 (validateInputs error codes; note 40-nines inputs), AC-3.1–3.5, AC-3.6 (property), AC-10.2–10.7 (rows, showRoundingNote; 10.4/10.5 property), AC-11.11 (formatRate/formatTenure), AC-13.1–13.3 (13.3 property). The UI agent will also tag UI-level tests for the same ACs; that's fine.
> - `[SPEC-§4.2]`: every row of the spec §4.2 input table.
> - `[SPEC-§5.3]`: the two regression loans in §5.5 (headline, row count, final balance 0.00, all payments within 0.01).
> - `[SPEC-§5.4]`: invariants not already proven under an AC tag — at least invariant 4 (0 ≤ principal ≤ opening, balance ≥ 0) and invariant 8 (years vs equivalent months: compare rows, totals and showRoundingNote, not input).
> - `[SPEC-§5.5]`: L-A rows 9, 10, 12 payments = 88,848.78, all other rows 88,848.79; L-A row 6 balance.
> - `[SPEC-§6]`: formatMoney (`Rs 88,848.79`, `$1,000,000.00`, `Rs 0.00`, `Rs 20,000,000,061.79`, no exponent for 1e9-scale values), formatAmount, formatDateTime (`17 Oct 2026, 20:45` from `new Date('2026-10-17T20:45:00+05:00')`, `5 Jan 2027, 09:05`), toCanonical (`2500000`, `18`, `1500.5`, `-0` rate → `0`, no exponent notation), formatTenure singular/plural.
> - `[SPEC-§12.1]` in test/timezone.test.ts: `new Date('2026-10-17T15:45:00Z').getHours() === 20`.
> - `[SPEC-§3.1.1]`: the exported Decimal has precision 40 and ROUND_HALF_UP (this one may pass before implementation — list it).
> 
> ## Rules that bite
> - Hard-code every expected value from the ACs/spec. Never compute an expected figure with the code under test. In property tests, the invariant oracle may use the configured `Decimal` from money.ts directly (e.g. `x.toDecimalPlaces(2, Decimal.ROUND_HALF_UP)`), never `round2`/`emi`/`calculateLoan` as an oracle.
> - Obtain `LoanInput` only via `validateInputs` (build raw strings from generated integer cents / basis points / months).
> - fast-check: ≥ 1,000 runs per property, fixed seed (use 20261017), print the seed; generators biased per spec §5.4 / D-38 (≥ 25% corner draws: amount 1,000–20,000, rate 30–50%, tenure 300–480 months; every exact bound appears). Keep total domain-suite runtime reasonable (minutes, not tens of minutes) once implemented.
> - Tests must fail for the right reason now (NOT_IMPLEMENTED), not import/type/syntax errors. Your files must pass `npx eslint <your files> --max-warnings 0`, `npx prettier --check <your files>` and `npm run typecheck` (errors in the other agent's in-progress files under e2e/ or src/ui/ are not yours — mention them but don't fix them).
> - Never use `.skip`, `.only`, `.todo`, `.fails`.
> 
> ## Finish with
> Your agent report: tests per story/AC, the list of tests that PASS before implementation (expected: SPEC-§12.1, SPEC-§3.1.1, and anything negative-only — justify each), ambiguous ACs (quote), any config change you need, and the final `npx vitest run --project domain` summary lines.

<details><summary>🔧 16 tool call(s): Read ×2, Glob, Bash ×8, Write ×5</summary>

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\technical-spec.md"
}
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\user-stories.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\user-stories.md"
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

- **Glob** · src/domain/*

```json
{
 "pattern": "src/domain/*",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator"
}
```

  Result:
```
src\domain\money.ts
src\domain\parse.ts
src\domain\validate.ts
src\domain\loan.ts
src\domain\format.ts
src\domain\types.ts
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; cat src/domain/*.ts | head -150; cat vitest.config.ts; ls test; cat package.json | head -50; grep -n "D-3[6-9]\|D-4[0-3]\|D-2[6-9]" docs/spec/decision-log.md | head -30
```

  Result:
```
// Rate, tenure, date and canonical-input text for history entries (spec §6).
import type { Decimal } from './money'
import type { CanonicalInput, LoanInput, Unit } from './types'

/** "12%", "21.5%", "0.01%", "0%". */
export function formatRate(_rate: Decimal): string {
  throw new Error('NOT_IMPLEMENTED')
}

/** "1 year", "5 years", "1 month", "12 months". */
export function formatTenure(_tenure: number, _unit: Unit): string {
  throw new Error('NOT_IMPLEMENTED')
}

/** Local time "17 Oct 2026, 20:45". */
export function formatDateTime(_date: Date): string {
  throw new Error('NOT_IMPLEMENTED')
}

/** Never exponent notation; -0 becomes 0. */
export function toCanonical(_input: LoanInput): CanonicalInput {
  throw new Error('NOT_IMPLEMENTED')
}
// EMI and schedule algorithm (spec §5, normative).
import type { Decimal } from './money'
import type { CalculatedLoan, LoanInput } from './types'

/** §5.1, unrounded. */
export function emi(_balance: Decimal, _monthlyRate: Decimal, _months: number): Decimal {
  throw new Error('NOT_IMPLEMENTED')
}

/** §5.2 re-amortising, cent-accurate schedule. */
export function calculateLoan(_input: LoanInput): CalculatedLoan {
  throw new Error('NOT_IMPLEMENTED')
}
// Decimal setup and money formatting (spec §3.1.1, §5, §6).
// The only module allowed to import decimal.js (D-36).
import DecimalJs from 'decimal.js'
import type { Currency } from './types'

/** The one configured Decimal constructor: 40 significant digits, half-up. */
export const Decimal = DecimalJs.clone({ precision: 40, rounding: DecimalJs.ROUND_HALF_UP })
export type Decimal = InstanceType<typeof Decimal>

/** x rounded half-up to 2 decimal places. */
export function round2(_x: Decimal): Decimal {
  throw new Error('NOT_IMPLEMENTED')
}

/** "Rs 88,848.79" or "$88,848.79". */
export function formatMoney(_x: Decimal, _currency: Currency): string {
  throw new Error('NOT_IMPLEMENTED')
}

/** "921,151.21" (no symbol). */
export function formatAmount(_x: Decimal): string {
  throw new Error('NOT_IMPLEMENTED')
}
// Raw string → normalised string (spec §4.1).

export function normaliseAmount(_raw: string): string {
  throw new Error('NOT_IMPLEMENTED')
}

export function normaliseRate(_raw: string): string {
  throw new Error('NOT_IMPLEMENTED')
}

export function normaliseTenure(_raw: string): string {
  throw new Error('NOT_IMPLEMENTED')
}
// Domain types (spec §3.1.1). Frozen with the tests at Gate G3.
import type { Decimal } from './money'

export type Unit = '
… [6,883 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; cat eslint.config.js 2>/dev/null | head -80; cat tsconfig.json; ls tsconfig*; cat tsconfig.test.json 2>/dev/null; cat test/setup.ts; cat .prettierrc* 2>/dev/null; ls scripts
```

  Result:
```
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
        { property: 'toLocaleString', message: 'Use the custom formatters (spec §6).' },
        { property: 'toLocaleDateString', message: 'Use formatDateTime (spec §6).' },
        { property: 'toLocaleTimeString', message: 'Use formatDateTime (spec §6).' },
        { object: 'Number', property: 'parseFloat', message: 'Money is never a JS number.' },
      ],
      'no-restricted-imports': ['error', noDirectDecimal],
    },
  },
  {
    // Layer rule (spec §3.1): domain imports nothing from ui/ or storage/, nor React.
    files: ['src/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [decimalOnlyFromMoney, 'react', 'react-dom'],
          patterns: [
            {
              group: ['**/ui', '**/ui/**', '**/storage', '**/storage/**'],
              message: 'domain/ must not import ui/ or storage/ (spec §3.1).',
            },
          ],
        },
      ],
    },
  },
  {
    /
… [2,222 more characters not shown; see raw/]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator
cat > test/helpers.ts <<'EOF'
// Shared helpers for domain tests. Not a test file. Uses only the spec §3.1.1 API.
import { calculateLoan } from '../src/domain/loan'
import { validateInputs } from '../src/domain/validate'
import type { CalculatedLoan, LoanInput, RawInputs, Unit } from '../src/domain/types'

export function raw(amount: string, rate: string, tenure: string, unit: Unit = 'years'): RawInputs {
  return { amount, rate, tenure, unit }
}

/** Obtain a LoanInput only through validateInputs; fails loudly if the inputs are rejected. */
export function inputOf(amount: string, rate: string, tenure: string, unit: Unit = 'years'): LoanInput {
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
export function rowText(loan: CalculatedLoan, index: number): string {
  const r = loan.rows[index]
  return [r.month, r.payment.toFixed(2), r.interest.toFixed(2), r.principal.toFixed(2), r.balance.toFixed(2)].join(' | ')
}
EOF
cat > test/timezone.test.ts <<'EOF'
import { describe, expect, it } from 'vitest'

describe('time zone', () => {
  it('[SPEC-§12.1] the Asia/Karachi zone is applied on every OS (15:45 UTC is 20:45 local)', () => {
    expect(new Date('2026-10-17T15:45:00Z').getHours()).toBe(20)
    expect(new Date('2026-10-17T15:45:00Z').getMinutes()).toBe(45)
  })
})
EOF
cat > src/domain/money.test.ts <<'EOF'
import { describe, expect, it } from 'vitest'
import { Decimal, formatAmount, formatMoney, round2 } from './money'

describe('configured Decimal', () => {
  it('[SPEC-§3.1.1] has precision 40 and ROUND_HALF_UP', () => {
    expect(Decimal.precision).toBe(40)
    expect(Decimal.rounding).toBe(Decimal.ROUND_HALF_UP)
    expect(Decimal.rounding).toBe(4)
    expect(new Decimal(1).div(3).toString()).toBe('0.' + '3'.repeat(40))
    expect(new Decimal('2.5').toDecimalPlaces(0).toString()).toBe('3')
  })
})

describe('round2', () => {
  it.each([
    ['0.005', '0.01'],
    ['0.004', '0.00'],
    ['0.0049999', '0.00'],
    ['1.005', '1.01'],
    ['2.675', '2.68'],
    ['88848.785', '88848.79'],
… [2,860 more characters not shown; see raw/]
```

  Result:
```
(Bash completed with no output)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator
cat > src/domain/parse.test.ts <<'EOF'
import { describe, expect, it } from 'vitest'
import { normaliseAmount, normaliseRate, normaliseTenure } from './parse'

describe('normaliseAmount', () => {
  it.each([
    ['1,000,000', '1000000'],
    ['10,00,000', '1000000'],
    ['1,00,000', '100000'],
    ['1,000.50', '1000.50'],
    ['1,000', '1000'],
    ['12,345', '12345'],
    ['1,00,00,000', '10000000'],
    ['1,000,000,000', '1000000000'],
    ['-1,000', '-1000'],
    ['  1,000,000  ', '1000000'],
    ['1,000.', '1000.'],
  ])('[AC-1.8][SPEC-§4.1] removes valid grouping commas: %j -> %j', (input, expected) => {
    expect(normaliseAmount(input)).toBe(expected)
  })

  it.each([['1,,000'], ['1000,50'], ['1,5'], [',1000'], ['10,0000'], ['1,000.5,0'], ['1,000,00'], ['1,0000,000']])(
    '[AC-2.17][SPEC-§4.1] leaves invalid comma placement in place: %j',
    (input) => {
      expect(normaliseAmount(input)).toBe(input)
    },
  )

  it.each([
    ['  1000000  ', '1000000'],
    ['\t1000\n', '1000'],
    ['1000000', '1000000'],
    ['abc', 'abc'],
    ['', ''],
    ['   ', ''],
    ['1e6', '1e6'],
  ])('[AC-1.9][SPEC-§4.1] trims whitespace only: %j -> %j', (input, expected) => {
    expect(normaliseAmount(input)).toBe(expected)
  })
})

describe('normaliseRate', () => {
  it.each([
    ['12%', '12'],
    ['  12  ', '12'],
    [' 12% ', '12'],
    ['12 %', '12'],
    ['12.5 % ', '12.5'],
    ['%', ''],
    ['  %  ', ''],
    ['12%%', '12%'],
    ['12', '12'],
    ['', ''],
    ['%12', '%12'],
  ])('[AC-1.10][SPEC-§4.1] normaliseRate(%j) = %j (one trailing %% removed)', (input, expected) => {
    expect(normaliseRate(input)).toBe(expected)
  })
})

describe('normaliseTenure', () => {
  it.each([
    ['  1  ', '1'],
    ['\t12\n', '12'],
    ['012', '012'],
    ['2.5', '2.5'],
    ['', ''],
    ['   ', ''],
    ['1,0', '1,0'],
  ])('[AC-1.9][SPEC-§4.1] normaliseTenure(%j) = %j (trim only)', (input, expected) => {
    expect(normaliseTenure(input)).toBe(expected)
  })
})
EOF
cat > src/domain/validate.test.ts <<'EOF'
import { describe, expect, it } from 'vitest'
import { validateInputs } from './validate'
import type { ErrorCode, Field, RawInputs } from './types'

const BASE: RawInputs = { amount: '1000000', rate: '12', tenure: '1', unit: 'years' }

function errorsFor(over: Partial<RawInputs>): Partial<Record<Field, ErrorCode>> {
  const result = validateInputs({ ...BASE, ...over })
  return result.ok ? {} : res
… [12,812 more characters not shown; see raw/]
```

  Result (error):
```
Exit code 2
/usr/bin/bash: -c: line 182: unexpected EOF while looking for matching `''
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; ls -la src/domain test
```

  Result:
```
src/domain:
total 23
drwxr-xr-x 1 arslan 1049089    0 Oct 17 22:31 .
drwxr-xr-x 1 arslan 1049089    0 Oct 17 21:54 ..
-rw-r--r-- 1 arslan 1049089  758 Oct 17 21:50 format.ts
-rw-r--r-- 1 arslan 1049089  463 Oct 17 21:50 loan.ts
-rw-r--r-- 1 arslan 1049089 3559 Oct 17 22:31 money.test.ts
-rw-r--r-- 1 arslan 1049089  828 Oct 17 21:50 money.ts
-rw-r--r-- 1 arslan 1049089  336 Oct 17 21:50 parse.ts
-rw-r--r-- 1 arslan 1049089 1451 Oct 17 21:52 types.ts
-rw-r--r-- 1 arslan 1049089  256 Oct 17 21:50 validate.ts

test:
total 17
drwxr-xr-x 1 arslan 1049089    0 Oct 17 22:31 .
drwxr-xr-x 1 arslan 1049089    0 Oct 17 21:56 ..
-rw-r--r-- 1 arslan 1049089 1320 Oct 17 22:31 helpers.ts
-rw-r--r-- 1 arslan 1049089 1226 Oct 17 21:50 setup.ts
-rw-r--r-- 1 arslan 1049089  319 Oct 17 22:31 timezone.test.ts
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\parse.test.ts

```
import { describe, expect, it } from 'vitest'
import { normaliseAmount, normaliseRate, normaliseTenure } from './parse'

describe('normaliseAmount', () => {
  it.each([
    ['1,000,000', '1000000'],
    ['10,00,000', '1000000'],
    ['1,00,000', '100000'],
    ['1,000.50', '1000.50'],
    ['1,000', '1000'],
    ['12,345', '12345'],
    ['1,00,00,000', '10000000'],
    ['1,000,000,000', '1000000000'],
    ['-1,000', '-1000'],
    ['  1,000,000  ', '1000000'],
    ['1,000.', '1000.'],
  ])('[AC-1.8][SPEC-§4.1] removes valid grouping commas: %j -> %j', (input, expected) => {
    expect(normaliseAmount(input)).toBe(expected)
  })

  it.each([
    ['1,,000'],
    ['1000,50'],
    ['1,5'],
    [',1000'],
    ['10,0000'],
    ['1,000.5,0'],
    ['1,000,00'],
    ['1,0000,000'],
  ])('[AC-2.17][SPEC-§4.1] leaves invalid comma placement in place: %j', (input) => {
    expect(normaliseAmount(input)).toBe(input)
  })

  it.each([
    ['  1000000  ', '1000000'],
    ['\t1000\n', '1000'],
    ['1000000', '1000000'],
    ['abc', 'abc'],
    ['', ''],
    ['   ', ''],
    ['1e6', '1e6'],
  ])('[AC-1.9][SPEC-§4.1] trims whitespace only: %j -> %j', (input, expected) => {
    expect(normaliseAmount(input)).toBe(expected)
  })
})

describe('normaliseRate', () => {
  it.each([
    ['12%', '12'],
    ['  12  ', '12'],
    [' 12% ', '12'],
    ['12 %', '12'],
    ['12.5 % ', '12.5'],
    ['%', ''],
    ['  %  ', ''],
    ['12%%', '12%'],
    ['12', '12'],
    ['', ''],
    ['%12', '%12'],
  ])('[AC-1.10][SPEC-§4.1] normaliseRate(%j) = %j (one trailing percent removed)', (input, expected) => {
    expect(normaliseRate(input)).toBe(expected)
  })
})

describe('normaliseTenure', () => {
  it.each([
    ['  1  ', '1'],
    ['\t12\n', '12'],
    ['012', '012'],
    ['2.5', '2.5'],
    ['', ''],
    ['   ', ''],
    ['1,0', '1,0'],
  ])('[AC-1.9][SPEC-§4.1] normaliseTenure(%j) = %j (trim only)', (input, expected) => {
    expect(normaliseTenure(input)).toBe(expected)
  })
})
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\validate.test.ts

```
import { describe, expect, it } from 'vitest'
import { validateInputs } from './validate'
import type { ErrorCode, Field, RawInputs } from './types'

const BASE: RawInputs = { amount: '1000000', rate: '12', tenure: '1', unit: 'years' }

function errorsFor(over: Partial<RawInputs>): Partial<Record<Field, ErrorCode>> {
  const result = validateInputs({ ...BASE, ...over })
  return result.ok ? {} : result.errors
}

function valueFor(over: Partial<RawInputs>) {
  const result = validateInputs({ ...BASE, ...over })
  if (!result.ok) throw new Error(`expected ok, got ${JSON.stringify(result.errors)}`)
  return result.value
}

const NINES = '9'.repeat(40)

describe('validateInputs: successful parse', () => {
  it('[AC-1.1] accepts L-A and derives amount, rate, tenure and months', () => {
    const v = valueFor({})
    expect(v.amount.toFixed(2)).toBe('1000000.00')
    expect(v.annualRate.toFixed(2)).toBe('12.00')
    expect(v.tenure).toBe(1)
    expect(v.unit).toBe('years')
    expect(v.months).toBe(12)
  })

  it('[AC-1.2] months unit: months equals tenure', () => {
    const v = valueFor({ tenure: '12', unit: 'months' })
    expect(v.tenure).toBe(12)
    expect(v.unit).toBe('months')
    expect(v.months).toBe(12)
  })

  it('[AC-1.8] accepts western and lakh grouping in the amount', () => {
    expect(valueFor({ amount: '1,000,000' }).amount.toFixed(2)).toBe('1000000.00')
    expect(valueFor({ amount: '10,00,000' }).amount.toFixed(2)).toBe('1000000.00')
    expect(valueFor({ amount: '1,00,000' }).amount.toFixed(2)).toBe('100000.00')
    expect(valueFor({ amount: '1,000.50' }).amount.toFixed(2)).toBe('1000.50')
  })

  it('[AC-1.9] ignores leading and trailing spaces in all three fields', () => {
    const v = valueFor({ amount: ' 1000000 ', rate: ' 12 ', tenure: ' 1 ' })
    expect(v.amount.toFixed(2)).toBe('1000000.00')
    expect(v.annualRate.toFixed(2)).toBe('12.00')
    expect(v.tenure).toBe(1)
    expect(v.months).toBe(12)
  })

  it('[AC-1.10] accepts a trailing percent sign on the rate', () => {
    expect(valueFor({ rate: '12%' }).annualRate.toFixed(2)).toBe('12.00')
  })

  it('[AC-2.5][AC-2.7][AC-2.10] accepts every exact bound', () => {
    expect(valueFor({ amount: '1000' }).amount.toFixed(2)).toBe('1000.00')
    expect(valueFor({ amount: '1000000000' }).amount.toFixed(2)).toBe('1000000000.00')
    expect(valueFor({ rate: '0' }).annualRate.isZero()).toBe(true)
    expect(valueFor({ rate: '50' }).annualRate.toFixed(2)).toBe('50.00')
    expect(valueFor({ rate: '0.01' }).annualRate.toFixed(2)).toBe('0.01')
    expect(valueFor({ tenure: '1', unit: 'years' }).months).toBe(12)
    expect(valueFor({ tenure: '40', unit: 'years' }).months).toBe(480)
    expect(valueFor({ tenure: '1', unit: 'months' }).months).toBe(1)
    expect(valueFor({ tenure: '480', unit: 'months' }).months).toBe(480)
  })
})

describe('validateInputs: error codes', () => {
  it('[AC-2.1] empty form gives the three REQUIRED codes', () => {
    expect(validateInputs({ amount: '
… [9,736 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\parse.test.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\validate.test.ts (file state is current in your context — no need to Read it back)
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\format.test.ts

```
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
})

describe('formatDateTime', () => {
  it('[SPEC-§6][AC-11.2] formats 20:45 on 17 Oct 2026', () => {
    expect(formatDateTime(new Date('2026-10-17T20:45:00+05:00'))).toBe('17 Oct 2026, 20:45')
  })

  it('[SPEC-§6] zero-pads hour and minute but not the day: 5 Jan 2027, 09:05', () => {
    expect(formatDateTime(new Date('2027-01-05T09:05:00+05:00'))).toBe('5 Jan 2027, 09:05')
  })

  it('[SPEC-§6] uses local time (Asia/Karachi), not UTC', () => {
    expect(formatDateTime(new Date('2026-10-17T15:45:00Z'))).toBe('17 Oct 2026, 20:45')
    expect(formatDateTime(new Date('2026-12-31T20:00:00Z'))).toBe('1 Jan 2027, 01:00')
  })

  it('[SPEC-§6] uses a 24-hour clock around midnight and noon', () => {
    expect(formatDateTime(new Date('2026-03-09T00:00:00+05:00'))).toBe('9 Mar 2026, 00:00')
    expect(formatDateTime(new Date('2026-03-09T12:00:00+05:00'))).toBe('9 Mar 2026, 12:00')
    expect(formatDateTime(new Date('2026-03-09T23:59:00+05:00'))).toBe('9 Mar 2026, 23:59')
    expect(formatDateTime(new Date('2026-03-09T13:07:00+05:00'))).toBe('9 Mar 2026, 13:07')
  })

  it('[SPEC-§6] uses English three-letter months for all twelve months', () => {
    const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    names.forEach((name, i) => {
      const mm = String(i + 1).padStart(2, '0')
      expect(formatDateTime(new Date(`2026-${mm}-15T10:30:00+05:00`))).toBe(`15 ${name} 2026, 10:30`)
    })
  })

  it('[SPEC-§6] two-digit days are not padded further', () => {
    expect(formatDateTime(new Date('2026-11-30T18:20:00+05:00'))).toBe('30 Nov 2026, 18:20')
    expect(formatDateTime(new Date('2026-11-01T18:20:00+05:00'))).toBe('1 Nov 2026, 18:20')
  })
})

describe('toCanonic
… [2,327 more characters not shown; see raw/]
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\loan.test.ts

```
import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { calculateLoan, emi } from './loan'
import { validateInputs } from './validate'
import { calc, inputOf, rowText } from '../../test/helpers'

/** Headline, total interest and total payable, all 2 dp, hard-coded from the reference table. */
function figures(loan: ReturnType<typeof calc>) {
  return {
    monthly: loan.monthlyPayment.toFixed(2),
    interest: loan.totalInterest.toFixed(2),
    total: loan.totalPayable.toFixed(2),
  }
}

describe('reference loans: monthly payment', () => {
  it('[AC-1.1] L-A (1000000, 12, 1 year) has monthly payment 88848.79', () => {
    expect(calc('1000000', '12', '1', 'years').monthlyPayment.toFixed(2)).toBe('88848.79')
  })

  it('[AC-1.2] L-A entered as 12 months gives the same 88848.79', () => {
    expect(calc('1000000', '12', '12', 'months').monthlyPayment.toFixed(2)).toBe('88848.79')
  })

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
    const loan = calc(' 1000000 ', ' 12 ', ' 1 ', 'years')
    expect(figures(loan)).toEqual({
      monthly: '88848.79',
      interest: '66185.45',
      total: '1066185.45',
    })
  })

  it('[AC-1.10] a trailing percent sign on the rate is ignored', () => {
    expect(figures(calc('1000000', '12%', '1', 'years'))).toEqual({
      monthly: '88848.79',
      interest: '66185.45',
      total: '1066185.45',
    })
  })

  it('[AC-1.11] calculating the same input again gives identical results', () => {
    const input = inputOf('1000000', '12', '1', 'years')
    const first = calculateLoan(input)
    const second = calculateLoan(input)
    expect(figures(second)).toEqual(figures(first))
    expect(second.rows.map((_, i) => rowText(second, i))).toEqual(
      first.rows.map((_, i) => rowText(first, i)),
    )
  })
})


… [11,118 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\format.test.ts (file state is current in your context — no need to Read it back)
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\loan.test.ts (file state is current in your context — no need to Read it back)
```

- **Write** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\loan.property.test.ts

```
import fc from 'fast-check'
import { beforeAll, describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { calculateLoan } from './loan'
import { validateInputs } from './validate'
import type { CalculatedLoan, Unit } from './types'

const SEED = 20261017
const RUNS = 1000
const TIMEOUT = 600_000

/** A generated loan, described by integers only: cents, basis points of a percent, months. */
interface Case {
  cents: number
  bps: number
  months: number
  /** Use the years field when months is a multiple of 12 (and this flag is set). */
  asYears: boolean
}

const AMOUNT_MIN_CENTS = 100_000 // 1,000.00
const AMOUNT_MAX_CENTS = 100_000_000_000 // 1,000,000,000.00
const RATE_MAX_BPS = 5_000 // 50.00%
const MONTHS_MAX = 480

// D-38: at least a quarter of runs draw from the corner where rounding errors are largest.
const cornerCase = fc.record({
  cents: fc.integer({ min: AMOUNT_MIN_CENTS, max: 2_000_000 }), // 1,000 to 20,000
  bps: fc.integer({ min: 3_000, max: RATE_MAX_BPS }), // 30% to 50%
  months: fc.integer({ min: 300, max: MONTHS_MAX }),
  asYears: fc.boolean(),
})

// Every exact bound (and each combination of bounds) appears.
const boundCase = fc.record({
  cents: fc.constantFrom(AMOUNT_MIN_CENTS, AMOUNT_MAX_CENTS),
  bps: fc.constantFrom(0, RATE_MAX_BPS),
  months: fc.constantFrom(1, MONTHS_MAX),
  asYears: fc.boolean(),
})

const wideCase = fc.record({
  cents: fc.oneof(
    fc.integer({ min: AMOUNT_MIN_CENTS, max: AMOUNT_MAX_CENTS }),
    fc.integer({ min: AMOUNT_MIN_CENTS, max: 100_000_000 }),
  ),
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
  { weight: 4, arbitrary: wideCase },
)

/** Years-based cases: whole numbers of years, 1 to 40, same corner bias. */
const yearsCaseArb = fc.oneof(
  {
    weight: 3,
    arbitrary: fc.record({
      cents: fc.integer({ min: AMOUNT_MIN_CENTS, max: 2_000_000 }),
      bps: fc.integer({ min: 3_000, max: RATE_MAX_BPS }),
      years: fc.integer({ min: 25, max: 40 }),
    }),
  },
  {
    weight: 1,
    arbitrary: fc.record({
      cents: fc.constantFrom(AMOUNT_MIN_CENTS, AMOUNT_MAX_CENTS),
      bps: fc.constantFrom(0, RATE_MAX_BPS),
      years: fc.constantFrom(1, 40),
    }),
  },
  {
    weight: 4,
    arbitrary: fc.record({
      cents: fc.integer({ min: AMOUNT_MIN_CENTS, max: AMOUNT_MAX_CENTS }),
      bps: fc.integer({ min: 0, max: RATE_MAX_BPS }),
      years: fc.integer({ min: 1, max: 40 }),
    }),
  },
)

function twoDp(units: number): string {
  const whole = Math.floor(units / 100)
  const frac = String(units % 100).padStart(2, '0')
  return `${whole}.${frac}`
}

function amountText(c: Case | { cents: number }): string {
  return twoDp(c.cents)
}

function rateText(c: { bps: number }): string
… [10,116 more characters not shown; see raw/]
```

  Result:
```
File created successfully at: C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\loan.property.test.ts (file state is current in your context — no need to Read it back)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; grep -n "^// Each checker\|^const params" src/domain/loan.property.test.ts
```

  Result:
```
139:// Each checker throws a descriptive error on the first violation.
236:const params = { numRuns: RUNS, seed: SEED, verbose: false } as const
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; f=src/domain/loan.property.test.ts
cat > $TEMP/checkers.ts <<'EOF'
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
    check(r.payment.eq(r.interest.plus(r.principal)), () => `${describeCase(c)} month ${r.month}: payment != interest + principal`)
    const expected = opening.mul(rate(c)).div(1200).toDecimalPlaces(2, HALF_UP)
    check(
      r.interest.eq(expected),
      () => `${describeCase(c)} month ${r.month}: interest ${r.interest.toFixed(2)} vs ${expected.toFixed(2)}`,
    )
    opening = r.balance
  }
}

function checkBalanceChain(c: Case): void {
  const loan = loanFor(c)
  let opening = principalAmount(c)
  for (const r of loan.rows) {
    const where = () => `${describeCase(c)} month ${r.month}`
    check(r.principal.gte(0), () => `${where()}: principal < 0`)
    check(r.principal.lte(opening), () => `${where()}: principal > opening ${opening.toFixed(2)}`)
    check(r.balance.gte(0), () => `${where()}: balance < 0`)
    check(r.balance.eq(opening.minus(r.principal)), () => `${where()}: balance != previous - principal`)
    check(
      r.payment.decimalPlaces() <= 2 &&
        r.interest.decimalPlaces() <= 2 &&
        r.principal.decimalPlaces() <= 2 &&
        r.balance.decimalPlaces() <= 2,
      () => `${where()}: more than 2 decimal places`,
    )
    opening = r.balance
  }
}

function checkFinalBalance(c: Case): void {
  const loan = loanFor(c)
  const last = loan.rows[loan.rows.length - 1]
  check(last.balance.isZero(), () => `${describeCase(c)}: final balance ${last.balance.toFixed(2)}`)
  check(sum(loan.rows.map((r) => r.principal)).eq(principalAmount(c)), () => `${describeCase(c)}: principal does not sum to P`)
}

function checkPaymentsNearHeadline(c: Case): void {
  const loan = loanFor(c)
  const first = loan.rows[0].payment
  check(loan.mon
… [2,572 more characters not shown; see raw/]
```

  Result:
```
C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\loan.property.test.ts
  2:31  error  'expect' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)

src/domain/loan.property.test.ts(256,24): error TS18048: 'm' is possibly 'undefined'.
src/domain/loan.property.test.ts(257,22): error TS18048: 'm' is possibly 'undefined'.
src/domain/loan.test.ts(144,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(145,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(178,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(179,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(185,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(191,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(192,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(224,35): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(271,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(272,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(287,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(288,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(294,12): error TS2532: Object is possibly 'undefined'.
test/helpers.ts(37,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(38,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(39,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(40,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(41,5): error TS18048: 'r' is possibly 'undefined'.
[This command modified 3 files you've previously read: src\domain\loan.property.test.ts, src\domain\parse.test.ts, src\domain\format.test.ts. Call Read before editing.]
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator
python3 - <<'EOF'
import re
p='test/helpers.ts'
s=open(p,encoding='utf8').read()
s=s.replace("import type { CalculatedLoan, LoanInput, RawInputs, Unit }","import type { CalculatedLoan, LoanInput, RawInputs, ScheduleRow, Unit }")
s=s.replace("""export function rowText(loan: CalculatedLoan, index: number): string {
  const r = loan.rows[index]""","""export function rowAt(loan: CalculatedLoan, index: number): ScheduleRow {
  const r = loan.rows[index]
  if (!r) throw new Error(`no schedule row at index ${index} (have ${loan.rows.length})`)
  return r
}

export function rowText(loan: CalculatedLoan, index: number): string {
  const r = rowAt(loan, index)""")
open(p,'w',encoding='utf8').write(s)
p='src/domain/loan.test.ts'
s=open(p,encoding='utf8').read()
s=re.sub(r'(\w+)\.rows\[(\d+)\]',r'rowAt(\1, \2)',s)
s=s.replace("import { calc, inputOf, rowText }","import { calc, inputOf, rowAt, rowText }")
open(p,'w',encoding='utf8').write(s)
p='src/domain/loan.property.test.ts'
s=open(p,encoding='utf8').read()
s=s.replace("import { beforeAll, describe, expect, it }","import { beforeAll, describe, it }")
s=s.replace("loan.rows[0].payment","rowAt(loan, 0).payment").replace("const m = asMonths.rows[i]","const m = rowAt(asMonths, i)")
s=s.replace("const last = loan.rows[loan.rows.length - 1]","const last = rowAt(loan, loan.rows.length - 1)")
s=s.replace("import type { CalculatedLoan","import { rowAt } from '../../test/helpers'\nimport type { CalculatedLoan")
open(p,'w',encoding='utf8').write(s)
EOF
npx prettier --write src/domain/*.test.ts test/*.ts >/dev/null; npx eslint src/domain/*.test.ts test --max-warnings 0; npm run typecheck 2>&1 | tail -20
```

  Result:
```
Python was not found; run without arguments to install from the Microsoft Store, or disable this shortcut from Settings > Apps > Advanced app settings > App execution aliases.

C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\src\domain\loan.property.test.ts
  2:31  error  'expect' is defined but never used. Allowed unused vars must match /^_/u  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)

src/domain/loan.property.test.ts(256,24): error TS18048: 'm' is possibly 'undefined'.
src/domain/loan.property.test.ts(257,22): error TS18048: 'm' is possibly 'undefined'.
src/domain/loan.test.ts(144,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(145,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(178,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(179,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(185,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(191,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(192,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(224,35): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(271,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(272,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(287,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(288,12): error TS2532: Object is possibly 'undefined'.
src/domain/loan.test.ts(294,12): error TS2532: Object is possibly 'undefined'.
test/helpers.ts(37,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(38,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(39,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(40,5): error TS18048: 'r' is possibly 'undefined'.
test/helpers.ts(41,5): error TS18048: 'r' is possibly 'undefined'.
```

</details>

### 🤖 Claude · 2026-10-17 22:35 PKT

No python. Use node for the same edit.

<details><summary>🔧 1 tool call(s): Bash</summary>

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator
cat > $TEMP/fix.mjs <<'EOF'
import fs from 'node:fs'
const rw=(p,f)=>fs.writeFileSync(p,f(fs.readFileSync(p,'utf8')))
rw('test/helpers.ts',s=>s.replace("import type { CalculatedLoan, LoanInput, RawInputs, Unit }","import type { CalculatedLoan, LoanInput, RawInputs, ScheduleRow, Unit }").replace(/export function rowText\(loan: CalculatedLoan, index: number\): string \{\s*const r = loan.rows\[index\]/,`export function rowAt(loan: CalculatedLoan, index: number): ScheduleRow {
  const r = loan.rows[index]
  if (!r) throw new Error(\`no schedule row at index \${index} (have \${loan.rows.length})\`)
  return r
}

export function rowText(loan: CalculatedLoan, index: number): string {
  const r = rowAt(loan, index)`))
rw('src/domain/loan.test.ts',s=>s.replace(/(\w+)\.rows\[(\d+)\]/g,'rowAt($1, $2)').replace("import { calc, inputOf, rowText }","import { calc, inputOf, rowAt, rowText }"))
rw('src/domain/loan.property.test.ts',s=>s.replace("import { beforeAll, describe, expect, it }","import { beforeAll, describe, it }").replace("loan.rows[0].payment","rowAt(loan, 0).payment").replace("const m = asMonths.rows[i]","const m = rowAt(asMonths, i)").replace("const last = loan.rows[loan.rows.length - 1]","const last = rowAt(loan, loan.rows.length - 1)").replace("import type { CalculatedLoan","import { rowAt } from '../../test/helpers'\nimport type { CalculatedLoan"))
EOF
node $TEMP/fix.mjs
npx prettier --write src/domain/*.test.ts test/*.ts >/dev/null; npx eslint src/domain/*.test.ts test --max-warnings 0; npm run typecheck 2>&1 | tail -20
```

  Result:
```
> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b
[This command modified 2 files you've previously read: src\domain\loan.property.test.ts, src\domain\loan.test.ts. Call Read before editing.]
```

</details>

### 🤖 Claude · 2026-10-17 22:35 PKT

Clean. Run the suite.

<details><summary>🔧 5 tool call(s): Bash ×4, SubagentHandback</summary>

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; npx vitest run --project domain --reporter=json --outputFile=$TEMP/r.json >/dev/null 2>&1; node -e "
const r=JSON.parse(require('fs').readFileSync(process.env.TEMP+'/r.json','utf8'));
console.log(r.numTotalTests,r.numPassedTests,r.numFailedTests);
const bad={};let passed=[];
for(const f of r.testResults)for(const t of f.assertionResults){ if(t.status==='passed')passed.push(t.fullName); else {const m=(t.failureMessages[0]||'').split('\n')[0]; bad[m]=(bad[m]||0)+1}}
console.log(bad);console.log(passed.join('\n'))"; npx vitest run --project domain 2>&1 | tail -8
```

  Result:
```
294 2 292
{
  'Error: NOT_IMPLEMENTED': 285,
  'Error: Property failed after 1 tests': 7
}
time zone [SPEC-§12.1] the Asia/Karachi zone is applied on every OS (15:45 UTC is 20:45 local)
configured Decimal [SPEC-§3.1.1] has precision 40 and ROUND_HALF_UP


 Test Files  6 failed | 1 passed (7)
      Tests  292 failed | 2 passed (294)
   Start at  22:36:05
   Duration  3.25s (transform 49%, import 44%, tests 6%, worker 1%)

JSON report written to C:/Users/arslan.NINEALPHA/muhammad-arslan-calculator/reports/vitest.json
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; cat > $TEMP/ref.mjs <<'EOF'
import D from 'decimal.js'
const Dec=D.clone({precision:40,rounding:D.ROUND_HALF_UP})
const r2=x=>x.toDecimalPlaces(2,Dec.ROUND_HALF_UP)
function emi(B,r,m){ if(r.isZero())return B.div(m); const p=r.plus(1).pow(m); return B.mul(r).mul(p).div(p.minus(1)) }
function run(a,rate,n){const P=new Dec(a),R=new Dec(rate);const r=R.div(1200);let b=P;const rows=[];let ti=new Dec(0),tp=new Dec(0)
for(let k=1;k<=n;k++){const i=r2(b.mul(R).div(1200));let pay,pr;if(k<n){pay=r2(emi(b,r,n-k+1));pr=pay.minus(i)}else{pr=b;pay=pr.plus(i)}b=b.minus(pr);rows.push([k,pay,i,pr,b]);ti=ti.plus(i);tp=tp.plus(pay)}
return {head:rows[0][1].toFixed(2),ti:ti.toFixed(2),tp:tp.toFixed(2),rows}}
for(const [a,r,n] of [['1000000',12,12],['2500000',18,60],['120000',0,12],['100000',10,1],['1000',0.01,1],['1000000000',50,480],['1000',0,3],['10000',36,359],['10000.82',30,360]]){const x=run(a,r,n);console.log(a,r,n,x.head,x.ti,x.tp,x.rows.length,x.rows.at(-1)[4].toFixed(2), x.rows.map(r=>r[1].toFixed(2)).slice(0,12).join(','))}
const A=run('1000000',12,12);console.log(A.rows[5][4].toFixed(2),A.rows[11].map(String).join('|'))
EOF
cp $TEMP/ref.mjs ./_ref.mjs; node _ref.mjs; rm _ref.mjs
```

  Result:
```
1000000 12 12 88848.79 66185.45 1066185.45 12 0.00 88848.79,88848.79,88848.79,88848.79,88848.79,88848.79,88848.79,88848.79,88848.78,88848.78,88848.79,88848.78
2500000 18 60 63483.57 1309014.14 3809014.14 60 0.00 63483.57,63483.57,63483.57,63483.57,63483.57,63483.57,63483.57,63483.57,63483.57,63483.57,63483.57,63483.57
120000 0 12 10000.00 0.00 120000.00 12 0.00 10000.00,10000.00,10000.00,10000.00,10000.00,10000.00,10000.00,10000.00,10000.00,10000.00,10000.00,10000.00
100000 10 1 100833.33 833.33 100833.33 1 0.00 100833.33
1000 0.01 1 1000.01 0.01 1000.01 1 0.00 1000.01
1000000000 50 480 41666666.80 19000000061.79 20000000061.79 480 0.00 41666666.80,41666666.80,41666666.80,41666666.80,41666666.80,41666666.79,41666666.79,41666666.80,41666666.79,41666666.80,41666666.80,41666666.79
1000 0 3 333.33 0.00 1000.00 3 0.00 333.33,333.34,333.33
10000 36 359 300.01 97702.03 107702.03 359 0.00 300.01,300.01,300.01,300.01,300.01,300.01,300.01,300.01,300.01,300.01,300.01,300.01
10000.82 30 360 250.05 80019.05 90019.87 360 0.00 250.05,250.06,250.05,250.06,250.06,250.05,250.06,250.06,250.05,250.06,250.05,250.05
514921.05 12|88848.78|879.69|87969.09|0
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; npx vitest run --project domain src/domain/loan.property.test.ts 2>&1 | grep -c "NOT_IMPLEMENTED"; npx prettier --check src/domain/*.test.ts test/*.ts; npx eslint src/domain/*.test.ts test --max-warnings 0 && echo lint-ok; npm run trace 2>&1 | tail -40
```

  Result:
```
13
Checking formatting...
All matched files use Prettier code style!
lint-ok

> muhammad-arslan-calculator@0.0.0 trace
> node scripts/trace.mjs


Traceability: 3 roles, 11 jobs, 19 stories, 100 ACs, 11 test files

Story  Scope    Status           ACs  Tested 
S-1    v1       Not implemented  12   12/12  
S-2    v1       Not implemented  17   17/17  
S-3    v1       Not implemented  6    6/6    
S-4    v1       Not implemented  4    4/4    
S-5    v1       Not implemented  6    6/6    
S-6    v1       Not implemented  6    0/6    
S-7    v1       Not implemented  5    0/5    
S-8    v1       Not implemented  6    0/6    
S-9    v1       Not implemented  3    0/3    
S-10   v1       Not implemented  8    7/8    
S-11   v1       Not implemented  11   2/11   
S-12   v1       Not implemented  7    0/7    
S-13   v1       Not implemented  3    3/3    
S-14   Backlog  Not implemented  1    0/1    
S-15   Backlog  Not implemented  1    0/1    
S-16   Backlog  Not implemented  1    0/1    
S-17   Backlog  Not implemented  1    0/1    
S-18   Backlog  Not implemented  1    0/1    
S-19   Backlog  Not implemented  1    0/1    

FAIL  37 v1 AC(s) have no test: AC-6.1, AC-6.2, AC-6.3, AC-6.4, AC-6.5, AC-6.6, AC-7.1, AC-7.2, AC-7.3, AC-7.4, AC-7.5, AC-8.1, AC-8.2, AC-8.3, AC-8.4, AC-8.5, AC-8.6, AC-9.1, AC-9.2, AC-9.3, AC-10.8, AC-11.1, AC-11.3, AC-11.4, AC-11.5, AC-11.6, AC-11.7, AC-11.8, AC-11.9, AC-11.10, AC-12.1, AC-12.2, AC-12.3, AC-12.4, AC-12.5, AC-12.6, AC-12.7

trace: 1 error(s)
```

- **Bash**

```bash
cd /c/Users/arslan.NINEALPHA/muhammad-arslan-calculator; for f in src/domain/*.test.ts test/*.test.ts; do echo "$f $(grep -c "^\s*it\(\.each\)\?(" $f)"; done; npx vitest run --project domain 2>&1 | grep -E "Test Files|Tests "
```

  Result:
```
src/domain/format.test.ts 18
src/domain/loan.property.test.ts 10
src/domain/loan.test.ts 47
src/domain/money.test.ts 8
src/domain/parse.test.ts 5
src/domain/validate.test.ts 46
test/timezone.test.ts 1
⎯⎯⎯⎯⎯⎯ Failed Tests 292 ⎯⎯⎯⎯⎯⎯
 Test Files  6 failed | 1 passed (7)
      Tests  292 failed | 2 passed (294)
```

- **SubagentHandback**

```json
{
 "message": "Domain tests are written and red for the right reason. `npx vitest run --project domain` ends with: Test Files 6 failed | 1 passed (7); Tests 292 failed | 2 passed (294). 285 failures are `Error: NOT_IMPLEMENTED` thrown directly. The 7 fast-check properties fail as \"Property failed after 1 tests\" with NOT_IMPLEMENTED as the cause. There are no import, type or syntax errors.\n\nMy files pass `npx eslint ... --max-warnings 0` and `npx prettier --check`. `npm run typecheck` is clean for the whole repo as it stands.\n\nI did not run the property tests or the checkers against a real implementation, because none exists yet. I checked the hard-coded figures with a throwaway script in the temp dir (since deleted) that implements spec §5.2 with decimal.js. It reproduced:\n- All reference loans: L-A to L-D, L-MIN, L-MAX and L-Z3 (headline, total interest, total payable).\n- L-A rows 6 and 12, and the 88,848.78 payments in rows 9, 10 and 12.\n- Both SPEC-§5.3 regression loans: 300.01 over 359 rows and 250.05 over 360 rows, each ending at 0.00.\n\n**Files**\n- `src/domain/parse.test.ts`\n- `src/domain/validate.test.ts`\n- `src/domain/money.test.ts`\n- `src/domain/format.test.ts`\n- `src/domain/loan.test.ts`\n- `src/domain/loan.property.test.ts`\n- `test/timezone.test.ts`\n- `test/helpers.ts`: shared helper, not a test file. `inputOf` builds a `LoanInput` only through `validateInputs`; `rowAt` and `rowText` read schedule rows.\n\n**Tests by file**\nThese are `it`/`it.each
… [4,665 more characters not shown; see raw/]
```

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

