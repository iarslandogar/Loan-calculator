import { formatAmount } from '../../domain/money'
import type { Currency, ScheduleRow } from '../../domain/types'
import { copy } from '../copy'

// Spec §8.2: a semantic table in a focusable, scrollable region. Both carry the name
// "Repayment schedule". The wrapper is a <div>, not a <section>, so only one region has it.
export function ScheduleTable({ rows, currency }: { rows: ScheduleRow[]; currency: Currency }) {
  return (
    <div className="schedule">
      <h2 id="schedule-title">{copy.schedule.title}</h2>
      <div className="schedule-scroll" role="region" aria-label={copy.schedule.title} tabIndex={0}>
        <table aria-labelledby="schedule-title">
          <thead>
            <tr>
              {copy.schedule.cols(currency).map((col) => (
                <th key={col} scope="col">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>{formatAmount(row.payment)}</td>
                <td>{formatAmount(row.interest)}</td>
                <td>{formatAmount(row.principal)}</td>
                <td>{formatAmount(row.balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
