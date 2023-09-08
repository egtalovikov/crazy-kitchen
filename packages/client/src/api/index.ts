import axios, { InternalAxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true
  return config
}

$host.interceptors.request.use(authInterceptor)

export { $host }
