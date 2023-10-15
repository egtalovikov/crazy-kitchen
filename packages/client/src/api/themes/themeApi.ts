import BaseApi from '../BaseApi'
import API from '../api.path'
import { TThemeData, TChangeThemeRequestData } from './theme.types'

type TThemeRequestData = {
  theme: TThemeData | null
  error: Error | null
}

class ThemeApi extends BaseApi {
  constructor() {
    super(API.ENDPOINTS.THEME.ENDPOINT)
  }

  public async saveTheme(
    requestData: TChangeThemeRequestData
  ): Promise<TThemeRequestData> {
    try {
      const result = await this.http.post('', {
        ...requestData,
      })

      const { data } = result

      return { theme: data, error: null }
    } catch (error: unknown) {
      console.debug(error)
      return { theme: null, error: error as Error }
    }
  }

  public async getTheme(): Promise<TThemeRequestData> {
    try {
      const result = await this.http.get('')

      const { data } = result

      return { theme: data, error: null }
    } catch (error: unknown) {
      console.debug(error)
      return { theme: null, error: error as Error }
    }
  }
}

export default new ThemeApi()
