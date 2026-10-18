// Application state and transitions (spec §3.2).
import type { CalculatedLoan, Currency, ErrorCode, Field, RawInputs, Unit } from '../domain/types'
import type { HistoryEntry } from '../storage/history'
import { defaultSettings, type Settings, type Theme } from '../storage/settings'

export type Results =
  { status: 'idle' } | { status: 'shown'; loan: CalculatedLoan } | { status: 'stale' }

export interface HistoryState {
  /** False when storage is blocked, or after a failed save, for the rest of the visit (§9.1, §9.3). */
  available: boolean
  entries: HistoryEntry[]
  /** A delete or Clear all could not be written (D-28); cleared by the next successful change. */
  removeFailed: boolean
}

export interface AppState {
  inputs: RawInputs
  errors: Partial<Record<Field, ErrorCode>>
  results: Results
  settings: Settings
  history: HistoryState
}

export type Action =
  | { type: 'edit'; field: 'amount' | 'rate' | 'tenure'; value: string }
  | { type: 'setUnit'; unit: Unit }
  | { type: 'invalid'; errors: Partial<Record<Field, ErrorCode>> }
  | { type: 'calculated'; loan: CalculatedLoan }
  | { type: 'reset' }
  | { type: 'setCurrency'; currency: Currency }
  | { type: 'setTheme'; theme: Theme }
  | { type: 'restore'; inputs: RawInputs; currency: Currency; loan: CalculatedLoan }
  | { type: 'historyChanged'; entries: HistoryEntry[] }
  | { type: 'historyReloaded'; entries: HistoryEntry[] }
  | { type: 'historyUnavailable' }
  | { type: 'historyRemoveFailed' }

export const emptyInputs: RawInputs = { amount: '', rate: '', tenure: '', unit: 'years' }

export const initialState: AppState = {
  inputs: emptyInputs,
  errors: {},
  results: { status: 'idle' },
  settings: defaultSettings,
  history: { available: true, entries: [], removeFailed: false },
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
    case 'setTheme':
      return { ...state, settings: { ...state.settings, theme: action.theme } }
    case 'restore':
      // §3.2 (D-14): canonical inputs, all errors cleared, the entry's currency, fresh results.
      return {
        ...state,
        inputs: action.inputs,
        errors: {},
        results: { status: 'shown', loan: action.loan },
        settings: { ...state.settings, currency: action.currency },
      }
    case 'historyChanged':
      return {
        ...state,
        history: { ...state.history, entries: action.entries, removeFailed: false },
      }
    case 'historyReloaded':
      return { ...state, history: { ...state.history, entries: action.entries } }
    case 'historyUnavailable':
      return { ...state, history: { available: false, entries: [], removeFailed: false } }
    case 'historyRemoveFailed':
      return { ...state, history: { ...state.history, removeFailed: true } }
  }
}
