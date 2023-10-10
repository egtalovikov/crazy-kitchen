import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { CommentModel } from './models/comment'
import { ReplyModel } from './models/reply'
import { TopicModel } from './models/topic'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
import { UserModel } from './models/user'
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

dotenv.config({ path: '../../.env' })

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: +POSTGRES_PORT!,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
}
// Создаем инстанс Sequelize
export const sequelize = new Sequelize(sequelizeOptions)

// Инициализируем модели
export const User = sequelize.define('User', UserModel, {})
export const Topic = sequelize.define('Topic', TopicModel, {})
export const Comment = sequelize.define('Comment', CommentModel, {})
export const Reply = sequelize.define('Reply', ReplyModel, {})

//Устанавливаем связи между таблицами
User.hasMany(Topic, { foreignKey: 'UserId' })
User.hasMany(Comment, { foreignKey: 'UserId' })
User.hasMany(Reply, { foreignKey: 'UserId' })
Reply.belongsTo(User, { foreignKey: 'UserId' })

Topic.hasMany(Comment, { foreignKey: 'TopicId' })
Topic.hasMany(Reply, { foreignKey: 'TopicId' })

Comment.hasMany(Reply, { foreignKey: 'CommentId' })
Reply.belongsTo(Comment, { foreignKey: 'CommentId' })

Topic.belongsTo(User)
Comment.belongsTo(User)

export async function dbConnect() {
  console.log('dbConnect')
  try {
    // Синхронизация базы данных
    await sequelize.sync({ alter: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
export { Op }
