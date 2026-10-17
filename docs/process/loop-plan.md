# Loop Plan: Spec-Driven, Human-Gated Build with Claude Code

## The model in one picture

```
Phase 1 Spec challenge ──G1──► Phase 2 Scaffold ──G2──► Phase 3 Tests first ──G3──►
Phase 4 Build loop (per story) ──G4──► Phase 5 Independent review ──G5──► Phase 6 Release ──G6──► Submit
```

- **Inside a phase**, the agent loops on its own: act → run the check → read the failure → fix → repeat, until the **exit condition** is met or the **budget** runs out.
- **Between phases**, the agent stops at a **gate (G1–G6)**. You review the evidence and reply "approved" or give corrections. Your gate replies are the most important part of the transcript: they show you directing, checking and catching mistakes.
- **Maker ≠ checker.** Opus builds. Sonnet subagents challenge the spec, write the tests and review the code. Neither grades its own work.

| Who | Model | Role |
|---|---|---|
| Main session | Opus 5.5 | Orchestrator + developer |
| `spec-critic` | Sonnet 5.5 | Attacks the requirements |
| `test-designer` | Sonnet 5.5 | Writes tests from the ACs before the code exists |
| `code-reviewer` | Sonnet 5.5 | Independent review + exploratory edge-case hunting |
| **You** | Human | Product owner: answer questions, approve gates, test by hand |

---

## Phase 0: Setup (you, about 15 min)

1. Create a **public** GitHub repo named `muhammad-arslan-calculator`, and clone it.
2. Copy this whole pack into it: `CLAUDE.md`, `.claude/agents/`, `docs/`. Create an empty `transcripts/` folder.
3. Install Node 24 LTS and Claude Code. Run `claude` in the repo folder.
4. Confirm the main model is Opus 5.5 (`/model`). The subagents choose Sonnet themselves through their `model: sonnet` setting.
5. Commit: `chore: add requirements pack and agent definitions`.
6. **Transcripts:** use **one Claude Code session per phase** where you can. Before you `/clear` or close a session, run `/export transcripts/session-0N-<phase>.md`. Subagent conversations may not appear in full in the main export; at the end, also copy the raw session logs for this project from `~/.claude/projects/` into `transcripts/raw/`. Remove secrets and change nothing else.

---

## Phase 1: Spec challenge (exit: no open Blockers)

**Your prompt (type it yourself; adapt the wording):**
> Read CLAUDE.md and every file it references. Don't write any code yet. First, explain back to me in your own words: who the app is for, what v1 includes and excludes, and how the schedule is calculated. Then run the spec-critic subagent on the requirements. Combine its findings with your own questions into one list, ordered by severity, and propose a fix for each. Stop at Gate G1.

**Exit condition:** every Blocker and Major finding has a decision from you, recorded in `docs/spec/decision-log.md` (D-xx entries changed from Proposed to Approved, or amended).

**🚦 Gate G1, what you check:**
- Did it understand the product correctly? Correct any misunderstanding explicitly; that correction is good evidence for the transcript.
- Go through each Proposed decision D-01 to D-12. Approve or change it.
- Make any AC or spec edits yourself, or tell Claude exactly what to change and then read the diff.

---

## Phase 2: Scaffold + CI + traceability (exit: `verify` green on an empty shell)

**Your prompt:**
> Phase 2. Scaffold the project exactly per technical-spec §2, §3, §13 and §14: Vite + React + TS strict, decimal.js, Vitest, Testing Library, fast-check, Playwright with 3 browsers, ESLint (with the layer-boundary rule) and Prettier, the npm scripts including `verify` and `size`, the scripts/trace.mjs traceability checker per §12.5, .nvmrc, and both GitHub Actions workflows. Render only an empty App shell with the title. No features. Then loop until `npm run verify` exits 0, except that `trace` is expected to report every v1 AC as missing a test. Show me the output. Stop at Gate G2.

**Loop:** `/goal npm run lint, typecheck, test, build and size all exit 0 and npm run trace runs and lists every v1 AC as untested` (budget: about 10 turns).

**🚦 Gate G2, what you check:**
- Run `npm ci && npm run dev` yourself, and open the page.
- Run `npm run trace` and confirm it lists the ACs. Break a story's job ID on purpose (for example change `J-1` to `J-99`), confirm `trace` fails, then undo it. *This is a good transcript moment: you are testing the tester.*
- Push to GitHub. Set **Settings → Pages → Source: GitHub Actions**. Confirm CI runs.

---

## Phase 3: Tests first (exit: every v1 AC has a failing test)

**Your prompt:**
> Phase 3. Use the test-designer subagent to write tests for every v1 AC, following its instructions. The tests must fail for the right reason, because nothing is implemented yet. Then show me: tests per story, the trace output, and 3 sample tests I should read closely (pick the ones with the most edge cases). Stop at Gate G3.

**Exit condition:** `npm run trace` shows 0 untested v1 ACs. All AC tests fail, and none fail because of a broken fixture or a syntax error.

**🚦 Gate G3, what you check:**
- Read the sample tests against their ACs. Are the expected values hard-coded from the ACs, not computed?
- Spot-check one test per story yourself.
- Read `docs/process/manual-test-checklist.md`.
- When happy, commit and **tag `g3-tests-approved`**. From here on, the tests are frozen (D-12).

---

## Phase 4: Build loop (exit: `verify` fully green)

Work **one story group at a time**, in this order, with a short mini-gate after each group:

1. Domain: S-1, S-2, S-3, S-10, S-13 (parse, validate, loan, format, plus unit and property tests)
2. Core UI: S-1, S-2, S-3, S-4, S-9 (form, results, errors, stale state, reset)
3. Schedule UI: S-10, S-13
4. Settings: S-6, S-7
5. History: S-11, S-12
6. Layout and keyboard: S-5, S-8

**Your prompt (per group):**
> Phase 4, group N: implement stories <list> to satisfy their tests, following technical-spec. Don't modify any test. Loop until the tests for these stories pass in all three browsers and lint/typecheck are clean. Then run the code-reviewer subagent on this group and fix every Blocker and Major it reports. Show me the evidence and stop.

**Loop:** `/goal the tests tagged with these stories' AC IDs pass in chromium, firefox and webkit, and npm run lint and npm run typecheck exit 0` (budget: about 15 turns per group). For the final group: `/goal npm run verify exits 0`.

**Rules the agent must follow (from CLAUDE.md):** never edit tests; if a test seems wrong, stop and ask you; never use a JS `number` for money; never change the algorithm.

**🚦 Mini-gate after each group (G4.x), what you check:**
- Open the app and try the group's ACs by hand using the checklist.
- Read the reviewer's findings. Did the developer fix them, or argue? Push back where needed.
- **Try to break it yourself** with something not in the ACs, and record what happened.

---

## Phase 5: Independent review (exit: 0 blocking findings, and you have ticked the full manual checklist)

**Your prompt:**
> Phase 5. Run the code-reviewer subagent across the whole app, including its exploratory testing. Then fix every Blocker and Major it finds, without editing frozen tests (review tests in e2e/review/ are new tests and may be added). Re-run the reviewer until it reports BLOCKING FINDINGS: 0. Show me the final findings file and the verify output. Stop at Gate G5.

**Loop:** reviewer → developer fixes → reviewer, until `BLOCKING FINDINGS: 0` (budget: 3 rounds; if it is still failing, stop and report).

**🚦 Gate G5, what you check:**
- Tick **every line** of `docs/process/manual-test-checklist.md` yourself, in Chrome **and** Safari or Firefox, on desktop **and** on a real phone.
- Decide each story's status. A story becomes `Implemented` only if all its ACs passed in both automated tests and your manual check. Otherwise it stays `Not implemented`, with a note. Tell Claude which statuses to change.

---

## Phase 6: Release (exit: live URL passes smoke tests; package complete)

**Your prompt:**
> Phase 6. (1) Update the statuses in docs/user-stories.md exactly as I approved. (2) Write README.md per the checklist in loop-plan.md. (3) Merge to main, let the deploy workflow publish to GitHub Pages, and confirm the @smoke tests pass against the live URL. (4) Run `npm run trace -- --results` and show me the output. Stop at Gate G6.

**README must contain** (assignment requirement plus our additions):
- [ ] What the app is and who it is for (the 3 roles in one paragraph each), and **why a loan/EMI calculator**
- [ ] Live URL
- [ ] Prerequisites (Node 24 LTS, npm), the exact install and start commands (`npm ci`, `npm run dev`), and how to run all tests (`npm test`, `npx playwright install`, `npm run test:e2e`, `npm run verify`)
- [ ] AI tools and models: Claude (claude.ai, Opus 5.5) for requirements; Claude Code with Opus 5.5 (developer) and Sonnet 5.5 (spec critic, test designer, reviewer)
- [ ] **Code changed by hand**: an honest list (or "None")
- [ ] Assumptions (spec §16 + decision log D-xx), including that Edge is covered via Chromium
- [ ] How we worked: phases, gates and loops in one short section, with links to `transcripts/`
- [ ] The story status table, copied from `user-stories.md`
- [ ] Known limitations

**🚦 Gate G6, what you check:**
- Clone the repo into a **fresh folder** and follow the README word for word: `npm ci`, `npm run dev`, tests. This is exactly what the reviewers will do.
- Open the live URL on your phone.
- Check that `transcripts/` contains: `session-00-requirements` (this claude.ai chat), every Claude Code session export, and `raw/` logs. Remove any secrets; change nothing else.
- Check that no `node_modules/`, `dist/` or `reports/` folders are committed.

---

## Submission email

- **Subject:** `Take-home assignment: [the role you applied for], Muhammad Arslan`
- **Body:** repo link (public), live URL, AI tools and models used, and roughly how long you spent.
- **Before starting:** send HR the confirmation reply with your expected submission date (graded under "Delivery and communication").

## Budgets and stop rules

| Situation | What the agent does |
|---|---|
| Loop budget reached | Stop, report the last failure and what it tried, and ask you |
| A test looks wrong after G3 | Stop and explain why; you decide |
| A property test finds a counterexample | Stop and report it; no algorithm change without approval |
| The spec is ambiguous or contradictory | Stop and ask |
| A new dependency seems needed | Ask first |
