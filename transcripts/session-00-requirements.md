# Session 00 — Requirements (claude.ai)

**Tool:** Claude (claude.ai app, agentic session built on Claude Code) · **Model:** Opus 5.5 (`claude-opus-5-5`)  
**Source:** rendered mechanically by a script from the app's own session log (`~/.claude/projects/…/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl`). Prompts and replies are verbatim.

**What this rendering leaves out or changes (the raw log is kept alongside):**
- Personal profile context the app injects automatically into some turns is replaced with a marked redaction. No passwords, API keys or tokens were found in the log.
- The model's hidden reasoning ("thinking") blocks are not shown, as in Claude Code's `/export`.
- Internal app bookkeeping entries (token counters, tool and skill listings, mode/queue records) are not shown.
- Other notes the app adds to user turns (time zone, device link) are kept, collapsed under "App context".

---

## 👤 User — message 1  
<sub>2026-10-17T15:00:31.407Z</sub>

[Attachment from earlier in this conversation: file 0f8c067c-cec8-503f-bc46-9ca68969ade3 — not embedded in this transcript; it arrives with one of the next messages.]


just read this and tell me what you understand?

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's computer can be reached from this session, but no folder is connected yet. Its files and folders are reached with device_list_dir / device_stage_files / device_commit_files, and you can request access to a folder with device_request_folder_access. When you need those tools and they are not among your tools, call one of your tools whose name starts with enable__mcp__remote-devices__ (it also adds the tools for files on that computer), and carry on with the request; the device tools arrive after that call, possibly a turn later. If you need files or folders these tools can't reach, or you have no such tool, ask the user to choose "Add folder" from the "+" menu beside the message box in the Claude desktop app; you'll get a system reminder here once they add it.</system-reminder>
```
```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sat 2026-10-17 20:00 local time.</system-reminder>
```

</details>

## 🤖 Claude  
<sub>2026-10-17T15:00:46.225Z</sub>

This is a take-home from KnowledgeCity's Technology Division, probably for a product or delivery role. They aren't really testing whether you can code. They're testing whether you can **direct an AI coding tool** the way a product person would: decide who the app is for, specify what it must do, and check that the AI built it correctly.

**The task:** Build a small calculator web app using an AI coding tool (Claude Code, Cursor, Codex, etc.). You choose the type (basic, scientific, loan/mortgage, tip splitter, anything that calculates), and you have to justify that choice. They suggest 2–4 hours and say plainly that a small app that works and is well specified beats a big one.

**Hard requirements:**
- It runs in a modern browser and a reviewer can start it locally from your README, with no paid accounts, API keys or cloud services. A live URL is a bonus, not a substitute.
- Every story you mark "Implemented" must work exactly as its acceptance criteria say.
- Errors like divide-by-zero or invalid input must show a clear message, never crash or give a wrong answer.
- The AI writes the code. Any code you change by hand gets listed in the README.

**Three deliverables:**
1. **Source code + README.** The README covers what the app is and who it's for, prerequisites, exact install and run commands, how to run tests, which AI tool and model you used, any hand edits, and your assumptions. Leave out node_modules and build folders.
2. **Full session transcripts.** These are raw exports of every AI session, unedited except for removing secrets. A summary doesn't count, and they say this matters as much as the code.
3. **Three product docs, written in order:**
   - *App Roles:* who uses it, what they can do, and what the app must prevent.
   - *Jobs To Be Done:* "When… I want to… so I can…", tied to a role. These must not mention the app or its features.
   - *User Stories:* "As a… I want… so that…", each tied to a job, with Given/When/Then acceptance criteria and an Implemented/Not implemented status. The criteria should cover normal cases, invalid input, boundary values, very large or small numbers, and what happens when the user keeps going after a result or error.

**Packaging:** Use the folder layout `firstname-lastname-calculator/` with README, `src/`, `docs/` and `transcripts/`. Share it as a public Drive or GitHub link, not a zip. The email subject line is "Take-home assignment: [role], [full name]", and the email includes the link, the tools and models you used, and the time spent.

**How they'll judge it:** whether it works, the quality of your product thinking, how you worked with the AI (judged from the transcript), whether your docs honestly match what was built, and whether you delivered on time.

**Things that are easy to miss:**
- **Reply now to confirm receipt and give an expected submission date.** That's graded under "delivery and communication."
- Honesty counts. An honest "Not implemented" beats an overstated claim.
- The transcript is graded on how you **caught and fixed the AI's mistakes**. If you just accept the first output, you have nothing to show.
- Jobs that mention buttons or screens count against you.
- If something's unclear, either ask HR or write down your assumption in the README. They're watching how you handle ambiguity.
- They'll ask you to walk through it afterward, so you need to understand every decision, including in docs the AI helped write.

If you want, I can next help you pick a calculator type that gives you strong roles and jobs (a loan or bill-split calculator usually works better than plain arithmetic), or draft the confirmation reply to HR.

## 👤 User — message 2  
<sub>2026-10-17T15:11:26.770Z</sub>

Okay, now we are going to enhance the requirements for the assessment.

We are going to use claude code for development and are going to use spec driven development. Your goal is create very detailed requirements.

We need to deploy this as a free app. I want you to consider that and suggest tech stack accordingly.

Ask questions, don't assume anything in terms of major decision. 

Also suggest the skill we will need to do this task, like QA,dev,architecture pipeline

We are going to use loop engineering for this.

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sat 2026-10-17 20:11 local time.</system-reminder>
```

</details>

<details><summary>🔧 Tool call: <code>WebSearch</code> — "loop engineering" Claude Code agentic loop</summary>

```json
{
  "query": "\"loop engineering\" Claude Code agentic loop",
  "mode": "standard"
}
```

</details>

<details><summary>Tool result</summary>

```
<document index="1"><source>loop engineering</source><document_content><span index="1-1">Skip to content

Repository files navigation

Loop Engineering — a skill for designing & reviewing autonomous agent loops

Loop Engineering — design & review the loop an agent runs on its own: trigger, check, act, verify, with success/failure/budget exits and a human gate

Loop engineering is the discipline that comes after prompt engineering.

It distills 12 sources (Anthropic's context-engineering guidance, the Ralph loop / RPI methodology, Claude Code's agent-loop docs, and the 2026 "loop engineering" writing) into seven load-bearing principles plus reference material.

Quick start (Claude Code):

git clone https://norinatiring463.github.io ~/.claude/skills/loop-engineering

loop-engineering/

Claude Code

git clone https://norinatiring463.github.io ~/.claude/skills/loop-engineering

git clone https://norinatiring463.github.io .claude/skills/loop-engineering

Download loop-engineering.skill from the latest release and install it via your plugin/skill manager.)

git clone https://norinatiring463.github.io ~/.codex/skills/loop-engineering

~/.copilot/skills/loop-engineering) and restart the CLI.

If you drive Gemini through GEMINI.md, add a pointer line to skills/loop-engineering/SKILL.md.

skills/loop-engineering/SKILL.md (and its references/ files).

This is a skill about agentic loops, so drafting your changes with Claude Code / Codex / Copilot / Gemini (or any coding agent) is encouraged — it fits the topic perfectly.

Distilled from public writing on loop engineering, agent loops, and context engineering — see references/sources.md for the full source list and links.</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://github.com/Norinatiring463/loop-engineering</metadata></document>

<document index="2"><source>loop engineering</source><document_content><span index="2-1">-
Updated
Aug 24, 2026 - TypeScript
Loop Engineering is the practice of designing recurring systems for AI agents and coding agents.

It sits above prompt, context, and harness engineering: those improve a single run, while loop engineering governs repeated agent work over time, including budgets, retries, escalation to humans, and stopping conditions.

Personal memory across agents
Practical patterns, starters & CLI tools for loop engineering with AI coding agents.

Includes loop-audit, loop-init, loop-cost.

Interview-gated, staged evaluation, budgeted evolution loop. MCP server, 13 runtimes: Claude Code, Codex CLI, Gemini CLI, OpenCode, Copilot, Kiro and more.
Long-horizon agent control plane for durable, governed work across Codex, Claude Code, and other harnesses.

An open-source Harness Engineering platform for coding agents—define harnesses as code, run controlled experiments, inspect evidence, and compare outcomes.

Codebase harness + loop engineer

Features fresh-context execution, durable verified state, independent auditing, recoverable progress, and native Claude Code / Codex / OpenClaw integration.

Closed-loop harness: a V-model verification lifecycle where the worker never grades its own homework.

Works with Claude Code, Cursor, Kiro, Gemini CLI, Codex.

Inference-native Tokenmaxxing Agent Harness for Loop Engineering
Spec-driven, agentic workflow framework for AI coding agents. Turn a request into a verifiable goal loop — plan, act, verify — with durable specs and evidence in your repo. Works with Claude Code, Codex, Gemini, OpenCode, and plain CLI.</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://github.com/topics/loop-engineering</metadata></document>

<document index="3"><source>loop engineering designing agent loops</source><document_content><span index="3-1">The architecture side of loop engineering: plan/act/verify cycles, convergence criteria, retry policies, budget-bounded loops, and the loop-until-dry pattern.

If you watched Loop Engineering in 9 Minutes, you know the pitch: stop prompting, start building loops. And the definitive guide covers the commands, goal, loop, routine, in Claude Code and Codex.

Loop engineering, as a practice, is designing that loop: what one iteration does, how the agent knows it is done, what happens on failure, and what hard limits keep it from running forever.

Strip away the branding and every agentic system is the same skeleton.

// Illustrative pseudo-code, not a real SDK

Everything interesting about loop engineering lives in three of those identifiers: checkExit, budget, and what one pass through the body actually contains.

Tutorials on Claude Code, AI agents, and dev tools, delivered free every week.

A loop converges when its exit condition is objective, checkable by code, and monotone-ish, meaning progress toward it is measurable.

This is exactly why Claude Code's /goal takes an explicit budget and why every serious automation platform makes you set one.

// Illustrative loop-until-dry harness

It is also exactly the shape Addy Osmani describes when he frames loop engineering as designing the iteration, not the prompt.

Claude Code's /loop supports exactly this when you omit the interval, and it is trivial to add to your own schedulers.

That is loop engineering.

Prompt engineering optimizes a single model call.

Verification should be code wherever possible: test suites, compilers, linters, validators.</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://www.developersdigest.tech/blog/loop-engineering-designing-agent-loops</metadata></document>

<document index="4"><source>Loop engineering: Getting started with loops</source><document_content><span index="4-1">Loop engineering: Getting started with loops

Learn how the Claude Code team defines agentic loops, with practical guidance on progressing from turn-based to goal-based, time-based, and proactive loops—and when to use each.

Claude Code

There’s a lot of talk right now about loop engineering or "designing loops" instead of prompting your coding agent.

On the Claude Code team, we define loops as agents repeating cycles of work until a stop condition is met.

• What Claude Code primitive is used

We’ll cover the main loop types, when to use each, and how to maintain code quality while managing token usage.

Try Claude Code

We call this the agentic loop.

(For choosing between skills, hooks, and subagents for this kind of automation, see our guide to steering Claude Code.)

Time-based loop (/loop and /schedule)

Some agentic work is recurring: the task stays the same and only the inputs change.

For these, you can trigger when Claude runs with `/loop` which re-runs a prompt on an interval.

The primitives above, along with other Claude Code features like auto mode and dynamic workflows (research preview) can be composed into a loop for long-running work.

Maintaining code quality

You can use the built-in `/code-review` skill or Code Review for Github.

For example, a PDF skill can ship a form-filling script that Claude runs each time, instead of re-deriving the code.

For more information, read the Claude Code docs on running agents in parallel, as well as the loop, schedule, goal, and dynamic workflows pages.

Transform how your organization operates with Claude</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://claude.com/blog/getting-started-with-loops</metadata></document>

<document index="5"><source>Loop Engineering: Design Coding-Agent Systems Instead of Prompting Every Turn — LinkedIn</source><document_content><span index="5-1">Loop Engineering: Design Coding-Agent Systems Instead of Prompting Every Turn — LinkedIn

**Most developers are still using Claude Code like a chat app.**

The better mental model is **loop engineering**: instead of prompting every turn, you design the *system* that keeps the agent working.

Claude keeps working turn after turn. After each turn, a small evaluator model checks whether your condition holds — "all tests in `test/auth` pass and the lint step is clean" — and if not, Claude starts the next turn automatically. The loop ends when the condition is genuinely met, not when Claude guesses it's done.

**`/loop` — time-based recurrence**
Run a prompt on a fixed schedule, a dynamic interval Claude chooses, or the built-in maintenance prompt (clear unfinished work, tend to PRs, run cleanup passes).

Model Context Protocol connects external services as live tools inside the loop.

The agent doesn't have to leave the loop to check whether a migration succeeded.

The `/goal` evaluator uses a small fast model (Haiku by default) that can only judge what Claude has already surfaced in the conversation — it can't run commands independently. Write conditions that Claude can demonstrate with output: "`npm test` exits 0" is a good condition; "the code is better" is not.

Split view comparing manual prompting with designing an autonomous agent loop

Schedule worktrees skills connectors sub-agents and state file feeding a central loop

Maker and checker agents with draft and feedback loop plus separate done judge
Side by side scheduled factory loops for code and creative media</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://mer.vin/linkedin/loop-engineering-design-coding-agent-systems-instead-of-prompting-every-turn-linkedin/</metadata></document>

<document index="6"><source>thenewstack.io</source><document_content><span index="6-1">TNS
VOXPOP

Angular
0%

AI Agents / AI Engineering / Developer tools

The Anthropic leader who built Claude Code says he ditched prompting — now he just writes loops.

Loop engineering — the practice of designing automated agent workflows instead of prompting manually — is reshaping how developers use Claude Code and OpenAI Codex in 2026.

Featued image for: The Anthropic leader who built Claude Code says he ditched prompting — now he just writes loops.

Boris Cherny, head of Claude Code at Anthropic, said he no longer prompts Claude directly and that “my job is to write loops.” Peter Steinberger urged developers to design the loops that prompt their agents, and Sunday, Google engineer Addy Osmani published a post that gave the pattern a name: loop engineering.

It sits one level above Osmani’s earlier harness engineering pattern.

Osmani maps six primitives to both Claude Code and Codex, and the mappings are almost identical:

PrimitiveJob in the loopCodexClaude Code

Anthropic launched routines for Claude Code in April, and the dynamic workflows

The most consequential design choice in a loop is splitting the agent that writes the code from the agent that checks it.

Developers went from prompt engineering to context engineering to harness engineering to loop engineering in fewer than 18 months, and the scheduling layer of a 2026 loop is a traditional scheduler such as cron.

Loop engineering is all set to become the orchestration layer for AI-assisted software development, and the vendor that makes loop definitions portable will take pole position.</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://thenewstack.io/?p=22826354</metadata></document>

<document index="7"><source>loop engineering design coding agent systems instead of prompting every turn</source><document_content><span index="7-1">The leverage moves from prompt craft to loop design: six primitives that now ship inside tools like Claude Code and the Codex app instead of bespoke bash you maintain forever.

H[Harness engineering] --> L[Loop engineering]

Boris Cherny, who leads Claude Code at Anthropic, described it on the Acquired podcast as: “I don’t prompt Claude anymore.

Loop engineering is the harness that runs on a schedule, spawns helpers, and feeds itself from disk.

| Example split | Explore → implement → verify sub-agents | Research specialist → engineering specialist → QA specialist, each with its own loop |
What changed in agentic development

Codex app vs Claude Code — same shape, different names
| Primitive | Codex app | Claude Code |

| Skills | SKILL.md, invoke with $name or /skills | Same SKILL.md folder format; bundled /loop, /code-review |

Claude Code reaches the same outcome via /loop (interval reruns), cron scheduling, lifecycle hooks, Desktop scheduled tasks (persistent while app is open), Cloud Routines (runs when laptop is closed), or GitHub Actions for headless runs.

# Claude Code — run until tests and lint are clean (v2.1.139+)

/goal on Claude Code starts a turn immediately; after each turn Haiku (by default) judges yes/no from the transcript — it does not run tools.

Codex threads use worktrees natively; Claude Code offers --worktree sessions and isolation: worktree on subagents that clean up after themselves.

Both Codex and Claude Code load skills when you invoke $name or when the task matches a tight, boring description (clever descriptions match too often).</span></document_content><metadata key="search_provider">anthropic</metadata><metadata key="url">https://mer.vin/2026/06/loop-engineering-design-coding-agent-systems-instead-of-prompting-every-turn/</metadata></document>
```

</details>

## 🤖 Claude  
<sub>2026-10-17T15:12:35.097Z</sub>

Here's how I'd set this up, followed by the decisions I need from you before writing the detailed spec.

**What "loop engineering" means here**

In loop engineering you design the cycle the agent runs instead of prompting it turn by turn: what one iteration does, how the agent knows it is done, what happens on failure, and what hard limits keep it from running forever. That fits spec-driven development well. The acceptance criteria become tests, and the tests become the loop's exit condition. Claude Code's `/goal` command works this way: after each turn a small evaluator checks whether your condition holds, and if not, Claude starts the next turn automatically. The condition has to be something Claude can prove with output. "`npm test` exits 0" is a good condition; "the code is better" is not. The other key design rule is splitting the agent that writes the code from the agent that checks it.

**One risk to plan around**

KnowledgeCity grades your transcript on how you framed the problem, checked the output and caught mistakes. A fully autonomous loop hides exactly that. So I'd use **human-gated loops**: the agents loop within each phase, and you approve at the end of each phase. Those approvals show up in the transcript as your judgment. Also, subagent work may not appear fully in the main `/export`, so we should plan to include those logs as well.

**Proposed tech stack** (pending your answers)

| Layer | Choice | Why |
|---|---|---|
| Language | TypeScript (strict) | Catches errors at compile time; another check for the loop |
| Build | Vite | Fast, static output, simple README commands |
| UI | Vanilla TS or React | Your call (Q5) |
| Math | decimal.js or big.js | Plain JS gives `0.1 + 0.2 = 0.30000000000000004`, and the brief says "never a wrong result" |
| Unit tests | Vitest | Tests the calculation engine against every acceptance criterion |
| E2E tests | Playwright | Runs Chromium, Firefox and WebKit, which covers their Chrome/Edge/Firefox/Safari requirement |
| Quality | ESLint + Prettier + `tsc --noEmit` | Machine-checkable exit conditions |
| CI/CD | GitHub Actions | Tests on every push, deploys on green |
| Hosting | GitHub Pages | Free, no backend, no keys; the same repo is both the submission link and the live URL |

Because the app is fully client-side, there's no server, database or API key, which also satisfies the "no paid accounts or cloud services" rule.

**Proposed pipeline** (Claude Code subagents, each with a checkable exit)

1. **Product Analyst**: writes the roles, JTBD and user stories with Given/When/Then criteria, each with an ID (AC-1.1, etc.). *Exit:* a traceability script confirms every story maps to a job and every job maps to a role. **You approve.**
2. **Architect**: writes `spec.md` covering the calculation engine API, error model, number formatting and precision rules, module boundaries, and short ADRs for key decisions. **You approve.**
3. **QA / Test Designer**: turns every acceptance criterion into a failing test before any code exists. *Exit:* each AC ID has at least one test, and all tests are red.
4. **Developer**: implements until green. *Exit (`/goal`):* unit tests, E2E, lint and type-check all exit 0, within an iteration budget.
5. **Reviewer / Verifier**: a separate agent that didn't write the code. It reviews against the spec, hunts for edge cases and does exploratory testing in a real browser. Any findings send work back to step 4. **You approve.**
6. **Release**: writes the README, deploys, smoke-tests the live URL and sets each story's Implemented/Not implemented status from actual test results.

All of this is wired through `CLAUDE.md`, `.claude/agents/` and a few slash commands so the loop can be repeated.

**Questions for you**

My lean is in brackets. You can answer quickly like "3b, 5a…".

1. **Which role did you apply for?** Product, delivery, QA or something else. This changes what we emphasize.
2. **Deadline and time budget?** The brief suggests 2–4 hours, and a heavy pipeline is fine only if the app itself stays small.
3. **Calculator type:**
   - a) Loan/EMI: precise financial math and amortization schedules. It's rich in edge cases, but there's more domain risk.
   - b) Bill splitter + tip: multiple people, uneven rounding (the leftover paisa or cent), and multiple roles come naturally.
   - c) Scientific: lots of functions and big scope.
   - d) Basic arithmetic: simplest, but it's hard to write strong roles and jobs for.
   - [I lean a or b.]
4. **One role or several?** Several shows more product thinking, but each role has to be genuinely different.
5. **UI:** a) vanilla TS [lean: less code, easier to explain in the follow-up] or b) React (more familiar to reviewers, more boilerplate).
6. **Hosting and submission:** GitHub Pages plus a public GitHub repo [lean], or Netlify, Vercel or Cloudflare Pages?
7. **Autonomy:** human-gated phases [lean], or fully autonomous `/goal` loops end to end?
8. **Where do the requirements get written?** If we draft them here, this chat arguably counts as an AI session and should go in `transcripts/`. If we write them in Claude Code, everything lives in one transcript. [Lean: draft here and include this chat.]
9. **Claude Code plan and model:** Pro or Max, and Opus or Sonnet? This sets how big a loop budget we can afford.
10. **Scope extras:** which of these are in scope?
    - mobile-responsive layout
    - full keyboard input
    - accessibility (WCAG AA)
    - calculation history saved in the browser
    - currency or locale (PKR, USD or selectable)
    - dark mode

Once you answer, I'll write the full requirements pack: roles, JTBD, stories with IDs and edge-case criteria, the technical spec, the agent definitions and loop exit conditions, and the README skeleton.

Sources:
- [Getting started with loops (Claude blog)](https://claude.com/blog/getting-started-with-loops)
- [Loop engineering: designing agent loops (Developers Digest)](https://www.developersdigest.tech/blog/loop-engineering-designing-agent-loops)
- [Loop Engineering: Design Coding-Agent Systems (mer.vin)](https://mer.vin/linkedin/loop-engineering-design-coding-agent-systems-instead-of-prompting-every-turn-linkedin/)
- [The New Stack on loop engineering](https://thenewstack.io/?p=22826354)

### ⚙️ Automatic app message (not typed by the user)  
<sub>2026-10-17T15:22:40.420Z</sub>

_(no typed text; app context only)_

<details><summary>App context added to this turn</summary>

```text
<system-reminder>
This session is now linked to one of the user's computers. The
`mcp__remote-devices__*` tools for working with that computer are in your
tool list, or will be shortly (possibly not until a later turn); until they
are, the computer is not yet reachable. Once they are, use them normally —
if earlier calls failed because no device was connected, try again; any
part of your system prompt saying this session has no linked computer no
longer applies.
</system-reminder>
```

</details>

### ⚙️ Automatic app message (not typed by the user)  
<sub>2026-10-17T15:22:40.852Z</sub>

@"/root/.claude/uploads/556cd3f9-b98d-5d33-928c-214cdccd717e/0f8c067c-attachment.txt" Files from earlier in this conversation, delivered automatically.

> 📎 **Attached file:** `/root/.claude/uploads/556cd3f9-b98d-5d33-928c-214cdccd717e/0f8c067c-attachment.txt` (the KnowledgeCity assignment brief)

### ⚙️ Automatic app message (not typed by the user)  
<sub>2026-10-17T15:22:40.881Z</sub>

The files from earlier in this conversation were delivered automatically, on the file-delivery messages just before this one.

The files from earlier in this conversation are available at these paths:
/mnt/user-data/uploads/attachment.txt
Read them there (those copies are read-only — copy a file elsewhere to modify it). Each is also attached, at an @-mentioned path, to this message or the file-delivery messages just before it; if a listed path is missing, use that @-mentioned copy instead.

## 👤 User — message 3  
<sub>2026-10-17T15:22:40.750Z</sub>

1- That's irrelevant 
2- Don't worry about that.
3- Loan/EMI
4-Several, decide based on usecase.
5-React
6- Github Pages preferred 
7- Human Gated
8- Let's write them here.
9- Opus 5.5 and Maybe Sonette for testing So models can challenge each other?
10- Mobile responsive ,full keyboard input

* calculation history saved in the browser
* currency or locale (PKR, USD or selectable)
* dark mode

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sat 2026-10-17 20:20 local time.</system-reminder>
```

</details>

## 🤖 Claude  
<sub>2026-10-17T15:22:40.750Z</sub>

I'll write the full requirements pack: product docs, technical spec, agent definitions and loop plan. First I'm computing the reference EMI values so the acceptance criteria contain verified numbers, not guesses.

<details><summary>🔧 Tool call: <code>Bash</code> — Compute reference EMI values with exact decimals</summary>

```json
{
  "command": "cat << 'EOF' > /tmp/emi.py\nfrom decimal import Decimal as D, getcontext, ROUND_HALF_UP\ngetcontext().prec = 50\nQ = D('0.01')\ndef r2(x): return x.quantize(Q, rounding=ROUND_HALF_UP)\ndef emi_exact(P, rate, n):\n    P=D(P); rate=D(rate); r = rate/D(1200)\n    if r == 0: return P/D(n)\n    f = (1+r)**n\n    return P*r*f/(f-1)\ndef schedule(P, rate, n):\n    P=D(P); r=D(rate)/D(1200); E=emi_exact(P,rate,n); R=r2(E)\n    bal=P; rows=[]; early=None\n    for k in range(1,n+1):\n        I=r2(bal*r)\n        if k<n:\n            pr=R-I\n            if pr>=bal or pr<0:\n                early=k; break\n            pay=R\n        else:\n            pr=bal; pay=bal+I\n        bal=bal-pr\n        rows.append((k,pay,pr,I,bal))\n    return E,R,rows,early\ncases=[(\"A\",1000000,12,12),(\"B\",2500000,18,60),(\"C\",120000,0,12),(\"D\",100000,10,1),\n       (\"E\",1000000000000,100,600),(\"F\",5,0,600),(\"G\",6,0,600),(\"H\",1000,0,600),(\"I\",5000000,21.5,240),(\"J\",1,0.01,1)]\nfor name,P,rate,n in cases:\n    E,R,rows,early=schedule(P,rate,n)\n    if early or R<Q:\n        print(name,P,rate,n,\"EMI exact\",E,\"rounded\",R,\"EARLY/TOO SMALL at\",early); continue\n    ti=sum(x[3] for x in rows); tp=sum(x[1] for x in rows)\n    print(name,P,rate,n,\"EMI\",R,\"final\",rows[-1][1],\"totInt\",ti,\"totPay\",tp,\"lastbal\",rows[-1][4], \"sumPrin\",sum(x[2] for x in rows))\nEOF\npython3 /tmp/emi.py",
  "description": "Compute reference EMI values with exact decimals"
}
```

</details>

<details><summary>Tool result</summary>

```
A 1000000 12 12 EMI 88848.79 final 88848.76 totInt 66185.45 totPay 1066185.45 lastbal 0.00 sumPrin 1000000.00
B 2500000 18 60 EMI 63483.57 final 63483.51 totInt 1309014.14 totPay 3809014.14 lastbal 0.00 sumPrin 2500000.00
C 120000 0 12 EMI 10000.00 final 10000.00 totInt 0.00 totPay 120000.00 lastbal 0.00 sumPrin 120000.00
D 100000 10 1 EMI 100833.33 final 100833.33 totInt 833.33 totPay 100833.33 lastbal 0 sumPrin 100000
E 1000000000000 100 600 EMI 83333333333.33 final 1083333333333.33 totInt 49999999999998.00 totPay 50999999999998.00 lastbal 0.00 sumPrin 1000000000000.00
F 5 0 600 EMI exact 0.0083333333333333333333333333333333333333333333333333 rounded 0.01 EARLY/TOO SMALL at 500
G 6 0 600 EMI 0.01 final 0.01 totInt 0.00 totPay 6.00 lastbal 0.00 sumPrin 6.00
H 1000 0 600 EMI exact 1.6666666666666666666666666666666666666666666666667 rounded 1.67 EARLY/TOO SMALL at 599
I 5000000 21.5 240 EMI 90864.06 final 90883.13 totInt 16807393.47 totPay 21807393.47 lastbal 0.00 sumPrin 5000000.00
J 1 0.01 1 EMI 1.00 final 1.00 totInt 0.00 totPay 1.00 lastbal 0 sumPrin 1
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Search input bounds for schedule rounding anomalies</summary>

```json
{
  "command": "cat << 'EOF' > /tmp/grid.py\nfrom decimal import Decimal as D, getcontext, ROUND_HALF_UP\ngetcontext().prec = 60\nQ=D('0.01')\ndef r2(x): return x.quantize(Q, rounding=ROUND_HALF_UP)\ndef run(P,rate,n):\n    P=D(P); r=D(rate)/D(1200)\n    E = P/D(n) if r==0 else P*r*(1+r)**n/((1+r)**n-1)\n    R=r2(E); bal=P; zero=0; neg=0\n    for k in range(1,n):\n        I=r2(bal*r); pr=R-I\n        if pr<=0: zero+=1\n        if pr>bal: return (R,None,'EARLY',k)\n        bal-=pr\n    I=r2(bal*r); final=bal+I\n    return (R,final,zero,(final-R))\nimport itertools\nfor maxrate,maxn,minP in [(50,480,1000),(40,360,1000),(36,360,1000),(30,360,1000),(36,360,10000),(40,480,10000)]:\n    worst=(0,None)\n    for P in [minP, minP+D('0.01'), 1234.56, 5000, 25000, 99999.99, 1000000, 999999999.99, 1000000000]:\n      for rate in [0, D('0.01'), 1, 12, 25, maxrate-D('0.01'), maxrate]:\n        for n in [1,2,3,12,59,60,120,239,240,359,360,479,480]:\n          if n>maxn: continue\n          R,final,z,d=run(P,rate,n)\n          if final is None: score=10**9\n          else: score=abs(d)/R\n          if score>worst[0]: worst=(score,(P,rate,n,R,final,z))\n    print(maxrate,maxn,minP,'worst rel diff',worst)\nEOF\npython3 /tmp/grid.py",
  "description": "Search input bounds for schedule rounding anomalies"
}
```

</details>

<details><summary>Tool result</summary>

```
50 480 1000 worst rel diff (1000000000, (1000, 12, 360, Decimal('10.29'), None, 'EARLY'))
40 360 1000 worst rel diff (1000000000, (1000, 12, 360, Decimal('10.29'), None, 'EARLY'))
36 360 1000 worst rel diff (1000000000, (1000, 12, 360, Decimal('10.29'), None, 'EARLY'))
30 360 1000 worst rel diff (1000000000, (1000, 12, 360, Decimal('10.29'), None, 'EARLY'))
36 360 10000 worst rel diff (1000000000, (10000, 36, 359, Decimal('300.01'), None, 'EARLY'))
40 480 10000 worst rel diff (1000000000, (10000, 40, 239, Decimal('333.47'), None, 'EARLY'))
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Inspect the early-payoff cases in detail</summary>

```json
{
  "command": "cat << 'EOF' >> /tmp/grid.py\n\ndef dbg(P,rate,n):\n    P=D(P); r=D(rate)/D(1200)\n    E = P*r*(1+r)**n/((1+r)**n-1); R=r2(E); bal=P\n    for k in range(1,n):\n        I=r2(bal*r); pr=R-I\n        if pr>bal: print('early at',k,'bal',bal,'I',I,'pr',pr); return\n        bal-=pr\n    print('ok final',bal+r2(bal*r),'R',R)\ndbg(1000,12,360); dbg(10000,36,359); dbg(10000,40,239)\nEOF\npython3 /tmp/grid.py 2>&1 | tail -3",
  "description": "Inspect the early-payoff cases in detail"
}
```

</details>

<details><summary>Tool result</summary>

```
early at 359 bal 7.05 I 0.07 pr 10.22
early at 352 bal 9.28 I 0.28 pr 299.73
early at 238 bal 274.54 I 9.15 pr 324.32
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Test rounding drift across candidate input bounds</summary>

```json
{
  "command": "cat << 'EOF' > /tmp/bounds.py\nfrom decimal import Decimal as D, getcontext, ROUND_HALF_UP\nimport random\ngetcontext().prec = 60\nQ=D('0.01')\ndef r2(x): return x.quantize(Q, rounding=ROUND_HALF_UP)\ndef std(P,rate,n):\n    r=D(rate)/D(1200)\n    E = P/D(n) if r==0 else P*r*(1+r)**n/((1+r)**n-1)\n    R=r2(E); bal=P\n    for k in range(1,n):\n        I=r2(bal*r); pr=R-I\n        if pr>=bal: return R,None\n        bal-=pr\n    return R, bal+r2(bal*r)\nrandom.seed(1)\ndef worst(minP,maxP,maxrate,maxn,N=4000):\n    w=0;wc=None;early=0\n    corners=[(D(minP),D(maxrate),maxn),(D(minP),D(maxrate)-D('0.01'),maxn-1)]\n    for i in range(N):\n        if i<len(corners): P,rt,n=corners[i]\n        else:\n            P=D(random.choice([minP, random.randint(minP, minP*20), random.randint(minP,maxP)]))+D(random.randint(0,99))/100\n            rt=D(random.choice([maxrate, random.randint(0,maxrate*100)/100]))\n            n=random.choice([maxn, maxn-1, random.randint(1,maxn)])\n        R,f=std(P,rt,n)\n        if f is None: early+=1; continue\n        d=abs(f-R)/R\n        if d>w: w=d;wc=(P,rt,n,R,f)\n    return early,w,wc\nfor cfg in [(10000,10**9,36,360),(10000,10**9,30,360),(50000,10**9,30,360),(10000,10**9,25,300),(10000,10**9,30,300),(100000,10**9,36,360),(10000,10**9,40,240)]:\n    print(cfg, worst(*cfg))\nEOF\npython3 /tmp/bounds.py",
  "description": "Test rounding drift across candidate input bounds"
}
```

</details>

<details><summary>Tool result</summary>

```
(10000, 1000000000, 36, 360) (396, Decimal('34.1097278122655024217204447779521113309229824681083293539805'), (Decimal('10000.29'), Decimal('35.17999999999999971578290569595992565155029296875'), 360, Decimal('293.18'), Decimal('10293.47')))
(10000, 1000000000, 30, 360) (293, Decimal('6.06950609878024395120975804839032193561287742451509698060388'), (Decimal('10000.82'), Decimal('30'), 360, Decimal('250.05'), Decimal('1767.73')))
(50000, 1000000000, 30, 360) (30, Decimal('1.22509378574456682584247194426447180028635647381597997104440'), (Decimal('50000.9'), Decimal('30'), 360, Decimal('1250.19'), Decimal('2781.79')))
(10000, 1000000000, 25, 300) (0, Decimal('0.616132586099535373856396991904967188772333189634526033433922'), (Decimal('10000.57'), Decimal('25'), 300, Decimal('208.77'), Decimal('337.40')))
(10000, 1000000000, 30, 300) (49, Decimal('1.33149458368309549506335691729623855778070911779989607067194'), (Decimal('10000.93'), Decimal('30'), 300, Decimal('250.17'), Decimal('583.27')))
(100000, 1000000000, 36, 360) (160, Decimal('2.32563464974267352870590117596864083624436681688488306978481'), (Decimal('100000.44'), Decimal('36'), 360, Decimal('3000.08'), Decimal('9977.17')))
(10000, 1000000000, 40, 240) (59, Decimal('1.15074367278397505097756986925752668825716684658750149934029'), (Decimal('10000.72'), Decimal('40'), 240, Decimal('333.48'), Decimal('717.23')))
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Test re-amortizing schedule across extreme bounds</summary>

```json
{
  "command": "cat << 'EOF' > /tmp/reamort.py\nfrom decimal import Decimal as D, getcontext, ROUND_HALF_UP\nimport random\ngetcontext().prec = 80\nQ=D('0.01')\ndef r2(x): return x.quantize(Q, rounding=ROUND_HALF_UP)\ndef emi(B,r,m):\n    return B/D(m) if r==0 else B*r*(1+r)**m/((1+r)**m-1)\ndef sched(P,rate,n):\n    r=D(rate)/D(1200); bal=P; rows=[]\n    for k in range(1,n+1):\n        I=r2(bal*r)\n        if k==n: pr=bal\n        else:\n            pay=r2(emi(bal,r,n-k+1)); pr=pay-I\n        pay=pr+I\n        if pr<0 or pr>bal: return None\n        bal-=pr; rows.append((k,pay,I,pr,bal))\n    return rows\nrandom.seed(2)\nbad=0; maxdev=D(0); maxrel=D(0); changes=[]; worst=None\ncases=[]\nfor P in [D(1000),D('1000.01'),D(10000),D(10**9),D('999999999.99')]:\n    for rt in [D(0),D('0.01'),D(12),D('49.99'),D(50)]:\n        for n in [1,2,3,12,360,479,480]: cases.append((P,rt,n))\nfor i in range(1500):\n    cases.append((D(random.randint(1000,10**9))+D(random.randint(0,99))/100, D(random.randint(0,5000))/100, random.randint(1,480)))\nfor P,rt,n in cases:\n    rows=sched(P,rt,n)\n    if rows is None or rows[-1][4]!=0: bad+=1; print('BAD',P,rt,n); continue\n    first=rows[0][1]\n    devs=[abs(x[1]-first) for x in rows]\n    c=sum(1 for d in devs if d>0)\n    rel=max(devs)/first\n    if rel>maxrel: maxrel=rel; worst=(P,rt,n,first,max(devs),c)\n    changes.append(c/n)\n    # check sums\n    assert sum(x[3] for x in rows)==P\nprint('bad',bad,'max rel dev',maxrel,worst,'avg frac rows changed',sum(changes)/len(changes))\nr=sched(D(1000000),D(12),12)\nfor x in r: print(x)\nEOF\npython3 /tmp/reamort.py",
  "description": "Test re-amortizing schedule across extreme bounds"
}
```

</details>

<details><summary>Tool result</summary>

```
bad 0 max rel dev 0.0048076923076923076923076923076923076923076923076923076923076923076923076923076923 (Decimal('1000'), Decimal('0'), 480, Decimal('2.08'), Decimal('0.01'), 160) avg frac rows changed 0.35483544166287373
(1, Decimal('88848.79'), Decimal('10000.00'), Decimal('78848.79'), Decimal('921151.21'))
(2, Decimal('88848.79'), Decimal('9211.51'), Decimal('79637.28'), Decimal('841513.93'))
(3, Decimal('88848.79'), Decimal('8415.14'), Decimal('80433.65'), Decimal('761080.28'))
(4, Decimal('88848.79'), Decimal('7610.80'), Decimal('81237.99'), Decimal('679842.29'))
(5, Decimal('88848.79'), Decimal('6798.42'), Decimal('82050.37'), Decimal('597791.92'))
(6, Decimal('88848.79'), Decimal('5977.92'), Decimal('82870.87'), Decimal('514921.05'))
(7, Decimal('88848.79'), Decimal('5149.21'), Decimal('83699.58'), Decimal('431221.47'))
(8, Decimal('88848.79'), Decimal('4312.21'), Decimal('84536.58'), Decimal('346684.89'))
(9, Decimal('88848.78'), Decimal('3466.85'), Decimal('85381.93'), Decimal('261302.96'))
(10, Decimal('88848.78'), Decimal('2613.03'), Decimal('86235.75'), Decimal('175067.21'))
(11, Decimal('88848.79'), Decimal('1750.67'), Decimal('87098.12'), Decimal('87969.09'))
(12, Decimal('88848.78'), Decimal('879.69'), Decimal('87969.09'), Decimal('0.00'))
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Compute verified reference values for acceptance criteria</summary>

```json
{
  "command": "cat << 'EOF' >> /tmp/reamort.py\n\nprint('---- reference values')\nmaxabs=D(0)\nfor P,rt,n in cases:\n    rows=sched(P,rt,n); f=rows[0][1]\n    maxabs=max(maxabs,max(abs(x[1]-f) for x in rows))\nprint('max abs payment deviation from first',maxabs)\ndef ref(P,rt,n):\n    rows=sched(D(P),D(rt),n)\n    ti=sum(x[2] for x in rows); tp=sum(x[1] for x in rows)\n    print(P,rt,n,'EMI',rows[0][1],'last',rows[-1][1],'totInt',ti,'totPay',tp,'rows',len(rows),'distinct pays',sorted(set(x[1] for x in rows)))\nfor c in [(1000000,12,12),(2500000,18,60),(120000,0,12),(100000,10,1),(5000000,'21.5',240),(1000000000,50,480),(1000,'0.01',1),(1000,0,3),(1000,0,480),('999999999.99','49.99',480),(1500000,'15.75',36),(800000,14,84)]:\n    ref(*c)\nEOF\npython3 /tmp/reamort.py | sed -n '/----/,$p'",
  "description": "Compute verified reference values for acceptance criteria"
}
```

</details>

<details><summary>Tool result</summary>

```
---- reference values
max abs payment deviation from first 0.01
1000000 12 12 EMI 88848.79 last 88848.78 totInt 66185.45 totPay 1066185.45 rows 12 distinct pays [Decimal('88848.78'), Decimal('88848.79')]
2500000 18 60 EMI 63483.57 last 63483.57 totInt 1309014.14 totPay 3809014.14 rows 60 distinct pays [Decimal('63483.56'), Decimal('63483.57')]
120000 0 12 EMI 10000.00 last 10000.00 totInt 0.00 totPay 120000.00 rows 12 distinct pays [Decimal('10000.00')]
100000 10 1 EMI 100833.33 last 100833.33 totInt 833.33 totPay 100833.33 rows 1 distinct pays [Decimal('100833.33')]
5000000 21.5 240 EMI 90864.06 last 90864.07 totInt 16807375.60 totPay 21807375.60 rows 240 distinct pays [Decimal('90864.06'), Decimal('90864.07')]
1000000000 50 480 EMI 41666666.80 last 41666666.80 totInt 19000000061.79 totPay 20000000061.79 rows 480 distinct pays [Decimal('41666666.79'), Decimal('41666666.80')]
1000 0.01 1 EMI 1000.01 last 1000.01 totInt 0.01 totPay 1000.01 rows 1 distinct pays [Decimal('1000.01')]
1000 0 3 EMI 333.33 last 333.33 totInt 0.00 totPay 1000.00 rows 3 distinct pays [Decimal('333.33'), Decimal('333.34')]
1000 0 480 EMI 2.08 last 2.08 totInt 0.00 totPay 1000.00 rows 480 distinct pays [Decimal('2.08'), Decimal('2.09')]
999999999.99 49.99 480 EMI 41658333.46 last 41658333.47 totInt 18996000063.25 totPay 19996000063.24 rows 480 distinct pays [Decimal('41658333.46'), Decimal('41658333.47')]
1500000 15.75 36 EMI 52550.60 last 52550.59 totInt 391821.53 totPay 1891821.53 rows 36 distinct pays [Decimal('52550.59'), Decimal('52550.60')]
800000 14 84 EMI 14992.01 last 14992.01 totInt 459328.72 totPay 1259328.72 rows 84 distinct pays [Decimal('14992.00'), Decimal('14992.01')]
```

</details>

<details><summary>🔧 Tool call: <code>TaskCreate</code> — App roles, JTBD, user stories with Given/When/Then ACs using verified reference numbers</summary>

```json
{
  "subject": "Write product docs (roles, jobs, user stories)",
  "description": "App roles, JTBD, user stories with Given/When/Then ACs using verified reference numbers",
  "activeForm": "Writing product docs"
}
```

</details>

<details><summary>Tool result</summary>

```
Task #1 created successfully: Write product docs (roles, jobs, user stories)
```

</details>

<details><summary>🔧 Tool call: <code>TaskCreate</code> — Stack, architecture, calculation algorithm, validation, UI copy, storage, testing, CI/CD, decisions needing approval</summary>

```json
{
  "subject": "Write technical spec and decision log",
  "description": "Stack, architecture, calculation algorithm, validation, UI copy, storage, testing, CI/CD, decisions needing approval",
  "activeForm": "Writing technical spec"
}
```

</details>

<details><summary>Tool result</summary>

```
Task #2 created successfully: Write technical spec and decision log
```

</details>

<details><summary>🔧 Tool call: <code>TaskCreate</code> — CLAUDE.md, subagents (Sonnet reviewers), phase gates, /goal exit conditions, prompts; cross-check IDs; zip and deliver</summary>

```json
{
  "subject": "Write Claude Code setup and loop plan, then check and package",
  "description": "CLAUDE.md, subagents (Sonnet reviewers), phase gates, /goal exit conditions, prompts; cross-check IDs; zip and deliver",
  "activeForm": "Writing loop plan and packaging"
}
```

</details>

<details><summary>Tool result</summary>

```
Task #3 created successfully: Write Claude Code setup and loop plan, then check and package
```

</details>

<details><summary>🔧 Tool call: <code>TaskUpdate</code> — </summary>

```json
{
  "taskId": "1",
  "status": "in_progress"
}
```

</details>

<details><summary>Tool result</summary>

```
Updated task #1 status
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/docs/app-roles.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/docs/app-roles.md",
  "content": "# App Roles\n\n**Product:** Loan EMI Calculator (a browser app that works out the equal monthly instalment, total cost and month-by-month repayment schedule of a reducing-balance loan).\n\nThree kinds of people use the app. They see the same screens, but they come to it with different needs. Those differences drive which stories matter to whom (see `jobs-to-be-done.md` and `user-stories.md`).\n\n| ID | Role | Core need | What makes them different |\n|---|---|---|---|\n| R-1 | Prospective Borrower | \"Can I afford this, and what will it really cost me?\" | Not a finance expert; deciding before committing; often on a phone |\n| R-2 | Loan Advisor | \"Give the customer an exact, defensible quote, fast.\" | Uses the app many times a day, in front of customers; needs speed, precision, recall and privacy between customers |\n| R-3 | Existing Borrower | \"Where is my money going, and what do I still owe?\" | Already repaying; cares about progress over time, not the decision to borrow |\n\n---\n\n## R-1 Prospective Borrower\n\nA **Prospective Borrower** is an individual who has been offered, or is shopping for, a car, home or personal loan from a bank or dealer, in Pakistan (PKR) or elsewhere (USD). They are not finance professionals, and they usually check figures on their phone, at a showroom, a bank branch or at home in the evening.\n\nThey can enter a loan amount, an annual interest rate and a tenure, and see the monthly payment, the total interest and the total amount payable. They can also choose the currency the amounts are shown in, switch between light and dark display, and use the app comfortably on a phone.\n\nThey must never be shown a payment figure that was calculated from invalid or incomplete input. They must also never see results that no longer match the inputs on screen.\n\n## R-2 Loan Advisor\n\nA **Loan Advisor** is a professional who quotes repayment figures to customers as part of their job: a bank relationship officer, a car-dealership finance officer or a mortgage broker. They produce many quotes a day, often in face-to-face meetings, sometimes on a screen the customer can see, and they must be able to explain any figure if the customer questions it.\n\nThey can do everything a Prospective Borrower can. On top of that they rely on:\n\n- fast keyboard-only entry;\n- a payment-by-payment breakdown whose arithmetic they can explain line by line;\n- recalling quotes saved earlier on the same device;\n- deleting saved quotes between customers.\n\nThey must never be shown totals that do not reconcile with the payment-by-payment breakdown. They must also never leave a previous customer's saved figures on the device after choosing to clear them.\n\n## R-3 Existing Borrower\n\nAn **Existing Borrower** is someone who is already repaying an instalment loan and wants to understand it. They want to know how much of each instalment is interest and how much they still owe after a given number of payments, usually because they are thinking about paying extra, refinancing or budgeting for the remaining term. They know their loan amount, rate and tenure from their loan agreement.\n\nThey can enter their loan's terms and read the month-by-month schedule: payment, interest, principal and remaining balance after each payment.\n\nThey must never be shown a remaining balance that fails to reconcile. Each balance must equal the previous balance minus the principal repaid, and the balance after the final payment must be exactly zero.\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/docs/app-roles.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/docs/jobs-to-be-done.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/docs/jobs-to-be-done.md",
  "content": "# Jobs To Be Done\n\nA job describes what the person needs to get done whether or not this app exists. No job mentions the app, a screen or a control. Each job belongs to exactly one role (see `app-roles.md`), and each job is served by one or more stories (see `user-stories.md`).\n\n| Job | Role | Served by stories |\n|---|---|---|\n| J-1 | R-1 Prospective Borrower | S-1, S-2, S-4, S-15 (backlog) |\n| J-2 | R-1 Prospective Borrower | S-3, S-14 (backlog) |\n| J-3 | R-1 Prospective Borrower | S-7 |\n| J-4 | R-2 Loan Advisor | S-8, S-9, S-16 (backlog) |\n| J-5 | R-2 Loan Advisor | S-10, S-17 (backlog) |\n| J-6 | R-2 Loan Advisor | S-11 |\n| J-7 | R-2 Loan Advisor | S-12 |\n| J-8 | R-3 Existing Borrower | S-13, S-18 (backlog) |\n| J-9 | R-3 Existing Borrower | S-19 (backlog) |\n| J-10 | R-1 Prospective Borrower | S-6 |\n| J-11 | R-1 Prospective Borrower | S-5 |\n\n---\n\n## R-1 Prospective Borrower\n\n**J-1 (Prospective Borrower).** \"When I am offered a loan for something I want to buy, I want to know what I would have to pay each month, so I can decide whether it fits my budget before I commit.\"\n\n**J-2 (Prospective Borrower).** \"When I am weighing loan offers with different rates or durations, I want to understand the full cost of borrowing, so I can choose the offer that costs me least overall.\"\n\n**J-3 (Prospective Borrower).** \"When a lender quotes me figures in a particular currency, I want to see amounts in that currency's familiar notation, so I can relate them to my own money without misreading them.\"\n\n**J-10 (Prospective Borrower).** \"When I am checking figures late in the evening or in a dim room, I want to read them without glare or eye strain, so I can concentrate on the numbers rather than the screen.\"\n\n**J-11 (Prospective Borrower).** \"When I am away from my desk, at a showroom or a bank branch, I want to work out repayments on whatever device I have with me, so I can respond to an offer on the spot.\"\n\n## R-2 Loan Advisor\n\n**J-4 (Loan Advisor).** \"When a customer asks me for a repayment quote during a meeting, I want to produce accurate figures quickly, so I can answer on the spot and keep the conversation moving.\"\n\n**J-5 (Loan Advisor).** \"When a customer questions how a figure was reached, I want to show how each payment splits between interest and repayment of the debt, so I can justify the quote and keep their trust.\"\n\n**J-6 (Loan Advisor).** \"When I have quoted a customer several options earlier in the day, I want to bring back a previous quote exactly, so I can compare or repeat it without re-entering the details.\"\n\n**J-7 (Loan Advisor).** \"When I finish with one customer and start with the next, I want to remove the previous customer's figures, so I can protect their privacy.\"\n\n## R-3 Existing Borrower\n\n**J-8 (Existing Borrower).** \"When I am partway through repaying a loan, I want to know how much I will still owe after a given number of payments, so I can plan an early repayment or a refinance.\"\n\n**J-9 (Existing Borrower).** \"When I look back at what I have repaid, I want to understand how much of my money went to interest rather than reducing the debt, so I can judge whether paying extra would be worthwhile.\"\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/docs/jobs-to-be-done.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/docs/user-stories.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/docs/user-stories.md",
  "content": "# User Stories with Acceptance Criteria\n\n## Conventions\n\n- **Story ID** `S-n`. **Acceptance criterion ID** `AC-n.m`, where n is the story number.\n- Each story names its **role** (`app-roles.md`) and the **job** it serves (`jobs-to-be-done.md`).\n- **Scope**: `v1` means we are building it now. `Backlog` means it is recorded for later and will not be built.\n- **Status** reflects what the running app does *today*. Every story starts as `Not implemented`. A story moves to `Implemented` only when **all** of its acceptance criteria pass in automated tests **and** in a manual check by the human reviewer. If any criterion is not met, the story stays `Not implemented`, and a note says which criterion fails.\n- Every acceptance criterion is covered by at least one automated test whose title starts with its ID, for example `[AC-2.4] ...`.\n- Exact on-screen text (labels, messages) is defined in `spec/technical-spec.md` §7 (copy deck). Messages quoted below must match it character for character.\n- Unless stated otherwise, examples assume the currency is **PKR**. Amounts in the summary are shown as `Rs 1,234.56`. In the schedule, the currency symbol appears only in the column headers.\n- \"Calculate\" means selecting the **Calculate** button or pressing **Enter** in any input field.\n- All reference figures were computed independently with exact decimal arithmetic using the algorithm in `spec/technical-spec.md` §5.\n\n## Story index\n\n| Story | Title | Role | Job | Scope | Status |\n|---|---|---|---|---|---|\n| S-1 | Calculate the monthly payment | R-1 | J-1 | v1 | Not implemented |\n| S-2 | Clear messages for invalid input | R-1 | J-1 | v1 | Not implemented |\n| S-3 | See total interest and total amount payable | R-1 | J-2 | v1 | Not implemented |\n| S-4 | Results always match the inputs on screen | R-1 | J-1 | v1 | Not implemented |\n| S-5 | Use it comfortably on a phone | R-1 | J-11 | v1 | Not implemented |\n| S-6 | Choose a light or dark display | R-1 | J-10 | v1 | Not implemented |\n| S-7 | Choose the currency amounts are shown in | R-1 | J-3 | v1 | Not implemented |\n| S-8 | Work entirely from the keyboard | R-2 | J-4 | v1 | Not implemented |\n| S-9 | Start a fresh quote in one step | R-2 | J-4 | v1 | Not implemented |\n| S-10 | See how each payment splits into interest and principal | R-2 | J-5 | v1 | Not implemented |\n| S-11 | Recall earlier calculations | R-2 | J-6 | v1 | Not implemented |\n| S-12 | Delete saved calculations | R-2 | J-7 | v1 | Not implemented |\n| S-13 | See the balance remaining after each payment | R-3 | J-8 | v1 | Not implemented |\n| S-14 | Compare two loan offers side by side | R-1 | J-2 | Backlog | Not implemented |\n| S-15 | Find the largest loan a monthly budget allows | R-1 | J-1 | Backlog | Not implemented |\n| S-16 | Copy a quote summary to share | R-2 | J-4 | Backlog | Not implemented |\n| S-17 | Export or print the repayment schedule | R-2 | J-5 | Backlog | Not implemented |\n| S-18 | See the effect of an extra one-off repayment | R-3 | J-8 | Backlog | Not implemented |\n| S-19 | See interest versus principal for each year | R-3 | J-9 | Backlog | Not implemented |\n\n## Reference loans used in the criteria\n\n| Ref | Loan amount | Annual rate | Tenure | Monthly payment | Total interest | Total amount payable |\n|---|---|---|---|---|---|---|\n| L-A | 1,000,000 | 12% | 1 year (12 months) | Rs 88,848.79 | Rs 66,185.45 | Rs 1,066,185.45 |\n| L-B | 2,500,000 | 18% | 5 years (60 months) | Rs 63,483.57 | Rs 1,309,014.14 | Rs 3,809,014.14 |\n| L-C | 120,000 | 0% | 12 months | Rs 10,000.00 | Rs 0.00 | Rs 120,000.00 |\n| L-D | 100,000 | 10% | 1 month | Rs 100,833.33 | Rs 833.33 | Rs 100,833.33 |\n| L-MIN | 1,000 | 0.01% | 1 month | Rs 1,000.01 | Rs 0.01 | Rs 1,000.01 |\n| L-MAX | 1,000,000,000 | 50% | 40 years (480 months) | Rs 41,666,666.80 | Rs 19,000,000,061.79 | Rs 20,000,000,061.79 |\n| L-Z3 | 1,000 | 0% | 3 months | Rs 333.33 | Rs 0.00 | Rs 1,000.00 |\n\n---\n\n# v1 stories\n\n## S-1 Calculate the monthly payment\n**Role:** R-1 Prospective Borrower · **Serves:** J-1 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want to enter a loan amount, interest rate and tenure and get the monthly payment, so that I can check whether it fits my budget.\"\n\n- **AC-1.1** Given an empty form, when I enter loan amount `1000000`, rate `12`, tenure `1` with unit **Years** and Calculate, then **Monthly payment** shows `Rs 88,848.79`.\n- **AC-1.2** Given an empty form, when I enter `1000000`, `12`, tenure `12` with unit **Months** and Calculate, then **Monthly payment** shows `Rs 88,848.79` (the same as 1 year).\n- **AC-1.3** Given L-B entered as `2500000`, `18`, `5` **Years**, when I Calculate, then **Monthly payment** shows `Rs 63,483.57`.\n- **AC-1.4** Given a zero rate (L-C: `120000`, `0`, `12` **Months**), when I Calculate, then **Monthly payment** shows `Rs 10,000.00`.\n- **AC-1.5** Given a one-month loan (L-D: `100000`, `10`, `1` **Months**), when I Calculate, then **Monthly payment** shows `Rs 100,833.33`.\n- **AC-1.6** Given the smallest accepted values (L-MIN: `1000`, `0.01`, `1` **Months**), when I Calculate, then **Monthly payment** shows `Rs 1,000.01`.\n- **AC-1.7** Given the largest accepted values (L-MAX: `1000000000`, `50`, `40` **Years**), when I Calculate, then **Monthly payment** shows `Rs 41,666,666.80`.\n- **AC-1.8** Given the loan amount is typed with thousands separators, as `1,000,000` or in lakh style as `10,00,000`, when I Calculate with `12` and `1` **Years**, then the result is the same as AC-1.1.\n- **AC-1.9** Given values with leading or trailing spaces (`␣1000000␣`, `␣12␣`, `␣1␣`), when I Calculate, then the spaces are ignored and the result is the same as AC-1.1.\n- **AC-1.10** Given the rate is typed with a trailing percent sign (`12%`), when I Calculate with `1000000` and `1` **Years**, then the result is the same as AC-1.1.\n- **AC-1.11** Given I have just calculated L-A, when I Calculate again without changing anything, then the same results are shown again.\n- **AC-1.12** Given a first visit, when the page loads, then the tenure unit is **Years**, all three inputs are empty, and no results are shown.\n\n## S-2 Clear messages for invalid input\n**Role:** R-1 Prospective Borrower · **Serves:** J-1 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want to be told clearly what is wrong with what I typed, so that I can fix it and never act on a figure built from bad input.\"\n\nError messages appear directly below the field they refer to. While any error is shown, no results are shown.\n\n- **AC-2.1** Given an empty form, when I Calculate, then I see `Enter a loan amount.`, `Enter an interest rate.` and `Enter a loan tenure.` under the matching fields, no results are shown, and focus moves to **Loan amount**.\n- **AC-2.2** Given loan amount `abc` (rate `12`, tenure `1` **Years**), when I Calculate, then I see `Loan amount must be a number.` and no results.\n- **AC-2.3** Given loan amount `1e6`, when I Calculate, then I see `Loan amount must be a number.` (scientific notation is not accepted).\n- **AC-2.4** Given loan amount `0`, `-500` or `999.99` (each tried separately), when I Calculate, then I see `Loan amount must be between 1,000 and 1,000,000,000.`\n- **AC-2.5** Given loan amount `1000000000.01`, when I Calculate, then I see `Loan amount must be between 1,000 and 1,000,000,000.`; and given loan amount `1000000000`, no loan-amount message is shown.\n- **AC-2.6** Given loan amount `1000.555`, when I Calculate, then I see `Loan amount can have at most 2 decimal places.`\n- **AC-2.7** Given rate `-1` or `50.01`, when I Calculate, then I see `Interest rate must be between 0 and 50%.`; and given rate `0` or `50`, no rate message is shown.\n- **AC-2.8** Given rate `twelve`, when I Calculate, then I see `Interest rate must be a number.`; and given rate `12.345`, I see `Interest rate can have at most 2 decimal places.`\n- **AC-2.9** Given tenure `2.5` with unit **Years**, when I Calculate, then I see `Loan tenure must be a whole number.`\n- **AC-2.10** Given unit **Years** and tenure `0` or `41`, when I Calculate, then I see `Loan tenure must be between 1 and 40 years.`; given unit **Months** and tenure `0` or `481`, I see `Loan tenure must be between 1 and 480 months.`; and tenure `40` **Years** or `480` **Months** shows no tenure message.\n- **AC-2.11** Given an invalid loan amount and an invalid rate with a valid tenure, when I Calculate, then both messages are shown at the same time and focus moves to **Loan amount** (the first invalid field).\n- **AC-2.12** Given results for L-A are showing, when I change the loan amount to `abc` and Calculate, then the previous results and schedule are removed and only the error message is shown.\n- **AC-2.13** Given a message is showing under **Loan amount** and another under **Annual interest rate**, when I type in the **Loan amount** field, then the loan-amount message disappears and the rate message stays until the next Calculate.\n- **AC-2.14** Given any error is showing, when I correct the input to L-A values and Calculate, then the L-A results are shown and no error messages remain.\n- **AC-2.15** Given a loan amount of 40 nines (`9999999999999999999999999999999999999999`), when I Calculate, then I see `Loan amount must be between 1,000 and 1,000,000,000.` and the page stays responsive.\n- **AC-2.16** Given any invalid input in this story, when I Calculate, then the page never shows a blank screen or a browser error, and no uncaught error is raised in the browser console.\n\n## S-3 See total interest and total amount payable\n**Role:** R-1 Prospective Borrower · **Serves:** J-2 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want to see the total interest and the total I will repay, so that I can compare the true cost of different offers.\"\n\n- **AC-3.1** Given L-A, when I Calculate, then **Total interest** shows `Rs 66,185.45` and **Total amount payable** shows `Rs 1,066,185.45`.\n- **AC-3.2** Given L-B, when I Calculate, then **Total interest** shows `Rs 1,309,014.14` and **Total amount payable** shows `Rs 3,809,014.14`.\n- **AC-3.3** Given L-C (0%), when I Calculate, then **Total interest** shows `Rs 0.00` and **Total amount payable** shows `Rs 120,000.00`.\n- **AC-3.4** Given L-MIN, when I Calculate, then **Total interest** shows `Rs 0.01` and **Total amount payable** shows `Rs 1,000.01`.\n- **AC-3.5** Given L-MAX, when I Calculate, then **Total interest** shows `Rs 19,000,000,061.79` and **Total amount payable** shows `Rs 20,000,000,061.79`, in full, with no truncation, ellipsis or scientific notation.\n- **AC-3.6** Given any valid inputs, when I Calculate, then loan amount + **Total interest** equals **Total amount payable** exactly, **Total interest** equals the sum of the schedule's Interest column, and **Total amount payable** equals the sum of the Payment column. *(Verified by a property test over at least 1,000 random valid inputs plus all reference loans.)*\n\n## S-4 Results always match the inputs on screen\n**Role:** R-1 Prospective Borrower · **Serves:** J-1 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want results to disappear as soon as I change an input, so that I never mistake old figures for the loan I am now looking at.\"\n\n- **AC-4.1** Given results for L-A are showing, when I change the loan amount, the rate or the tenure value, then the results summary and the schedule are hidden and I see `Your inputs have changed. Select Calculate to see updated results.`\n- **AC-4.2** Given results for L-A are showing, when I change the tenure unit from **Years** to **Months**, then the behaviour is the same as AC-4.1, and the tenure field keeps the number `1` (it is not converted).\n- **AC-4.3** Given the message from AC-4.1 is showing, when I Calculate with valid inputs, then results for the new inputs are shown and the message disappears.\n- **AC-4.4** Given results are showing, when I change the currency or the theme, then the results stay visible (these settings do not change the calculation).\n\n## S-5 Use it comfortably on a phone\n**Role:** R-1 Prospective Borrower · **Serves:** J-11 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want the calculator to work well on my phone, so that I can check an offer wherever I am.\"\n\n- **AC-5.1** Given a viewport 360 px wide, when the page loads and after I calculate L-MAX (480 schedule rows), then the page never scrolls horizontally (document width ≤ viewport width).\n- **AC-5.2** Given a viewport 360 px wide, then every input, select and button is at least 44 × 44 CSS px and fully visible without zooming.\n- **AC-5.3** Given a viewport 360 px wide and L-A results, when I scroll the schedule, then the schedule scrolls inside its own area and its column headers stay visible while scrolling.\n- **AC-5.4** Given any device, then **Loan amount** and **Annual interest rate** have `inputmode=\"decimal\"` and **Loan tenure** has `inputmode=\"numeric\"`, so that phones show a number keypad.\n- **AC-5.5** Given a viewport 1280 px wide, then the form and the results sit side by side; given a viewport 768 px wide or narrower, they are stacked with the form above the results.\n- **AC-5.6** Given a viewport 360 px wide and L-MAX results, then every amount in the summary is fully visible (wrapping onto a new line is allowed; clipping is not).\n\n## S-6 Choose a light or dark display\n**Role:** R-1 Prospective Borrower · **Serves:** J-10 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want the app to match a light or dark display, so that I can read figures comfortably at any time of day.\"\n\n- **AC-6.1** Given no saved theme preference, when the page loads on a device set to dark mode, then the app uses the dark theme; on a device set to light mode, it uses the light theme.\n- **AC-6.2** Given the **Theme** control offers `System`, `Light` and `Dark`, when I choose `Dark` on a device set to light mode, then the app switches to the dark theme immediately (and likewise for `Light`).\n- **AC-6.3** Given I chose `Dark`, when I reload the page, then the dark theme is still used and `Dark` is still selected.\n- **AC-6.4** Given `System` is selected, when the device switches between light and dark mode while the page is open, then the app follows without a reload.\n- **AC-6.5** Given either theme, then body text and error text have a contrast ratio of at least 4.5:1 against their background. *(Checked against the theme colour tokens.)*\n- **AC-6.6** Given the browser blocks storage, when I change the theme, then it changes for the current visit and no error is shown.\n\n## S-7 Choose the currency amounts are shown in\n**Role:** R-1 Prospective Borrower · **Serves:** J-3 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Prospective Borrower, I want to see amounts in Pakistani rupees or US dollars, so that the figures read like the quote I was given.\"\n\n- **AC-7.1** Given a first visit, when the page loads, then **Currency** is `PKR (Rs)`, the loan amount label reads `Loan amount (Rs)`, and results for L-A show `Rs 88,848.79`.\n- **AC-7.2** Given L-A results in PKR, when I select `USD ($)`, then every amount in the summary shows the `$` symbol (e.g. `$88,848.79`), the schedule headers show `($)`, the loan amount label reads `Loan amount ($)`, the numbers themselves are unchanged (no conversion), and the results stay visible.\n- **AC-7.3** Given I selected `USD ($)`, when I reload the page, then `USD ($)` is still selected.\n- **AC-7.4** Given the currency control is visible, then the note `Changing currency changes the symbol only. Amounts are not converted.` is shown next to it.\n- **AC-7.5** Given a saved calculation made in PKR, when I switch to USD, then that saved entry still shows its amounts in `Rs`.\n\n## S-8 Work entirely from the keyboard\n**Role:** R-2 Loan Advisor · **Serves:** J-4 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Loan Advisor, I want to do everything from the keyboard, so that I can produce quotes quickly without reaching for the mouse.\"\n\n- **AC-8.1** Given the page has loaded, when I press Tab repeatedly, then focus moves in this order: **Theme** → **Currency** → **Loan amount** → **Annual interest rate** → **Loan tenure** → **Tenure unit** → **Calculate** → **Reset** → the schedule area (only when results are shown) → for each saved calculation, its **Restore** then its **Delete** → **Clear all** (only when enabled). Shift+Tab moves in reverse.\n- **AC-8.2** Given valid L-A values, when I press Enter while focus is in **Loan amount**, **Annual interest rate** or **Loan tenure**, then the app calculates exactly as if I had selected **Calculate**.\n- **AC-8.3** Given either theme, when any interactive element has keyboard focus, then a visible focus outline at least 2 px thick is shown around it.\n- **AC-8.4** Given L-B results (60 rows), when the schedule area has focus, then the Up/Down arrow keys and Page Up/Page Down scroll it.\n- **AC-8.5** Given the **Clear all** confirmation is open, then focus starts on **Cancel**, Tab and Shift+Tab stay within the dialog, Escape closes it without clearing and returns focus to **Clear all**, and pressing Enter on **Clear** clears the history.\n- **AC-8.6** Given only a keyboard, when I enter L-A, calculate, enter L-B, calculate, restore the L-A entry, delete the L-B entry and clear all history, then every step succeeds without a mouse. *(One end-to-end keyboard-only test.)*\n\n## S-9 Start a fresh quote in one step\n**Role:** R-2 Loan Advisor · **Serves:** J-4 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Loan Advisor, I want to clear the form in one step, so that I can start the next quote immediately.\"\n\n- **AC-9.1** Given inputs, results and/or error messages are showing, when I select **Reset**, then all three inputs are empty, the unit returns to **Years**, results, schedule, stale-results message and error messages are removed, and focus moves to **Loan amount**.\n- **AC-9.2** Given currency `USD ($)`, theme `Dark` and two saved calculations, when I select **Reset**, then currency, theme and saved calculations are unchanged.\n- **AC-9.3** Given an already empty form, when I select **Reset**, then the form stays empty and no error is shown.\n\n## S-10 See how each payment splits into interest and principal\n**Role:** R-2 Loan Advisor · **Serves:** J-5 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Loan Advisor, I want a month-by-month schedule showing interest and principal in each payment, so that I can explain exactly how the quote was reached.\"\n\n- **AC-10.1** Given L-A, when I Calculate, then a **Repayment schedule** table with 12 rows and the columns **Month**, **Payment (Rs)**, **Interest (Rs)**, **Principal (Rs)**, **Balance (Rs)** is shown.\n- **AC-10.2** Given L-A, then row 1 reads `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`.\n- **AC-10.3** Given L-A, then row 12 reads `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`.\n- **AC-10.4** Given any valid inputs, then in every row Payment = Interest + Principal exactly, and Interest = the opening balance × (annual rate ÷ 1,200), rounded half-up to 2 decimal places. The opening balance is the loan amount for row 1 and the previous row's Balance after that. *(Property test.)*\n- **AC-10.5** Given any valid inputs, then every row's Payment differs from the **Monthly payment** shown in the summary by at most 0.01. *(Property test.)*\n- **AC-10.6** Given L-A (where some payments are 88,848.78), then the note `Some payments differ by 0.01 because amounts are rounded to 2 decimal places.` is shown below the summary; given L-C (all payments 10,000.00), the note is not shown.\n- **AC-10.7** Given L-Z3 (`1000`, `0`, `3` **Months**), then the rows read `1 | 333.33 | 0.00 | 333.33 | 666.67`, `2 | 333.34 | 0.00 | 333.34 | 333.33`, `3 | 333.33 | 0.00 | 333.33 | 0.00`.\n- **AC-10.8** Given L-MAX, when I Calculate, then all 480 rows are shown and the results appear within 1 second of selecting Calculate on the CI test machine.\n\n## S-11 Recall earlier calculations\n**Role:** R-2 Loan Advisor · **Serves:** J-6 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Loan Advisor, I want my recent calculations kept on this device, so that I can bring back an earlier quote exactly without retyping it.\"\n\nSaved calculations are stored only in this browser on this device. They are never sent anywhere.\n\n- **AC-11.1** Given no saved calculations, then the **Saved calculations** area shows `No saved calculations yet.`\n- **AC-11.2** Given I calculate L-A successfully at 20:45 on 17 Oct 2026 in PKR, then an entry appears at the top of **Saved calculations** reading `Rs 1,000,000.00 at 12% for 1 year` / `Rs 88,848.79 per month` / `17 Oct 2026, 20:45`.\n- **AC-11.3** Given a Calculate that shows error messages, then no entry is saved.\n- **AC-11.4** Given I calculate L-A and then L-B, then L-B is listed first and L-A second.\n- **AC-11.5** Given the newest entry is L-A in PKR, when I calculate L-A again in PKR, then no new entry is added. Given the entries are L-B (newest) and L-A, when I calculate L-A again, then a new L-A entry is added at the top and the older one stays.\n- **AC-11.6** Given 20 saved entries, when I make a 21st different calculation, then the new entry is added at the top, the oldest is removed, and 20 entries remain.\n- **AC-11.7** Given saved entries, when I reload the page, then the same entries are shown in the same order.\n- **AC-11.8** Given the form shows different values and a saved L-B entry made in PKR while the current currency is USD, when I select **Restore** on that entry, then the inputs show `2500000`, `18`, `5` with **Years**, the currency switches to `PKR (Rs)`, the L-B results and schedule are shown, and no new entry is added.\n- **AC-11.9** Given the browser blocks storage, when I calculate, then the results are shown normally and the **Saved calculations** area shows `Saved calculations aren't available in this browser. Calculations still work.`\n- **AC-11.10** Given the stored history data is corrupted (not valid JSON, or the wrong shape), when the page loads, then it shows `No saved calculations yet.` without any error, and the next successful calculation is saved normally.\n- **AC-11.11** Tenure is described in entries as `1 year`, `N years`, `1 month` or `N months`, and the rate with no trailing zeros (`12%`, `21.5%`, `0.01%`).\n\n## S-12 Delete saved calculations\n**Role:** R-2 Loan Advisor · **Serves:** J-7 · **Scope:** v1 · **Status:** Not implemented\n\n\"As a Loan Advisor, I want to delete one saved calculation or all of them, so that the next customer cannot see the previous customer's figures.\"\n\n- **AC-12.1** Given entries L-B and L-A, when I select **Delete** on L-B, then L-B disappears from the list and stays gone after a reload, L-A is unchanged, and focus moves to the **Restore** button of the next entry (or the previous entry if it was last, or the **Saved calculations** heading if the list is now empty).\n- **AC-12.2** Given at least one entry, when I select **Clear all**, then a confirmation dialog shows `Clear all saved calculations? This can't be undone.` with the buttons **Cancel** and **Clear**.\n- **AC-12.3** Given the confirmation is open, when I select **Cancel** or press Escape, then nothing is deleted.\n- **AC-12.4** Given the confirmation is open, when I select **Clear**, then the list shows `No saved calculations yet.`, the stored history is removed from the browser, and after a reload the list is still empty.\n- **AC-12.5** Given no saved entries, then **Clear all** is disabled.\n- **AC-12.6** Given results are showing, when I clear all history, then the current inputs and results stay on screen (clearing the form is **Reset**'s job, S-9).\n\n## S-13 See the balance remaining after each payment\n**Role:** R-3 Existing Borrower · **Serves:** J-8 · **Scope:** v1 · **Status:** Not implemented\n\n\"As an Existing Borrower, I want to see what I still owe after each payment, so that I can plan an early repayment or a refinance.\"\n\n- **AC-13.1** Given L-A, then the Balance after month 6 is `514,921.05` and after month 12 is `0.00`.\n- **AC-13.2** Given L-B entered as `5` **Years**, then the schedule has exactly 60 rows and the Balance after month 60 is `0.00`.\n- **AC-13.3** Given any valid inputs, then the schedule has exactly as many rows as the tenure in months, every Balance equals the previous Balance minus that row's Principal, no Balance is negative, and the final Balance is exactly `0.00`. *(Property test.)*\n\n---\n\n# Backlog stories (not being built in v1)\n\nThese are recorded to show what we would build next. They are honestly marked **Not implemented**.\n\n## S-14 Compare two loan offers side by side\n**Role:** R-1 · **Serves:** J-2 · **Scope:** Backlog · **Status:** Not implemented\n\"As a Prospective Borrower, I want to compare two offers side by side, so that I can see which one costs less overall.\"\n- **AC-14.1** Given offer 1 = L-A and offer 2 = `1000000`, `10`, `2` **Years**, when I compare, then both monthly payments and total interest amounts are shown side by side, and the offer with the lower total interest is highlighted.\n\n## S-15 Find the largest loan a monthly budget allows\n**Role:** R-1 · **Serves:** J-1 · **Scope:** Backlog · **Status:** Not implemented\n\"As a Prospective Borrower, I want to enter the monthly amount I can afford, so that I know the largest loan I could take.\"\n- **AC-15.1** Given a budget of `88848.79`, rate `12` and tenure `1` **Years**, when I calculate, then the maximum loan amount shown is within 1.00 of `1,000,000.00`.\n\n## S-16 Copy a quote summary to share\n**Role:** R-2 · **Serves:** J-4 · **Scope:** Backlog · **Status:** Not implemented\n\"As a Loan Advisor, I want to copy a plain-text quote summary, so that I can paste it into a message to the customer.\"\n- **AC-16.1** Given L-A results, when I select **Copy summary**, then the clipboard contains the loan amount, rate, tenure, monthly payment, total interest and total amount payable as plain text.\n\n## S-17 Export or print the repayment schedule\n**Role:** R-2 · **Serves:** J-5 · **Scope:** Backlog · **Status:** Not implemented\n\"As a Loan Advisor, I want to download or print the schedule, so that I can give the customer a copy.\"\n- **AC-17.1** Given L-A results, when I select **Download CSV**, then a CSV with a header row and 12 data rows matching the on-screen schedule is downloaded.\n\n## S-18 See the effect of an extra one-off repayment\n**Role:** R-3 · **Serves:** J-8 · **Scope:** Backlog · **Status:** Not implemented\n\"As an Existing Borrower, I want to see how an extra payment would shorten my loan or reduce my interest, so that I can decide whether to make it.\"\n- **AC-18.1** Given L-B and an extra payment of `500000` after month 12 that keeps the monthly payment the same, then the new payoff month and the interest saved are shown.\n\n## S-19 See interest versus principal for each year\n**Role:** R-3 · **Serves:** J-9 · **Scope:** Backlog · **Status:** Not implemented\n\"As an Existing Borrower, I want a yearly summary of interest versus principal paid, so that I can see how much of my money went to interest each year.\"\n- **AC-19.1** Given L-B, when I view the yearly summary, then 5 rows are shown, and each row's interest and principal equal the sums of the matching 12 monthly rows.\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/docs/user-stories.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>TaskUpdate</code> — </summary>

```json
{
  "taskId": "1",
  "status": "completed"
}
```

</details>

<details><summary>Tool result</summary>

```
Updated task #1 status
```

</details>

<details><summary>🔧 Tool call: <code>TaskUpdate</code> — </summary>

```json
{
  "taskId": "2",
  "status": "in_progress"
}
```

</details>

<details><summary>Tool result</summary>

```
Updated task #2 status
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/docs/spec/technical-spec.md</summary>

````json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/docs/spec/technical-spec.md",
  "content": "# Technical Specification: Loan EMI Calculator (v1)\n\n**Status:** Draft for human approval (Gate G1)\n**Sources of truth, in priority order:**\n1. `docs/user-stories.md` (acceptance criteria)\n2. this document\n3. `docs/spec/decision-log.md`\n\nIf two sources conflict, **stop and ask the human**. Never resolve a conflict silently.\n\n---\n\n## 1. Purpose and scope\n\nA single-page, client-only web app that calculates the equal monthly instalment (EMI) of a reducing-balance loan, its total interest and total payable, and a month-by-month schedule. It also supports PKR/USD display, light/dark themes, history saved in the browser, full keyboard use and phone layouts.\n\n**There is no backend.** The app makes no network requests after the static files load: no API calls, analytics, cookies or fonts from third-party servers.\n\n**v1 scope:** stories S-1 to S-13. **Not in v1:** S-14 to S-19, and everything in §16.\n\n## 2. Technology stack\n\n| Concern | Choice | Notes |\n|---|---|---|\n| Runtime for tooling | Node.js 24 LTS | Pinned in `.nvmrc` and `package.json` `engines`. Verify it is still an LTS line at scaffold time; if not, use the current Active LTS and record it in the decision log. |\n| Package manager | npm | `package-lock.json` committed; CI uses `npm ci`. |\n| UI | React (latest stable) + TypeScript (latest stable, `strict: true`) | Function components and hooks only. |\n| Build/dev server | Vite (latest stable) | Static output in `dist/`. |\n| Decimal maths | `decimal.js` | **All money and rate arithmetic.** JS `number` must never hold a money value or be used in a calculation. |\n| Unit/component tests | Vitest + @testing-library/react + @testing-library/user-event + jsdom | |\n| Property tests | `fast-check` | For invariants in §5.4. |\n| End-to-end tests | `@playwright/test` | Chromium, Firefox, WebKit. Edge is Chromium-based and is covered by the Chromium project; Safari by WebKit. |\n| Lint/format | ESLint (flat config, typescript-eslint, eslint-plugin-react-hooks, eslint-plugin-jsx-a11y) + Prettier | |\n| Styling | Plain CSS with custom properties (one global stylesheet plus per-component CSS files) | No CSS framework, no UI library. |\n| State | React `useReducer` + context | No state library, no router. |\n| CI/CD | GitHub Actions | |\n| Hosting | GitHub Pages | Free; static. |\n\nUse exact versions installed at scaffold time (no `^latest` tags in docs), and list them in the README. **Do not add any dependency not listed here without asking the human.**\n\n## 3. Architecture\n\n### 3.1 Layers\n\n```\nsrc/\n  domain/          Pure TypeScript. No React, no DOM, no storage. 100% unit-tested.\n    money.ts         Decimal setup, round2(), money/number formatting\n    parse.ts         Raw string → normalised value (trim, commas, %)\n    validate.ts      Field rules → typed result or error codes\n    loan.ts          EMI + schedule algorithm (§5)\n    format.ts        Rate, tenure and date text for history entries\n    types.ts\n  storage/         Browser storage adapters. Never throw to callers.\n    safeStorage.ts   Availability check plus get/set/remove wrapped in try/catch\n    history.ts       Load/validate/save history (§9)\n    settings.ts      Currency + theme preferences (§9)\n  ui/\n    App.tsx, appReducer.ts, AppContext.tsx\n    components/      Header, ThemeSelect, LoanForm, CurrencySelect, ResultsPanel,\n                     ResultsSummary, RoundingNote, ScheduleTable, HistoryPanel,\n                     HistoryEntry, ConfirmDialog, ErrorBoundary\n    copy.ts          Every user-visible string (§7). Components never hard-code text.\n    theme.css, app.css\n  main.tsx\ne2e/               Playwright specs\nscripts/trace.mjs  Traceability checker (§12.5)\n```\n\n**Rule:** `domain/` must not import from `ui/` or `storage/`, and `storage/` must not import from `ui/`. Enforce this with an ESLint `no-restricted-imports` rule.\n\n### 3.2 Application state (reducer)\n\n```\ninputs:   { amount: string, rate: string, tenure: string, unit: 'years' | 'months' }   // raw text as typed\nerrors:   Partial<Record<'amount' | 'rate' | 'tenure', ErrorCode>>\nresults:  { status: 'idle' }\n        | { status: 'shown', loan: CalculatedLoan }\n        | { status: 'stale' }\nsettings: { currency: 'PKR' | 'USD', theme: 'system' | 'light' | 'dark' }\nhistory:  { available: boolean, entries: HistoryEntry[] }\n```\n\nTransitions:\n\n| Event | Effect |\n|---|---|\n| Edit any input or change unit | Update `inputs`. Clear **only that field's** error. If `results.status === 'shown'`, set it to `stale`. |\n| Calculate with any invalid field | Set all field errors, set `results` to `idle` (removes old results), focus the first invalid field in order amount → rate → tenure. |\n| Calculate with all fields valid | Clear errors, compute, set `results` to `shown`, add a history entry (§9.3). |\n| Reset | Empty inputs, unit = `years`, clear errors, set `results` to `idle`, focus **Loan amount**. Settings and history are untouched. |\n| Change currency or theme | Update settings and persist. Results status is unchanged. |\n| Restore entry | Set inputs from the entry (canonical strings, §9.2) and currency from the entry, recompute (do not trust stored figures), set `results` to `shown`. No new history entry. |\n\n## 4. Input parsing and validation\n\nInputs are `<input type=\"text\">`, **not** `type=\"number\"`. `type=\"number\"` behaves differently across browsers: Firefox accepts letters, `value` becomes `\"\"` for invalid text so errors can't be diagnosed, and the mouse wheel changes values. Add `inputmode` per AC-5.4 and `autocomplete=\"off\"`.\n\n### 4.1 Normalisation (before validation)\n\n| Field | Steps |\n|---|---|\n| Loan amount | Trim whitespace, then remove **all** `,` characters (accepts `1,000,000` and lakh-style `10,00,000`). |\n| Interest rate | Trim, remove **one** trailing `%`, trim again. |\n| Loan tenure | Trim. |\n\n### 4.2 Rules (checked in this order, stopping at the first failure per field)\n\nNumber pattern: `^-?(\\d+(\\.\\d*)?|\\.\\d+)$`. It rejects `1e6`, `+5`, `1.2.3`, `abc` and the empty string. \"Decimal places\" means the count of digits after `.`, so `5.` has 0. **All comparisons use `Decimal`**, never `Number`, so 40-digit inputs compare correctly.\n\n| Field | 1. Empty | 2. Format | 3. Precision | 4. Range |\n|---|---|---|---|---|\n| Loan amount | `AMOUNT_REQUIRED` | not a number → `AMOUNT_NAN` | more than 2 dp → `AMOUNT_DECIMALS` | outside 1,000 to 1,000,000,000 inclusive → `AMOUNT_RANGE` |\n| Interest rate | `RATE_REQUIRED` | → `RATE_NAN` | more than 2 dp → `RATE_DECIMALS` | outside 0 to 50 inclusive → `RATE_RANGE` |\n| Loan tenure | `TENURE_REQUIRED` | not `^-?\\d+$` → `TENURE_WHOLE` (also covers `abc` and `2.5`) | n/a | Years: outside 1 to 40 → `TENURE_RANGE_YEARS`; Months: outside 1 to 480 → `TENURE_RANGE_MONTHS` |\n\nA negative number passes the format check and fails on range, so `-500` gets the range message (AC-2.4).\n\n### 4.3 Derived values\n\n- `P` = loan amount as `Decimal`\n- `n` = tenure × 12 when the unit is years, otherwise the tenure (an integer from 1 to 480)\n- `annualRate` = `Decimal`\n- `r = annualRate / 1200` (monthly rate as a fraction, kept exact)\n\n## 5. Calculation algorithm (normative)\n\nConfigure `Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP })`. `round2(x)` = `x.toDecimalPlaces(2, Decimal.ROUND_HALF_UP)`.\n\n### 5.1 EMI function\n\n```\nEMI(B, r, m) = B / m                                if r = 0\n             = B × r × (1 + r)^m / ((1 + r)^m − 1)  otherwise\n```\n\n### 5.2 Schedule (re-amortising, cent-accurate)\n\n```\nbalance ← P\nfor k = 1 … n:\n    interest_k ← round2(balance × r)\n    if k < n:\n        payment_k   ← round2(EMI(balance, r, n − k + 1))\n        principal_k ← payment_k − interest_k\n    else:\n        principal_k ← balance\n        payment_k   ← principal_k + interest_k\n    balance ← balance − principal_k\n    row_k ← { month: k, payment_k, interest_k, principal_k, balance }\n```\n\nOutputs:\n- **Monthly payment** (headline) = `payment_1` (the standard EMI rounded to 2 dp)\n- **Total interest** = Σ interest_k\n- **Total amount payable** = Σ payment_k\n- **Rounding note shown** = true if any payment_k ≠ payment_1\n\n### 5.3 Why this method (do not \"simplify\" it)\n\nThe common textbook method fixes the payment at `round2(EMI)` for every month and lets the last month absorb the difference. But the half-cent rounding error compounds at the loan rate. Within our accepted input range this produces wrong-looking results, for example:\n- Rs 10,000 at 36% for 359 months: the loan is paid off **7 months early** (month 352).\n- Rs 10,000.82 at 30% for 360 months: the fixed instalment is 250.05 but the final instalment is **1,767.73**.\n\nRe-computing the instalment from the remaining balance each month stops the error compounding. We verified over the whole input range (exact decimal simulation, about 1,700 cases including every boundary corner) that it ends at exactly 0.00, never ends early, never produces a negative principal, and that **every payment is within 0.01 of the headline payment**. Every row stays verifiable by hand: interest = opening balance × r, rounded, and principal = payment − interest.\n\n### 5.4 Invariants (property-tested with fast-check over the full valid input domain)\n\nFor every valid (P, rate, n):\n1. Number of rows = n.\n2. For every row: `payment = interest + principal` exactly.\n3. For every row: `interest = round2(opening × r)`, where opening is P for row 1 and the previous row's balance after that.\n4. For every row: `0 ≤ principal ≤ opening` and `balance ≥ 0`.\n5. Final balance = 0.00 exactly. Σ principal = P exactly.\n6. For every row: `|payment − payment_1| ≤ 0.01`.\n7. Total amount payable = P + total interest, exactly.\n8. Results are identical when the same tenure is entered as years or as the equivalent number of months.\n\nIf a property test finds a counterexample: **stop, record it, and report it to the human.** Do not change the algorithm or loosen an invariant without approval.\n\n### 5.5 Reference values (must be reproduced exactly)\n\nUse the reference loans table in `docs/user-stories.md`, plus these schedule rows:\n- L-A row 1: `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`\n- L-A row 6 balance: `514,921.05`\n- L-A row 12: `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`\n- L-A payments equal 88,848.78 in rows 9, 10 and 12, and 88,848.79 in all other rows\n- L-Z3 rows: `333.33/0.00/333.33/666.67`, `333.34/0.00/333.34/333.33`, `333.33/0.00/333.33/0.00`\n\n## 6. Formatting\n\nCustom, deterministic formatters. **Do not use `Intl.NumberFormat` or `toLocaleString` for money or dates**, because their output differs between browsers and OS locales.\n\n| What | Rule | Examples |\n|---|---|---|\n| Money (summary, history) | symbol + integer part grouped in 3s with `,` + `.` + exactly 2 decimals. PKR symbol `Rs ` (with a trailing space); USD symbol `$` (no space). | `Rs 88,848.79`, `$1,000,000.00`, `Rs 0.00`, `Rs 20,000,000,061.79` |\n| Money (schedule cells) | Same, without the symbol | `921,151.21` |\n| Rate (history) | Normalised decimal, no trailing zeros, then `%` | `12%`, `21.5%`, `0.01%`, `0%` |\n| Tenure (history) | Unit as entered: `1 year`, `N years`, `1 month`, `N months` | `5 years`, `12 months` |\n| Canonical input (restore) | Amount and rate as a normalised decimal without grouping or trailing zeros; tenure as an integer | `2500000`, `18`, `1500.5` |\n| Date-time (history) | Local time `D Mon YYYY, HH:mm`, 24-hour clock, English 3-letter months | `17 Oct 2026, 20:45`, `5 Jan 2027, 09:05` |\n\n## 7. Copy deck (all user-visible text; keep in `ui/copy.ts`)\n\n| Key | Text |\n|---|---|\n| app.title | `Loan EMI Calculator` |\n| app.tagline | `Work out the monthly payment, total cost and repayment schedule of a loan.` |\n| theme.label | `Theme` (options `System`, `Light`, `Dark`) |\n| currency.label | `Currency` (options `PKR (Rs)`, `USD ($)`) |\n| currency.note | `Changing currency changes the symbol only. Amounts are not converted.` |\n| field.amount | `Loan amount (Rs)` / `Loan amount ($)` |\n| field.rate | `Annual interest rate (%)` |\n| field.tenure | `Loan tenure` |\n| field.unit | `Tenure unit` (options `Years`, `Months`) |\n| btn.calculate | `Calculate` |\n| btn.reset | `Reset` |\n| results.idle | `Enter your loan details and select Calculate.` |\n| results.stale | `Your inputs have changed. Select Calculate to see updated results.` |\n| summary.monthly | `Monthly payment` |\n| summary.interest | `Total interest` |\n| summary.total | `Total amount payable` |\n| note.rounding | `Some payments differ by 0.01 because amounts are rounded to 2 decimal places.` |\n| schedule.title | `Repayment schedule` |\n| schedule.cols | `Month`, `Payment (Rs)`, `Interest (Rs)`, `Principal (Rs)`, `Balance (Rs)` (`($)` for USD) |\n| history.title | `Saved calculations` |\n| history.empty | `No saved calculations yet.` |\n| history.unavailable | `Saved calculations aren't available in this browser. Calculations still work.` |\n| history.entry.line1 | `{amount} at {rate} for {tenure}` |\n| history.entry.line2 | `{monthly} per month` |\n| history.restore | `Restore` (accessible name: `Restore calculation from {datetime}`) |\n| history.delete | `Delete` (accessible name: `Delete calculation from {datetime}`) |\n| history.clearAll | `Clear all` |\n| dialog.clear.text | `Clear all saved calculations? This can't be undone.` |\n| dialog.cancel / dialog.confirm | `Cancel` / `Clear` |\n| err.AMOUNT_REQUIRED | `Enter a loan amount.` |\n| err.AMOUNT_NAN | `Loan amount must be a number.` |\n| err.AMOUNT_DECIMALS | `Loan amount can have at most 2 decimal places.` |\n| err.AMOUNT_RANGE | `Loan amount must be between 1,000 and 1,000,000,000.` |\n| err.RATE_REQUIRED | `Enter an interest rate.` |\n| err.RATE_NAN | `Interest rate must be a number.` |\n| err.RATE_DECIMALS | `Interest rate can have at most 2 decimal places.` |\n| err.RATE_RANGE | `Interest rate must be between 0 and 50%.` |\n| err.TENURE_REQUIRED | `Enter a loan tenure.` |\n| err.TENURE_WHOLE | `Loan tenure must be a whole number.` |\n| err.TENURE_RANGE_YEARS | `Loan tenure must be between 1 and 40 years.` |\n| err.TENURE_RANGE_MONTHS | `Loan tenure must be between 1 and 480 months.` |\n| fatal | `Something went wrong. Please reload the page.` |\n\nThe apostrophes in `can't` and `aren't` are the ASCII `'` character.\n\n## 8. UI behaviour\n\n### 8.1 Layout (DOM order = visual order = tab order)\n\n1. **Header:** title, tagline, **Theme** select (right-aligned on wide screens).\n2. **Form card:** **Currency** select and its note, **Loan amount**, **Annual interest rate**, **Loan tenure** + **Tenure unit**, then **Calculate** (primary) and **Reset** (secondary). It is a `<form noValidate>`, so Enter submits.\n3. **Results card:** idle text, or the stale message, or the summary (Monthly payment shown prominently, Total interest, Total amount payable), the rounding note when applicable, and the **Repayment schedule**.\n4. **Saved calculations card:** heading (`tabindex=\"-1\"` so focus can move there), the list or the empty/unavailable text, and **Clear all**.\n\nBreakpoints: **≥ 769 px**: the form and results cards side by side (form roughly 40%, results roughly 60%) with Saved calculations full-width below; max content width 1200 px. **≤ 768 px**: a single column in DOM order. Never allow horizontal page scroll at any width ≥ 360 px. Long amounts wrap (`overflow-wrap: anywhere`) rather than overflow.\n\n### 8.2 Schedule table\n\nA semantic `<table>` with `<thead>` and `<th scope=\"col\">`, inside a wrapper with `role=\"region\"`, `aria-label=\"Repayment schedule\"`, `tabindex=\"0\"`, `overflow: auto` and `max-height: min(60vh, 480px)`. The header row is sticky. Number cells are right-aligned with `font-variant-numeric: tabular-nums`. On narrow screens the wrapper scrolls horizontally if needed; the page does not.\n\n### 8.3 Errors and focus\n\n- Each error renders in an element with an id. The input gets `aria-invalid=\"true\"` and `aria-describedby` pointing to it, and the error text sits in an `aria-live=\"polite\"` container.\n- On a failed Calculate, focus moves to the first invalid field. On Reset, focus moves to **Loan amount**. On Delete, focus moves per AC-12.1. On Restore, focus stays on the Restore button.\n- **Confirm dialog:** native `<dialog>` opened with `showModal()`, with `autofocus` on **Cancel**. Escape (the `cancel` event) closes it without action and returns focus to **Clear all**.\n\n### 8.4 Theme\n\nResolved theme = the user's choice, or `prefers-color-scheme` when set to `system`. Apply it as `data-theme=\"light|dark\"` on `<html>`. A tiny inline script in `index.html` applies the saved theme before first paint (wrapped in try/catch) so there is no flash of the wrong theme. Listen for `matchMedia('(prefers-color-scheme: dark)')` changes while `system` is selected.\n\nStarting tokens (tests must prove ≥ 4.5:1 for text pairs):\n\n| Token | Light | Dark |\n|---|---|---|\n| --bg | #FFFFFF | #0F141B |\n| --surface | #F5F7FA | #18202B |\n| --text | #1A1F2B | #E7ECF3 |\n| --text-muted | #4A5568 | #A9B4C2 |\n| --primary (button bg) / --on-primary | #1D4ED8 / #FFFFFF | #7AA2FF / #0F141B |\n| --error | #B42318 | #FF8A80 |\n| --border | #CBD2DC | #2E3A4A |\n| --focus (2px outline, 2px offset) | #1D4ED8 | #7AA2FF |\n\nTap targets are at least 44 × 44 px. Body font is the system font stack (no web-font downloads).\n\n## 9. Persistence\n\n### 9.1 Safe storage\n\n`safeStorage` checks availability once at start-up (set and remove a probe key inside try/catch). Every read and write is wrapped. Failures return `{ ok: false }` and are never thrown to the UI. If storage is unavailable: settings work in memory for the visit (AC-6.6), and history shows `history.unavailable` (AC-11.9).\n\n### 9.2 Keys and schemas (version 1)\n\n- `emi-calc.v1.settings` → `{ \"currency\": \"PKR\" | \"USD\", \"theme\": \"system\" | \"light\" | \"dark\" }`. Defaults: `PKR`, `system`.\n- `emi-calc.v1.history` → array (newest first, at most 20) of:\n\n```json\n{\n  \"id\": \"string (crypto.randomUUID, or a timestamp-plus-counter fallback)\",\n  \"createdAt\": \"ISO-8601 string\",\n  \"currency\": \"PKR\",\n  \"input\": { \"amount\": \"1000000\", \"rate\": \"12\", \"tenure\": 1, \"unit\": \"years\" },\n  \"monthlyPayment\": \"88848.79\"\n}\n```\n\nOnly these fields are stored, never the schedule. On load, validate each element with a type guard. **If the value is not valid JSON or not an array, treat the history as empty.** Invalid elements are dropped. Nothing throws (AC-11.10).\n\n### 9.3 Saving rules\n\n- Save only after a successful calculation.\n- Skip the save if the newest entry has the same canonical `input` **and** `currency` (AC-11.5).\n- Insert at index 0 and truncate to 20 (AC-11.6).\n- If the write fails (for example, quota exceeded), switch to the unavailable state for the rest of the visit.\n- **Clear all** removes the key entirely (AC-12.4).\n\n## 10. Error handling\n\n- No error may reach the user as a blank screen. Wrap `<App>` in an `ErrorBoundary` that renders the `fatal` message.\n- The domain layer returns typed results for invalid input and never throws on user input.\n- E2E tests attach `page.on('pageerror')` and `page.on('console', type === 'error')` listeners **globally** (via a fixture) and fail if either fires (AC-2.16).\n\n## 11. Non-functional requirements\n\n| ID | Requirement |\n|---|---|\n| NFR-1 | Works in the current stable Chrome, Edge, Firefox and Safari (CI runs Chromium, Firefox and WebKit). |\n| NFR-2 | A fresh clone runs with `npm ci && npm run dev` on Node 24. No accounts, keys or services. |\n| NFR-3 | No network requests after initial load (asserted in one E2E test via request interception). |\n| NFR-4 | Calculate-to-rendered under 1 s for L-MAX on CI (AC-10.8). |\n| NFR-5 | Production JS bundle under 150 KB gzipped (checked in `verify`). |\n| NFR-6 | No `any` types, no `@ts-ignore`, and no ESLint warnings in committed code. |\n| NFR-7 | Data stays in the browser. No cookies. |\n\n## 12. Testing strategy\n\n### 12.1 Layers\n\n| Layer | Tool | Covers |\n|---|---|---|\n| Domain unit | Vitest | parse, validate (every message and boundary), EMI, schedule, formatting. All reference values. |\n| Property | Vitest + fast-check | Invariants in §5.4 (at least 1,000 runs each, fixed seed recorded in test output). |\n| Component | Vitest + Testing Library | Reducer transitions, focus rules, stale state, history panel states, storage-failure states (mocked). |\n| E2E | Playwright (Chromium, Firefox, WebKit) | Every UI-observable AC, run against `vite preview` of the production build. Viewports set per test (360×740, 768×1024, 1280×800). Dark mode via `colorScheme`. Time fixed via Playwright's clock API (AC-11.2). |\n| Smoke (deployed) | Playwright, tag `@smoke` | AC-1.1, AC-2.1, AC-7.2 and AC-11.2 against the live GitHub Pages URL. |\n\n### 12.2 Naming\n\nEvery test that proves an acceptance criterion has a title starting `[AC-x.y]`. One test may prove several criteria (`[AC-3.1][AC-10.2] ...`). Tests that prove spec rules only use `[SPEC-§n]`.\n\n### 12.3 Test independence\n\n- Tests must not depend on order.\n- E2E tests start from a clean `localStorage` unless the test is about persistence.\n- To simulate blocked storage, stub `Storage.prototype` methods to throw (`addInitScript`).\n\n### 12.4 Tests are the contract\n\nAfter Gate G3 (tests approved), the developer must not change test files. If a test looks wrong, stop and raise it with the human, who decides. The reviewer checks `git log -p -- e2e/ 'src/**/*.test.*'` for changes made after G3.\n\n### 12.5 Traceability script (`npm run trace`)\n\n`scripts/trace.mjs` (Node, no dependencies):\n1. Parses `app-roles.md` (R-ids), `jobs-to-be-done.md` (J-ids and their role) and `user-stories.md` (S-ids with role, job, scope and status, plus AC-ids).\n2. Fails if a story references an unknown role or job, a job references an unknown role, or a job has no story.\n3. Scans `src/**/*.test.ts(x)` and `e2e/**/*.spec.ts` for `[AC-x.y]` tags. It fails if any **v1** AC has no test or if a test references an unknown AC. It warns if a Backlog AC has a test.\n4. With `--results`, it reads `reports/vitest.json` and `reports/playwright.json` (JSON reporters) and fails if any story marked `Implemented` has an AC whose tests did not all pass in all three browsers.\n5. Prints a table: story, ACs, tests, pass/fail.\n\n## 13. npm scripts\n\n| Script | Does |\n|---|---|\n| `dev` | Vite dev server |\n| `build` | `tsc -b && vite build` |\n| `preview` | Serve `dist/` on port 4173 |\n| `lint` / `format:check` / `typecheck` | ESLint / Prettier check / `tsc --noEmit` |\n| `test` | Vitest run, writes `reports/vitest.json` |\n| `test:e2e` | Playwright (builds and serves via `webServer`), writes `reports/playwright.json` |\n| `trace` | §12.5 |\n| `size` | Fails if the gzipped JS exceeds 150 KB |\n| **`verify`** | `lint && format:check && typecheck && test && build && size && test:e2e && trace`. **This is the loop's exit condition.** |\n\n## 14. CI/CD and deployment\n\n- `.github/workflows/ci.yml`: on push and pull request, run Node from `.nvmrc`, `npm ci`, `npx playwright install --with-deps`, then `npm run verify`. Upload the reports as artifacts.\n- `.github/workflows/deploy.yml`: on push to `main`, after `verify` passes, build with `BASE_PATH=/<repo-name>/`, then `actions/upload-pages-artifact` and `actions/deploy-pages`. A follow-up job runs the `@smoke` tests against `https://<user>.github.io/<repo-name>/`.\n- `vite.config.ts`: `base: process.env.BASE_PATH ?? '/'`, so local dev and preview use `/`.\n- Repository Settings → Pages → Source: **GitHub Actions** (a manual step for the human, listed in the README).\n\n## 15. Definition of done (per story)\n\n1. Every AC has at least one `[AC-x.y]` test, and all pass in Chromium, Firefox and WebKit.\n2. `npm run verify` exits 0.\n3. The reviewer subagent reports no blocking findings for the story.\n4. The human has checked each AC by hand in the running app (checklist in `docs/process/loop-plan.md`).\n5. Only then is the story's status changed to `Implemented`, by the human or with their explicit approval.\n\n## 16. Out of scope (v1), stated as assumptions in the README\n\n- Payment frequencies other than monthly; flat-rate loans; variable rates.\n- Fees, insurance, taxes, processing charges and grace periods.\n- Calendar dates for payments (rows are numbered by month).\n- Currency conversion (the symbol only changes).\n- Accounts, sync across devices, server storage.\n- Languages other than English; right-to-left layouts.\n- Printing/exporting, copying, comparing offers, prepayments, yearly summaries (backlog stories S-14 to S-19).\n- Offline/PWA installation.\n"
}
````

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/docs/spec/technical-spec.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Check colour token contrast ratios</summary>

```json
{
  "command": "python3 - << 'EOF'\ndef L(h):\n    h=h.lstrip('#'); c=[int(h[i:i+2],16)/255 for i in (0,2,4)]\n    c=[x/12.92 if x<=0.03928 else ((x+0.055)/1.055)**2.4 for x in c]\n    return 0.2126*c[0]+0.7152*c[1]+0.0722*c[2]\ndef cr(a,b):\n    a,b=L(a),L(b); return (max(a,b)+0.05)/(min(a,b)+0.05)\npairs={'light':[('#1A1F2B','#FFFFFF'),('#1A1F2B','#F5F7FA'),('#4A5568','#F5F7FA'),('#B42318','#FFFFFF'),('#B42318','#F5F7FA'),('#FFFFFF','#1D4ED8')],\n'dark':[('#E7ECF3','#0F141B'),('#E7ECF3','#18202B'),('#A9B4C2','#18202B'),('#FF8A80','#0F141B'),('#FF8A80','#18202B'),('#0F141B','#7AA2FF')]}\nfor k,v in pairs.items():\n    for a,b in v: print(k,a,b,round(cr(a,b),2))\nEOF",
  "description": "Check colour token contrast ratios"
}
```

</details>

<details><summary>Tool result</summary>

```
light #1A1F2B #FFFFFF 16.47
light #1A1F2B #F5F7FA 15.35
light #4A5568 #F5F7FA 7.01
light #B42318 #FFFFFF 6.57
light #B42318 #F5F7FA 6.13
light #FFFFFF #1D4ED8 6.7
dark #E7ECF3 #0F141B 15.57
dark #E7ECF3 #18202B 13.82
dark #A9B4C2 #18202B 7.81
dark #FF8A80 #0F141B 8.1
dark #FF8A80 #18202B 7.18
dark #0F141B #7AA2FF 7.43
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/docs/spec/decision-log.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/docs/spec/decision-log.md",
  "content": "# Decision Log\n\n**Owner:** Muhammad Arslan (human product owner). **Drafted with:** Claude (claude.ai, Opus 5.5).\n\nEach decision is **Approved** or **Proposed — needs owner approval**. Claude Code must treat Proposed items as open questions and must not build on them until they are approved (Gate G1).\n\n| ID | Decision | Status |\n|---|---|---|\n| D-00 | Calculator type: loan / EMI calculator | Approved (owner) |\n| D-00a | Several roles, chosen from the use case | Approved (owner) |\n| D-00b | UI framework: React + TypeScript + Vite | Approved (owner) |\n| D-00c | Hosting: GitHub Pages; submission as a public GitHub repo | Approved (owner) |\n| D-00d | Human-gated loops, not fully autonomous | Approved (owner) |\n| D-00e | Requirements written in claude.ai; that chat is exported as `transcripts/session-00-requirements` | Approved (owner) |\n| D-00f | Models: Opus 5.5 builds; Sonnet 5.5 designs tests and reviews, so the models challenge each other | Approved (owner) |\n| D-00g | v1 extras: mobile responsive, full keyboard, history in browser, PKR/USD, dark mode | Approved (owner) |\n| D-01 | Three roles: Prospective Borrower, Loan Advisor, Existing Borrower | **Proposed** |\n| D-02 | Input bounds | **Proposed** |\n| D-03 | Schedule rounding method (re-amortising) | **Proposed** |\n| D-04 | Explicit Calculate button; results hidden when inputs change | **Proposed** |\n| D-05 | Currency defaults and format | **Proposed** |\n| D-06 | Changing tenure unit keeps the number | **Proposed** |\n| D-07 | History rules | **Proposed** |\n| D-08 | Theme default = System | **Proposed** |\n| D-09 | Plain CSS, no UI library | **Proposed** |\n| D-10 | Lenient input: commas, lakh style, trailing % | **Proposed** |\n| D-11 | Loan model assumptions | **Proposed** |\n| D-12 | Tests are frozen after Gate G3 | **Proposed** |\n\n---\n\n### D-01 Three roles\n- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).\n- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One \"user\" role could not justify those stories.\n- **Alternative:** Two roles (drop R-3). This saves no build work, because the schedule is needed anyway, but it weakens the product story.\n\n### D-02 Input bounds\n- **Proposal:** Loan amount 1,000 to 1,000,000,000 (up to 2 dp); rate 0 to 50% (up to 2 dp); tenure 1 to 40 years or 1 to 480 months (whole numbers).\n- **Why:** These cover consumer, car and home loans in Pakistan and the US with headroom (PKR property loans run into the hundreds of millions; Pakistan's policy rate peaked at 22% in 2023). The upper limits stop absurd inputs, and the calculation has been proven correct across the whole range (D-03).\n- **Alternative:** Tighter limits, such as 30 years and 36%. These are simpler to explain but reject some edge-case real loans.\n\n### D-03 Schedule rounding method\n- **Proposal:** Re-compute the instalment from the remaining balance each month, rounding to 2 dp (tech spec §5.2). The headline monthly payment is the standard EMI. Individual months may differ by at most 0.01, and the app says so when they do.\n- **Why:** The usual \"fixed instalment, last one adjusts\" method breaks within normal ranges. For example, Rs 10,000 at 36% over 359 months pays off 7 months early, and Rs 10,000.82 at 30% over 360 months gives a final instalment of 1,767.73 against a regular 250.05. The brief says \"never a wrong result\". Our method was verified exactly across about 1,700 cases, including every boundary corner.\n- **Trade-off:** Payments alternate by a paisa or cent (for example 88,848.79 and 88,848.78). This is honest and disclosed.\n- **Alternatives:** (a) The fixed-instalment method with much tighter bounds (still fails for small loans at long tenures). (b) Show unrounded values (rows wouldn't add up to the cent).\n\n### D-04 Explicit Calculate; results hidden when inputs change\n- **Proposal:** Calculate on button press or Enter, not live while typing. Editing any input hides the old results and shows a \"inputs have changed\" message.\n- **Why:** Live calculation flashes errors mid-typing (for example \"1\" is below the minimum while typing \"1000\"). Hiding stale results enforces R-1's \"must never see results that don't match the inputs\".\n- **Alternative:** Live calculation with debounced validation. It feels slicker but needs more edge-case rules.\n\n### D-05 Currency\n- **Proposal:** Default PKR. Options PKR (`Rs 1,234.56`) and USD (`$1,234.56`). Always 2 decimals, standard 3-digit grouping. The symbol only changes; amounts are never converted (a note says so). History entries keep their own currency, and Restore switches to it.\n- **Why:** The target users are Pakistan-first. Conversion would need live exchange rates (a network service, which the brief rules out for running locally).\n- **Open sub-question:** Pakistani banks usually quote whole rupees. We keep 2 dp for consistency with ISO 4217 (PKR has 2 minor units). Change to 0 dp for PKR?\n\n### D-06 Changing the tenure unit keeps the number\n- **Proposal:** Switching Years ↔ Months keeps the typed number (5 years becomes 5 months) and marks results stale.\n- **Why:** Converting breaks for non-multiples (18 months = 1.5 years, which is not a whole number). Keeping the number is predictable, and the stale message prevents misreading.\n\n### D-07 History rules\n- **Proposal:** Auto-save every successful calculation; keep the newest 20; skip a duplicate of the newest entry; Restore recomputes rather than trusting stored numbers; storage failure degrades gracefully.\n- **Alternative:** Manual \"Save\" button. It gives more control but adds a step for R-2.\n\n### D-08 Theme default\n- **Proposal:** `System` (follow the device) by default, with Light and Dark overrides, remembered between visits.\n\n### D-09 Styling\n- **Proposal:** Plain CSS with design tokens; no Tailwind or component library.\n- **Why:** Fewer dependencies, easier for a reviewer to read, and full control of focus and contrast.\n\n### D-10 Lenient input\n- **Proposal:** Accept `1,000,000`, lakh-style `10,00,000`, surrounding spaces, and a trailing `%` on the rate. Reject scientific notation (`1e6`).\n- **Why:** Pakistani users often write lakh grouping; rejecting it would feel broken.\n\n### D-11 Loan model assumptions\n- **Proposal:** Reducing-balance loan, monthly payments, monthly compounding (annual rate ÷ 12), payments at the end of each month, no fees, no dates.\n- **Why:** This is the standard EMI definition used by banks in Pakistan and elsewhere. It is stated in the README as an assumption.\n\n### D-12 Tests frozen after Gate G3\n- **Proposal:** Once you approve the tests, the building agent may not edit them. If a test seems wrong, it stops and asks you.\n- **Why:** Otherwise the loop can \"pass\" by weakening tests. This is a classic agent failure mode and a good story for the transcript.\n\n---\n\n## Change history\n| Date | Change | By |\n|---|---|---|\n| 2026-10-17 | Initial draft | Claude (claude.ai) for M. Arslan |\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/docs/spec/decision-log.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/CLAUDE.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/CLAUDE.md",
  "content": "# CLAUDE.md: Loan EMI Calculator\n\nYou are building a small, client-only React + TypeScript web app for a job take-home assignment. **The human (Muhammad Arslan) is the product owner and directs the work. You write the code; he reviews, tests and approves.** How you work is graded as much as what you build, so be explicit about what you are doing, what you checked, and what you are unsure of.\n\n## Read these first (sources of truth, in priority order)\n1. @docs/user-stories.md: acceptance criteria (ACs). The contract.\n2. @docs/spec/technical-spec.md: stack, architecture, algorithm, copy, storage, testing, CI.\n3. @docs/spec/decision-log.md: approved and proposed decisions.\n4. @docs/process/loop-plan.md: phases, gates and loop exit conditions.\n\nAlso see @docs/app-roles.md and @docs/jobs-to-be-done.md.\n\nIf the sources conflict, or a requirement is ambiguous: **stop and ask.** Do not guess and do not silently pick one.\n\n## Hard rules\n- **Money is never a JS `number`.** All money and rate arithmetic uses `decimal.js` with the configuration in spec §5. Never use `Intl` or `toLocaleString` for money or dates (spec §6).\n- **Use the schedule algorithm in spec §5.2 exactly.** Do not replace it with the \"fixed instalment, last adjusts\" method; spec §5.3 explains why.\n- **All user-visible text comes from `src/ui/copy.ts`** and must match spec §7 character for character.\n- **Inputs are `type=\"text\"`** with `inputmode`, never `type=\"number\"`.\n- **No new dependencies** beyond spec §2 without asking.\n- **No network calls** at runtime. No analytics, no web fonts, no CDNs.\n- **Tests are the contract.** After Gate G3, do not edit any `*.test.ts(x)` or `e2e/**` file. If a test seems wrong, stop and explain why to the human.\n- **Never weaken, skip (`.skip`/`.only`/`.fixme`) or delete a test to make a loop pass.**\n- **Never change a story's Status** in `docs/user-stories.md` without the human's explicit approval in this session.\n- **Never edit `docs/app-roles.md`, `docs/jobs-to-be-done.md` or ACs.** Propose changes instead; the human edits or approves them.\n- **Respect layer boundaries:** `domain/` imports nothing from `ui/` or `storage/`; `storage/` imports nothing from `ui/`.\n- **Every test proving an AC is titled `[AC-x.y] ...`.**\n- Keep commits small and conventional (`feat(S-3): ...`, `test(S-2): ...`, `fix(S-10): ...`), one story or concern per commit.\n\n## Commands\n| Command | Use |\n|---|---|\n| `npm ci` | Install |\n| `npm run dev` | Local dev server |\n| `npm test` | Unit, component and property tests (Vitest) |\n| `npm run test:e2e` | Playwright on Chromium, Firefox and WebKit against the production build |\n| `npm run trace` | Traceability: roles → jobs → stories → ACs → tests |\n| `npm run verify` | **Everything.** The loop exit condition. Must exit 0. |\n\n## How we work: phases and gates\nWe work in phases (see `docs/process/loop-plan.md`). **At the end of every phase, stop and present a gate summary.** Do not start the next phase until the human replies with approval. A gate summary contains:\n1. What was done, mapped to story and AC IDs.\n2. Evidence: the command(s) run and their final output (exit codes, pass/fail counts).\n3. What you are unsure about, and any assumptions you made.\n4. Anything you could not do, and why.\n5. The exact question(s) for the human, if any.\n\nInside a phase, loop on your own: make a change, run the check, read the failure, fix, and repeat. Report honestly if you hit the iteration budget.\n\n## Subagents (`.claude/agents/`)\n| Agent | Model | Job | May edit |\n|---|---|---|---|\n| `spec-critic` | Sonnet | Attacks the spec for gaps, contradictions and untestable ACs before any code exists | Nothing (reports only) |\n| `test-designer` | Sonnet | Writes failing tests from the ACs (test-first) | Test files, `docs/process/manual-test-checklist.md` |\n| `code-reviewer` | Sonnet | Independently reviews code against the spec and hunts edge cases; never grades its own work | `docs/process/review-findings.md`, `e2e/review/**` |\n\nThe main thread (Opus) is the developer. The developer never reviews its own work as final; the `code-reviewer` does that.\n\n## Definition of done (per story)\nSee spec §15: all ACs tested and passing in 3 browsers, `verify` green, reviewer has no blocking findings, the human has checked it by hand, and only then is Status set to `Implemented`.\n\n## Honesty\nIf something does not work, say so plainly. \"Not implemented\" with a reason beats an overstated claim. Do not write summaries that claim more than the command output shows.\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/CLAUDE.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/.claude/agents/spec-critic.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/.claude/agents/spec-critic.md",
  "content": "---\nname: spec-critic\ndescription: Use before any code is written, and whenever the spec changes, to attack the requirements for gaps, contradictions, untestable acceptance criteria and missing edge cases. Reports only; never edits files.\ntools: Read, Grep, Glob\nmodel: sonnet\n---\n\nYou are a sceptical senior QA analyst and product reviewer. You did not write this spec, and your job is to find what is wrong with it before anyone builds on it.\n\nRead, in full:\n- docs/app-roles.md\n- docs/jobs-to-be-done.md\n- docs/user-stories.md\n- docs/spec/technical-spec.md\n- docs/spec/decision-log.md\n\nCheck and report on each of the following.\n\n1. **Traceability:** every story names an existing role and job; every job names an existing role; every job has at least one story; no story serves no job.\n2. **Jobs are solution-free:** flag any job that mentions the app, a screen, a button, history, a schedule, a theme or any other feature.\n3. **Testability:** flag any AC that is not specific, observable and automatable (vague words like \"quickly\", \"clear\" or \"nice\"; no exact expected value; no defined starting state).\n4. **Consistency:** AC text versus the copy deck (spec §7), character for character; AC numbers versus the reference values in spec §5.5; the tab order in AC-8.1 versus the layout in spec §8.1; storage behaviour in ACs versus spec §9.\n5. **Coverage gaps:** missing cases for invalid input, boundaries (exactly at the minimum or maximum and one step beyond), very large or small numbers, \"carry on after a result\" and \"carry on after an error\", storage failure and keyboard use.\n6. **Contradictions** anywhere, including between a Proposed decision and an AC.\n7. **Over-claiming:** anything the spec promises that cannot be verified by a test or a manual check.\n\nOptionally, re-derive one or two reference values by reasoning through the algorithm in spec §5.2 and say whether they look right. Do not run code.\n\nOutput format: a markdown table with columns `# | Severity (Blocker/Major/Minor) | Location (file + ID) | Problem | Suggested fix`, followed by a short list of **questions only the human can answer**. Be concrete. Do not praise. Do not rewrite the documents.\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/.claude/agents/spec-critic.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/.claude/agents/test-designer.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/.claude/agents/test-designer.md",
  "content": "---\nname: test-designer\ndescription: Use in Phase 3 to turn every v1 acceptance criterion into automated tests before implementation exists (test-first), and to write the manual test checklist. Writes test files only.\ntools: Read, Grep, Glob, Write, Edit, Bash\nmodel: sonnet\n---\n\nYou are a test engineer. You did not design the code and you will not write it. Your tests are the contract the developer must satisfy, so they must be **precise, independent and impossible to pass by accident**.\n\nInputs: docs/user-stories.md (ACs), docs/spec/technical-spec.md (especially §4–§9 and §12), and the scaffolded project.\n\nRules:\n1. **Every v1 AC gets at least one test** titled `[AC-x.y] <short description>`. Put domain-level ACs in Vitest unit/property tests next to the domain modules (`src/domain/*.test.ts`). Put UI-observable ACs in Playwright specs under `e2e/` (one spec file per story, e.g. `e2e/s02-validation.spec.ts`). Cover spec rules that no AC covers with `[SPEC-§n]` tests.\n2. **Use exact expected values** from the ACs and spec §5.5. Never compute expected values with the same algorithm you are testing. Hard-code the reference figures.\n3. **Property tests** (fast-check, at least 1,000 runs, fixed seed): every invariant in spec §5.4, generating only valid inputs within the bounds in spec §4.2.\n4. **Locate elements by accessible role and name** (`getByRole('button', { name: 'Calculate' })`, `getByLabel('Loan amount (Rs)')`), not CSS classes. This also checks the accessibility wiring.\n5. **E2E fixtures:** clean `localStorage` per test; a global listener failing the test on `pageerror` or console errors (spec §10); a helper to block storage; the Playwright clock for timestamps; viewports per spec §12.1.\n6. **Run the suite.** At this phase every test must **fail for the right reason** (a missing element or function), not because of a syntax error or a broken fixture. Report any test that passes before implementation, because that means it tests nothing.\n7. Run `npm run trace`. Every v1 AC must show at least one test.\n8. Write `docs/process/manual-test-checklist.md`: one checkbox line per v1 AC, written as the exact manual steps and expected result, for the human to tick in the browser.\n9. **Do not edit anything under `src/` except `*.test.ts(x)` files.** Do not create implementation stubs.\n\nFinish with a report covering: number of tests per story, ACs that were hard to automate and how you handled them, any AC you believe is ambiguous (quote it), and the final output of `npm test` and `npm run test:e2e` (expected: all red).\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/.claude/agents/test-designer.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/.claude/agents/code-reviewer.md</summary>

```json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/.claude/agents/code-reviewer.md",
  "content": "---\nname: code-reviewer\ndescription: Use after each story or batch of stories is implemented, and before every human gate in Phases 4–5, to independently review code against the spec and hunt for defects the tests miss. Never fixes code itself.\ntools: Read, Grep, Glob, Bash, Write\nmodel: sonnet\n---\n\nYou are an independent, adversarial code reviewer. Another model wrote this code. Assume it contains at least one defect the tests don't catch, and find it. Your review is only useful if it is honest; \"looks good\" with no evidence is a failed review.\n\nInputs: docs/user-stories.md, docs/spec/technical-spec.md, CLAUDE.md, the code, and the git history.\n\nDo all of the following.\n\n1. **Run the gate:** `npm run verify`. Paste the final summary lines and exit code.\n2. **Test integrity:** run `git log -p --since=<Gate G3 commit> -- e2e/ 'src/**/*.test.*'`. Flag any test change made after G3, and any `.skip`, `.only`, `.fixme`, `test.fail`, weakened assertion or deleted test.\n3. **Spec conformance:** check the algorithm against spec §5.2 line by line; formatting against §6; every string against the §7 copy deck; storage against §9; the layer import boundaries; and that no JS `number` touches money.\n4. **Exploratory testing beyond the ACs.** Build and serve the app, then use Playwright scripts (put them in `e2e/review/`) to try hostile and unusual input:\n   - pasted text with newlines or tabs, Unicode digits (`١٢`), a full-width `１２`, `00012`, `.5`, `5.`, `-0`, `1,,000`, a 10,000-character string;\n   - rapid double Calculate, Calculate during a restore;\n   - corrupt or oversized `localStorage`, two tabs open at once;\n   - 200% zoom at 360 px wide, keyboard-only flows, theme switching mid-flow, the browser back button.\n   Turn each real defect into a failing test in `e2e/review/` with a title like `[REVIEW-n] ...`.\n5. **Code quality:** look for dead code, `any`, duplicated logic, missing error handling around storage, and unclear names. Report these as Minor unless they risk a wrong result.\n\nWrite `docs/process/review-findings.md`, appending a dated section with the table `ID | Severity (Blocker/Major/Minor) | Story/AC | Evidence (command, input, observed vs expected) | Suggested fix`. **A Blocker is anything that gives a wrong number, crashes, loses data, or makes an `Implemented` claim false.**\n\nDo not edit `src/`. Do not change ACs. Do not mark anything as done. End with a one-line verdict: `BLOCKING FINDINGS: <count>`.\n"
}
```

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/.claude/agents/code-reviewer.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>TaskUpdate</code> — </summary>

```json
{
  "taskId": "2",
  "status": "completed"
}
```

</details>

<details><summary>Tool result</summary>

```
Updated task #2 status
```

</details>

<details><summary>🔧 Tool call: <code>TaskUpdate</code> — </summary>

```json
{
  "taskId": "3",
  "status": "in_progress"
}
```

</details>

<details><summary>Tool result</summary>

```
Updated task #3 status
```

</details>

<details><summary>🔧 Tool call: <code>Write</code> — /home/claude/muhammad-arslan-calculator/docs/process/loop-plan.md</summary>

````json
{
  "file_path": "/home/claude/muhammad-arslan-calculator/docs/process/loop-plan.md",
  "content": "# Loop Plan: Spec-Driven, Human-Gated Build with Claude Code\n\n## The model in one picture\n\n```\nPhase 1 Spec challenge ──G1──► Phase 2 Scaffold ──G2──► Phase 3 Tests first ──G3──►\nPhase 4 Build loop (per story) ──G4──► Phase 5 Independent review ──G5──► Phase 6 Release ──G6──► Submit\n```\n\n- **Inside a phase**, the agent loops on its own: act → run the check → read the failure → fix → repeat, until the **exit condition** is met or the **budget** runs out.\n- **Between phases**, the agent stops at a **gate (G1–G6)**. You review the evidence and reply \"approved\" or give corrections. Your gate replies are the most important part of the transcript: they show you directing, checking and catching mistakes.\n- **Maker ≠ checker.** Opus builds. Sonnet subagents challenge the spec, write the tests and review the code. Neither grades its own work.\n\n| Who | Model | Role |\n|---|---|---|\n| Main session | Opus 5.5 | Orchestrator + developer |\n| `spec-critic` | Sonnet 5.5 | Attacks the requirements |\n| `test-designer` | Sonnet 5.5 | Writes tests from the ACs before the code exists |\n| `code-reviewer` | Sonnet 5.5 | Independent review + exploratory edge-case hunting |\n| **You** | Human | Product owner: answer questions, approve gates, test by hand |\n\n---\n\n## Phase 0: Setup (you, about 15 min)\n\n1. Create a **public** GitHub repo named `muhammad-arslan-calculator`, and clone it.\n2. Copy this whole pack into it: `CLAUDE.md`, `.claude/agents/`, `docs/`. Create an empty `transcripts/` folder.\n3. Install Node 24 LTS and Claude Code. Run `claude` in the repo folder.\n4. Confirm the main model is Opus 5.5 (`/model`). The subagents choose Sonnet themselves through their `model: sonnet` setting.\n5. Commit: `chore: add requirements pack and agent definitions`.\n6. **Transcripts:** use **one Claude Code session per phase** where you can. Before you `/clear` or close a session, run `/export transcripts/session-0N-<phase>.md`. Subagent conversations may not appear in full in the main export; at the end, also copy the raw session logs for this project from `~/.claude/projects/` into `transcripts/raw/`. Remove secrets and change nothing else.\n\n---\n\n## Phase 1: Spec challenge (exit: no open Blockers)\n\n**Your prompt (type it yourself; adapt the wording):**\n> Read CLAUDE.md and every file it references. Don't write any code yet. First, explain back to me in your own words: who the app is for, what v1 includes and excludes, and how the schedule is calculated. Then run the spec-critic subagent on the requirements. Combine its findings with your own questions into one list, ordered by severity, and propose a fix for each. Stop at Gate G1.\n\n**Exit condition:** every Blocker and Major finding has a decision from you, recorded in `docs/spec/decision-log.md` (D-xx entries changed from Proposed to Approved, or amended).\n\n**🚦 Gate G1, what you check:**\n- Did it understand the product correctly? Correct any misunderstanding explicitly; that correction is good evidence for the transcript.\n- Go through each Proposed decision D-01 to D-12. Approve or change it.\n- Make any AC or spec edits yourself, or tell Claude exactly what to change and then read the diff.\n\n---\n\n## Phase 2: Scaffold + CI + traceability (exit: `verify` green on an empty shell)\n\n**Your prompt:**\n> Phase 2. Scaffold the project exactly per technical-spec §2, §3, §13 and §14: Vite + React + TS strict, decimal.js, Vitest, Testing Library, fast-check, Playwright with 3 browsers, ESLint (with the layer-boundary rule) and Prettier, the npm scripts including `verify` and `size`, the scripts/trace.mjs traceability checker per §12.5, .nvmrc, and both GitHub Actions workflows. Render only an empty App shell with the title. No features. Then loop until `npm run verify` exits 0, except that `trace` is expected to report every v1 AC as missing a test. Show me the output. Stop at Gate G2.\n\n**Loop:** `/goal npm run lint, typecheck, test, build and size all exit 0 and npm run trace runs and lists every v1 AC as untested` (budget: about 10 turns).\n\n**🚦 Gate G2, what you check:**\n- Run `npm ci && npm run dev` yourself, and open the page.\n- Run `npm run trace` and confirm it lists the ACs. Break a story's job ID on purpose (for example change `J-1` to `J-99`), confirm `trace` fails, then undo it. *This is a good transcript moment: you are testing the tester.*\n- Push to GitHub. Set **Settings → Pages → Source: GitHub Actions**. Confirm CI runs.\n\n---\n\n## Phase 3: Tests first (exit: every v1 AC has a failing test)\n\n**Your prompt:**\n> Phase 3. Use the test-designer subagent to write tests for every v1 AC, following its instructions. The tests must fail for the right reason, because nothing is implemented yet. Then show me: tests per story, the trace output, and 3 sample tests I should read closely (pick the ones with the most edge cases). Stop at Gate G3.\n\n**Exit condition:** `npm run trace` shows 0 untested v1 ACs. All AC tests fail, and none fail because of a broken fixture or a syntax error.\n\n**🚦 Gate G3, what you check:**\n- Read the sample tests against their ACs. Are the expected values hard-coded from the ACs, not computed?\n- Spot-check one test per story yourself.\n- Read `docs/process/manual-test-checklist.md`.\n- When happy, commit and **tag `g3-tests-approved`**. From here on, the tests are frozen (D-12).\n\n---\n\n## Phase 4: Build loop (exit: `verify` fully green)\n\nWork **one story group at a time**, in this order, with a short mini-gate after each group:\n\n1. Domain: S-1, S-2, S-3, S-10, S-13 (parse, validate, loan, format, plus unit and property tests)\n2. Core UI: S-1, S-2, S-3, S-4, S-9 (form, results, errors, stale state, reset)\n3. Schedule UI: S-10, S-13\n4. Settings: S-6, S-7\n5. History: S-11, S-12\n6. Layout and keyboard: S-5, S-8\n\n**Your prompt (per group):**\n> Phase 4, group N: implement stories <list> to satisfy their tests, following technical-spec. Don't modify any test. Loop until the tests for these stories pass in all three browsers and lint/typecheck are clean. Then run the code-reviewer subagent on this group and fix every Blocker and Major it reports. Show me the evidence and stop.\n\n**Loop:** `/goal the tests tagged with these stories' AC IDs pass in chromium, firefox and webkit, and npm run lint and npm run typecheck exit 0` (budget: about 15 turns per group). For the final group: `/goal npm run verify exits 0`.\n\n**Rules the agent must follow (from CLAUDE.md):** never edit tests; if a test seems wrong, stop and ask you; never use a JS `number` for money; never change the algorithm.\n\n**🚦 Mini-gate after each group (G4.x), what you check:**\n- Open the app and try the group's ACs by hand using the checklist.\n- Read the reviewer's findings. Did the developer fix them, or argue? Push back where needed.\n- **Try to break it yourself** with something not in the ACs, and record what happened.\n\n---\n\n## Phase 5: Independent review (exit: 0 blocking findings, and you have ticked the full manual checklist)\n\n**Your prompt:**\n> Phase 5. Run the code-reviewer subagent across the whole app, including its exploratory testing. Then fix every Blocker and Major it finds, without editing frozen tests (review tests in e2e/review/ are new tests and may be added). Re-run the reviewer until it reports BLOCKING FINDINGS: 0. Show me the final findings file and the verify output. Stop at Gate G5.\n\n**Loop:** reviewer → developer fixes → reviewer, until `BLOCKING FINDINGS: 0` (budget: 3 rounds; if it is still failing, stop and report).\n\n**🚦 Gate G5, what you check:**\n- Tick **every line** of `docs/process/manual-test-checklist.md` yourself, in Chrome **and** Safari or Firefox, on desktop **and** on a real phone.\n- Decide each story's status. A story becomes `Implemented` only if all its ACs passed in both automated tests and your manual check. Otherwise it stays `Not implemented`, with a note. Tell Claude which statuses to change.\n\n---\n\n## Phase 6: Release (exit: live URL passes smoke tests; package complete)\n\n**Your prompt:**\n> Phase 6. (1) Update the statuses in docs/user-stories.md exactly as I approved. (2) Write README.md per the checklist in loop-plan.md. (3) Merge to main, let the deploy workflow publish to GitHub Pages, and confirm the @smoke tests pass against the live URL. (4) Run `npm run trace -- --results` and show me the output. Stop at Gate G6.\n\n**README must contain** (assignment requirement plus our additions):\n- [ ] What the app is and who it is for (the 3 roles in one paragraph each), and **why a loan/EMI calculator**\n- [ ] Live URL\n- [ ] Prerequisites (Node 24 LTS, npm), the exact install and start commands (`npm ci`, `npm run dev`), and how to run all tests (`npm test`, `npx playwright install`, `npm run test:e2e`, `npm run verify`)\n- [ ] AI tools and models: Claude (claude.ai, Opus 5.5) for requirements; Claude Code with Opus 5.5 (developer) and Sonnet 5.5 (spec critic, test designer, reviewer)\n- [ ] **Code changed by hand**: an honest list (or \"None\")\n- [ ] Assumptions (spec §16 + decision log D-xx), including that Edge is covered via Chromium\n- [ ] How we worked: phases, gates and loops in one short section, with links to `transcripts/`\n- [ ] The story status table, copied from `user-stories.md`\n- [ ] Known limitations\n\n**🚦 Gate G6, what you check:**\n- Clone the repo into a **fresh folder** and follow the README word for word: `npm ci`, `npm run dev`, tests. This is exactly what the reviewers will do.\n- Open the live URL on your phone.\n- Check that `transcripts/` contains: `session-00-requirements` (this claude.ai chat), every Claude Code session export, and `raw/` logs. Remove any secrets; change nothing else.\n- Check that no `node_modules/`, `dist/` or `reports/` folders are committed.\n\n---\n\n## Submission email\n\n- **Subject:** `Take-home assignment: [the role you applied for], Muhammad Arslan`\n- **Body:** repo link (public), live URL, AI tools and models used, and roughly how long you spent.\n- **Before starting:** send HR the confirmation reply with your expected submission date (graded under \"Delivery and communication\").\n\n## Budgets and stop rules\n\n| Situation | What the agent does |\n|---|---|\n| Loop budget reached | Stop, report the last failure and what it tried, and ask you |\n| A test looks wrong after G3 | Stop and explain why; you decide |\n| A property test finds a counterexample | Stop and report it; no algorithm change without approval |\n| The spec is ambiguous or contradictory | Stop and ask |\n| A new dependency seems needed | Ask first |\n"
}
````

</details>

<details><summary>Tool result</summary>

```
File created successfully at: /home/claude/muhammad-arslan-calculator/docs/process/loop-plan.md (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Cross-check IDs, traceability and copy strings</summary>

```json
{
  "command": "cd /home/claude/muhammad-arslan-calculator && python3 - << 'EOF'\nimport re\nus=open('docs/user-stories.md').read(); jt=open('docs/jobs-to-be-done.md').read(); sp=open('docs/spec/technical-spec.md').read()\n# stories -> job\nst=dict(re.findall(r'^## (S-\\d+) .*?\\n\\*\\*Role:\\*\\* (R-\\d)[^·]*· \\*\\*Serves:\\*\\* (J-\\d+)',us,re.M) and [])\nrows=re.findall(r'^## (S-\\d+) [^\\n]*\\n\\*\\*Role:\\*\\* (R-\\d)[^\\n]*?\\*\\*Serves:\\*\\* (J-\\d+)',us,re.M)\nprint('stories',len(rows))\njobmap={}\nfor s,r,j in rows: jobmap.setdefault(j,[]).append(s)\njobs=dict(re.findall(r'^\\*\\*(J-\\d+) \\(([^)]+)\\)',jt,re.M))\nprint('jobs',sorted(jobs))\nfor j,ss in sorted(jobmap.items()):\n    line=re.search(r'^\\| '+j+r' \\|[^|]*\\| ([^|]*)\\|',jt,re.M).group(1)\n    listed=re.findall(r'S-\\d+',line)\n    if sorted(listed)!=sorted(ss): print('MISMATCH',j,listed,ss)\nfor j in jobs:\n    if j not in jobmap: print('job without story',j)\n# role consistency job role vs story role\nrolename={'R-1':'Prospective Borrower','R-2':'Loan Advisor','R-3':'Existing Borrower'}\nfor s,r,j in rows:\n    if jobs[j]!=rolename[r]: print('ROLE MISMATCH',s,r,j,jobs[j])\nacs=re.findall(r'\\*\\*(AC-\\d+\\.\\d+)\\*\\*',us)\nprint('ACs',len(acs),'dupes',[a for a in set(acs) if acs.count(a)>1])\n# message strings in ACs present in spec\nquoted=set(re.findall(r'`([A-Z][^`]{12,})`',us))\nmissing=[q for q in quoted if q not in sp]\nprint('quoted strings not in spec:',missing)\nEOF",
  "description": "Cross-check IDs, traceability and copy strings"
}
```

</details>

<details><summary>Tool result</summary>

```
stories 19
jobs ['J-1', 'J-10', 'J-11', 'J-2', 'J-3', 'J-4', 'J-5', 'J-6', 'J-7', 'J-8', 'J-9']
ACs 98 dupes []
quoted strings not in spec: ['Rs 1,066,185.45', 'Rs 1,000,000.00 at 12% for 1 year', 'Rs 88,848.79 per month', 'Rs 100,833.33', 'Rs 3,809,014.14', 'Rs 120,000.00', 'Rs 1,309,014.14', 'Rs 41,666,666.80', 'Rs 19,000,000,061.79', 'Not implemented']
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Package the requirements pack as a zip</summary>

```json
{
  "command": "cd /home/claude && mkdir -p muhammad-arslan-calculator/transcripts && touch muhammad-arslan-calculator/transcripts/.gitkeep && rm -f muhammad-arslan-calculator-spec-pack.zip && zip -rq muhammad-arslan-calculator-spec-pack.zip muhammad-arslan-calculator && unzip -l muhammad-arslan-calculator-spec-pack.zip | tail -n +4 | awk '{print $4}' | grep -v '/$'",
  "description": "Package the requirements pack as a zip"
}
```

</details>

<details><summary>Tool result</summary>

```
muhammad-arslan-calculator/transcripts/.gitkeep
muhammad-arslan-calculator/CLAUDE.md
muhammad-arslan-calculator/docs/spec/technical-spec.md
muhammad-arslan-calculator/docs/spec/decision-log.md
muhammad-arslan-calculator/docs/process/loop-plan.md
muhammad-arslan-calculator/docs/app-roles.md
muhammad-arslan-calculator/docs/jobs-to-be-done.md
muhammad-arslan-calculator/docs/user-stories.md
muhammad-arslan-calculator/.claude/agents/test-designer.md
muhammad-arslan-calculator/.claude/agents/spec-critic.md
muhammad-arslan-calculator/.claude/agents/code-reviewer.md
```

</details>

<details><summary>🔧 Tool call: <code>SendUserFile</code> — </summary>

```json
{
  "files": [
    "/home/claude/muhammad-arslan-calculator-spec-pack.zip",
    "/home/claude/muhammad-arslan-calculator/docs/spec/decision-log.md",
    "/home/claude/muhammad-arslan-calculator/docs/user-stories.md"
  ],
  "caption": "Full requirements pack (drop it into the repo root), plus the decision log that needs your approval and the user stories.",
  "status": "normal",
  "display": "attach"
}
```

</details>

<details><summary>🔧 Tool call: <code>TaskUpdate</code> — </summary>

```json
{
  "taskId": "3",
  "status": "completed"
}
```

</details>

<details><summary>Tool result</summary>

```
3 files delivered to user.
  /home/claude/muhammad-arslan-calculator-spec-pack.zip → file_uuid: 18061fc4-a544-4d3d-9e3c-5f8e648ce1f7
  /home/claude/muhammad-arslan-calculator/docs/spec/decision-log.md → file_uuid: b6a9d056-9083-4baf-93c8-56595572739e
  /home/claude/muhammad-arslan-calculator/docs/user-stories.md → file_uuid: b92391ae-4c7e-4e8e-b455-dbbf23e57058
Each file shows as a card whose position relative to your text depends on the app the user is reading in, so refer to a file by its name, never as above or below.
```

</details>

<details><summary>Tool result</summary>

```
Updated task #3 status
```

</details>

## 🤖 Claude  
<sub>2026-10-17T15:36:38.480Z</sub>

The requirements pack is ready: 3 roles, 11 jobs, and 19 user stories (13 for v1, 6 backlog) with 98 testable acceptance criteria. It also has the technical spec, `CLAUDE.md`, three Sonnet subagents and a six-phase, gated loop plan. Everything is in the zip, laid out as the repo should be.

**One finding you need to know about.** I checked every reference figure with exact decimal arithmetic before writing it into the criteria. That check showed the textbook EMI schedule gives clearly wrong results inside normal input ranges:

- Rs 10,000 at 36% over 359 months is paid off 7 months early.
- Another normal-looking loan ends on a final instalment about 7 times the regular one.

That would break the brief's "never a wrong result" rule. The spec therefore uses a method that recomputes the instalment from the remaining balance each month. I tested it on about 1,700 inputs, including every boundary corner. It always ends at exactly 0.00, never ends early, and keeps every payment within 0.01 of the headline figure.

**Twelve smaller decisions in `decision-log.md` are marked "Proposed".** I made them so the spec could be complete, but they're your call: roles, input limits, the rounding method above, Calculate button vs live results, currency defaults, history rules and a few others. Claude Code's first phase stops at a gate until you've approved or changed each one. Your answers at that gate are good evidence of you directing the work. One question stands out: Pakistani banks quote whole rupees, so do you want PKR shown with 0 decimals instead of 2?

**Two things to do now:**
- Send HR the confirmation reply with your expected submission date. That reply is part of how they grade you.
- Export this chat as `transcripts/session-00-requirements`, since we wrote the requirements here.

Then follow Phase 0 in `docs/process/loop-plan.md` to start Claude Code.

## 👤 User — message 4  
<sub>2026-10-17T15:49:01.528Z</sub>

1. Most of the CLAUDE.md `@` imports aren't loading. `@docs/user-stories.md:` and the other three priority docs are followed by a colon, and `@docs/jobs-to-be-done.md.` by a full stop. That punctuation seems to become part of the path. Only `app-roles.md` was loaded into my context automatically, so the contract docs aren't auto-loaded in a new session. The fix is a space after each path, e.g. `1. @docs/user-stories.md — acceptance criteria`.

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sat 2026-10-17 20:48 local time.</system-reminder>
```

</details>

## 🤖 Claude  
<sub>2026-10-17T15:49:05.038Z</sub>

You're right, I put punctuation straight after each path. I'll fix the five import lines and repackage the zip.

<details><summary>🔧 Tool call: <code>Edit</code> — /home/claude/muhammad-arslan-calculator/CLAUDE.md</summary>

```json
{
  "replace_all": false,
  "file_path": "/home/claude/muhammad-arslan-calculator/CLAUDE.md",
  "old_string": "1. @docs/user-stories.md: acceptance criteria (ACs). The contract.\n2. @docs/spec/technical-spec.md: stack, architecture, algorithm, copy, storage, testing, CI.\n3. @docs/spec/decision-log.md: approved and proposed decisions.\n4. @docs/process/loop-plan.md: phases, gates and loop exit conditions.\n\nAlso see @docs/app-roles.md and @docs/jobs-to-be-done.md.",
  "new_string": "1. @docs/user-stories.md — acceptance criteria (ACs). The contract.\n2. @docs/spec/technical-spec.md — stack, architecture, algorithm, copy, storage, testing, CI.\n3. @docs/spec/decision-log.md — approved and proposed decisions.\n4. @docs/process/loop-plan.md — phases, gates and loop exit conditions.\n\nAlso see:\n- @docs/app-roles.md — who uses the app\n- @docs/jobs-to-be-done.md — why they use it"
}
```

</details>

<details><summary>Tool result</summary>

```
The file /home/claude/muhammad-arslan-calculator/CLAUDE.md has been updated successfully. (file state is current in your context — no need to Read it back)
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Confirm clean import paths and rebuild the zip</summary>

```json
{
  "command": "echo \"--- @ references now in CLAUDE.md:\" && grep -o '@[^ ]*' muhammad-arslan-calculator/CLAUDE.md && echo \"--- other files using @ imports:\" && grep -rln '@docs' muhammad-arslan-calculator --include=*.md | grep -v CLAUDE.md || echo \"(none)\"; rm -f muhammad-arslan-calculator-spec-pack.zip && zip -rq muhammad-arslan-calculator-spec-pack.zip muhammad-arslan-calculator && echo zipped",
  "description": "Confirm clean import paths and rebuild the zip"
}
```

</details>

<details><summary>Tool result</summary>

```
--- @ references now in CLAUDE.md:
@docs/user-stories.md
@docs/spec/technical-spec.md
@docs/spec/decision-log.md
@docs/process/loop-plan.md
@docs/app-roles.md
@docs/jobs-to-be-done.md
--- other files using @ imports:
(none)
zipped
```

</details>

<details><summary>🔧 Tool call: <code>SendUserFile</code> — </summary>

```json
{
  "files": [
    "/home/claude/muhammad-arslan-calculator/CLAUDE.md",
    "/home/claude/muhammad-arslan-calculator-spec-pack.zip"
  ],
  "caption": "Fixed CLAUDE.md (all six imports now end cleanly) and the rebuilt pack.",
  "status": "normal",
  "display": "attach"
}
```

</details>

<details><summary>Tool result</summary>

```
2 files delivered to user.
  /home/claude/muhammad-arslan-calculator/CLAUDE.md → file_uuid: a843401f-7d59-486c-9644-8f871afad8e5
  /home/claude/muhammad-arslan-calculator-spec-pack.zip → file_uuid: 2befd06f-eeeb-47dc-8869-98cbce82fd5a
Each file shows as a card whose position relative to your text depends on the app the user is reading in, so refer to a file by its name, never as above or below.
```

</details>

## 🤖 Claude  
<sub>2026-10-17T15:49:18.559Z</sub>

I've fixed it. All six `@` references in `CLAUDE.md` now end with a space and a dash (`@docs/user-stories.md — acceptance criteria…`). I also checked that a quick search pulls each path out cleanly, with nothing attached to the end. No other file in the pack uses `@` imports.

Replace `CLAUDE.md` in your repo, or use the rebuilt zip. Then start a fresh Claude Code session and run `/memory`. All six docs should now be listed as loaded. It's worth checking at the start of Phase 1, before you trust that Claude has the contract in context.

This also makes a good line for the transcript or README: you checked that the context actually loaded, rather than assuming it did.

## 👤 User — message 5  
<sub>2026-10-18T18:54:36.414Z</sub>

Can you give me transcript for this chat?

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sun 2026-10-18 23:54 local time.</system-reminder>
```

</details>

## 🤖 Claude  
<sub>2026-10-18T18:54:40.929Z</sub>

I'll look for this session's raw log, so the transcript comes from the actual record rather than me retyping or summarising it. The assignment explicitly rejects AI-written summaries.

<details><summary>🔧 Tool call: <code>Bash</code> — Find this session's raw Claude Code log</summary>

```json
{
  "command": "ls -la ~/.claude/projects/ 2>/dev/null; find / -name \"*.jsonl\" -path \"*projects*\" -newer /mnt/user-data/uploads/attachment.txt 2>/dev/null | head; find ~/.claude -name \"*.jsonl\" 2>/dev/null | xargs -r ls -la",
  "description": "Find this session's raw Claude Code log"
}
```

</details>

<details><summary>Tool result</summary>

```
total 12
drwx------  3 root root 4096 Oct 17 20:22 -home-claude
drwx------  3 root root 4096 Oct 17 20:22 .
drwxr-xr-x 14 root root 4096 Oct 17 20:29 ..
/root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl
-rw------- 1 root root 1479422 Oct 18 23:54 /root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Inspect the log's structure and first message</summary>

```json
{
  "command": "cd /tmp && F=/root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl; wc -l $F; python3 - \"$F\" << 'EOF'\nimport json,sys,collections\nc=collections.Counter(); first=None\nfor line in open(sys.argv[1]):\n    try: d=json.loads(line)\n    except: c['bad']+=1; continue\n    t=d.get('type'); c[t]+=1\n    if t=='user' and first is None:\n        m=d.get('message',{}).get('content'); first=str(m)[:300]\nprint(c); print('FIRST USER:',first)\nEOF",
  "description": "Inspect the log's structure and first message"
}
```

</details>

<details><summary>Tool result</summary>

```
207 /root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl
Counter({'assistant': 57, 'attachment': 46, 'user': 42, 'last-prompt': 16, 'atis-latch': 15, 'mode': 14, 'queue-operation': 12, 'system': 3, 'cost-state': 2})
FIRST USER: [{'type': 'text', 'text': '[Attachment from earlier in this conversation: file 0f8c067c-cec8-503f-bc46-9ca68969ade3 — not embedded in this transcript; it arrives with one of the next messages.]'}, {'text': '<system-reminder>The user\'s computer can be reached from this session, but no folder is conn
Shell cwd was reset to /home/claude
```

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Scan the log for secrets and list block types</summary>

```json
{
  "command": "F=/root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl; grep -oiE '(sk-[a-z0-9_-]{16,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|xox[bap]-[A-Za-z0-9-]+|Bearer [A-Za-z0-9._-]{20,}|\"(api[_-]?key|token|password|secret)\"\\s*:\\s*\"[^\"]{6,})' $F | sort | uniq -c | head; echo \"scan done\"; python3 - \"$F\" << 'EOF'\nimport json,sys,collections\nc=collections.Counter()\nfor line in open(sys.argv[1]):\n    d=json.loads(line)\n    if d.get('type')=='attachment':\n        a=d.get('attachment',{}); c[a.get('type')]+=1\n    if d.get('type')=='assistant':\n        for b in d['message'].get('content',[]): c['asst:'+b.get('type')]+=1\nprint(c)\nEOF",
  "description": "Scan the log for secrets and list block types"
}
```

</details>

<details><summary>Tool result</summary>

```
scan done
Counter({'asst:tool_use': 36, 'total_tokens_reminder': 23, 'asst:thinking': 17, 'asst:text': 7, 'cowork_memory_context': 4, 'environment': 3, 'skill_listing': 3, 'date': 2, 'prompt_snapshot': 2, 'file': 1, 'model': 1, 'deferred_tools_delta': 1, 'agent_listing_delta': 1, 'mcp_instructions_delta': 1, 'session_context': 1, 'credential_org': 1, 'remote_session_change': 1, 'deferred_tools_record': 1, 'thinking_stripped': 1})
```

</details>

## 🤖 Claude  
<sub>2026-10-18T18:55:17.070Z</sub>

No keys, tokens or passwords appear in the log. Now I'll convert it to readable markdown with a script, so every prompt and reply is copied word for word.

<details><summary>🔧 Tool call: <code>Bash</code> — Render the session log into a verbatim markdown transcript</summary>

```json
{
  "command": "mkdir -p /home/claude/transcript-out && cat > /tmp/claude-0/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e/scratchpad/render.py << 'EOF'\nimport json, sys, re\nsrc, out = sys.argv[1], sys.argv[2]\nSNAP = re.compile(r'[Redacted: personal profile context that the Claude app adds automatically. Not typed by the user.]', re.S)\nREDACT = '[Redacted: personal profile context that the Claude app adds automatically. Not typed by the user.]'\ndef clean(t):\n    return SNAP.sub(REDACT, t)\ndef split_reminders(t):\n    \"\"\"Separate the user's typed text from <system-reminder> blocks the app injects.\"\"\"\n    rem = re.findall(r'<system-reminder>.*?</system-reminder>', t, re.S)\n    body = re.sub(r'<system-reminder>.*?</system-reminder>', '', t, flags=re.S).strip()\n    return body, rem\ndef fence(s):\n    n = 3\n    while '`'*n in s: n += 1\n    return '`'*n\nL = []\nL.append('# Session 00 — Requirements (claude.ai)\\n')\nL.append('**Tool:** Claude (claude.ai app, agentic session built on Claude Code) · **Model:** Opus 5.5 (`claude-opus-5-5`)  ')\nL.append('**Source:** rendered mechanically by a script from the app\\'s own session log (`~/.claude/projects/…/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl`). Prompts and replies are verbatim.\\n')\nL.append('**What this rendering leaves out or changes (the raw log is kept alongside):**')\nL.append('- Personal profile context the app injects automatically into some turns is replaced with a marked redaction. No passwords, API keys or tokens were found in the log.')\nL.append('- The model\\'s hidden reasoning (\"thinking\") blocks are not shown, as in Claude Code\\'s `/export`.')\nL.append('- Internal app bookkeeping entries (token counters, tool and skill listings, mode/queue records) are not shown.')\nL.append('- Other notes the app adds to user turns (time zone, device link) are kept, collapsed under \"App context\".\\n')\nL.append('---\\n')\nturn = 0\nfor line in open(src):\n    d = json.loads(line); t = d.get('type')\n    if t == 'attachment':\n        a = d.get('attachment', {})\n        if a.get('type') == 'file':\n            p = a.get('filename') or a.get('path') or ''\n            L.append(f'> 📎 **Attached file:** `{p}` (the KnowledgeCity assignment brief)\\n')\n        continue\n    if t not in ('user', 'assistant'): continue\n    msg = d.get('message', {}); content = msg.get('content')\n    ts = d.get('timestamp', '')\n    if t == 'user':\n        blocks = [{'type': 'text', 'text': content}] if isinstance(content, str) else content\n        texts = [b for b in blocks if b.get('type') == 'text']\n        results = [b for b in blocks if b.get('type') == 'tool_result']\n        if texts:\n            raw = clean('\\n'.join(b['text'] for b in texts))\n            body, rem = split_reminders(raw)\n            if d.get('isMeta') or (not body and not rem):\n                pass\n            turn += 1\n            L.append(f'## 👤 User — turn {turn}  \\n<sub>{ts}</sub>\\n')\n            L.append(body if body else '_(no typed text; app context only)_')\n            L.append('')\n            if rem:\n                L.append('<details><summary>App context added to this turn</summary>\\n')\n                for r in rem:\n                    f = fence(r); L.append(f'{f}text\\n{clean(r)}\\n{f}')\n                L.append('\\n</details>\\n')\n        for r in results:\n            c = r.get('content')\n            if isinstance(c, list):\n                c = '\\n'.join(x.get('text', '') for x in c if x.get('type') == 'text')\n            c = clean(str(c or ''))\n            f = fence(c)\n            L.append(f'<details><summary>Tool result{\" (error)\" if r.get(\"is_error\") else \"\"}</summary>\\n\\n{f}\\n{c}\\n{f}\\n\\n</details>\\n')\n    else:\n        for b in content or []:\n            bt = b.get('type')\n            if bt == 'text' and b.get('text', '').strip():\n                L.append(f'## 🤖 Claude  \\n<sub>{ts}</sub>\\n')\n                L.append(clean(b['text'])); L.append('')\n            elif bt == 'tool_use':\n                inp = b.get('input', {})\n                desc = inp.get('description') or inp.get('subject') or inp.get('file_path') or inp.get('query') or ''\n                j = clean(json.dumps(inp, ensure_ascii=False, indent=2))\n                f = fence(j)\n                L.append(f'<details><summary>🔧 Tool call: <code>{b.get(\"name\")}</code> — {desc}</summary>\\n\\n{f}json\\n{j}\\n{f}\\n\\n</details>\\n')\nopen(out, 'w').write('\\n'.join(L))\nprint('turns', turn)\nEOF\npython3 -I /tmp/claude-0/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e/scratchpad/render.py /root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl /home/claude/transcript-out/session-00-requirements.md && grep -n '^## ' /home/claude/transcript-out/session-00-requirements.md",
  "description": "Render the session log into a verbatim markdown transcript"
}
```

</details>

<details><summary>Tool result</summary>

```
turns 8
14:## 👤 User — turn 1  
33:## 🤖 Claude  
68:## 👤 User — turn 2  
322:## 🤖 Claude  
396:## 👤 User — turn 3  
417:## 👤 User — turn 4  
424:## 👤 User — turn 5  
433:## 👤 User — turn 6  
459:## 🤖 Claude  
1099:## 🤖 Claude  
1119:## 👤 User — turn 7  
1132:## 🤖 Claude  
1213:## 🤖 Claude  
1222:## 👤 User — turn 8  
1235:## 🤖 Claude  
1306:## 🤖 Claude
```

</details>

## 🤖 Claude  
<sub>2026-10-18T18:55:37.908Z</sub>

Some user turns look odd: turn 2 is very long, and turns 3–5 have nothing between them. I'll check them against the real conversation.

<details><summary>🔧 Tool call: <code>Bash</code> — Inspect the suspicious user turns</summary>

```json
{
  "command": "cd /home/claude/transcript-out && sed -n '14,32p;68,80p;314,321p;396,458p' session-00-requirements.md | cut -c1-220",
  "description": "Inspect the suspicious user turns"
}
```

</details>

<details><summary>Tool result</summary>

````
## 👤 User — turn 1  
<sub>2026-10-17T15:00:31.407Z</sub>

[Attachment from earlier in this conversation: file 0f8c067c-cec8-503f-bc46-9ca68969ade3 — not embedded in this transcript; it arrives with one of the next messages.]


just read this and tell me what you understand?

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's computer can be reached from this session, but no folder is connected yet. Its files and folders are reached with device_list_dir / device_stage_files / device_commit_files, and you can reques
```
```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sat 2026-10-17 20:00 local time.</system-reminder>
```

</details>

## 👤 User — turn 2  
<sub>2026-10-17T15:11:26.770Z</sub>

Okay, now we are going to enhance the requirements for the assessment.

We are going to use claude code for development and are going to use spec driven development. Your goal is create very detailed requirements.

We need to deploy this as a free app. I want you to consider that and suggest tech stack accordingly.

Ask questions, don't assume anything in terms of major decision. 

Also suggest the skill we will need to do this task, like QA,dev,architecture pipeline


Codex threads use worktrees natively; Claude Code offers --worktree sessions and isolation: worktree on subagents that clean up after themselves.

Both Codex and Claude Code load skills when you invoke $name or when the task matches a tight, boring description (clever descriptions match too often).</span></document_content><metadata key="search_provider">anthropic<
```

</details>

## 👤 User — turn 3  
<sub>2026-10-17T15:22:40.420Z</sub>

_(no typed text; app context only)_

<details><summary>App context added to this turn</summary>

```text
<system-reminder>
This session is now linked to one of the user's computers. The
`mcp__remote-devices__*` tools for working with that computer are in your
tool list, or will be shortly (possibly not until a later turn); until they
are, the computer is not yet reachable. Once they are, use them normally —
if earlier calls failed because no device was connected, try again; any
part of your system prompt saying this session has no linked computer no
longer applies.
</system-reminder>
```

</details>

## 👤 User — turn 4  
<sub>2026-10-17T15:22:40.852Z</sub>

@"/root/.claude/uploads/556cd3f9-b98d-5d33-928c-214cdccd717e/0f8c067c-attachment.txt" Files from earlier in this conversation, delivered automatically.

> 📎 **Attached file:** `/root/.claude/uploads/556cd3f9-b98d-5d33-928c-214cdccd717e/0f8c067c-attachment.txt` (the KnowledgeCity assignment brief)

## 👤 User — turn 5  
<sub>2026-10-17T15:22:40.881Z</sub>

The files from earlier in this conversation were delivered automatically, on the file-delivery messages just before this one.

The files from earlier in this conversation are available at these paths:
/mnt/user-data/uploads/attachment.txt
Read them there (those copies are read-only — copy a file elsewhere to modify it). Each is also attached, at an @-mentioned path, to this message or the file-delivery messages just before it; if a listed path is missin

## 👤 User — turn 6  
<sub>2026-10-17T15:22:40.750Z</sub>

1- That's irrelevant 
2- Don't worry about that.
3- Loan/EMI
4-Several, decide based on usecase.
5-React
6- Github Pages preferred 
7- Human Gated
8- Let's write them here.
9- Opus 5.5 and Maybe Sonette for testing So models can challenge each other?
10- Mobile responsive ,full keyboard input

* calculation history saved in the browser
* currency or locale (PKR, USD or selectable)
* dark mode

<details><summary>App context added to this turn</summary>

```text
<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Message sent at Sat 2026-10-17 20:20 local time.</system-reminder>
```

</details>
````

</details>

<details><summary>🔧 Tool call: <code>Bash</code> — Check how the log marks app-generated user entries</summary>

```json
{
  "command": "python3 - << 'EOF'\nimport json\nfor line in open('/root/.claude/projects/-home-claude/556cd3f9-b98d-5d33-928c-214cdccd717e.jsonl'):\n    d=json.loads(line)\n    if d.get('type')!='user': continue\n    c=d['message']['content']\n    if isinstance(c,list) and all(b.get('type')=='tool_result' for b in c): continue\n    txt=c if isinstance(c,str) else ' '.join(b.get('text','') for b in c if b.get('type')=='text')\n    print({k:d.get(k) for k in ('isMeta','userType','origin','isVisibleInTranscriptOnly','isCompactSummary') if k in d}, repr(txt[:70]))\nEOF\ngrep -c 'Tool call: <code>WebSearch' session-00-requirements.md",
  "description": "Check how the log marks app-generated user entries"
}
```

</details>

<details><summary>Tool result</summary>

```
{'userType': 'ant'} '[Attachment from earlier in this conversation: file 0f8c067c-cec8-503f'
{'userType': 'ant'} "<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Mess"
{'isMeta': True, 'userType': 'external'} "<system-reminder>\nThis session is now linked to one of the user's comp"
{'isMeta': True, 'userType': 'external'} '@"/root/.claude/uploads/556cd3f9-b98d-5d33-928c-214cdccd717e/0f8c067c-'
{'isMeta': True, 'userType': 'external'} 'The files from earlier in this conversation were delivered automatical'
{'userType': 'external', 'origin': {'kind': 'human'}} "<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Mess"
{'userType': 'external', 'origin': {'kind': 'human'}} "<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Mess"
{'userType': 'external', 'origin': {'kind': 'human'}} "<system-reminder>The user's timezone is Asia/Karachi (UTC+05:00). Mess"
1
```

</details>

---

*[Owner redaction, 2026-10-19: the rest of this session is not published. It covered only how this transcript itself was rendered and redacted (18 Oct, from 23:55 PKT), and those tool calls printed personal details in plain text. No requirements work happened after this point. The PDF version, `session-00-requirements.pdf`, ends at the same place.]*
