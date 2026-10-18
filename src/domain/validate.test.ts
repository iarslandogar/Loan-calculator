import { describe, expect, it } from 'vitest'
import { validateInputs } from './validate'
import type { ErrorCode, Field, RawInputs } from './types'

const BASE: RawInputs = { amount: '1000000', rate: '12', tenure: '1', unit: 'years' }

function errorsFor(over: Partial<RawInputs>): Partial<Record<Field, ErrorCode>> {
  const result = validateInputs({ ...BASE, ...over })
  return result.ok ? {} : result.errors
}

function valueFor(over: Partial<RawInputs>) {
  const result = validateInputs({ ...BASE, ...over })
  if (!result.ok) throw new Error(`expected ok, got ${JSON.stringify(result.errors)}`)
  return result.value
}

const NINES = '9'.repeat(40)

describe('validateInputs: successful parse', () => {
  it('[AC-1.1] accepts L-A and derives amount, rate, tenure and months', () => {
    const v = valueFor({})
    expect(v.amount.toFixed(2)).toBe('1000000.00')
    expect(v.annualRate.toFixed(2)).toBe('12.00')
    expect(v.tenure).toBe(1)
    expect(v.unit).toBe('years')
    expect(v.months).toBe(12)
  })

  it('[AC-1.2] months unit: months equals tenure', () => {
    const v = valueFor({ tenure: '12', unit: 'months' })
    expect(v.tenure).toBe(12)
    expect(v.unit).toBe('months')
    expect(v.months).toBe(12)
  })

  it('[AC-1.8] accepts western and lakh grouping in the amount', () => {
    expect(valueFor({ amount: '1,000,000' }).amount.toFixed(2)).toBe('1000000.00')
    expect(valueFor({ amount: '10,00,000' }).amount.toFixed(2)).toBe('1000000.00')
    expect(valueFor({ amount: '1,00,000' }).amount.toFixed(2)).toBe('100000.00')
    expect(valueFor({ amount: '1,000.50' }).amount.toFixed(2)).toBe('1000.50')
  })

  it('[AC-1.9] ignores leading and trailing spaces in all three fields', () => {
    const v = valueFor({ amount: ' 1000000 ', rate: ' 12 ', tenure: ' 1 ' })
    expect(v.amount.toFixed(2)).toBe('1000000.00')
    expect(v.annualRate.toFixed(2)).toBe('12.00')
    expect(v.tenure).toBe(1)
    expect(v.months).toBe(12)
  })

  it('[AC-1.10] accepts a trailing percent sign on the rate', () => {
    expect(valueFor({ rate: '12%' }).annualRate.toFixed(2)).toBe('12.00')
  })

  it('[AC-2.5][AC-2.7][AC-2.10] accepts every exact bound', () => {
    expect(valueFor({ amount: '10' }).amount.toFixed(2)).toBe('10.00')
    expect(valueFor({ amount: '1000000000000000' }).amount.toFixed(2)).toBe('1000000000000000.00')
    expect(valueFor({ rate: '0' }).annualRate.isZero()).toBe(true)
    expect(valueFor({ rate: '75' }).annualRate.toFixed(2)).toBe('75.00')
    expect(valueFor({ rate: '0.01' }).annualRate.toFixed(2)).toBe('0.01')
    expect(valueFor({ tenure: '1', unit: 'years' }).months).toBe(12)
    expect(valueFor({ tenure: '100', unit: 'years' }).months).toBe(1200)
    expect(valueFor({ tenure: '1', unit: 'months' }).months).toBe(1)
    expect(valueFor({ tenure: '1200', unit: 'months' }).months).toBe(1200)
  })
})

describe('validateInputs: error codes', () => {
  it('[AC-2.1] empty form gives the three REQUIRED codes', () => {
    expect(validateInputs({ amount: '', rate: '', tenure: '', unit: 'years' })).toEqual({
      ok: false,
      errors: {
        amount: 'AMOUNT_REQUIRED',
        rate: 'RATE_REQUIRED',
        tenure: 'TENURE_REQUIRED',
      },
    })
  })

  it('[AC-2.1][SPEC-§4.2] whitespace-only fields count as empty', () => {
    expect(errorsFor({ amount: '   ', rate: ' \t ', tenure: '  ' })).toEqual({
      amount: 'AMOUNT_REQUIRED',
      rate: 'RATE_REQUIRED',
      tenure: 'TENURE_REQUIRED',
    })
  })

  it('[AC-2.2] amount abc is AMOUNT_NAN and only the amount fails', () => {
    expect(errorsFor({ amount: 'abc' })).toEqual({ amount: 'AMOUNT_NAN' })
  })

  it('[AC-2.3] amount 1e6 (scientific notation) is AMOUNT_NAN', () => {
    expect(errorsFor({ amount: '1e6' })).toEqual({ amount: 'AMOUNT_NAN' })
  })

  it.each([['0'], ['-500'], ['9.99']])('[AC-2.4] amount %j is AMOUNT_RANGE', (amount) => {
    expect(errorsFor({ amount })).toEqual({ amount: 'AMOUNT_RANGE' })
  })

  it('[AC-2.5] amount 1000000000000000.01 is AMOUNT_RANGE and 1000000000000000 is accepted', () => {
    expect(errorsFor({ amount: '1000000000000000.01' })).toEqual({ amount: 'AMOUNT_RANGE' })
    expect(errorsFor({ amount: '1000000000000000' })).toEqual({})
  })

  it('[AC-2.6] amount 1000.555 is AMOUNT_DECIMALS', () => {
    expect(errorsFor({ amount: '1000.555' })).toEqual({ amount: 'AMOUNT_DECIMALS' })
  })

  it.each([['-1'], ['75.01']])('[AC-2.7] rate %j is RATE_RANGE', (rate) => {
    expect(errorsFor({ rate })).toEqual({ rate: 'RATE_RANGE' })
  })

  it.each([['0'], ['75']])('[AC-2.7] rate %j is accepted', (rate) => {
    expect(errorsFor({ rate })).toEqual({})
  })

  it('[AC-2.8] rate twelve is RATE_NAN and 12.345 is RATE_DECIMALS', () => {
    expect(errorsFor({ rate: 'twelve' })).toEqual({ rate: 'RATE_NAN' })
    expect(errorsFor({ rate: '12.345' })).toEqual({ rate: 'RATE_DECIMALS' })
  })

  it('[AC-2.9] tenure 2.5 in years is TENURE_WHOLE', () => {
    expect(errorsFor({ tenure: '2.5', unit: 'years' })).toEqual({ tenure: 'TENURE_WHOLE' })
  })

  it.each([['0'], ['101']])('[AC-2.10] years tenure %j is TENURE_RANGE_YEARS', (tenure) => {
    expect(errorsFor({ tenure, unit: 'years' })).toEqual({ tenure: 'TENURE_RANGE_YEARS' })
  })

  it.each([['0'], ['1201']])('[AC-2.10] months tenure %j is TENURE_RANGE_MONTHS', (tenure) => {
    expect(errorsFor({ tenure, unit: 'months' })).toEqual({ tenure: 'TENURE_RANGE_MONTHS' })
  })

  it('[AC-2.10] tenure 100 years and 1200 months show no tenure error', () => {
    expect(errorsFor({ tenure: '100', unit: 'years' })).toEqual({})
    expect(errorsFor({ tenure: '1200', unit: 'months' })).toEqual({})
  })

  it('[AC-2.10] 41 is valid in months but 481 is invalid in years (range depends on unit)', () => {
    expect(errorsFor({ tenure: '41', unit: 'months' })).toEqual({})
    expect(errorsFor({ tenure: '481', unit: 'years' })).toEqual({ tenure: 'TENURE_RANGE_YEARS' })
  })

  it('[AC-2.11] invalid amount and invalid rate are reported together, tenure stays valid', () => {
    expect(errorsFor({ amount: 'abc', rate: '99' })).toEqual({
      amount: 'AMOUNT_NAN',
      rate: 'RATE_RANGE',
    })
  })

  it('[AC-2.11] all three fields can fail at once', () => {
    expect(errorsFor({ amount: '5', rate: 'x', tenure: '1.5' })).toEqual({
      amount: 'AMOUNT_RANGE',
      rate: 'RATE_NAN',
      tenure: 'TENURE_WHOLE',
    })
  })

  it('[AC-2.15] 40 nines as the amount is AMOUNT_RANGE, compared exactly, and nothing throws', () => {
    expect(errorsFor({ amount: NINES })).toEqual({ amount: 'AMOUNT_RANGE' })
  })

  it('[AC-2.15] after a 40-nines failure, L-A values validate normally', () => {
    expect(errorsFor({ amount: NINES })).toEqual({ amount: 'AMOUNT_RANGE' })
    expect(validateInputs(BASE).ok).toBe(true)
  })

  it.each([['1,,000'], ['1000,50'], ['1,5'], [',1000'], ['10,0000']])(
    '[AC-2.17] amount %j is AMOUNT_NAN',
    (amount) => {
      expect(errorsFor({ amount })).toEqual({ amount: 'AMOUNT_NAN' })
    },
  )
})

describe('validateInputs: spec §4.2 input table', () => {
  it.each([['10'], ['10.00'], ['1000'], ['00012'], ['1000000000000000']])(
    '[SPEC-§4.2] amount %j is valid',
    (amount) => {
      expect(errorsFor({ amount })).toEqual({})
    },
  )

  it('[SPEC-§4.2] amount 1000.500 is AMOUNT_DECIMALS (trailing zeros count)', () => {
    expect(errorsFor({ amount: '1000.500' })).toEqual({ amount: 'AMOUNT_DECIMALS' })
  })

  it('[SPEC-§4.2] amount 5000000000.555 is AMOUNT_DECIMALS (precision before range)', () => {
    expect(errorsFor({ amount: '5000000000.555' })).toEqual({ amount: 'AMOUNT_DECIMALS' })
  })

  it.each([['.5'], ['9.99'], ['1000000000000000.01']])(
    '[SPEC-§4.2] amount %j is AMOUNT_RANGE',
    (amount) => {
      expect(errorsFor({ amount })).toEqual({ amount: 'AMOUNT_RANGE' })
    },
  )

  it.each([['１２'], ['١٢'], ['1,,000'], ['1000,50']])(
    '[SPEC-§4.2] amount %j is AMOUNT_NAN',
    (amount) => {
      expect(errorsFor({ amount })).toEqual({ amount: 'AMOUNT_NAN' })
    },
  )

  it('[SPEC-§4.2] rate 5. is valid and equals 5', () => {
    expect(valueFor({ rate: '5.' }).annualRate.eq(5)).toBe(true)
  })

  it('[SPEC-§4.2] rate -0 is valid and equals 0', () => {
    expect(valueFor({ rate: '-0' }).annualRate.isZero()).toBe(true)
  })

  it('[SPEC-§4.2] rate "12 %" is valid and equals 12', () => {
    expect(valueFor({ rate: '12 %' }).annualRate.eq(12)).toBe(true)
  })

  it('[SPEC-§4.2] rate % alone is RATE_REQUIRED (empty after normalisation)', () => {
    expect(errorsFor({ rate: '%' })).toEqual({ rate: 'RATE_REQUIRED' })
  })

  it('[SPEC-§4.2] rate 12%% is RATE_NAN', () => {
    expect(errorsFor({ rate: '12%%' })).toEqual({ rate: 'RATE_NAN' })
  })

  it('[SPEC-§4.2] rate of 40 nines is RATE_RANGE', () => {
    expect(errorsFor({ rate: NINES })).toEqual({ rate: 'RATE_RANGE' })
  })

  it('[SPEC-§4.2] tenure 012 in years is valid: 12 years', () => {
    const v = valueFor({ tenure: '012', unit: 'years' })
    expect(v.tenure).toBe(12)
    expect(v.unit).toBe('years')
    expect(v.months).toBe(144)
  })

  it('[SPEC-§4.2] tenure of 40 nines is TENURE_RANGE_YEARS / TENURE_RANGE_MONTHS', () => {
    expect(errorsFor({ tenure: NINES, unit: 'years' })).toEqual({ tenure: 'TENURE_RANGE_YEARS' })
    expect(errorsFor({ tenure: NINES, unit: 'months' })).toEqual({ tenure: 'TENURE_RANGE_MONTHS' })
  })
})

describe('validateInputs: further spec §4.2 rules', () => {
  it.each([
    ['', 'AMOUNT_REQUIRED'],
    ['+5', 'AMOUNT_NAN'],
    ['1.2.3', 'AMOUNT_NAN'],
    ['-', 'AMOUNT_NAN'],
    ['.', 'AMOUNT_NAN'],
    ['1 000', 'AMOUNT_NAN'],
    ['Rs 1000', 'AMOUNT_NAN'],
    ['1000.00.00', 'AMOUNT_NAN'],
    ['-1000', 'AMOUNT_RANGE'],
    ['1000.', undefined],
    ['1000.5', undefined],
    ['1,000.555', 'AMOUNT_DECIMALS'],
    ['0.001', 'AMOUNT_DECIMALS'],
    ['1,00,00,000', undefined],
    ['9.99', 'AMOUNT_RANGE'],
    ['1000000000000000.01', 'AMOUNT_RANGE'],
  ])('[SPEC-§4.2] amount %j -> %s', (amount, code) => {
    expect(errorsFor({ amount })).toEqual(code ? { amount: code } : {})
  })

  it.each([
    ['', 'RATE_REQUIRED'],
    ['  ', 'RATE_REQUIRED'],
    ['abc', 'RATE_NAN'],
    ['1e1', 'RATE_NAN'],
    ['+5', 'RATE_NAN'],
    ['١٢', 'RATE_NAN'],
    ['1.2.3', 'RATE_NAN'],
    ['75.001', 'RATE_DECIMALS'],
    ['12.500', 'RATE_DECIMALS'],
    ['-0.001', 'RATE_DECIMALS'],
    ['75.00', undefined],
    ['0.01', undefined],
    ['.5', undefined],
    ['0.00', undefined],
    ['75.01', 'RATE_RANGE'],
    ['-0.01', 'RATE_RANGE'],
    ['100', 'RATE_RANGE'],
  ])('[SPEC-§4.2] rate %j -> %s', (rate, code) => {
    expect(errorsFor({ rate })).toEqual(code ? { rate: code } : {})
  })

  it.each([
    ['', 'TENURE_REQUIRED'],
    ['   ', 'TENURE_REQUIRED'],
    ['abc', 'TENURE_WHOLE'],
    ['2.5', 'TENURE_WHOLE'],
    ['1.0', 'TENURE_WHOLE'],
    ['5.', 'TENURE_WHOLE'],
    ['1e1', 'TENURE_WHOLE'],
    ['+5', 'TENURE_WHOLE'],
    ['١٢', 'TENURE_WHOLE'],
    ['1,0', 'TENURE_WHOLE'],
    ['-5', 'TENURE_RANGE_YEARS'],
    ['-0', 'TENURE_RANGE_YEARS'],
    ['0', 'TENURE_RANGE_YEARS'],
    ['00', 'TENURE_RANGE_YEARS'],
    ['101', 'TENURE_RANGE_YEARS'],
    ['1', undefined],
    ['100', undefined],
    ['0100', undefined],
  ])('[SPEC-§4.2] tenure %j in years -> %s', (tenure, code) => {
    expect(errorsFor({ tenure, unit: 'years' })).toEqual(code ? { tenure: code } : {})
  })

  it.each([
    ['-1', 'TENURE_RANGE_MONTHS'],
    ['1201', 'TENURE_RANGE_MONTHS'],
    ['5000', 'TENURE_RANGE_MONTHS'],
    ['01200', undefined],
    ['2.5', 'TENURE_WHOLE'],
  ])('[SPEC-§4.2] tenure %j in months -> %s', (tenure, code) => {
    expect(errorsFor({ tenure, unit: 'months' })).toEqual(code ? { tenure: code } : {})
  })

  it('[SPEC-§4.2] tenure range code follows the unit', () => {
    expect(errorsFor({ tenure: '1201', unit: 'years' })).toEqual({ tenure: 'TENURE_RANGE_YEARS' })
    expect(errorsFor({ tenure: '1201', unit: 'months' })).toEqual({ tenure: 'TENURE_RANGE_MONTHS' })
  })

  it('[SPEC-§4.2] validateInputs never throws on hostile text and reports every field', () => {
    const nasty = [
      '\u0000',
      '9'.repeat(5000),
      '-'.repeat(100),
      '%'.repeat(50),
      '‮12',
      'NaN',
      'Infinity',
      '0x10',
      '1_000',
    ]
    for (const text of nasty) {
      for (const unit of ['years', 'months'] as const) {
        const result = validateInputs({ amount: text, rate: text, tenure: text, unit })
        expect(result.ok).toBe(false)
        if (!result.ok) {
          expect(Object.keys(result.errors).sort()).toEqual(['amount', 'rate', 'tenure'])
        }
      }
    }
  })

  it('[SPEC-§4.2] a failing result carries exactly the failing fields', () => {
    expect(validateInputs(BASE).ok).toBe(true)
    const bad = validateInputs({ ...BASE, amount: '' })
    expect(bad).toEqual({ ok: false, errors: { amount: 'AMOUNT_REQUIRED' } })
  })
})
