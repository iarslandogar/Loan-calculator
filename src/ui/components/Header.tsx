import { copy } from '../copy'

export function Header() {
  return (
    <header className="app-header">
      <div>
        <h1>{copy.app.title}</h1>
        <p className="tagline">{copy.app.tagline}</p>
      </div>
    </header>
  )
}
