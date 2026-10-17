import { copy } from './copy'

// Phase 2 shell: renders the title only. No features yet.
export function App() {
  return (
    <header>
      <h1>{copy.app.title}</h1>
    </header>
  )
}
