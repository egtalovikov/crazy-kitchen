import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import AppRouter from './components/AppRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from '@/store'
import ErrorBoundary from './components/ErrorBoundary'
import { Provider } from 'react-redux'
import React from 'react'

interface IRenderProps {
  path: string
}

export const render = ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <React.StrictMode>
        <ErrorBoundary>
          <Provider store={store}>
            <CssBaseline />
            <AppRouter />
          </Provider>
        </ErrorBoundary>
      </React.StrictMode>
    </StaticRouter>
  )
}
