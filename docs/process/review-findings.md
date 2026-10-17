# Review findings

## 2026-10-18: Mini-gate G4.1 (domain layer: S-1, S-2, S-3, S-10, S-13)

Scope: `src/domain/{money,parse,validate,loan,format}.ts`, commits 9db17a8..47e14e4 on `v1`. UI absent; E2E not part of this gate.

### Gate evidence

| Command | Result |
|---|---|
| `npx vitest run --project domain` | 7 files, 294 tests passed, exit 0 |
| `npm run lint` | exit 0 (0 warnings) |
| `npm run typecheck` | exit 0 |
| `npm run format:check` | "All matched files use Prettier code style!" |
| `git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'` | empty: no change in the freeze scope since G3; no skip/only/fixme/fail introduced |

### Conformance checked (no defect found)

- 4.1: trim; D-26 strict western/lakh grouping, sign handled, comma after `.` rejected; rate strips exactly one `%`.
- 4.2: order empty, format, precision, range; `\d` is ASCII only (`١٢`, `１٢` give NAN); all comparisons in `Decimal`; tenure 40-nines gives RANGE; `-0` rate gives 0 (normalised); `-0`/`-0.00` amount gives RANGE.
- 5.1/5.2: line-for-line match, including D-37 multiply-first interest and the last-month rule (principal = balance). L-MAX (1e9, 50%, 480 months): 16 ms, final balance 0, total payable $20,000,000,061.79 (matches spec 6 example). 0% rate with 480 months: sum of principal = 1000 exactly, balance 0.
- 6: no Intl or toLocaleString; `formatAmount` uses `toFixed` (no exponent; 1e30 prints in full); `-0` and `-0.001` print `0.00`; `0.005` gives `0.01`.
- D-36: single cloned Decimal, no `Decimal.set`, only `money.ts` imports `decimal.js`; no domain import from `ui/` or `storage/`.
- Money as `number`: none. Sole `toNumber()` is the tenure (1..480, already range-checked, so safe).
- Hostile input (probe `e2e/review/domain-probe.spec.ts`, output reviewed): `+5`, `1e6`, `Infinity`, `NaN`, `0x10`, `١٢`, `１２`, `10\t00`, `1 000`, `1,,000`, `1.2.3`-style all give the NAN/WHOLE codes; NBSP and trailing newline are trimmed; 10,000-char strings give RANGE or DECIMALS without throwing; `validateInputs` never threw on any probe.

### Findings

| ID | Severity | Story/AC | Evidence | Suggested fix |
|---|---|---|---|---|
| (none) | n/a | n/a | No Blocker or Major defect found in the domain layer. | n/a |
| M-1 | Minor | S-11 (formatDateTime) | `format.ts` does not zero-pad years below 1000; unreachable with real dates. | None needed; optional. |
| M-2 | Minor | Process | `e2e/review/domain-probe.spec.ts` is an observation-only probe (no assertions). `testDir: 'e2e'` means it also runs under `npm run test:e2e` in 3 browsers. | Delete it before `verify`, or keep it as a no-op; it asserts nothing. |
| M-3 | Minor | S-2 | `normaliseTenure` is a bare `trim()`, and `Partial<Record<Field, ErrorCode>>` is built imperatively; fine, just note `checkTenure` returns `value.toNumber()` of a `Decimal` that is only bounded by the range check above it (order matters; add a comment if reordered). | None. |

Update (coordinator request): the observation-only probe `e2e/review/domain-probe.spec.ts` (M-2) has been deleted; M-2 is resolved. Its results are recorded above.

Observation: the UI-level cases from the brief (double Calculate, restore race, two tabs, zoom, back button) cannot be tested until group 2.

BLOCKING FINDINGS: 0
