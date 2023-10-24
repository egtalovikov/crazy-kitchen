import { User } from '../db'
import type { IUser } from '../models/user'
import authService from './auth.service'

class UserService {
  //временное сохранение юзера
  async saveUser(
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string
  ): Promise<IUser | undefined> {
    try {
      if (id) {
        const [{ dataValues: user }] =
          (await User.upsert({
            id,
            first_name,
            second_name,
            display_name,
            login,
            avatar,
          })) ?? {}
        return user
      }
    } catch (e) {
      console.log(e)
    }
    return undefined
  }

  //нормальное сохранение с куками
  async createUserUpdCookie(
    userObj: IUser,
    cookie: string
  ): Promise<IUser | undefined> {
    const { id, first_name, second_name, display_name, login, avatar } = userObj
    if (id) {
      const [{ dataValues: user }] =
        (await User.upsert({
          id,
          first_name,
          second_name,
          display_name,
          login,
          avatar,
        })) ?? {}

      const cookieParse = cookie.match(/uuid=([\w-]*)/)
      if (cookieParse) {
        const uuid = cookieParse[1] as any
        authService.updateUserId(uuid, id)
      }

      return user
    }

    return undefined
  }
}

const userService = new UserService()
export default userService
