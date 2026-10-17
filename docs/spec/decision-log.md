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
| D-05 | Currency defaults and format | **Proposed** |
| D-06 | Changing tenure unit keeps the number | **Proposed** |
| D-07 | History rules | **Proposed** |
| D-08 | Theme default = System | **Proposed** |
| D-09 | Plain CSS, no UI library | **Proposed** |
| D-10 | Lenient input: commas, lakh style, trailing % | **Proposed** |
| D-11 | Loan model assumptions | **Proposed** |
| D-12 | Tests are frozen after Gate G3 | **Proposed** |

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

## Change history
| Date | Change | By |
|---|---|---|
| 2026-10-17 | Initial draft | Claude (claude.ai) for M. Arslan |
