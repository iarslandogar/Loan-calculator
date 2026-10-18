import { formatAmount, formatMoney } from '../../../domain/money'
import { yearlySummary } from '../../../domain/summary'
import type { CalculatedLoan, Currency } from '../../../domain/types'
import { copy } from '../../copy'
import { AxisEnds, HoverBand, Legend, Tooltip } from './ChartParts'
import { VIEW_H, VIEW_W, barsPath, ratio, useBandHover } from './chartGeometry'

/** S-19: interest vs principal per year, as stacked bars plus the same figures in a table. */
export function YearlySummary({ loan, currency }: { loan: CalculatedLoan; currency: Currency }) {
  const years = yearlySummary(loan)
  const n = years.length
  const { index, handlers } = useBandHover(n)
  const totals = years.map((y) => y.principal.plus(y.interest))
  const max = totals.reduce((m, t) => (t.gt(m) ? t : m), totals[0]!)
  const principalTops = years.map((y) => ratio(y.principal, max))
  const totalTops = totals.map((t) => ratio(t, max))
  const hovered = index === null ? undefined : years[index]
  return (
    <div className="chart-block yearly">
      <h3 id="yearly-title" className="chart-title">
        {copy.yearly.title}
      </h3>
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
              d={barsPath(principalTops, new Array<number>(n).fill(0))}
            />
            <path
              className="mark-interest"
              data-series="interest"
              d={barsPath(totalTops, principalTops)}
            />
          </svg>
          <Tooltip index={index} count={n}>
            {hovered &&
              copy.yearly.tooltip(
                hovered.year,
                formatMoney(hovered.principal, currency),
                formatMoney(hovered.interest, currency),
              )}
          </Tooltip>
        </div>
        <AxisEnds count={n} />
        <Legend />
        <figcaption>{copy.yearly.chartCaption}</figcaption>
      </figure>
      <table className="yearly-table" aria-labelledby="yearly-title">
        <thead>
          <tr>
            {copy.yearly.cols(currency).map((col) => (
              <th key={col} scope="col">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {years.map((y) => (
            <tr key={y.year}>
              <td>{y.year}</td>
              <td>{formatAmount(y.interest)}</td>
              <td>{formatAmount(y.principal)}</td>
              <td>{formatAmount(y.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
