import type { NextFunction, Request, Response } from 'express'

import authService from '../services/auth.service'
import { ApiError } from '../api.error'
import jsonwebtoken from 'jsonwebtoken'

export default async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization
  if (!token) {
    return next(ApiError.UnauthorizedError())
  }
  try {
    if (token) {
      token = token.replace('Bearer ', '')
      const data = (await authService.checkUserAuth(token)) as any
      const { secretKey } = await data
      if (!secretKey) {
        return next(ApiError.UnauthorizedError())
      }
      if (secretKey) {
        // Токен найден
        jsonwebtoken.verify(token, secretKey)
        return next()
      }
    }
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}
