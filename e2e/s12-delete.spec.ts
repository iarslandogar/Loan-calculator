import {
  allowStorageThenGuardWrites,
  amountIn,
  calculateLoan,
  clearAllBtn,
  confirmDialog,
  COPY,
  deleteBtn,
  expect,
  expectSummary,
  HISTORY_KEY,
  historyHeading,
  historyItems,
  LOANS,
  open,
  readStored,
  refuseWrites,
  restoreBtn,
  test,
} from './fixtures'

test.describe('S-12 Delete saved calculations', () => {
  test('[AC-12.1] Delete removes one entry for good and moves focus to the next entry', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await calculateLoan(page, LOANS.C)
    // Newest first: C, B, A.
    await expect(historyItems(page)).toHaveCount(3)

    await deleteBtn(page, LOANS.B.line1).click()
    await expect(historyItems(page)).toHaveCount(2)
    await expect(page.getByRole('button', { name: `Restore ${LOANS.B.line1}` })).toHaveCount(0)
    await expect(restoreBtn(page, LOANS.A.line1)).toBeFocused()
    await expect(historyItems(page).nth(0)).toContainText(LOANS.C.line1)
    await expect(historyItems(page).nth(1)).toContainText(LOANS.A.line1)

    await page.reload()
    await expect(historyItems(page)).toHaveCount(2)
    await expect(page.getByRole('button', { name: `Restore ${LOANS.B.line1}` })).toHaveCount(0)
    await expect(historyItems(page).nth(1)).toContainText('Rs 88,848.79 per month')

    // Deleting the last entry moves focus to the previous entry.
    await deleteBtn(page, LOANS.A.line1).click()
    await expect(historyItems(page)).toHaveCount(1)
    await expect(restoreBtn(page, LOANS.C.line1)).toBeFocused()

    // Deleting the only entry moves focus to the heading.
    await deleteBtn(page, LOANS.C.line1).click()
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyHeading(page)).toBeFocused()
  })

  test('[AC-12.2] Clear all opens a confirmation with the two sentences and two buttons', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await clearAllBtn(page).click()
    const dialog = confirmDialog(page)
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText(COPY.dialogText, { exact: true })).toBeVisible()
    await expect(dialog.getByText(COPY.dialogHint, { exact: true })).toBeVisible()
    await expect(dialog.getByRole('button')).toHaveText(['Cancel', 'Clear'])
    await expect(dialog).toHaveAccessibleDescription(COPY.dialogHint)
  })

  test('[AC-12.3] Cancel and Escape delete nothing', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)

    await clearAllBtn(page).click()
    await confirmDialog(page).getByRole('button', { name: 'Cancel', exact: true }).click()
    await expect(confirmDialog(page)).toBeHidden()
    await expect(historyItems(page)).toHaveCount(2)

    await clearAllBtn(page).click()
    await expect(confirmDialog(page)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(confirmDialog(page)).toBeHidden()
    await expect(historyItems(page)).toHaveCount(2)

    await page.reload()
    await expect(historyItems(page)).toHaveCount(2)
  })

  test('[AC-12.4] Clear empties the list, removes the stored key, and stays empty after reload', async ({
    page,
  }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)
    expect(await readStored(page, HISTORY_KEY)).not.toBeNull()

    await clearAllBtn(page).click()
    await confirmDialog(page).getByRole('button', { name: 'Clear', exact: true }).click()

    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
    expect(await readStored(page, HISTORY_KEY)).toBeNull()
    await page.reload()
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(0)
  })

  test('[AC-12.5] Clear all is disabled when nothing is saved, enabled when something is', async ({
    page,
  }) => {
    await open(page)
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expect(clearAllBtn(page)).toBeDisabled()
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await expect(clearAllBtn(page)).toBeEnabled()
  })

  test('[AC-12.6] clearing history leaves the inputs and results on screen', async ({ page }) => {
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
    await clearAllBtn(page).click()
    await confirmDialog(page).getByRole('button', { name: 'Clear', exact: true }).click()
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toBeVisible()
    await expectSummary(page, LOANS.A)
    await expect(amountIn(page)).toHaveValue(LOANS.A.amount)
  })

  test('[AC-12.7] when storage refuses changes, Delete keeps the entry and says so', async ({
    page,
  }) => {
    await allowStorageThenGuardWrites(page)
    await open(page)
    await calculateLoan(page, LOANS.A)
    await calculateLoan(page, LOANS.B)
    await expect(historyItems(page)).toHaveCount(2)
    await refuseWrites(page)

    await deleteBtn(page, LOANS.B.line1).click()

    await expect(page.getByText(COPY.removeFailed, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(2)
    await expect(historyItems(page).nth(0)).toContainText(LOANS.B.line1)
    await expect(historyItems(page).nth(1)).toContainText(LOANS.A.line1)
    expect(await readStored(page, HISTORY_KEY)).not.toBeNull()
  })

  test('[AC-12.7] when storage refuses changes, a confirmed Clear all keeps the entries and says so', async ({
    page,
  }) => {
    await allowStorageThenGuardWrites(page)
    await open(page)
    await calculateLoan(page, LOANS.A)
    await expect(historyItems(page)).toHaveCount(1)
    await refuseWrites(page)

    await clearAllBtn(page).click()
    await confirmDialog(page).getByRole('button', { name: 'Clear', exact: true }).click()

    await expect(page.getByText(COPY.removeFailed, { exact: true })).toBeVisible()
    await expect(historyItems(page)).toHaveCount(1)
    await expect(historyItems(page).first()).toContainText(LOANS.A.line1)
    await expect(page.getByText(COPY.historyEmpty, { exact: true })).toHaveCount(0)
  })
})
