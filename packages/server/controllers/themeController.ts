import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import type { ISiteTheme } from '../models/theme/theme'
import themeService from '../services/themeService'
import type { IUserTheme } from '../models/theme/userTheme'
import ApiError from '../exceptions/apiError'

class ThemesController {
  createThemes = async (themesData: Omit<ISiteTheme, 'uuid'>[]) => {
    try {
      return await themeService.createManyThemes(themesData)
    } catch (e) {
      return console.error(e)
    }
  }

  createTheme = async (theme: Omit<ISiteTheme, 'uuid'>) => {
    try {
      const [{ dataValues: newTheme }] = await themeService.createTheme(theme)
      return newTheme
    } catch (e) {
      return console.error(e)
    }
  }

  getTheme = async (data: {
    uuid?: string
    name?: string
  }): Promise<ISiteTheme | undefined | void> => {
    try {
      const response = await themeService.getTheme(data)
      const { dataValues } = response ?? {}
      return dataValues
    } catch (e) {
      return console.error(e)
    }
  }

  createUserTheme = async (data: {
    themeId: string
    userId: number
  }): Promise<IUserTheme | undefined | void> => {
    try {
      const response = await themeService.createUserTheme(data)
      const { dataValues } = response ?? {}
      return dataValues
    } catch (e) {
      return console.error(e)
    }
  }

  changeUserTheme = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка переданных данных', errors.array())
        )
      }

      const data = req.body
      const [, updated] = await themeService.changeUserTheme(data)

      return res.json(updated)
    } catch (e) {
      return console.error(e)
    }
  }

  getUserTheme = async (data: {
    uuid: string
  }): Promise<IUserTheme | undefined | void> => {
    try {
      const response = await themeService.getUserTheme(data)
      const { dataValues } = response ?? {}
      return dataValues
    } catch (e) {
      return console.error(e)
    }
  }
}

export default new ThemesController()
