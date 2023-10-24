import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { dbConnect } from './db'
import apiRouter from './api/api-router'
import bodyParser from 'body-parser'
//import {yandexRouter} from "./utils/constants";

const app = express()
app.use(bodyParser.json())

const port = Number(process.env.SERVER_PORT) || 3001

async function startServer() {
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
  //app.use('/api/v2', yandexRouter)
  // app.use(
  //   '/api/v2',
  //   createProxyMiddleware({
  //     changeOrigin: true,
  //     cookieDomainRewrite: {
  //       '*': '',
  //     },
  //     target: 'https://ya-praktikum.tech',
  //     selfHandleResponse: true,
  //     headers: {
  //       Connection: 'keep-alive',
  //     },
  //     onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req) => {
  //       console.log('1111')
  //       if (
  //         /\/api\/v2\/o?auth((\/sign(in|up))|(\/yandex))/.test(
  //           (req as express.Request).path
  //         ) &&
  //         proxyRes.headers['set-cookie']
  //       ) {
  //         console.log('если запрос на авторизацию')
  //         authService.addCookie(
  //           decodeURIComponent(proxyRes.headers['set-cookie']?.toString())
  //         )
  //       } else if (
  //         (req as express.Request).path === '/api/v2/auth/user' &&
  //         req.headers.cookie
  //       ) {
  //         console.log('если сделали запрос юзера', responseBuffer)
  //         if (responseBuffer.toString()) {
  //           await userService.createUserUpdCookie(
  //             JSON.parse(responseBuffer.toString()),
  //             decodeURIComponent(req.headers.cookie)
  //           )
  //         }
  //       }
  //       return responseBuffer
  //     }),
  //   })
  // )

  app.use(bodyParser.json())

  // @ts-ignore
  //app.use('/api/v2', cookieParser(), authMiddleware, apiRouter)
  app.use('/api/v2', apiRouter)

  await app.get('/', (_, res) => {
    res.json('👋 howdy from the server :)')
  })

  await app.listen(port, () => {
    console.log(`➜ 🎸 server is listening on port!: ${port}`)
  })
}
void startServer()
