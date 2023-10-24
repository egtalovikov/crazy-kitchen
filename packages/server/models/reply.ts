import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export type Reply = {
  message: string
}

export const ReplyModel: ModelAttributes<Model, Reply> = {
  message: {
    type: DataType.STRING(2000),
  },
}
