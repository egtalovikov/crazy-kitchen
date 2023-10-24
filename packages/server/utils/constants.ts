import * as dotenv from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config({ path: __dirname + '../../.env' })

export const { DOMAIN } = process.env

export const yandexRouter = createProxyMiddleware({
  target: 'https://ya-praktikum.tech',
  changeOrigin: true,
  cookieDomainRewrite: { 'ya-praktikum.tech': `${DOMAIN}`, '*': '' },
  headers: {
    Connection: 'keep-alive',
  },
})
