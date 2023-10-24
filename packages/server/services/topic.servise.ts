import { Comment, Reply, Topic, User } from '../db'

class TopicService {
  async createTopic(topicName: string, message: string, UserId: number) {
    try {
      await Topic.create({ topicName, message, UserId })
    } catch (e) {
      console.log('ошибка из сервиса', e)
    }
  }

  async findTopicById(id: number) {
    const topic = await Topic.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['first_name', 'second_name', 'display_name', 'avatar'],
        },
      ],
    })

    if (!topic) {
      throw new Error('Топик не найден')
    }
    return topic
  }

  getTopicAll(limit = 10, isOrderUpdatedASC = false) {
    const topics = Topic.findAll({
      limit: limit,
      order: [['updatedAt', isOrderUpdatedASC ? 'ASC' : 'DESC']],
      include: [
        {
          model: User,
          attributes: ['first_name', 'second_name', 'display_name', 'avatar'],
        },
      ],
    })
    return topics
  }

  async getCommentsByTopicId(TopicId: number) {
    try {
      const comments = await Comment.findAll({
        where: {
          TopicId: TopicId,
        },
        include: [
          {
            model: User,
            attributes: ['first_name', 'second_name', 'display_name', 'avatar'],
          },
          {
            model: Reply,
            attributes: ['message'],
            include: [
              {
                model: User,
                attributes: [
                  'first_name',
                  'second_name',
                  'display_name',
                  'avatar',
                ],
              },
            ],
          },
        ],
      })
      return comments
    } catch (error) {
      console.error('error:', error)
      throw error
    }
  }
}

const topicService = new TopicService()
export default topicService
