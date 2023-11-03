import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import sirv from 'sirv'

dotenv.config()

import cors from 'cors'
import express from 'express'
import { dbConnect } from './db'
import apiRouter from './api/api-router'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = Number(process.env.SERVER_PORT) || 3001

const DEV_ENV = 'development'

async function startServer() {
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
      sirv('client/dist', {
        gzip: true,
      })
    )
  }

  await dbConnect() // Дождаться запуска базы данных
  await new Promise(resolve => setTimeout(resolve, 5000))

  app.options('*', cors())

  app.use(function (_req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Credentials', 'true')

    next()
  })

  app.use(bodyParser.json())

  app.use('/api/v2', apiRouter)

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
          path.resolve('client/dist/index.html'),
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

  await app.get('/', (_, res) => {
    res.json('👋 howdy from the server :)')
  })

  // @ts-ignore
  app.use((error, req, res, next) => {
    console.log('Error', error)
    console.log('req', req)
    console.log('Error Handling Middleware called')
    console.log('Error Handling Middleware called')
    console.log('Path: ', req.path)
    next() // (optional) invoking next middleware
  })

  await app.listen(port, () => {
    console.log(`➜ 🎸 server is listening on port!: ${port}`)
  })
}
void startServer()
