// Browser storage that never throws to callers (spec §9.1).
// Every access is wrapped, including reading `window.localStorage` itself, which throws in
// Safari when storage is blocked.

export type StorageResult<T> = { ok: true; value: T } | { ok: false }

const PROBE_KEY = 'emi-calc.v1.probe'
let available: boolean | undefined

/** Checks once per visit that storage can be written and removed. */
export function storageAvailable(): boolean {
  if (available === undefined) {
    try {
      const store = window.localStorage
      store.setItem(PROBE_KEY, PROBE_KEY)
      store.removeItem(PROBE_KEY)
      available = true
    } catch {
      available = false
    }
  }
  return available
}

export function readItem(key: string): StorageResult<string | null> {
  try {
    return { ok: true, value: window.localStorage.getItem(key) }
  } catch {
    return { ok: false }
  }
}

export function writeItem(key: string, value: string): StorageResult<void> {
  try {
    window.localStorage.setItem(key, value)
    return { ok: true, value: undefined }
  } catch {
    return { ok: false }
  }
}

export function removeItem(key: string): StorageResult<void> {
  try {
    window.localStorage.removeItem(key)
    return { ok: true, value: undefined }
  } catch {
    return { ok: false }
  }
}
