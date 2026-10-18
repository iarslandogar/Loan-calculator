import type { Theme } from '../../storage/settings'
import { useApp } from '../AppContext'
import { copy } from '../copy'

const THEMES: Theme[] = ['system', 'light', 'dark']

export function ThemeSelect() {
  const { state, updateSettings } = useApp()
  return (
    <div className="field theme-field">
      <label htmlFor="theme">{copy.theme.label}</label>
      <select
        id="theme"
        value={state.settings.theme}
        onChange={(e) => updateSettings({ theme: e.target.value as Theme })}
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {copy.theme.options[t]}
          </option>
        ))}
      </select>
    </div>
  )
}
