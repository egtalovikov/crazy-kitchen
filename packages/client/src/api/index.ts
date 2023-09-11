import axios, { InternalAxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  // baseURL: __BASE_URL__,
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true
  return config
}

$host.interceptors.request.use(authInterceptor)

export { $host }
