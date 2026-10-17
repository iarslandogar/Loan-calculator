// Raw string → normalised string (spec §4.1).

const WESTERN_GROUPING = /^\d{1,3}(,\d{3})+$/
const LAKH_GROUPING = /^\d{1,2}(,\d{2})*,\d{3}$/

/**
 * Trims, then removes commas only when they form valid western (1,000,000) or lakh
 * (10,00,000) grouping in the whole-number part (D-26). Otherwise the commas stay, so the
 * value fails the number pattern as "not a number".
 */
export function normaliseAmount(raw: string): string {
  const text = raw.trim()
  if (!text.includes(',')) return text

  const sign = text.startsWith('-') ? '-' : ''
  const unsigned = text.slice(sign.length)
  const dot = unsigned.indexOf('.')
  const whole = dot === -1 ? unsigned : unsigned.slice(0, dot)
  const fraction = dot === -1 ? '' : unsigned.slice(dot)

  if (fraction.includes(',')) return text
  if (!WESTERN_GROUPING.test(whole) && !LAKH_GROUPING.test(whole)) return text
  return sign + whole.replace(/,/g, '') + fraction
}

/** Trims, removes one trailing %, trims again. */
export function normaliseRate(raw: string): string {
  const text = raw.trim()
  return text.endsWith('%') ? text.slice(0, -1).trim() : text
}

export function normaliseTenure(raw: string): string {
  return raw.trim()
}
