import type { Currency } from '../../domain/types'
import { useApp } from '../AppContext'
import { copy } from '../copy'

const CURRENCIES: Currency[] = ['PKR', 'USD']

export function CurrencySelect() {
  const { state, updateSettings } = useApp()
  return (
    <div className="field">
      <label htmlFor="currency">{copy.currency.label}</label>
      <select
        id="currency"
        aria-describedby="currency-note"
        value={state.settings.currency}
        onChange={(e) => updateSettings({ currency: e.target.value as Currency })}
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {copy.currency.options[c]}
          </option>
        ))}
      </select>
      <p id="currency-note" className="hint">
        {copy.currency.note}
      </p>
    </div>
  )
}
