// Saved calculations (spec §9.2, §9.3). Never throws to callers.
import { toCanonical } from '../domain/format'
import { emi } from '../domain/loan'
import { Decimal, round2 } from '../domain/money'
import type { CalculatedLoan, CanonicalInput, Currency } from '../domain/types'
import { validateInputs } from '../domain/validate'
import { readItem, removeItem, storageAvailable, writeItem } from './safeStorage'

export const HISTORY_KEY = 'emi-calc.v1.history'
export const HISTORY_LIMIT = 20

export interface HistoryEntry {
  id: string
  createdAt: string
  currency: Currency
  input: CanonicalInput
  monthlyPayment: string
}

export type HistoryResult = { ok: true; entries: HistoryEntry[] } | { ok: false }

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

/** Spec §9.2: an element is kept only if every check passes; otherwise it is dropped. */
function validEntry(value: unknown): HistoryEntry | null {
  // 1. Type guard.
  if (!isObject(value) || !isObject(value.input)) return null
  const { id, createdAt, currency, monthlyPayment } = value
  const { amount, rate, tenure, unit } = value.input
  if (typeof id !== 'string' || id === '') return null
  if (typeof createdAt !== 'string') return null
  const time = Date.parse(createdAt)
  if (Number.isNaN(time)) return null
  const year = new Date(time).getUTCFullYear()
  if (year < 2000 || year > 9999) return null
  if (currency !== 'PKR' && currency !== 'USD') return null
  if (typeof amount !== 'string' || typeof rate !== 'string') return null
  if (typeof tenure !== 'number' || !Number.isInteger(tenure)) return null
  if (unit !== 'years' && unit !== 'months') return null
  if (typeof monthlyPayment !== 'string') return null

  // 2. The input is valid under today's rules.
  const result = validateInputs({ amount, rate, tenure: String(tenure), unit })
  if (!result.ok) return null

  // 3. The stored input is exactly the canonical form.
  const canonical = toCanonical(result.value)
  if (
    canonical.amount !== amount ||
    canonical.rate !== rate ||
    canonical.tenure !== tenure ||
    canonical.unit !== unit
  ) {
    return null
  }

  // 4. The stored payment equals the recomputed one (emi only, so loading stays cheap).
  let stored: Decimal
  try {
    stored = new Decimal(monthlyPayment)
  } catch {
    return null
  }
  const { amount: principal, annualRate, months } = result.value
  if (!stored.eq(round2(emi(principal, annualRate.div(1200), months)))) return null

  return { id, createdAt, currency, input: canonical, monthlyPayment }
}

/** Not valid JSON or not a list → empty. Invalid elements dropped, duplicate ids dropped, at most 20. */
export function parseHistory(raw: string | null): HistoryEntry[] {
  if (raw === null) return []
  let value: unknown
  try {
    value = JSON.parse(raw)
  } catch {
    return []
  }
  if (!Array.isArray(value)) return []
  const seen = new Set<string>()
  const entries: HistoryEntry[] = []
  for (const element of value) {
    const entry = validEntry(element)
    if (!entry || seen.has(entry.id)) continue
    seen.add(entry.id)
    entries.push(entry)
  }
  return entries.slice(0, HISTORY_LIMIT)
}

/** Reads the stored list now. Every write starts from this, never from in-memory state (D-13). */
function readCurrent(): HistoryResult {
  const stored = readItem(HISTORY_KEY)
  return stored.ok ? { ok: true, entries: parseHistory(stored.value) } : { ok: false }
}

export function loadHistory(): { available: boolean; entries: HistoryEntry[] } {
  if (!storageAvailable()) return { available: false, entries: [] }
  const current = readCurrent()
  return current.ok
    ? { available: true, entries: current.entries }
    : { available: false, entries: [] }
}

let idCounter = 0
function newId(): string {
  try {
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  } catch {
    // Fall through to the timestamp-plus-counter fallback (spec §9.2).
  }
  idCounter += 1
  return `${Date.now()}-${idCounter}`
}

export function createEntry(
  loan: CalculatedLoan,
  currency: Currency,
  now = new Date(),
): HistoryEntry {
  return {
    id: newId(),
    createdAt: now.toISOString(),
    currency,
    input: toCanonical(loan.input),
    monthlyPayment: loan.monthlyPayment.toFixed(2),
  }
}

const sameCalculation = (a: HistoryEntry, b: HistoryEntry) =>
  a.currency === b.currency &&
  a.input.amount === b.input.amount &&
  a.input.rate === b.input.rate &&
  a.input.tenure === b.input.tenure &&
  a.input.unit === b.input.unit

/** Spec §9.3: re-read, skip a repeat of the newest entry as just read, insert at the top, keep 20. */
export function saveEntry(entry: HistoryEntry): HistoryResult {
  const current = readCurrent()
  if (!current.ok) return current
  const [newest] = current.entries
  if (newest && sameCalculation(newest, entry)) return current
  const entries = [entry, ...current.entries].slice(0, HISTORY_LIMIT)
  return writeItem(HISTORY_KEY, JSON.stringify(entries)).ok ? { ok: true, entries } : { ok: false }
}

/** Deletes by id from the list as just read (D-13). */
export function deleteEntry(id: string): HistoryResult {
  const current = readCurrent()
  if (!current.ok) return current
  const entries = current.entries.filter((e) => e.id !== id)
  const written =
    entries.length === 0 ? removeItem(HISTORY_KEY) : writeItem(HISTORY_KEY, JSON.stringify(entries))
  return written.ok ? { ok: true, entries } : { ok: false }
}

/** Clear all removes the key entirely (AC-12.4). */
export function clearHistory(): HistoryResult {
  return removeItem(HISTORY_KEY).ok ? { ok: true, entries: [] } : { ok: false }
}
