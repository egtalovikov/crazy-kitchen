import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export type Comment = {
  message: string
}

export const CommentModel: ModelAttributes<Model, Comment> = {
  message: {
    type: DataType.STRING(2000),
  },
}
