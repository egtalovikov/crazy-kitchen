import { TopicModel } from '../models/topic'
import { CommentModel } from '../models/comment'

class TopicService {
  async createTopic(topicName: string, message: string, authorId: number) {
    const topic = await TopicModel.create({
      topicName,
      message,
      authorId,
    } as TopicModel)
    return topic
  }

  findTopicById(id: number) {
    return TopicModel.findByPk(id)
  }

  getTopicAll(limit: number, isOrderUpdatedASC = false) {
    const UpdatedOrder = isOrderUpdatedASC ? 'ASC' : 'DESC'
    return TopicModel.findAndCountAll({
      offset: limit,
      limit,
      order: [['updatedAt', UpdatedOrder]],
    })
  }

  async getCommentsByTopicId(topicId: number, limit: number) {
    return CommentModel.findAll({
      where: {
        topicId: topicId,
      },
      limit: limit,
    })
  }
}

const topicService = new TopicService()
export default topicService
