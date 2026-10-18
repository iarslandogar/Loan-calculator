import { formatPercent } from '../../../domain/format'
import { formatMoney } from '../../../domain/money'
import { interestShare } from '../../../domain/summary'
import type { CalculatedLoan, Currency } from '../../../domain/types'
import { copy } from '../../copy'
import { AxisEnds, HoverBand, Legend, Tooltip } from './ChartParts'
import { VIEW_H, VIEW_W, ratio, stepBandPath, useBandHover } from './chartGeometry'

/** S-22: each payment stacked as principal (bottom) and interest (top). */
export function PaymentMakeupChart({
  loan,
  currency,
}: {
  loan: CalculatedLoan
  currency: Currency
}) {
  const { rows } = loan
  const n = rows.length
  const { index, handlers } = useBandHover(n)
  const max = rows.reduce((m, row) => (row.payment.gt(m) ? row.payment : m), rows[0]!.payment)
  const principalTops = rows.map((row) => ratio(row.principal, max))
  const paymentTops = rows.map((row) => ratio(row.payment, max))
  const first = rows[0]!
  const last = rows[n - 1]!
  const summary = copy.chart.makeup.summary(
    formatPercent(interestShare(first.payment, first.interest)),
    formatPercent(interestShare(last.payment, last.interest)),
  )
  const hovered = index === null ? undefined : rows[index]
  return (
    <div className="chart-block">
      <h3 className="chart-title">{copy.chart.makeup.title}</h3>
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
            <path
              className="mark-principal"
              data-series="principal"
              d={stepBandPath(principalTops)}
            />
            <path
              className="mark-interest"
              data-series="interest"
              d={stepBandPath(paymentTops, principalTops)}
            />
          </svg>
          <Tooltip index={index} count={n}>
            {hovered &&
              copy.chart.makeup.tooltip(
                hovered.month,
                formatMoney(hovered.principal, currency),
                formatMoney(hovered.interest, currency),
              )}
          </Tooltip>
        </div>
        <AxisEnds count={n} />
        <Legend />
        <figcaption>{summary}</figcaption>
      </figure>
    </div>
  )
}
