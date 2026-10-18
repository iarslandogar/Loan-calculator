# Manual test checklist (v1)

For the human to tick in a real browser (`npm run dev`, or the deployed site). One line per v1 acceptance criterion (94 in all). Tick a box only if the expected result is exactly what you see. Tick nothing on a guess.

**Before you start:** open the app in a private window (clean storage), at a normal desktop width, with the device in light mode, unless a step says otherwise. Reference loans: **L-A** = `1000000`, `12`, `1` Years. **L-B** = `2500000`, `18`, `5` Years. **L-C** = `120000`, `0`, `12` Months. **L-D** = `100000`, `10`, `1` Months. **L-MIN** = `10`, `0.01`, `1` Months. **L-MAX** = `1000000000000000`, `75`, `100` Years. **L-Z3** = `1000`, `0`, `3` Months. "Calculate" means the button or Enter in an input.

If a step fails, leave the box empty and write which AC failed. Do not change a story's Status yourself unless you have checked every AC of that story.

## S-1 Calculate the monthly payment

- [ ] **AC-1.1** Empty form. Enter `1000000`, `12`, `1`, unit Years. Calculate. **Monthly payment** reads `Rs 88,848.79`.
- [ ] **AC-1.2** Empty form. Enter `1000000`, `12`, `12`, unit Months. Calculate. **Monthly payment** reads `Rs 88,848.79`.
- [ ] **AC-1.3** Enter L-B (`2500000`, `18`, `5`, Years). Calculate. **Monthly payment** reads `Rs 63,483.57`.
- [ ] **AC-1.4** Enter L-C (`120000`, `0`, `12`, Months). Calculate. **Monthly payment** reads `Rs 10,000.00`.
- [ ] **AC-1.5** Enter L-D (`100000`, `10`, `1`, Months). Calculate. **Monthly payment** reads `Rs 100,833.33`.
- [ ] **AC-1.6** Enter L-MIN (`10`, `0.01`, `1`, Months). Calculate. **Monthly payment** reads `Rs 10.00`.
- [ ] **AC-1.7** Enter L-MAX (`1000000000000000`, `75`, `100`, Years). Calculate. **Monthly payment** reads `Rs 62,500,000,000,000.00`.
- [ ] **AC-1.8** Enter the amount as `1,000,000`, rate `12`, tenure `1` Years, Calculate: `Rs 88,848.79`. Change the amount to `10,00,000`, Calculate: `Rs 88,848.79` again.
- [ ] **AC-1.9** Type a space before and after each value (`␣1000000␣`, `␣12␣`, `␣1␣`), Years. Calculate. `Rs 88,848.79`, no error.
- [ ] **AC-1.10** Enter `1000000`, rate `12%`, tenure `1` Years. Calculate. `Rs 88,848.79`, no error.
- [ ] **AC-1.11** Calculate L-A, then select Calculate again without touching anything. Monthly payment, Total interest, Total amount payable and the schedule are unchanged.
- [ ] **AC-1.12** Open the app in a fresh private window. All three inputs are empty, the unit shows **Years**, no figures are shown, and the results area says `Enter your loan details and select Calculate.`

## S-2 Clear messages for invalid input

- [ ] **AC-2.1** On the empty form select Calculate. Under the fields you see `Enter a loan amount.`, `Enter an interest rate.` and `Enter a loan tenure.`; no figures; the results area says `Enter your loan details and select Calculate.`; the cursor is in **Loan amount**.
- [ ] **AC-2.2** Amount `abc`, rate `12`, tenure `1` Years. Calculate. Under Loan amount: `Loan amount must be a number.` No results.
- [ ] **AC-2.3** Amount `1e6`. Calculate. `Loan amount must be a number.`
- [ ] **AC-2.4** Try amount `0`, then `-500`, then `9.99` (each with rate `12`, tenure `1` Years). Each time: `Loan amount must be between 10 and 1,000,000,000,000,000.`
- [ ] **AC-2.5** Amount `1000000000000000.01`: `Loan amount must be between 10 and 1,000,000,000,000,000.` Amount `1000000000000000`: no loan-amount message and results are shown.
- [ ] **AC-2.6** Amount `1000.555`. Calculate. `Loan amount can have at most 2 decimal places.`
- [ ] **AC-2.7** Rate `-1`, then `75.01`: `Interest rate must be between 0 and 75%.` Rate `0`, then `75`: no rate message and results are shown.
- [ ] **AC-2.8** Rate `twelve`: `Interest rate must be a number.` Rate `12.345`: `Interest rate can have at most 2 decimal places.`
- [ ] **AC-2.9** Tenure `2.5`, unit Years. Calculate. `Loan tenure must be a whole number.`
- [ ] **AC-2.10** Years with tenure `0`, then `101`: `Loan tenure must be between 1 and 100 years.` Months with `0`, then `1201`: `Loan tenure must be between 1 and 1,200 months.` Tenure `100` Years and `1200` Months: no tenure message.
- [ ] **AC-2.11** Amount `abc`, rate `99`, tenure `1` Years. Calculate. Both the amount and the rate messages show at once, and the cursor is in **Loan amount**.
- [ ] **AC-2.12** Calculate L-A so results show. Change the amount to `abc` and Calculate. The figures and the schedule disappear, `Loan amount must be a number.` shows under Loan amount, and the results area says `Enter your loan details and select Calculate.`
- [ ] **AC-2.13** Make an amount error and a rate error show together (amount `abc`, rate `twelve`). Type a character in Loan amount: its message disappears, the rate message stays until the next Calculate.
- [ ] **AC-2.14** With any error showing, correct everything to L-A and Calculate. L-A results show and no error message remains anywhere.
- [ ] **AC-2.15** Paste 40 nines (`9999999999999999999999999999999999999999`) as the amount, rate `12`, tenure `1` Years. Calculate: `Loan amount must be between 10 and 1,000,000,000,000,000.` and the page keeps working. Then enter L-A and Calculate: L-A results show.
- [ ] **AC-2.16** With the browser's developer console open (F12, Console tab), try the invalid inputs above plus `１２` (full-width digits) and an empty form. The page never goes blank, shows no browser error, and the console shows no red errors.
- [ ] **AC-2.17** With rate `12` and tenure `1` Years, try the amounts `1,,000`, `1000,50`, `1,5`, `,1000` and `10,0000` one at a time. Each gives `Loan amount must be a number.` and no results.

## S-3 Total interest and total amount payable

- [ ] **AC-3.1** L-A: **Total interest** `Rs 66,185.45`, **Total amount payable** `Rs 1,066,185.45`.
- [ ] **AC-3.2** L-B: **Total interest** `Rs 1,309,014.14`, **Total amount payable** `Rs 3,809,014.14`.
- [ ] **AC-3.3** L-C: **Total interest** `Rs 0.00`, **Total amount payable** `Rs 120,000.00`.
- [ ] **AC-3.4** L-MIN: **Total interest** `Rs 0.00`, **Total amount payable** `Rs 10.00`.
- [ ] **AC-3.5** L-MAX: **Total interest** `Rs 74,000,000,000,000,003.34`, **Total amount payable** `Rs 75,000,000,000,000,003.34`, shown in full (no `...`, no `e+`).
- [ ] **AC-3.6** For L-A, check with a calculator: loan amount + Total interest = Total amount payable. Add up the Interest column of the schedule (12 rows) and get Total interest; add up the Payment column and get Total amount payable. Repeat for L-B (60 rows) if you have the patience.

## S-4 Results always match the inputs on screen

- [ ] **AC-4.1** Calculate L-A. Change the loan amount by one digit: figures and schedule vanish and `Your inputs have changed. Select Calculate to see updated results.` shows. Repeat after recalculating, changing the rate, and again changing the tenure.
- [ ] **AC-4.2** Calculate L-A. Change the unit from Years to Months. Same behaviour as AC-4.1, and the tenure box still shows `1`.
- [ ] **AC-4.3** With the changed-inputs message showing, enter valid values and Calculate. New figures show and the message is gone.
- [ ] **AC-4.4** With L-A results showing, change **Currency** to USD, then change **Theme** to Dark. After each change the figures and schedule stay visible and no changed-inputs message appears.

## S-5 Use it comfortably on a phone

Use the browser's device toolbar (F12, then the device icon) set to 360 x 740, or a real phone.

- [ ] **AC-5.1** At 360 px wide the page does not scroll sideways, on load and after calculating L-MAX (1,200 rows).
- [ ] **AC-5.2** At 360 px wide, every input, drop-down and button is at least 44 x 44 px (use the inspector or a screenshot ruler) and none sticks out past the left or right edge. Include the **Restore**, **Delete** and **Clear all** buttons after calculating once.
- [ ] **AC-5.3** At 360 x 740 calculate L-B. Scroll inside the schedule: the schedule scrolls by itself and its column headings stay visible at the top of its box.
- [ ] **AC-5.4** On a phone (or via device emulation with touch), Loan amount and Annual interest rate open the keypad with a decimal point; Loan tenure opens a number-only keypad.
- [ ] **AC-5.5** At 1280 px wide the form and the results sit side by side. At 768 px wide and narrower the form is above the results.
- [ ] **AC-5.6** At 360 px wide calculate L-MAX. All three summary amounts are fully visible (they may wrap onto a second line, but no digit is cut off).

## S-6 Light or dark display

- [ ] **AC-6.1** With no saved preference (fresh private window) and the device or browser set to dark mode, the app is dark. With light mode, it is light.
- [ ] **AC-6.2** The **Theme** control offers System, Light and Dark. On a light device choose Dark: the app turns dark immediately. On a dark device choose Light: it turns light immediately.
- [ ] **AC-6.3** Choose Dark, reload. The app is still dark and Theme shows `Dark`.
- [ ] **AC-6.4** With Theme on System, switch the operating system between light and dark while the page is open. The app follows without a reload.
- [ ] **AC-6.5** In both themes, body text and red error text are easy to read against their backgrounds (the automated test measures at least 4.5:1; confirm by eye that nothing looks faint). Make an error appear in each theme.
- [ ] **AC-6.6** Block site data for the page (browser settings, or a private window with cookies and site data blocked). Change the Theme. It changes for this visit and no error message appears.

## S-7 Currency

- [ ] **AC-7.1** Fresh visit: **Currency** shows `PKR (Rs)`, the amount label reads `Loan amount (Rs)`, and L-A shows `Rs 88,848.79`.
- [ ] **AC-7.2** With L-A results showing, select `USD ($)`. Summary amounts show `$` (for example `$88,848.79`), the schedule headings end in `($)`, the label reads `Loan amount ($)`, the numbers are unchanged and the results stay visible.
- [ ] **AC-7.3** Select `USD ($)`, reload. `USD ($)` is still selected.
- [ ] **AC-7.4** Next to the Currency control the note `Changing currency changes the symbol only. Amounts are not converted.` is shown.
- [ ] **AC-7.5** Calculate L-A in PKR so an entry is saved. Switch to USD. The saved entry still shows `Rs` amounts.

## S-8 Work entirely from the keyboard

- [ ] **AC-8.1** On a fresh visit press Tab repeatedly: Theme, Currency, Loan amount, Annual interest rate, Loan tenure, Tenure unit, Calculate, Reset (Clear all is skipped because it is disabled). Shift+Tab goes back through the same order. Then calculate L-B and L-A so two entries are saved, put the cursor on **Reset** without pressing it, and Tab on: schedule area, Restore and Delete of the first entry, Restore and Delete of the second entry, Clear all. Shift+Tab reverses it.
- [ ] **AC-8.2** Enter L-A in the three boxes. Press Enter while the cursor is in Loan amount: results show. Reload, enter L-A again, press Enter in Annual interest rate: same. Repeat for Loan tenure.
- [ ] **AC-8.3** Press Tab through every control in light theme, then in dark theme. Every control shows a clearly visible outline at least 2 px thick when focused (including the schedule area, Restore, Delete and Clear all).
- [ ] **AC-8.4** Calculate L-B. Tab to the schedule area. Down/Up arrow keys and Page Down/Page Up scroll it.
- [ ] **AC-8.5** With at least one saved entry, open **Clear all**. Focus starts on **Cancel**. Press Tab and Shift+Tab several times: focus never lands on anything behind the dialog. Escape closes it without clearing and focus lands on **Clear all**. Open it again: **Cancel** also closes it without clearing and focuses **Clear all**. Open it again, press Tab to reach **Clear**, press Enter: the list empties and focus moves to the **Saved calculations** heading.
- [ ] **AC-8.6** Without touching the mouse: enter L-A and calculate, enter L-B and calculate, restore the L-A entry, delete the L-B entry, then clear all history. Every step works.

## S-9 Start a fresh quote in one step

- [ ] **AC-9.1** Calculate L-A, then select **Reset**: inputs empty, unit back to Years, figures gone, the results area says `Enter your loan details and select Calculate.`, the cursor is in Loan amount. Repeat starting from the changed-inputs message, and again starting from error messages.
- [ ] **AC-9.2** Choose USD and Dark, save two calculations, select **Reset**. Currency stays USD, theme stays Dark, both saved entries are still listed.
- [ ] **AC-9.3** On an empty form select **Reset**. The form stays empty and no error appears.

## S-10 Repayment schedule

- [ ] **AC-10.1** Calculate L-A. A **Repayment schedule** table with 12 rows and columns Month, Payment (Rs), Interest (Rs), Principal (Rs), Balance (Rs) shows.
- [ ] **AC-10.2** L-A row 1 reads `1 | 88,848.79 | 10,000.00 | 78,848.79 | 921,151.21`.
- [ ] **AC-10.3** L-A row 12 reads `12 | 88,848.78 | 879.69 | 87,969.09 | 0.00`.
- [ ] **AC-10.4** For L-A, rows 1, 2 and 7: Payment = Interest + Principal; Interest = the previous Balance (the loan amount for row 1) x 12 / 1200, rounded to the nearest cent (row 1: 1,000,000 x 1% = 10,000.00).
- [ ] **AC-10.5** For L-A and L-B, every Payment in the schedule except the last is within 0.01 of the **Monthly payment** shown in the summary, and the last Payment is within 0.02 of it.
- [ ] **AC-10.6** L-A shows `Some payments differ by up to 0.02 because amounts are rounded to 2 decimal places.` below the summary. L-C does not show it.
- [ ] **AC-10.7** Enter L-Z3 (`1000`, `0`, `3` Months). Rows read `1 | 333.33 | 0.00 | 333.33 | 666.67`, `2 | 333.34 | 0.00 | 333.34 | 333.33`, `3 | 333.33 | 0.00 | 333.33 | 0.00`.
- [ ] **AC-10.8** Calculate L-MAX. All 1,200 rows appear almost instantly (well under a second); scroll to the bottom to see row 1,200 with Balance `0.00`.

## S-11 Recall earlier calculations

- [ ] **AC-11.1** On a fresh visit the **Saved calculations** area says `No saved calculations yet.`
- [ ] **AC-11.2** Calculate L-A in PKR. An entry appears at the top with three lines: `Rs 1,000,000.00 at 12% for 1 year`, `Rs 88,848.79 per month`, and the current date and time in the form `17 Oct 2026, 20:45` (your local time now).
- [ ] **AC-11.3** Select Calculate on an empty form so errors show. No entry is added.
- [ ] **AC-11.4** Calculate L-A, then L-B. L-B is listed first, L-A second.
- [ ] **AC-11.5** Calculate L-A, then Calculate again without changes: still one entry. Then with entries L-B (newest) and L-A, calculate L-A: a new L-A entry appears on top and the older one stays. Then with L-A newest in PKR, switch to USD and Calculate: a new entry in USD (with `$`) appears on top.
- [ ] **AC-11.6** Save 20 different calculations (any 20 combinations), then make a 21st different one. The new one is on top, the oldest is gone, and 20 entries remain.
- [ ] **AC-11.7** With several saved entries, reload. The same entries show in the same order.
- [ ] **AC-11.8** Save L-B in PKR. Switch to USD and type other values into the form. Select **Restore** on the L-B entry: inputs show `2500000`, `18`, `5` with Years, Currency switches to `PKR (Rs)`, L-B results and schedule show, and no new entry is added.
- [ ] **AC-11.9** Block site data (see AC-6.6) and calculate L-A. The results show normally and the Saved calculations area says `Saved calculations aren't available in this browser. Calculations still work.`
- [ ] **AC-11.10** In the browser console run `localStorage.setItem('emi-calc.v1.history','oops')`, reload: `No saved calculations yet.`, no error, and calculating L-A still saves. Repeat with the value `{"a":1}` and with `[null]`. Then store a list where one entry's `monthlyPayment` is edited by hand (for example copy a real entry from the storage viewer and change `"88848.79"` to `"1.00"`): after reload only the untouched entries are shown, in their original order, with no error.
- [ ] **AC-11.11** Save entries for tenures of 1 year, 5 years, 1 month and 24 months, and rates `12`, `21.50` and `0.01`. They read `1 year`, `5 years`, `1 month`, `24 months`, and `12%`, `21.5%`, `0.01%` (no trailing zeros).

## S-12 Delete saved calculations

- [ ] **AC-12.1** Save L-A then L-B. Select **Delete** on the L-B entry. It disappears, stays gone after a reload, L-A is unchanged, and the cursor lands on the **Restore** button of the next entry (or the previous entry if you deleted the last one, or the **Saved calculations** heading if the list is now empty).
- [ ] **AC-12.2** With at least one entry select **Clear all**. A dialog shows `Clear all saved calculations? This can't be undone.` and `This doesn't clear the form. Select Reset to do that.` with buttons **Cancel** and **Clear**.
- [ ] **AC-12.3** With the dialog open, select **Cancel**: nothing is deleted. Open it again and press Escape: nothing is deleted.
- [ ] **AC-12.4** With the dialog open select **Clear**: the list shows `No saved calculations yet.`; in the browser's storage viewer the `emi-calc.v1.history` key is gone; after a reload the list is still empty.
- [ ] **AC-12.5** With no saved entries, **Clear all** is greyed out and cannot be selected.
- [ ] **AC-12.6** Calculate L-A (results showing), then clear all history. The inputs and the results stay on screen.
- [ ] **AC-12.7** Hard to do by hand. In the browser console, after saving an entry, run `Storage.prototype.setItem = Storage.prototype.removeItem = Storage.prototype.clear = () => { throw new Error('no') }`. Then select **Delete** on an entry, and separately confirm **Clear all**. In both cases the entries stay on screen and you see `Couldn't remove saved calculations from this browser. To be sure, clear this site's data in your browser settings.` (Reload to undo the console change.)

## S-13 Balance after each payment

- [ ] **AC-13.1** L-A: Balance after month 6 is `514,921.05`; after month 12 it is `0.00`.
- [ ] **AC-13.2** L-B entered as `5` Years: the schedule has exactly 60 rows and Balance after month 60 is `0.00`.
- [ ] **AC-13.3** For L-A, L-B and L-MAX: each Balance equals the previous Balance minus that row's Principal (spot-check at least five rows with a calculator), no Balance is negative, the last Balance is `0.00`, and the number of rows equals the tenure in months (12, 60, 1,200).
