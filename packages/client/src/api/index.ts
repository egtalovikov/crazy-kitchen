import axios, { InternalAxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  // baseURL: __BASE_URL__,
})

const $ourHost = axios.create({
  baseURL: 'http://localhost:3001/api/v2',
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true
  return config
}

$host.interceptors.request.use(authInterceptor)

export { $host, $ourHost }
