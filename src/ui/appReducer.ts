// Application state and transitions (spec §3.2).
import type { CalculatedLoan, Currency, ErrorCode, Field, RawInputs, Unit } from '../domain/types'

export type Theme = 'system' | 'light' | 'dark'

export type Results =
  { status: 'idle' } | { status: 'shown'; loan: CalculatedLoan } | { status: 'stale' }

export interface AppState {
  inputs: RawInputs
  errors: Partial<Record<Field, ErrorCode>>
  results: Results
  settings: { currency: Currency; theme: Theme }
}

export type Action =
  | { type: 'edit'; field: 'amount' | 'rate' | 'tenure'; value: string }
  | { type: 'setUnit'; unit: Unit }
  | { type: 'invalid'; errors: Partial<Record<Field, ErrorCode>> }
  | { type: 'calculated'; loan: CalculatedLoan }
  | { type: 'reset' }
  | { type: 'setCurrency'; currency: Currency }

export const emptyInputs: RawInputs = { amount: '', rate: '', tenure: '', unit: 'years' }

export const initialState: AppState = {
  inputs: emptyInputs,
  errors: {},
  results: { status: 'idle' },
  settings: { currency: 'PKR', theme: 'system' },
}

function withoutError(errors: AppState['errors'], field: Field): AppState['errors'] {
  if (!(field in errors)) return errors
  const next = { ...errors }
  delete next[field]
  return next
}

/** Shown results become stale on any input change; idle stays idle. */
function staleIfShown(results: Results): Results {
  return results.status === 'shown' ? { status: 'stale' } : results
}

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'edit':
      return {
        ...state,
        inputs: { ...state.inputs, [action.field]: action.value },
        errors: withoutError(state.errors, action.field),
        results: staleIfShown(state.results),
      }
    case 'setUnit':
      return {
        ...state,
        inputs: { ...state.inputs, unit: action.unit },
        // The unit belongs to the tenure field, so changing it clears the tenure error.
        errors: withoutError(state.errors, 'tenure'),
        results: staleIfShown(state.results),
      }
    case 'invalid':
      return { ...state, errors: action.errors, results: { status: 'idle' } }
    case 'calculated':
      return { ...state, errors: {}, results: { status: 'shown', loan: action.loan } }
    case 'reset':
      return { ...state, inputs: emptyInputs, errors: {}, results: { status: 'idle' } }
    case 'setCurrency':
      return { ...state, settings: { ...state.settings, currency: action.currency } }
  }
}
