import API from '../api.path'
import BaseApi from '../BaseApi'

class ForumApi extends BaseApi {
  constructor() {
    super(API.ENDPOINTS.FORUM.ENDPOINT)
  }
  //методы
}

const forumApi = new ForumApi()
export default forumApi
