import { AppProvider } from './AppContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { HistoryPanel } from './components/HistoryPanel'
import { LoanForm } from './components/LoanForm'
import { ResultsPanel } from './components/ResultsPanel'

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="page">
          <Header />
          <main className="layout">
            {/* No semantics: bounds the sticky form to the form/results row (D-69). */}
            <div className="layout-main">
              <LoanForm />
              <ResultsPanel />
            </div>
            <HistoryPanel />
          </main>
        </div>
      </AppProvider>
    </ErrorBoundary>
  )
}
