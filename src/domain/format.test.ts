import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { formatDateTime, formatRate, formatTenure, toCanonical } from './format'
import { inputOf } from '../../test/helpers'

describe('formatRate', () => {
  it.each([
    ['12', '12%'],
    ['21.5', '21.5%'],
    ['0.01', '0.01%'],
    ['0', '0%'],
    ['50', '50%'],
    ['12.50', '12.5%'],
    ['12.00', '12%'],
    ['0.10', '0.1%'],
    ['18', '18%'],
    ['-0', '0%'],
    ['5.25', '5.25%'],
  ])('[AC-11.11][SPEC-§6] formatRate(%s) = %s', (rate, expected) => {
    expect(formatRate(new Decimal(rate))).toBe(expected)
  })
})

describe('formatTenure', () => {
  it.each([
    [1, 'years', '1 year'],
    [5, 'years', '5 years'],
    [40, 'years', '40 years'],
    [12, 'years', '12 years'],
    [1, 'months', '1 month'],
    [12, 'months', '12 months'],
    [2, 'months', '2 months'],
    [480, 'months', '480 months'],
  ] as const)('[AC-11.11][SPEC-§6] formatTenure(%i, %s) = %s', (tenure, unit, expected) => {
    expect(formatTenure(tenure, unit)).toBe(expected)
  })

  it('[AC-11.11] keeps the unit as entered (12 months is not shown as 1 year)', () => {
    expect(formatTenure(12, 'months')).toBe('12 months')
    expect(formatTenure(1, 'years')).toBe('1 year')
  })
})

describe('formatDateTime', () => {
  it('[SPEC-§6][AC-11.2] formats 20:45 on 17 Oct 2026', () => {
    expect(formatDateTime(new Date('2026-10-17T20:45:00+05:00'))).toBe('17 Oct 2026, 20:45')
  })

  it('[SPEC-§6] zero-pads hour and minute but not the day: 5 Jan 2027, 09:05', () => {
    expect(formatDateTime(new Date('2027-01-05T09:05:00+05:00'))).toBe('5 Jan 2027, 09:05')
  })

  it('[SPEC-§6] uses local time (Asia/Karachi), not UTC', () => {
    expect(formatDateTime(new Date('2026-10-17T15:45:00Z'))).toBe('17 Oct 2026, 20:45')
    expect(formatDateTime(new Date('2026-12-31T20:00:00Z'))).toBe('1 Jan 2027, 01:00')
  })

  it('[SPEC-§6] uses a 24-hour clock around midnight and noon', () => {
    expect(formatDateTime(new Date('2026-03-09T00:00:00+05:00'))).toBe('9 Mar 2026, 00:00')
    expect(formatDateTime(new Date('2026-03-09T12:00:00+05:00'))).toBe('9 Mar 2026, 12:00')
    expect(formatDateTime(new Date('2026-03-09T23:59:00+05:00'))).toBe('9 Mar 2026, 23:59')
    expect(formatDateTime(new Date('2026-03-09T13:07:00+05:00'))).toBe('9 Mar 2026, 13:07')
  })

  it('[SPEC-§6] uses English three-letter months for all twelve months', () => {
    const names = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    names.forEach((name, i) => {
      const mm = String(i + 1).padStart(2, '0')
      expect(formatDateTime(new Date(`2026-${mm}-15T10:30:00+05:00`))).toBe(
        `15 ${name} 2026, 10:30`,
      )
    })
  })

  it('[SPEC-§6] two-digit days are not padded further', () => {
    expect(formatDateTime(new Date('2026-11-30T18:20:00+05:00'))).toBe('30 Nov 2026, 18:20')
    expect(formatDateTime(new Date('2026-11-01T18:20:00+05:00'))).toBe('1 Nov 2026, 18:20')
  })
})

describe('toCanonical', () => {
  it('[SPEC-§6] L-B: 2500000, 18, 5 years', () => {
    expect(toCanonical(inputOf('2500000', '18', '5', 'years'))).toEqual({
      amount: '2500000',
      rate: '18',
      tenure: 5,
      unit: 'years',
    })
  })

  it('[SPEC-§6] strips grouping and trailing zeros: 1,500.50 and 18.00 become 1500.5 and 18', () => {
    expect(toCanonical(inputOf('1,500.50', '18.00', '12', 'months'))).toEqual({
      amount: '1500.5',
      rate: '18',
      tenure: 12,
      unit: 'months',
    })
  })

  it('[SPEC-§6] keeps meaningful decimals: 1500.5 and 0.01', () => {
    expect(toCanonical(inputOf('1500.5', '0.01', '1', 'months'))).toEqual({
      amount: '1500.5',
      rate: '0.01',
      tenure: 1,
      unit: 'months',
    })
  })

  it('[SPEC-§6] removes percent sign, spaces and lakh grouping', () => {
    expect(toCanonical(inputOf(' 10,00,000 ', ' 12% ', ' 1 ', 'years'))).toEqual({
      amount: '1000000',
      rate: '12',
      tenure: 1,
      unit: 'years',
    })
  })

  it('[SPEC-§6] -0 rate becomes 0', () => {
    const canonical = toCanonical(inputOf('120000', '-0', '12', 'months'))
    expect(canonical.rate).toBe('0')
    expect(canonical).toEqual({ amount: '120000', rate: '0', tenure: 12, unit: 'months' })
  })

  it('[SPEC-§6] 0.00 and 5. rates canonicalise to 0 and 5', () => {
    expect(toCanonical(inputOf('1000', '0.00', '3', 'months')).rate).toBe('0')
    expect(toCanonical(inputOf('1000', '5.', '3', 'months')).rate).toBe('5')
  })

  it('[SPEC-§6] tenure with leading zeros is an integer: 012 -> 12', () => {
    expect(toCanonical(inputOf('1000000', '12', '012', 'years')).tenure).toBe(12)
  })

  it('[SPEC-§6] never uses exponent notation at the largest and smallest values', () => {
    expect(toCanonical(inputOf('1000000000000000', '75', '100', 'years'))).toEqual({
      amount: '1000000000000000',
      rate: '75',
      tenure: 100,
      unit: 'years',
    })
    expect(toCanonical(inputOf('10', '0.01', '1', 'months'))).toEqual({
      amount: '10',
      rate: '0.01',
      tenure: 1,
      unit: 'months',
    })
    expect(toCanonical(inputOf('1000000000000000.00', '0', '1200', 'months')).amount).toBe(
      '1000000000000000',
    )
  })

  it('[SPEC-§6] amount "1000." canonicalises to 1000', () => {
    expect(toCanonical(inputOf('1000.', '12', '1', 'years')).amount).toBe('1000')
  })
})
