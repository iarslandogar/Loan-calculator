# Decision Log

**Owner:** Muhammad Arslan (human product owner). **Drafted with:** Claude (claude.ai, Opus 5.5).

Each decision is **Approved** or **Proposed — needs owner approval**. Claude Code must treat Proposed items as open questions and must not build on them until they are approved (Gate G1).

| ID | Decision | Status |
|---|---|---|
| D-00 | Calculator type: loan / EMI calculator | Approved (owner) |
| D-00a | Several roles, chosen from the use case | Approved (owner) |
| D-00b | UI framework: React + TypeScript + Vite | Approved (owner) |
| D-00c | Hosting: GitHub Pages; submission as a public GitHub repo | Approved (owner) |
| D-00d | Human-gated loops, not fully autonomous | Approved (owner) |
| D-00e | Requirements written in claude.ai; that chat is exported as `transcripts/session-00-requirements` | Approved (owner) |
| D-00f | Models: Opus 5.5 builds; Sonnet 5.5 designs tests and reviews, so the models challenge each other | Approved (owner) |
| D-00g | v1 extras: mobile responsive, full keyboard, history in browser, PKR/USD, dark mode | Approved (owner) |
| D-01 | Three roles: Prospective Borrower, Loan Advisor, Existing Borrower | Approved (owner, Gate G1), 2026-10-17 |
| D-02 | Input bounds | Approved (owner, Gate G1), 2026-10-17 |
| D-03 | Schedule rounding method (re-amortising) | Approved (owner, Gate G1), 2026-10-17 |
| D-04 | Explicit Calculate button; results hidden when inputs change | Approved (owner, Gate G1), 2026-10-17 |
| D-05 | Currency defaults and format | Approved (owner), 2026-10-17 |
| D-06 | Changing tenure unit keeps the number | Approved (owner, Gate G1), 2026-10-17 |
| D-07 | History rules | Approved (owner, Gate G1), 2026-10-17 |
| D-08 | Theme default = System | Approved (owner, Gate G1), 2026-10-17 |
| D-09 | Plain CSS, no UI library | Approved (owner, Gate G1), 2026-10-17 |
| D-10 | Lenient input: commas, lakh style, trailing % | Approved (owner, Gate G1), 2026-10-17 |
| D-11 | Loan model assumptions | Approved (owner, Gate G1), 2026-10-17 |
| D-12 | Tests are frozen after Gate G3 | Approved (owner, Gate G1), 2026-10-17 |
| D-13 | Two-tab-safe history (re-read before every write) | Approved (owner), 2026-10-17 |
| D-14 | Restore clears errors and persists currency; stored entries fully validated | Approved (owner), 2026-10-17 |
| D-15 | Tests pinned to the Asia/Karachi time zone | Approved (owner), 2026-10-17 |
| D-16 | Domain API fixed in the spec before tests; throwing stubs | Approved (owner), 2026-10-17 |
| D-17 | Pre-approved tooling dependencies | Approved (owner), 2026-10-17 |
| D-18 | `verify` runs `trace --results` | Approved (owner), 2026-10-17 |
| D-19 | Input borders at 3:1 contrast (`--input-border`) | Approved (owner), 2026-10-17 |
| D-20 | Native dialog focus; AC-8.5 reworded | Approved (owner), 2026-10-17 |
| D-21 | Clear-all dialog hint; AC-12.6 kept | Approved (owner), 2026-10-17 |
| D-22 | Version control: local git now, GitHub remote later | Approved (owner), 2026-10-17 |
| D-23 | Freeze scope covers test configs; group-scoped reviews | Approved (owner, via plan), 2026-10-17 |
| D-24 | This log is append-only and records every decision | Approved (owner), 2026-10-17 |
| D-25 | Phase 1 run in the planning session | Approved (owner), 2026-10-17 |
| D-26 | Commas accepted only as valid thousands/lakh grouping | Approved (owner, Gate G1), 2026-10-17 |
| D-27 | Idle text shows next to field errors | Approved (owner, Gate G1), 2026-10-17 |
| D-28 | A failed delete or Clear all is never shown as done | Approved (owner, Gate G1), 2026-10-17 |
| D-29 | History button names include the loan summary | Approved (owner, Gate G1), 2026-10-17 |
| D-30 | Explicit focus targets around the Clear-all dialog | Approved (owner, Gate G1), 2026-10-17 |
| D-31 | 3-browser rule applies to Playwright tests only | Approved (owner, Gate G1), 2026-10-17 |
| D-32 | AC-10.8 measured in-page, locally and on CI | Approved (owner, Gate G1), 2026-10-17 |
| D-33 | Flat-rate/markup quotes stay out of scope; README says so | Approved (owner, Gate G1), 2026-10-17 |
| D-34 | J-7 mapping left as is; D-21 hint is the mitigation | Approved (owner, Gate G1), 2026-10-17 |
| D-35 | Saved-entry test fixtures use 0% loans or the UI | Approved (owner, Gate G1), 2026-10-17 |
| D-36 | One configured `Decimal` (clone), no global `set` | Approved (owner, Gate G1), 2026-10-17 |
| D-37 | Interest computed multiply-first | Approved (owner, Gate G1), 2026-10-17 |
| D-38 | Property generators biased to corners; §5.3 regression tests | Approved (owner, Gate G1), 2026-10-17 |
| D-39 | Contrast tests read computed styles | Approved (owner, Gate G1), 2026-10-17 |
| D-40 | Batch of Gate G1 spec, AC and process fixes | Approved (owner, Gate G1), 2026-10-17 |
| D-41 | TypeScript 6.0.3 and ESLint 9.39.5 instead of the newest majors | Approved (owner, Gate G2), 2026-10-17 (recommendation (a) stands; see entry) |
| D-42 | Phase 2 scaffold choices | Approved (owner, Gate G2), 2026-10-17 |
| D-43 | Test-facing DOM contract (roles and names) | Approved (owner, Gate G3), 2026-10-18 |
| D-44 | Test-designer interpretations frozen with the tests | Approved (owner, Gate G3), 2026-10-18 |
| D-45 | Handling of the G4.1 review's Minor findings | Approved (owner, G4.1), 2026-10-18 |
| D-46 | Post-G3 test fix: AC-9.2 expected currency | Approved (owner), 2026-10-18 |
| D-47 | Group 2 builds the schedule table; cross-group ACs reported as pending | Developer decision (owner informed), 2026-10-18 |
| D-48 | Post-G3 fix: summary figures located with `getByLabel` (supersedes part of D-43) | Approved (owner), 2026-10-18 |
| D-49 | Group 2 implementation choices | Approved (owner, G4.2), 2026-10-18 |
| D-50 | Handling of the G4.2 review's Minor findings | Approved (owner, G4.2), 2026-10-18 |
| D-51 | Group 3 needed no new code; G4.3 Minor findings | Approved (owner, G4.3), 2026-10-18 |
| D-52 | Group 4 implementation choices | Approved (owner, G4.4), 2026-10-18 |
| D-53 | Handling of the G4.4 review's Minor findings | Approved (owner, G4.4), 2026-10-18 |
| D-54 | Widen the input limits (supersedes D-02's bounds) | Approved (owner), 2026-10-18: amount 10 to 10^15, rate 0 to 75%, 1 to 100 years / 1 to 1,200 months |
| D-55 | Counterexample to invariant 6 / AC-10.5 within the current limits | Approved (owner), 2026-10-18: option A, state it truthfully |
| D-56 | Test-designer readings for the D-54/D-55 test update | Accepted with the D-54 mini-gate (owner), 2026-10-18 |
| D-57 | Group 5 implementation choices | Approved (owner, G4.5), 2026-10-18 |
| D-58 | Handling of the G4.5 review's findings | Approved (owner, G4.5), 2026-10-18 |
| D-59 | Post-G3 fix: portable AC-8.1 "Tab past the last control" assertion | Approved (owner), 2026-10-18 |
| D-60 | Group 6 implementation choices | Approved (owner, G4.6), 2026-10-18 |
| D-61 | Post-G3 fix: AC-8.4 waits for scrolling to settle | Approved (owner), 2026-10-18 |
| D-62 | Adopt the "Soft ledger" pastel redesign as a change cycle before Phase 5 | Approved (owner), 2026-10-18 |
| D-63 | Redesign proposals P1–P5 | Approved (owner), 2026-10-18: P1 yes, P2 n/a, P3 yes, P4 already done, P5 declined (backlog) |
| D-64 | Redesign implementation: deviations from the bundle and verification | Approved (owner, visuals mini-gate), 2026-10-18 |
| D-65 | Add four visuals: S-20, S-21, S-22 new; S-19 Backlog to v1 | Approved (owner), 2026-10-18 |
| D-66 | Chart test hooks: `data-hit-area`, `data-segment`, `data-series` | Approved (owner, G3b), 2026-10-18 |
| D-67 | G3b: visuals tests approved and frozen; three copy gaps closed; test-designer readings | Approved (owner, G3b), 2026-10-18 |
| D-68 | Visuals implementation choices and evidence | Approved (owner, visuals mini-gate), 2026-10-18 |
| D-69 | Sticky loan form on wide, tall windows (owner request) | Approved (owner), 2026-10-18; first implementation **failed the owner's check** at the visuals mini-gate and was fixed (see entry) |
| D-70 | Fixes for the visuals review (F-1 to F-5), forced-colors marks (RD-3) and results memoisation | Approved (owner, visuals mini-gate), 2026-10-18, including the RD-3 borders |
| D-71 | Spec §8.3.2: drawing ratios and percentages may be JS numbers, for geometry only | Approved (owner, visuals mini-gate), 2026-10-18 |
| D-72 | Remove the forced layout in the yearly-table overflow check (AC-10.8 regression from D-70) | Developer fix, 2026-10-18; owner informed |
| D-73 | Deploy to GitHub Pages before Phase 5, at the owner's direction | Approved (owner), 2026-10-18 |
| D-74 | Transcripts: readable Markdown plus filtered raw logs | Approved (owner), 2026-10-19 |
| D-75 | README owner inputs; Phase 5 started | Owner, 2026-10-19 |
| D-76 | Phase 5 round 1: owner chose which Minor findings to fix before G5 | Approved (owner), 2026-10-19; round 2 re-review 0 blocking |
| D-77 | G5: owner marks the 17 v1 stories Implemented on the automated evidence, without a line-by-line hand check | Approved (owner), 2026-10-19 |

**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.

---

### D-01 Three roles
- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One "user" role could not justify those stories.
- **Alternative:** Two roles (drop R-3). This saves no build work, because the schedule is needed anyway, but it weakens the product story.

### D-02 Input bounds
- **Proposal:** Loan amount 1,000 to 1,000,000,000 (up to 2 dp); rate 0 to 50% (up to 2 dp); tenure 1 to 40 years or 1 to 480 months (whole numbers).
- **Why:** These cover consumer, car and home loans in Pakistan and the US with headroom (PKR property loans run into the hundreds of millions; Pakistan's policy rate peaked at 22% in 2023). The upper limits stop absurd inputs, and the calculation has been proven correct across the whole range (D-03).
- **Alternative:** Tighter limits, such as 30 years and 36%. These are simpler to explain but reject some edge-case real loans.
- **Decision (owner, Gate G1, 2026-10-17):** Approved. Correction to the wording above: "proven correct across the whole range" over-claims. The method was **verified** over about 1,700 cases (spec §5.3), and Claude Code's check of 23,234 half-cent ties found no difference from exact arithmetic. That is evidence from measurement, not a proof.

### D-03 Schedule rounding method
- **Proposal:** Re-compute the instalment from the remaining balance each month, rounding to 2 dp (tech spec §5.2). The headline monthly payment is the standard EMI. Individual months may differ by at most 0.01, and the app says so when they do.
- **Why:** The usual "fixed instalment, last one adjusts" method breaks within normal ranges. For example, Rs 10,000 at 36% over 359 months pays off 7 months early, and Rs 10,000.82 at 30% over 360 months gives a final instalment of 1,767.73 against a regular 250.05. The brief says "never a wrong result". Our method was verified exactly across about 1,700 cases, including every boundary corner.
- **Trade-off:** Payments alternate by a paisa or cent (for example 88,848.79 and 88,848.78). This is honest and disclosed.
- **Alternatives:** (a) The fixed-instalment method with much tighter bounds (still fails for small loans at long tenures). (b) Show unrounded values (rows wouldn't add up to the cent).

### D-04 Explicit Calculate; results hidden when inputs change
- **Proposal:** Calculate on button press or Enter, not live while typing. Editing any input hides the old results and shows a "inputs have changed" message.
- **Why:** Live calculation flashes errors mid-typing (for example "1" is below the minimum while typing "1000"). Hiding stale results enforces R-1's "must never see results that don't match the inputs".
- **Alternative:** Live calculation with debounced validation. It feels slicker but needs more edge-case rules.

### D-05 Currency
- **Proposal:** Default PKR. Options PKR (`Rs 1,234.56`) and USD (`$1,234.56`). Always 2 decimals, standard 3-digit grouping. The symbol only changes; amounts are never converted (a note says so). History entries keep their own currency, and Restore switches to it.
- **Why:** The target users are Pakistan-first. Conversion would need live exchange rates (a network service, which the brief rules out for running locally).
- **Open sub-question:** Pakistani banks usually quote whole rupees. We keep 2 dp for consistency with ISO 4217 (PKR has 2 minor units). Change to 0 dp for PKR?
- **Decision (owner, 2026-10-17):** Approved as proposed. PKR keeps **2 dp**; the sub-question is closed. All reference values stay as they are.

### D-06 Changing the tenure unit keeps the number
- **Proposal:** Switching Years ↔ Months keeps the typed number (5 years becomes 5 months) and marks results stale.
- **Why:** Converting breaks for non-multiples (18 months = 1.5 years, which is not a whole number). Keeping the number is predictable, and the stale message prevents misreading.

### D-07 History rules
- **Proposal:** Auto-save every successful calculation; keep the newest 20; skip a duplicate of the newest entry; Restore recomputes rather than trusting stored numbers; storage failure degrades gracefully.
- **Alternative:** Manual "Save" button. It gives more control but adds a step for R-2.

### D-08 Theme default
- **Proposal:** `System` (follow the device) by default, with Light and Dark overrides, remembered between visits.

### D-09 Styling
- **Proposal:** Plain CSS with design tokens; no Tailwind or component library.
- **Why:** Fewer dependencies, easier for a reviewer to read, and full control of focus and contrast.

### D-10 Lenient input
- **Proposal:** Accept `1,000,000`, lakh-style `10,00,000`, surrounding spaces, and a trailing `%` on the rate. Reject scientific notation (`1e6`).
- **Why:** Pakistani users often write lakh grouping; rejecting it would feel broken.
- **Decision (owner, Gate G1, 2026-10-17):** Approved, narrowed by **D-26**: commas are accepted only in valid western or lakh grouping in the whole-number part.

### D-11 Loan model assumptions
- **Proposal:** Reducing-balance loan, monthly payments, monthly compounding (annual rate ÷ 12), payments at the end of each month, no fees, no dates.
- **Why:** This is the standard EMI definition used by banks in Pakistan and elsewhere. It is stated in the README as an assumption.

### D-12 Tests frozen after Gate G3
- **Proposal:** Once you approve the tests, the building agent may not edit them. If a test seems wrong, it stops and asks you.
- **Why:** Otherwise the loop can "pass" by weakening tests. This is a classic agent failure mode and a good story for the transcript.
- **Decision (owner, Gate G1, 2026-10-17):** Approved. The freeze scope is widened by **D-23** (spec §12.4).

The other Proposed decisions (D-01, D-03, D-04, D-06, D-07, D-08, D-09 and D-11) were approved at Gate G1 on 2026-10-17 without change. The spec-critic found no conflict with them.

---

## Planning-phase decisions (2026-10-17, Claude Code session `session-00b-planning`)

These came from Claude Code's pre-read review of the pack. The owner decided each one in the session.

### D-13 Two-tab-safe history
- **Decision:** Every save, delete and clear-all re-reads storage before writing. The duplicate check uses the freshly read newest entry, delete works by `id`, and a `storage` event reloads the list (spec §9.3).
- **Why:** With two tabs open, a tab holding stale entries in memory would write a cleared customer's figures back after Clear all in the other tab. That breaks R-2's privacy guarantee and J-7.

### D-14 Restore clears errors and persists currency; stored entries fully validated
- **Decision:** Restore clears all field errors. It switches the currency to the entry's and persists it like any currency change. On load, a stored entry is kept only if it passes the type guard and `validateInputs`, is canonical, and its stored monthly payment matches the recomputed one (spec §3.2, §9.2).
- **Why:** Without clearing errors, Restore could show errors and results together, which breaks S-2. A shape-only check would let a tampered entry such as `amount: "abc"` reach the calculator.

### D-15 Tests pinned to Asia/Karachi
- **Decision:** Playwright uses `timezoneId: 'Asia/Karachi'` with explicit-offset clock times, and Vitest sets `TZ` (spec §12.1).
- **Why:** AC-11.2 expects "20:45". Without a pinned zone, the test passes on a machine in Pakistan and fails on a UTC CI runner.

### D-16 Domain API fixed in the spec before tests; throwing stubs
- **Decision:** The domain exports and signatures are written into spec §3.1.1. In Phase 2 the developer creates them with `throw new Error('NOT_IMPLEMENTED')` bodies. UI and storage are tested only through the rendered app.
- **Why:** Tests are written first and frozen at G3. Without a fixed API, the test-designer would invent one, and the frozen tests would lock it in. Without stubs, tests fail as module-load errors instead of "for the right reason".

### D-17 Pre-approved tooling dependencies
- **Decision:** These may be added without asking: `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `@types/node`, `@eslint/js`, `globals`, `eslint-config-prettier`. `@testing-library/jest-dom` is not used (spec §2).
- **Why:** The scaffold needs them, and asking for each would stall Phase 2 with no real decision behind it.

### D-18 `verify` runs `trace --results`
- **Decision:** The last step of `verify` is `trace --results` (spec §13).
- **Why:** Otherwise nothing mechanically enforces "Implemented means every AC test passed in all three browsers".

### D-19 Input borders at 3:1 contrast
- **Decision:** A new token `--input-border` is used for inputs and selects: light `#7E8898`, dark `#66768C`. `--border` stays for decorative lines (spec §8.4).
- **Why:** `--border` is 1.42:1 against the surface. WCAG 1.4.11 needs 3:1 for the boundaries that identify a control.
- **Alternative considered:** a filled input background. The owner approved either; the token was chosen because it can be checked by a test.

### D-20 Native dialog focus; AC-8.5 reworded
- **Decision:** The dialog uses native `showModal()` with no JS focus trap. AC-8.5 now says Tab and Shift+Tab never reach page content behind the dialog, instead of "stay within the dialog".
- **Why:** Native modal dialogs let Tab move to the browser's own UI, so the old wording was likely untestable as written. The native behaviour is also the more accessible one.

### D-21 Clear-all dialog hint; AC-12.6 kept
- **Decision:** AC-12.6 is unchanged: Clear all leaves the form and results on screen. The dialog gains a second line, `This doesn't clear the form. Select Reset to do that.` (copy key `dialog.clear.hint`; AC-12.2 updated).
- **Why:** Clearing the form is Reset's job, but an advisor clearing history for privacy should be told the on-screen figures remain.

### D-22 Version control: local git now, GitHub remote later
- **Decision:**
  - A local repository was created at the planning phase, on branch `main`.
  - Commits are authored as `Muhammad Arslan <arslan8954@gmail.com>`, set with `--local`. `core.autocrlf` is `false`, so files stay byte-identical across OSes.
  - Phases 1–5 run on branch `v1`, which is merged into `main` in Phase 6.
  - The owner creates the public GitHub repo later. It should exist by G4.6, so CI can provide the evidence AC-10.8 needs ("on the CI test machine").
- **Why:** The G3 test freeze and the reviewer's integrity check need git history from the start. `gh` is not installed, so the owner creates the GitHub side.

### D-23 Freeze scope covers test configs; group-scoped reviews
- **Decision:**
  - After G3, the freeze covers `test/**`, `playwright.config.ts`, `vitest.config.ts` and `scripts/trace.mjs` as well as the test files (spec §12.4). The test-designer may write `test/**`.
  - During G4.1–G4.5 the reviewer runs the group's tests plus lint and typecheck. Full `verify` runs from G4.6.
- **Why:** Changing timeouts, `testIgnore` or the trace script could get around frozen tests. Full `verify` is red by design until the last group.

### D-24 This log is append-only and records every decision
- **Decision:** Every decision goes into this log, however small. Nothing is deleted or rewritten; changes are added as dated Decision lines or superseding entries.
- **Why:** The owner's instruction. The log is part of the evidence of how the work was directed.
- **Decision (owner, Gate G1, 2026-10-17):** Clarified: the **Status** column of the index table may be updated in place (for example, Proposed to Approved). The entries' text may not.

---

## Gate G1 decisions (2026-10-17)

Source: Phase 1. The `spec-critic` subagent reported 38 findings, and Claude Code added its own. The owner approved every recommendation ("seems good, let's move to phase 2"). One critic finding (#12, "CLAUDE.md not updated for the freeze scope") was **rejected as incorrect**: CLAUDE.md line 28 already points to spec §12.4.

### D-25 Phase 1 run in the planning session
- **Decision:** The owner started Phase 1 in the same Claude Code session as the planning phase, instead of a new one. The transcript `session-00b-planning` therefore covers both.

### D-26 Commas only as valid grouping (narrows D-10)
- **Decision:** In the loan amount, commas are removed only if the whole-number part matches western (`1,000,000`) or lakh (`10,00,000`) grouping and no comma follows the `.`. Otherwise the value is "not a number" (spec §4.1; new AC-2.17).
- **Why:** Removing every comma turned `1000,50` into 100050 and `1,5` into 15. A decimal-comma keypad can produce those, so the user would get a confident figure for the wrong loan, which R-1 forbids.

### D-27 Idle text next to field errors
- **Decision:** When results are `idle`, including after a failed Calculate, the results area shows `Enter your loan details and select Calculate.` AC-1.12, AC-2.1, AC-2.12 and AC-9.1 now say so.
- **Why:** AC-2.12's "only the error message is shown" contradicted the state machine (§3.2, §8.1).

### D-28 A failed delete or Clear all is never shown as done
- **Decision:** If storage refuses a delete or Clear all, the entries stay on screen and `history.removeFailed` is shown (spec §7, §9.3; new AC-12.7).
- **Why:** Showing an empty list while the data is still on the device breaks R-2's privacy guarantee.

### D-29 History button names include the loan summary
- **Decision:** The accessible names become `Restore {line1}, saved {datetime}` and `Delete {line1}, saved {datetime}` (spec §7).
- **Why:** With minute-resolution times, two entries saved in the same minute had identical names. That's ambiguous for screen-reader users and fails Playwright's strict locators (AC-8.6).

### D-30 Explicit focus around the Clear-all dialog
- **Decision:** Focus is set in code. After opening, **Cancel** is focused. **Cancel** or Escape focuses **Clear all**. After **Clear**, focus goes to the **Saved calculations** heading. React's `autoFocus` and browser return-focus are not relied on (spec §8.3; AC-8.5 reworded).
- **Why:** After Clear, **Clear all** is disabled and can't take focus. React's `autoFocus` fires at mount, not at `showModal()`. macOS Safari and Firefox don't focus a button on click, so return-focus would be lost.

### D-31 3-browser rule applies to Playwright tests only
- **Decision:** For `trace --results`, every test tagged with an AC must pass, and Playwright tests must pass in all 3 browser projects. ACs proven only in Vitest need only rule (a) (spec §12.5).
- **Why:** Vitest runs in Node/jsdom, never in three browsers. The old rule made the property-test ACs impossible to mark Implemented.

### D-32 AC-10.8 measured in the page, locally and on CI
- **Decision:** L-MAX is timed from the Calculate click until the 480th row is in the DOM, ≤ 1,000 ms, using `performance.now()` inside the page, in each browser. It's checked locally from G4.3 and on CI by G4.6 (AC-10.8, NFR-4).
- **Why:** The measurement start and end were undefined, and CI won't exist until the GitHub remote does (D-22).

### D-33 Flat-rate and markup quotes stay out of scope
- **Decision:** No scope change. Spec §16 and the README state that figures won't match flat-rate or markup-based quotes, such as many Pakistani car loans and Islamic financing.
- **Why:** R-1 includes car-loan shoppers, who might otherwise compare the app's figure with a flat-rate quote and assume one of them is wrong.

### D-34 J-7 mapping left as is
- **Decision:** S-9 (Reset) stays mapped to J-4 only. J-7 is served by S-12, and the D-21 dialog hint points users to Reset.
- **Why:** Changing the mapping means editing `jobs-to-be-done.md`, which only the owner may do, and the hint already covers the gap.

### D-35 Saved-entry test fixtures use 0% loans or the UI
- **Decision:** Tests that need entries already in storage either create them through the UI or seed 0% loans (`12000 × k` over 12 months gives `1000 × k` per month), so no expected value is computed by the code under test (spec §12.1).
- **Why:** §9.2 drops entries whose stored payment doesn't match the recalculated one. Hand-written seeds therefore need payments known by hand, and test-designer rule 2 forbids computing them.

### D-36 One configured `Decimal`
- **Decision:** `money.ts` exports `DecimalJs.clone({ precision: 40, rounding: ROUND_HALF_UP })`. The global `Decimal.set` is never used, and ESLint blocks `decimal.js` imports elsewhere (spec §3.1, §5).
- **Why:** The spec described two mechanisms. A stray import of the global `Decimal` would silently use the default precision of 20.

### D-37 Interest computed multiply-first
- **Decision:** `interest_k = round2(balance × annualRate / 1200)` (spec §5.2, invariant 3).
- **Why:** This is exact by construction at half-cent ties. The previous `balance × r` form gave identical results in an exhaustive check of 23,234 ties, but only by measurement. Results do not change.

### D-38 Corner-biased generators; §5.3 regression tests
- **Decision:** At least a quarter of property-test runs draw from small amounts, high rates and long tenures, and every exact bound appears. The two §5.3 loans become `[SPEC-§5.3]` tests with hard-coded values (spec §5.4, §5.5).
- **Why:** Uniform random sampling rarely reaches the corner where rounding errors matter.

### D-39 Contrast tests read computed styles
- **Decision:** Contrast tests read `getComputedStyle` custom properties in the running app under each `data-theme`, for the listed text pairs (spec §8.4).
- **Why:** Checking the spec's table would prove the table, not the app.

### D-40 Batch of G1 fixes
Each item is approved as written in the spec or AC text it names:
- **Settings:** settings are validated on load, with each invalid field falling back to its default; the inline theme script uses the same rule (§9.2).
- **Storage access:** reading `window.localStorage` itself is wrapped, because Safari throws there, and tests stub the getter (§9.1, §12.3).
- **Storage event:** `key === null` reloads the history, and the spec doesn't claim the two-tab window is fully closed (§9.3).
- **Load guard:** the history type guard checks for non-null objects and a `createdAt` year from 2000 to 9999 (§9.2).
- **Input edge cases:** a `[SPEC-§4.2]` table of input cases, with `\d` meaning ASCII digits only (§4.2).
- **Edit rules:** changing the unit clears the tenure error; editing while `idle` stays `idle`; editing back to the original text stays `stale` (§3.2).
- **Formatters:** non-negative input, with more than 2 dp rounded first and no exponent notation (§6).
- **Copy and buttons:**
  - new keys `history.entry.line3` and `history.removeFailed`;
  - the apostrophe list extended;
  - `schedule.title` used as the accessible name of the region and the table;
  - Reset and the dialog buttons are `type="button"` (§7, §8.1, §8.2).
- **jsdom:** `test/setup.ts` stubs `showModal`/`close` for jsdom (§12.1).
- **Phase 3 exceptions:** negative-only tests and the TZ test may pass in Phase 3, and must be listed (§12.1).
- **NFR wording:**
  - "100% unit-tested" becomes "every export unit-tested";
  - `eslint --max-warnings 0`;
  - the NFR-3 test also checks for no cookies;
  - NFR-1 is worded per engine, with the Linux CI run as the authority (§3.1, §11, §13).
- **Passing with no tests:** `test` uses `passWithNoTests` and `test:e2e` uses `--pass-with-no-tests`, so Phase 2 can be green (§13).
- **AC wording:**
  - AC-2.15 and AC-5.2 made observable;
  - AC-5.3 uses L-B at 360 × 740;
  - AC-8.1 split into an empty state and a populated state;
  - AC-11.2 states the time zone and the three lines;
  - AC-11.5 adds the different-currency case;
  - AC-11.10 split into cases.
- **Process:**
  - the loop-plan Phase 2 prompt names the stubs, TZ config, `test/setup.ts` and pass-with-no-tests, and exits on individual scripts;
  - the reviewer gets the Edit tool so it can append findings;
  - the developer owns the configs;
  - test-designer rule 1 includes component tests.
- **Node 24:** pinned deliberately. Node 26 becomes Active LTS around now, and Node 24 stays a supported LTS line until April 2028.

---

## Phase 2 decisions (2026-10-17)

### D-41 TypeScript 6.0.3 and ESLint 9.39.5 (Proposed, needs owner confirmation)
- **Conflict found:** spec §2 asks for "latest stable" TypeScript and lists `typescript-eslint` and `eslint-plugin-jsx-a11y`. On 2026-10-17 those can't all be satisfied:
  - latest TypeScript is **7.0.2**, but `typescript-eslint@8.71.2` (latest) requires TypeScript `>=4.8.4 <6.1.0`;
  - latest ESLint is **10.13.0**, but `eslint-plugin-jsx-a11y@6.10.2` (latest) supports ESLint only up to `^9`.
- **Applied provisionally:** TypeScript **6.0.3** and ESLint **9.39.5** with `@eslint/js` 9.39.5, the newest versions that keep every listed tool on a supported peer range.
- **Caveat:** npm marks `eslint@9.39.5` as "no longer supported" (deprecated).
- **Alternatives:**
  - (a) Keep it as is. Every tool runs inside its declared peer range, but ESLint 9 is out of support.
  - (b) ESLint 10 with an npm `overrides` entry forcing jsx-a11y. This is newer but runs a plugin outside its declared range, and it may break.
  - (c) Drop `eslint-plugin-jsx-a11y` and rely on the role- and name-based Playwright locators for accessibility. That loses static a11y linting.
- **Recommendation:** (a) for v1, revisited if jsx-a11y releases ESLint 10 support.
- **Decision (owner, Gate G2, 2026-10-17):** The owner approved G2 ("let's do phase 3") without choosing between (a), (b) and (c). The recommendation (a) therefore stands. The owner may still choose (b) or (c) later; changing lint tooling doesn't touch the frozen tests.
- **Note:** this log doesn't record whether the owner ran the G2 hand checks (`npm ci && npm run dev`; the `J-99` trace mutation). Claude Code ran the trace mutation itself in a scratch copy (exit 1, three errors).

### D-42 Phase 2 scaffold choices (Proposed, owner to review at G2)
- **Versions** (exact, `save-exact=true` in `.npmrc`):
  - React and react-dom 19.3.1, decimal.js 10.6.0, Vite 8.3.4, `@vitejs/plugin-react` 6.1.2;
  - Vitest 5.0.5, jsdom 30.1.3, Testing Library react 16.3.3, user-event 14.6.8 and dom 10.4.2, fast-check 4.10.2, Playwright 1.64.1;
  - typescript-eslint 8.71.2, react-hooks 7.1.1, jsx-a11y 6.10.2, Prettier 3.9.10, eslint-config-prettier 10.1.8, globals 17.13.0;
  - `@types/react` and `@types/react-dom` 19.3.0, and `@types/node` **24.19.2**, to match the Node 24 runtime rather than the latest 26.x.
- **`@testing-library/dom`:** installed as the required peer of `@testing-library/react`. It isn't listed in §2 but can't be avoided.
- **Build script:** `tsc -p tsconfig.app.json && vite build` instead of §13's `tsc -b && vite build`, so a type error in a test file can't block the app build. `typecheck` runs `tsc -b` over the app, tests and configs. §13 is updated to match.
- **TS configs:** `tsconfig.app.json` (src without tests), `tsconfig.test.json` (src, `test/`, `e2e/`), `tsconfig.node.json` (configs). They use `strict`, `noUncheckedIndexedAccess` and `verbatimModuleSyntax`, with `types` set explicitly, because TypeScript 6 defaults it to `[]`.
- **Vitest:** two projects. `domain` runs `src/domain/**` and `test/**/*.test.ts` in Node. `ui` runs `src/ui/**` and `src/storage/**` in jsdom with `test/setup.ts`, which also runs Testing Library `cleanup`, because Vitest globals are off. TZ is set both at the top of the config and through `test.env`.
- **Playwright:**
  - `forbidOnly: true` always, as a mechanical backstop for the "never `.only`" rule;
  - `retries: 0` locally, so flakes are visible, and 2 only in smoke mode against the live site;
  - `locale: 'en-GB'` and `timezoneId: 'Asia/Karachi'`.
  - **Tests must navigate with `page.goto('./')`**, not `'/'`, so they work under the GitHub Pages sub-path.
- **ESLint:** `--max-warnings 0`.
  - The layer rule, the "`decimal.js` only in `money.ts`" rule and bans on `Intl`, `parseFloat` and `toLocale*` apply in `src/`.
  - React and react-dom are also banned in `domain/` and `storage/`.
- **Prettier:** no semicolons, single quotes, trailing commas, width 100. Markdown, `docs/`, `transcripts/` and `.claude/` are excluded, so owner documents are never reformatted.
- **Line endings:** a `.gitattributes` with `* text=auto eol=lf`.
- **CI:**
  - `ci.yml` runs on push (except `main`) and on pull requests, and `deploy.yml` calls it via `workflow_call`, so pushes to `main` aren't verified twice;
  - the action majors used are checkout v5, setup-node v5, upload-artifact v4, configure-pages v5, upload-pages-artifact v4 and deploy-pages v4;
  - the build stamps `<meta name="build-id" content="<commit SHA>">` into `index.html`, so the smoke job waits until Pages serves that exact commit.
- **Page title:** `index.html` `<title>` holds `Loan EMI Calculator` as static text, because it's needed before any JS runs. It duplicates `copy.app.title`, and a test should keep the two equal.
- **Decision (owner, Gate G2, 2026-10-17):** Approved as listed.

## Phase 3 decisions (2026-10-17)

### D-43 Test-facing DOM contract (Proposed, owner to review at G3)
- **Decision:** Spec §8.3.1 defines how tests find each element, using only roles and accessible names:
  - labelled inputs;
  - errors linked by `aria-describedby`;
  - summary figures as `<dd>` named by their `<dt>`;
  - a named schedule table;
  - a named history list of `<li>` entries;
  - a named dialog.
- **Why:** The spec defined the copy but not the structure. Left open, the test-designer would have invented a DOM shape, and freezing the tests at G3 would lock it in without anyone deciding it.
- **Decision (owner, Gate G3, 2026-10-18):** Approved ("approved").
- **Decision (owner, 2026-10-18), superseded in part by D-48:** the "Summary figures" row was wrong. Playwright, following WAI-ARIA, never gives the `definition` (or `term`) role an accessible name, so `getByRole('definition', { name: 'Monthly payment' })` can match nothing, whatever the markup. The markup stays the same; tests locate the figures with `getByLabel` instead (D-48). This was the developer's error in writing D-43.

### D-44 Test-designer interpretations (Proposed, owner to review at G3)
These readings were made while writing the tests. They become binding when the tests freeze.
1. **AC-8.1:** "the schedule area" is exactly one tab stop, the `role="region"` wrapper. Table cells are not focusable.
2. **AC-8.5:** "never moves focus to anything on the page behind the dialog" is checked as: after every Tab or Shift+Tab, the active element is inside the open dialog, or is `body`/`document` (focus has left to the browser UI, which a test can't observe).
3. **AC-5.2:** "every input, select and button" includes the disabled **Clear all** and every Restore/Delete button, measured after one calculation.
4. **AC-5.5:** "side by side" at 1280 px means the results text sits to the right of the Loan amount input and overlaps the form vertically. "Stacked" at 768 px and 360 px means the results start below the **Calculate** button.
5. **AC-11.2:** each history `<li>` shows its three lines as separate lines of `innerText`, in order (line1, line2, line3). The Restore/Delete labels are ignored.
6. **AC-11.5, third case:** "switch to USD and calculate L-A again" means pressing Calculate without editing the inputs.
7. **AC-3.6:** "plus all reference loans" means the seven reference loans plus both §5.3 regression loans, checked against invariants 1 to 7.
8. **AC-10.8:** the timing ends when 481 `<tr>` elements (header plus 480 rows) are in the table, measured with a `MutationObserver` from the Calculate click.
9. **§4.1 `normaliseAmount`:** returns the trimmed text unchanged when the grouping is invalid. With valid grouping it removes only the commas, without stripping zeros (`'1,000.50'` gives `'1000.50'`, `'1,000.'` gives `'1000.'`).
10. **§6 formatters:** a value with more than 2 dp is rounded half-up first (`999.999` gives `$1,000.00`).
11. **Two-tab tests:** use a popup tab (`window.open`), because Playwright's WebKit doesn't deliver `storage` events between two `context.newPage()` pages. The "Clear in B, then Calculate in A" test suppresses `storage` events in tab A, so only re-read-before-write (D-13) can pass it.
12. **Fixture timeouts:** the E2E page fixture sets an 8 s action timeout and a 30 s navigation timeout, so a red run takes minutes rather than hours. It also counts as frozen test code.
- **Decision (owner, Gate G3, 2026-10-18):** Approved ("approved"). The tests are frozen from tag `g3-tests-approved` (D-12, D-23).

## Phase 4 decisions

### D-45 G4.1 Minor findings (Proposed, owner to review at G4.1)
The code-reviewer reported `BLOCKING FINDINGS: 0` for group 1 (domain), with three Minors:
1. **`checkTenure` relies on the range check running before `toNumber()`:** fixed with a comment at that line.
2. **`e2e/review/domain-probe.spec.ts` asserts nothing but would run in all three browsers:** the reviewer was asked to delete its own file, because `e2e/review/` is its area.
3. **`formatDateTime` doesn't zero-pad years below 1000:** **won't fix.** It's unreachable: stored entries must have a year from 2000 to 9999 (§9.2), and new entries use the current clock.
- **Decision (owner, G4.1, 2026-10-18):** Approved ("approved").

### D-46 Post-G3 test fix: AC-9.2 expected currency (owner-approved change to a frozen test)
- **Found by:** Claude Code, while reading the group 2 specs before writing any UI code. The developer stopped and raised it, per CLAUDE.md.
- **Defect:** in `e2e/s09-reset.spec.ts`, `[AC-9.2]` switches to USD, *then* calculates L-A and L-B, but expects the entries to read `Rs 2,500,000.00 …` and `Rs 1,000,000.00 …`. Under spec §9.2 and AC-7.5, entries keep the currency they were calculated in, so a correct app shows `$2,500,000.00 at 18% for 5 years` and `$1,000,000.00 at 12% for 1 year`. The AC is right; the test's expected strings are wrong.
- **Decision (owner, 2026-10-18):** Change only those two expected strings to the `$` form; the setup stays as it is. The `test-designer` (not the developer) makes the edit, and the owner sees the diff. The reviewer's freeze check will show this change after `g3-tests-approved`; this entry is its authorisation.
- **Rejected alternative:** calculate in PKR first, then switch to USD.

### D-48 Post-G3 fix: summary figures located with `getByLabel` (owner-approved change to a frozen test)
- **Found by:** Claude Code in group 2. The first run with real UI rendered the right figures (Rs 88,848.79 / Rs 66,185.45 / Rs 1,066,185.45), but no named `definition` existed.
- **Evidence:** Playwright's name computation lists `definition` and `term` among the roles that prohibit naming. A probe page with `<dt id>` / `<dd aria-labelledby>` returned 0 matches for `getByRole('definition', { name })`, and exactly 1 (the `<dd>`) for `getByLabel(name, { exact: true })`, in Chromium, Firefox and WebKit alike. Unnamed `getByRole('definition')` counts still work, so "no results shown" checks are unaffected.
- **Decision (owner, 2026-10-18):** In `e2e/fixtures.ts`, the `summary()` helper changes from `getByRole('definition', { name, exact: true })` to `getByLabel(name, { exact: true })`. Spec §8.3.1 is updated to match. The `test-designer` makes the test edit, and the owner sees the diff. No assertion on the figures changes.
- **Rejected alternative:** render each figure as `<output>` (`status` role, nameable). That makes three live regions announcing every recalculation, and it's a larger change.

### D-49 Group 2 implementation choices (Proposed, owner to review at G4.2)
1. **Currency select:** built in group 2 (in memory only), because AC-1.12 checks it's present. Persistence comes with S-7 in group 4.
2. **Idle and stale texts** sit in an `aria-live="polite"` container, so screen-reader users hear "Your inputs have changed…" (the G1 batch asked for this choice to be stated).
3. **ESLint `jsx-a11y/no-noninteractive-tabindex`:** allows `tabIndex` on `role="region"`, because spec §8.2 requires the scrollable schedule region to be focusable (AC-8.4).
4. **Schedule wrapper:** the heading and table sit in a `<div>`, not a `<section>`, so only one element has the region name "Repayment schedule". Two would break `getByRole('region', …)`.
5. **Inputs:** each input has its own `useRef`; the React Hooks rule forbids reading a ref from an object during render.
6. **Styling:** basic light-theme CSS and layout now. Dark tokens come with S-6, and breakpoints and tap targets are refined with S-5.
7. **Local E2E runs use `CI=1`.** A leftover `vite preview` on port 4173 served an old build, and `reuseExistingServer: !process.env.CI` made Playwright reuse it, which can give false results either way. `CI=1` forces a fresh build. A permanent fix needs a change to the frozen `playwright.config.ts` (`reuseExistingServer: false`), and that is for the owner to decide.
- **Decision (owner, G4.2, 2026-10-18):** Approved ("okay let's move on"). The owner didn't answer the `reuseExistingServer` question, so the frozen config stays unchanged, and every local E2E run, by the developer and the reviewer, keeps using `CI=1`. The owner can still decide this later.

### D-50 G4.2 Minor findings (Proposed, owner to review at G4.2)
The code-reviewer reported `BLOCKING FINDINGS: 0` for group 2, with six Minors:
1. **M-1, a stale preview server can be reused locally:** owner decision (see D-49 item 7). Until then, all local E2E runs use `CI=1`.
2. **M-2, the currency note isn't linked to its select:** **fixed.** The select now has `aria-describedby="currency-note"`.
3. **M-3, `ErrorBoundary` has no test or logging, and covers render errors only:** **deferred.** AC-2.16 is proven end to end; event-handler errors aren't caught by any React boundary. A test of the fatal path will be considered in Phase 5.
4. **M-4, unmemoised context value, silent `main.tsx` if `#root` is missing, `as Unit` / `as Currency` casts:** **won't fix for now.** The re-renders are cheap. `#root` is static in `index.html`. The casts read the values of `<option>`s the code renders itself.
5. **M-5, the summary wraps inconsistently at 360 px, and each field reserves an empty error line:** **scheduled for group 6** (S-5 layout). The reserved line is deliberate, so the form doesn't jump when an error appears.
6. **M-6, the sticky header background versus dark tokens:** **scheduled for group 4** (S-6 theme).
- **Decision (owner, G4.2, 2026-10-18):** Approved ("okay let's move on").

### D-51 Group 3 needed no new code; G4.3 Minor findings (Proposed, owner to review at G4.3)
- **Decision:** No code was written for group 3 (S-10, S-13). The schedule built in group 2 (D-47) already passes every S-10 and S-13 test: 54 of 54 across the 3 browsers. The other schedule-related tests also pass: 15 of 15 (§8.2 naming, the AC-5.3 sticky header, AC-8.4 keys, AC-5.1 and AC-5.6 at 360 px).
- **AC-10.8 headroom:** the reviewer measured L-MAX locally from click to the 480th row. The worst case was 150 ms (Firefox), against a 1,000 ms limit. It will be measured again on real CI at G4.6.
- **Minor G43-1, the 480 rows re-render on any context change:** **won't fix.** While results are shown, the only context change that can happen is a currency switch, which must re-render the headers anyway. Typing makes the results stale and unmounts the table.
- **Minor G43-2, group 3 had no commits:** noted. The S-10 and S-13 tests exercise group 2's code (`9f2c633`).

### D-52 Group 4 implementation choices (Proposed, owner to review at G4.4)
1. **Settings load before the first render**, in `useReducer`'s initialiser, not an effect. The §9.2 fallback tests read the selects straight after a reload without waiting, and it also avoids a flash of the default values.
2. **Settings are saved only on a real user change**, through `updateSettings`, never on load. A first visit therefore writes nothing to storage. Saving is best effort: if storage is blocked, settings live in memory for the visit (AC-6.6).
3. **Validation:** `parseSettings` treats non-JSON, `null`, arrays and non-objects as "both defaults", and checks each field separately. The inline pre-paint script in `index.html` applies the same rule to the theme, and both are wrapped so they never throw.
4. **Theme application:** the resolved theme is set on `<html data-theme>`. A `matchMedia('(prefers-color-scheme: dark)')` change listener is attached only while "System" is selected, so a fixed choice ignores device changes (AC-6.4).
5. **Type location:** the `Theme` type moved to `src/storage/settings.ts`, so the storage layer doesn't import from `ui/` (layer rule).
6. **Dark tokens:** exactly spec §8.4 plus D-19's `--input-border` (#66768C). The sticky table header uses `--surface`, so it follows the theme (closes G4.2 Minor M-6).
7. **Test-filter lesson:** Playwright's `--grep` is case-insensitive, and an exclusion filter silently dropped AC-6.1. The developer now lists (`--list`) whatever a filter excludes before reporting.

### D-53 G4.4 Minor findings (Proposed, owner to review at G4.4)
The code-reviewer reported `BLOCKING FINDINGS: 0` for group 4, with three Minors:
1. **G44-1, a second tab writes its stale theme back when it changes currency, or the reverse:** **fixed.** `updateSettings` now merges the change over a fresh `loadSettings()` instead of the tab's in-memory copy, the same re-read-before-write idea as D-13.
   - **Verified:** a two-tab probe against the dev server. Tab A set Dark, then the older tab B set USD. Stored settings were `{"currency":"USD","theme":"dark"}`, and tab A was still dark with USD after a reload. Before the fix, the theme reverted to `system`.
   - **Not tested:** no automated test covers this, because tests are frozen and §9.3 only requires two-tab handling for history.
2. **G44-2, the context value isn't memoised, and a failed settings save is silent:** **won't fix.** Same reasoning as D-50 item 4, and AC-6.6 requires the silence.
3. **G44-3, the inline pre-paint script duplicates `parseSettings`:** **accepted.** The script must run before any bundle loads, so it can't import the module. The three `[SPEC-§9.2]` settings tests plus AC-6.3 guard against the two drifting apart.

### D-54 Widen the input limits (owner request, 2026-10-18)
- **Request:** the owner asked to remove the limits on loan amount, interest rate and tenure.
- **Developer analysis:** removing them entirely isn't safe.
  - Above about 10^38 the 40-digit precision is exceeded.
  - An unbounded tenure would hang the browser while it draws the schedule.
  - A 1,000% rate broke the 0.01 guarantee in 11 months of one loan.
- **Decision (owner, 2026-10-18):** widen to **wide, verified limits** (for example amount up to 10^15, rate up to 100%, tenure up to 100 years or 1,200 months, with exact values set by verification). Do it **now, before group 5**.
- **Status:** the bounds search found D-55 first. The exact bounds waited on the D-55 decision.
- **Verification** (exact decimal arithmetic, spec §5.2 exactly, under the D-55 guarantee: every payment within 0.01 of the headline except the final one, within 0.02; principal never negative; balance ends at 0.00):
  - **Smallest amount:** Rs 1 fails, because at 0% over long tenures the headline rounds to 0.00. **Rs 10 passes** an exhaustive grid of 216 rate × tenure cases up to 1,200 months.
  - **Rate × tenure:** near 100% over 1,100 to 1,200 months, a month's principal can be −0.01 (11 of 20,000 failed at 100%; a failure was seen at 97.77%).
  - **Up to 90%:** 0 failures in 20,000 corner-biased random loans per maximum (50%, 60%, 75%, 90%), each over amounts 10 to 10^15 and 1 to 1,200 months.
  - **At the edge:** 0 failures in a dense sweep of 5,082 schedules each at 75% and at 90% (rates within 5 points of the maximum, 1,100 to 1,200 months, past-failure amounts).
  - **Today's limits:** 0 failures in 20,000 under the D-55 guarantee.
  - **New references:** L-MIN and L-MAX satisfy every invariant, and an exact-rational cross-check gives identical rows.
- **Decision (owner, 2026-10-18):** **amount 10 to 1,000,000,000,000,000; rate 0 to 75%; tenure 1 to 100 years or 1 to 1,200 months** (75% rather than 90%, for margin below where failures start). This **supersedes the bounds in D-02**; D-02's other reasoning stands.
- **Copy:**
  - `Loan amount must be between 10 and 1,000,000,000,000,000.`
  - `Interest rate must be between 0 and 75%.`
  - `Loan tenure must be between 1 and 100 years.`
  - `Loan tenure must be between 1 and 1,200 months.` (grouped like the amount message)
  - The rounding note (D-55) becomes `Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.` This is currency-neutral, and true by D-55.
- **New references:**
  - **L-MIN** = 10, 0.01%, 1 month: monthly Rs 10.00, total interest Rs 0.00, total payable Rs 10.00.
  - **L-MAX** = 1,000,000,000,000,000, 75%, 100 years (1,200 months): monthly Rs 62,500,000,000,000.00, total interest Rs 74,000,000,000,000,003.34, total payable Rs 75,000,000,000,000,003.34.
- **Corner-biased generators (D-38) move with the bounds:** amounts 10 to 20,000; rates 45 to 75%; tenures 900 to 1,200 months; every new exact bound appears.

### D-55 Counterexample to invariant 6 / AC-10.5 within the CURRENT limits (open)
- **Finding (Claude Code, 2026-10-18, while verifying D-54):** spec §5.3 says "every payment is within 0.01 of the headline payment", and §5.4 invariant 6, AC-10.5 and the `note.rounding` copy say the same. That is **not true**, even within the approved D-02 limits.
- **Evidence:**
  - 20,000 uniform random loans within the current limits, run with exact decimal arithmetic using spec §5.2 exactly.
  - **4 loans (0.02%)** have one payment more than 0.01 from the headline.
  - The **largest deviation is 0.02**, and it is **always the final month**.
  - The final balance is still exactly 0.00, and every other invariant holds.
  - Reproduced with the app's own TypeScript code (`validateInputs` and `calculateLoan`, run in the dev server):
    - `81020318.72`, `3.97`, `204` months: headline 546,773.74, final payment 546,773.72.
    - `5649385.87`, `44.01`, `439` months: headline 207,191.25, final payment 207,191.27.
    - `1235400.38`, `50`, `238` months: headline 51,478.12, final payment 51,478.14.
- **Why the tests didn't catch it:** the frozen property test (fast-check, 1,000 runs, seed 20261017) didn't draw any of these rare cases. The original "about 1,700 cases" verification in §5.3 missed them too.
- **Rule applied:** spec §5.4 says to stop, record and report; don't change the algorithm or loosen the invariant without approval. Nothing has been changed.
- **Decision (owner, 2026-10-18): option A, state it truthfully.** The algorithm (spec §5.2) is unchanged. The guarantee becomes: **every payment is within 0.01 of the headline payment, except the final payment, which is within 0.02**. This updates spec §5.3 and §5.4 invariant 6, AC-10.5, AC-10.6 and the `note.rounding` copy, and the matching frozen tests through the test-designer, with the owner seeing the diff. It is done together with D-54.
- **Rejected:** (B) changing the algorithm so every payment stays within 0.01, which is riskier and departs from §5.2; (C) narrowing the limits, which doesn't help because the failures appear at every rate and size.

### D-56 Test-designer readings for the D-54/D-55 test update (Proposed)
The frozen tests were updated by the test-designer under D-54 and D-55. Its readings:
1. **A one-row loan** (L-D, L-MIN) counts as the "last row" for AC-10.5, so it gets the 0.02 limit. That's trivially met, because its only payment is the headline.
2. **On screen, the last row** is found by index (`months − 1`).
3. **AC-10.8's "1,200th row"** means 1,200 data rows, which is 1,201 `<tr>` elements including the header.
4. **Gap (accepted):** nothing asserts that fast-check actually drew each exact bound. The bounds are still covered, deterministically, by a grid of 24 bound combinations.
5. **§4.2:** `00012` is now valid and `.5` is `AMOUNT_RANGE`. Both follow from the minimum of 10.
6. **Rate `75.001`** gives `RATE_DECIMALS`, not `RATE_RANGE`, because precision is checked before range (existing rule).

Other incidental changes (each needed because an old "invalid" example became valid under D-54):
- The SPEC-§3.2 unit test changed tenure `41` → `101`.
- AC-2.11 changed rate `60` → `99`.
- Validate cases moved: `50.01` → `75.01`, and `1000`/`600` months → `5000`/`1201`.
- Property-test cents are now `bigint`, because 10^17 cents exceeds 2^53.

**Mini-gate (2026-10-18):** the code-reviewer found 0 blocking issues, and its own fuzz of 20,010 loans (seed 90210) gave 0 counterexamples. One Major (D54-1): AC-2.15 still quoted the old range message, which the developer had missed. The owner approved fixing it ("yes please fix it"), and AC-2.15 now quotes `Loan amount must be between 10 and 1,000,000,000,000,000.` The owner didn't address D-56 separately; it is recorded as accepted with the gate, and the owner may still amend it. Minors D54-2 and D54-3 (narrow-width clipping and wrapping) are scheduled for group 6.

**Result after the code change:**
- Vitest: 297 of 297, including every property at 1,000 runs, seed 20261017, over the new bounds.
- E2E for groups 1 to 4 (group 5 and group 6 layout tests excluded, the exclusions listed): 282 of 282 across the 3 browsers.

### D-57 Group 5 implementation choices (Proposed, owner to review at G4.5)
1. **One module, re-read first:** `src/storage/history.ts` owns all history storage. Every save, delete and clear re-reads storage first and returns the list it just wrote, and the UI shows exactly that list (D-13). The duplicate check compares against the newest *stored* entry.
2. **Load validation (§9.2):** every check, in order. A `monthlyPayment` that isn't a valid number is caught rather than thrown. The payment is checked with `emi` alone, not a full schedule. Later duplicates of an `id` are dropped, and the list is cut to 20.
3. **History line 2** shows the stored `monthlyPayment`. On load it has already been checked equal to `round2(emi(...))`, so it *is* the recomputed value.
4. **Failure paths are kept separate:**
   - a failed **save** makes history *unavailable* for the visit (§9.3);
   - a failed **delete or Clear all** keeps the entries and shows `history.removeFailed` (D-28);
   - the message clears on the next successful change. A reload triggered by another tab doesn't clear it.
5. **Deleting the last entry** removes the storage key, the same as Clear all, rather than writing `[]`.
6. **Focus** is applied in an effect after the DOM updates (§8.3, D-30, AC-12.1). Restore focuses its own button explicitly, because WebKit doesn't focus buttons on click. The dialog's close effect, a child effect, runs before the panel's focus effect, so focus never lands behind the modal.
7. **Escape on the dialog:** the native `cancel` event is prevented and routed through state, so all focus handling stays in one place.
8. **Other tabs:** the `storage` listener reloads on the history key or `key === null`. If the focused entry vanished, focus moves to the heading.
9. **Markup:** the Saved calculations `<section>` isn't named, so there's no extra landmark. The list (`<ul aria-labelledby>`) carries the name, per §8.3.1.
10. **IDs:** `crypto.randomUUID()` where available, otherwise timestamp plus counter (§9.2).

### D-58 G4.5 findings (Proposed, owner to review at G4.5)
The code-reviewer reported `BLOCKING FINDINGS: 0` for group 5, with these findings:
1. **G45-1, Cancel focuses a Clear all that another tab has just disabled, dropping focus to `body`:** **fixed.** A focus target that can't take focus (a disabled Clear all, or an entry removed meanwhile) falls back to the Saved calculations heading. Proved by `[REVIEW-1]`.
2. **G45-2, a stored `createdAt` in late 9999 UTC displays as the year 10000 in Karachi:** **fixed.** The year check uses local time, the time that is displayed. This is a reading of §9.2's "a year from 2000 to 9999" as the displayed year. The frozen `[SPEC-§9.2]` 1999 case still drops. Proved by `[REVIEW-2]`.
   - The reviewer changed its own `[REVIEW-2]` assertion, because the entry is now dropped and `not.toContainText` on a missing item fails. It now asserts that no `10000` appears on the page. That's the reviewer's own file, and the intent is unchanged.
3. **G45-3, a tampered 10,000-entry store took up to 1.8 s:** **fixed.** `parseHistory` stops after the first 20 valid, unique entries. The result is identical, because the list is truncated to 20 anyway.
4. **G45-4, the frozen `[AC-8.1]` test fails in Firefox only:** **owner decision.** On a neutral page (no app code), Tab from the last tabbable element leaves focus on that element in Playwright's Firefox, but moves it to `BODY` in Chromium and WebKit. Both developer and reviewer probed this independently. The test's `expect(resetBtn).not.toBeFocused()` after that Tab therefore checks browser behaviour, not the app; the app's tab order is correct, including the disabled Clear all being skipped.
5. **G45-5, code quality:** an unreachable guard in `onRestore`, and one `removeFailed` message for both read and write failures. **Accepted.**

**Process note:** the developer ran a Playwright suite while the reviewer was also running one. They collided in `test-results/`, giving ENOENT trace errors in Firefox. The clean re-run with nothing else running: **452 of 453 across 3 browsers** (the full frozen suite plus 6 reviewer tests). The only failure is G45-4. From now on, the developer and reviewer never run Playwright at the same time.

### D-59 Post-G3 fix: portable AC-8.1 assertion (owner-approved change to a frozen test)
- **Defect (G45-4):** in `e2e/s08-keyboard.spec.ts`, `[AC-8.1] Tab order on a first visit` asserts `expect(resetBtn(page)).not.toBeFocused()` after pressing Tab past Reset, the last tabbable control. Playwright's Firefox keeps focus on the last element in that case, while Chromium and WebKit move it to `BODY`. This was shown on a neutral page by both the developer and the reviewer. The line tests browser behaviour, not the app.
- **Decision (owner, 2026-10-18):** replace only that line with a portable check: after the Tab, focus is on Reset or has left the page content (`body` or `document`), but is **not on any other element of the page**. The `clearAllBtn not.toBeFocused()` check before it stays. The `test-designer` makes the edit, and the owner sees the diff.
- **Rejected:** removing the line (it loses the "no unexpected focus" check); leaving it failing (S-8 could never be Implemented).

### D-60 Group 6 implementation choices (Proposed, owner to review at G4.6)
Every S-5 and S-8 test already passed before group 6, apart from the D-59 Firefox issue. So group 6 fixed the layout findings from earlier reviews instead:
1. **D54-2, Calculate clipped at 200% zoom:** button rows (`.actions`, history `.entry-actions`) wrap instead of overflowing.
2. **Narrow viewports:** below 300 CSS px (360 px at 200% zoom = 180 px), tenure and unit stack, and page and card padding tighten. 360 px and up look unchanged. The history entry's non-wrapping buttons had pushed the page to 234 px at 180 px wide; it's now 180/180 in Chromium, Firefox and WebKit, with no clipped buttons. This is beyond the spec's 360 px requirement and WCAG's 320 px reflow, but it's a real case (phones at 200% zoom).
3. **D54-3, figures broke mid-number:** a `<wbr>` after every comma in the summary figures and history lines, via `BreakAfterCommas`. Long amounts now wrap between digit groups. `<wbr>` adds no text, so `textContent`, the `getByLabel` names and the D-29 button names are unchanged. `overflow-wrap: anywhere` stays as a last resort.
4. **M-5, inconsistent summary wrapping:** every figure shows its label above its value. The headline uses `clamp(1.15rem, 6vw, 1.5rem)`.

**Exit condition met:** `CI=1 npm run verify` exits 0.
- lint, format, typecheck: clean.
- Vitest: 297 of 297.
- build; size 85.4 KB of 150 KB.
- E2E: **453 of 453** across Chromium, Firefox and WebKit.
- `trace --results`: OK, **94 of 94 v1 ACs tested and passing**.

**Still open for G4.6:** CI on GitHub (D-22, D-32). The remote doesn't exist yet, so AC-10.8's "on the CI test machine" isn't proven yet.
- **Correction (developer, 2026-10-18, after the G4.6 review, G46-2):** "Exit condition met" overstated a single run. The reviewer's `CI=1 npm run verify` **exited 1**: `[chromium] [AC-8.4]` failed, and it failed in 6 of 9 isolated re-runs on the reviewer's machine. The developer reproduced it: 0 failures in 10 runs alone, but **1 failure in 40 under parallel load** (`Expected: < 407, Received: 416`), and **0 in 40 with Chromium smooth scrolling disabled**. Cause: the frozen test reads `scrollTop` as its next baseline while Chromium's smooth keyboard-scroll animation is still running, so the next comparison races the end of the previous scroll. **The app is correct**: positions settle at 40 → 416 → 40 → 0. Under 8 parallel Firefox workers there were also 30-second timeouts on page load and focus; that's overload of the machine, not this race. So `verify` is **not yet reliably green**, and the fix needs the owner (frozen scope; see G46-1).

### D-61 Post-G3 fix: AC-8.4 waits for scrolling to settle (owner-approved change to a frozen test)
- **Defect (G46-1, Blocker at G4.6):** `[AC-8.4]` in `e2e/s08-keyboard.spec.ts` reads `scrollTop` as its next baseline straight after a poll succeeds. Chromium animates keyboard scrolling, so the baseline can be read mid-animation and the next comparison races. Evidence: 6 of 9 isolated reviewer runs failed; the developer saw 1 in 40 fail under load (`Expected: < 407, Received: 416`). The app is correct.
- **Decision (owner, 2026-10-18):** after each key press, the test waits until `scrollTop` stops changing before it records the baseline. The assertions are unchanged: ArrowDown and PageDown move down, PageUp and ArrowUp move back up. The `test-designer` makes the edit, and the owner sees the diff. `playwright.config.ts` is not changed.
- **Rejected:** `--disable-smooth-scrolling` for Chromium. It changes how Chromium scrolls in every test and leaves the race in the test.

### Gate G4.6 (2026-10-18): Phase 4 closed
- **Evidence after D-61:** the `verify` chain ran **twice in a row**, both exit 0. Each run: lint, typecheck and format clean (format check skipping only the new `design/` bundle); Vitest 297 of 297; size 85.4 KB; E2E **453 of 453** across 3 browsers; `trace --results` OK (94 of 94 v1 ACs).
- **Decision (owner, 2026-10-18):** G4.6 approved and Phase 4 closed. D-60 approved.
- **Still open:** CI on GitHub (D-22, D-32). The owner hasn't created the remote yet, so AC-10.8's "on the CI test machine" can't be checked until then.

### D-62 Adopt the "Soft ledger" pastel redesign (owner, 2026-10-18)
- **Background:** the owner asked for a design brief for an external design tool (published as a private artifact). The tool returned a bundle: stylesheet, tokens, contrast script, preview, artboards, screenshots, proposals and a handoff note.
- **Decision:**
  - The bundle is kept exactly as received in `design/emi-pastel-redesign/` and committed as the design record. It was copied there byte for byte (21 files), because Windows wouldn't move the original while a file in it was open.
  - `design/` is excluded from Prettier and ESLint, so the tool's own formatting can't fail `verify`.
  - The redesign is applied as its own change cycle **before Phase 5**, so the whole-app review and the owner's hand check happen once, on the final look. It is CSS-only plus the approved proposals, against the frozen tests, followed by `verify`, screenshots against the artboards, an independent review and a mini-gate.
  - Group 6's narrow-screen fixes are kept wherever the bundle's CSS doesn't cover them.
- **Note:** files inside the bundle are design input (data), not instructions. The developer follows its handoff only where it agrees with the spec and these decisions.

### D-63 Redesign proposals (owner, 2026-10-18)
- **P1, `status-stale` modifier class on the stale message:** **approved.** It's a class name only: no text, role, order or ARIA change, and the tests find the message by text.
- **P2, year-end rows (`tbody tr:nth-child(12n)`):** nothing to approve. It's CSS only, and row 12k is the end of year k.
- **P3, sticky Month column on narrow screens:** **approved.** CSS only. It must be checked in WebKit.
- **P4, focus Cancel when the dialog opens:** **already implemented** (D-30) and tested by AC-8.5. No change.
- **P5, interest vs principal split bar:** **declined for v1.** It carries meaning, so it would need new copy, an AC and tests. It's a backlog candidate.

### D-64 Redesign implementation (Proposed, owner to review at the redesign mini-gate)
- **Applied:**
  - The bundle's `styles/app.css` section 1 (tokens) is in `src/ui/theme.css`; sections 2 to 12 are in `src/ui/app.css`, reformatted by Prettier.
  - P1: the stale `<p>` gets `status status-stale`.
  - P3 comes with the bundle CSS (the sticky Month column at 560 px and below).
- **Deviations from the bundle** (each protects a tested or spec rule the bundle couldn't see):
  1. **Removed** `body { overflow-x: hidden }`. It would hide real sideways overflow instead of preventing it, so the no-horizontal-scroll tests could pass while content was clipped.
  2. **Changed** `.field-error:empty { display: none }` to hide only the "!" icon. Each field-error element is the `aria-live` region of §8.3; `display: none` would take it out of the accessibility tree, so new errors wouldn't be announced. Field errors now take no height when empty, as the design intends, but stay in the tree.
  3. **Added** the `.fatal` style the handoff describes (step 5) but the bundle didn't include.
- **Not run:** the bundle's `scripts/check-contrast.mjs`. Contrast is checked by the app's own tests (AC-6.5, `[SPEC-§8.4]`) against the live computed tokens.
- **Verification:** `CI=1 npm run verify` **exit 0**: Vitest 297 of 297; size 85.4 KB (CSS adds no JavaScript); E2E **453 of 453** across 3 browsers; `trace --results` OK. Page width equals viewport width at 1280, 360 and 180 px. Screenshots match the bundle's reference boards.
  - An earlier full run had 3 WebKit click timeouts (load); the same three tests passed 15 of 15 in isolation.
  - A first L-MAX render probe suggested WebKit was 3× slower. A fair alternating A/B (3 rounds, WebKit, same method) disproved it: redesign medians 126 / 172 / 135 ms against old CSS 188 / 162 / 142 ms, all far under 1 s. The first probe was measurement noise, and the claim is retracted.
- **Open observation:** the full E2E suite takes about 8.3 minutes against 5.5 before. The cause isn't established, and it isn't a failure.
- **Note for the owner:** the design's reference board shows `Rs 66,185.46` and `Rs 1,066,185.46` for L-A. Those are example numbers in a static picture; the correct figures, which the app shows and the tests check, are 66,185.45 and 1,066,185.45.

### D-65 Visuals: four charts in the results (owner, 2026-10-18)
- **Request:** the owner asked for "a few visuals (like charts, diagrams)" and chose all four offered: a cost split bar, balance over time, payment make-up over time, and a yearly summary chart plus table.
- **Decision:** approved as written in `docs/process/proposal-visuals.md`.
  - New stories **S-20** (R-1/J-2), **S-21** (R-3/J-8) and **S-22** (R-2/J-5). **S-19** moves from Backlog to v1, with AC-19.2 to AC-19.4 added (AC-19.1 unchanged).
  - New domain functions `costSplit`, `interestShare` and `yearlySummary` (spec §3.1.1), plus `formatPercent` (always 1 dp, half-up).
  - New copy in spec §7, chart rules in §8.3.2, and the DOM contract rows in §8.3.1.
- **Owner-approved edits to owner-only files:**
  - `docs/jobs-to-be-done.md`: the owner explicitly approved exactly four edits ("You make exactly those edits"): J-2 + S-20, J-5 + S-22, J-8 + S-21, and J-9's S-19 no longer "(backlog)".
  - `docs/user-stories.md`: the new stories and ACs, and S-19's scope.
- **Reference values:** computed independently with exact decimal arithmetic (spec §5.2), and cross-checked: L-B's yearly interest sums to AC-3.2's Rs 1,309,014.14, and its principal to Rs 2,500,000.00.
- **Process:** the `test-designer` writes the new tests (red), and the owner approves them, frozen under the tag `g3b-visuals-tests-approved`. Then implementation, `verify`, an independent review and a mini-gate, before Phase 5. **Existing frozen tests are not changed.**
- **Still open from the redesign mini-gate:** D-64 approval, and whether to add the RD-3 forced-colors borders. The owner moved on to this request without answering.

### D-66 Chart test hooks (Proposed, owner to review at G3b)
- **Decision:** spec §8.3.1 gains three `data-` hooks: `[data-hit-area]` (hover geometry: item *k* of *n* at (*k* − 0.5) / *n* of its width), `[data-segment]` (the cost bar's parts) and `[data-series]` (every chart mark).
- **Why:** the chart SVG is deliberately `aria-hidden`, because the figcaption and tables carry the data for assistive technology. So role and name locators can't reach the hover areas, the segments or the marks. The hooks are defined before the tests are written, so the test-designer doesn't invent a structure that then gets frozen without anyone deciding it (the D-43 lesson).

### D-67 Gate G3b: visuals tests approved and frozen (owner, 2026-10-18)
- **Evidence:**
  - 48 new Vitest tests, all red on `NOT_IMPLEMENTED`; the 297 existing tests pass.
  - 30 new E2E tests per browser, all red on missing charts, with AC-21.3 on its intended timeout. 0 early passes.
  - No existing test, fixture or config changed. `trace` OK, with 115 ACs.
- **Decision (owner, 2026-10-18):** "approved". G3b is approved, and the new tests are frozen from tag `g3b-visuals-tests-approved` under the same rules as D-12 and D-23. D-66 is approved.
- **Three gaps in the proposal, closed with the developer's suggestions** (the owner approved without separate answers, so the suggestions stand):
  1. the yearly chart's `<figcaption>` is `Interest and principal paid each year.` (new copy key `yearly.chart.caption`);
  2. the yearly tooltip amounts carry the currency symbol, like the other tooltips;
  3. `{n}` in the balance sentence is grouped (`1,200`), matching the error messages.
- **Test-designer readings** (binding with the tests):
  - the results card is the smallest ancestor holding the summary, the four figures and the schedule;
  - "chart text" means every element with its own visible text inside a `<figure>`, plus the four chart titles (tooltips excluded);
  - marks must resolve to a solid colour (fill, else stroke, else `background-color`);
  - a 0%-interest cost bar may omit the interest segment, or make it at most 0.5 px wide;
  - each hoverable figure has exactly one `[data-hit-area]`;
  - the tooltip is the single page-level `role="tooltip"` after a hover;
  - the legend order is the document order of the exact texts `Principal` and `Interest`;
  - yearly cells are read as `th, td`;
  - there are exactly 4 figures, and the yearly chart is the 4th.
- **Still open:** D-64 (redesign gate) and RD-3 (forced-colors borders).

### D-68 Visuals implementation (Proposed, owner to review at the visuals mini-gate)
1. **Domain:** `costSplit`, `interestShare` and `yearlySummary` in `src/domain/summary.ts`, and `formatPercent` in `format.ts`. All use exact `Decimal` arithmetic with half-up rounding to 1 dp; `loanPercent` is `100 − interestPercent`.
2. **Geometry:** every chart uses one band layout. Item *k* of *n* spans [*k*/*n*, (*k*+1)/*n*] of the plot, centred where the D-66 hover hook expects it.
   - The balance and payment charts are **stepped areas**, one `<path>` per series however many months there are. The yearly chart is **bars**, again one `<path>` per series.
   - The SVG stretches to the card (`preserveAspectRatio="none"`). **All text is HTML** (caption, legend, axis ends, tooltip), so nothing scales down to unreadable sizes on phones.
3. **No money becomes a JS `number`.** Drawing needs a dimensionless ratio (value ÷ max), computed in `Decimal` and converted with `toNumber()` only for pixel geometry. The cost bar's flex weights are the two *percentages*, which are not money.
4. **Palette,** checked with the dataviz validator script against the real card surfaces (all checks pass: lightness band, chroma, colour-blind separation ΔE ≥ 25, normal-vision ΔE ≥ 25, ≥ 3:1 against the surface):
   - light: Principal `#6A50D3` (the design's focus colour), Interest `#C4512E`;
   - dark: Principal `#957EEC`, Interest `#D4703C`.
   - The **balance** (and the cost bar's **loan amount**) use the Principal colour: the balance *is* the principal still owed, and a teal tried first failed the chroma and colour-blind checks.
5. **No new words beyond the approved copy.** The axes show only the first and last item numbers (`1` … `120`).
6. **No new keyboard stops:** the charts aren't focusable, and the yearly table isn't a scroll region, so AC-8.1's frozen tab order is unchanged. Keyboard and screen-reader users get every value from the captions and tables. The tooltips are pointer-only, as §8.3.2 allows.
7. **Evidence:**
   - Vitest **345 of 345**.
   - The four visual specs **90 of 90** across 3 browsers on the first full run.
   - Full `CI=1 npm run verify`: the first run gave 542 of 543, with one WebKit 8-second click timeout in `[AC-2.16]`, a test that renders no chart. That test then passed 5 of 5 alone in WebKit, and the **second full run exited 0 with E2E 543 of 543** and `trace` OK. This matches the earlier load-only WebKit timeouts (D-64).
   - Bundle 87.1 KB (it was 85.4 KB).

### D-69 Sticky loan form (owner request, 2026-10-18)
- **Request:** the owner's screenshots showed the empty space under the form while scrolling the results: "freeze the actual calculator … when you scroll the space on left is empty".
- **Decision:** at **≥ 769 px wide and ≥ 820 px tall**, the form card is `position: sticky` (`top: 24px`) and follows the scroll. In shorter windows it scrolls normally, so the bottom of the form (Calculate) can never end up out of reach. Phones and tablets keep the single column.
- **One wrapper `<div className="layout-main">`** now holds the form and the results. A sticky element can travel to the end of its parent box, and with the whole layout grid as parent, the form **overlapped Saved calculations** at the end of the page (probe: form bottom 568 px against the card top at 511 px). The wrapper has no role or semantics and changes no order. With it, the form stops at the end of the results (form bottom 487 px against the card top at 511 px) in Chromium, Firefox and WebKit.
- **Not done:** no sticky behaviour on short windows. The 820 px threshold leaves room for the form with all three error messages showing.
- **Owner's check (visuals mini-gate, 2026-10-18): "Not working".** The developer measured instead of guessing. The form is 544 px tall (601 px with all three errors), but the rule needed a **window** at least 820 px tall. Typical laptop windows (1280 × 800, 1366 × 650, 1536 × 730) were all below that, so the form never stuck; it stuck only at 1920 × 950. The developer's own probe had used a tall window, so it missed this. The threshold was the developer's error.
- **Decision (developer fix, under the owner's approved request, 2026-10-18):** the height condition is removed. Whenever the form and results are side by side (≥ 769 px wide), the form card is sticky with `max-height: calc(100vh − 48px)` and `overflow-y: auto`. In a window too short for the whole form, the card scrolls on its own, so Calculate is never out of reach, and the old reason for the threshold is gone.
  - Probe in Chromium, Firefox and WebKit: at 1280 × 800 and 1366 × 650 the form stays 24 px from the top while the results scroll, and stops 24 px above Saved calculations. At 1280 × 480 the card scrolls internally and stays at 24 px. At 768 px the layout is stacked and not sticky, as before. Keyboard focus on Calculate is in view in every side-by-side case.
  - The full `verify` result is recorded in the visuals mini-gate follow-up.

### D-70 Visuals review fixes (Proposed, owner to review at the visuals mini-gate)
The code-reviewer's visuals report (docs/process/review-findings.md, "Visuals") had 0 blocking findings, 2 Majors and 3 Minors. No test or frozen file was changed.
1. **F-1 (Major), the yearly table at 180 px** (200% zoom of 360 px): the four column headers need 284 px of a 130 px column, so the page scrolled sideways by 129 px.
   - Shrinking the table can't fix it without breaking words mid-letter.
   - **Decision:** the table sits in a `div.yearly-scroll` with `overflow-x: auto`. While (and only while) the table is wider than that wrapper, a `ResizeObserver` makes the wrapper `role="region"`, named by the "Yearly summary" heading, with `tabIndex=0`, so keyboard users can scroll it. This matches the schedule's region (§8.2).
   - At normal widths it's a plain `div` with no role and no tab stop, so AC-8.1's frozen tab order is unchanged.
   - Probe in Chromium, Firefox and WebKit: at 180 px, page overflow 0 and one region; at 1280 px, no tabindex and no region.
2. **F-2 (Major) and RD-3, forced colours:** the browser forced the cost-bar segments and legend swatches to Canvas, so they vanished (Chromium, Firefox).
   - **Decision:** under `@media (forced-colors: active)`, the data marks (cost segments, swatches, SVG chart paths) use `forced-color-adjust: none` and keep their colours, with a `1px solid CanvasText` border on the segments and swatches.
   - The **headline tile and the rounding note** gain the same border. This is the optional RD-3 item, done here because it is the same media block; the owner may veto it.
3. **F-3 (Minor) tidy-ups:**
   - the cost legend now uses `copy.chart.cost.interest` (same text, `Interest`), so no spec §7 key is unused;
   - BalanceChart's duplicate import is merged;
   - HoverBand uses `VIEW_W` and `VIEW_H`;
   - the Year cell is `<th scope="row">`, with the header styles scoped to `thead` so it looks as before.
4. **F-4 (Minor), WebKit load timeouts:** they can't be fixed in the tests (frozen). To reduce load:
   - the charts and the schedule are now a memoised `ResultsDetail`, so they redraw only when the loan or currency changes, not on other state changes such as the history save right after Calculate;
   - each chart memoises its paths, so pointer hover no longer rebuilds 1,200-month paths.
   - This reduces work, but it is **not proof** that the flake is gone; the full `verify` result is the evidence.
5. **F-5 (Minor), stale hover index:** `useBandHover` now ignores an index beyond the current item count. The reviewer couldn't reproduce it (a new calculation needs a click, which ends the hover), so this is a guard only.
6. **Not changed, for the owner:** the reviewer suggested making explicit in spec §8.3.2 that drawing ratios and percentages may become JS numbers for geometry only (D-68 item 3). The spec is unchanged until the owner agrees.
7. **Evidence:**
   - lint, typecheck and format clean; Vitest 345 of 345;
   - `[REVIEW-V1]`, `[REVIEW-V2]`, S-19 to S-22 and S-8: 129 of 129 across 3 browsers;
   - the full `verify` result is in the visuals mini-gate summary.
   - **Result (developer, 2026-10-18):** full `CI=1 npm run verify` **exit 0 on the first run**: lint, format and typecheck clean; Vitest 345 of 345; size 87.4 KB of 150 KB; E2E **549 of 549** across 3 browsers (543 before, plus `[REVIEW-V1]` and `[REVIEW-V2]` in each browser), in 7.9 minutes; `trace --results` OK. No WebKit timeout this run. One clean run is not proof that the F-4 flake is gone.

### D-71 Drawing ratios may be JS numbers (owner, visuals mini-gate, 2026-10-18)
- **Background:** the reviewer suggested making D-68 item 3 explicit in the spec, so the "money is never a JS `number`" rule can't be misread at the next review.
- **Decision (owner):** approved. Spec §8.3.2 gains one line: a chart may turn a dimensionless ratio (value ÷ max, computed in `Decimal`) or a percentage into a JS `number`, only for drawing geometry. Money values never become a JS `number`, and nothing drawn is used in a calculation or shown as text.

### Visuals mini-gate (2026-10-18)
- **Decision (owner):** D-68 approved; D-70 approved, including the RD-3 borders; D-64 approved; D-71 approved. D-69: **"Not working"**. It was fixed as recorded under D-69 and is back with the owner to check by hand.

### D-72 AC-10.8 regression from D-70: forced layout removed (developer fix, 2026-10-18)
- **Found by:** the full `CI=1 npm run verify` after the D-69 sticky fix **exited 1**: 547 passed and 2 failed, both WebKit. `[AC-1.10]` was the known 8 s click timeout under load. **`[AC-10.8]` measured 1,133 ms against the 1,000 ms limit.**
- **Cause, measured rather than assumed:** an A/B/C of the L-MAX render, timed in the page exactly as AC-10.8 does, on the production build, WebKit, 8 runs each:
  - current code: median 223 ms (178–355);
  - sticky change removed: median 274 ms (235–358), so **sticky is not the cause**;
  - **D-70's synchronous `scrollWidth` read removed: median 114 ms (102–130).**
  - React flushes effects synchronously after a click, so that read forced WebKit to lay out the whole page (1,200 rows plus charts) *before* the test's clock stopped. Under the full suite's parallel load that doubled cost crossed 1 s.
- **Decision:** remove the read. The `ResizeObserver` delivers each element's first observation after layout anyway, so the yearly table still becomes a scroll region only while it overflows. Re-probed in 3 browsers: a region at 180 px, a plain block at 1280 px, no page overflow.
- **Lesson:** D-70's evidence (one green run) did not show a performance cost that was there all along. Timing-sensitive changes now get a measured A/B, not only a pass/fail run.

### D-73 Deploy before Phase 5 (owner, 2026-10-18)
- **Request:** the owner created the public repo `https://github.com/iarslandogar/Loan-calculator`, set Pages → Source to **GitHub Actions**, and asked to deploy now.
- **Decision:** `v1` is pushed with the freeze tags and merged into `main`. The push to `main` runs `deploy.yml`: CI `verify` on Linux first, then the Pages deploy, then the `@smoke` tests against the live URL. Any failure stops the deploy.
- **Change to the loop plan's order:** the plan put Phase 5 (the whole-app review and the owner's hand check) before release. Deploying first is the owner's call. Phase 5 still runs, and can use the live site. **No story Status changes**: every story stays "Not implemented" until the owner decides at G5.
- **Local timeouts explained (2026-10-18):** after D-72, local `verify` still failed 4 WebKit tests, all 30 s timeouts. The **unchanged committed code** (which had passed 549 of 549 that day) then failed the same tests too, so the code was ruled out. The laptop was **on battery** (37%, CPU throttled). After the owner plugged it in, the full `CI=1 npm run verify` **exited 0**: Vitest 345 of 345, E2E 549 of 549, `trace` OK. Local WebKit runs on battery are not valid evidence.
- **Result (2026-10-18):**
  - `v1`, `main` and both freeze tags are pushed to `origin`.
  - CI run `39150790709` on `v1`: **success** (full `npm run verify` on Linux).
  - Deploy run `39153885811` on `main`: verify **success**, deploy **success**, smoke **success** (it waited until Pages served commit `182e87d`, then ran the `@smoke` tests on the live URL).
  - Live: **https://iarslandogar.github.io/Loan-calculator/**, HTTP 200, `build-id` = `182e87de227d470871608c3c4219c91bef94101e`.
  - This is the first CI evidence for AC-10.8's "on the CI test machine" (D-32): the Linux `verify` includes `[AC-10.8]` in all 3 browsers and passed. Per-test counts weren't read, because GitHub's job logs need a signed-in account.
- **Note:** the repo name is `Loan-calculator`, not the plan's `muhammad-arslan-calculator`. The workflows take the name from the repository, so the Pages path is `/Loan-calculator/` with no change. `package.json` keeps its old name, which is cosmetic.

### D-74 Transcripts of the development (owner, 2026-10-19)
- **Request:** "can you create a transcript for the whole development we did?"
- **Decision:** `transcripts/` holds:
  - a readable Markdown transcript of the main session, with owner messages verbatim (including the one sent mid-task) and tool calls collapsed and shortened;
  - one transcript per subagent run (19);
  - filtered raw JSON Lines logs;
  - the generator script `make_transcripts.py`;
  - an index (`transcripts/README.md`) with a timeline and the exclusions.
- **Left out, the developer's recommendation, accepted by the owner ("yes"):**
  - Claude Code's API request records (about 30 MB), which hold the tool's internal system prompt and a list of the owner's other connected accounts;
  - environment and file-history bookkeeping;
  - injected `<system-reminder>` blocks;
  - in the Markdown only, private reasoning blocks.
  - The loop plan said "remove secrets, change nothing else". This filters more than that, and is stated openly in the index. The owner may still ask for the unfiltered logs.
- **Secrets scan:** GitHub, Anthropic, OpenAI and AWS tokens, bearer tokens and private keys: none found.
- **PDF (owner request, "give me file here as well, as a pdf"):** `session-01-conversation.pdf`, 66 pages: the conversation in full, with each run of tool work as one line (a PDF can't collapse sections, so the full tool detail stays in the Markdown). It is printed from generated HTML with Playwright's Chromium, so no new dependency. `transcripts/` is added to ESLint's `globalIgnores`, like `design/` (D-62), so the helper scripts can't fail `verify`.
- **Still owed by the owner:** the `session-00-requirements` export from claude.ai (D-00e).

### D-75 README owner inputs; Phase 5 started (owner, 2026-10-19)
- **README, from the owner's own words:**
  - **Why a loan EMI calculator:** "it provides a highly practical, mathematically deterministic problem space to demonstrate core software engineering principles."
  - **Code changed by hand:** "None".
- **Story statuses:** the owner chose "do the check and get everything approved". This starts **Phase 5** (loop plan):
  - the `code-reviewer` reviews the whole app, including exploratory testing;
  - the developer fixes every Blocker and Major without touching frozen tests, re-reviewing until `BLOCKING FINDINGS: 0`, at most 3 rounds;
  - the owner then ticks `docs/process/manual-test-checklist.md` (110 lines) on desktop and on a phone, and decides each story's Status at **G5**.
- **Rule kept:** no Status changes until the owner has done that hand check and approved each story (CLAUDE.md, spec §15). The developer can't do the owner's manual check.

### D-76 Phase 5 round 1: which Minor findings to fix (owner, 2026-10-19)
- **Review result:** `BLOCKING FINDINGS: 0`, with 9 Minor findings (`docs/process/review-findings.md`, "Phase 5, round 1"). The reviewer's `CI=1 npm run verify` exited 1 on three load timeouts (2 Firefox, 1 WebKit), which then passed 45 of 45 alone.
- **Decision (owner):** fix F-P5-1, F-P5-2, F-P5-4 and F-P5-5 before the G5 hand check. F-P5-7 (README slips) was fixed straight away. **Not fixed, by the owner's choice:**
  - F-P5-3: no undo on Delete. It is a product choice, and undo works against J-7 privacy.
  - F-P5-6: shown results are not announced to screen readers. It goes beyond the spec; a candidate for later.
  - F-P5-8: a process note, not a code defect.
  - F-P5-9: invalid stored entries are hidden but stay in storage. Only a tampered store can cause it.
- **Fixes:**
  1. **F-P5-1, Firefox focus in the sticky form:** the form's `onFocus` calls `scrollIntoView({ block: 'nearest' })` on the focused control, which does nothing when the control is already visible. Form controls get `scroll-margin: 12px`, so the 3 px focus ring and its 3 px offset stay visible.
     - Probe at 1280 × 640: Tab to Calculate gives 580–628 of 640 in Chromium, Firefox and WebKit. Before, Firefox showed 606–654.
  2. **F-P5-2, results out of view on a phone:** on the stacked layout (≤ 768 px), when new results are shown (Calculate or Restore) and the results card's top is above the screen or below its middle, the card is scrolled to the top with a 12 px margin. The scroll is instant, so no motion and no unsettled positions for tests. Focus stays where it is (spec §8.3). The position check runs one animation frame later, so it never forces a layout inside the Calculate click (the D-72 lesson).
     - Probe at 360 × 740: after Calculate, `scrollY` is 726, the card top is at 12 px and the monthly payment is visible. After Restore from the bottom, the card top is at 12 px. At 1280 × 800 nothing moves. Same in all three browsers.
  3. **F-P5-4, favicon:** an inline SVG `data:` icon in `index.html`. No file and no request: the probe saw no `favicon.ico` request.
  4. **F-P5-5, axis label:** the axis end uses the existing `groupCount`, so a 1,200-month loan reads `1,200`, like its caption. No frozen test reads the axis text; the AC-21.3 test reads the caption and accepts either form.
- **No frozen test or config was changed.**
- **Evidence:**
  - `CI=1 npm run verify` on mains power exited 1: Vitest 345 of 345; size 87.6 KB; E2E 551 of 552 (`[REVIEW-P5-1]` now passes in all 3 browsers). The one failure was `[webkit] [AC-2.6]`, an 8 s timeout on the *first* Calculate click, before any error or focus move.
  - A/B, the whole S-2 file in WebKit with 4 workers, twice each: **36 of 36 with the fixes, and 1 of 36 failed without them**. The intermittent WebKit timeout predates these changes; it is the known Windows load pattern (D-64, D-68, D-73).

### D-77 Gate G5: statuses set on the automated evidence (owner, 2026-10-19)
- **Phase 5 result:**
  - round 1: `BLOCKING FINDINGS: 0`, with the Minors handled per D-76;
  - round 2: `BLOCKING FINDINGS: 0`. The reviewer's `CI=1 npm run verify` at `3439360` exited 0, with E2E 552 of 552 across the 3 browsers;
  - one more README slip (F-P5-10) was fixed in `fe36603`.
- **Request (owner):** "push and deploy everything and mark it done". The developer pointed out that the checklist showed 0 of 110 lines ticked, and asked how to record it. **Answer (owner): "Approve without full check."**
- **Decision:** the 17 v1 stories (S-1 to S-13 and S-19 to S-22) are set to `Implemented` in `docs/user-stories.md`. The 5 backlog stories stay `Not implemented`.
- **Honest record:**
  - spec §15 point 4 and the user-stories *Conventions* call for a manual check by the human before `Implemented`. That line-by-line check was **not** done, and `docs/process/manual-test-checklist.md` stays unticked;
  - the statuses rest on the automated evidence and the owner's approval;
  - `docs/user-stories.md` (a status note under the index) and the README say the same. The convention text itself is unchanged.
- **Evidence before the push** (Phase 6 step 2): `npm run trace -- --results` → `trace: OK`, every Implemented story n/n passing, read from the reports of the reviewer's 552/552 run. The commits since that run change only the README and docs.

### D-47 Group 2 builds the schedule table; cross-group ACs reported as pending
- **Decision:** The shared helper `expectResultsShown` requires the schedule table, so group 2 builds `ScheduleTable` too; group 3 then verifies S-10 and S-13. AC-4.4 needs the Theme and Currency selects (group 4), and AC-9.2 needs saved calculations (group 5), so they are reported at G4.2 as **pending later groups**, not as done.

---

---

## Change history
| Date | Change | By |
|---|---|---|
| 2026-10-17 | Initial draft | Claude (claude.ai) for M. Arslan |
| 2026-10-17 | Planning phase: D-05 approved (2 dp); D-13 to D-24 added and approved; AC-8.5 and AC-12.2 text updated | Claude Code (Opus 5.5) for M. Arslan, owner-approved |
| 2026-10-17 | Gate G1: D-01 to D-04 and D-06 to D-12 approved (with Decision lines on D-02, D-10, D-12, D-24); D-25 to D-40 added; ACs 1.12, 2.1, 2.12, 2.15, 5.2, 5.3, 8.1, 8.5, 9.1, 10.8, 11.2, 11.5 and 11.10 reworded; AC-2.17 and AC-12.7 added | Claude Code (Opus 5.5) for M. Arslan, owner-approved |
| 2026-10-17 | Phase 2: D-41 (toolchain version conflict) and D-42 (scaffold choices) added as Proposed for G2; spec §2 and §13 notes updated | Claude Code (Opus 5.5) for M. Arslan, pending G2 |
| 2026-10-17 | Gate G2 approved: D-41 (recommendation (a)) and D-42 approved; D-43 (DOM contract, spec §8.3.1) added as Proposed for G3 | Claude Code (Opus 5.5) for M. Arslan |
| 2026-10-18 | Gate G3 approved: D-43 and D-44 approved; tests frozen at tag `g3-tests-approved` | Claude Code (Opus 5.5) for M. Arslan |
| 2026-10-18 | Visuals mini-gate: D-64, D-68, D-70 and D-71 approved; D-69 failed the owner's check and was fixed; spec §8.3.2 gains the drawing-ratio line | Claude Code (Opus 5.5) for M. Arslan |
| 2026-10-18 | D-72 AC-10.8 regression fixed; D-73 deploy before Phase 5 | Claude Code (Opus 5.5) for M. Arslan |
| 2026-10-19 | D-74 transcripts added | Claude Code (Opus 5.5) for M. Arslan |
| 2026-10-19 | D-75 to D-77: README owner inputs, Phase 5 fixes, G5 statuses (17 v1 stories Implemented, on automated evidence) | Claude Code (Opus 5.5) for M. Arslan, owner-approved |
