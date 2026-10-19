# Loan EMI Calculator

A browser app that works out the equal monthly instalment (EMI), the total interest, the total amount payable and the month-by-month repayment schedule of a reducing-balance loan. It shows amounts in PKR or USD, has light and dark themes, saves recent calculations in the browser, and works from the keyboard and on a phone. It is client-only: there is no backend, and after the page loads it makes no network requests.

**Who it's for** (from [docs/app-roles.md](docs/app-roles.md)):

- **R-1 Prospective Borrower:** "Can I afford this, and what will it really cost me?" Not a finance expert, often on a phone.
- **R-2 Loan Advisor:** "Give the customer an exact, defensible quote, fast." Many quotes a day, keyboard-first, needs recall and privacy between customers.
- **R-3 Existing Borrower:** "Where is my money going, and what do I still owe?" Already repaying; cares about the schedule and the remaining balance.

**Why a loan EMI calculator:** it is a highly practical, mathematically deterministic problem space, well suited to demonstrating core software engineering principles.

## Live app

**https://iarslandogar.github.io/Loan-calculator/**

It is deployed by GitHub Actions on every push to `main`, after the full test suite passes. A smoke test then runs against the live URL.

## Prerequisites

- **Node.js 24** (any 24.x; developed on 24.16.0). This is pinned in `.nvmrc` (`24`) and in `package.json` (`"engines": { "node": ">=24 <25" }`). **Other Node major versions are not supported.**
- **npm**, which comes with Node (developed with npm 11.13.0).
- For the end-to-end tests only: the Playwright browsers. See [Tests](#tests).

No accounts, keys or services are needed.

## Install and start

```bash
npm ci
npm run dev
```

`npm run dev` starts Vite and prints the local URL: **http://localhost:5173/** (if that port is busy, Vite picks the next free one and prints it).

Production build and local preview:

```bash
npm run build      # type-checks the app and writes dist/
npm run preview    # serves dist/ at http://localhost:4173/
```

## Tests

| Command | What it runs |
|---|---|
| `npm test` | Unit and property tests (Vitest, with fast-check for the property tests). |
| `npm run test:e2e` | End-to-end tests (Playwright) in Chromium, Firefox and WebKit, against the production build, which it builds and serves itself. |
| `npm run trace` | Traceability check: roles → jobs → stories → acceptance criteria → tests. Fails if any v1 acceptance criterion has no test. |
| `npm run verify` | Everything, in order: lint, format check, type check, unit tests, build, bundle-size check, end-to-end tests, and the traceability check against the test results. |

**Before the first end-to-end run,** install the browsers:

```bash
npx playwright install              # Windows and macOS
npx playwright install --with-deps  # Linux (also installs system libraries)
```

**Notes:**
- The full end-to-end run takes **about 10 minutes**. Every test runs in each of the three browsers.
- **On Windows, plug the laptop in.** On battery, the throttled CPU made some WebKit tests time out, and the same tests pass on mains power (decision D-73 in the [decision log](docs/spec/decision-log.md)).
- **On Windows, an occasional timeout (seen in WebKit and Firefox) can still happen under the full parallel run, even on mains power.** For example, one click timed out after 8 s in a single test of a full run, and the same test then passed 5 of 5 when run alone (`npx playwright test --project=<browser> <file>:<line>`). The three-browser run that counts is the Linux CI run (spec NFR-1), and it passes.
- Every test that proves an acceptance criterion is titled with its ID, for example `[AC-2.4] …`.

## Product docs

- [docs/app-roles.md](docs/app-roles.md): who uses the app (3 roles).
- [docs/jobs-to-be-done.md](docs/jobs-to-be-done.md): what they need to get done (11 jobs).
- [docs/user-stories.md](docs/user-stories.md): 22 stories (17 in v1, 5 in the backlog) and 115 acceptance criteria, with the reference loans.
- [docs/spec/technical-spec.md](docs/spec/technical-spec.md): stack, architecture, the calculation algorithm, copy, storage, testing and CI.
- [docs/spec/decision-log.md](docs/spec/decision-log.md): every decision, numbered from D-00, and who approved it.

**Story statuses** follow one rule: a story is marked `Implemented` only when all of its acceptance criteria pass in the automated tests in all three browsers **and** in the owner's manual check at Gate G5 ([docs/process/manual-test-checklist.md](docs/process/manual-test-checklist.md)).

**How the statuses were set (Gate G5, decisions D-77 and D-78):** all **17 v1 stories are `Implemented`**:
- **Automated tests:** every acceptance criterion passes in Chromium, Firefox and WebKit; `npm run verify` and `trace --results` pass; the Phase 5 independent review reported 0 blocking findings.
- **Manual check:** on **19 Oct 2026** the owner did the manual check in a desktop browser and on a phone, and ticked all 110 lines of the checklist, one per v1 acceptance criterion. No line failed.

The 5 backlog stories (S-14 to S-18) were not built and stay `Not implemented`.

## How it was built

**AI tools and models** (decision D-00f):
- The requirements pack was drafted with **Claude (claude.ai, Opus 5.5)**.
- The app was built with **Claude Code**, using **Opus 5.5** as the developer and **Sonnet 5.5** subagents: `spec-critic` attacks the spec, `test-designer` writes the tests first, and `code-reviewer` reviews independently. The models check each other's work.

**Process:** the work ran in phases (spec challenge, scaffold, tests first, build story by story, independent review, release). At the end of each phase the developer stopped at a gate, and the owner approved or corrected it. Tests were written before the code and frozen when approved (tag `g3-tests-approved`); after that, a test could change only with the owner's explicit approval, recorded in the decision log. The full plan is in [docs/process/loop-plan.md](docs/process/loop-plan.md).

**Transcripts:** [transcripts/README.md](transcripts/README.md) has the full development session, the 20 subagent runs, and a PDF of the conversation.

## Code changed by hand

None. All code was written by Claude Code, directed and reviewed by the owner.

## Assumptions

From [technical-spec §16](docs/spec/technical-spec.md) and the decision log:

- **Loan model:** a reducing-balance loan with monthly payments, interest at the annual rate ÷ 12, and payments at the end of each month (D-11).
- **Rounding:** amounts are rounded to 2 decimal places, PKR included (D-05). Each month's instalment is recalculated from the remaining balance (D-03). Every payment is within 0.01 of the headline monthly payment, except the final one, which is within 0.02 (D-55).
- **Input limits:** loan amount 10 to 1,000,000,000,000,000; annual rate 0 to 75%; tenure 1 to 100 years or 1 to 1,200 months (D-54).
- **Monthly only:** no other payment frequencies, flat-rate loans or variable rates.
- **No extras:** no fees, insurance, taxes, processing charges or grace periods.
- **No calendar dates:** schedule rows are numbered by month.
- **Flat-rate and markup quotes:** the figures will **not** match these, as used for many Pakistani car loans and in Islamic financing (D-33).
- **Currency:** switching it changes the symbol only; amounts are not converted.
- **Saved calculations:** kept only in this browser on this device. There are no accounts, no sync and no server.
- **English only;** no right-to-left layouts.
- **Out of scope:** no printing or export, copying, comparing offers, prepayments (backlog stories S-14 to S-18), or offline/PWA installation.
- **Browsers:** tested on Chromium, Firefox and WebKit. Chromium covers Chrome and **Edge**; WebKit approximates Safari (spec NFR-1).

## Known issues

These were found in the pre-submission audit and the Phase 5 review (`docs/process/review-findings.md`):

| Issue | Status |
|---|---|
| On a phone, the page didn't scroll to the results after **Calculate** or **Restore**: at 360 × 740 the results started just below the visible area. | **Fixed** before submission (`b37fd88`, F-P5-2) |
| No favicon: `favicon.ico` returned 404. | **Fixed** before submission: an inline icon, with no extra request (`fa26524`, F-P5-4) |
| On a 1,200-month loan, the chart axis showed "1200" next to the caption "over 1,200 months". | **Fixed** before submission (`0d84ccf`, F-P5-5) |
| In Firefox, in a slightly short window, Tab to **Calculate** left the button just below the screen. | **Fixed** before submission (`92e635a`, F-P5-1) |
| **Delete** on a single saved calculation has no undo. Only **Clear all** asks for confirmation. | Not fixed. A product choice: an undo would keep a customer's figures around after the advisor deleted them (J-7) |
| When results appear, screen readers don't announce them, and focus stays on **Calculate**. The figures can be read straight after. | Not fixed. Beyond the spec, and a candidate for later (F-P5-6) |

## Tech stack

All versions are exact (see `package.json`). The app's only runtime dependencies are **React 19.3.1**, **react-dom 19.3.1** and **decimal.js 10.6.0** (all money arithmetic; a JS `number` never holds money).

Tooling:
- TypeScript 6.0.3 and Vite 8.3.4;
- Vitest 5.0.5 with jsdom 30.1.3, and fast-check 4.10.2;
- Playwright 1.64.1;
- ESLint 9.39.5 with typescript-eslint 8.71.2, eslint-plugin-react-hooks 7.1.1 and eslint-plugin-jsx-a11y 6.10.2;
- Prettier 3.9.10.

Styling is plain CSS. There is no UI library and no chart library: the charts are hand-built SVG.
