import { AppProvider } from './AppContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Header } from './components/Header'
import { LoanForm } from './components/LoanForm'
import { ResultsPanel } from './components/ResultsPanel'

export function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="page">
          <Header />
          <main className="layout">
            <LoanForm />
            <ResultsPanel />
          </main>
        </div>
      </AppProvider>
    </ErrorBoundary>
  )
}
