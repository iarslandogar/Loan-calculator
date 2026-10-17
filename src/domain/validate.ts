// Field rules → typed result or error codes (spec §4.2). Never throws on user input.
import type { RawInputs, ValidationResult } from './types'

export function validateInputs(_raw: RawInputs): ValidationResult {
  throw new Error('NOT_IMPLEMENTED')
}
