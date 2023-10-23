import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../api.error'
import authService from '../services/auth.service'

class AuthController {
  async saveToken(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка переданных данных', errors.array())
        )
      }
      const { UserId } = req.body
      const data = await authService.saveToken(UserId)
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}
const authController = new AuthController()
export default authController
