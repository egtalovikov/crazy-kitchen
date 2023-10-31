import axios, { AxiosInstance } from 'axios'
import API from './api.path'

abstract class BaseApiWithoutAuth {
  protected http: AxiosInstance

  protected constructor(endpoint: string) {
    this.http = axios.create({
      baseURL: `${API.HOST}` + endpoint,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export default BaseApiWithoutAuth
