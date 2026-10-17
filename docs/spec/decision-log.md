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
| D-01 | Three roles: Prospective Borrower, Loan Advisor, Existing Borrower | **Proposed** |
| D-02 | Input bounds | **Proposed** |
| D-03 | Schedule rounding method (re-amortising) | **Proposed** |
| D-04 | Explicit Calculate button; results hidden when inputs change | **Proposed** |
| D-05 | Currency defaults and format | Approved (owner), 2026-10-17 |
| D-06 | Changing tenure unit keeps the number | **Proposed** |
| D-07 | History rules | **Proposed** |
| D-08 | Theme default = System | **Proposed** |
| D-09 | Plain CSS, no UI library | **Proposed** |
| D-10 | Lenient input: commas, lakh style, trailing % | **Proposed** |
| D-11 | Loan model assumptions | **Proposed** |
| D-12 | Tests are frozen after Gate G3 | **Proposed** |
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

### D-11 Loan model assumptions
- **Proposal:** Reducing-balance loan, monthly payments, monthly compounding (annual rate ÷ 12), payments at the end of each month, no fees, no dates.
- **Why:** This is the standard EMI definition used by banks in Pakistan and elsewhere. It is stated in the README as an assumption.

### D-12 Tests frozen after Gate G3
- **Proposal:** Once you approve the tests, the building agent may not edit them. If a test seems wrong, it stops and asks you.
- **Why:** Otherwise the loop can "pass" by weakening tests. This is a classic agent failure mode and a good story for the transcript.

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

---

## Change history
| Date | Change | By |
|---|---|---|
| 2026-10-17 | Initial draft | Claude (claude.ai) for M. Arslan |
| 2026-10-17 | Planning phase: D-05 approved (2 dp); D-13 to D-24 added and approved; AC-8.5 and AC-12.2 text updated | Claude Code (Opus 5.5) for M. Arslan, owner-approved |
