import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './components/AppRouter'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
          )
        })
        .catch((error: string) => {
          console.log('ServiceWorker registration failed: ', error)
        })
    })
  }
}

startServiceWorker()
