import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class topicModel extends Model<topicModel> {
  @Column(DataType.STRING)
  topicName: string | undefined

  @Column(DataType.STRING)
  message: string | undefined

  @Column(DataType.INTEGER)
  authorId: number | undefined
}
