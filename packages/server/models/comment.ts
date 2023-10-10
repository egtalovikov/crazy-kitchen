import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table
export class CommentModel extends Model<CommentModel> {
  @Column(DataType.STRING)
  message: string | undefined

  @Column(DataType.INTEGER)
  topicId: number | undefined

  @Column(DataType.INTEGER)
  authorId: number | undefined
}
