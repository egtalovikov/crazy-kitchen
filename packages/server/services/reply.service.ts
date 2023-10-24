import { Reply } from '../db'

class ReplyService {
  async createReply(
    message: string,
    TopicId: number,
    UserId: number,
    CommentId: number
  ) {
    await Reply.create({
      message,
      TopicId,
      UserId,
      CommentId,
    })
  }
}

const replyService = new ReplyService()
export default replyService
