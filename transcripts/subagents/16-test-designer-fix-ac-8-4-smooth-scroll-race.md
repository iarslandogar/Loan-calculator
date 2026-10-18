# Subagent 16: test-designer: Fix AC-8.4 smooth-scroll race

Subagent **`test-designer`**, task: *Fix AC-8.4 smooth-scroll race*. Started 2026-10-18 17:01 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 17:01 PKT

> Owner-approved post-G3 fix to ONE frozen test (decision D-61 in docs/spec/decision-log.md — read it first). Do exactly this and nothing else.
> 
> File: e2e/s08-keyboard.spec.ts, test `[AC-8.4] arrow keys and Page Up/Down scroll the focused schedule`. Today, after each `page.keyboard.press(...)` + `await expect.poll(top)...` the test immediately reads `const afterX = await top()` as the next baseline. Chromium animates keyboard scrolling, so that read can land mid-animation and the next comparison races (observed: `Expected: < 407, Received: 416`).
> 
> Change: after each of the four key presses, once the existing poll has passed, wait until the scroll position has SETTLED (e.g. a small local helper that polls `top()` until two reads ~100 ms apart are equal, bounded by the default expect timeout) and use that settled value as the baseline for the next step. Keep the four existing directional assertions exactly as they are (ArrowDown > 0; PageDown > afterArrow + 20; PageUp < afterPage; ArrowUp < afterPageUp). Do not change any other test or file; do not touch playwright.config.ts.
> 
> Then: `npx prettier --check e2e/s08-keyboard.spec.ts`, `npx eslint e2e/s08-keyboard.spec.ts --max-warnings 0`, `npm run typecheck`, and a stress run: make sure nothing is listening on port 4173, then `CI=1 npx playwright test e2e/s08-keyboard.spec.ts --grep "AC-8\.4\]" --repeat-each=30 --workers=4` (all three browsers). Report `git diff -- e2e/` verbatim and the pass/fail counts per browser. Leave nothing on port 4173. Do not commit.

<details><summary>🔧 7 tool call(s): Grep ×2, Read, Bash ×3, SubagentHandback</summary>

- **Grep** · D-61

```json
{
 "pattern": "D-61",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "output_mode": "content",
 "-A": 8
}
```

  Result:
```
77:| D-61 | Post-G3 fix: AC-8.4 waits for scrolling to settle | Approved (owner), 2026-10-18 |
78-
79-**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.
80-
81----
82-
83-### D-01 Three roles
84-- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
85-- **Why:** Their needs differ, and those differences explain why history, delete, keyboard speed and the schedule exist. One "user" role could not justify those stories.
--
556:### D-61 Post-G3 fix: AC-8.4 waits for scrolling to settle (owner-approved change to a frozen test)
557-- **Defect (G46-1, Blocker at G4.6):** `[AC-8.4]` in `e2e/s08-keyboard.spec.ts` reads `scrollTop` as its next baseline straight after a poll succeeds. Chromium animates keyboard scrolling, so the baseline can be read mid-animation and the next comparison races. Evidence: 6 of 9 isolated reviewer runs failed; the developer saw 1 in 40 fail under load (`Expected: < 407, Received: 416`). The app is correct.
558-- **Decision (owner, 2026-10-18):** after each key press, the test waits until `scrollTop` stops changing before it records the baseline. The assertions are unchanged: ArrowDown and PageDown move down, PageUp and ArrowUp move back up. The `test-designer` makes the edit, and the owner sees the diff. `playwright.config.ts` is not changed.
559-- **Rejected:** `--disable-smooth-scrolling` for Chromium. It changes how Chromium scrolls in every test and leaves the race in the test.
560-
561-### D-47 Group 2 builds the schedule table; cross-group ACs reported as pending
562-- **Decision:** The shared helper `expectResultsShown` requires the schedule table, so group 2 builds `ScheduleTable` too; group 3 then verifies S-10 and S-13. AC-4.4 needs the Theme and Currency selects (group 4), and AC-9.2 needs saved calculations (group 5), so they are reported at G4.2 as **pending later groups**, not as done.
563-
564----
```

- **Grep** · AC-8\.4\] arrow

```json
{
 "pattern": "AC-8\\.4\\] arrow",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\s08-keyboard.spec.ts",
 "output_mode": "content",
 "-n": true
}
```

  Result:
```
169:  test('[AC-8.4] arrow keys and Page Up/Down scroll the focused schedule', async ({ page }) => {
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s08-keyboard.spec.ts

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\s08-keyboard.spec.ts",
 "offset": 150,
 "limit": 70
}
```

  Result:
```
150	      const stops: (Awaited<ReturnType<typeof probe>> | 'missing')[] = [await probe()]
151	      // Currency, amount, rate, tenure, unit, Calculate, Reset, schedule, Restore, Delete, Clear all.
152	      for (let i = 0; i < 11; i++) {
153	        await page.keyboard.press('Tab')
154	        stops.push((await probe()) ?? 'missing')
155	      }
156	      expect(stops).toHaveLength(12)
157	      stops.forEach((s, i) => {
158	        expect(s, `stop ${i} has focus`).not.toBe('missing')
159	        expect(s, `stop ${i} has focus`).not.toBeNull()
160	        if (s && s !== 'missing') {
161	          expect(s.style, `stop ${i} (${s.tag}) outline style`).not.toBe('none')
162	          expect(s.width, `stop ${i} (${s.tag}) outline width`).toBeGreaterThanOrEqual(2)
163	        }
164	      })
165	      await expect(clearAllBtn(page)).toBeFocused()
166	    })
167	  }
168	
169	  test('[AC-8.4] arrow keys and Page Up/Down scroll the focused schedule', async ({ page }) => {
170	    await open(page)
171	    await calculateLoan(page, LOANS.B)
172	    const region = scheduleRegion(page)
173	    await expect(scheduleTable(page).getByRole('row')).toHaveCount(61)
174	    const dims = await region.evaluate((el) => ({ sh: el.scrollHeight, ch: el.clientHeight }))
175	    expect(dims.sh).toBeGreaterThan(dims.ch)
176	    await region.focus()
177	    await expect(region).toBeFocused()
178	    const top = () => region.evaluate((el) => el.scrollTop)
179	    expect(await top()).toBe(0)
180	
181	    await page.keyboard.press('ArrowDown')
182	    await expect.poll(top).toBeGreaterThan(0)
183	    const afterArrow = await top()
184	
185	    await page.keyboard.press('PageDown')
186	    await expect.poll(top).toBeGreaterThan(afterArrow + 20)
187	    const afterPage = await top()
188	
189	    await page.keyboard.press('PageUp')
190	    await expect.poll(top).toBeLessThan(afterPage)
191	    const afterPageUp = await top()
192	
193	    await page.keyboard.press('ArrowUp')
194	    await expect.poll(top).toBeLessThan(afterPageUp)
195	  })
196	
197	  test.describe('Clear all dialog', () => {
198	    test.beforeEach(async ({ page }) => {
199	      await open(page)
200	      await calculateLoan(page, LOANS.A)
201	      await expect(historyItems(page)).toHaveCount(1)
202	    })
203	
204	    async function focusIsNeverBehindDialog(page: Page) {
205	      const ok = await page.evaluate(() => {
206	        const a = document.activeElement
207	        const d = document.querySelector('dialog[open]')
… [589 more characters not shown; see raw/]
```

- **Bash**

```bash
python - <<'E'
p='e2e/s08-keyboard.spec.ts'
s=open(p,encoding='utf-8').read()
s=s.replace("""    expect(await top()).toBe(0)

    await page.keyboard.press('ArrowDown')""","""    expect(await top()).toBe(0)
    // Chromium animates keyboard scrolling: wait until two reads ~100 ms apart agree.
    const settled = async () => {
      let stable = -1
      await expect
        .poll(async () => {
          const a = await top()
          await page.waitForTimeout(100)
          const b = await top()
          stable = b
          return a === b
        })
        .toBe(true)
      return stable
    }

    await page.keyboard.press('ArrowDown')""")
for n in ['afterArrow','afterPage','afterPageUp']:
    s=s.replace("const %s = await top()"%n,"const %s = await settled()"%n)
open(p,'w',encoding='utf-8').write(s)
E
npx prettier --check e2e/s08-keyboard.spec.ts; npx eslint e2e/s08-keyboard.spec.ts --max-warnings 0; npm run typecheck 2>&1 | tail -5; netstat -ano | grep :4173
```

  Result:
```
Checking formatting...
[[33mwarn[39m] e2e/s08-keyboard.spec.ts
[[33mwarn[39m] Code style issues found in the above file. Run Prettier with --write to fix.

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b
```

- **Bash**

```bash
npx prettier --write e2e/s08-keyboard.spec.ts && npx prettier --check e2e/s08-keyboard.spec.ts && npx eslint e2e/s08-keyboard.spec.ts --max-warnings 0 && echo LINTOK; CI=1 npx playwright test e2e/s08-keyboard.spec.ts --grep "AC-8\.4\]" --repeat-each=30 --workers=4 --reporter=list 2>&1 | grep -v "^\s*✓" | tail -30; netstat -ano | grep :4173
```

  Result:
```
e2e/s08-keyboard.spec.ts 111ms
Checking formatting...
All matched files use Prettier code style!
LINTOK
  ok 64 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.4s)
  ok 60 [firefox] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (11.5s)
  ok 65 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.8s)
  ok 66 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (5.3s)
  ok 67 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.8s)
  ok 68 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.9s)
  ok 69 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.6s)
  ok 70 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.6s)
  ok 71 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.6s)
  ok 72 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.8s)
  ok 73 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.8s)
  ok 74 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.2s)
  ok 75 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.5s)
  ok 76 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.3s)
  ok 77 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.5s)
  ok 78 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.3s)
  ok 79 [webkit] › e2e\s08-keyboard.spec.ts:169:3 › S-8 Keyboard › [AC-8.4] arrow keys and Page Up/Down scroll the focused schedule (4.2s)
  ok 80 [webkit] › e2e\s08-keyb
… [4,252 more characters not shown; see raw/]
```

- **Bash**

```bash
git diff -- e2e/ 2>&1 | head -60; netstat -ano | grep :4173 | grep -c LISTEN
```

  Result:
```
diff --git a/e2e/s08-keyboard.spec.ts b/e2e/s08-keyboard.spec.ts
index 59e7a37..5edd892 100644
--- a/e2e/s08-keyboard.spec.ts
+++ b/e2e/s08-keyboard.spec.ts
@@ -177,18 +177,32 @@ test.describe('S-8 Keyboard', () => {
     await expect(region).toBeFocused()
     const top = () => region.evaluate((el) => el.scrollTop)
     expect(await top()).toBe(0)
+    // Chromium animates keyboard scrolling: wait until two reads ~100 ms apart agree.
+    const settled = async () => {
+      let stable = -1
+      await expect
+        .poll(async () => {
+          const a = await top()
+          await page.waitForTimeout(100)
+          const b = await top()
+          stable = b
+          return a === b
+        })
+        .toBe(true)
+      return stable
+    }
 
     await page.keyboard.press('ArrowDown')
     await expect.poll(top).toBeGreaterThan(0)
-    const afterArrow = await top()
+    const afterArrow = await settled()
 
     await page.keyboard.press('PageDown')
     await expect.poll(top).toBeGreaterThan(afterArrow + 20)
-    const afterPage = await top()
+    const afterPage = await settled()
 
     await page.keyboard.press('PageUp')
     await expect.poll(top).toBeLessThan(afterPage)
-    const afterPageUp = await top()
+    const afterPageUp = await settled()
 
     await page.keyboard.press('ArrowUp')
     await expect.poll(top).toBeLessThan(afterPageUp)
0
```

- **SubagentHandback**

````json
{
 "message": "D-61 fix applied to e2e/s08-keyboard.spec.ts (AC-8.4 test only). Nothing else changed, nothing committed.\n\nChecks:\n- prettier: the first check flagged the file, so I ran `prettier --write` on that one file. It now passes.\n- eslint with --max-warnings 0: clean.\n- `npm run typecheck`: clean.\n- Stress run (`CI=1 npx playwright test e2e/s08-keyboard.spec.ts --grep \"AC-8\\.4\\]\" --repeat-each=30 --workers=4`): 90 passed, 0 failed (4.2m). That is 30 each on Chromium, Firefox and WebKit.\n- Port 4173: I did not check it before the run. Afterwards nothing is listening on it, only TIME_WAIT sockets.\n\n`git diff -- e2e/` verbatim:\n```\ndiff --git a/e2e/s08-keyboard.spec.ts b/e2e/s08-keyboard.spec.ts\nindex 59e7a37..5edd892 100644\n--- a/e2e/s08-keyboard.spec.ts\n+++ b/e2e/s08-keyboard.spec.ts\n@@ -177,18 +177,32 @@ test.describe('S-8 Keyboard', () => {\n     await expect(region).toBeFocused()\n     const top = () => region.evaluate((el) => el.scrollTop)\n     expect(await top()).toBe(0)\n+    // Chromium animates keyboard scrolling: wait until two reads ~100 ms apart agree.\n+    const settled = async () => {\n+      let stable = -1\n+      await expect\n+        .poll(async () => {\n+          const a = await top()\n+          await page.waitForTimeout(100)\n+          const b = await top()\n+          stable = b\n+          return a === b\n+        })\n+        .toBe(true)\n+      return stable\n+    }\n \n     await page.keyboard.press('ArrowDown')\n     awa
… [705 more characters not shown; see raw/]
````

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

