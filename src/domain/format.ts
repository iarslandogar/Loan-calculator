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
