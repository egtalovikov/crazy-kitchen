import API from '../api.path'
import BaseApi from '../BaseApi'
import { getTokenFromCookie } from '@utils/cookie'

class UserApi extends BaseApi {
  constructor() {
    super(API.ENDPOINTS.USER.ENDPOINT)
  }
  public async saveUser(data: any): Promise<void> {
    const token = getTokenFromCookie('token')
    this.http
      .post(
        API.ENDPOINTS.USER.SAVE,
        JSON.stringify({
          id: data.id,
          first_name: data.first_name,
          second_name: data.second_name,
          display_name: data.display_name,
          login: data.login,
          avatar: data.avatar,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(response => {
        console.log('response', response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const userApi = new UserApi()
export default userApi
