import { formatPercent } from '../../../domain/format'
import { costSplit } from '../../../domain/summary'
import type { CalculatedLoan } from '../../../domain/types'
import { copy } from '../../copy'
import { Legend } from './ChartParts'

/** S-20: one bar, loan amount vs interest, with the share of interest in words. */
export function CostBreakdown({ loan }: { loan: CalculatedLoan }) {
  const { interestPercent, loanPercent } = costSplit(loan)
  const summary = copy.chart.cost.summary(formatPercent(interestPercent))
  return (
    <div className="chart-block">
      <h3 className="chart-title">{copy.chart.cost.title}</h3>
      <figure className="chart">
        {/* Flex weights are the two percentages, so widths are exactly proportional (AC-20.4). */}
        <div className="cost-bar" aria-hidden="true">
          <span
            className="cost-segment"
            data-segment="loan"
            data-series="loan"
            style={{ flexGrow: loanPercent.toNumber() }}
          />
          {!interestPercent.isZero() && (
            <span
              className="cost-segment"
              data-segment="interest"
              data-series="interest"
              style={{ flexGrow: interestPercent.toNumber() }}
            />
          )}
        </div>
        <Legend first={copy.chart.cost.loan} second={copy.chart.cost.interest} />
        <figcaption>{summary}</figcaption>
      </figure>
    </div>
  )
}
