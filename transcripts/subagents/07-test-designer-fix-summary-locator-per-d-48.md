# Subagent 07: test-designer: Fix summary() locator per D-48

Subagent **`test-designer`**, task: *Fix summary() locator per D-48*. Started 2026-10-18 00:54 PKT. The first message is the brief the developer (main session) gave it.

## 🧑 Brief from the developer · 2026-10-18 00:54 PKT

> Owner-approved post-G3 fix to ONE frozen helper (decision D-48 in docs/spec/decision-log.md — read it first). Do exactly this and nothing else:
> 
> In e2e/fixtures.ts, the `summary` helper currently returns `p.getByRole('definition', { name, exact: true })`. Change only that expression to `p.getByLabel(name, { exact: true })`. Keep the function name, signature, parameter type and every other line of every file unchanged. If a comment directly above the helper describes the old locator, you may update that comment to say it uses getByLabel because Playwright never names the definition role (D-48).
> 
> Then run `npx prettier --check e2e/fixtures.ts`, `npx eslint e2e/fixtures.ts --max-warnings 0` and `npm run typecheck`, and report `git diff -- e2e/` verbatim. Do not commit.

<details><summary>🔧 3 tool call(s): Grep ×2, Read</summary>

- **Grep** · D-48

```json
{
 "pattern": "D-48",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\docs\\spec\\decision-log.md",
 "output_mode": "content",
 "-A": 8
}
```

  Result:
```
64:| D-48 | Post-G3 fix: summary figures located with `getByLabel` (supersedes part of D-43) | Approved (owner), 2026-10-18 |
65-| D-49 | Group 2 implementation choices | **Proposed**: developer decisions, owner to review at G4.2 |
66-
67-**How this log is kept (D-24):** every decision is recorded here, however small. Entries are never deleted or rewritten. A changed decision gets a new dated **Decision** line under its entry, or a new entry that names the one it supersedes, and a row in the change history.
68-
69----
70-
71-### D-01 Three roles
72-- **Proposal:** R-1 Prospective Borrower (decides whether to borrow), R-2 Loan Advisor (quotes customers professionally: speed, precision, recall, privacy), R-3 Existing Borrower (tracks a loan already running).
--
350:- **Decision (owner, 2026-10-18), superseded in part by D-48:** the "Summary figures" row was wrong. Playwright, following WAI-ARIA, never gives the `definition` (or `term`) role an accessible name, so `getByRole('definition', { name: 'Monthly payment' })` can match nothing, whatever the markup. The markup stays the same; tests locate the figures with `getByLabel` instead (D-48). This was the developer's error in writing D-43.
351-
352-### D-44 Test-designer interpretations (Proposed, owner to review at G3)
353-These readings were made while writing the tests. They become binding when the tests freeze.
354-1. **AC-8.1:** "the schedule area" is exactly one tab stop, the `role="region"` wrapper. Table cells are not focusable.
355-2. **AC-8.5:** "never moves focus to anything on the page behind the dialog" is checked as: after every Tab or Shift+Tab, the active element is inside the open dialog, or is `body`/`document` (focus has left to the browser UI, which a test can't observe).
356-3. **AC-5.2:** "every input, select and button" includes the disabled **Clear all** and every Restore/Delete button, measured after one calculation.
357-4. **AC-5.5:** "side by side" at 1280 px means the results text sits to the right of the Loan amount input and overlaps the form vertically. "Stacked" at 768 px and 360 px means the results start below the **Calculate** button.
358-5. **AC-11.2:** each history `<li>` shows its three lines as separate lines of `innerText`, in order (line1, line2, line3). The Restore/Delete labels are ignored.
--
383:### D-48 Post-G3 fix: summary figures located with `getByLabel` (owner-approved change to a frozen test)
384-- **Found by:** Claude Code in group 2. The first run with real 
… [1,487 more characters not shown; see raw/]
```

- **Grep** · definition

```json
{
 "pattern": "definition",
 "path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\fixtures.ts",
 "output_mode": "content",
 "-B": 6,
 "-A": 2
}
```

  Result:
```
197-export const calcBtn = (p: Page) => p.getByRole('button', { name: 'Calculate', exact: true })
198-export const resetBtn = (p: Page) => p.getByRole('button', { name: 'Reset', exact: true })
199-export const clearAllBtn = (p: Page) => p.getByRole('button', { name: 'Clear all', exact: true })
200-export const summary = (
201-  p: Page,
202-  name: 'Monthly payment' | 'Total interest' | 'Total amount payable',
203:) => p.getByRole('definition', { name, exact: true })
204-export const scheduleTable = (p: Page) => p.getByRole('table', { name: 'Repayment schedule' })
205-export const scheduleRegion = (p: Page) => p.getByRole('region', { name: 'Repayment schedule' })
--
263-  await expect(summary(page, 'Total interest')).toHaveText(loan.interest)
264-  await expect(summary(page, 'Total amount payable')).toHaveText(loan.total)
265-}
266-
267-export async function expectNoResults(page: Page): Promise<void> {
268-  await expect(page.getByText(COPY.idle, { exact: true })).toBeVisible()
269:  await expect(page.getByRole('definition')).toHaveCount(0)
270-  await expect(scheduleTable(page)).toHaveCount(0)
271-}
```

- **Read** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts

```json
{
 "file_path": "C:\\Users\\arslan.NINEALPHA\\muhammad-arslan-calculator\\e2e\\fixtures.ts",
 "offset": 190,
 "limit": 15
}
```

  Result:
```
190	// ---------------------------------------------------------------------------
191	export const themeSel = (p: Page) => p.getByLabel('Theme', { exact: true })
192	export const currencySel = (p: Page) => p.getByLabel('Currency', { exact: true })
193	export const amountIn = (p: Page) => p.getByLabel(/^Loan amount \((Rs|\$)\)$/)
194	export const rateIn = (p: Page) => p.getByLabel('Annual interest rate (%)', { exact: true })
195	export const tenureIn = (p: Page) => p.getByLabel('Loan tenure', { exact: true })
196	export const unitSel = (p: Page) => p.getByLabel('Tenure unit', { exact: true })
197	export const calcBtn = (p: Page) => p.getByRole('button', { name: 'Calculate', exact: true })
198	export const resetBtn = (p: Page) => p.getByRole('button', { name: 'Reset', exact: true })
199	export const clearAllBtn = (p: Page) => p.getByRole('button', { name: 'Clear all', exact: true })
200	export const summary = (
201	  p: Page,
202	  name: 'Monthly payment' | 'Total interest' | 'Total amount payable',
203	) => p.getByRole('definition', { name, exact: true })
204	export const scheduleTable = (p: Page) => p.getByRole('table', { name: 'Repayment schedule' })
```

</details>

### 🤖 Claude · 2026-10-18 00:54 PKT

No comment above the helper to update.

<details><summary>🔧 3 tool call(s): Edit, Bash, SubagentHandback</summary>

- **Edit** · C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts

Replace:
```
) => p.getByRole('definition', { name, exact: true })
```
With:
```
) => p.getByLabel(name, { exact: true })
```

- **Bash**

```bash
npx prettier --check e2e/fixtures.ts; echo "prettier=$?"; npx eslint e2e/fixtures.ts --max-warnings 0; echo "eslint=$?"; npm run typecheck 2>&1 | tail -15; echo "typecheck=${PIPESTATUS[0]}"; git diff -- e2e/ 2>&1 | head -30
```

  Result:
```
The file C:\Users\arslan.NINEALPHA\muhammad-arslan-calculator\e2e\fixtures.ts has been updated successfully.
```

  Result:
```
Checking formatting...
All matched files use Prettier code style!
prettier=0
eslint=0

> muhammad-arslan-calculator@0.0.0 typecheck
> tsc -b

typecheck=0
diff --git a/e2e/fixtures.ts b/e2e/fixtures.ts
index 6ee4cf5..d33d427 100644
--- a/e2e/fixtures.ts
+++ b/e2e/fixtures.ts
@@ -200,7 +200,7 @@ export const clearAllBtn = (p: Page) => p.getByRole('button', { name: 'Clear all
 export const summary = (
   p: Page,
   name: 'Monthly payment' | 'Total interest' | 'Total amount payable',
-) => p.getByRole('definition', { name, exact: true })
+) => p.getByLabel(name, { exact: true })
 export const scheduleTable = (p: Page) => p.getByRole('table', { name: 'Repayment schedule' })
 export const scheduleRegion = (p: Page) => p.getByRole('region', { name: 'Repayment schedule' })
 export const historyHeading = (p: Page) =>
```

- **SubagentHandback**

````json
{
 "message": "I changed the `summary` helper in `e2e/fixtures.ts` as D-48 describes. Prettier, ESLint and typecheck all pass. I did not commit, and I did not run the e2e suite.\n\nThe helper's expression is now `p.getByLabel(name, { exact: true })`. Nothing else changed. There was no comment directly above the helper, so I had no comment to update.\n\nChecks:\n- `npx prettier --check e2e/fixtures.ts`: exit 0, \"All matched files use Prettier code style!\"\n- `npx eslint e2e/fixtures.ts --max-warnings 0`: exit 0, no output.\n- `npm run typecheck` (`tsc -b`): exit 0, no errors.\n\n`git diff -- e2e/` verbatim:\n```\ndiff --git a/e2e/fixtures.ts b/e2e/fixtures.ts\nindex 6ee4cf5..d33d427 100644\n--- a/e2e/fixtures.ts\n+++ b/e2e/fixtures.ts\n@@ -200,7 +200,7 @@ export const clearAllBtn = (p: Page) => p.getByRole('button', { name: 'Clear all\n export const summary = (\n   p: Page,\n   name: 'Monthly payment' | 'Total interest' | 'Total amount payable',\n-) => p.getByRole('definition', { name, exact: true })\n+) => p.getByLabel(name, { exact: true })\n export const scheduleTable = (p: Page) => p.getByRole('table', { name: 'Repayment schedule' })\n export const scheduleRegion = (p: Page) => p.getByRole('region', { name: 'Repayment schedule' })\n export const historyHeading = (p: Page) =>\n```"
}
````

  Result:
```
{"success":true,"message":"Report delivered to your caller."}
```

</details>

