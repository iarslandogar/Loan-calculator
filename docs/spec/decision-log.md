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
| D-49 | Group 2 implementation choices | **Proposed**: developer decisions, owner to review at G4.2 |
| D-50 | Handling of the G4.2 review's Minor findings | **Proposed**: developer decision, owner to review at G4.2 |

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

### D-50 G4.2 Minor findings (Proposed, owner to review at G4.2)
The code-reviewer reported `BLOCKING FINDINGS: 0` for group 2, with six Minors:
1. **M-1, a stale preview server can be reused locally:** owner decision (see D-49 item 7). Until then, all local E2E runs use `CI=1`.
2. **M-2, the currency note isn't linked to its select:** **fixed.** The select now has `aria-describedby="currency-note"`.
3. **M-3, `ErrorBoundary` has no test or logging, and covers render errors only:** **deferred.** AC-2.16 is proven end to end; event-handler errors aren't caught by any React boundary. A test of the fatal path will be considered in Phase 5.
4. **M-4, unmemoised context value, silent `main.tsx` if `#root` is missing, `as Unit` / `as Currency` casts:** **won't fix for now.** The re-renders are cheap. `#root` is static in `index.html`. The casts read the values of `<option>`s the code renders itself.
5. **M-5, the summary wraps inconsistently at 360 px, and each field reserves an empty error line:** **scheduled for group 6** (S-5 layout). The reserved line is deliberate, so the form doesn't jump when an error appears.
6. **M-6, the sticky header background versus dark tokens:** **scheduled for group 4** (S-6 theme).

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
