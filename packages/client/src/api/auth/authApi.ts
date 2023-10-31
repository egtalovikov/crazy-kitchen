import API from '../api.path'

import BaseApiWithoutAuth from '@api/BaseApiWithoutAuth'
import { setCookie } from '@utils/cookie'

class AuthApi extends BaseApiWithoutAuth {
  constructor() {
    super(API.ENDPOINTS.AUTH.ENDPOINT)
  }

  public async token(UserId: number): Promise<void> {
    if (UserId) {
      this.http
        .post(
          API.ENDPOINTS.AUTH.SAVE,
          JSON.stringify({
            UserId: UserId,
          })
        )
        .then(response => {
          setCookie('token', response.data.token)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}

const authApi = new AuthApi()
export default authApi
