import React, { useEffect } from 'react'
import './App.css'
import AppRouter from './components/AppRouter'
import { store } from './store'
import { fetchUserData } from './store/modules/auth/auth.reducer'
import CssBaseline from '@mui/material/CssBaseline'
import ErrorBoundary from '@components/ErrorBoundary'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { useColorTheme } from './theme/useColorTheme'
import { fetchUserTheme } from './store/modules/theme/theme.reducer'

function App() {
  const { theme } = useColorTheme()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  useEffect(() => {
    store.dispatch(fetchUserData())

    store.dispatch(fetchUserTheme())
  }, [])

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppRouter />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  )
}

export default App
