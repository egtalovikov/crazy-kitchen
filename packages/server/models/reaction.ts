import { Column, DataType, Model, Table } from 'sequelize-typescript'

export const Reactions = {
  like: '👍',
  heart: '❤️',
  fire: '🔥',
  tear: '😢',
  thanks: '🙏',
} as const

export type Reaction = {
  reaction: typeof Reactions
}

@Table
export class ReactionModel extends Model<ReactionModel> {
  @Column(
    DataType.ENUM(
      Reactions.like,
      Reactions.heart,
      Reactions.fire,
      Reactions.tear,
      Reactions.thanks
    )
  )
  reaction!: keyof typeof Reactions
}
