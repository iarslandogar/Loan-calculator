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

function rateText(c: { bps: number }): string {
  return twoDp(c.bps)
}

function describeCase(c: Case): string {
  return `amount=${amountText(c)} rate=${rateText(c)} months=${c.months} asYears=${c.asYears}`
}

/** Per-file cache: identical seeds produce identical cases, so each loan is computed once. */
const cache = new Map<string, CalculatedLoan>()

function loanFor(c: Case): CalculatedLoan {
  const useYears = c.asYears && c.months % 12 === 0
  const unit: Unit = useYears ? 'years' : 'months'
  const key = `${c.cents}|${c.bps}|${unit}|${useYears ? c.months / 12 : c.months}`
  const cached = cache.get(key)
  if (cached) return cached
  const result = validateInputs({
    amount: amountText(c),
    rate: rateText(c),
    tenure: String(useYears ? c.months / 12 : c.months),
    unit,
  })
  if (!result.ok) {
    throw new Error(
      `generator produced invalid input: ${describeCase(c)} ${JSON.stringify(result.errors)}`,
    )
  }
  const loan = calculateLoan(result.value)
  cache.set(key, loan)
  return loan
}

const HALF_UP = Decimal.ROUND_HALF_UP
const CENT = new Decimal('0.01')
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
      r.interest.eq(expected),
      () =>
        `${describeCase(c)} month ${r.month}: interest ${r.interest.toFixed(2)} vs ${expected.toFixed(2)}`,
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
    check(
      r.balance.eq(opening.minus(r.principal)),
      () => `${where()}: balance != previous - principal`,
    )
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
  const last = rowAt(loan, loan.rows.length - 1)
  check(last.balance.isZero(), () => `${describeCase(c)}: final balance ${last.balance.toFixed(2)}`)
  check(
    sum(loan.rows.map((r) => r.principal)).eq(principalAmount(c)),
    () => `${describeCase(c)}: principal does not sum to P`,
  )
}

function checkPaymentsNearHeadline(c: Case): void {
  const loan = loanFor(c)
  const first = rowAt(loan, 0).payment
  check(loan.monthlyPayment.eq(first), () => `${describeCase(c)}: headline != payment_1`)
  for (const r of loan.rows) {
    check(
      r.payment.minus(first).abs().lte(CENT),
      () =>
        `${describeCase(c)} month ${r.month}: payment ${r.payment.toFixed(2)} vs headline ${first.toFixed(2)}`,
    )
  }
  const differs = loan.rows.some((r) => !r.payment.eq(first))
  check(
    loan.showRoundingNote === differs,
    () => `${describeCase(c)}: showRoundingNote ${loan.showRoundingNote}, expected ${differs}`,
  )
}

function checkTotals(c: Case): void {
  const loan = loanFor(c)
  check(
    loan.totalInterest.eq(sum(loan.rows.map((r) => r.interest))),
    () => `${describeCase(c)}: total interest != sum of Interest`,
  )
  check(
    loan.totalPayable.eq(sum(loan.rows.map((r) => r.payment))),
    () => `${describeCase(c)}: total payable != sum of Payment`,
  )
  check(
    loan.totalPayable.eq(principalAmount(c).plus(loan.totalInterest)),
    () => `${describeCase(c)}: total payable != P + total interest`,
  )
}

function checkYearsEqualMonths(y: { cents: number; bps: number; years: number }): void {
  const base = { cents: y.cents, bps: y.bps }
  const asYears = loanFor({ ...base, months: y.years * 12, asYears: true })
  const asMonths = loanFor({ ...base, months: y.years * 12, asYears: false })
  const label = `amount=${twoDp(y.cents)} rate=${twoDp(y.bps)} years=${y.years}`
  check(
    asYears.input.unit === 'years' && asMonths.input.unit === 'months',
    () => `${label}: units not as intended`,
  )
  check(asYears.rows.length === asMonths.rows.length, () => `${label}: row counts differ`)
  asYears.rows.forEach((r, i) => {
    const m = rowAt(asMonths, i)
    check(
      r.month === m.month &&
        r.payment.eq(m.payment) &&
        r.interest.eq(m.interest) &&
        r.principal.eq(m.principal) &&
        r.balance.eq(m.balance),
      () => `${label}: row ${r.month} differs between years and months`,
    )
  })
  check(
    asYears.monthlyPayment.eq(asMonths.monthlyPayment) &&
      asYears.totalInterest.eq(asMonths.totalInterest) &&
      asYears.totalPayable.eq(asMonths.totalPayable),
    () => `${label}: totals differ`,
  )
  check(
    asYears.showRoundingNote === asMonths.showRoundingNote,
    () => `${label}: rounding note differs`,
  )
}

const params = { numRuns: RUNS, seed: SEED, verbose: false } as const

beforeAll(() => {
  console.log(`fast-check seed: ${SEED}, runs per property: ${RUNS}`)
})

describe('property tests over the full valid input domain', () => {
  it(
    '[AC-13.3][SPEC-§5.4] invariant 1: the schedule has exactly as many rows as months, numbered 1..n',
    () => {
      fc.assert(fc.property(caseArb, checkRowCount), params)
    },
    TIMEOUT,
  )

  it(
    '[AC-10.4][SPEC-§5.4] invariants 2 and 3: payment = interest + principal; interest = round2(opening x rate / 1200)',
    () => {
      fc.assert(fc.property(caseArb, checkPaymentSplit), params)
    },
    TIMEOUT,
  )

  it(
    '[AC-13.3][SPEC-§5.4] invariant 4: 0 <= principal <= opening, balance >= 0, balance = previous - principal, all at most 2 dp',
    () => {
      fc.assert(fc.property(caseArb, checkBalanceChain), params)
    },
    TIMEOUT,
  )

  it(
    '[AC-13.3][SPEC-§5.4] invariant 5: final balance is exactly 0.00 and the principal column sums to P',
    () => {
      fc.assert(fc.property(caseArb, checkFinalBalance), params)
    },
    TIMEOUT,
  )

  it(
    '[AC-10.5][SPEC-§5.4] invariant 6: every payment is within 0.01 of the monthly payment; the rounding note flag matches',
    () => {
      fc.assert(fc.property(caseArb, checkPaymentsNearHeadline), params)
    },
    TIMEOUT,
  )

  it(
    '[AC-3.6][SPEC-§5.4] invariant 7: payable = P + interest; interest = sum(Interest column); payable = sum(Payment column)',
    () => {
      fc.assert(fc.property(caseArb, checkTotals), params)
    },
    TIMEOUT,
  )

  it(
    '[SPEC-§5.4] invariant 8: the same tenure entered as years or as months gives identical rows, totals and note',
    () => {
      fc.assert(fc.property(yearsCaseArb, checkYearsEqualMonths), params)
    },
    TIMEOUT,
  )
})

describe('deterministic corners and reference loans', () => {
  const bounds: Case[] = []
  for (const cents of [AMOUNT_MIN_CENTS, AMOUNT_MAX_CENTS]) {
    for (const bps of [0, 1, RATE_MAX_BPS]) {
      for (const months of [1, 2, 12, 480]) {
        bounds.push({ cents, bps, months, asYears: false })
      }
    }
  }

  // Reference loans from the user-stories table, as integer cents / bps / months.
  const references: Case[] = [
    { cents: 100_000_000, bps: 1200, months: 12, asYears: true }, // L-A
    { cents: 250_000_000, bps: 1800, months: 60, asYears: true }, // L-B
    { cents: 12_000_000, bps: 0, months: 12, asYears: false }, // L-C
    { cents: 10_000_000, bps: 1000, months: 1, asYears: false }, // L-D
    { cents: 100_000, bps: 1, months: 1, asYears: false }, // L-MIN
    { cents: 100_000_000_000, bps: 5000, months: 480, asYears: true }, // L-MAX
    { cents: 100_000, bps: 0, months: 3, asYears: false }, // L-Z3
    { cents: 1_000_000, bps: 3600, months: 359, asYears: false }, // SPEC-5.3 regression 1
    { cents: 1_000_082, bps: 3000, months: 360, asYears: false }, // SPEC-5.3 regression 2
  ]

  it(
    '[AC-3.6][AC-10.4][AC-10.5][AC-13.3][SPEC-§5.4] all eight bound corners (and nearby) satisfy invariants 1 to 7',
    () => {
      for (const c of bounds) {
        checkRowCount(c)
        checkPaymentSplit(c)
        checkBalanceChain(c)
        checkFinalBalance(c)
        checkPaymentsNearHeadline(c)
        checkTotals(c)
      }
    },
    TIMEOUT,
  )

  it(
    '[AC-3.6][AC-10.4][AC-10.5][AC-13.3][SPEC-§5.4] every reference loan (and both SPEC-§5.3 regressions) satisfies invariants 1 to 7',
    () => {
      for (const c of references) {
        checkRowCount(c)
        checkPaymentSplit(c)
        checkBalanceChain(c)
        checkFinalBalance(c)
        checkPaymentsNearHeadline(c)
        checkTotals(c)
      }
    },
    TIMEOUT,
  )

  it(
    '[SPEC-§5.4] invariant 8 holds at the tenure bounds (1 year and 40 years) and for the reference loans in whole years',
    () => {
      checkYearsEqualMonths({ cents: AMOUNT_MIN_CENTS, bps: RATE_MAX_BPS, years: 40 })
      checkYearsEqualMonths({ cents: AMOUNT_MAX_CENTS, bps: 0, years: 1 })
      checkYearsEqualMonths({ cents: 100_000_000, bps: 1200, years: 1 })
      checkYearsEqualMonths({ cents: 250_000_000, bps: 1800, years: 5 })
    },
    TIMEOUT,
  )
})
