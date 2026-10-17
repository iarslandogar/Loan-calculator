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
