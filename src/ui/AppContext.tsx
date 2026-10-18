import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'
import { loadSettings, saveSettings, type Settings, type Theme } from '../storage/settings'
import { appReducer, initialState, type Action, type AppState } from './appReducer'

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<Action>
  /** Changes a setting and persists it (spec §3.2: "Update settings and persist"). */
  updateSettings: (change: Partial<Settings>) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const DARK_QUERY = '(prefers-color-scheme: dark)'

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme !== 'system') return theme
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

/** Applies the resolved theme to <html> and follows the device while "System" is chosen. */
function useAppliedTheme(theme: Theme) {
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(theme)
    }
    apply()
    if (theme !== 'system') return
    const media = window.matchMedia(DARK_QUERY)
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])
}

// Settings are read before the first render, so the selects never flash the defaults.
const init = (): AppState => ({ ...initialState, settings: loadSettings() })

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, init)
  useAppliedTheme(state.settings.theme)

  function updateSettings(change: Partial<Settings>) {
    if (change.currency) dispatch({ type: 'setCurrency', currency: change.currency })
    if (change.theme) dispatch({ type: 'setTheme', theme: change.theme })
    saveSettings({ ...state.settings, ...change })
  }

  return (
    <AppContext.Provider value={{ state, dispatch, updateSettings }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const value = useContext(AppContext)
  if (!value) throw new Error('useApp must be used inside <AppProvider>')
  return value
}
