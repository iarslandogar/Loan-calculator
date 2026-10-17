// Shared helpers for domain tests. Not a test file. Uses only the spec §3.1.1 API.
import { calculateLoan } from '../src/domain/loan'
import { validateInputs } from '../src/domain/validate'
import type { CalculatedLoan, LoanInput, RawInputs, ScheduleRow, Unit } from '../src/domain/types'

export function raw(amount: string, rate: string, tenure: string, unit: Unit = 'years'): RawInputs {
  return { amount, rate, tenure, unit }
}

/** Obtain a LoanInput only through validateInputs; fails loudly if the inputs are rejected. */
export function inputOf(
  amount: string,
  rate: string,
  tenure: string,
  unit: Unit = 'years',
): LoanInput {
  const result = validateInputs(raw(amount, rate, tenure, unit))
  if (!result.ok) {
    throw new Error(`Expected valid inputs, got errors ${JSON.stringify(result.errors)}`)
  }
  return result.value
}

export function calc(
  amount: string,
  rate: string,
  tenure: string,
  unit: Unit = 'years',
): CalculatedLoan {
  return calculateLoan(inputOf(amount, rate, tenure, unit))
}

/** A row as "month | payment | interest | principal | balance", 2 dp, no grouping. */
export function rowAt(loan: CalculatedLoan, index: number): ScheduleRow {
  const r = loan.rows[index]
  if (!r) throw new Error(`no schedule row at index ${index} (have ${loan.rows.length})`)
  return r
}

export function rowText(loan: CalculatedLoan, index: number): string {
  const r = rowAt(loan, index)
  return [
    r.month,
    r.payment.toFixed(2),
    r.interest.toFixed(2),
    r.principal.toFixed(2),
    r.balance.toFixed(2),
  ].join(' | ')
}
