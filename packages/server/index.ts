import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

import { createApp } from 'h3'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import { listen } from 'listhen'
import sirv from 'sirv'

dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

const DEV_ENV = 'development'

const bootstrap = async () => {
  const app = createApp()
  let vite: ViteDevServer

  if (process.env.NODE_ENV === DEV_ENV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    })

    // @ts-ignore
    app.use(vite.middlewares)
  } else {
    // @ts-ignore
    app.use(
      // @ts-ignore
      sirv('dist/client', {
        gzip: true,
      })
    )
  }

  // @ts-ignore
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl
    let template, render

    try {
      if (process.env.NODE_ENV === DEV_ENV) {
        template = fs.readFileSync(path.resolve('./index.html'), 'utf-8')

        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
      } else {
        template = fs.readFileSync(
          path.resolve('dist/client/index.html'),
          'utf-8'
        )
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      }

      const appHtml = await render({ path: url })

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html').end(html)
    } catch (error) {
      // @ts-ignore
      vite.ssrFixStacktrace(error)
      next(error)
    }
  })

  return { app }
}

bootstrap()
  .then(async ({ app }) => {
    // @ts-ignore
    await listen(app, { port })
  })
  .catch(console.error)
