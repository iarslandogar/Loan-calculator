// Every user-visible string (spec §7), character for character. Components never hard-code text.
// Apostrophes are the ASCII ' character.
import type { Currency, ErrorCode, Unit } from '../domain/types'

const symbol = (currency: Currency) => (currency === 'PKR' ? 'Rs' : '$')

export const copy = {
  app: {
    title: 'Loan EMI Calculator',
    tagline: 'Work out the monthly payment, total cost and repayment schedule of a loan.',
  },
  theme: {
    label: 'Theme',
    options: { system: 'System', light: 'Light', dark: 'Dark' },
  },
  currency: {
    label: 'Currency',
    options: { PKR: 'PKR (Rs)', USD: 'USD ($)' } satisfies Record<Currency, string>,
    note: 'Changing currency changes the symbol only. Amounts are not converted.',
  },
  field: {
    amount: (currency: Currency) => `Loan amount (${symbol(currency)})`,
    rate: 'Annual interest rate (%)',
    tenure: 'Loan tenure',
    unit: 'Tenure unit',
    unitOptions: { years: 'Years', months: 'Months' } satisfies Record<Unit, string>,
  },
  btn: {
    calculate: 'Calculate',
    reset: 'Reset',
  },
  results: {
    idle: 'Enter your loan details and select Calculate.',
    stale: 'Your inputs have changed. Select Calculate to see updated results.',
  },
  summary: {
    monthly: 'Monthly payment',
    interest: 'Total interest',
    total: 'Total amount payable',
  },
  note: {
    rounding: 'Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.',
  },
  schedule: {
    title: 'Repayment schedule',
    cols: (currency: Currency) => {
      const s = `(${symbol(currency)})`
      return ['Month', `Payment ${s}`, `Interest ${s}`, `Principal ${s}`, `Balance ${s}`]
    },
  },
  history: {
    title: 'Saved calculations',
    empty: 'No saved calculations yet.',
    unavailable: "Saved calculations aren't available in this browser. Calculations still work.",
    line1: (amount: string, rate: string, tenure: string) => `${amount} at ${rate} for ${tenure}`,
    line2: (monthly: string) => `${monthly} per month`,
    line3: (datetime: string) => datetime,
    restore: 'Restore',
    restoreName: (line1: string, datetime: string) => `Restore ${line1}, saved ${datetime}`,
    delete: 'Delete',
    deleteName: (line1: string, datetime: string) => `Delete ${line1}, saved ${datetime}`,
    clearAll: 'Clear all',
    removeFailed:
      "Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.",
  },
  dialog: {
    clearText: "Clear all saved calculations? This can't be undone.",
    clearHint: "This doesn't clear the form. Select Reset to do that.",
    cancel: 'Cancel',
    confirm: 'Clear',
  },
  err: {
    AMOUNT_REQUIRED: 'Enter a loan amount.',
    AMOUNT_NAN: 'Loan amount must be a number.',
    AMOUNT_DECIMALS: 'Loan amount can have at most 2 decimal places.',
    AMOUNT_RANGE: 'Loan amount must be between 10 and 1,000,000,000,000,000.',
    RATE_REQUIRED: 'Enter an interest rate.',
    RATE_NAN: 'Interest rate must be a number.',
    RATE_DECIMALS: 'Interest rate can have at most 2 decimal places.',
    RATE_RANGE: 'Interest rate must be between 0 and 75%.',
    TENURE_REQUIRED: 'Enter a loan tenure.',
    TENURE_WHOLE: 'Loan tenure must be a whole number.',
    TENURE_RANGE_YEARS: 'Loan tenure must be between 1 and 100 years.',
    TENURE_RANGE_MONTHS: 'Loan tenure must be between 1 and 1,200 months.',
  } satisfies Record<ErrorCode, string>,
  fatal: 'Something went wrong. Please reload the page.',
} as const
