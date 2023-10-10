import { TTopic, TTopicServerData } from '../api/forum/forum.types'

class DataMapper {
  public mapServerTopicData(data: TTopicServerData): TTopic {
    return {
      id: data.id,
      title: data.topic,
      message: data.message,
      userId: data.userId,
      author: data.author,
      createdDate: data.createdAt,
      authorAvatar: data.authorAvatar,
    }
  }
}

const mapper = new DataMapper()
export default mapper
