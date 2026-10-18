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

## 2026-10-18: Mini-gate G4.2 (core UI: S-1, S-2, S-3, S-4, S-9)

Scope: commits 9f2c633..8c6590a on `v1`: `src/ui/**`, `src/main.tsx`, `eslint.config.js`. Domain layer was reviewed at G4.1.

### Gate evidence

| Command | Result |
|---|---|
| `CI=1 npx playwright test e2e/s01-calculate e2e/s02-validation e2e/s03-totals e2e/s04-stale e2e/s09-reset` (chromium, firefox, webkit) | `6 failed, 138 passed (2.2m)`. 144 = 48 x 3, so 46/48 per browser, as claimed. (The shell `EXIT 0` I captured was from `tail`, not from Playwright; the runner reported 6 failures.) |
| `npm run lint` | exit 0 |
| `npm run typecheck` | exit 0 |
| `npm run format:check` | "All matched files use Prettier code style!" |
| `npx vitest run` | 7 files, 294 tests passed |
| Port 4173 after the review | no listener (only TIME_WAIT sockets) |

The 6 failures are exactly `[AC-4.4]` and `[AC-9.2]` in each browser. Verified:
- AC-9.2 (full output seen for webkit): `TimeoutError: locator.selectOption ... waiting for getByLabel('Theme', { exact: true })` at the `themeSel(page).selectOption(...)` line, which is the missing Theme control. Its currency step on the line before passed, and the failure comes before any saved-calculation step.
- AC-4.4: I read the test body (`e2e/s04-stale.spec.ts` lines 75-89). It switches currency to USD and checks `$88,848.79`, the table and no stale message (the app does this; same step passes in other tests), then uses `themeSel`, which does not exist. Same mechanism. Honesty note: the AC-4.4 call-log scrolled out of my captured output, so for AC-4.4 the evidence is the test body plus the identical missing-Theme failure pattern, not its own call-log.
- Both are pending group 4 (Theme) and group 5 (saved calculations) per D-47. Not counted as defects.

### Freeze check (spec §12.4, vs `g3-tests-approved`)

`git log -p g3-tests-approved..HEAD -- e2e/ 'src/**/*.test.*' test/ playwright.config.ts vitest.config.ts scripts/trace.mjs ':!e2e/review/'` shows exactly two commits, both authorised:
- 749144e (D-46): `e2e/s09-reset.spec.ts`, two expected strings changed from `Rs ...` to the `$` form.
- 5751988 (D-48): `e2e/fixtures.ts`, `summary()` from `getByRole('definition', { name, exact: true })` to `getByLabel(name, { exact: true })`.
Nothing else changed; no `.skip`, `.only`, `.fixme`, `test.fail`, deleted test or weakened assertion in the scope.

### Conformance (no defect found)

- 3.2 transitions (`appReducer.ts`): edit and setUnit clear only that field's error (unit clears tenure's); `shown` becomes `stale`; `idle` stays `idle`; editing back to the original text stays stale (no comparison with the old value). `invalid` sets all errors and `idle`. `calculated` clears errors. `reset` empties inputs, unit `years`, errors, `idle`, settings untouched. `setCurrency` leaves results alone. History and Restore are group 5 (state has no `history` yet; expected).
- 4 inputs: `type="text"`, `inputMode` decimal/decimal/numeric, `autoComplete="off"`; `<form noValidate>`; Calculate `type="submit"`, Reset `type="button"`.
- 7 copy: every backticked plain string in spec §7 was checked programmatically against `copy.ts` (all present); templated ones (amount label, column headers, history lines, Restore/Delete names) checked by reading. ASCII apostrophes. No user-visible literal in any component; all text goes through `copy`.
- 8.1 order: header, form (Currency + note, amount, rate, tenure + unit, Calculate, Reset), results. Saved calculations card and Theme select are later groups.
- 8.2: `<div role="region" aria-label tabIndex=0>` containing `<table aria-labelledby>` with `<th scope="col">`, sticky header, `overflow:auto`, `max-height: min(60vh, 480px)`, tabular-nums, right-aligned.
- 8.3: each field has an `id`'d `<p aria-live="polite">`; `aria-invalid` and `aria-describedby` only when invalid; focus goes to the first invalid field (amount, rate, tenure) and to Loan amount on Reset.
- 8.3.1: `<h1>`, labels, `<dl>` with `<dd aria-labelledby>`, plain-text idle/stale/rounding, `<h2>` schedule title.
- 10: `ErrorBoundary` wraps the app and renders `copy.fatal` with `role="alert"`. No test exercises it; code read only.
- Hard rules: no `number` for money in `ui/` (the only numeric field rendered is `row.month`, an index); money via `formatMoney`/`formatAmount`; no `Intl`/`toLocaleString`; `ui` imports `domain` only; no network, fonts or CDN; `lang="en"` and viewport meta present.

### Exploratory testing (real app, `CI=1`, all three browsers)

Everything below behaved correctly. The probe specs found no defect and were deleted, so there are no `[REVIEW-n]` tests and no assertion-free probes in `e2e/review/`.
- 10,000-char amount: error shown, field focused, no console error, no horizontal page scroll.
- Tabs and padding around values (`\t1000000\t`, ` 12% `, `\t1 `) calculate Rs 88,848.79.
- `dblclick` on Calculate plus 10 repeated Enter presses: exactly one table, Rs 1,066,185.45.
- Calculate, edit, focus the unit select, Reset: pristine form, unit back to Years, results and stale text gone, focus on Loan amount.
- Rate 12 to 13 and back to 12: stays stale. Currency change while stale: stays stale, label becomes `Loan amount ($)`, input kept, next Calculate gives `$88,848.79`.
- Keyboard-only entry of L-A (`1,000,000`, Enter): Rs 88,848.79.
- Failed Calculate over old results removes the table; fixing one field clears only that field's error.
- 360 px with L-MAX in months, and 360 px with all-empty errors: no page horizontal scroll. 180 px wide (200% zoom of 360): usable, no page scroll. A 360 px screenshot showed no overlap or clipping; the schedule scrolls inside its region.
- `١٢٣٤٥٦٧`, `１０００００`, `1,,000`, `1e6`, `+1000000` rejected with `aria-invalid` and no table; rates `00012`, `.5`, `5.`, `-0`, `0` never give `NaN` or a crash.
- Browser form-state restoration (reload, and back navigation after choosing Months): unit and currency selects stay in sync with app state in all three browsers (calculated 12 and compared the payment against the unit shown).
- Back button: the app has no routes or `pushState`, so there is nothing to test beyond leaving the page.

### Findings

| ID | Severity | Story/AC | Evidence | Suggested fix |
|---|---|---|---|---|
| (none) | n/a | n/a | No Blocker or Major defect found in group 2. | n/a |
| M-1 | Minor | Process, D-49.7 | Without `CI=1`, a stale `vite preview` on 4173 can be reused and give false results; `playwright.config.ts` is frozen. | Owner decision: approve `reuseExistingServer: false`, or document the `CI=1` convention in the README. |
| M-2 | Minor | Spec 8.3, a11y | The currency note (`<p className="hint">`) is not linked to the Currency select with `aria-describedby`, so a screen-reader user on the select does not hear it. | Give the note an id and add `aria-describedby` on the select (no copy change). |
| M-3 | Minor | Spec 10 | `ErrorBoundary` has no test or `componentDidCatch` logging, and only covers render errors (an exception inside `onSubmit` would bypass it). The domain never throws on user input, so this is theoretical. | Optional component test with a throwing child (needs owner approval as it is a new test after G3). |
| M-4 | Minor | Code quality | `AppContext` creates a new `{ state, dispatch }` object each render, so every consumer re-renders on any change; `main.tsx` silently renders nothing if `#root` is missing; `e.target.value as Unit/Currency` casts trust the DOM. | Memoise the context value; log or throw if `#root` is missing. |
| M-5 | Minor | S-3 layout | At 360 px the summary figures wrap inconsistently (Total interest value is beside its label, Total amount payable wraps below it), and each field always reserves an empty 1.5em error line. | CSS polish in the S-5 pass. |
| M-6 | Minor | CSS | Sticky `th` uses `--surface` while the scroll body uses `--bg`; fine in light theme, may clash with dark tokens. | Re-check when S-6 lands. |

Pending, not defects: AC-4.4 (needs Theme, group 4) and AC-9.2 (needs Theme and saved calculations, groups 4 and 5). They must not be reported as passing until those groups land.

BLOCKING FINDINGS: 0

---

## 2026-10-18, G4.3 (schedule UI, S-10 and S-13)

Reviewer: code-reviewer. No `src/` or frozen test edited. Group 3 had no new code; the schedule was reviewed as built in group 2 (9f2c633).

### Gate evidence (all with `CI=1`)
- `CI=1 npx playwright test e2e/s10-schedule.spec.ts e2e/s13-balance.spec.ts`: 54 passed (56.2 s), exit 0. Developer claim confirmed.
- `CI=1 npx playwright test e2e/spec-rules.spec.ts e2e/s05*.spec.ts e2e/s08*.spec.ts --grep "SPEC-§8\.2|AC-5\.3|AC-8\.4|AC-5\.1|AC-5\.6"`: 15 passed (30.8 s). Developer claim confirmed.
- `npm run lint`: exit 0. `npm run typecheck`: exit 0.
- Port 4173: no LISTENING socket after the runs (TIME_WAIT only).
- Freeze check (`git log -p g3-tests-approved..HEAD` over the §12.4 scope): only two changes, `e2e/fixtures.ts` (`getByRole('definition')` to `getByLabel`, D-48) and `e2e/s09-reset.spec.ts` (Rs to $ expectation, D-46). Both owner-approved, no `.skip/.only/.fixme/test.fail`, no deleted tests, no weakened assertions.

### Spec conformance (schedule)
- 5.2 outputs: rows render month, payment, interest, principal, balance from `ScheduleRow`; matches. 6: cells use `formatAmount` (no symbol, grouping, 2 dp, half-up). 7: headers from `copy.schedule.cols(currency)` give `Payment (Rs)` / `($)`; verified live that switching to USD updates headers to `($)` and the 480 rows are unchanged.
- 8.2: `<table>` with `thead`, `th scope="col"`, region with `role`, `aria-label`, `tabIndex=0`, `overflow:auto`, `max-height:min(60vh,480px)`, sticky `th`, right-aligned `tabular-nums`; table `aria-labelledby` the visible h2. 8.3.1 contract matches.
- AC-10.6: the rounding note renders between the summary and the schedule, i.e. below the summary.
- No page horizontal scroll: L-MAX at 360 px and at 180 px wide (approximates 200% zoom of 360) gave documentElement scrollWidth equal to clientWidth in all three browsers.

### AC-10.8 timing (L-MAX, click to 481st `tr`, in page, 5 runs per browser, 4 workers in parallel)
- Chromium: 63, 42, 41, 37, 35 ms. Firefox: 150, 90, 94, 98, 68 ms. WebKit: 141, 92, 86, 87, 57 ms.
- Worst case 150 ms, about 6.7x headroom, on a parallel-loaded local run. A CI runner would need to be roughly 6x slower than this machine to fail; not a credible risk today. Not flagged. Re-measure at G4.6 on real CI. Note: all 480 rows are rendered unvirtualised, which is acceptable at this size.

### Exploratory (no defects; probes deleted)
Currency switch with L-MAX shown, recalculating a shorter loan while scrolled (new table starts at scrollTop 0, 3 rows plus header), Home/End on the focused region (End reaches the bottom; Home returns to top once smooth scrolling settles), L-MAX at 360 px and 180 px. No `[REVIEW-n]` tests were needed.

### Findings

| ID | Severity | Story/AC | Evidence | Suggested fix |
|---|---|---|---|---|
| (none) | n/a | S-10, S-13 | No Blocker or Major defect found. | n/a |
| G43-1 | Minor | Code quality | `ScheduleTable` rebuilds 480 `<tr>` on every render of `ResultsPanel` (no `React.memo`); with the non-memoised context value (M-4) a theme/currency change re-renders all rows. Measured cost is small. | Wrap `ScheduleTable` in `memo` if it ever shows in profiling. |
| G43-2 | Minor | Process | Group 3 delivered no commits, so "group 3 tests pass" is evidence about group 2 code (D-47); the S-10/S-13 Status must still wait for G4.6 `verify` and the owner's hand check. | None; record in the gate summary. |

BLOCKING FINDINGS: 0
