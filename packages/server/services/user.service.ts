import { User } from '../db'
import type { IUser } from '../models/user'

class UserService {
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
}

const userService = new UserService()
export default userService
