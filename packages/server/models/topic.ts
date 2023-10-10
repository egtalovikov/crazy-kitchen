import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class TopicModel extends Model<TopicModel> {
  @Column(DataType.STRING)
  topicName: string | undefined

  @Column(DataType.STRING)
  message: string | undefined

  @Column(DataType.INTEGER)
  authorId: number | undefined
}
