import axios, { InternalAxiosRequestConfig } from 'axios'

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export { $host, $authHost }
