// Rate, tenure, date and canonical-input text for history entries (spec §6).
// Deterministic by design: no Intl, no toLocaleString.
import type { Decimal } from './money'
import type { CanonicalInput, LoanInput, Unit } from './types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Plain decimal text with no grouping, no trailing zeros, no exponent; -0 becomes 0. */
function plainDecimal(value: Decimal): string {
  return value.isZero() ? '0' : value.toFixed()
}

/** "12%", "21.5%", "0.01%", "0%". */
export function formatRate(rate: Decimal): string {
  return `${plainDecimal(rate)}%`
}

/** "1 year", "5 years", "1 month", "12 months". */
export function formatTenure(tenure: number, unit: Unit): string {
  const word = unit === 'years' ? 'year' : 'month'
  return `${tenure} ${word}${tenure === 1 ? '' : 's'}`
}

/** Local time "17 Oct 2026, 20:45". */
export function formatDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const month = MONTHS[date.getMonth()] ?? ''
  return `${date.getDate()} ${month} ${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

/** Never exponent notation; -0 becomes 0. */
export function toCanonical(input: LoanInput): CanonicalInput {
  return {
    amount: plainDecimal(input.amount),
    rate: plainDecimal(input.annualRate),
    tenure: input.tenure,
    unit: input.unit,
  }
}
