import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import AppRouter from './components/AppRouter'

interface IRenderProps {
  path: string
}

export const render = ({ path }: IRenderProps) => {
  return ReactDOMServer.renderToString(
    <StaticRouter location={path}>
      <AppRouter />
    </StaticRouter>
  )
}
