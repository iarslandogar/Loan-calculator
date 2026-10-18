import { formatDateTime, formatRate, formatTenure } from '../../domain/format'
import { Decimal, formatMoney } from '../../domain/money'
import type { HistoryEntry as Entry } from '../../storage/history'
import { copy } from '../copy'

interface HistoryEntryProps {
  entry: Entry
  onRestore: (entry: Entry, button: HTMLButtonElement) => void
  onDelete: (id: string) => void
}

/** One saved calculation: three lines (spec §7) and its Restore/Delete buttons (D-29 names). */
export function HistoryEntry({ entry, onRestore, onDelete }: HistoryEntryProps) {
  const { input, currency } = entry
  const line1 = copy.history.line1(
    formatMoney(new Decimal(input.amount), currency),
    formatRate(new Decimal(input.rate)),
    formatTenure(input.tenure, input.unit),
  )
  // The stored payment was checked against the recomputed one on load (§9.2), so they are equal.
  const line2 = copy.history.line2(formatMoney(new Decimal(entry.monthlyPayment), currency))
  const datetime = formatDateTime(new Date(entry.createdAt))

  return (
    <li className="history-entry" data-entry-id={entry.id}>
      <div className="entry-text">
        <p className="entry-line1">{line1}</p>
        <p>{line2}</p>
        <p className="entry-time">{copy.history.line3(datetime)}</p>
      </div>
      <div className="entry-actions">
        <button
          type="button"
          className="secondary"
          data-action="restore"
          aria-label={copy.history.restoreName(line1, datetime)}
          onClick={(event) => onRestore(entry, event.currentTarget)}
        >
          {copy.history.restore}
        </button>
        <button
          type="button"
          className="secondary"
          aria-label={copy.history.deleteName(line1, datetime)}
          onClick={() => onDelete(entry.id)}
        >
          {copy.history.delete}
        </button>
      </div>
    </li>
  )
}
