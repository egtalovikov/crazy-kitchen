import { CommentModel } from '../models/comment'

class CommentService {
  async createComment(message: string, topicId: number, authorId: number) {
    const comment = await CommentModel.create({
      message,
      topicId,
      authorId,
    } as CommentModel)
    return comment
  }
}

const commentService = new CommentService()
export default commentService
