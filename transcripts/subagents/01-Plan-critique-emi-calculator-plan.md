# Subagent 01: Plan: Critique EMI calculator plan

Subagent **`Plan`**, task: *Critique EMI calculator plan*. Started 2026-10-17 21:00 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-17 21:00 PKT

> You are reviewing a draft implementation plan for a small client-only React + TypeScript Loan EMI calculator (a job take-home). Read-only: do NOT edit any file.
> 
> Read in full:
> - The draft plan: C:\Users\arslan.NINEALPHA\.claude\plans\1-claude-md-formatting-yes-2-is-linear-lampson.md
> - C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\CLAUDE.md (note: its Markdown was stripped by a paste; the plan restores it)
> - C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\user-stories.md
> - C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md
> - C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\decision-log.md
> - C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\loop-plan.md
> - C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.claude\agents\*.md
> 
> Context: there is no code yet. The owner has already approved the decisions listed in the plan's Context section; do not re-litigate them. Reference values in the spec were independently verified correct with exact decimal arithmetic.
> 
> What I need from you (be concrete, terse, no praise):
> 1. **Domain API (§3.1 block in the plan)** — this gets frozen once tests are written against it. Is it sufficient for every domain-level AC and §5.4 invariant to be tested without the test-designer inventing extra exports? Anything missing (e.g. something needed for AC-11.11, §6 canonical input, rounding-note, years-vs-months invariant), mis-typed, or that would force a JS number onto money? Propose exact corrections.
> 2. **Contradictions** the plan's proposed spec edits would introduce with existing ACs/spec text (e.g. §9.2 dropping entries whose stored monthlyPayment mismatches; Restore persisting currency vs AC-4.4/AC-7.x; storage-event reload; AC-12.2 change; verify with trace --results while Phase 2/3 expect trace to fail).
> 3. **Phase sequencing risks**: anything in Phases 2–4 that would make tests fail for the wrong reason at G3 (e.g. Vitest/TS typecheck failing because domain modules don't exist yet while stubs are forbidden; lint/typecheck in verify over red tests), or that would block the frozen-test rule. Propose the minimal fix.
> 4. Anything the plan omits that the loop-plan or CLAUDE.md requires.
> 
> Output: a numbered list, each item = problem → exact proposed fix, ordered by severity. Under 600 words.

<details><summary>🔧 10 tool call(s): Read ×9, Glob</summary>

- **Read** · C:\Users\arslan.NINEALPHA\.claude\plans\1-claude-md-formatting-yes-2-is-linear-lampson.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\.claude\\plans\\1-claude-md-formatting-yes-2-is-linear-lampson.md"
}
```

  Result:
```
1	# Plan: Loan EMI Calculator, from planning to release
2	
3	## Context
4	
5	This folder holds a complete requirements pack and no code. The pack is CLAUDE.md, 3 subagents, roles, jobs, 19 stories (13 in v1), the tech spec, the decision log and the loop plan. A pre-read review in this session found gaps. The owner (Muhammad Arslan) answered them on 2026-10-17:
6	
7	- **Restore CLAUDE.md formatting** (a paste stripped the Markdown).
8	- **D-05:** keep 2 dp for PKR.
9	- **AC-12.6** stays as it is; add one line to the Clear-all dialog.
10	- **AC-8.5:** reword it to rely on native `<dialog>` focus behaviour (no JS focus trap).
11	- **Approved spec changes:**
12	  - two-tab-safe history saves;
13	  - Restore clears errors and fully validates stored entries;
14	  - E2E tests pinned to `Asia/Karachi`;
15	  - domain API signatures in spec §3.1 before tests are written;
16	  - pre-approved tooling dependencies;
17	  - `verify` runs `trace --results`;
18	  - input borders reach 3:1 contrast.
19	- **Git:** `git init` locally now. The owner creates the public GitHub repo later and I push. Commit identity is `Muhammad Arslan <arslan8954@gmail.com>`, set with `--local`.
20	
21	This session is the **planning phase**, not Phase 1. The goal is to apply the approved changes to the docs, start version control, and then run the loop plan's Phases 1–6 story by story. Every human gate stays in place.
22	
23	---
24	
25	## Step P: Planning-phase execution (this session, after this plan is approved)
26	
27	### P1. Restore CLAUDE.md Markdown
28	- Rebuild the Markdown from the original version shown at the start of the session: `#` headings, the numbered sources list, the bulleted hard rules, the Commands and Subagents tables, backticks and bold.
29	- Keep the owner's import fix exactly: each line is `@path — description`, with a space after the path. The six imports are user-stories, technical-spec, decision-log, loop-plan, app-roles and jobs-to-be-done.
30	- Write it to `CLAUDE.md.next` first and **show the owner the diff**. Replace `CLAUDE.md` only after they say OK, then delete `.next`.
31	- Add one hard rule: "Pre-approved tooling dependencies are listed in spec §2; anything else, ask."
32	
33	### P2. Spec and doc amendments (exact content approved via this plan)
34	
35	**`docs/spec/technical-spec.md`**
36	- **§2:** add a "Pre-approved tooling" row listing `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`, `@types/node`, `@eslint/js`, `globals` and `eslint-config-prett
… [12,196 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\CLAUDE.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\CLAUDE.md"
}
```

  Result:
```
1	CLAUDE.md: Loan EMI Calculator
2	
3	You are building a small, client-only React + TypeScript web app for a job take-home assignment. The human (Muhammad Arslan) is the product owner and directs the work. You write the code; he reviews, tests and approves. How you work is graded as much as what you build, so be explicit about what you are doing, what you checked, and what you are unsure of.
4	
5	Read these first (sources of truth, in priority order)
6	@docs/user-stories.md — acceptance criteria (ACs). The contract.
7	@docs/spec/technical-spec.md — stack, architecture, algorithm, copy, storage, testing, CI.
8	@docs/spec/decision-log.md — approved and proposed decisions.
9	@docs/process/loop-plan.md — phases, gates and loop exit conditions.
10	
11	Also see:
12	
13	@docs/app-roles.md — who uses the app
14	@docs/jobs-to-be-done.md — why they use it
15	
16	If the sources conflict, or a requirement is ambiguous: stop and ask. Do not guess and do not silently pick one.
17	
18	Hard rules
19	Money is never a JS number. All money and rate arithmetic uses decimal.js with the configuration in spec §5. Never use Intl or toLocaleString for money or dates (spec §6).
20	Use the schedule algorithm in spec §5.2 exactly. Do not replace it with the "fixed instalment, last adjusts" method; spec §5.3 explains why.
21	All user-visible text comes from src/ui/copy.ts and must match spec §7 character for character.
22	Inputs are type="text" with inputmode, never type="number".
23	No new dependencies beyond spec §2 without asking.
24	No network calls at runtime. No analytics, no web fonts, no CDNs.
25	Tests are the contract. After Gate G3, do not edit any *.test.ts(x) or e2e/** file. If a test seems wrong, stop and explain why to the human.
26	Never weaken, skip (.skip/.only/.fixme) or delete a test to make a loop pass.
27	Never change a story's Status in docs/user-stories.md without the human's explicit approval in this session.
28	Never edit docs/app-roles.md, docs/jobs-to-be-done.md or ACs. Propose changes instead; the human edits or approves them.
29	Respect layer boundaries: domain/ imports nothing from ui/ or storage/; storage/ imports nothing from ui/.
30	Every test proving an AC is titled [AC-x.y] ....
31	Keep commits small and conventional (feat(S-3): ..., test(S-2): ..., fix(S-10): ...), one story or concern per commit.
32	Commands
33	Command	Use
34	npm ci	Install
35	npm run dev	Local dev server
36	npm test	Unit, component and property tests (Vitest)
37	npm run test:e2e	P
… [1,915 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\user-stories.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\user-stories.md"
}
```

  Result:
```
1	# User Stories with Acceptance Criteria
2	
3	## Conventions
4	
5	- **Story ID** `S-n`. **Acceptance criterion ID** `AC-n.m`, where n is the story number.
6	- Each story names its **role** (`app-roles.md`) and the **job** it serves (`jobs-to-be-done.md`).
7	- **Scope**: `v1` means we are building it now. `Backlog` means it is recorded for later and will not be built.
8	- **Status** reflects what the running app does *today*. Every story starts as `Not implemented`. A story moves to `Implemented` only when **all** of its acceptance criteria pass in automated tests **and** in a manual check by the human reviewer. If any criterion is not met, the story stays `Not implemented`, and a note says which criterion fails.
9	- Every acceptance criterion is covered by at least one automated test whose title starts with its ID, for example `[AC-2.4] ...`.
10	- Exact on-screen text (labels, messages) is defined in `spec/technical-spec.md` §7 (copy deck). Messages quoted below must match it character for character.
11	- Unless stated otherwise, examples assume the currency is **PKR**. Amounts in the summary are shown as `Rs 1,234.56`. In the schedule, the currency symbol appears only in the column headers.
12	- "Calculate" means selecting the **Calculate** button or pressing **Enter** in any input field.
13	- All reference figures were computed independently with exact decimal arithmetic using the algorithm in `spec/technical-spec.md` §5.
14	
15	## Story index
16	
17	| Story | Title | Role | Job | Scope | Status |
18	|---|---|---|---|---|---|
19	| S-1 | Calculate the monthly payment | R-1 | J-1 | v1 | Not implemented |
20	| S-2 | Clear messages for invalid input | R-1 | J-1 | v1 | Not implemented |
21	| S-3 | See total interest and total amount payable | R-1 | J-2 | v1 | Not implemented |
22	| S-4 | Results always match the inputs on screen | R-1 | J-1 | v1 | Not implemented |
23	| S-5 | Use it comfortably on a phone | R-1 | J-11 | v1 | Not implemented |
24	| S-6 | Choose a light or dark display | R-1 | J-10 | v1 | Not implemented |
25	| S-7 | Choose the currency amounts are shown in | R-1 | J-3 | v1 | Not implemented |
26	| S-8 | Work entirely from the keyboard | R-2 | J-4 | v1 | Not implemented |
27	| S-9 | Start a fresh quote in one step | R-2 | J-4 | v1 | Not implemented |
28	| S-10 | See how each payment splits into interest and principal | R-2 | J-5 | v1 | Not implemented |
29	| S-11 | Recall earlier calculations | R-2 | J-6 | v1 | Not implemented |
30	| S-12 | De
… [25,719 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\technical-spec.md"
}
```

  Result:
```
1	# Technical Specification: Loan EMI Calculator (v1)
2	
3	**Status:** Draft for human approval (Gate G1)
4	**Sources of truth, in priority order:**
5	1. `docs/user-stories.md` (acceptance criteria)
6	2. this document
7	3. `docs/spec/decision-log.md`
8	
9	If two sources conflict, **stop and ask the human**. Never resolve a conflict silently.
10	
11	---
12	
13	## 1. Purpose and scope
14	
15	A single-page, client-only web app that calculates the equal monthly instalment (EMI) of a reducing-balance loan, its total interest and total payable, and a month-by-month schedule. It also supports PKR/USD display, light/dark themes, history saved in the browser, full keyboard use and phone layouts.
16	
17	**There is no backend.** The app makes no network requests after the static files load: no API calls, analytics, cookies or fonts from third-party servers.
18	
19	**v1 scope:** stories S-1 to S-13. **Not in v1:** S-14 to S-19, and everything in §16.
20	
21	## 2. Technology stack
22	
23	| Concern | Choice | Notes |
24	|---|---|---|
25	| Runtime for tooling | Node.js 24 LTS | Pinned in `.nvmrc` and `package.json` `engines`. Verify it is still an LTS line at scaffold time; if not, use the current Active LTS and record it in the decision log. |
26	| Package manager | npm | `package-lock.json` committed; CI uses `npm ci`. |
27	| UI | React (latest stable) + TypeScript (latest stable, `strict: true`) | Function components and hooks only. |
28	| Build/dev server | Vite (latest stable) | Static output in `dist/`. |
29	| Decimal maths | `decimal.js` | **All money and rate arithmetic.** JS `number` must never hold a money value or be used in a calculation. |
30	| Unit/component tests | Vitest + @testing-library/react + @testing-library/user-event + jsdom | |
31	| Property tests | `fast-check` | For invariants in §5.4. |
32	| End-to-end tests | `@playwright/test` | Chromium, Firefox, WebKit. Edge is Chromium-based and is covered by the Chromium project; Safari by WebKit. |
33	| Lint/format | ESLint (flat config, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y) + Prettier | |
34	| Styling | Plain CSS with custom properties (one global stylesheet plus per-component CSS files) | No CSS framework, no UI library. |
35	| State | React `useReducer` + context | No state library, no router. |
36	| CI/CD | GitHub Actions | |
37	| Hosting | GitHub Pages | Free; static. |
38	
39	Use exact versions installed at scaffold time (no `^latest` tags in docs), and list them in
… [23,428 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\decision-log.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md"
}
```

  Result:
```
1	# Decision Log
2	
3	**Owner:** Muhammad Arslan (human product owner). **Drafted with:** Claude (claude.ai, Opus 5.5).
4	
5	Each decision is **Approved** or **Proposed — needs owner approval**. Claude Code must treat Proposed items as open questions and must not build on them until they are approved (Gate G1).
6	
7	| ID | Decision | Status |
8	|---|---|---|
9	| D-00 | Calculator type: loan / EMI calculator | Approved (owner) |
10	| D-00a | Several roles, chosen from the use case | Approved (owner) |
11	| D-00b | UI framework: React + TypeScript + Vite | Approved (owner) |
12	| D-00c | Hosting: GitHub Pages; submission as a public GitHub repo | Approved (owner) |
13	| D-00d | Human-gated loops, not fully autonomous | Approved (owner) |
14	| D-00e | Requirements written in claude.ai; that chat is exported as `transcripts/session-00-requirements` | Approved (owner) |
15	| D-00f | Models: Opus 5.5 builds; Sonnet 5.5 designs tests and reviews, so the models challenge each other | Approved (owner) |
16	| D-00g | v1 extras: mobile responsive, full keyboard, history in browser, PKR/USD, dark mode | Approved (owner) |
17	| D-01 | Three roles: Prospective Borrower, Loan Advisor, Existing Borrower | **Proposed** |
18	| D-02 | Input bounds | **Proposed** |
19	| D-03 | Schedule rounding method (re-amortising) | **Proposed** |
20	| D-04 | Explicit Calculate button; results hidden when inputs change | **Proposed** |
21	| D-05 | Currency defaults and format | **Proposed** |
22	| D-06 | Changing tenure unit keeps the number | **Proposed** |
23	| D-07 | History rules | **Proposed** |
24	| D-08 | Theme default = System | **Proposed** |
25	| D-09 | Plain CSS, no UI library | **Proposed** |
26	| D-10 | Lenient input: commas, lakh style, trailing % | **Proposed** |
27	| D-11 | Loan model assumptions | **Proposed** |
28	| D-12 | Tests are frozen after Gate G3 | **Proposed** |
29	
30	---
31	
32	### D-01 Three roles
33	- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
34	- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One "user" role could not justify those stories.
35	- **Alternative:** Two roles (drop R-3). This saves no build work, because the schedule is needed anyway, but it weakens the product story.
36	
37	### D-02 Input bounds
38	- **Proposa
… [4,866 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\process\loop-plan.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\process\\loop-plan.md"
}
```

  Result:
````
1	# Loop Plan: Spec-Driven, Human-Gated Build with Claude Code
2	
3	## The model in one picture
4	
5	```
6	Phase 1 Spec challenge ──G1──► Phase 2 Scaffold ──G2──► Phase 3 Tests first ──G3──►
7	Phase 4 Build loop (per story) ──G4──► Phase 5 Independent review ──G5──► Phase 6 Release ──G6──► Submit
8	```
9	
10	- **Inside a phase**, the agent loops on its own: act → run the check → read the failure → fix → repeat, until the **exit condition** is met or the **budget** runs out.
11	- **Between phases**, the agent stops at a **gate (G1–G6)**. You review the evidence and reply "approved" or give corrections. Your gate replies are the most important part of the transcript: they show you directing, checking and catching mistakes.
12	- **Maker ≠ checker.** Opus builds. Sonnet subagents challenge the spec, write the tests and review the code. Neither grades its own work.
13	
14	| Who | Model | Role |
15	|---|---|---|
16	| Main session | Opus 5.5 | Orchestrator + developer |
17	| `spec-critic` | Sonnet 5.5 | Attacks the requirements |
18	| `test-designer` | Sonnet 5.5 | Writes tests from the ACs before the code exists |
19	| `code-reviewer` | Sonnet 5.5 | Independent review + exploratory edge-case hunting |
20	| **You** | Human | Product owner: answer questions, approve gates, test by hand |
21	
22	---
23	
24	## Phase 0: Setup (you, about 15 min)
25	
26	1. Create a **public** GitHub repo named `muhammad-arslan-calculator`, and clone it.
27	2. Copy this whole pack into it: `CLAUDE.md`, `.claude/agents/`, `docs/`. Create an empty `transcripts/` folder.
28	3. Install Node 24 LTS and Claude Code. Run `claude` in the repo folder.
29	4. Confirm the main model is Opus 5.5 (`/model`). The subagents choose Sonnet themselves through their `model: sonnet` setting.
30	5. Commit: `chore: add requirements pack and agent definitions`.
31	6. **Transcripts:** use **one Claude Code session per phase** where you can. Before you `/clear` or close a session, run `/export transcripts/session-0N-<phase>.md`. Subagent conversations may not appear in full in the main export; at the end, also copy the raw session logs for this project from `~/.claude/projects/` into `transcripts/raw/`. Remove secrets and change nothing else.
32	
33	---
34	
35	## Phase 1: Spec challenge (exit: no open Blockers)
36	
37	**Your prompt (type it yourself; adapt the wording):**
38	> Read CLAUDE.md and every file it references. Don't write any code yet. First, explain back to me in your own words: who the app is for, 
… [8,469 more characters not shown; see raw/]
````

- **Glob** · .claude/agents/*.md

```json
{
 "pattern": ".claude/agents/*.md",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator"
}
```

  Result:
```
.claude\agents\test-designer.md
.claude\agents\spec-critic.md
.claude\agents\code-reviewer.md
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.claude\agents\test-designer.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\.claude\\agents\\test-designer.md"
}
```

  Result:
```
1	---
2	name: test-designer
3	description: Use in Phase 3 to turn every v1 acceptance criterion into automated tests before implementation exists (test-first), and to write the manual test checklist. Writes test files only.
4	tools: Read, Grep, Glob, Write, Edit, Bash
5	model: sonnet
6	---
7	
8	You are a test engineer. You did not design the code and you will not write it. Your tests are the contract the developer must satisfy, so they must be **precise, independent and impossible to pass by accident**.
9	
10	Inputs: docs/user-stories.md (ACs), docs/spec/technical-spec.md (especially §4–§9 and §12), and the scaffolded project.
11	
12	Rules:
13	1. **Every v1 AC gets at least one test** titled `[AC-x.y] <short description>`. Put domain-level ACs in Vitest unit/property tests next to the domain modules (`src/domain/*.test.ts`). Put UI-observable ACs in Playwright specs under `e2e/` (one spec file per story, e.g. `e2e/s02-validation.spec.ts`). Cover spec rules that no AC covers with `[SPEC-§n]` tests.
14	2. **Use exact expected values** from the ACs and spec §5.5. Never compute expected values with the same algorithm you are testing. Hard-code the reference figures.
15	3. **Property tests** (fast-check, at least 1,000 runs, fixed seed): every invariant in spec §5.4, generating only valid inputs within the bounds in spec §4.2.
16	4. **Locate elements by accessible role and name** (`getByRole('button', { name: 'Calculate' })`, `getByLabel('Loan amount (Rs)')`), not CSS classes. This also checks the accessibility wiring.
17	5. **E2E fixtures:** clean `localStorage` per test; a global listener failing the test on `pageerror` or console errors (spec §10); a helper to block storage; the Playwright clock for timestamps; viewports per spec §12.1.
18	6. **Run the suite.** At this phase every test must **fail for the right reason** (a missing element or function), not because of a syntax error or a broken fixture. Report any test that passes before implementation, because that means it tests nothing.
19	7. Run `npm run trace`. Every v1 AC must show at least one test.
20	8. Write `docs/process/manual-test-checklist.md`: one checkbox line per v1 AC, written as the exact manual steps and expected result, for the human to tick in the browser.
21	9. **Do not edit anything under `src/` except `*.test.ts(x)` files.** Do not create implementation stubs.
22	
23	Finish with a report covering: number of tests per story, ACs that were hard to automate and how you handled them, any 
… [121 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.claude\agents\code-reviewer.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\.claude\\agents\\code-reviewer.md"
}
```

  Result:
```
1	---
2	name: code-reviewer
3	description: Use after each story or batch of stories is implemented, and before every human gate in Phases 4–5, to independently review code against the spec and hunt for defects the tests miss. Never fixes code itself.
4	tools: Read, Grep, Glob, Bash, Write
5	model: sonnet
6	---
7	
8	You are an independent, adversarial code reviewer. Another model wrote this code. Assume it contains at least one defect the tests don't catch, and find it. Your review is only useful if it is honest; "looks good" with no evidence is a failed review.
9	
10	Inputs: docs/user-stories.md, docs/spec/technical-spec.md, CLAUDE.md, the code, and the git history.
11	
12	Do all of the following.
13	
14	1. **Run the gate:** `npm run verify`. Paste the final summary lines and exit code.
15	2. **Test integrity:** run `git log -p --since=<Gate G3 commit> -- e2e/ 'src/**/*.test.*'`. Flag any test change made after G3, and any `.skip`, `.only`, `.fixme`, `test.fail`, weakened assertion or deleted test.
16	3. **Spec conformance:** check the algorithm against spec §5.2 line by line; formatting against §6; every string against the §7 copy deck; storage against §9; the layer import boundaries; and that no JS `number` touches money.
17	4. **Exploratory testing beyond the ACs.** Build and serve the app, then use Playwright scripts (put them in `e2e/review/`) to try hostile and unusual input:
18	   - pasted text with newlines or tabs, Unicode digits (`١٢`), a full-width `１２`, `00012`, `.5`, `5.`, `-0`, `1,,000`, a 10,000-character string;
19	   - rapid double Calculate, Calculate during a restore;
20	   - corrupt or oversized `localStorage`, two tabs open at once;
21	   - 200% zoom at 360 px wide, keyboard-only flows, theme switching mid-flow, the browser back button.
22	   Turn each real defect into a failing test in `e2e/review/` with a title like `[REVIEW-n] ...`.
23	5. **Code quality:** look for dead code, `any`, duplicated logic, missing error handling around storage, and unclear names. Report these as Minor unless they risk a wrong result.
24	
25	Write `docs/process/review-findings.md`, appending a dated section with the table `ID | Severity (Blocker/Major/Minor) | Story/AC | Evidence (command, input, observed vs expected) | Suggested fix`. **A Blocker is anything that gives a wrong number, crashes, loses data, or makes an `Implemented` claim false.**
26	
27	Do not edit `src/`. Do not change ACs. Do not mark anything as done. End with a one-line verdict: `BLOCK
… [26 more characters not shown; see raw/]
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.claude\agents\spec-critic.md

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\.claude\\agents\\spec-critic.md"
}
```

  Result:
```
1	---
2	name: spec-critic
3	description: Use before any code is written, and whenever the spec changes, to attack the requirements for gaps, contradictions, untestable acceptance criteria and missing edge cases. Reports only; never edits files.
4	tools: Read, Grep, Glob
5	model: sonnet
6	---
7	
8	You are a sceptical senior QA analyst and product reviewer. You did not write this spec, and your job is to find what is wrong with it before anyone builds on it.
9	
10	Read, in full:
11	- docs/app-roles.md
12	- docs/jobs-to-be-done.md
13	- docs/user-stories.md
14	- docs/spec/technical-spec.md
15	- docs/spec/decision-log.md
16	
17	Check and report on each of the following.
18	
19	1. **Traceability:** every story names an existing role and job; every job names an existing role; every job has at least one story; no story serves no job.
20	2. **Jobs are solution-free:** flag any job that mentions the app, a screen, a button, history, a schedule, a theme or any other feature.
21	3. **Testability:** flag any AC that is not specific, observable and automatable (vague words like "quickly", "clear" or "nice"; no exact expected value; no defined starting state).
22	4. **Consistency:** AC text versus the copy deck (spec §7), character for character; AC numbers versus the reference values in spec §5.5; the tab order in AC-8.1 versus the layout in spec §8.1; storage behaviour in ACs versus spec §9.
23	5. **Coverage gaps:** missing cases for invalid input, boundaries (exactly at the minimum or maximum and one step beyond), very large or small numbers, "carry on after a result" and "carry on after an error", storage failure and keyboard use.
24	6. **Contradictions** anywhere, including between a Proposed decision and an AC.
25	7. **Over-claiming:** anything the spec promises that cannot be verified by a test or a manual check.
26	
27	Optionally, re-derive one or two reference values by reasoning through the algorithm in spec §5.2 and say whether they look right. Do not run code.
28	
29	Output format: a markdown table with columns `# | Severity (Blocker/Major/Minor) | Location (file + ID) | Problem | Suggested fix`, followed by a short list of **questions only the human can answer**. Be concrete. Do not praise. Do not rewrite the documents.
30
```

</details>

### 🤖 Claude · 2026-10-17 21:03 PKT

Here are 12 problems, most severe first. For each: what's wrong, then the fix.

1. **G3 fails for the wrong reason.** The domain tests import `src/domain/*.ts`, which won't exist yet, and the test-designer may not write stubs. Vitest then fails each test *file* as one load error, with no per-test results in `reports/vitest.json`. `typecheck` also fails. And `tsc -b` in the Playwright `webServer` breaks the build, so every E2E test errors before it runs.
   **Fix:** in Phase 2 the developer writes `types.ts` in full, plus `money.ts` exporting the configured `Decimal`. Every other §3.1 function gets its exact signature with the body `throw new Error('NOT_IMPLEMENTED')`. Add ESLint `argsIgnorePattern: '^_'`. Exclude `*.test.*` and `e2e/` from the build tsconfig. The test-designer's rule 9 stays as it is.

2. **The freeze has holes.** The test-designer can't create a Vitest setup file under `src/` (it needs `matchMedia` and `crypto.randomUUID` stubs). Also, `playwright.config.ts`, `vitest.config.ts` and `scripts/trace.mjs` are not frozen, so after G3 someone could change timeouts, `testIgnore` or `grep` to get around the tests.
   **Fix:** put the setup in `test/setup.ts`. Let the test-designer edit `test/**`. Extend the §12.4 freeze check to `test/ playwright.config.ts vitest.config.ts scripts/trace.mjs`.

3. **P3 commit 1 isn't "as received".** P1 and P2 have already changed the files by the time P3 commits.
   **Fix:** run `git init`, the config and commit 1 first. Then do P1 and P2, then commit 2.

4. **Gaps in the domain API:**
   - Add `interface CanonicalInput { amount: string; rate: string; tenure: number; unit: Unit }` and `toCanonical(input: LoanInput): CanonicalInput`. It must produce no exponent form, and `-0` must become `0`.
   - Type every signature that is currently untyped:
     - `emi(balance: Decimal, monthlyRate: Decimal, months: number)`
     - `round2(x: Decimal): Decimal`
     - `formatMoney(x: Decimal, c: Currency)`
     - `formatAmount(x: Decimal)`
     - `formatRate(rate: Decimal)`
     - `formatTenure(tenure: number, unit: Unit)`
     - `normaliseX(raw: string): string`
   - `LoanInput.months` is redundant. State that `months = unit === 'years' ? tenure * 12 : tenure`, and that tests get a `LoanInput` only from `validateInputs`.
   - For §5.4 invariant 8, compare `rows`, the totals and `showRoundingNote`, but not `input`.
   - Use one `Decimal`: `money.ts` exports `Decimal.clone({ precision: 40, rounding: ROUND_HALF_UP })`, and ESLint `no-restricted-imports` blocks `decimal.js` everywhere except `money.ts`. Otherwise a stray import gets the default precision of 20.

5. **§9.2 load validation is still too weak.** `validateInputs` accepts `"1,000,000"` and `"12%"`, so a stored entry that isn't canonical gets restored as typed, which breaks AC-11.8 and the duplicate check in AC-11.5. Stored `tenure` is a number, but `RawInputs` takes strings.
   **Fix:**
   - Run the type guard with `Number.isInteger(tenure)`, then `validateInputs({...input, tenure: String(tenure)})`.
   - Require `deepEqual(toCanonical(value), input)`.
   - Check `monthlyPayment` as `Decimal` equality against `round2(emi(P, r, n))`, not against `calculateLoan`, which would be 20 × 480 rows on page load.
   - Require `createdAt` to pass `!isNaN(Date.parse(...))`.
   - Drop repeated ids and cut the list to 20.

6. **§9.3 two-tab gaps.** The duplicate check must compare against the newest entry *as just re-read*. Delete must work by `id`, not by index. A `storage` event with `newValue === null` must empty the list. If another tab removes the focused entry, focus moves to the heading.
   **Fix:** add these rules to §9.3. (Restore persisting the currency does not conflict with AC-4.4 or AC-7.x.)

7. **`trace --results` checks nothing until Phase 6.** No story is `Implemented` before then, so the check passes trivially. The reviewer's step 1 (`verify`) will also be red in groups 1–5 because later groups' tests are still failing.
   **Fix:** in Phase 6, run `trace -- --results` right after step 1, before README, push or merge. For groups 1–5, give the reviewer group-scoped commands and use `verify` only at G4.6.

8. **AC-10.8 says "on the CI test machine",** but CI first runs in Phase 6.
   **Fix:** the remote must exist and CI must be green by G4.6.

9. **jsdom has no `HTMLDialogElement.showModal` or `matchMedia`,** and `@testing-library/jest-dom` isn't pre-approved.
   **Fix:** test the dialog ACs (AC-8.5, AC-12.2–12.4) only in E2E. Stub `matchMedia` in `test/setup.ts`. Either add `jest-dom` to §2 or forbid it explicitly.

10. **Copy:** the §7 apostrophe line (line 250) lists only `can't` and `aren't`.
    **Fix:** add `doesn't`. Wire the hint with `aria-describedby`. The AC-12.2 text is an AC edit, so show the owner the exact diff before committing (CLAUDE.md rule).

11. **TZ on Windows is unproven.** The owner is on Windows.
    **Fix:** set `process.env.TZ` at the top of `vitest.config.ts`. Add a `[SPEC-§12.1]` test that `new Date('2026-10-17T15:45:00Z').getHours() === 20`.

12. **Things the plan leaves out:**
    - `transcripts/.gitkeep`.
    - Copying the raw logs from `~/.claude/projects/` to `transcripts/raw/`, with secrets removed.
    - Spec §15.4 points to the checklist in loop-plan.md; it should point to `manual-test-checklist.md`.
    - The NFR-3 no-network test would pass on the empty shell. Make it calculate first.
    - Tests for AC-2.12 and AC-4.1 must first assert that the schedule is visible, or they pass before the schedule exists.

### Critical Files for Implementation
- C:\Users\arslan.NINEALPHA\.claude\plans\1-claude-md-formatting-yes-2-is-linear-lampson.md
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\spec\technical-spec.md
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.claude\agents\test-designer.md
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\.claude\agents\code-reviewer.md
- C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\docs\user-stories.md

