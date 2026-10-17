// EMI and schedule algorithm (spec §5, normative). Do not "simplify" it (§5.3).
import { Decimal, round2 } from './money'
import type { CalculatedLoan, LoanInput, ScheduleRow } from './types'

/** §5.1, unrounded: B / m when r = 0, otherwise B × r × (1 + r)^m / ((1 + r)^m − 1). */
export function emi(balance: Decimal, monthlyRate: Decimal, months: number): Decimal {
  if (monthlyRate.isZero()) return balance.div(months)
  const growth = monthlyRate.plus(1).pow(months)
  return balance.times(monthlyRate).times(growth).div(growth.minus(1))
}

/** §5.2 re-amortising, cent-accurate schedule. */
export function calculateLoan(input: LoanInput): CalculatedLoan {
  const { amount, annualRate, months } = input
  const monthlyRate = annualRate.div(1200)
  const rows: ScheduleRow[] = []
  let balance = amount

  for (let month = 1; month <= months; month++) {
    // Multiply first, so half-cent ties are exact (D-37).
    const interest = round2(balance.times(annualRate).div(1200))
    let payment: Decimal
    let principal: Decimal
    if (month < months) {
      payment = round2(emi(balance, monthlyRate, months - month + 1))
      principal = payment.minus(interest)
    } else {
      principal = balance
      payment = principal.plus(interest)
    }
    balance = balance.minus(principal)
    rows.push({ month, payment, interest, principal, balance })
  }

  const first = rows[0]
  if (!first) throw new Error('A loan has at least one month') // unreachable for validated input
  const zero = new Decimal(0)
  return {
    input,
    monthlyPayment: first.payment,
    totalInterest: rows.reduce((sum, row) => sum.plus(row.interest), zero),
    totalPayable: rows.reduce((sum, row) => sum.plus(row.payment), zero),
    showRoundingNote: rows.some((row) => !row.payment.eq(first.payment)),
    rows,
  }
}
