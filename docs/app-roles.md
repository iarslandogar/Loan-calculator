# App Roles

**Product:** Loan EMI Calculator (a browser app that works out the equal monthly instalment, total cost and month-by-month repayment schedule of a reducing-balance loan).

Three kinds of people use the app. They see the same screens, but they come to it with different needs. Those differences drive which stories matter to whom (see `jobs-to-be-done.md` and `user-stories.md`).

| ID | Role | Core need | What makes them different |
|---|---|---|---|
| R-1 | Prospective Borrower | "Can I afford this, and what will it really cost me?" | Not a finance expert; deciding before committing; often on a phone |
| R-2 | Loan Advisor | "Give the customer an exact, defensible quote, fast." | Uses the app many times a day, in front of customers; needs speed, precision, recall and privacy between customers |
| R-3 | Existing Borrower | "Where is my money going, and what do I still owe?" | Already repaying; cares about progress over time, not the decision to borrow |

---

## R-1 Prospective Borrower

A **Prospective Borrower** is an individual who has been offered, or is shopping for, a car, home or personal loan from a bank or dealer, in Pakistan (PKR) or elsewhere (USD). They are not finance professionals, and they usually check figures on their phone, at a showroom, a bank branch or at home in the evening.

They can enter a loan amount, an annual interest rate and a tenure, and see the monthly payment, the total interest and the total amount payable. They can also choose the currency the amounts are shown in, switch between light and dark display, and use the app comfortably on a phone.

They must never be shown a payment figure that was calculated from invalid or incomplete input. They must also never see results that no longer match the inputs on screen.

## R-2 Loan Advisor

A **Loan Advisor** is a professional who quotes repayment figures to customers as part of their job: a bank relationship officer, a car-dealership finance officer or a mortgage broker. They produce many quotes a day, often in face-to-face meetings, sometimes on a screen the customer can see, and they must be able to explain any figure if the customer questions it.

They can do everything a Prospective Borrower can. On top of that they rely on:

- fast keyboard-only entry;
- a payment-by-payment breakdown whose arithmetic they can explain line by line;
- recalling quotes saved earlier on the same device;
- deleting saved quotes between customers.

They must never be shown totals that do not reconcile with the payment-by-payment breakdown. They must also never leave a previous customer's saved figures on the device after choosing to clear them.

## R-3 Existing Borrower

An **Existing Borrower** is someone who is already repaying an instalment loan and wants to understand it. They want to know how much of each instalment is interest and how much they still owe after a given number of payments, usually because they are thinking about paying extra, refinancing or budgeting for the remaining term. They know their loan amount, rate and tenure from their loan agreement.

They can enter their loan's terms and read the month-by-month schedule: payment, interest, principal and remaining balance after each payment.

They must never be shown a remaining balance that fails to reconcile. Each balance must equal the previous balance minus the principal repaid, and the balance after the final payment must be exactly zero.
