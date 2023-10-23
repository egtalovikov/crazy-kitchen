import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { dbConnect } from './db'
import apiRouter from './api/api-router'
import bodyParser from 'body-parser'
import authMiddleware from './middlewares/auth-middleware'

const app = express()
app.use(bodyParser.json())

const port = Number(process.env.SERVER_PORT) || 3001

async function startServer() {
  await dbConnect() // Дождаться запуска базы данных
  await new Promise(resolve => setTimeout(resolve, 5000))

  app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:2999')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.header('Access-Control-Allow-Credentials', 'true')

    next()
  })

  app.use(bodyParser.json())

  app.use(
    '/api/v2',
    function (req, res, next) {
      if (req.method === 'OPTIONS') {
        res.sendStatus(204)
      }

      if (req.originalUrl.startsWith('/api/v2/auth')) {
        return next()
      }
      authMiddleware(req, res, next)
    },
    apiRouter
  )

  await app.get('/', (_, res) => {
    res.json('👋 howdy from the server :)')
  })

  await app.listen(port, () => {
    console.log(`➜ 🎸 server is listening on port!: ${port}`)
  })
}
void startServer()
