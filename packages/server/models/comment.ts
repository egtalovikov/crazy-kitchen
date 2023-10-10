import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class commentModel extends Model<commentModel> {
  @Column(DataType.STRING)
  message: string | undefined

  @Column(DataType.INTEGER)
  topicId: number | undefined

  @Column(DataType.INTEGER)
  userId: number | undefined
}
