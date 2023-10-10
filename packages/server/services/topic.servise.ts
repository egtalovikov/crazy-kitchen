import { topicModel } from '../models/topic'

class TopicService {
  async createTopic(topicName: string, message: string, authorId: number) {
    console.log('createTopic на сервере')
    const topic = await topicModel.create({
      topicName,
      message,
      authorId,
    } as topicModel)
    return topic
  }
}

const topicService = new TopicService()
export default topicService
