import { commentModel } from '../models/comment'

class CommentService {
  async createComment(message: string, topicId: number, userId: number) {
    const comment = await commentModel.create({
      message,
      topicId,
      userId,
    } as commentModel)
    return comment
  }
}

const commentService = new CommentService()
export default commentService
