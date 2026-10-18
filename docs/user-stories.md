# User Stories with Acceptance Criteria

## Conventions

- **Story ID** `S-n`. **Acceptance criterion ID** `AC-n.m`, where n is the story number.
- Each story names its **role** (`app-roles.md`) and the **job** it serves (`jobs-to-be-done.md`).
- **Scope**: `v1` means we are building it now. `Backlog` means it is recorded for later and will not be built.
- **Status** reflects what the running app does *today*. Every story starts as `Not implemented`. A story moves to `Implemented` only when **all** of its acceptance criteria pass in automated tests **and** in a manual check by the human reviewer. If any criterion is not met, the story stays `Not implemented`, and a note says which criterion fails.
- Every acceptance criterion is covered by at least one automated test whose title starts with its ID, for example `[AC-2.4] ...`.
- Exact on-screen text (labels, messages) is defined in `spec/technical-spec.md` §7 (copy deck). Messages quoted below must match it character for character.
- Unless stated otherwise, examples assume the currency is **PKR**. Amounts in the summary are shown as `Rs 1,234.56`. In the schedule, the currency symbol appears only in the column headers.
- "Calculate" means selecting the **Calculate** button or pressing **Enter** in any input field.
- All reference figures were computed independently with exact decimal arithmetic using the algorithm in `spec/technical-spec.md` §5.

## Story index

| Story | Title | Role | Job | Scope | Status |
|---|---|---|---|---|---|
| S-1 | Calculate the monthly payment | R-1 | J-1 | v1 | Not implemented |
| S-2 | Clear messages for invalid input | R-1 | J-1 | v1 | Not implemented |
| S-3 | See total interest and total amount payable | R-1 | J-2 | v1 | Not implemented |
| S-4 | Results always match the inputs on screen | R-1 | J-1 | v1 | Not implemented |
| S-5 | Use it comfortably on a phone | R-1 | J-11 | v1 | Not implemented |
| S-6 | Choose a light or dark display | R-1 | J-10 | v1 | Not implemented |
| S-7 | Choose the currency amounts are shown in | R-1 | J-3 | v1 | Not implemented |
| S-8 | Work entirely from the keyboard | R-2 | J-4 | v1 | Not implemented |
| S-9 | Start a fresh quote in one step | R-2 | J-4 | v1 | Not implemented |
| S-10 | See how each payment splits into interest and principal | R-2 | J-5 | v1 | Not implemented |
| S-11 | Recall earlier calculations | R-2 | J-6 | v1 | Not implemented |
| S-12 | Delete saved calculations | R-2 | J-7 | v1 | Not implemented |
| S-13 | See the balance remaining after each payment | R-3 | J-8 | v1 | Not implemented |
| S-14 | Compare two loan offers side by side | R-1 | J-2 | Backlog | Not implemented |
| S-15 | Find the largest loan a monthly budget allows | R-1 | J-1 | Backlog | Not implemented |
| S-16 | Copy a quote summary to share | R-2 | J-4 | Backlog | Not implemented |
| S-17 | Export or print the repayment schedule | R-2 | J-5 | Backlog | Not implemented |
| S-18 | See the effect of an extra one-off repayment | R-3 | J-8 | Backlog | Not implemented |
| S-19 | See interest versus principal for each year | R-3 | J-9 | v1 | Not implemented |
| S-20 | See what share of the total cost is interest | R-1 | J-2 | v1 | Not implemented |
| S-21 | See the balance fall over time | R-3 | J-8 | v1 | Not implemented |
| S-22 | See how each payment splits between interest and principal | R-2 | J-5 | v1 | Not implemented |

## Reference loans used in the criteria

| Ref | Loan amount | Annual rate | Tenure | Monthly payment | Total interest | Total amount payable |
|---|---|---|---|---|---|---|
| L-A | 1,000,000 | 12% | 1 year (12 months) | Rs 88,848.79 | Rs 66,185.45 | Rs 1,066,185.45 |
| L-B | 2,500,000 | 18% | 5 years (60 months) | Rs 63,483.57 | Rs 1,309,014.14 | Rs 3,809,014.14 |
| L-C | 120,000 | 0% | 12 months | Rs 10,000.00 | Rs 0.00 | Rs 120,000.00 |
| L-D | 100,000 | 10% | 1 month | Rs 100,833.33 | Rs 833.33 | Rs 100,833.33 |
| L-MIN | 10 | 0.01% | 1 month | Rs 10.00 | Rs 0.00 | Rs 10.00 |
| L-MAX | 1,000,000,000,000,000 | 75% | 100 years (1,200 months) | Rs 62,500,000,000,000.00 | Rs 74,000,000,000,000,003.34 | Rs 75,000,000,000,000,003.34 |
| L-Z3 | 1,000 | 0% | 3 months | Rs 333.33 | Rs 0.00 | Rs 1,000.00 |

---

# v1 stories

## S-1 Calculate the monthly payment
**Role:** R-1 Prospective Borrower · **Serves:** J-1 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want to enter a loan amount, interest rate and tenure and get the monthly payment, so that I can check whether it fits my budget."

- **AC-1.1** Given an empty form, when I enter loan amount `1000000`, rate `12`, tenure `1` with unit **Years** and Calculate, then **Monthly payment** shows `Rs 88,848.79`.
- **AC-1.2** Given an empty form, when I enter `1000000`, `12`, tenure `12` with unit **Months** and Calculate, then **Monthly payment** shows `Rs 88,848.79` (the same as 1 year).
- **AC-1.3** Given L-B entered as `2500000`, `18`, `5` **Years**, when I Calculate, then **Monthly payment** shows `Rs 63,483.57`.
- **AC-1.4** Given a zero rate (L-C: `120000`, `0`, `12` **Months**), when I Calculate, then **Monthly payment** shows `Rs 10,000.00`.
- **AC-1.5** Given a one-month loan (L-D: `100000`, `10`, `1` **Months**), when I Calculate, then **Monthly payment** shows `Rs 100,833.33`.
- **AC-1.6** Given the smallest accepted values (L-MIN: `10`, `0.01`, `1` **Months**), when I Calculate, then **Monthly payment** shows `Rs 10.00`.
- **AC-1.7** Given the largest accepted values (L-MAX: `1000000000000000`, `75`, `100` **Years**), when I Calculate, then **Monthly payment** shows `Rs 62,500,000,000,000.00`.
- **AC-1.8** Given the loan amount is typed with thousands separators, as `1,000,000` or in lakh style as `10,00,000`, when I Calculate with `12` and `1` **Years**, then the result is the same as AC-1.1.
- **AC-1.9** Given values with leading or trailing spaces (`␣1000000␣`, `␣12␣`, `␣1␣`), when I Calculate, then the spaces are ignored and the result is the same as AC-1.1.
- **AC-1.10** Given the rate is typed with a trailing percent sign (`12%`), when I Calculate with `1000000` and `1` **Years**, then the result is the same as AC-1.1.
- **AC-1.11** Given I have just calculated L-A, when I Calculate again without changing anything, then the same results are shown again.
- **AC-1.12** Given a first visit, when the page loads, then the tenure unit is **Years**, all three inputs are empty, no results are shown, and the results area shows `Enter your loan details and select Calculate.`

## S-2 Clear messages for invalid input
**Role:** R-1 Prospective Borrower · **Serves:** J-1 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want to be told clearly what is wrong with what I typed, so that I can fix it and never act on a figure built from bad input."

Error messages appear directly below the field they refer to. While any error is shown, no results are shown.

- **AC-2.1** Given an empty form, when I Calculate, then I see `Enter a loan amount.`, `Enter an interest rate.` and `Enter a loan tenure.` under the matching fields, no results are shown, the results area shows `Enter your loan details and select Calculate.`, and focus moves to **Loan amount**.
- **AC-2.2** Given loan amount `abc` (rate `12`, tenure `1` **Years**), when I Calculate, then I see `Loan amount must be a number.` and no results.
- **AC-2.3** Given loan amount `1e6`, when I Calculate, then I see `Loan amount must be a number.` (scientific notation is not accepted).
- **AC-2.4** Given loan amount `0`, `-500` or `9.99` (each tried separately), when I Calculate, then I see `Loan amount must be between 10 and 1,000,000,000,000,000.`
- **AC-2.5** Given loan amount `1000000000000000.01`, when I Calculate, then I see `Loan amount must be between 10 and 1,000,000,000,000,000.`; and given loan amount `1000000000000000`, no loan-amount message is shown.
- **AC-2.6** Given loan amount `1000.555`, when I Calculate, then I see `Loan amount can have at most 2 decimal places.`
- **AC-2.7** Given rate `-1` or `75.01`, when I Calculate, then I see `Interest rate must be between 0 and 75%.`; and given rate `0` or `75`, no rate message is shown.
- **AC-2.8** Given rate `twelve`, when I Calculate, then I see `Interest rate must be a number.`; and given rate `12.345`, I see `Interest rate can have at most 2 decimal places.`
- **AC-2.9** Given tenure `2.5` with unit **Years**, when I Calculate, then I see `Loan tenure must be a whole number.`
- **AC-2.10** Given unit **Years** and tenure `0` or `101`, when I Calculate, then I see `Loan tenure must be between 1 and 100 years.`; given unit **Months** and tenure `0` or `1201`, I see `Loan tenure must be between 1 and 1,200 months.`; and tenure `100` **Years** or `1200` **Months** shows no tenure message.
- **AC-2.11** Given an invalid loan amount and an invalid rate with a valid tenure, when I Calculate, then both messages are shown at the same time and focus moves to **Loan amount** (the first invalid field).
- **AC-2.12** Given results for L-A are showing, when I change the loan amount to `abc` and Calculate, then the previous results and schedule are removed, `Loan amount must be a number.` is shown under **Loan amount**, and the results area shows `Enter your loan details and select Calculate.`
- **AC-2.13** Given a message is showing under **Loan amount** and another under **Annual interest rate**, when I type in the **Loan amount** field, then the loan-amount message disappears and the rate message stays until the next Calculate.
- **AC-2.14** Given any error is showing, when I correct the input to L-A values and Calculate, then the L-A results are shown and no error messages remain.
- **AC-2.15** Given a loan amount of 40 nines (`9999999999999999999999999999999999999999`), when I Calculate, then I see `Loan amount must be between 10 and 1,000,000,000,000,000.`, and when I then correct the inputs to L-A values and Calculate, the L-A results are shown.
- **AC-2.16** Given any invalid input in this story, when I Calculate, then the page never shows a blank screen or a browser error, and no uncaught error is raised in the browser console.
- **AC-2.17** Given loan amount `1,,000`, `1000,50`, `1,5`, `,1000` or `10,0000` (each tried separately, with rate `12` and tenure `1` **Years**), when I Calculate, then I see `Loan amount must be a number.` and no results. *(Commas are accepted only as thousands or lakh separators in the whole-number part.)*

## S-3 See total interest and total amount payable
**Role:** R-1 Prospective Borrower · **Serves:** J-2 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want to see the total interest and the total I will repay, so that I can compare the true cost of different offers."

- **AC-3.1** Given L-A, when I Calculate, then **Total interest** shows `Rs 66,185.45` and **Total amount payable** shows `Rs 1,066,185.45`.
- **AC-3.2** Given L-B, when I Calculate, then **Total interest** shows `Rs 1,309,014.14` and **Total amount payable** shows `Rs 3,809,014.14`.
- **AC-3.3** Given L-C (0%), when I Calculate, then **Total interest** shows `Rs 0.00` and **Total amount payable** shows `Rs 120,000.00`.
- **AC-3.4** Given L-MIN, when I Calculate, then **Total interest** shows `Rs 0.00` and **Total amount payable** shows `Rs 10.00`.
- **AC-3.5** Given L-MAX, when I Calculate, then **Total interest** shows `Rs 74,000,000,000,000,003.34` and **Total amount payable** shows `Rs 75,000,000,000,000,003.34`, in full, with no truncation, ellipsis or scientific notation.
- **AC-3.6** Given any valid inputs, when I Calculate, then loan amount + **Total interest** equals **Total amount payable** exactly, **Total interest** equals the sum of the schedule's Interest column, and **Total amount payable** equals the sum of the Payment column. *(Verified by a property test over at least 1,000 random valid inputs plus all reference loans.)*

## S-4 Results always match the inputs on screen
**Role:** R-1 Prospective Borrower · **Serves:** J-1 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want results to disappear as soon as I change an input, so that I never mistake old figures for the loan I am now looking at."

- **AC-4.1** Given results for L-A are showing, when I change the loan amount, the rate or the tenure value, then the results summary and the schedule are hidden and I see `Your inputs have changed. Select Calculate to see updated results.`
- **AC-4.2** Given results for L-A are showing, when I change the tenure unit from **Years** to **Months**, then the behaviour is the same as AC-4.1, and the tenure field keeps the number `1` (it is not converted).
- **AC-4.3** Given the message from AC-4.1 is showing, when I Calculate with valid inputs, then results for the new inputs are shown and the message disappears.
- **AC-4.4** Given results are showing, when I change the currency or the theme, then the results stay visible (these settings do not change the calculation).

## S-5 Use it comfortably on a phone
**Role:** R-1 Prospective Borrower · **Serves:** J-11 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want the calculator to work well on my phone, so that I can check an offer wherever I am."

- **AC-5.1** Given a viewport 360 px wide, when the page loads and after I calculate L-MAX (1,200 schedule rows), then the page never scrolls horizontally (document width ≤ viewport width).
- **AC-5.2** Given a viewport 360 px wide, then every input, select and button is at least 44 × 44 CSS px, and its bounding box lies horizontally within the viewport (from 0 to 360 px).
- **AC-5.3** Given a viewport 360 × 740 px and L-B results (60 rows), when I scroll the schedule, then the schedule scrolls inside its own area and its column headers stay visible while scrolling.
- **AC-5.4** Given any device, then **Loan amount** and **Annual interest rate** have `inputmode="decimal"` and **Loan tenure** has `inputmode="numeric"`, so that phones show a number keypad.
- **AC-5.5** Given a viewport 1280 px wide, then the form and the results sit side by side; given a viewport 768 px wide or narrower, they are stacked with the form above the results.
- **AC-5.6** Given a viewport 360 px wide and L-MAX results, then every amount in the summary is fully visible (wrapping onto a new line is allowed; clipping is not).

## S-6 Choose a light or dark display
**Role:** R-1 Prospective Borrower · **Serves:** J-10 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want the app to match a light or dark display, so that I can read figures comfortably at any time of day."

- **AC-6.1** Given no saved theme preference, when the page loads on a device set to dark mode, then the app uses the dark theme; on a device set to light mode, it uses the light theme.
- **AC-6.2** Given the **Theme** control offers `System`, `Light` and `Dark`, when I choose `Dark` on a device set to light mode, then the app switches to the dark theme immediately (and likewise for `Light`).
- **AC-6.3** Given I chose `Dark`, when I reload the page, then the dark theme is still used and `Dark` is still selected.
- **AC-6.4** Given `System` is selected, when the device switches between light and dark mode while the page is open, then the app follows without a reload.
- **AC-6.5** Given either theme, then body text and error text have a contrast ratio of at least 4.5:1 against their background. *(Checked against the theme colour tokens.)*
- **AC-6.6** Given the browser blocks storage, when I change the theme, then it changes for the current visit and no error is shown.

## S-7 Choose the currency amounts are shown in
**Role:** R-1 Prospective Borrower · **Serves:** J-3 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want to see amounts in Pakistani rupees or US dollars, so that the figures read like the quote I was given."

- **AC-7.1** Given a first visit, when the page loads, then **Currency** is `PKR (Rs)`, the loan amount label reads `Loan amount (Rs)`, and results for L-A show `Rs 88,848.79`.
- **AC-7.2** Given L-A results in PKR, when I select `USD ($)`, then every amount in the summary shows the `$` symbol (e.g. `$88,848.79`), the schedule headers show `($)`, the loan amount label reads `Loan amount ($)`, the numbers themselves are unchanged (no conversion), and the results stay visible.
- **AC-7.3** Given I selected `USD ($)`, when I reload the page, then `USD ($)` is still selected.
- **AC-7.4** Given the currency control is visible, then the note `Changing currency changes the symbol only. Amounts are not converted.` is shown next to it.
- **AC-7.5** Given a saved calculation made in PKR, when I switch to USD, then that saved entry still shows its amounts in `Rs`.

## S-8 Work entirely from the keyboard
**Role:** R-2 Loan Advisor · **Serves:** J-4 · **Scope:** v1 · **Status:** Not implemented

"As a Loan Advisor, I want to do everything from the keyboard, so that I can produce quotes quickly without reaching for the mouse."

- **AC-8.1** Given a first visit with no saved calculations, when I press Tab repeatedly, then focus moves in this order: **Theme** → **Currency** → **Loan amount** → **Annual interest rate** → **Loan tenure** → **Tenure unit** → **Calculate** → **Reset** (**Clear all** is disabled and skipped). Given L-A results are showing and two calculations are saved, the order continues after **Reset**: the schedule area → for each saved calculation, its **Restore** then its **Delete** → **Clear all**. In both cases Shift+Tab moves in reverse.
- **AC-8.2** Given valid L-A values, when I press Enter while focus is in **Loan amount**, **Annual interest rate** or **Loan tenure**, then the app calculates exactly as if I had selected **Calculate**.
- **AC-8.3** Given either theme, when any interactive element has keyboard focus, then a visible focus outline at least 2 px thick is shown around it.
- **AC-8.4** Given L-B results (60 rows), when the schedule area has focus, then the Up/Down arrow keys and Page Up/Page Down scroll it.
- **AC-8.5** Given the **Clear all** confirmation is open, then focus starts on **Cancel**; pressing Tab or Shift+Tab never moves focus to anything on the page behind the dialog; **Cancel** or Escape closes it without clearing and moves focus to **Clear all**; and pressing Tab from **Cancel** to reach **Clear**, then Enter, clears the history and moves focus to the **Saved calculations** heading.
- **AC-8.6** Given only a keyboard, when I enter L-A, calculate, enter L-B, calculate, restore the L-A entry, delete the L-B entry and clear all history, then every step succeeds without a mouse. *(One end-to-end keyboard-only test.)*

## S-9 Start a fresh quote in one step
**Role:** R-2 Loan Advisor · **Serves:** J-4 · **Scope:** v1 · **Status:** Not implemented

"As a Loan Advisor, I want to clear the form in one step, so that I can start the next quote immediately."

- **AC-9.1** Given inputs, results and/or error messages are showing, when I select **Reset**, then all three inputs are empty, the unit returns to **Years**, results, schedule, stale-results message and error messages are removed, the results area shows `Enter your loan details and select Calculate.`, and focus moves to **Loan amount**.
- **AC-9.2** Given currency `USD ($)`, theme `Dark` and two saved calculations, when I select **Reset**, then currency, theme and saved calculations are unchanged.
- **AC-9.3** Given an already empty form, when I select **Reset**, then the form stays empty and no error is shown.

## S-10 See how each payment splits into interest and principal
**Role:** R-2 Loan Advisor · **Serves:** J-5 · **Scope:** v1 · **Status:** Not implemented

"As a Loan Advisor, I want a month-by-month schedule showing interest and principal in each payment, so that I can explain exactly how the quote was reached."

- **AC-10.1** Given L-A, when I Calculate, then a **Repayment schedule** table with 12 rows and the columns **Month**, **Payment (Rs)**, **Interest (Rs)**, **Principal (Rs)**, **Balance (Rs)** is shown.
- **AC-10.2** Given L-A, then row 1 reads `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`.
- **AC-10.3** Given L-A, then row 12 reads `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`.
- **AC-10.4** Given any valid inputs, then in every row Payment = Interest + Principal exactly, and Interest = the opening balance × (annual rate ÷ 1,200), rounded half-up to 2 decimal places. The opening balance is the loan amount for row 1 and the previous row's Balance after that. *(Property test.)*
- **AC-10.5** Given any valid inputs, then every row's Payment except the last differs from the **Monthly payment** shown in the summary by at most 0.01, and the last row's Payment by at most 0.02. *(Property test.)*
- **AC-10.6** Given L-A (where some payments are 88,848.78), then the note `Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.` is shown below the summary; given L-C (all payments 10,000.00), the note is not shown.
- **AC-10.7** Given L-Z3 (`1000`, `0`, `3` **Months**), then the rows read `1 | 333.33 | 0.00 | 333.33 | 666.67`, `2 | 333.34 | 0.00 | 333.34 | 333.33`, `3 | 333.33 | 0.00 | 333.33 | 0.00`.
- **AC-10.8** Given L-MAX, when I Calculate, then all 1,200 rows are shown, and the 1,200th row is in the page within 1 second of selecting Calculate. The time is measured inside the page, in each browser, both locally and on the CI test machine.

## S-11 Recall earlier calculations
**Role:** R-2 Loan Advisor · **Serves:** J-6 · **Scope:** v1 · **Status:** Not implemented

"As a Loan Advisor, I want my recent calculations kept on this device, so that I can bring back an earlier quote exactly without retyping it."

Saved calculations are stored only in this browser on this device. They are never sent anywhere.

- **AC-11.1** Given no saved calculations, then the **Saved calculations** area shows `No saved calculations yet.`
- **AC-11.2** Given I calculate L-A successfully at 20:45 on 17 Oct 2026 in PKR (local time, Asia/Karachi in tests), then an entry appears at the top of **Saved calculations** with three lines: `Rs 1,000,000.00 at 12% for 1 year`, `Rs 88,848.79 per month` and `17 Oct 2026, 20:45`.
- **AC-11.3** Given a Calculate that shows error messages, then no entry is saved.
- **AC-11.4** Given I calculate L-A and then L-B, then L-B is listed first and L-A second.
- **AC-11.5** Given the newest entry is L-A in PKR, when I calculate L-A again in PKR, then no new entry is added. Given the entries are L-B (newest) and L-A, when I calculate L-A again, then a new L-A entry is added at the top and the older one stays. Given the newest entry is L-A in PKR, when I switch to `USD ($)` and calculate L-A again, then a new L-A entry in USD is added at the top.
- **AC-11.6** Given 20 saved entries, when I make a 21st different calculation, then the new entry is added at the top, the oldest is removed, and 20 entries remain.
- **AC-11.7** Given saved entries, when I reload the page, then the same entries are shown in the same order.
- **AC-11.8** Given the form shows different values and a saved L-B entry made in PKR while the current currency is USD, when I select **Restore** on that entry, then the inputs show `2500000`, `18`, `5` with **Years**, the currency switches to `PKR (Rs)`, the L-B results and schedule are shown, and no new entry is added.
- **AC-11.9** Given the browser blocks storage, when I calculate, then the results are shown normally and the **Saved calculations** area shows `Saved calculations aren't available in this browser. Calculations still work.`
- **AC-11.10** Given the stored history data is not valid JSON, is valid JSON but not a list, or is `[null]`, when the page loads, then it shows `No saved calculations yet.` without any error, and the next successful calculation is saved normally. Given a stored list where some entries are valid and others are not (the wrong shape, or a saved monthly payment that does not match the recalculated one), when the page loads, then only the valid entries are shown, in their stored order, without any error.
- **AC-11.11** Tenure is described in entries as `1 year`, `N years`, `1 month` or `N months`, and the rate with no trailing zeros (`12%`, `21.5%`, `0.01%`).

## S-12 Delete saved calculations
**Role:** R-2 Loan Advisor · **Serves:** J-7 · **Scope:** v1 · **Status:** Not implemented

"As a Loan Advisor, I want to delete one saved calculation or all of them, so that the next customer cannot see the previous customer's figures."

- **AC-12.1** Given entries L-B and L-A, when I select **Delete** on L-B, then L-B disappears from the list and stays gone after a reload, L-A is unchanged, and focus moves to the **Restore** button of the next entry (or the previous entry if it was last, or the **Saved calculations** heading if the list is now empty).
- **AC-12.2** Given at least one entry, when I select **Clear all**, then a confirmation dialog shows `Clear all saved calculations? This can't be undone.` and `This doesn't clear the form. Select Reset to do that.` with the buttons **Cancel** and **Clear**.
- **AC-12.3** Given the confirmation is open, when I select **Cancel** or press Escape, then nothing is deleted.
- **AC-12.4** Given the confirmation is open, when I select **Clear**, then the list shows `No saved calculations yet.`, the stored history is removed from the browser, and after a reload the list is still empty.
- **AC-12.5** Given no saved entries, then **Clear all** is disabled.
- **AC-12.6** Given results are showing, when I clear all history, then the current inputs and results stay on screen (clearing the form is **Reset**'s job, S-9).
- **AC-12.7** Given saved entries are shown and the browser then refuses to change stored data, when I select **Delete** on an entry or confirm **Clear all**, then the entries stay on screen as they were and I see `Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.`

## S-13 See the balance remaining after each payment
**Role:** R-3 Existing Borrower · **Serves:** J-8 · **Scope:** v1 · **Status:** Not implemented

"As an Existing Borrower, I want to see what I still owe after each payment, so that I can plan an early repayment or a refinance."

- **AC-13.1** Given L-A, then the Balance after month 6 is `514,921.05` and after month 12 is `0.00`.
- **AC-13.2** Given L-B entered as `5` **Years**, then the schedule has exactly 60 rows and the Balance after month 60 is `0.00`.
- **AC-13.3** Given any valid inputs, then the schedule has exactly as many rows as the tenure in months, every Balance equals the previous Balance minus that row's Principal, no Balance is negative, and the final Balance is exactly `0.00`. *(Property test.)*

## S-19 See interest versus principal for each year
**Role:** R-3 Existing Borrower · **Serves:** J-9 · **Scope:** v1 · **Status:** Not implemented

"As an Existing Borrower, I want a yearly summary of interest versus principal paid, so that I can see how much of my money went to interest each year."

*Moved from Backlog to v1 by the owner on 2026-10-18 (decision D-65, docs/process/proposal-visuals.md).*

- **AC-19.1** Given L-B, when I view the yearly summary, then 5 rows are shown, and each row's interest and principal equal the sums of the matching 12 monthly rows.
- **AC-19.2** Given L-B, then the **Yearly summary** table has the columns **Year**, **Interest (Rs)**, **Principal (Rs)**, **Balance (Rs)**, and its first and last rows read `1 | 422,945.63 | 338,857.21 | 2,161,142.79` and `5 | 69,355.47 | 692,447.31 | 0.00`.
- **AC-19.3** Given `100000`, `10`, `18` **Months**, when I Calculate, then the yearly summary has 2 rows and the second (covering 6 months) reads `2 | 1,028.07 | 35,006.16 | 0.00`.
- **AC-19.4** Given L-B, then a yearly chart shows one stacked bar per year, with a legend naming **Principal** and **Interest**.

## S-20 See what share of the total cost is interest
**Role:** R-1 Prospective Borrower · **Serves:** J-2 · **Scope:** v1 · **Status:** Not implemented

"As a Prospective Borrower, I want to see at a glance how much of what I repay is interest, so that I can judge the true cost of an offer."

- **AC-20.1** Given L-A, when I Calculate, then a **Cost breakdown** bar shows two parts, **Loan amount** and **Interest**, and the text `Interest is 6.2% of the total amount payable.`
- **AC-20.2** Given L-B, then the text reads `Interest is 34.4% of the total amount payable.`
- **AC-20.3** Given L-C (0%), then the text reads `Interest is 0.0% of the total amount payable.` and the bar shows the loan amount only.
- **AC-20.4** Given L-A, then the loan-amount part takes 93.8% of the bar's width (within 1 percentage point).
- **AC-20.5** Given either theme, then every chart's marks (S-19, S-20, S-21, S-22) have a contrast ratio of at least 3:1 against the card surface, and all chart text at least 4.5:1.
- **AC-20.6** Given a viewport 360 px wide and L-MAX results, then the page does not scroll horizontally and every chart fits inside its card.

## S-21 See the balance fall over time
**Role:** R-3 Existing Borrower · **Serves:** J-8 · **Scope:** v1 · **Status:** Not implemented

"As an Existing Borrower, I want to see my balance fall over the life of the loan, so that I can see how quickly I will owe less."

- **AC-21.1** Given L-A, when I Calculate, then a **Balance over time** chart is shown with the text `The balance falls from Rs 1,000,000.00 to Rs 0.00 over 12 months.`
- **AC-21.2** Given L-A, when I hover over month 6 in the chart, then a tooltip reads `Month 6: Rs 514,921.05`.
- **AC-21.3** Given L-MAX, when I Calculate, then the chart is shown and AC-10.8's 1-second budget still holds with all charts present.

## S-22 See how each payment splits between interest and principal
**Role:** R-2 Loan Advisor · **Serves:** J-5 · **Scope:** v1 · **Status:** Not implemented

"As a Loan Advisor, I want to show a customer how the interest part of each payment shrinks over time, so that I can explain the schedule at a glance."

- **AC-22.1** Given L-A, when I Calculate, then an **Interest and principal in each payment** chart is shown with a legend naming **Principal** and **Interest** and the text `Interest is 11.3% of the first payment and 1.0% of the last.`
- **AC-22.2** Given L-B, then the text reads `Interest is 59.1% of the first payment and 1.5% of the last.`
- **AC-22.3** Given L-A, when I hover over month 1 in the chart, then a tooltip reads `Month 1: principal Rs 78,848.79, interest Rs 10,000.00`.

---

# Backlog stories (not being built in v1)

These are recorded to show what we would build next. They are honestly marked **Not implemented**.

## S-14 Compare two loan offers side by side
**Role:** R-1 · **Serves:** J-2 · **Scope:** Backlog · **Status:** Not implemented
"As a Prospective Borrower, I want to compare two offers side by side, so that I can see which one costs less overall."
- **AC-14.1** Given offer 1 = L-A and offer 2 = `1000000`, `10`, `2` **Years**, when I compare, then both monthly payments and total interest amounts are shown side by side, and the offer with the lower total interest is highlighted.

## S-15 Find the largest loan a monthly budget allows
**Role:** R-1 · **Serves:** J-1 · **Scope:** Backlog · **Status:** Not implemented
"As a Prospective Borrower, I want to enter the monthly amount I can afford, so that I know the largest loan I could take."
- **AC-15.1** Given a budget of `88848.79`, rate `12` and tenure `1` **Years**, when I calculate, then the maximum loan amount shown is within 1.00 of `1,000,000.00`.

## S-16 Copy a quote summary to share
**Role:** R-2 · **Serves:** J-4 · **Scope:** Backlog · **Status:** Not implemented
"As a Loan Advisor, I want to copy a plain-text quote summary, so that I can paste it into a message to the customer."
- **AC-16.1** Given L-A results, when I select **Copy summary**, then the clipboard contains the loan amount, rate, tenure, monthly payment, total interest and total amount payable as plain text.

## S-17 Export or print the repayment schedule
**Role:** R-2 · **Serves:** J-5 · **Scope:** Backlog · **Status:** Not implemented
"As a Loan Advisor, I want to download or print the schedule, so that I can give the customer a copy."
- **AC-17.1** Given L-A results, when I select **Download CSV**, then a CSV with a header row and 12 data rows matching the on-screen schedule is downloaded.

## S-18 See the effect of an extra one-off repayment
**Role:** R-3 · **Serves:** J-8 · **Scope:** Backlog · **Status:** Not implemented
"As an Existing Borrower, I want to see how an extra payment would shorten my loan or reduce my interest, so that I can decide whether to make it."
- **AC-18.1** Given L-B and an extra payment of `500000` after month 12 that keeps the monthly payment the same, then the new payoff month and the interest saved are shown.

