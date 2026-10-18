import { describe, expect, it } from 'vitest'
import { Decimal } from './money'
import { calculateLoan, emi } from './loan'
import { validateInputs } from './validate'
import { calc, inputOf, rowAt, rowText } from '../../test/helpers'

/** Headline, total interest and total payable, all 2 dp, hard-coded from the reference table. */
function figures(loan: ReturnType<typeof calc>) {
  return {
    monthly: loan.monthlyPayment.toFixed(2),
    interest: loan.totalInterest.toFixed(2),
    total: loan.totalPayable.toFixed(2),
  }
}

describe('reference loans: monthly payment', () => {
  it('[AC-1.1] L-A (1000000, 12, 1 year) has monthly payment 88848.79', () => {
    expect(calc('1000000', '12', '1', 'years').monthlyPayment.toFixed(2)).toBe('88848.79')
  })

  it('[AC-1.2] L-A entered as 12 months gives the same 88848.79', () => {
    expect(calc('1000000', '12', '12', 'months').monthlyPayment.toFixed(2)).toBe('88848.79')
  })

  it('[AC-1.3] L-B (2500000, 18, 5 years) has monthly payment 63483.57', () => {
    expect(calc('2500000', '18', '5', 'years').monthlyPayment.toFixed(2)).toBe('63483.57')
  })

  it('[AC-1.4] L-C (120000, 0, 12 months) has monthly payment 10000.00', () => {
    expect(calc('120000', '0', '12', 'months').monthlyPayment.toFixed(2)).toBe('10000.00')
  })

  it('[AC-1.5] L-D (100000, 10, 1 month) has monthly payment 100833.33', () => {
    expect(calc('100000', '10', '1', 'months').monthlyPayment.toFixed(2)).toBe('100833.33')
  })

  it('[AC-1.6] L-MIN (10, 0.01, 1 month) has monthly payment 10.00', () => {
    expect(calc('10', '0.01', '1', 'months').monthlyPayment.toFixed(2)).toBe('10.00')
  })

  it('[AC-1.7] L-MAX (1000000000000000, 75, 100 years) has monthly payment 62500000000000.00', () => {
    expect(calc('1000000000000000', '75', '100', 'years').monthlyPayment.toFixed(2)).toBe(
      '62500000000000.00',
    )
  })

  it('[AC-1.8] thousands and lakh separators give the same result as 1000000', () => {
    expect(calc('1,000,000', '12', '1', 'years').monthlyPayment.toFixed(2)).toBe('88848.79')
    expect(calc('10,00,000', '12', '1', 'years').monthlyPayment.toFixed(2)).toBe('88848.79')
  })

  it('[AC-1.9] surrounding spaces are ignored', () => {
    const loan = calc(' 1000000 ', ' 12 ', ' 1 ', 'years')
    expect(figures(loan)).toEqual({
      monthly: '88848.79',
      interest: '66185.45',
      total: '1066185.45',
    })
  })

  it('[AC-1.10] a trailing percent sign on the rate is ignored', () => {
    expect(figures(calc('1000000', '12%', '1', 'years'))).toEqual({
      monthly: '88848.79',
      interest: '66185.45',
      total: '1066185.45',
    })
  })

  it('[AC-1.11] calculating the same input again gives identical results', () => {
    const input = inputOf('1000000', '12', '1', 'years')
    const first = calculateLoan(input)
    const second = calculateLoan(input)
    expect(figures(second)).toEqual(figures(first))
    expect(second.rows.map((_, i) => rowText(second, i))).toEqual(
      first.rows.map((_, i) => rowText(first, i)),
    )
  })
})

describe('reference loans: totals', () => {
  it('[AC-3.1] L-A total interest 66185.45 and total payable 1066185.45', () => {
    const loan = calc('1000000', '12', '1', 'years')
    expect(loan.totalInterest.toFixed(2)).toBe('66185.45')
    expect(loan.totalPayable.toFixed(2)).toBe('1066185.45')
  })

  it('[AC-3.2] L-B total interest 1309014.14 and total payable 3809014.14', () => {
    const loan = calc('2500000', '18', '5', 'years')
    expect(loan.totalInterest.toFixed(2)).toBe('1309014.14')
    expect(loan.totalPayable.toFixed(2)).toBe('3809014.14')
  })

  it('[AC-3.3] L-C total interest 0.00 and total payable 120000.00', () => {
    const loan = calc('120000', '0', '12', 'months')
    expect(loan.totalInterest.toFixed(2)).toBe('0.00')
    expect(loan.totalPayable.toFixed(2)).toBe('120000.00')
  })

  it('[AC-3.4] L-MIN total interest 0.00 and total payable 10.00', () => {
    const loan = calc('10', '0.01', '1', 'months')
    expect(loan.totalInterest.toFixed(2)).toBe('0.00')
    expect(loan.totalPayable.toFixed(2)).toBe('10.00')
  })

  it('[AC-3.5] L-MAX total interest 74000000000000003.34 and total payable 75000000000000003.34', () => {
    const loan = calc('1000000000000000', '75', '100', 'years')
    expect(loan.totalInterest.toFixed(2)).toBe('74000000000000003.34')
    expect(loan.totalPayable.toFixed(2)).toBe('75000000000000003.34')
  })

  it('[AC-3.1][AC-1.5] L-D total interest 833.33 and total payable 100833.33', () => {
    const loan = calc('100000', '10', '1', 'months')
    expect(figures(loan)).toEqual({ monthly: '100833.33', interest: '833.33', total: '100833.33' })
  })

  it('[AC-3.1] L-Z3 headline 333.33, interest 0.00, payable 1000.00', () => {
    expect(figures(calc('1000', '0', '3', 'months'))).toEqual({
      monthly: '333.33',
      interest: '0.00',
      total: '1000.00',
    })
  })
})

describe('schedule rows', () => {
  it('[AC-10.1][AC-13.1] L-A has exactly 12 rows numbered 1 to 12', () => {
    const loan = calc('1000000', '12', '1', 'years')
    expect(loan.rows).toHaveLength(12)
    expect(loan.rows.map((r) => r.month)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  })

  it('[AC-10.2] L-A row 1 reads 1 | 88848.79 | 10000.00 | 78848.79 | 921151.21', () => {
    expect(rowText(calc('1000000', '12', '1', 'years'), 0)).toBe(
      '1 | 88848.79 | 10000.00 | 78848.79 | 921151.21',
    )
  })

  it('[AC-10.3] L-A row 12 reads 12 | 88848.78 | 879.69 | 87969.09 | 0.00', () => {
    expect(rowText(calc('1000000', '12', '1', 'years'), 11)).toBe(
      '12 | 88848.78 | 879.69 | 87969.09 | 0.00',
    )
  })

  it('[AC-13.1][SPEC-§5.5] L-A balance after month 6 is 514921.05 and after month 12 is 0.00', () => {
    const loan = calc('1000000', '12', '1', 'years')
    expect(rowAt(loan, 5).balance.toFixed(2)).toBe('514921.05')
    expect(rowAt(loan, 11).balance.toFixed(2)).toBe('0.00')
  })

  it('[SPEC-§5.5] L-A payments are 88848.78 in rows 9, 10 and 12 and 88848.79 in all others', () => {
    const loan = calc('1000000', '12', '1', 'years')
    const payments = loan.rows.map((r) => r.payment.toFixed(2))
    expect(payments).toEqual([
      '88848.79',
      '88848.79',
      '88848.79',
      '88848.79',
      '88848.79',
      '88848.79',
      '88848.79',
      '88848.79',
      '88848.78',
      '88848.78',
      '88848.79',
      '88848.78',
    ])
  })

  it('[AC-10.7] L-Z3 rows read 333.33 / 333.34 / 333.33 with balances 666.67, 333.33, 0.00', () => {
    const loan = calc('1000', '0', '3', 'months')
    expect(loan.rows).toHaveLength(3)
    expect(rowText(loan, 0)).toBe('1 | 333.33 | 0.00 | 333.33 | 666.67')
    expect(rowText(loan, 1)).toBe('2 | 333.34 | 0.00 | 333.34 | 333.33')
    expect(rowText(loan, 2)).toBe('3 | 333.33 | 0.00 | 333.33 | 0.00')
  })

  it('[AC-10.1][AC-13.2] L-B has exactly 60 rows and the balance after month 60 is 0.00', () => {
    const loan = calc('2500000', '18', '5', 'years')
    expect(loan.rows).toHaveLength(60)
    expect(rowAt(loan, 59).month).toBe(60)
    expect(rowAt(loan, 59).balance.toFixed(2)).toBe('0.00')
  })

  it('[AC-13.2] L-B entered as 60 months gives the same 60 rows', () => {
    const loan = calc('2500000', '18', '60', 'months')
    expect(loan.rows).toHaveLength(60)
    expect(rowAt(loan, 59).balance.toFixed(2)).toBe('0.00')
  })

  it('[AC-10.1] L-MAX has 1200 rows and ends at 0.00', () => {
    const loan = calc('1000000000000000', '75', '100', 'years')
    expect(loan.rows).toHaveLength(1200)
    expect(rowAt(loan, 1199).month).toBe(1200)
    expect(rowAt(loan, 1199).balance.toFixed(2)).toBe('0.00')
  })

  it('[AC-10.4][AC-13.3] one-month loan L-D: the single row repays everything', () => {
    const loan = calc('100000', '10', '1', 'months')
    expect(loan.rows).toHaveLength(1)
    expect(rowText(loan, 0)).toBe('1 | 100833.33 | 833.33 | 100000.00 | 0.00')
  })

  it('[AC-1.6][AC-10.4] L-MIN single row: 10.00 | 0.00 | 10.00 | 0.00', () => {
    const loan = calc('10', '0.01', '1', 'months')
    expect(rowText(loan, 0)).toBe('1 | 10.00 | 0.00 | 10.00 | 0.00')
  })

  it('[AC-1.4][AC-10.4] L-C (0%) every row is 10000.00 | 0.00 | 10000.00', () => {
    const loan = calc('120000', '0', '12', 'months')
    expect(loan.rows).toHaveLength(12)
    loan.rows.forEach((r, i) => {
      expect(r.payment.toFixed(2)).toBe('10000.00')
      expect(r.interest.toFixed(2)).toBe('0.00')
      expect(r.principal.toFixed(2)).toBe('10000.00')
      expect(r.balance.toFixed(2)).toBe((120000 - 10000 * (i + 1)).toFixed(2))
    })
  })

  it('[SPEC-§5.2] calculateLoan echoes the validated input it was given', () => {
    const input = inputOf('1000000', '12', '1', 'years')
    expect(calculateLoan(input).input).toBe(input)
  })

  it('[SPEC-§5.2] monthlyPayment equals the first row payment', () => {
    const loan = calc('2500000', '18', '5', 'years')
    expect(loan.monthlyPayment.eq(rowAt(loan, 0).payment)).toBe(true)
  })
})

describe('rounding note flag', () => {
  it('[AC-10.6] L-A (some payments 88848.78) shows the rounding note', () => {
    expect(calc('1000000', '12', '1', 'years').showRoundingNote).toBe(true)
  })

  it('[AC-10.6] L-C (all payments 10000.00) does not show the rounding note', () => {
    expect(calc('120000', '0', '12', 'months').showRoundingNote).toBe(false)
  })

  it('[AC-10.6] single-payment loans L-D and L-MIN do not show the note', () => {
    expect(calc('100000', '10', '1', 'months').showRoundingNote).toBe(false)
    expect(calc('10', '0.01', '1', 'months').showRoundingNote).toBe(false)
  })

  it('[AC-10.6][AC-10.7] L-Z3 (333.33, 333.34, 333.33) shows the note', () => {
    expect(calc('1000', '0', '3', 'months').showRoundingNote).toBe(true)
  })
})

describe('years versus equivalent months', () => {
  it('[AC-1.2][SPEC-§5.4] L-A as 1 year and as 12 months give identical rows, totals and note', () => {
    const a = calc('1000000', '12', '1', 'years')
    const b = calc('1000000', '12', '12', 'months')
    expect(b.rows.map((_, i) => rowText(b, i))).toEqual(a.rows.map((_, i) => rowText(a, i)))
    expect(figures(b)).toEqual(figures(a))
    expect(b.showRoundingNote).toBe(a.showRoundingNote)
  })

  it('[SPEC-§5.4] invariant 8: L-B as 5 years and as 60 months are identical', () => {
    const a = calc('2500000', '18', '5', 'years')
    const b = calc('2500000', '18', '60', 'months')
    expect(a.rows).toHaveLength(60)
    expect(b.rows.map((_, i) => rowText(b, i))).toEqual(a.rows.map((_, i) => rowText(a, i)))
    expect(figures(b)).toEqual(figures(a))
    expect(b.showRoundingNote).toBe(a.showRoundingNote)
  })
})

describe('regression loans where the fixed-instalment method fails', () => {
  it('[SPEC-§5.3] 10000 at 36% for 359 months: headline 300.01, 359 rows, ends at 0.00', () => {
    const loan = calc('10000', '36', '359', 'months')
    expect(loan.monthlyPayment.toFixed(2)).toBe('300.01')
    expect(loan.rows).toHaveLength(359)
    expect(rowAt(loan, 358).month).toBe(359)
    expect(rowAt(loan, 358).balance.toFixed(2)).toBe('0.00')
    const headline = new Decimal('300.01')
    // D-55: every payment but the last within 0.01 of the headline, the last within 0.02.
    for (const r of loan.rows.slice(0, 358)) {
      expect(r.payment.minus(headline).abs().lte('0.01')).toBe(true)
    }
    expect(rowAt(loan, 358).payment.minus(headline).abs().lte('0.02')).toBe(true)
    // The fixed-instalment method pays off at month 352; here no balance reaches zero early.
    for (const r of loan.rows.slice(0, 358)) {
      expect(r.balance.gt(0)).toBe(true)
    }
  })

  it('[SPEC-§5.3] 10000.82 at 30% for 360 months: headline 250.05, 360 rows, ends at 0.00', () => {
    const loan = calc('10000.82', '30', '360', 'months')
    expect(loan.monthlyPayment.toFixed(2)).toBe('250.05')
    expect(loan.rows).toHaveLength(360)
    expect(rowAt(loan, 359).month).toBe(360)
    expect(rowAt(loan, 359).balance.toFixed(2)).toBe('0.00')
    const headline = new Decimal('250.05')
    // D-55: every payment but the last within 0.01 of the headline, the last within 0.02.
    for (const r of loan.rows.slice(0, 359)) {
      expect(r.payment.minus(headline).abs().lte('0.01')).toBe(true)
    }
    expect(rowAt(loan, 359).payment.minus(headline).abs().lte('0.02')).toBe(true)
    // The fixed-instalment method's final payment is 1,767.73.
    expect(rowAt(loan, 359).payment.lt('251')).toBe(true)
  })
})

describe('emi', () => {
  it('[SPEC-§5.1] r = 0 gives balance / months', () => {
    expect(emi(new Decimal('120000'), new Decimal(0), 12).eq('10000')).toBe(true)
    expect(emi(new Decimal('1000'), new Decimal(0), 4).eq('250')).toBe(true)
  })

  it('[SPEC-§5.1] r = 0 is not rounded: 1000 / 3 has more than 2 decimal places', () => {
    const value = emi(new Decimal('1000'), new Decimal(0), 3)
    expect(value.decimalPlaces()).toBeGreaterThan(2)
    expect(value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)).toBe('333.33')
  })

  it('[SPEC-§5.1] standard formula for L-A rounds to 88848.79', () => {
    const r = new Decimal(12).div(1200)
    const value = emi(new Decimal('1000000'), r, 12)
    expect(value.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2)).toBe('88848.79')
    expect(value.decimalPlaces()).toBeGreaterThan(2)
  })

  it('[SPEC-§5.1] standard formula for L-B rounds to 63483.57 and L-D to 100833.33', () => {
    const rB = new Decimal(18).div(1200)
    expect(
      emi(new Decimal('2500000'), rB, 60).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2),
    ).toBe('63483.57')
    const rD = new Decimal(10).div(1200)
    expect(
      emi(new Decimal('100000'), rD, 1).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2),
    ).toBe('100833.33')
  })

  it('[SPEC-§5.1] one month: B x (1 + r) (L-D unrounded is 100833.3333...)', () => {
    const rD = new Decimal(10).div(1200)
    const value = emi(new Decimal('100000'), rD, 1)
    expect(value.toFixed(4)).toBe('100833.3333')
  })

  it('[SPEC-§5.1] L-MAX payment rounds to 62500000000000.00', () => {
    const r = new Decimal(75).div(1200)
    expect(
      emi(new Decimal('1000000000000000'), r, 1200)
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
        .toFixed(2),
    ).toBe('62500000000000.00')
  })
})

describe('validated input feeds the calculation', () => {
  it('[AC-1.1] a LoanInput from validateInputs can be calculated without further conversion', () => {
    const result = validateInputs({ amount: '1000000', rate: '12', tenure: '1', unit: 'years' })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(calculateLoan(result.value).monthlyPayment.toFixed(2)).toBe('88848.79')
    }
  })
})
