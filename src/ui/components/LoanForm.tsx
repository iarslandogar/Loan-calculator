import { useRef, type FormEvent, type RefObject } from 'react'
import { calculateLoan } from '../../domain/loan'
import type { ErrorCode, Field, Unit } from '../../domain/types'
import { validateInputs } from '../../domain/validate'
import { useApp } from '../AppContext'
import { copy } from '../copy'
import { CurrencySelect } from './CurrencySelect'

const FIELD_ORDER: Field[] = ['amount', 'rate', 'tenure']
const UNITS: Unit[] = ['years', 'months']

interface TextFieldProps {
  id: Field
  label: string
  value: string
  error: ErrorCode | undefined
  inputMode: 'decimal' | 'numeric'
  inputRef: RefObject<HTMLInputElement | null>
  onChange: (value: string) => void
}

function TextField({ id, label, value, error, inputMode, inputRef, onChange }: TextFieldProps) {
  const errorId = `${id}-error`
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* Spec §8.3: errors sit under their field, in a polite live region. */}
      <p id={errorId} className="field-error" aria-live="polite">
        {error ? copy.err[error] : ''}
      </p>
    </div>
  )
}

export function LoanForm() {
  const { state, dispatch } = useApp()
  const { inputs, errors, settings } = state
  const amountRef = useRef<HTMLInputElement>(null)
  const rateRef = useRef<HTMLInputElement>(null)
  const tenureRef = useRef<HTMLInputElement>(null)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const result = validateInputs(inputs)
    if (!result.ok) {
      dispatch({ type: 'invalid', errors: result.errors })
      // Spec §8.3: focus the first invalid field in order amount → rate → tenure.
      const refs = { amount: amountRef, rate: rateRef, tenure: tenureRef }
      const first = FIELD_ORDER.find((f) => result.errors[f])
      if (first) refs[first].current?.focus()
      return
    }
    dispatch({ type: 'calculated', loan: calculateLoan(result.value) })
  }

  function onReset() {
    dispatch({ type: 'reset' })
    amountRef.current?.focus()
  }

  const edit = (field: 'amount' | 'rate' | 'tenure') => (value: string) =>
    dispatch({ type: 'edit', field, value })

  return (
    <form className="card form-card" noValidate onSubmit={onSubmit}>
      <CurrencySelect />
      <TextField
        id="amount"
        label={copy.field.amount(settings.currency)}
        value={inputs.amount}
        error={errors.amount}
        inputMode="decimal"
        inputRef={amountRef}
        onChange={edit('amount')}
      />
      <TextField
        id="rate"
        label={copy.field.rate}
        value={inputs.rate}
        error={errors.rate}
        inputMode="decimal"
        inputRef={rateRef}
        onChange={edit('rate')}
      />
      <div className="tenure-row">
        <TextField
          id="tenure"
          label={copy.field.tenure}
          value={inputs.tenure}
          error={errors.tenure}
          inputMode="numeric"
          inputRef={tenureRef}
          onChange={edit('tenure')}
        />
        <div className="field">
          <label htmlFor="unit">{copy.field.unit}</label>
          <select
            id="unit"
            value={inputs.unit}
            onChange={(e) => dispatch({ type: 'setUnit', unit: e.target.value as Unit })}
          >
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {copy.field.unitOptions[u]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="actions">
        <button type="submit" className="primary">
          {copy.btn.calculate}
        </button>
        <button type="button" className="secondary" onClick={onReset}>
          {copy.btn.reset}
        </button>
      </div>
    </form>
  )
}
