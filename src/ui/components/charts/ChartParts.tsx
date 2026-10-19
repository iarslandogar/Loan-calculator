import type { ReactNode } from 'react'
import { copy } from '../../copy'
import { VIEW_H, VIEW_W, centrePercent, groupCount } from './chartGeometry'

/** HTML legend (spec §8.3.2): Principal first, Interest second, in every chart. */
export function Legend({
  first = copy.chart.series.principal,
  second = copy.chart.series.interest,
}: {
  first?: string
  second?: string
}) {
  return (
    <ul className="chart-legend">
      <li>
        <span className="swatch swatch-principal" aria-hidden="true" />
        {first}
      </li>
      <li>
        <span className="swatch swatch-interest" aria-hidden="true" />
        {second}
      </li>
    </ul>
  )
}

/** First and last item numbers under the plot (numbers only; no new words, D-68), grouped like the caption (F-P5-5). */
export function AxisEnds({ count }: { count: number }) {
  return (
    <div className="chart-axis">
      <span>1</span>
      {count > 1 && <span>{groupCount(count)}</span>}
    </div>
  )
}

/** The pointer tooltip, kept inside the plot's width at both ends. */
export function Tooltip({
  index,
  count,
  children,
}: {
  index: number | null
  count: number
  children: ReactNode
}) {
  if (index === null) return null
  const left = centrePercent(index, count)
  return (
    <div
      role="tooltip"
      className="chart-tooltip"
      style={{ left: `${left}%`, transform: `translateX(-${left}%)` }}
    >
      {children}
    </div>
  )
}

/** A faint highlight of the hovered band (decorative; not a data mark). */
export function HoverBand({ index, count }: { index: number | null; count: number }) {
  if (index === null) return null
  const width = VIEW_W / count
  return <rect className="chart-hover-band" x={index * width} y={0} width={width} height={VIEW_H} />
}
