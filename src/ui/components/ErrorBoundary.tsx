import { Component, type ReactNode } from 'react'
import { copy } from '../copy'

// Spec §10: no error may reach the user as a blank screen.
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="fatal" role="alert">
          {copy.fatal}
        </p>
      )
    }
    return this.props.children
  }
}
