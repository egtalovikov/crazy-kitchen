import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export type TopicCreationAttributes = {
  topicName: string
  message: string
}

export const TopicModel: ModelAttributes<Model, TopicCreationAttributes> = {
  topicName: {
    type: DataType.STRING,
    allowNull: false,
  },
  message: {
    type: DataType.STRING(2000),
  },
}
