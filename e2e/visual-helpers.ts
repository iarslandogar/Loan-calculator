// Helpers for the chart specs (S-19 to S-22; D-65, D-66). Imports only from ./fixtures, never from src/.
// Hover geometry follows D-66: item k of n sits at x = (k - 0.5) / n of the width of [data-hit-area].
import type { Locator, Page } from '@playwright/test'
import { box, expect, type Rgb } from './fixtures'

export const CHART_TITLES = [
  'Cost breakdown',
  'Balance over time',
  'Interest and principal in each payment',
  'Yearly summary',
] as const

/** Chart summary sentences (spec section 7), hard-coded for the reference loans. */
export const SUMMARY = {
  costA: 'Interest is 6.2% of the total amount payable.',
  costB: 'Interest is 34.4% of the total amount payable.',
  costC: 'Interest is 0.0% of the total amount payable.',
  costD: 'Interest is 0.8% of the total amount payable.',
  balanceA: 'The balance falls from Rs 1,000,000.00 to Rs 0.00 over 12 months.',
  balanceB: 'The balance falls from Rs 2,500,000.00 to Rs 0.00 over 60 months.',
  balanceD: 'The balance falls from Rs 100,000.00 to Rs 0.00 over 1 month.',
  makeupA: 'Interest is 11.3% of the first payment and 1.0% of the last.',
  makeupB: 'Interest is 59.1% of the first payment and 1.5% of the last.',
} as const

/** A chart figure, named by its figcaption (spec 8.3.1). */
export const figureNamed = (page: Page, summary: string): Locator =>
  page.getByRole('figure', { name: summary, exact: true })

export const allFigures = (page: Page): Locator => page.getByRole('figure')

/**
 * The yearly chart's caption is not fixed by the spec, so it is found by position: the four charts are
 * in the order cost, balance, make-up, yearly (spec 8.3.2).
 */
export const yearlyFigure = (page: Page): Locator => allFigures(page).nth(3)

export const yearlyTable = (page: Page): Locator =>
  page.getByRole('table', { name: 'Yearly summary' })

/** Integer cents -> "1,234.56" (independent of the app's formatter). */
export function fmtCents(c: bigint): string {
  const whole = (c / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${whole}.${String(c % 100n).padStart(2, '0')}`
}

/** Moves the pointer over item k of n inside the figure's [data-hit-area] (D-66). */
export async function hoverItem(figure: Locator, k: number, n: number): Promise<void> {
  const area = figure.locator('[data-hit-area]')
  await expect(area, 'the figure has exactly one [data-hit-area]').toHaveCount(1)
  const b = await box(area)
  await area.hover({ position: { x: ((k - 0.5) / n) * b.width, y: b.height / 2 } })
}

/** Hover item k of n and expect the single tooltip to read exactly `text`. */
export async function expectTooltip(
  page: Page,
  figure: Locator,
  k: number,
  n: number,
  text: string | RegExp,
): Promise<void> {
  await hoverItem(figure, k, n)
  await expect(page.getByRole('tooltip')).toHaveText(text)
}

/** Legend entries are HTML text; Principal must come before Interest (spec 8.3.2). */
export async function expectLegendPrincipalThenInterest(figure: Locator): Promise<void> {
  const principal = figure.getByText('Principal', { exact: true }).first()
  const interest = figure.getByText('Interest', { exact: true }).first()
  await expect(principal).toBeVisible()
  await expect(interest).toBeVisible()
  const handleP = await principal.elementHandle()
  const handleI = await interest.elementHandle()
  const principalFirst = await handleP!.evaluate(
    (p, i) => Boolean(p.compareDocumentPosition(i as Node) & Node.DOCUMENT_POSITION_FOLLOWING),
    handleI,
  )
  expect(principalFirst, 'Principal comes before Interest in the legend').toBe(true)
}

export interface SeriesColour {
  series: string
  tag: string
  /** r, g, b, effective alpha 0..1 */
  rgba: [number, number, number, number]
}

/** Computed colour of every [data-series] mark: fill, else stroke (SVG); background-color (HTML). */
export async function readMarkColours(page: Page): Promise<SeriesColour[]> {
  return page.evaluate(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) throw new Error('no 2d canvas')
    const resolve = (value: string): [number, number, number, number] | null => {
      if (!value || value === 'none') return null
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'
      ctx.fillStyle = value
      ctx.fillRect(0, 0, 1, 1)
      const d = ctx.getImageData(0, 0, 1, 1).data
      if (d[3] === 0) return null
      return [d[0] ?? 0, d[1] ?? 0, d[2] ?? 0, (d[3] ?? 0) / 255]
    }
    const out: { series: string; tag: string; rgba: [number, number, number, number] }[] = []
    document.querySelectorAll('[data-series]').forEach((el) => {
      if (el.getClientRects().length === 0) return
      const cs = getComputedStyle(el)
      const series = el.getAttribute('data-series') ?? ''
      let colour: [number, number, number, number] | null = null
      let extra = parseFloat(cs.opacity)
      if (el instanceof SVGElement) {
        colour = resolve(cs.fill)
        if (colour) extra *= parseFloat(cs.fillOpacity)
        else {
          colour = resolve(cs.stroke)
          if (colour) extra *= parseFloat(cs.strokeOpacity)
        }
      } else {
        colour = resolve(cs.backgroundColor)
      }
      out.push({
        series,
        tag: el.tagName.toLowerCase(),
        rgba: colour ? [colour[0], colour[1], colour[2], colour[3] * extra] : [0, 0, 0, 0],
      })
    })
    return out
  })
}

export interface TextColour {
  text: string
  rgba: [number, number, number, number]
}

/** Computed colour of every piece of text inside a chart figure, plus the four chart titles. */
export async function readChartTextColours(
  page: Page,
  titles: readonly string[],
): Promise<TextColour[]> {
  return page.evaluate((titleList) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) throw new Error('no 2d canvas')
    const resolve = (value: string): [number, number, number, number] => {
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = 'rgba(0, 0, 0, 0)'
      ctx.fillStyle = value
      ctx.fillRect(0, 0, 1, 1)
      const d = ctx.getImageData(0, 0, 1, 1).data
      return [d[0] ?? 0, d[1] ?? 0, d[2] ?? 0, (d[3] ?? 0) / 255]
    }
    const seen = new Set<Element>()
    const out: { text: string; rgba: [number, number, number, number] }[] = []
    const consider = (el: Element) => {
      if (seen.has(el)) return
      seen.add(el)
      const own = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => (n.textContent ?? '').trim())
        .join('')
      if (!own || el.getClientRects().length === 0) return
      const cs = getComputedStyle(el)
      const c = resolve(el instanceof SVGElement ? cs.fill : cs.color)
      const alpha = c[3] * parseFloat(cs.opacity)
      out.push({ text: own, rgba: [c[0], c[1], c[2], alpha] })
    }
    document.querySelectorAll('figure, figure *').forEach(consider)
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((h) => {
      if (titleList.includes((h.textContent ?? '').trim())) {
        consider(h)
        h.querySelectorAll('*').forEach(consider)
      }
    })
    return out
  }, titles)
}

/** Composites an rgba colour over an opaque surface. */
export function over([r, g, b, a]: [number, number, number, number], surface: Rgb): Rgb {
  return [
    Math.round(a * r + (1 - a) * surface[0]),
    Math.round(a * g + (1 - a) * surface[1]),
    Math.round(a * b + (1 - a) * surface[2]),
  ]
}
