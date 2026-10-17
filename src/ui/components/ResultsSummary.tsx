import { formatMoney } from '../../domain/money'
import type { CalculatedLoan, Currency } from '../../domain/types'
import { copy } from '../copy'

// Spec §8.3.1: each <dd> is named by its <dt>, so tests find figures by role and name.
export function ResultsSummary({ loan, currency }: { loan: CalculatedLoan; currency: Currency }) {
  const figures = [
    { id: 'summary-monthly', label: copy.summary.monthly, value: loan.monthlyPayment },
    { id: 'summary-interest', label: copy.summary.interest, value: loan.totalInterest },
    { id: 'summary-total', label: copy.summary.total, value: loan.totalPayable },
  ]
  return (
    <dl className="summary">
      {figures.map((f) => (
        <div key={f.id} className={f.id === 'summary-monthly' ? 'figure headline' : 'figure'}>
          <dt id={f.id}>{f.label}</dt>
          <dd aria-labelledby={f.id}>{formatMoney(f.value, currency)}</dd>
        </div>
      ))}
    </dl>
  )
}
