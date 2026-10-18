import { formatMoney } from '../../../domain/money'
import { Decimal } from '../../../domain/money'
import type { CalculatedLoan, Currency } from '../../../domain/types'
import { copy } from '../../copy'
import { AxisEnds, HoverBand, Tooltip } from './ChartParts'
import { VIEW_H, VIEW_W, groupCount, ratio, stepBandPath, useBandHover } from './chartGeometry'

/** S-21: the balance after each month, as one stepped area falling to zero. */
export function BalanceChart({ loan, currency }: { loan: CalculatedLoan; currency: Currency }) {
  const { rows, input } = loan
  const n = rows.length
  const { index, handlers } = useBandHover(n)
  const tops = rows.map((row) => ratio(row.balance, input.amount))
  const summary = copy.chart.balance.summary(
    formatMoney(input.amount, currency),
    formatMoney(new Decimal(0), currency),
    groupCount(n),
    n,
  )
  const hovered = index === null ? undefined : rows[index]
  return (
    <div className="chart-block">
      <h3 className="chart-title">{copy.chart.balance.title}</h3>
      <figure className="chart">
        <div className="chart-plot-wrap">
          <svg
            className="chart-plot"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            data-hit-area=""
            {...handlers}
          >
            <HoverBand index={index} count={n} />
            <path className="mark-principal" data-series="balance" d={stepBandPath(tops)} />
          </svg>
          <Tooltip index={index} count={n}>
            {hovered &&
              copy.chart.balance.tooltip(hovered.month, formatMoney(hovered.balance, currency))}
          </Tooltip>
        </div>
        <AxisEnds count={n} />
        <figcaption>{summary}</figcaption>
      </figure>
    </div>
  )
}
