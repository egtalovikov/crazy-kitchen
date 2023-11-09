import React, { useEffect } from 'react'
import './App.css'
import AppRouter from './components/AppRouter'
import { store } from './store'
import { fetchUserData } from './store/modules/auth/auth.reducer'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useColorTheme } from './theme/useColorTheme'
import { fetchUserTheme } from './store/modules/theme/theme.reducer'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const { theme } = useColorTheme()

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      console.log(data)
    }

    fetchServerData()
  }, [])

  useEffect(() => {
    store.dispatch(fetchUserData())

    store.dispatch(fetchUserTheme())
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
