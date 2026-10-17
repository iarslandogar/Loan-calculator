import {
  blockStorage,
  calculateLoan,
  contrast,
  dataTheme,
  expect,
  expectSummary,
  expectTheme,
  LOANS,
  open,
  readColourTokens,
  selectedText,
  test,
  themeSel,
} from './fixtures'

test.describe('S-6 Light or dark display', () => {
  test('[AC-6.1] with no saved preference the app follows the device setting', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await open(page)
    await expectTheme(page, 'dark')
    expect(await selectedText(themeSel(page))).toBe('System')

    await page.emulateMedia({ colorScheme: 'light' })
    await page.reload()
    await expectTheme(page, 'light')
    expect(await selectedText(themeSel(page))).toBe('System')
  })

  test('[AC-6.2] choosing Dark on a light device switches at once, and Light on a dark device', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    await expectTheme(page, 'light')
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')

    await page.emulateMedia({ colorScheme: 'dark' })
    await themeSel(page).selectOption({ label: 'Light' })
    await expectTheme(page, 'light')

    await expect(themeSel(page).getByRole('option')).toHaveText(['System', 'Light', 'Dark'])
  })

  test('[AC-6.3] a chosen theme survives a reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await page.reload()
    await expectTheme(page, 'dark')
    expect(await selectedText(themeSel(page))).toBe('Dark')
  })

  test('[AC-6.4] with System selected the app follows device changes without a reload', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    expect(await selectedText(themeSel(page))).toBe('System')
    await expectTheme(page, 'light')
    await page.emulateMedia({ colorScheme: 'dark' })
    await expectTheme(page, 'dark')
    await page.emulateMedia({ colorScheme: 'light' })
    await expectTheme(page, 'light')
  })

  test('[AC-6.4] a fixed Light choice ignores device changes', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await open(page)
    await themeSel(page).selectOption({ label: 'Light' })
    await expectTheme(page, 'light')
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.emulateMedia({ colorScheme: 'light' })
    await page.emulateMedia({ colorScheme: 'dark' })
    expect(await dataTheme(page)).toBe('light')
  })

  for (const theme of ['Light', 'Dark'] as const) {
    test(`[AC-6.5][SPEC-§8.4] ${theme}: text and error colours reach 4.5:1`, async ({ page }) => {
      await open(page)
      await themeSel(page).selectOption({ label: theme })
      await expectTheme(page, theme === 'Light' ? 'light' : 'dark')
      const t = await readColourTokens(page, [
        '--bg',
        '--surface',
        '--text',
        '--text-muted',
        '--error',
        '--primary',
        '--on-primary',
      ])
      const pairs: [string, string][] = [
        ['--text', '--bg'],
        ['--text', '--surface'],
        ['--text-muted', '--bg'],
        ['--text-muted', '--surface'],
        ['--error', '--bg'],
        ['--error', '--surface'],
        ['--on-primary', '--primary'],
      ]
      for (const [fg, bg] of pairs) {
        const ratio = contrast(t[fg] ?? [0, 0, 0], t[bg] ?? [0, 0, 0])
        expect(ratio, `${theme}: ${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5)
      }
    })
  }

  test('[AC-6.6] with storage blocked, the theme still changes for this visit', async ({
    page,
  }) => {
    await blockStorage(page, 'methods')
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    expect(await selectedText(themeSel(page))).toBe('Dark')
    await expect(page.getByText('Something went wrong. Please reload the page.')).toHaveCount(0)
    await expect(page.getByRole('alert')).toHaveCount(0)
    // The app keeps working (and the global fixture fails on any console error).
    await calculateLoan(page, LOANS.A)
    await expectSummary(page, LOANS.A)
  })

  test('[AC-6.6] the same holds when reading window.localStorage itself throws', async ({
    page,
  }) => {
    await blockStorage(page, 'getter')
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page)
    await themeSel(page).selectOption({ label: 'Dark' })
    await expectTheme(page, 'dark')
    await themeSel(page).selectOption({ label: 'Light' })
    await expectTheme(page, 'light')
    await expect(page.getByRole('alert')).toHaveCount(0)
  })
})
