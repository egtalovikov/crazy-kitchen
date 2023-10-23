import { Comment } from '../db'

class CommentService {
  async createComment(message: string, TopicId: number, UserId: number) {
    await Comment.create({
      message,
      TopicId,
      UserId,
    })
  }
}

const commentService = new CommentService()
export default commentService
