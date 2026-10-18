# Proposals: need product-owner approval

Each item goes beyond pure CSS or the brief's fixed rules. Approve or decline them one by one.

## P1 · Modifier class for the stale message (recommended)
- **Change:** add `status-stale` to the results card's `<p class="status">` when the inputs have changed (idle keeps plain `status`).
- **Why:** stale has to be unmistakable. CSS alone can't tell the two messages apart. With the class, stale gets a peach fill, a 2px ink border and a refresh icon.
- **Impact:** no text, role or order change. Icons are CSS pseudo-elements, so screen readers skip them.
- **Code sketch:** `<p className={stale ? "status status-stale" : "status"}>`

## P2 · Year-end rows in the schedule
- **Status:** already works through `tbody tr:nth-child(12n)`. No markup needed. Listed only so the owner knows it's there.

## P3 · Sticky Month column on narrow screens
- **Change:** CSS only (≤ 560px). The Month column stays visible while the table scrolls sideways inside `.schedule-scroll`.
- **Impact:** no order change. Needs a check in WebKit, where sticky `th`/`td` inside an overflow container works on recent versions.

## P4 · Initial focus on Cancel in the Clear-all dialog
- **Change:** give the Cancel button `autoFocus`, or focus it after `showModal()`.
- **Why:** pressing Enter right after opening the dialog should never wipe a customer's saved quotes.
- **Impact:** behaviour change, so it needs a test update if tests assert where focus lands.

## P5 · Principal vs interest split bar (not implemented)
- **Idea:** a two-tone bar under the figures showing how much of the total cost is interest.
- **Blocker:** it carries meaning, so it needs a text equivalent. That would be new copy (e.g. "Interest is 6% of the total amount payable."), which has to go through the copy deck.
