# Subagent 06: test-designer: Fix AC-9.2 expected strings

Subagent **`test-designer`**, task: *Fix AC-9.2 expected strings*. Started 2026-10-18 00:45 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 00:45 PKT

> Owner-approved post-G3 fix to ONE frozen test (decision D-46 in docs/spec/decision-log.md — read it first). Do exactly this and nothing else:
> 
> In e2e/s09-reset.spec.ts, test `[AC-9.2] Reset leaves currency, theme and saved calculations alone`, change only the two expected strings in the final assertions:
> - `'Rs 2,500,000.00 at 18% for 5 years'` → `'$2,500,000.00 at 18% for 5 years'`
> - `'Rs 1,000,000.00 at 12% for 1 year'` → `'$1,000,000.00 at 12% for 1 year'`
> 
> Reason: the test switches to USD before calculating, so both entries are saved in USD and, per spec §9.2 / AC-7.5, show `$`. Leave the setup, every other assertion, and every other file untouched.
> 
> Then run `npx prettier --check e2e/s09-reset.spec.ts`, `npx eslint e2e/s09-reset.spec.ts --max-warnings 0` and `npm run typecheck`, and report `git diff -- e2e/` verbatim. Do not commit.

<details><summary>🔧 6 tool call(s): Grep ×2, Edit ×2, Bash, SubagentHandback</summary>

- **Grep** · D-46

```json
{
 "pattern": "D-46",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "output_mode": "content",
 "-A": 6
}
```

  Result:
```
62:| D-46 | Post-G3 test fix: AC-9.2 expected currency | Approved (owner), 2026-10-18 |
63-| D-47 | Group 2 builds the schedule table; cross-group ACs reported as pending | Developer decision (owner informed), 2026-10-18 |
64-
65-**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.
66-
67----
68-
--
374:### D-46 Post-G3 test fix: AC-9.2 expected currency (owner-approved change to a frozen test)
375-- **Found by:** Claude Code, while reading the group 2 specs before writing any UI code. The developer stopped and raised it, per CLAUDE.md.
376-- **Defect:** in `e2e/s09-reset.spec.ts`, `[AC-9.2]` switches to USD, *then* calculates L-A and L-B, but expects the entries to read `Rs 2,500,000.00 …` and `Rs 1,000,000.00 …`. Under spec §9.2 and AC-7.5, entries keep the currency they were calculated in, so a correct app shows `$2,500,000.00 at 18% for 5 years` and `$1,000,000.00 at 12% for 1 year`. The AC is right; the test's expected strings are wrong.
377-- **Decision (owner, 2026-10-18):** Change only those two expected strings to the `$` form; the setup stays as it is. The `test-designer` (not the developer) makes the edit, and the owner sees the diff. The reviewer's freeze check will show this change after `g3-tests-approved`; this entry is its authorisation.
378-- **Rejected alternative:** calculate in PKR first, then switch to USD.
379-
380-### D-47 Group 2 builds the schedule table; cross-group ACs reported as pending
```

- **Grep** · Rs 2,500,000.00 at 18%|Rs 1,000,000.00 at 12%

```json
{
 "pattern": "Rs 2,500,000.00 at 18%|Rs 1,000,000.00 at 12%",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\s09-reset.spec.ts",
 "output_mode": "content"
}
```

  Result:
```
87:    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')
88:    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s09-reset.spec.ts

Replace:
```
'Rs 2,500,000.00 at 18% for 5 years'
```
With:
```
'$2,500,000.00 at 18% for 5 years'
```

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s09-reset.spec.ts

Replace:
```
'Rs 1,000,000.00 at 12% for 1 year'
```
With:
```
'$1,000,000.00 at 12% for 1 year'
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s09-reset.spec.ts has been updated successfully.
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\s09-reset.spec.ts has been updated successfully.
```

- **Bash**

```bash
npx prettier --check e2e/s09-reset.spec.ts; echo "prettier=$?"; npx eslint e2e/s09-reset.spec.ts --max-warnings 0; echo "eslint=$?"; npm run typecheck 2>&1 | tail -5; echo "tc=${PIPESTATUS[0]}"; git diff -- e2e/; echo "gitdiff=$?"
```

  Result:
```
Checking formatting...
All matched files use Prettier code style!
prettier=0
eslint=0

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

tc=0
diff --git a/e2e/s09-reset.spec.ts b/e2e/s09-reset.spec.ts
index 0acac11..3b699ab 100644
--- a/e2e/s09-reset.spec.ts
+++ b/e2e/s09-reset.spec.ts
@@ -84,8 +84,8 @@ test.describe('S-9 Reset', () => {
     expect(await selectedText(themeSel(page))).toBe('Dark')
     await expectTheme(page, 'dark')
     await expect(historyItems(page)).toHaveCount(2)
-    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')
-    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')
+    await expect(historyItems(page).nth(0)).toContainText('$2,500,000.00 at 18% for 5 years')
+    await expect(historyItems(page).nth(1)).toContainText('$1,000,000.00 at 12% for 1 year')
   })
 
   test('[AC-9.3] Reset on an empty form changes nothing and shows no error', async ({ page }) => {
gitdiff=0
```

- **SubagentHandback**

````json
{
 "message": "I changed the two expected strings in `[AC-9.2]` in `C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\s09-reset.spec.ts`, as D-46 authorises. I touched nothing else and did not commit.\n\nChecks (all passed):\n- `npx prettier --check e2e/s09-reset.spec.ts`: exit 0.\n- `npx eslint e2e/s09-reset.spec.ts --max-warnings 0`: exit 0.\n- `npm run typecheck` (`tsc -b`): exit 0.\n\n`git diff -- e2e/` verbatim:\n```\ndiff --git a/e2e/s09-reset.spec.ts b/e2e/s09-reset.spec.ts\nindex 0acac11..3b699ab 100644\n--- a/e2e/s09-reset.spec.ts\n+++ b/e2e/s09-reset.spec.ts\n@@ -84,8 +84,8 @@ test.describe('S-9 Reset', () => {\n     expect(await selectedText(themeSel(page))).toBe('Dark')\n     await expectTheme(page, 'dark')\n     await expect(historyItems(page)).toHaveCount(2)\n-    await expect(historyItems(page).nth(0)).toContainText('Rs 2,500,000.00 at 18% for 5 years')\n-    await expect(historyItems(page).nth(1)).toContainText('Rs 1,000,000.00 at 12% for 1 year')\n+    await expect(historyItems(page).nth(0)).toContainText('$2,500,000.00 at 18% for 5 years')\n+    await expect(historyItems(page).nth(1)).toContainText('$1,000,000.00 at 12% for 1 year')\n   })\n \n   test('[AC-9.3] Reset on an empty form changes nothing and shows no error', async ({ page }) => {\n```"
}
````

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

