import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class ReplyModel extends Model<ReplyModel> {
  @Column(DataType.STRING)
  message: string | undefined

  @Column(DataType.INTEGER)
  topicId: number | undefined

  @Column(DataType.INTEGER)
  authorId: number | undefined

  @Column(DataType.INTEGER)
  replyId: number | undefined
}
