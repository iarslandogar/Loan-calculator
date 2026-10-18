import { useEffect, useRef } from 'react'
import { copy } from '../copy'

interface ConfirmDialogProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

// Spec §8.3 (D-20, D-30): native modal <dialog>, no JS focus trap. Focus is set in code:
// Cancel when it opens; the parent moves focus after it closes.
export function ConfirmDialog({ open, onCancel, onConfirm }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      cancelRef.current?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="confirm-dialog"
      aria-labelledby="clear-dialog-text"
      aria-describedby="clear-dialog-hint"
      onCancel={(event) => {
        // Escape: close through state, so focus handling stays in one place.
        event.preventDefault()
        onCancel()
      }}
    >
      <p id="clear-dialog-text" className="dialog-text">
        {copy.dialog.clearText}
      </p>
      <p id="clear-dialog-hint" className="hint">
        {copy.dialog.clearHint}
      </p>
      <div className="actions">
        <button type="button" ref={cancelRef} className="secondary" onClick={onCancel}>
          {copy.dialog.cancel}
        </button>
        <button type="button" className="primary" onClick={onConfirm}>
          {copy.dialog.confirm}
        </button>
      </div>
    </dialog>
  )
}
