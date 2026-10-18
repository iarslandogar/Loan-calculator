// Loan summaries for the visuals (spec §3.1.1, D-65). Stubs until the G3b tests are approved.
import type { Decimal } from './money'
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

/** interestPercent = 100 × totalInterest / totalPayable, half-up to 1 dp; loanPercent = 100 − it. */
export function costSplit(_loan: CalculatedLoan): {
  interestPercent: Decimal
  loanPercent: Decimal
} {
  throw new Error('NOT_IMPLEMENTED')
}

/** 100 × interest / payment, half-up to 1 dp. */
export function interestShare(_payment: Decimal, _interest: Decimal): Decimal {
  throw new Error('NOT_IMPLEMENTED')
}

/** Groups of 12 schedule rows (the last shorter if needed), with exact sums. */
export function yearlySummary(_loan: CalculatedLoan): YearRow[] {
  throw new Error('NOT_IMPLEMENTED')
}
