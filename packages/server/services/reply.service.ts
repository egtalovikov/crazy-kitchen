import { ReplyModel } from '../models/reply'

class ReplyService {
  async createReply(
    message: string,
    topicId: number,
    authorId: number,
    replyId: number
  ) {
    const reply = await ReplyModel.create({
      message,
      topicId,
      authorId,
      replyId,
    } as ReplyModel)
    return reply
  }
}

const replyService = new ReplyService()
export default replyService
