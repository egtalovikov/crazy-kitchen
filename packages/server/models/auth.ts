import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IAuth {
  token: string
  expiresIn: Date
  secretKey: string
}

export const AuthModel: ModelAttributes<Model, IAuth> = {
  token: {
    type: DataType.STRING,
  },
  expiresIn: {
    type: DataType.STRING,
  },
  secretKey: {
    type: DataType.STRING,
  },
}
