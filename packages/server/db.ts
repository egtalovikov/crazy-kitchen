import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { CommentModel } from './models/comment'
import { ReactionModel } from './models/reaction'
import { ReplyModel } from './models/reply'
import { TopicModel } from './models/topic'
import dotenv from 'dotenv'
import { Op } from 'sequelize'
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

//Устанавливаем связи между таблицами
// TopicModel.hasMany(commentModel, { foreignKey: 'topicId' });
// commentModel.belongsTo(topicModel);
// commentModel.hasMany(replyModel, { foreignKey: { allowNull: false } });
// commentModel.hasMany(reactionModel, { foreignKey: { allowNull: false } });
// replyModel.belongsTo(commentModel);
// reactionModel.belongsTo(commentModel);

export async function dbConnect() {
  console.log('dbConnect')
  try {
    await sequelize.addModels([
      TopicModel,
      ReactionModel,
      ReplyModel,
      CommentModel,
    ])
    // Синхронизация базы данных
    await sequelize.sync({ alter: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
export { Op }
