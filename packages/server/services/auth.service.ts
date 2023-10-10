import type { v4 as uuidv4 } from 'uuid'
import { Auth, Op } from '../db'

class AuthService {
  //проверка авторизации (для мидлвара)
  checkUserAuth(uuid: typeof uuidv4, authCookie: string) {
    return Auth.findOne({
      where: {
        [Op.and]: [
          { uuid: `${uuid}` },
          { authCookie: `${authCookie}` },
          { expires: { [Op.gte]: Date.now() } },
        ],
      },
    })
  }

  //добавим авторизацию в таблицу
  addCookie(Cookie: string, login?: string) {
    console.log('addCookie', Cookie, login)
    const parseAuthCookie = Cookie.match(
      /.*authCookie=([^;]*);.*?Expires=(.+?GMT);/
    )
    const parseUUIDs = Cookie.match(/.*uuid=([\w-]*)/)

    if (parseAuthCookie && parseUUIDs && parseUUIDs[1]) {
      console.log('found Cookie')
      const expires = Date.parse(parseAuthCookie[2])
      const authCookie = parseAuthCookie[1]

      return Auth.findOrCreate({
        where: { uuid: `${parseUUIDs[1]}` },
        defaults: { authCookie, login, expires },
      })
    }
    return console.log('not found Cookie')
  }

  updateUserId(uuid: any, UserId: number) {
    return Auth.update(
      { UserId: `${UserId}` },
      {
        where: {
          uuid: `${uuid}`,
        },
      }
    )
  }
}

const authService = new AuthService()
export default authService
