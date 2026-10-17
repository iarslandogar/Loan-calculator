// Traceability checker (spec §12.5): roles → jobs → stories → ACs → tests.
// Usage: node scripts/trace.mjs [--results]. No dependencies.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const WITH_RESULTS = process.argv.includes('--results')
const BROWSERS = ['chromium', 'firefox', 'webkit']
const errors = []
const warnings = []

const read = (path) => readFileSync(join(ROOT, path), 'utf8').replace(/\r\n/g, '\n')
const tagsIn = (text) => [...text.matchAll(/\[(AC-\d+\.\d+)\]/g)].map((m) => m[1])

// ── 1. Parse the documents ────────────────────────────────────────────────

// Roles: rows of the table in app-roles.md, e.g. "| R-1 | Prospective Borrower | ..."
const roles = new Set(
  [...read('docs/app-roles.md').matchAll(/^\|\s*(R-\d+)\s*\|/gm)].map((m) => m[1]),
)

// Jobs: "| J-1 | R-1 Prospective Borrower | S-1, S-2, S-4, S-15 (backlog) |"
const jobs = new Map()
for (const m of read('docs/jobs-to-be-done.md').matchAll(
  /^\|\s*(J-\d+)\s*\|\s*([^|]*)\|([^|]*)\|/gm,
)) {
  const role = m[2].match(/R-\d+/)?.[0] ?? null
  jobs.set(m[1], { role, listed: [...m[3].matchAll(/S-\d+/g)].map((x) => x[0]) })
}

// Stories: the index table, "| S-1 | Title | R-1 | J-1 | v1 | Not implemented |"
const storiesText = read('docs/user-stories.md')
const stories = new Map()
for (const m of storiesText.matchAll(
  /^\|\s*(S-\d+)\s*\|([^|]*)\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*$/gm,
)) {
  if (stories.has(m[1])) errors.push(`${m[1]} appears twice in the story index`)
  stories.set(m[1], {
    title: m[2].trim(),
    role: m[3],
    job: m[4],
    scope: m[5],
    status: m[6],
    acs: [],
  })
}

// Story sections: "## S-1 Title" followed by "**Role:** R-1 ... · **Serves:** J-1 · **Scope:** v1 · **Status:** ..."
for (const m of storiesText.matchAll(
  /^## (S-\d+) .*\n\*\*Role:\*\* (R-\d+)[^·\n]*· \*\*Serves:\*\* (J-\d+) · \*\*Scope:\*\* (\S+) · \*\*Status:\*\* (.+)$/gm,
)) {
  const s = stories.get(m[1])
  if (!s) {
    errors.push(`${m[1]} has a section but no row in the story index`)
    continue
  }
  const section = { role: m[2], job: m[3], scope: m[4], status: m[5].trim() }
  for (const key of ['role', 'job', 'scope', 'status']) {
    if (section[key] !== s[key]) {
      errors.push(
        `${m[1]}: ${key} is "${s[key]}" in the index but "${section[key]}" in its section`,
      )
    }
  }
}

// ACs: "- **AC-1.1** Given ..."
const acs = new Map()
for (const m of storiesText.matchAll(/^- \*\*(AC-(\d+)\.\d+)\*\*/gm)) {
  const id = m[1]
  const storyId = `S-${m[2]}`
  if (acs.has(id)) errors.push(`${id} is defined twice`)
  const story = stories.get(storyId)
  if (!story) {
    errors.push(`${id} belongs to unknown story ${storyId}`)
    continue
  }
  acs.set(id, storyId)
  story.acs.push(id)
}

// ── 2. Structural checks ──────────────────────────────────────────────────

const VALID_SCOPES = new Set(['v1', 'Backlog'])
const VALID_STATUSES = new Set(['Not implemented', 'Implemented'])

for (const [id, job] of jobs) {
  if (!job.role || !roles.has(job.role))
    errors.push(`${id} references unknown role ${job.role ?? '(none)'}`)
}
for (const [id, s] of stories) {
  if (!roles.has(s.role)) errors.push(`${id} references unknown role ${s.role}`)
  if (!jobs.has(s.job)) errors.push(`${id} references unknown job ${s.job}`)
  else if (jobs.get(s.job).role !== s.role) {
    errors.push(`${id} has role ${s.role} but its job ${s.job} belongs to ${jobs.get(s.job).role}`)
  }
  if (!VALID_SCOPES.has(s.scope)) errors.push(`${id} has unknown scope "${s.scope}"`)
  if (!VALID_STATUSES.has(s.status)) errors.push(`${id} has unknown status "${s.status}"`)
  if (s.acs.length === 0) errors.push(`${id} has no acceptance criteria`)
}
for (const [id, job] of jobs) {
  const serving = [...stories].filter(([, s]) => s.job === id).map(([sid]) => sid)
  if (serving.length === 0) errors.push(`${id} has no story`)
  const listed = [...job.listed].sort().join(', ')
  const actual = [...serving].sort().join(', ')
  if (listed !== actual) {
    errors.push(`${id}: jobs table lists [${listed}] but the story index maps [${actual}]`)
  }
}

// ── 3. Test tags ──────────────────────────────────────────────────────────

function walk(dir, pattern, out = []) {
  if (!existsSync(join(ROOT, dir))) return out
  for (const name of readdirSync(join(ROOT, dir))) {
    const rel = join(dir, name)
    if (name === 'node_modules') continue
    if (statSync(join(ROOT, rel)).isDirectory()) walk(rel, pattern, out)
    else if (pattern.test(name)) out.push(rel)
  }
  return out
}

const testFiles = [...walk('src', /\.test\.tsx?$/), ...walk('e2e', /\.spec\.ts$/)]
const testsByAc = new Map()
for (const file of testFiles) {
  for (const tag of new Set(tagsIn(read(file)))) {
    if (!acs.has(tag)) {
      errors.push(`${relative(ROOT, file)} references unknown ${tag}`)
      continue
    }
    if (!testsByAc.has(tag)) testsByAc.set(tag, new Set())
    testsByAc.get(tag).add(file.replace(/\\/g, '/'))
  }
}

const untested = []
for (const [ac, storyId] of acs) {
  const scope = stories.get(storyId).scope
  if (scope === 'v1' && !testsByAc.has(ac)) untested.push(ac)
  if (scope === 'Backlog' && testsByAc.has(ac)) warnings.push(`Backlog ${ac} has a test`)
}
if (untested.length > 0)
  errors.push(`${untested.length} v1 AC(s) have no test: ${untested.join(', ')}`)

// ── 4. Results (--results) ────────────────────────────────────────────────

const resultByAc = new Map() // ac -> { vitest: [{name, ok}], playwright: Map(title -> Map(project -> status)) }
const entry = (ac) => {
  if (!resultByAc.has(ac)) resultByAc.set(ac, { vitest: [], playwright: new Map() })
  return resultByAc.get(ac)
}

function loadJson(path) {
  if (!existsSync(join(ROOT, path))) {
    errors.push(`--results: ${path} not found (run npm test and npm run test:e2e first)`)
    return null
  }
  try {
    return JSON.parse(read(path))
  } catch (e) {
    errors.push(`--results: ${path} is not valid JSON (${e.message})`)
    return null
  }
}

if (WITH_RESULTS) {
  const vitest = loadJson('reports/vitest.json')
  for (const file of vitest?.testResults ?? []) {
    for (const t of file.assertionResults ?? []) {
      const name = t.fullName ?? [...(t.ancestorTitles ?? []), t.title].join(' ')
      for (const tag of tagsIn(name)) entry(tag).vitest.push({ name, ok: t.status === 'passed' })
    }
  }

  const playwright = loadJson('reports/playwright.json')
  const visit = (suite, ancestors) => {
    const titles = [...ancestors, suite.title ?? '']
    for (const spec of suite.specs ?? []) {
      const full = [...titles, spec.title].join(' ')
      for (const tag of tagsIn(full)) {
        const byProject = entry(tag).playwright.get(full) ?? new Map()
        for (const t of spec.tests ?? []) byProject.set(t.projectName, t.status)
        entry(tag).playwright.set(full, byProject)
      }
    }
    for (const child of suite.suites ?? []) visit(child, titles)
  }
  for (const suite of playwright?.suites ?? []) visit(suite, [])

  // Spec §12.5(4), D-31: for Implemented stories, every tagged test passed, and every
  // Playwright test passed in all three browser projects ("expected" status only).
  for (const [id, s] of stories) {
    if (s.status !== 'Implemented') continue
    for (const ac of s.acs) {
      const r = resultByAc.get(ac)
      if (!r || (r.vitest.length === 0 && r.playwright.size === 0)) {
        errors.push(`${id} is Implemented but ${ac} has no test results`)
        continue
      }
      for (const t of r.vitest) if (!t.ok) errors.push(`${id}: ${ac} failed in Vitest: ${t.name}`)
      for (const [title, byProject] of r.playwright) {
        for (const b of BROWSERS) {
          const status = byProject.get(b)
          if (status !== 'expected') {
            errors.push(`${id}: ${ac} did not pass in ${b} (${status ?? 'not run'}): ${title}`)
          }
        }
      }
    }
  }
}

// ── 5. Report ─────────────────────────────────────────────────────────────

const pad = (s, n) => String(s).padEnd(n)
console.log(
  `\nTraceability: ${roles.size} roles, ${jobs.size} jobs, ${stories.size} stories, ${acs.size} ACs, ${testFiles.length} test files\n`,
)
console.log(
  `${pad('Story', 6)} ${pad('Scope', 8)} ${pad('Status', 16)} ${pad('ACs', 4)} ${pad('Tested', 7)}${WITH_RESULTS ? ' Results' : ''}`,
)
for (const [id, s] of stories) {
  const tested = s.acs.filter((ac) => testsByAc.has(ac)).length
  let results = ''
  if (WITH_RESULTS) {
    const ran = s.acs.filter((ac) => resultByAc.has(ac))
    const failing = ran.filter((ac) => {
      const r = resultByAc.get(ac)
      return (
        r.vitest.some((t) => !t.ok) ||
        [...r.playwright.values()].some((m) => BROWSERS.some((b) => m.get(b) !== 'expected'))
      )
    })
    results = ` ${ran.length - failing.length}/${s.acs.length} passing`
  }
  console.log(
    `${pad(id, 6)} ${pad(s.scope, 8)} ${pad(s.status, 16)} ${pad(s.acs.length, 4)} ${pad(`${tested}/${s.acs.length}`, 7)}${results}`,
  )
}

for (const w of warnings) console.log(`\nWARN  ${w}`)
if (errors.length > 0) {
  console.log('')
  for (const e of errors) console.log(`FAIL  ${e}`)
  console.log(`\ntrace: ${errors.length} error(s)`)
  process.exit(1)
}
console.log('\ntrace: OK')
