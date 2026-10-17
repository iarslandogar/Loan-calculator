// Field rules → typed result or error codes (spec §4.2). Never throws on user input.
import { Decimal } from './money'
import { normaliseAmount, normaliseRate, normaliseTenure } from './parse'
import type { ErrorCode, Field, RawInputs, ValidationResult } from './types'

// `\d` is ASCII 0-9 only in JS regular expressions, so other digit scripts are "not a number".
const NUMBER = /^-?(\d+(\.\d*)?|\.\d+)$/
const WHOLE_NUMBER = /^-?\d+$/

const AMOUNT_MIN = new Decimal(1000)
const AMOUNT_MAX = new Decimal(1_000_000_000)
const RATE_MIN = new Decimal(0)
const RATE_MAX = new Decimal(50)
const TENURE_MAX = { years: new Decimal(40), months: new Decimal(480) } as const

type FieldResult<T> = { ok: true; value: T } | { ok: false; error: ErrorCode }

function decimalPlaces(text: string): number {
  const dot = text.indexOf('.')
  return dot === -1 ? 0 : text.length - dot - 1
}

/** Shared rules for amount and rate: empty → format → precision → range. */
function checkDecimal(
  text: string,
  min: Decimal,
  max: Decimal,
  codes: { required: ErrorCode; nan: ErrorCode; decimals: ErrorCode; range: ErrorCode },
): FieldResult<Decimal> {
  if (text === '') return { ok: false, error: codes.required }
  if (!NUMBER.test(text)) return { ok: false, error: codes.nan }
  if (decimalPlaces(text) > 2) return { ok: false, error: codes.decimals }
  const value = new Decimal(text)
  if (value.lt(min) || value.gt(max)) return { ok: false, error: codes.range }
  // Normalise -0 to 0 so it never leaks into calculations or canonical text.
  return { ok: true, value: value.isZero() ? new Decimal(0) : value }
}

function checkTenure(text: string, unit: RawInputs['unit']): FieldResult<number> {
  if (text === '') return { ok: false, error: 'TENURE_REQUIRED' }
  if (!WHOLE_NUMBER.test(text)) return { ok: false, error: 'TENURE_WHOLE' }
  // Compare as Decimal so 40-digit input is judged correctly before any conversion.
  const value = new Decimal(text)
  if (value.lt(1) || value.gt(TENURE_MAX[unit])) {
    return { ok: false, error: unit === 'years' ? 'TENURE_RANGE_YEARS' : 'TENURE_RANGE_MONTHS' }
  }
  // Safe only because the range check above has already bounded the value to 1..480.
  return { ok: true, value: value.toNumber() }
}

export function validateInputs(raw: RawInputs): ValidationResult {
  const amount = checkDecimal(normaliseAmount(raw.amount), AMOUNT_MIN, AMOUNT_MAX, {
    required: 'AMOUNT_REQUIRED',
    nan: 'AMOUNT_NAN',
    decimals: 'AMOUNT_DECIMALS',
    range: 'AMOUNT_RANGE',
  })
  const rate = checkDecimal(normaliseRate(raw.rate), RATE_MIN, RATE_MAX, {
    required: 'RATE_REQUIRED',
    nan: 'RATE_NAN',
    decimals: 'RATE_DECIMALS',
    range: 'RATE_RANGE',
  })
  const tenure = checkTenure(normaliseTenure(raw.tenure), raw.unit)

  if (amount.ok && rate.ok && tenure.ok) {
    return {
      ok: true,
      value: {
        amount: amount.value,
        annualRate: rate.value,
        tenure: tenure.value,
        unit: raw.unit,
        months: raw.unit === 'years' ? tenure.value * 12 : tenure.value,
      },
    }
  }

  const errors: Partial<Record<Field, ErrorCode>> = {}
  if (!amount.ok) errors.amount = amount.error
  if (!rate.ok) errors.rate = rate.error
  if (!tenure.ok) errors.tenure = tenure.error
  return { ok: false, errors }
}
