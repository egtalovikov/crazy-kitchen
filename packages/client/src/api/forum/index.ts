import API from '../api.path'
import BaseApi from '../BaseApi'
import { $ourHost } from '../index'

class ForumApi extends BaseApi {
  constructor() {
    super(API.ENDPOINTS.FORUM.ENDPOINT)
  }
  async getTopics() {
    return $ourHost.get('/topics/100')
  }

  async getComments(id: string) {
    return $ourHost.get(`/comments/${id}`)
  }

  async createTopic(UserId: number | null, topicName: string, message: string) {
    return $ourHost.post('/topics', {
      UserId,
      topicName,
      message,
    })
  }

  async createComment(TopicId: number, message: string, UserId: number | null) {
    return $ourHost.post('/comments', {
      TopicId,
      message,
      UserId,
    })
  }
}

const forumApi = new ForumApi()
export default forumApi
