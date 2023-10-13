import React, { useEffect } from 'react'
import './App.css'
import AppRouter from './components/AppRouter'
import { store } from './store'
import { fetchUserData } from './store/modules/auth/auth.reducer'
import CssBaseline from '@mui/material/CssBaseline'
import ErrorBoundary from '@components/ErrorBoundary'
import { Provider } from 'react-redux'

function App() {
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
  }, [])

  return (
    <>
      <AppRouter />
      <React.StrictMode>
        <ErrorBoundary>
          <Provider store={store}>
            <CssBaseline />
          </Provider>
        </ErrorBoundary>
      </React.StrictMode>
    </>
  )
}

export default App
