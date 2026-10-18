import { useEffect, useRef, useState } from 'react'
import { calculateLoan } from '../../domain/loan'
import { validateInputs } from '../../domain/validate'
import {
  clearHistory,
  deleteEntry,
  HISTORY_KEY,
  parseHistory,
  type HistoryEntry as Entry,
} from '../../storage/history'
import { useApp } from '../AppContext'
import { copy } from '../copy'
import { ConfirmDialog } from './ConfirmDialog'
import { HistoryEntry } from './HistoryEntry'

/** Where focus goes after the next render (spec §8.3, AC-12.1, D-30). */
type FocusTarget = 'heading' | 'clearAll' | { restore: string }

export function HistoryPanel() {
  const { state, dispatch, updateSettings } = useApp()
  const { available, entries, removeFailed } = state.history
  const [confirming, setConfirming] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const clearAllRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const pendingFocus = useRef<FocusTarget | null>(null)

  // Apply a pending focus move once the DOM reflects the new state. Child effects (the dialog
  // closing) run first, so focus never lands behind a still-open modal.
  useEffect(() => {
    const target = pendingFocus.current
    if (!target) return
    pendingFocus.current = null
    if (target === 'heading') headingRef.current?.focus()
    else if (target === 'clearAll') clearAllRef.current?.focus()
    else {
      const selector = `[data-entry-id="${CSS.escape(target.restore)}"] [data-action="restore"]`
      listRef.current?.querySelector<HTMLButtonElement>(selector)?.focus()
    }
  })

  // Spec §9.3: another tab changed the history (or cleared all storage): reload the list.
  useEffect(() => {
    if (!available) return
    const onStorage = (event: StorageEvent) => {
      if (event.key !== HISTORY_KEY && event.key !== null) return
      const next = parseHistory(event.key === null ? null : event.newValue)
      const focused = document.activeElement?.closest('[data-entry-id]')
      const focusedId = focused?.getAttribute('data-entry-id')
      if (focusedId && !next.some((e) => e.id === focusedId)) pendingFocus.current = 'heading'
      dispatch({ type: 'historyReloaded', entries: next })
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [available, dispatch])

  function onRestore(entry: Entry, button: HTMLButtonElement) {
    const inputs = {
      amount: entry.input.amount,
      rate: entry.input.rate,
      tenure: String(entry.input.tenure),
      unit: entry.input.unit,
    }
    const result = validateInputs(inputs)
    if (!result.ok) return // unreachable: entries are fully validated on load (§9.2)
    dispatch({
      type: 'restore',
      inputs,
      currency: entry.currency,
      loan: calculateLoan(result.value),
    })
    updateSettings({ currency: entry.currency })
    // §8.3: focus stays on Restore. Set it explicitly: WebKit does not focus buttons on click.
    button.focus()
  }

  function onDelete(id: string) {
    const index = entries.findIndex((e) => e.id === id)
    const result = deleteEntry(id)
    if (!result.ok) {
      dispatch({ type: 'historyRemoveFailed' })
      return
    }
    // AC-12.1: the next entry's Restore, else the previous one's, else the heading.
    const remaining = new Set(result.entries.map((e) => e.id))
    const next = entries.slice(index + 1).find((e) => remaining.has(e.id))
    const previous = entries
      .slice(0, Math.max(index, 0))
      .reverse()
      .find((e) => remaining.has(e.id))
    const target = next ?? previous
    pendingFocus.current = target ? { restore: target.id } : 'heading'
    dispatch({ type: 'historyChanged', entries: result.entries })
  }

  function onCancelClear() {
    setConfirming(false)
    pendingFocus.current = 'clearAll'
  }

  function onConfirmClear() {
    const result = clearHistory()
    setConfirming(false)
    if (result.ok) {
      pendingFocus.current = 'heading'
      dispatch({ type: 'historyChanged', entries: [] })
    } else {
      pendingFocus.current = 'clearAll'
      dispatch({ type: 'historyRemoveFailed' })
    }
  }

  return (
    <section className="card history-card">
      <h2 id="history-title" ref={headingRef} tabIndex={-1}>
        {copy.history.title}
      </h2>
      {!available ? (
        <p className="status">{copy.history.unavailable}</p>
      ) : entries.length === 0 ? (
        <p className="status">{copy.history.empty}</p>
      ) : (
        <ul ref={listRef} className="history-list" aria-labelledby="history-title">
          {entries.map((entry) => (
            <HistoryEntry key={entry.id} entry={entry} onRestore={onRestore} onDelete={onDelete} />
          ))}
        </ul>
      )}
      <div aria-live="polite">
        {removeFailed && <p className="field-error">{copy.history.removeFailed}</p>}
      </div>
      <button
        type="button"
        ref={clearAllRef}
        className="secondary"
        disabled={!available || entries.length === 0}
        onClick={() => setConfirming(true)}
      >
        {copy.history.clearAll}
      </button>
      <ConfirmDialog open={confirming} onCancel={onCancelClear} onConfirm={onConfirmClear} />
    </section>
  )
}
