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
