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
import { dbConnect } from './db'
import apiRouter from './api/api-router'
import bodyParser from 'body-parser'

const app = express()

const port = Number(process.env.SERVER_PORT) || 3001

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
  
  console.log('startServer')
  await dbConnect() // Дождаться запуска базы данных
  await new Promise(resolve => setTimeout(resolve, 5000))

  app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:2999')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  })
  
  app.use(bodyParser.json())
  app.use('/api/v2', apiRouter)

  return { app }
}

bootstrap()
  .then(async ({ app }) => {
    // @ts-ignore
    await listen(app, { port })
  })
  .catch(console.error)
