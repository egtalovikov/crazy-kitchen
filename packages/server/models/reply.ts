import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class replyModel extends Model<replyModel> {
  @Column(DataType.STRING)
  message: string | undefined
}
