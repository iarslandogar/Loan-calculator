// Shared chart geometry (spec §8.3.2, D-66, D-68). Every chart uses the same band layout:
// item k (0-based) of n occupies [k/n, (k+1)/n] of the plot width, so its centre is at
// (k + 0.5) / n, which is where the hover hook in the DOM contract expects it.
import { useState, type PointerEvent } from 'react'
import { Decimal } from '../../../domain/money'

/** The SVG plot is drawn in this viewBox and stretched to the card (preserveAspectRatio="none"). */
export const VIEW_W = 1000
export const VIEW_H = 100

/**
 * A dimensionless 0..1 ratio for drawing. Computed in Decimal; only the ratio (never a money
 * value) becomes a JS number, and only for pixel geometry (D-68).
 */
export function ratio(value: Decimal, max: Decimal): number {
  if (max.isZero()) return 0
  return value.div(max).toDecimalPlaces(6).toNumber()
}

/** y coordinate (0 = top) for a ratio of the plot height. */
const y = (r: number) => VIEW_H - r * VIEW_H

/**
 * One closed path: a stepped band between `bottom` and `top` ratios for every item.
 * Drawing all items as one path keeps 1,200 months to a single SVG element.
 */
export function stepBandPath(top: number[], bottom?: number[]): string {
  const n = top.length
  if (n === 0) return ''
  const w = VIEW_W / n
  const upper: string[] = []
  const lower: string[] = []
  for (let k = 0; k < n; k++) {
    const x0 = (k * w).toFixed(3)
    const x1 = ((k + 1) * w).toFixed(3)
    const t = y(top[k] ?? 0).toFixed(3)
    const b = y(bottom?.[k] ?? 0).toFixed(3)
    upper.push(`L${x0},${t}L${x1},${t}`)
    lower.unshift(`L${x1},${b}L${x0},${b}`)
  }
  const start = y(bottom?.[0] ?? 0).toFixed(3)
  return `M0,${start}${upper.join('')}${lower.join('')}Z`
}

/** One path of separate bars (one per item) between `bottom` and `top` ratios. */
export function barsPath(top: number[], bottom: number[], fill = 0.64): string {
  const n = top.length
  const band = VIEW_W / n
  const width = band * fill
  return top
    .map((t, k) => {
      const x = k * band + (band - width) / 2
      const yTop = y(t)
      const yBottom = y(bottom[k] ?? 0)
      const h = yBottom - yTop
      if (h <= 0) return ''
      return `M${x.toFixed(3)},${yTop.toFixed(3)}h${width.toFixed(3)}v${h.toFixed(3)}h${(-width).toFixed(3)}Z`
    })
    .join('')
}

/** The x position, as a percentage of the plot width, of the centre of item k of n. */
export const centrePercent = (k: number, n: number) => ((k + 0.5) / n) * 100

/** Pointer hover over the plot: which item (0-based) is under the pointer, or null. */
export function useBandHover(count: number) {
  const [index, setIndex] = useState<number | null>(null)
  const onPointerMove = (event: PointerEvent<Element>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (rect.width <= 0) return
    const f = (event.clientX - rect.left) / rect.width
    setIndex(Math.min(count - 1, Math.max(0, Math.floor(f * count))))
  }
  const onPointerLeave = () => setIndex(null)
  return { index, handlers: { onPointerMove, onPointerLeave } }
}

/** "1200" → "1,200" (counts only; never used for money). */
export const groupCount = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
