import { TTopic, TTopicForSave, TTopicServerData } from './forum.types'
import mapper from '../../utils/dataMapper'

import API from '../api.path'
import BaseApi from '../BaseApi'

class ForumApi extends BaseApi {
  constructor() {
    super(API.ENDPOINTS.FORUM.ENDPOINT)
  }
  public async saveTopic(
    data: TTopicForSave,
    callback: (topic: TTopic) => void,
    errorCallback: (error: string) => void
  ): Promise<void> {
    console.log('saveTopic клиент')
    this.http
      .post(
        API.ENDPOINTS.FORUM.TOPICS,
        JSON.stringify({
          topicName: data.topicName,
          message: data.message,
          authorId: data.authorId,
        })
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // }
      )
      .then(response => {
        callback(mapper.mapServerTopicData(response.data as TTopicServerData))
      })
      .catch(error => {
        errorCallback(error)
      })
  }
}

const forumApi = new ForumApi()
export default forumApi
