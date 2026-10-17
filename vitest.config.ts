// Spec §12.1 (D-15): every Vitest run uses the Asia/Karachi time zone.
process.env.TZ = 'Asia/Karachi'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    passWithNoTests: true,
    env: { TZ: 'Asia/Karachi' },
    reporters: ['default', 'json'],
    outputFile: { json: 'reports/vitest.json' },
    projects: [
      {
        test: {
          name: 'domain',
          environment: 'node',
          include: ['src/domain/**/*.test.ts', 'test/**/*.test.ts'],
        },
      },
      {
        plugins: [react()],
        test: {
          name: 'ui',
          environment: 'jsdom',
          include: ['src/ui/**/*.test.{ts,tsx}', 'src/storage/**/*.test.{ts,tsx}'],
          setupFiles: ['test/setup.ts'],
        },
      },
    ],
  },
})
