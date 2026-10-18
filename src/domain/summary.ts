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
