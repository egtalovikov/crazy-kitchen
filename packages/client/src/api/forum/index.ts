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
    return $ourHost.get(`/comments/${id}/100`)
  }

  async createTopic(authorId: number | null, title: string, mainText: string) {
    return $ourHost.post('/topics', {
      authorId,
      title,
      mainText,
    })
  }

  async createComment(
    topicId: number,
    message: string,
    authorId: number | null
  ) {
    return $ourHost.post('/comments', {
      topicId,
      message,
      authorId,
    })
  }
}

const forumApi = new ForumApi()
export default forumApi
