// NFR-5: the production JS must be under 150 KB gzipped. No dependencies.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const LIMIT = 150 * 1024
const dir = 'dist/assets'

if (!existsSync(dir)) {
  console.error(`size: ${dir} not found. Run "npm run build" first.`)
  process.exit(1)
}

const files = readdirSync(dir).filter((f) => f.endsWith('.js'))
if (files.length === 0) {
  console.error(`size: no .js files in ${dir}.`)
  process.exit(1)
}

let total = 0
for (const file of files) {
  const gz = gzipSync(readFileSync(join(dir, file)), { level: 9 }).length
  total += gz
  console.log(`  ${file}  ${(gz / 1024).toFixed(1)} KB gzipped`)
}

const verdict = total <= LIMIT ? 'OK' : 'FAIL'
console.log(`size: ${(total / 1024).toFixed(1)} KB of ${LIMIT / 1024} KB gzipped JS: ${verdict}`)
process.exit(total <= LIMIT ? 0 : 1)
