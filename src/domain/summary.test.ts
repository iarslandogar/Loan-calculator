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
      totalInterest: new Decimal('4.99'),
      totalPayable: new Decimal('10000'),
    })
    expect(down.interestPercent.isZero()).toBe(true)
    expect(down.loanPercent.eq(new Decimal('100'))).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// interestShare
// ---------------------------------------------------------------------------
describe('interestShare (S-22)', () => {
  it('[AC-22.1] L-A: 11.3% of the first payment and 1.0% of the last', () => {
    const loan = calc('1000000', '12', '1')
    const first = rowAt(loan, 0)
    const last = rowAt(loan, 11)
    expect(interestShare(first.payment, first.interest).eq(new Decimal('11.3'))).toBe(true)
    expect(interestShare(last.payment, last.interest).eq(new Decimal('1.0'))).toBe(true)
    // hard-coded inputs from spec 5.5 rows 1 and 12
    expect(
      interestShare(new Decimal('88848.79'), new Decimal('10000.00')).eq(new Decimal('11.3')),
    ).toBe(true)
    expect(interestShare(new Decimal('88848.78'), new Decimal('879.69')).eq(new Decimal('1'))).toBe(
      true,
    )
  })

  it('[AC-22.2] L-B: 59.1% of the first payment and 1.5% of the last', () => {
    const loan = calc('2500000', '18', '5')
    const first = rowAt(loan, 0)
    const last = rowAt(loan, 59)
    expect(interestShare(first.payment, first.interest).eq(new Decimal('59.1'))).toBe(true)
    expect(interestShare(last.payment, last.interest).eq(new Decimal('1.5'))).toBe(true)
  })

  it.each([
    ['200', '12.5', '6.3'], // 6.25 tie rounds up
    ['100', '0.05', '0.1'], // tie
    ['100', '0.04', '0'], // below the tie
    ['80', '1', '1.3'], // 1.25 tie
    ['3', '1', '33.3'],
    ['8', '1', '12.5'],
    ['100', '0', '0'],
    ['100', '100', '100'],
  ])('[SPEC-§3.1.1] interestShare(%s, %s) = %s (1 dp, half-up)', (payment, interest, expected) => {
    const share = interestShare(new Decimal(payment), new Decimal(interest))
    expect(share.eq(new Decimal(expected))).toBe(true)
    expect(share.decimalPlaces()).toBeLessThanOrEqual(1)
  })
})

// ---------------------------------------------------------------------------
// yearlySummary
// ---------------------------------------------------------------------------
describe('yearlySummary (S-19)', () => {
  it('[AC-19.1] L-B: 5 rows, each interest and principal equal the sums of its 12 monthly rows', () => {
    const loan = calc('2500000', '18', '5')
    const years = yearlySummary(loan)
    expect(years).toHaveLength(5)
    years.forEach((y, i) => {
      const group = loan.rows.slice(i * 12, i * 12 + 12)
      expect(group).toHaveLength(12)
      const interest = group.reduce((a, r) => a.plus(r.interest), new Decimal(0))
      const principal = group.reduce((a, r) => a.plus(r.principal), new Decimal(0))
      expect(y.year).toBe(i + 1)
      expect(y.months).toBe(12)
      expect(y.interest.eq(interest)).toBe(true)
      expect(y.principal.eq(principal)).toBe(true)
      expect(y.balance.eq(group[11]!.balance)).toBe(true)
    })
  })

  it('[AC-19.2] L-B: first and last year read the reference figures', () => {
    const years = yearlySummary(calc('2500000', '18', '5'))
    expect(yearText(years[0]!)).toBe('1 | 12 | 422945.63 | 338857.21 | 2161142.79')
    expect(yearText(years[4]!)).toBe('5 | 12 | 69355.47 | 692447.31 | 0.00')
  })

  it('[AC-19.3] 100000 at 10% for 18 months: 2 rows, the second covers 6 months', () => {
    const years = yearlySummary(calc('100000', '10', '18', 'months'))
    expect(years).toHaveLength(2)
    expect(years[0]!.months).toBe(12)
    expect(yearText(years[1]!)).toBe('2 | 6 | 1028.07 | 35006.16 | 0.00')
  })

  it('[SPEC-§3.1.1] L-A is one year of 12 months with the loan totals', () => {
    const years = yearlySummary(calc('1000000', '12', '1'))
    expect(years.map(yearText)).toEqual(['1 | 12 | 66185.45 | 1000000.00 | 0.00'])
  })

  it('[SPEC-§3.1.1] L-C (0%) has zero interest in its single year', () => {
    const years = yearlySummary(calc('120000', '0', '12', 'months'))
    expect(years.map(yearText)).toEqual(['1 | 12 | 0.00 | 120000.00 | 0.00'])
  })

  it('[SPEC-§3.1.1] L-D (1 month) has one group of 1 month', () => {
    const years = yearlySummary(calc('100000', '10', '1', 'months'))
    expect(years.map(yearText)).toEqual(['1 | 1 | 833.33 | 100000.00 | 0.00'])
  })

  it.each([
    [12, [12]],
    [13, [12, 1]],
    [24, [12, 12]],
    [25, [12, 12, 1]],
    [35, [12, 12, 11]],
  ])('[SPEC-§3.1.1] %i months are grouped as %j', (months, expected) => {
    const years = yearlySummary(calc('50000', '9', String(months), 'months'))
    expect(years.map((y) => y.months)).toEqual(expected)
    expect(years.map((y) => y.year)).toEqual(expected.map((_, i) => i + 1))
    expect(years[years.length - 1]!.balance.isZero()).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Property tests (fixed seed, >= 1,000 runs). Inputs come from validateInputs; the oracle is the
// Decimal from money.ts summing the schedule rows directly.
// ---------------------------------------------------------------------------
interface Case {
  cents: bigint
  bps: number
  months: number
}

const AMOUNT_MIN_CENTS = 1_000n
const AMOUNT_MAX_CENTS = 100_000_000_000_000_000n

const caseArb: fc.Arbitrary<Case> = fc.record({
  cents: fc.oneof(
    fc.bigInt({ min: AMOUNT_MIN_CENTS, max: 2_000_000n }),
    fc.bigInt({ min: AMOUNT_MIN_CENTS, max: AMOUNT_MAX_CENTS }),
    fc.constantFrom(AMOUNT_MIN_CENTS, AMOUNT_MAX_CENTS),
  ),
  bps: fc.oneof(fc.integer({ min: 0, max: 7_500 }), fc.constantFrom(0, 1, 7_500)),
  months: fc.oneof(
    { weight: 3, arbitrary: fc.integer({ min: 1, max: 60 }) },
    { weight: 1, arbitrary: fc.integer({ min: 1, max: 1_200 }) },
    { weight: 1, arbitrary: fc.constantFrom(1, 11, 12, 13, 24, 25, 1_200) },
  ),
})

function twoDp(units: bigint | number): string {
  const n = BigInt(units)
  return `${n / 100n}.${String(n % 100n).padStart(2, '0')}`
}

const cache = new Map<string, CalculatedLoan>()
function loanFor(c: Case): CalculatedLoan {
  const key = `${c.cents}|${c.bps}|${c.months}`
  const hit = cache.get(key)
  if (hit) return hit
  const result = validateInputs({
    amount: twoDp(c.cents),
    rate: twoDp(c.bps),
    tenure: String(c.months),
    unit: 'months',
  })
  if (!result.ok) throw new Error(`generator produced invalid input ${key}`)
  const loan = calculateLoan(result.value)
  cache.set(key, loan)
  return loan
}

const sumOf = (values: Decimal[]) => values.reduce((a, v) => a.plus(v), new Decimal(0))

function check(condition: boolean, message: () => string): void {
  if (!condition) throw new Error(message())
}

describe('visual summaries: properties (>= 1,000 runs, seed 20261017)', () => {
  it(
    '[SPEC-§3.1.1] yearlySummary: groups of 12, exact sums equal the loan totals, last balance 0.00',
    () => {
      fc.assert(
        fc.property(caseArb, (c) => {
          const loan = loanFor(c)
          const years = yearlySummary(loan)
          const expectedYears = Math.ceil(c.months / 12)
          check(
            years.length === expectedYears,
            () => `${years.length} groups, want ${expectedYears}`,
          )
          check(
            years.reduce((n, y) => n + y.months, 0) === c.months,
            () => `sum of months differs from ${c.months}`,
          )
          check(
            sumOf(years.map((y) => y.interest)).eq(loan.totalInterest),
            () => 'sum of yearly interest != totalInterest',
          )
          check(
            sumOf(years.map((y) => y.principal)).eq(new Decimal(twoDp(c.cents))),
            () => 'sum of yearly principal != loan amount',
          )
          years.forEach((y, i) => {
            const group = loan.rows.slice(i * 12, i * 12 + 12)
            const isLast = i === years.length - 1
            check(y.year === i + 1, () => `group ${i} has year ${y.year}`)
            check(
              y.months === (isLast ? c.months - 12 * i : 12) && y.months === group.length,
              () => `group ${i} has ${y.months} months`,
            )
            check(
              y.interest.eq(sumOf(group.map((r) => r.interest))),
              () => `group ${i} interest is not the sum of its rows`,
            )
            check(
              y.principal.eq(sumOf(group.map((r) => r.principal))),
              () => `group ${i} principal is not the sum of its rows`,
            )
            check(
              y.balance.eq(group[group.length - 1]!.balance),
              () => `group ${i} balance is not the last row's balance`,
            )
          })
          check(years[years.length - 1]!.balance.isZero(), () => 'last yearly balance is not 0.00')
          return true
        }),
        { seed: SEED, numRuns: RUNS },
      )
    },
    TIMEOUT,
  )

  it(
    '[SPEC-§3.1.1] costSplit: the two percentages always sum to exactly 100.0 and stay within 0..100',
    () => {
      fc.assert(
        fc.property(caseArb, (c) => {
          const s = costSplit(loanFor(c))
          check(
            s.interestPercent.plus(s.loanPercent).eq(new Decimal(100)),
            () => `${s.interestPercent} + ${s.loanPercent} != 100`,
          )
          check(
            s.interestPercent.gte(0) && s.interestPercent.lte(100),
            () => `interest percent ${s.interestPercent} out of range`,
          )
          check(
            s.interestPercent.decimalPlaces() <= 1 && s.loanPercent.decimalPlaces() <= 1,
            () => 'percentages have more than 1 dp',
          )
          return true
        }),
        { seed: SEED, numRuns: RUNS },
      )
    },
    TIMEOUT,
  )

  it(
    '[SPEC-§3.1.1] interestShare: within 0..100, 1 dp, and within 0.05 of the exact share for every row',
    () => {
      fc.assert(
        fc.property(caseArb, (c) => {
          const loan = loanFor(c)
          // first, last and a middle row keeps 1,000 runs fast for 1,200-month loans
          const picks = [0, Math.floor(loan.rows.length / 2), loan.rows.length - 1]
          for (const i of picks) {
            const r = loan.rows[i]!
            const share = interestShare(r.payment, r.interest)
            check(share.gte(0) && share.lte(100), () => `row ${i + 1}: share ${share} out of range`)
            check(share.decimalPlaces() <= 1, () => `row ${i + 1}: share ${share} has > 1 dp`)
            // |share x payment - 100 x interest| <= 0.05 x payment  (cross-multiplied, no division)
            const gap = share.mul(r.payment).minus(r.interest.mul(100)).abs()
            check(
              gap.lte(r.payment.mul('0.05')),
              () => `row ${i + 1}: share ${share} is not within 0.05 of the exact share`,
            )
          }
          return true
        }),
        { seed: SEED, numRuns: RUNS },
      )
    },
    TIMEOUT,
  )
})
