import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

// Hard rules from CLAUDE.md and spec §3.1, §6, NFR-6, enforced mechanically.
const decimalOnlyFromMoney = {
  name: 'decimal.js',
  message: 'Import Decimal from src/domain/money.ts, never from decimal.js directly (D-36).',
}
const noDirectDecimal = { paths: [decimalOnlyFromMoney] }

export default defineConfig([
  globalIgnores(['dist', 'reports', 'test-results', 'playwright-report', 'node_modules']),
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    extends: [reactHooks.configs.flat.recommended, jsxA11y.flatConfigs.recommended],
    rules: {
      // Spec §6: no locale-dependent formatting of money or dates.
      'no-restricted-globals': [
        'error',
        { name: 'Intl', message: 'Use the custom formatters in src/domain (spec §6).' },
        { name: 'parseFloat', message: 'Money is never a JS number; use Decimal.' },
      ],
      'no-restricted-properties': [
        'error',
        { property: 'toLocaleString', message: 'Use the custom formatters (spec §6).' },
        { property: 'toLocaleDateString', message: 'Use formatDateTime (spec §6).' },
        { property: 'toLocaleTimeString', message: 'Use formatDateTime (spec §6).' },
        { object: 'Number', property: 'parseFloat', message: 'Money is never a JS number.' },
      ],
      'no-restricted-imports': ['error', noDirectDecimal],
      // Spec §8.2 / AC-8.4: the scrollable schedule region must be focusable so the
      // arrow and Page keys scroll it (D-49). Only role="region" is allowed.
      'jsx-a11y/no-noninteractive-tabindex': ['error', { tags: [], roles: ['tabpanel', 'region'] }],
    },
  },
  {
    // Layer rule (spec §3.1): domain imports nothing from ui/ or storage/, nor React.
    files: ['src/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [decimalOnlyFromMoney, 'react', 'react-dom'],
          patterns: [
            {
              group: ['**/ui', '**/ui/**', '**/storage', '**/storage/**'],
              message: 'domain/ must not import ui/ or storage/ (spec §3.1).',
            },
          ],
        },
      ],
    },
  },
  {
    // The one file allowed to import decimal.js; the layer rule still applies.
    files: ['src/domain/money.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: ['react', 'react-dom'],
          patterns: [
            {
              group: ['**/ui', '**/ui/**', '**/storage', '**/storage/**'],
              message: 'domain/ must not import ui/ or storage/ (spec §3.1).',
            },
          ],
        },
      ],
    },
  },
  {
    // Layer rule (spec §3.1): storage imports nothing from ui/.
    files: ['src/storage/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [decimalOnlyFromMoney, 'react', 'react-dom'],
          patterns: [
            { group: ['**/ui', '**/ui/**'], message: 'storage/ must not import ui/ (spec §3.1).' },
          ],
        },
      ],
    },
  },
  {
    files: ['test/**/*.ts', 'e2e/**/*.ts'],
    rules: { 'no-restricted-imports': ['error', noDirectDecimal] },
  },
  prettier,
])
