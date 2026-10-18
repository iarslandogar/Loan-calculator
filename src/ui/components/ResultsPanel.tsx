import { useApp } from '../AppContext'
import { copy } from '../copy'
import { ResultsSummary } from './ResultsSummary'
import { RoundingNote } from './RoundingNote'
import { ScheduleTable } from './ScheduleTable'

export function ResultsPanel() {
  const { state } = useApp()
  const { results, settings } = state
  return (
    <section className="card results-card">
      {/* The idle and stale texts are announced politely when they appear (D-49). */}
      <div aria-live="polite">
        {results.status === 'idle' && <p className="status">{copy.results.idle}</p>}
        {/* status-stale lets the design make the stale state unmistakable (D-63, P1). */}
        {results.status === 'stale' && <p className="status status-stale">{copy.results.stale}</p>}
      </div>
      {results.status === 'shown' && (
        <>
          <ResultsSummary loan={results.loan} currency={settings.currency} />
          {results.loan.showRoundingNote && <RoundingNote />}
          <ScheduleTable rows={results.loan.rows} currency={settings.currency} />
        </>
      )}
    </section>
  )
}
