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
export class reactionModel extends Model<Reaction> {
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
