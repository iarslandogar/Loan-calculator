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
