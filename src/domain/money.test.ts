import { describe, expect, it } from 'vitest'
import { Decimal, formatAmount, formatMoney, round2 } from './money'

describe('configured Decimal', () => {
  it('[SPEC-§3.1.1] has precision 40 and ROUND_HALF_UP', () => {
    expect(Decimal.precision).toBe(40)
    expect(Decimal.rounding).toBe(Decimal.ROUND_HALF_UP)
    expect(Decimal.rounding).toBe(4)
    expect(new Decimal(1).div(3).toString()).toBe('0.' + '3'.repeat(40))
    expect(new Decimal('2.5').toDecimalPlaces(0).toString()).toBe('3')
  })
})

describe('round2', () => {
  it.each([
    ['0.005', '0.01'],
    ['0.004', '0.00'],
    ['0.0049999', '0.00'],
    ['1.005', '1.01'],
    ['2.675', '2.68'],
    ['88848.785', '88848.79'],
    ['88848.7849', '88848.78'],
    ['333.333333333333', '333.33'],
    ['10', '10.00'],
    ['0', '0.00'],
    ['100833.335', '100833.34'],
  ])('[SPEC-§5] round2(%s) = %s (half-up, ties away from zero)', (input, expected) => {
    expect(round2(new Decimal(input)).toFixed(2)).toBe(expected)
  })

  it('[SPEC-§5] returns a Decimal with at most 2 decimal places', () => {
    const out = round2(new Decimal('1234.56789'))
    expect(out.decimalPlaces()).toBeLessThanOrEqual(2)
    expect(out.eq('1234.57')).toBe(true)
  })
})

describe('formatMoney', () => {
  it.each([
    ['88848.79', 'PKR', 'Rs 88,848.79'],
    ['88848.79', 'USD', '$88,848.79'],
    ['1000000', 'USD', '$1,000,000.00'],
    ['1000000', 'PKR', 'Rs 1,000,000.00'],
    ['0', 'PKR', 'Rs 0.00'],
    ['0', 'USD', '$0.00'],
    ['20000000061.79', 'PKR', 'Rs 20,000,000,061.79'],
    ['19000000061.79', 'PKR', 'Rs 19,000,000,061.79'],
    ['41666666.8', 'PKR', 'Rs 41,666,666.80'],
    ['1000000000', 'PKR', 'Rs 1,000,000,000.00'],
    ['999.99', 'PKR', 'Rs 999.99'],
    ['1000', 'PKR', 'Rs 1,000.00'],
    ['0.01', 'PKR', 'Rs 0.01'],
    ['0.5', 'USD', '$0.50'],
    ['100', 'PKR', 'Rs 100.00'],
    ['100000', 'PKR', 'Rs 100,000.00'],
  ] as const)('[SPEC-§6] formatMoney(%s, %s) = %s', (value, currency, expected) => {
    expect(formatMoney(new Decimal(value), currency)).toBe(expected)
  })

  it('[SPEC-§6] rounds half-up to 2 dp first when given more than 2 dp', () => {
    expect(formatMoney(new Decimal('0.005'), 'PKR')).toBe('Rs 0.01')
    expect(formatMoney(new Decimal('999.999'), 'USD')).toBe('$1,000.00')
    expect(formatMoney(new Decimal('1234.564'), 'PKR')).toBe('Rs 1,234.56')
  })

  it('[SPEC-§6] never uses exponent notation, whatever the size', () => {
    expect(formatMoney(new Decimal('1e9'), 'PKR')).toBe('Rs 1,000,000,000.00')
    expect(formatMoney(new Decimal('1e21'), 'PKR')).toBe('Rs 1,000,000,000,000,000,000,000.00')
    expect(formatMoney(new Decimal('1e25'), 'USD')).toBe('$10,000,000,000,000,000,000,000,000.00')
    expect(formatMoney(new Decimal('1e-7'), 'PKR')).toBe('Rs 0.00')
    expect(formatAmount(new Decimal('1e21'))).toBe('1,000,000,000,000,000,000,000.00')
  })
})

describe('formatAmount', () => {
  it.each([
    ['921151.21', '921,151.21'],
    ['0', '0.00'],
    ['0.00', '0.00'],
    ['87969.09', '87,969.09'],
    ['999.99', '999.99'],
    ['1000', '1,000.00'],
    ['100000', '100,000.00'],
    ['1000000', '1,000,000.00'],
    ['20000000061.79', '20,000,000,061.79'],
    ['10000', '10,000.00'],
    ['333.3', '333.30'],
  ])('[SPEC-§6] formatAmount(%s) = %s (no symbol, 3-digit grouping, 2 dp)', (value, expected) => {
    expect(formatAmount(new Decimal(value))).toBe(expected)
  })

  it('[SPEC-§6] rounds values with more than 2 dp half-up', () => {
    expect(formatAmount(new Decimal('88848.785'))).toBe('88,848.79')
  })
})
