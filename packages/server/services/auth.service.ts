import { Auth } from '../db'
import { generateToken } from '../api/token'

class AuthService {
  //проверка авторизации (для мидлвара)
  checkUserAuth(token: string) {
    const auth = Auth.findOne({
      where: {
        token: token,
      },
    })
    return auth
  }

  async saveToken(UserId: number) {
    try {
      if (UserId) {
        const { token, expiresIn, secretKey } = generateToken({
          UserId: UserId,
        })
        const [{ dataValues: auth }] =
          (await Auth.upsert({ token, expiresIn, UserId, secretKey })) ?? {}
        return auth
      }
    } catch (e) {
      console.log(e)
    }
    return undefined
  }
}

const authService = new AuthService()
export default authService
