import { memo, useEffect, useRef } from 'react'
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
  const cardRef = useRef<HTMLElement>(null)
  const shownLoan = results.status === 'shown' ? results.loan : null

  // On the stacked (phone) layout, new results can land below the screen, or above it after a
  // Restore from the bottom, so nothing seems to happen (F-P5-2, D-76). Bring the card into view,
  // instantly. Focus stays where it is (spec §8.3). Measured one frame later so the check never
  // forces a layout inside the Calculate click (AC-10.8, D-72).
  useEffect(() => {
    if (!shownLoan || typeof window.matchMedia !== 'function') return
    if (!window.matchMedia('(max-width: 768px)').matches) return
    const frame = requestAnimationFrame(() => {
      const card = cardRef.current
      if (!card) return
      const top = card.getBoundingClientRect().top
      if (top < 0 || top > window.innerHeight / 2) card.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [shownLoan])

  return (
    <section ref={cardRef} className="card results-card">
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
