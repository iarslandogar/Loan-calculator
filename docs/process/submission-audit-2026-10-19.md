Snapshot taken before Phase 5; several findings have since been fixed (see README Known issues).

# Submission audit: Loan EMI Calculator

**Date:** 2026-10-19, second run at about 00:40 Pakistan time. The first run (about 00:20) was rerun after `main` was fast-forwarded to `v1` and the default branch was switched to `main`. No code or doc file changed between the runs (`git diff 68c9e02 HEAD` is empty), but every count below comes from the second run.

**Type:** read-only. This file is the only thing written. Nothing was edited, deleted, committed or pushed during the audit.

**Skipped because they change state:**
- `npm run test:e2e`: it rebuilds `dist/` and writes `reports/` and `test-results/`. §6 reports the last recorded run instead.
- `git fetch`: it updates local refs. `git ls-remote` was used instead.
- Plain `npm test`: it overwrites `reports/vitest.json` and Vitest's cache. It was run as `vitest run --reporter=default --no-cache`, which wrote no files (checked).

---

## 1. Repo and git

**Folder tree, 2 levels** (excluding `node_modules`, `dist`, `.git`; † = git-ignored, local only):

```
.claude/agents/            (3 agent definitions)
.github/workflows/         ci.yml, deploy.yml
.gitattributes  .gitignore  .npmrc  .nvmrc  .prettierignore  .prettierrc.json
CLAUDE.md
design/emi-pastel-redesign/   (design-tool bundle, 21 files)
docs/app-roles.md  docs/jobs-to-be-done.md  docs/user-stories.md
docs/process/      loop-plan.md, manual-test-checklist.md, proposal-visuals.md, review-findings.md
docs/spec/         technical-spec.md, decision-log.md
e2e/               fixtures.ts, visual-helpers.ts, 18 spec files (s01–s13, s19–s22, spec-rules), review/
eslint.config.js  index.html  package.json  package-lock.json  playwright.config.ts
reports/ †         playwright.json, vitest.json, 10 *.log files
scripts/           size.mjs, trace.mjs
src/               main.tsx, domain/, storage/, ui/
submission-audit.md   (this report; untracked)
test/              helpers.ts, setup.ts, timezone.test.ts
test-results/ †    .last-run.json
transcripts/       README.md, session-01-claude-code.md, session-01-conversation.html, session-01-conversation.pdf,
                   make_transcripts.py, make_pdf.py, make_pdf.cjs, raw/, subagents/, .gitkeep
tsconfig.json  tsconfig.app.json  tsconfig.node.json  tsconfig.test.json  vite.config.ts  vitest.config.ts
```

**git status:** `On branch v1. Your branch is up to date with 'origin/v1'.` One untracked file, `submission-audit.md` (this report); nothing else changed. 171 tracked files.

**Current branch:** `v1`. **Remote:** `origin https://github.com/iarslandogar/Loan-calculator.git` (fetch and push).

**Pushed and up to date?** Yes. Compared with `git ls-remote`:

| Branch | Local | Remote |
|---|---|---|
| v1 | 68c9e02 | 68c9e02 |
| main | 68c9e02 | 68c9e02 |

`main` and `v1` point at the same commit. The first run found `main` 3 docs commits behind; it has since been fast-forwarded.

**Last 20 commits:**

```
2026-10-19 00:08  68c9e02  style: format eslint.config.js
2026-10-19 00:06  bf08ec1  docs: add development transcripts and PDF (D-74)
2026-10-18 23:33  edd3994  docs: record the first deploy and CI results (D-73)
2026-10-18 22:40  182e87d  docs: visuals mini-gate decisions, D-71 spec line, D-72, D-73
2026-10-18 22:40  85e494c  perf(S-19): no forced layout in the yearly overflow check (AC-10.8, D-72)
2026-10-18 22:40  ed23f6b  fix(S-5): sticky form whenever side by side; card scrolls in short windows (D-69)
2026-10-18 20:30  c5d197a  docs: record the D-70 verify result
2026-10-18 20:20  bf060cd  docs: record D-70 visuals review fixes
2026-10-18 20:20  61e51b9  fix(S-19..S-22): yearly table scroll region, forced-colors marks, memoised charts
2026-10-18 20:20  6c5edee  test(review): visuals review findings and REVIEW-V1/V2 tests
2026-10-18 19:38  4333476  docs: record the visuals implementation (D-68) and the sticky form (D-69)
2026-10-18 19:38  a19ea7f  feat(S-5): sticky loan form beside the results on wide, tall windows (owner request, D-69)
2026-10-18 19:14  0dc743a  feat(S-19): yearly summary chart and table; charts placed in the results card; validated chart palette
2026-10-18 19:14  323f1f3  feat(S-22): interest and principal in each payment chart
2026-10-18 19:14  0f656e4  feat(S-21): balance over time chart
2026-10-18 19:14  e30a41d  feat(S-20): cost breakdown bar
2026-10-18 19:14  fd97fa6  feat(S-21): shared chart geometry, legend, axis ends, tooltip and hover band (D-66, D-68)
2026-10-18 19:14  0d9967c  feat(S-20): chart and yearly-summary copy (spec §7, D-65, D-67)
2026-10-18 18:55  a5ee7e7  feat(S-19): costSplit, interestShare, yearlySummary and formatPercent (spec §3.1.1, D-65; S-20, S-22)
2026-10-18 18:45  c62d9c2  docs(G3b): approve the visuals tests, close three copy gaps, record readings (D-66, D-67)
```

**Is the repo public?** **unknown** via `gh`, because gh is not installed. Separately, the unauthenticated GitHub API (`GET /repos/iarslandogar/Loan-calculator`) returns `visibility: public`, `has_pages: true`, `default_branch: main`. It was `v1` at the first run.

## 2. Required package layout

| Item | Status |
|---|---|
| `README.md` (root) | **MISSING.** The only READMEs are `transcripts/README.md` and `design/emi-pastel-redesign/README.md`. |
| Source | Exists: `src/` (44 tracked files: `domain/`, `storage/`, `ui/`, `main.tsx`) |
| `docs/app-roles.md` | Exists, tracked |
| `docs/jobs-to-be-done.md` | Exists, tracked |
| `docs/user-stories.md` | Exists, tracked |
| `transcripts/` | Exists, 47 tracked files |

## 3. Excluded files

`.gitignore` contains: `node_modules/`, `dist/`, `reports/`, `test-results/`, `playwright-report/`, `CLAUDE.md.next`, `*.log`.

| Kind | Covered by `.gitignore`? (`git check-ignore`) |
|---|---|
| `node_modules/` | Yes |
| `dist/` (build output) | Yes |
| `build/` | **No.** The project doesn't use it. |
| `.env`, `.env.local` | **No** |
| `venv/`, `.venv/`, `env/` | **No** |

**Tracked anyway** (`git ls-files` matching node_modules, dist, build, .env*, venv, .venv, env, `__pycache__`, `*.pyc`): **none.**

`transcripts/session-01-conversation.html`, the intermediate file the PDF was printed from, is tracked. That's harmless but unnecessary.

## 4. README

**MISSING.** There is no root `README.md`, so none of the following is covered there:

| Item | In README? | Where it exists today, if anywhere |
|---|---|---|
| What the app is and who it's for | MISSING | `docs/app-roles.md` |
| Prerequisites with versions | MISSING | `.nvmrc` = `24`; `package.json` `engines.node` = `>=24 <25` |
| Install and start commands | MISSING | `package.json` scripts (`npm ci`, `npm run dev`) |
| How to run tests | MISSING | `package.json` scripts; `CLAUDE.md` Commands table |
| AI tool and model used | MISSING | `docs/spec/decision-log.md` D-00f; `transcripts/README.md` |
| Code changed by hand | MISSING | Required by `docs/process/loop-plan.md:127` ("an honest list (or "None")") |
| Assumptions | MISSING | `docs/spec/technical-spec.md` §16; decision log |
| Live URL | MISSING | `docs/spec/decision-log.md:731` |
| Links to the docs | MISSING | none |

## 5. Product docs

**Roles (3):** R-1, R-2, R-3.
**Jobs (11):** J-1 to J-11.
**Stories (22):** S-1 to S-22. 17 are v1 (S-1 to S-13 and S-19 to S-22); 5 are Backlog (S-14 to S-18).

**Traceability:**
- Stories that don't name a job: **none.** Stories naming an unknown job: **none.**
- Jobs that don't name a role: **none.**
- Jobs that mention the app, a button or a screen. Searched for app, application, button, screen, click, tap, page, select, calculator, field, tab:
  - **J-10** uses "screen": "…so I can concentrate on the numbers rather than the **screen**." It means the device's display, not an app screen, but a strict reader could flag it.
  - No other job matches.

**Stories:** every story's Status is **Not implemented**.

| Story | Scope | Status | ACs |
|---|---|---|---|
| S-1 | v1 | Not implemented | 12 |
| S-2 | v1 | Not implemented | 17 |
| S-3 | v1 | Not implemented | 6 |
| S-4 | v1 | Not implemented | 4 |
| S-5 | v1 | Not implemented | 6 |
| S-6 | v1 | Not implemented | 6 |
| S-7 | v1 | Not implemented | 5 |
| S-8 | v1 | Not implemented | 6 |
| S-9 | v1 | Not implemented | 3 |
| S-10 | v1 | Not implemented | 8 |
| S-11 | v1 | Not implemented | 11 |
| S-12 | v1 | Not implemented | 7 |
| S-13 | v1 | Not implemented | 3 |
| S-14 | Backlog | Not implemented | 1 |
| S-15 | Backlog | Not implemented | 1 |
| S-16 | Backlog | Not implemented | 1 |
| S-17 | Backlog | Not implemented | 1 |
| S-18 | Backlog | Not implemented | 1 |
| S-19 | v1 | Not implemented | 4 |
| S-20 | v1 | Not implemented | 6 |
| S-21 | v1 | Not implemented | 3 |
| S-22 | v1 | Not implemented | 3 |
| **Total** | | | **115** (110 v1) |

**ACs not in Given/When/Then form:**
- **No "Given" (1):** AC-11.11 ("Tenure is described in entries as `1 year`, `N years`, `1 month` or `N months`, and the rate with no trailing zeros…"). It is a plain statement.
- **"Given … then …" with no explicit "When" (30).** These are state checks, such as "Given L-A, then row 1 reads …":
  - AC-5.2, 5.4, 5.5, 5.6, 6.5, 7.4, 8.5;
  - AC-10.2, 10.3, 10.4, 10.5, 10.6, 10.7;
  - AC-11.1, 11.2, 11.3, 11.4, 12.5;
  - AC-13.1, 13.2, 13.3;
  - AC-19.2, 19.4, 20.2, 20.3, 20.4, 20.5, 20.6, 22.2;
  - AC-18.1 (Backlog).
- **"Given" but no "then": none.**

## 6. Tests

**Test commands (`package.json`):**

```
test:      vitest run
test:e2e:  playwright test --pass-with-no-tests
trace:     node scripts/trace.mjs
verify:    npm run lint && npm run format:check && npm run typecheck && npm test && npm run build && npm run size && npm run test:e2e && npm run trace -- --results
```

Also present: `lint`, `format:check`, `typecheck`, `size`, `build`, `preview`.

**Unit tests, run now.** Command: `npx vitest run --reporter=default --no-cache`. No files were written, which I checked by listing anything newer than the start time in `reports/`, `node_modules/.vite/` and `test-results/`.

```
 Test Files  9 passed (9)
      Tests  345 passed (345)
   Duration  80.90s
```

| File | Tests |
|---|---|
| validate.test.ts | 117 |
| loan.test.ts | 47 |
| parse.test.ts | 44 |
| money.test.ts | 43 |
| format.test.ts | 35 |
| summary.test.ts | 30 |
| format-percent.test.ts | 18 |
| loan.property.test.ts | 10 (fast-check, ≥ 1,000 runs, seed 20261017) |
| test/timezone.test.ts | 1 |

Failures: **none.** All 9 files are domain tests; there are no component tests under `src/ui/`. The UI is tested by E2E only.

**E2E tests: not run now** (they write `dist/`, `reports/` and `test-results/`). The last recorded local run is `reports/playwright.json`, dated 2026-10-18 22:58:
- **549 passed, 0 failed, 0 flaky, 0 skipped**, in 531 s;
- 183 tests each in Chromium, Firefox and WebKit.

GitHub Actions runs, from the public API:

| Run | Branch | Commit | Result |
|---|---|---|---|
| CI | v1 | 182e87d | success |
| Deploy (verify, deploy, smoke) | main | 182e87d | success |
| CI | v1 | edd3994 | success |
| CI | v1 | 68c9e02 | success |
| Deploy (verify, deploy, smoke) | main | 68c9e02 | success (run 39159243645) |

**Tests mapped to stories.** Test titles carry `[AC-x.y]` tags. The counts below are tags, so a test with two tags counts twice:

| Story | Tags | Story | Tags | Story | Tags |
|---|---|---|---|---|---|
| S-1 | 33 | S-7 | 5 | S-13 | 9 |
| S-2 | 35 | S-8 | 10 | S-19 | 7 |
| S-3 | 13 | S-9 | 3 | S-20 | 9 |
| S-4 | 4 | S-10 | 23 | S-21 | 3 |
| S-5 | 8 | S-11 | 16 | S-22 | 5 |
| S-6 | 8 | S-12 | 8 | | |

There are also 96 `[SPEC-§…]` tags for spec rules, 4 `[REVIEW-…]` tags for reviewer tests, and **0 untagged test titles**.

`node scripts/trace.mjs` (read-only; it contains no file writes) prints "3 roles, 11 jobs, 22 stories, 115 ACs, 28 test files", every v1 story at n/n ACs tested, and Backlog at 0/1. Result: `trace: OK`.

## 7. Story vs. reality spot-check

**No story is marked Implemented** (0 of 22), so there is nothing to spot-check against that status.

Every v1 AC has at least one tagged test, and the last full runs passed. The Status column hasn't been updated because the process keeps it at "Not implemented" until the owner's manual check at Gate G5 (`docs/spec/technical-spec.md` §15; `CLAUDE.md`).

## 8. Known defects

**Defect list in the repo:** no dedicated defect or issues file. `docs/process/review-findings.md` is the code-reviewer's findings log, and `docs/process/manual-test-checklist.md` is the manual checklist; neither mentions the five items below.

| Item | Verdict | Evidence |
|---|---|---|
| Results don't scroll into view on mobile after Calculate | **Not fixed** | No `scrollIntoView` or `scrollTo` in `src/`. On success, `LoanForm.tsx` (lines 54–70) moves focus only on errors (to the first invalid field) and on Reset. Probe on the live site at 360 × 740 after Calculate with L-A: `scrollY 0`, results card top at **738 px** of a 740 px screen, Monthly payment **not visible**. |
| No undo on delete | **Not fixed** | No "undo" anywhere in `src/` (the only match is the dialog copy "This can't be undone."). A single **Delete** removes the entry at once (`HistoryEntry.tsx:50` → `HistoryPanel.tsx:81`); only **Clear all** asks to confirm. No AC requires undo. |
| Duplicate saves possible | **Partly; by design** | `src/storage/history.ts:136–148`: a save is skipped when the newest stored entry has the same currency, amount, rate, tenure and unit (AC-11.5, tested). A repeat that isn't the newest entry *is* saved again, as AC-11.5's second case requires ("a new L-A entry is added at the top and the older one stays"). Saves re-read storage first, which narrows two-tab races (spec §9.3). |
| Inconsistent number formatting | **Mostly consistent; one minor inconsistency** | Money uses one deterministic formatter (`src/domain/money.ts`; no `Intl` or `toLocaleString`, enforced by lint; 43 tests). Inconsistency: the chart axis end shows **"1200"** ungrouped (`ChartParts.tsx:32`), while the caption beside it says "over **1,200** months". The schedule's Month column is also ungrouped ("1200"), as the frozen AC-10.8 test expects. Inputs keep the text as typed (by design). |
| Missing favicon | **Not fixed** | `index.html` has no `<link rel="icon">`; there is no `public/` folder and no favicon file. `https://iarslandogar.github.io/Loan-calculator/favicon.ico` returns **HTTP 404**. |

Git log: no commit message mentions scroll-into-view, undo, favicon or number-format fixes.

## 9. Session transcripts

**Logs under `~/.claude/projects/c--Users-arslan-NINEALPHA-muhammad-arslan-calculator/`:** one main session log plus 19 subagent logs. "First" is the first user record's timestamp in UTC; PKT is UTC+5.

| File | First (UTC) | Size | First user prompt (100 chars) |
|---|---|---|---|
| `9d763f75-d2e9-4d5a-b730-c05dd7d4b1f5.jsonl` (main) | 2026-10-17 15:44 | 50,020,703 B (still growing) | Can you go through the whole folder and share your thoughts? |
| `…/subagents/agent-a3ebec3c69b6d0306.jsonl` | 2026-10-17 16:00 | 575,615 B | You are reviewing a draft implementation plan for a small client-only React + TypeScript Loan EMI ca |
| `…/subagents/agent-a15ecb839ed08d4d2.jsonl` | 2026-10-17 16:20 | 597,808 B | Phase 1 spec challenge for the Loan EMI Calculator. Follow your agent instructions in full.  Context |
| `…/subagents/agent-a26cdd8fd6d3551fe.jsonl` | 2026-10-17 17:30 | 858,007 B | Phase 3 (tests first) for the Loan EMI Calculator. You own the DOMAIN tests only; another test-desig |
| `…/subagents/agent-a38b11ad26f16f9c1.jsonl` | 2026-10-17 17:30 | 1,998,153 B | Phase 3 (tests first) for the Loan EMI Calculator. You own the UI / END-TO-END tests and the manual |
| `…/subagents/agent-a9ba00267bdc12efc.jsonl` | 2026-10-17 19:25 | 411,987 B | Mini-gate G4.1 review: Phase 4, group 1 (domain layer) for stories S-1, S-2, S-3, S-10, S-13. Follow |
| `…/subagents/agent-a7b35274095df2092.jsonl` | 2026-10-17 19:45 | 150,310 B | Owner-approved post-G3 fix to ONE frozen test (decision D-46 in docs/spec/decision-log.md – read it |
| `…/subagents/agent-a6410b0d72ad7f81a.jsonl` | 2026-10-17 19:54 | 158,077 B | Owner-approved post-G3 fix to ONE frozen helper (decision D-48 in docs/spec/decision-log.md – read i |
| `…/subagents/agent-abb7d8991f255571f.jsonl` | 2026-10-17 20:00 | 899,856 B | Mini-gate G4.2 review: Phase 4, group 2 (core UI) for stories S-1, S-2, S-3, S-4, S-9. Follow your a |
| `…/subagents/agent-aa53ddc1f1cde5824.jsonl` | 2026-10-18 03:22 | 239,197 B | Mini-gate G4.3 review: Phase 4, group 3 (schedule UI) for stories S-10 and S-13. Follow your agent i |
| `…/subagents/agent-af4e9fe894d5e5dff.jsonl` | 2026-10-18 03:37 | 455,374 B | Mini-gate G4.4 review: Phase 4, group 4 (settings) for stories S-6 (theme) and S-7 (currency). Follo |
| `…/subagents/agent-a108c9f1bd60961f8.jsonl` | 2026-10-18 08:58 | 711,195 B | Owner-approved post-G3 update of the frozen tests (decisions D-54 and D-55 in docs/spec/decision-log |
| `…/subagents/agent-a75a06036e9fe5bc0.jsonl` | 2026-10-18 09:07 | 945,582 B | Mini-gate review of an owner-approved change cycle: widened input limits (decision D-54) and a corre |
| `…/subagents/agent-a0654e8203433b679.jsonl` | 2026-10-18 09:39 | 903,914 B | Mini-gate G4.5 review: Phase 4, group 5 (saved calculations) for stories S-11 and S-12. Follow your |
| `…/subagents/agent-aa540326eecefb593.jsonl` | 2026-10-18 11:23 | 161,209 B | Owner-approved post-G3 fix to ONE line of a frozen test (decision D-59 in docs/spec/decision-log.md |
| `…/subagents/agent-abdc70b7d2f362cb6.jsonl` | 2026-10-18 11:34 | 637,581 B | Mini-gate G4.6 review: Phase 4, group 6 (layout and keyboard) for stories S-5 and S-8 – the LAST gro |
| `…/subagents/agent-a3a722570507ebc3a.jsonl` | 2026-10-18 12:01 | 195,531 B | Owner-approved post-G3 fix to ONE frozen test (decision D-61 in docs/spec/decision-log.md – read it |
| `…/subagents/agent-acb419deed3a379f8.jsonl` | 2026-10-18 12:50 | 2,388,275 B | Mini-gate review of the redesign change cycle: the "Soft ledger" pastel redesign (decisions D-62, D- |
| `…/subagents/agent-a15aab02322e7335e.jsonl` | 2026-10-18 13:11 | 1,058,717 B | Phase "G3b" (tests first) for an owner-approved scope addition: four visuals. Follow your agent inst |
| `…/subagents/agent-aa311cb6acd754f41.jsonl` | 2026-10-18 14:38 | 1,406,781 B | Mini-gate review of the "visuals" change cycle (S-19 moved to v1, new S-20, S-21, S-22) plus the own |

Also in that folder: 2 `tool-results/*.txt` files, `memory/MEMORY.md` and `memory/keep-all-decision-logs.md`. The main log is still growing, because this session is still running.

**Already in `transcripts/`** (tracked):
- `README.md` (index, timeline, exclusions);
- `session-01-claude-code.md` (readable main session, generated up to 2026-10-19 00:03 PKT);
- `session-01-conversation.pdf` (66 pages) and the `session-01-conversation.html` it was printed from;
- `make_transcripts.py`, `make_pdf.py`, `make_pdf.cjs`;
- `subagents/` (19 `.md` files) and `raw/` (filtered JSONL: 1 main and 19 subagent files, 17 MB);
- `.gitkeep`.
- **MISSING:** `session-00-requirements` (the claude.ai chat, decision D-00e).

**Secrets scan.** All 22 files in that folder (20 `.jsonl` and 2 `.txt`) and the 20 files in `transcripts/` were scanned for:
- `sk-` keys (20+ characters), GitHub tokens (`gh[pousr]_`, `github_pat_`), Bearer values (30+ characters), AWS access keys and private-key blocks;
- password assignments, `.env`-style `*SECRET`/`*TOKEN`/`*API_KEY`/`*PASSWORD=` assignments, and OAuth token fields.

**Result: 0 hits in either place. No file, line or secret to report.** Plain keyword mentions, counted only:

| Keyword | Mentions in the logs | Why it isn't a secret |
|---|---|---|
| `sk-` | 1,216 | substrings such as "task-" and "disk-" |
| `ghp_` | 29 | inside the scan patterns and prompts, including this audit's own; never followed by a token |
| `Bearer` | 26 | |
| `.env` | 207 | mostly `process.env` |
| `password` | 53 | |
| `token` | 1,115 | |

The counts rose from the first run because the main log now also contains the first audit and its scans.

## 10. Hand edits

- **No record of code changed by hand** was found: no README section, no notes file, no commit message.
- **All 85 commits** are authored as `Muhammad Arslan <arslan8954@gmail.com>`. That's the local git identity set for the project (decision D-22), so authorship can't tell hand edits apart. All 85 carry a `Co-Authored-By: Claude` trailer.
- **Commit messages** mentioning "hand" or "manual": only `1a70f9d` and `06273a5`, both about the *manual test checklist*.
- **Docs:**
  - `docs/process/loop-plan.md:127` lists "Code changed by hand: an honest list (or "None")" as a README item still to write.
  - The decision log records owner-*approved* edits to owner-only files, but Claude made them (for example D-65's four edits to `jobs-to-be-done.md`).

## 11. Deployment

- **Workflows:**
  - `.github/workflows/deploy.yml`, GitHub Pages. On push to `main` it runs `verify` (via `ci.yml`), then `npm run build` with `BASE_PATH`, then `configure-pages`, `upload-pages-artifact` and `deploy-pages`, then a `smoke` job. The smoke job waits until Pages serves this commit's `build-id`, then runs Playwright against the live URL.
  - `.github/workflows/ci.yml` runs `npm run verify` on every non-`main` push and on pull requests.
- **Base path:** `vite.config.ts:18` `base: process.env.BASE_PATH ?? '/'`, set in `deploy.yml:39` to `/${{ github.event.repository.name }}/`, which is **`/Loan-calculator/`**.
- **Live URL:** **https://iarslandogar.github.io/Loan-calculator/**. Referenced in `docs/spec/decision-log.md:731` and `transcripts/README.md`. Checked after the latest deploy: HTTP 200, `build-id` **`68c9e02`**, the current `main`.
- **Deploy of `68c9e02`** (pushed to `main` after the first run): run 39159243645, **verify success, deploy success, smoke success**. The live site serves the current commit.

## 12. Summary

**Ready:**
- Public repo, pushed and up to date; `main` is the default branch and equals `v1`.
- Live site deployed from the current `main` (`68c9e02`), with CI, deploy and smoke all green.
- Unit tests 345/345 (now). E2E 549/549 across 3 browsers (last local run), plus green CI.
- Every v1 AC traced to tests (`trace: OK`).
- Roles, jobs and stories complete and consistent (3 / 11 / 22, no orphans).
- Full decision log; transcripts plus PDF; no secrets found.

**Missing:**
- **Root `README.md`**. Every README item in §4 is MISSING, including install and run commands, AI tools and models, code changed by hand, assumptions, live URL and doc links.
- `session-00-requirements` transcript (the claude.ai chat).
- Every story Status is still "Not implemented" (owner decision pending at G5).
- `.gitignore` entries for `.env*`, `venv/`, `.venv/` and `build/`.
- Favicon.

**Risky for "follow the README on a clean machine":**
1. **No README at all.** The reviewer has no instructions, which is the biggest risk.
2. **Node 24 is required** (`engines: >=24 <25`, `.nvmrc 24`). With another Node major, `npm ci` warns, or fails if engine-strict is on. The README must say so.
3. **E2E needs browsers:** `npx playwright install` (on Linux, `--with-deps`) before `npm run test:e2e`. The full run takes about 9 minutes; locally on Windows, WebKit timed out under heavy load or on battery (D-73).
4. ~~The default branch is `v1`~~ **Resolved since the first run:** the default branch is `main`, and `main` = `v1` = `68c9e02`. A plain clone now gets the released branch.
5. **Known UX defects a reviewer may notice:**
   - on a phone, results land just below the screen after Calculate, with no scroll;
   - Delete has no undo;
   - no favicon (a 404 in the network tab);
   - the axis shows "1200" next to "1,200 months".
6. **Stories all "Not implemented"** while every test passes. That's correct by the process, but it may confuse a reviewer unless the README explains the G5 gate.
7. **Repo weight:** `transcripts/raw/` is 17 MB of a small project. Not a problem, but a reviewer will notice it.
