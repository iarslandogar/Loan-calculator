# CLAUDE.md: Loan EMI Calculator

You are building a small, client-only React + TypeScript web app for a job take-home assignment. **The human (Muhammad Arslan) is the product owner and directs the work. You write the code; he reviews, tests and approves.** How you work is graded as much as what you build, so be explicit about what you are doing, what you checked, and what you are unsure of.

## Read these first (sources of truth, in priority order)

1. @docs/user-stories.md — acceptance criteria (ACs). The contract.
2. @docs/spec/technical-spec.md — stack, architecture, algorithm, copy, storage, testing, CI.
3. @docs/spec/decision-log.md — approved and proposed decisions.
4. @docs/process/loop-plan.md — phases, gates and loop exit conditions.

Also see:

- @docs/app-roles.md — who uses the app
- @docs/jobs-to-be-done.md — why they use it

If the sources conflict, or a requirement is ambiguous: **stop and ask.** Do not guess and do not silently pick one.

## Hard rules

- **Money is never a JS `number`.** All money and rate arithmetic uses `decimal.js` with the configuration in spec §5. Never use `Intl` or `toLocaleString` for money or dates (spec §6).
- **Import `Decimal` only from `src/domain/money.ts`**, never from `decimal.js` directly, so every calculation uses the configured instance.
- **Use the schedule algorithm in spec §5.2 exactly.** Do not replace it with the "fixed instalment, last adjusts" method; spec §5.3 explains why.
- **All user-visible text comes from `src/ui/copy.ts`** and must match spec §7 character for character.
- **Inputs are `type="text"`** with `inputmode`, never `type="number"`.
- **No new dependencies** beyond spec §2 without asking. Pre-approved tooling dependencies are listed in spec §2; anything else, ask.
- **No network calls** at runtime. No analytics, no web fonts, no CDNs.
- **Tests are the contract.** After Gate G3, do not edit any `*.test.ts(x)` or `e2e/**` file (or anything else in the freeze scope of spec §12.4). If a test seems wrong, stop and explain why to the human.
- **Never weaken, skip (`.skip`/`.only`/`.fixme`) or delete a test to make a loop pass.**
- **Never change a story's Status** in `docs/user-stories.md` without the human's explicit approval in this session.
- **Never edit `docs/app-roles.md`, `docs/jobs-to-be-done.md` or ACs.** Propose changes instead; the human edits or approves them.
- **Respect layer boundaries:** `domain/` imports nothing from `ui/` or `storage/`; `storage/` imports nothing from `ui/`.
- **Every test proving an AC is titled `[AC-x.y] ...`.**
- **Record every decision in `docs/spec/decision-log.md`**, however small, and never delete or rewrite past entries. Add a dated Decision line or a superseding entry instead (D-24).
- Keep commits small and conventional (`feat(S-3): ...`, `test(S-2): ...`, `fix(S-10): ...`), one story or concern per commit.

## Commands

| Command | Use |
|---|---|
| `npm ci` | Install |
| `npm run dev` | Local dev server |
| `npm test` | Unit, component and property tests (Vitest) |
| `npm run test:e2e` | Playwright on Chromium, Firefox and WebKit against the production build |
| `npm run trace` | Traceability: roles → jobs → stories → ACs → tests |
| `npm run verify` | **Everything.** The loop exit condition. Must exit 0. |

## How we work: phases and gates

We work in phases (see `docs/process/loop-plan.md`). **At the end of every phase, stop and present a gate summary.** Do not start the next phase until the human replies with approval. A gate summary contains:

1. What was done, mapped to story and AC IDs.
2. Evidence: the command(s) run and their final output (exit codes, pass/fail counts).
3. What you are unsure about, and any assumptions you made.
4. Anything you could not do, and why.
5. The exact question(s) for the human, if any.

Inside a phase, loop on your own: make a change, run the check, read the failure, fix, and repeat. Report honestly if you hit the iteration budget.

## Subagents (`.claude/agents/`)

| Agent | Model | Job | May edit |
|---|---|---|---|
| `spec-critic` | Sonnet | Attacks the spec for gaps, contradictions and untestable ACs before any code exists | Nothing (reports only) |
| `test-designer` | Sonnet | Writes failing tests from the ACs (test-first) | Test files, `test/**`, `docs/process/manual-test-checklist.md` |
| `code-reviewer` | Sonnet | Independently reviews code against the spec and hunts edge cases; never grades its own work | `docs/process/review-findings.md`, `e2e/review/**` |

The main thread (Opus) is the developer. The developer never reviews its own work as final; the `code-reviewer` does that.

## Definition of done (per story)

See spec §15: all ACs tested and passing in 3 browsers, `verify` green, reviewer has no blocking findings, the human has checked it by hand, and only then is Status set to `Implemented`.

## Honesty

If something does not work, say so plainly. "Not implemented" with a reason beats an overstated claim. Do not write summaries that claim more than the command output shows.
