import axios, { AxiosInstance } from 'axios'
import API from './api.path'

abstract class BaseApi {
  protected http: AxiosInstance

  protected constructor(endpoint: string) {
    this.http = axios.create({
      baseURL: `${API.HOST}` + endpoint,
      withCredentials: true,
      // headers: {
      //   'Access-Control-Allow-Origin': "*",
      //   origin: 'http://localhost:2999'
      // },
    })
  }
}

export default BaseApi
