import { memo } from 'react'
import type { CalculatedLoan, Currency } from '../../domain/types'
import { useApp } from '../AppContext'
import { copy } from '../copy'
import { BalanceChart } from './charts/BalanceChart'
import { CostBreakdown } from './charts/CostBreakdown'
import { PaymentMakeupChart } from './charts/PaymentMakeupChart'
import { YearlySummary } from './charts/YearlySummary'
import { ResultsSummary } from './ResultsSummary'
import { RoundingNote } from './RoundingNote'
import { ScheduleTable } from './ScheduleTable'

/**
 * The charts and the schedule redraw only when the loan or currency changes, not on every app
 * state change (for example the history save right after Calculate). Up to 1,200 rows (D-70).
 */
const ResultsDetail = memo(function ResultsDetail({
  loan,
  currency,
}: {
  loan: CalculatedLoan
  currency: Currency
}) {
  return (
    <>
      {/* Spec §8.3.2 order: cost, balance, payment make-up, yearly, then the schedule. */}
      <CostBreakdown loan={loan} />
      <BalanceChart loan={loan} currency={currency} />
      <PaymentMakeupChart loan={loan} currency={currency} />
      <YearlySummary loan={loan} currency={currency} />
      <ScheduleTable rows={loan.rows} currency={currency} />
    </>
  )
})

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
          <ResultsDetail loan={results.loan} currency={settings.currency} />
        </>
      )}
    </section>
  )
}
