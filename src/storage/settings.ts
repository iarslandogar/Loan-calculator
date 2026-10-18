// Currency and theme preferences (spec §9.2).
import type { Currency } from '../domain/types'
import { readItem, writeItem } from './safeStorage'

export type Theme = 'system' | 'light' | 'dark'

export interface Settings {
  currency: Currency
  theme: Theme
}

export const SETTINGS_KEY = 'emi-calc.v1.settings'
export const defaultSettings: Settings = { currency: 'PKR', theme: 'system' }

const CURRENCIES: readonly string[] = ['PKR', 'USD']
const THEMES: readonly string[] = ['system', 'light', 'dark']

/**
 * Not valid JSON, or not a plain object → both defaults. Each field that is missing or not an
 * allowed value falls back to its own default; the other field is kept. Never throws.
 * The inline script in index.html applies the same rule to the theme before first paint.
 */
export function parseSettings(raw: string | null): Settings {
  if (raw === null) return defaultSettings
  let value: unknown
  try {
    value = JSON.parse(raw)
  } catch {
    return defaultSettings
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return defaultSettings
  const { currency, theme } = value as Record<string, unknown>
  return {
    currency:
      typeof currency === 'string' && CURRENCIES.includes(currency)
        ? (currency as Currency)
        : defaultSettings.currency,
    theme:
      typeof theme === 'string' && THEMES.includes(theme)
        ? (theme as Theme)
        : defaultSettings.theme,
  }
}

export function loadSettings(): Settings {
  const stored = readItem(SETTINGS_KEY)
  return stored.ok ? parseSettings(stored.value) : defaultSettings
}

/** Best effort: if storage is blocked, settings simply live in memory for this visit (AC-6.6). */
export function saveSettings(settings: Settings): void {
  writeItem(SETTINGS_KEY, JSON.stringify(settings))
}
