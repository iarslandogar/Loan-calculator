import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { formatPercent } from './format'

describe('formatPercent (spec 3.1.1, D-65)', () => {
  it.each([
    ['6.2', '6.2%'],
    ['0', '0.0%'],
    ['100', '100.0%'],
    ['12', '12.0%'],
    ['93.8', '93.8%'],
    ['34.4', '34.4%'],
    ['0.1', '0.1%'],
  ])('[SPEC-§3.1.1] formatPercent(%s) shows exactly 1 dp: %s', (input, expected) => {
    expect(formatPercent(new Decimal(input))).toBe(expected)
  })

  it.each([
    ['6.25', '6.3%'],
    ['6.24', '6.2%'],
    ['6.249', '6.2%'],
    ['0.05', '0.1%'],
    ['0.04', '0.0%'],
    ['34.35', '34.4%'],
    ['99.95', '100.0%'],
    ['99.949', '99.9%'],
    ['1.25', '1.3%'],
  ])('[SPEC-§3.1.1] formatPercent(%s) rounds half-up to 1 dp: %s', (input, expected) => {
    expect(formatPercent(new Decimal(input))).toBe(expected)
  })

  it('[SPEC-§3.1.1] never uses exponent notation, even for tiny values', () => {
    expect(formatPercent(new Decimal('0.0000001'))).toBe('0.0%')
  })

  it('[SPEC-§3.1.1] property: every tenth from 0.0 to 100.0 prints as whole.tenth%', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 1000 }), (tenths) => {
        const whole = Math.floor(tenths / 10)
        const frac = tenths % 10
        return formatPercent(new Decimal(tenths).div(10)) === `${whole}.${frac}%`
      }),
      { seed: 20261017, numRuns: 1000 },
    )
  })
})
