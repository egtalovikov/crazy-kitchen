import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { dbConnect } from './db'
import apiRouter from './api/api-router'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())

const port = Number(process.env.SERVER_PORT) || 3001

async function startServer() {
  console.log('startServer')
  await dbConnect() // Дождаться запуска базы данных
  await new Promise(resolve => setTimeout(resolve, 5000))

  app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:2999')
    res.header('Access-Control-Allow-Origin', 'http://localhost:2999')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  })

  app.use(bodyParser.json())
  app.use('/api/v2', apiRouter)

  await app.get('/', (_, res) => {
    res.json('👋 howdy from the server :)')
  })

  await app.listen(port, () => {
    console.log(`➜ 🎸 server is listening on port!: ${port}`)
  })
}
void startServer()
