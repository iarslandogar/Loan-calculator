# Subagent 14: test-designer: Make AC-8.1 assertion portable

Subagent **`test-designer`**, task: *Make AC-8.1 assertion portable*. Started 2026-10-18 16:23 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 16:23 PKT

> Owner-approved post-G3 fix to ONE line of a frozen test (decision D-59 in docs/spec/decision-log.md — read it first). Do exactly this and nothing else.
> 
> File: e2e/s08-keyboard.spec.ts, test `[AC-8.1] Tab order on a first visit, and Shift+Tab in reverse`. After `await page.keyboard.press('Tab')` and `await expect(clearAllBtn(page)).not.toBeFocused()`, the next line is:
>     await expect(resetBtn(page)).not.toBeFocused()
> Replace ONLY that line with a portable check that holds in Chromium, Firefox and WebKit: after the Tab, `document.activeElement` is either the Reset button itself, or `document.body` / `document.documentElement` / null (focus left the page content) — and NOT any other element. Use the existing `resetBtn(page)` locator to identify the Reset element (e.g. `await resetBtn(page).evaluate(...)` comparing against `document.activeElement`), with a clear assertion message. Keep everything else in the file unchanged.
> 
> Reason: Playwright's Firefox keeps focus on the last tabbable element when Tab is pressed past it; Chromium/WebKit move it to BODY. The old line tested that browser quirk.
> 
> Then run `npx prettier --check e2e/s08-keyboard.spec.ts`, `npx eslint e2e/s08-keyboard.spec.ts --max-warnings 0`, `npm run typecheck`, and `CI=1 npx playwright test e2e/s08-keyboard.spec.ts --grep "AC-8\.1\]"` (all three browsers; make sure nothing is listening on port 4173 first and leave nothing behind). Report `git diff -- e2e/` verbatim and the test results. Do not commit.

<details><summary>🔧 4 tool call(s): Grep ×2, Edit, Bash</summary>

- **Grep** · D-59

```json
{
 "pattern": "D-59",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "output_mode": "content",
 "-A": 8
}
```

  Result:
```
75:| D-59 | Post-G3 fix: portable AC-8.1 "Tab past the last control" assertion | Approved (owner), 2026-10-18 |
76-
77-**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.
78-
79----
80-
81-### D-01 Three roles
82-- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
83-- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One "user" role could not justify those stories.
--
532:### D-59 Post-G3 fix: portable AC-8.1 assertion (owner-approved change to a frozen test)
533-- **Defect (G45-4):** in `e2e/s08-keyboard.spec.ts`, `[AC-8.1] Tab order on a first visit` asserts `expect(resetBtn(page)).not.toBeFocused()` after pressing Tab past Reset, the last tabbable control. Playwright's Firefox keeps focus on the last element in that case, while Chromium and WebKit move it to `BODY`. This was shown on a neutral page by both the developer and the reviewer. The line tests browser behaviour, not the app.
534-- **Decision (owner, 2026-10-18):** replace only that line with a portable check: after the Tab, focus is on Reset or has left the page content (`body` or `document`), but is **not on any other element of the page**. The `clearAllBtn not.toBeFocused()` check before it stays. The `test-designer` makes the edit, and the owner sees the diff.
535-- **Rejected:** removing the line (it loses the "no unexpected focus" check); leaving it failing (S-8 could never be Implemented).
536-
537-### D-47 Group 2 builds the schedule table; cross-group ACs reported as pending
538-- **Decision:** The shared helper `expectResultsShown` requires the schedule table, so group 2 builds `ScheduleTable` too; group 3 then verifies S-10 and S-13. AC-4.4 needs the Theme and Currency selects (group 4), and AC-9.2 needs saved calculations (group 5), so they are reported at G4.2 as **pending later groups**, not as done.
539-
540----
```

- **Grep** · resetBtn\(page\)\).not.toBeFocused

```json
{
 "pattern": "resetBtn\\(page\\)\\).not.toBeFocused",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\s08-keyboard.spec.ts",
 "output_mode": "content",
 "-B": 3
}
```

  Result:
```
53-    await expect(clearAllBtn(page)).toBeDisabled()
54-    await page.keyboard.press('Tab')
55-    await expect(clearAllBtn(page)).not.toBeFocused()
56:    await expect(resetBtn(page)).not.toBeFocused()
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s08-keyboard.spec.ts

Replace:
```
await expect(resetBtn(page)).not.toBeFocused()
```
With:
```
// Portable across browsers (D-59): Firefox keeps focus on the last control, Chromium/WebKit move it to body.
    const focusIsOnResetOrLeftPage = await resetBtn(page).evaluate(
      (el) =>
        document.activeElement === el ||
        document.activeElement === null ||
        document.activeElement === document.body ||
        document.activeElement === document.documentElement,
    )
    expect(
      focusIsOnResetOrLeftPage,
      'after Tab past the last control, focus must be on Reset or have left the page content, not on any other element',
    ).toBe(true)
```

- **Bash**

```bash
npx prettier --check e2e/s08-keyboard.spec.ts; echo P=$?; npx eslint e2e/s08-keyboard.spec.ts --max-warnings 0; echo E=$?; npm run typecheck 2>&1 | tail -5; echo T=$?; netstat -ano | grep :4173; git diff -- e2e/ 2>&1 | head -40
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s08-keyboard.spec.ts has been updated successfully.
```

  Result:
```
Checking formatting...
All matched files use Prettier code style!
P=0
E=0

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

T=0
diff --git a/e2e/s08-keyboard.spec.ts b/e2e/s08-keyboard.spec.ts
index a668acd..59e7a37 100644
--- a/e2e/s08-keyboard.spec.ts
+++ b/e2e/s08-keyboard.spec.ts
@@ -53,7 +53,18 @@ test.describe('S-8 Keyboard', () => {
     await expect(clearAllBtn(page)).toBeDisabled()
     await page.keyboard.press('Tab')
     await expect(clearAllBtn(page)).not.toBeFocused()
-    await expect(resetBtn(page)).not.toBeFocused()
+    // Portable across browsers (D-59): Firefox keeps focus on the last control, Chromium/WebKit move it to body.
+    const focusIsOnResetOrLeftPage = await resetBtn(page).evaluate(
+      (el) =>
+        document.activeElement === el ||
+        document.activeElement === null ||
+        document.activeElement === document.body ||
+        document.activeElement === document.documentElement,
+    )
+    expect(
+      focusIsOnResetOrLeftPage,
+      'after Tab past the last control, focus must be on Reset or have left the page content, not on any other element',
+    ).toBe(true)
 
     // Back in, then reverse the whole way.
     await resetBtn(page).focus()
```

</details>

### 🤖 Claude · 2026-10-18 16:23 PKT

Port 4173 is free. Running the test.

<details><summary>🔧 2 tool call(s): Bash, SubagentHandback</summary>

- **Bash**

```bash
CI=1 npx playwright test e2e/s08-keyboard.spec.ts --grep "AC-8\.1\]" 2>&1 | tail -20; netstat -ano | grep :4173 | head
```

  Result:
```
Running 6 tests using 4 workers

  ok 1 [chromium] › e2e\s08-keyboard.spec.ts:74:3 › S-8 Keyboard › [AC-8.1] Tab order continues through the schedule, each entry, and Clear all (2.0s)
  ok 3 [chromium] › e2e\s08-keyboard.spec.ts:39:3 › S-8 Keyboard › [AC-8.1] Tab order on a first visit, and Shift+Tab in reverse (1.6s)
  ok 4 [firefox] › e2e\s08-keyboard.spec.ts:39:3 › S-8 Keyboard › [AC-8.1] Tab order on a first visit, and Shift+Tab in reverse (6.6s)
  ok 5 [webkit] › e2e\s08-keyboard.spec.ts:39:3 › S-8 Keyboard › [AC-8.1] Tab order on a first visit, and Shift+Tab in reverse (6.5s)
  ok 6 [webkit] › e2e\s08-keyboard.spec.ts:74:3 › S-8 Keyboard › [AC-8.1] Tab order continues through the schedule, each entry, and Clear all (7.5s)
  ok 2 [firefox] › e2e\s08-keyboard.spec.ts:74:3 › S-8 Keyboard › [AC-8.1] Tab order continues through the schedule, each entry, and Clear all (10.7s)

  6 passed (19.9s)
  TCP    [::1]:49672            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:49688            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:49690            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:49691            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:50816            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:58136            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:62404            [::1]:4173             TIME_WAIT       0
  TCP    [::1]:62405            [::1]:4173             TIME_WAIT       0
```

- **SubagentHandback**

````json
{
 "message": "D-59 edit done in C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\s08-keyboard.spec.ts. Only the `await expect(resetBtn(page)).not.toBeFocused()` line was replaced. Nothing else changed and nothing is committed.\n\nThe new check passes if `document.activeElement` is the Reset button, null, `document.body` or `document.documentElement`. It fails if focus is on any other element. The `clearAllBtn(page)` `not.toBeFocused()` check before it is unchanged. One thing to know: the check is a plain `expect(...).toBe(true)` with a custom message, not a retrying assertion. It reads focus once, immediately after the Tab.\n\nResults:\n- Prettier: pass.\n- ESLint (`--max-warnings 0`): exit 0.\n- `npm run typecheck`: exit 0.\n- Port 4173 was free before the run.\n- `CI=1 npx playwright test e2e/s08-keyboard.spec.ts --grep \"AC-8\\.1\\]\"`: 6 passed (19.9s). Both AC-8.1 tests passed in Chromium, Firefox and WebKit, including `[AC-8.1] Tab order on a first visit, and Shift+Tab in reverse` in all three.\n- After the run, only TIME_WAIT sockets remain on 4173 (closed connections, no listener), so no server was left running.\n- The repo is not a git repository per my environment, but `git diff -- e2e/` still returned output, so the diff below is the real one.\n\n`git diff -- e2e/`:\n```\ndiff --git a/e2e/s08-keyboard.spec.ts b/e2e/s08-keyboard.spec.ts\nindex a668acd..59e7a37 100644\n--- a/e2e/s08-keyboard.spec.ts\n+++ b/e2e/s08-keyboard.spec.ts\n@@ -53,7 +53,18 @@ te
… [933 more characters not shown; see raw/]
````

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

