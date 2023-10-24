import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../api.error'

import UserService from '../services/user.service'

class UserController {
  //временное сохранение юзера
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка в данных', errors.array()))
      }
      const { id, first_name, second_name, display_name, login, avatar } =
        req.body
      const data = await UserService.saveUser(
        +id,
        first_name,
        second_name,
        display_name,
        login,
        avatar
      )
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}

const userController = new UserController()
export default userController
