import { Fragment } from 'react'

/**
 * Renders text with a line-break opportunity (<wbr>) after every comma, so long amounts wrap
 * between digit groups instead of mid-number (G4.3/D-54 review D54-3). <wbr> adds no text, so
 * textContent and accessible names are unchanged.
 */
export function BreakAfterCommas({ text }: { text: string }) {
  const parts = text.split(',')
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <>
              ,<wbr />
            </>
          )}
        </Fragment>
      ))}
    </>
  )
}
