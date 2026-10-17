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
  totalInterest: Decimal
  totalPayable: Decimal
  showRoundingNote: boolean
  rows: ScheduleRow[]
}
