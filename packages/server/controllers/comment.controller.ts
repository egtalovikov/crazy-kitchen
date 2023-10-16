import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
//import commentService from '../services/comment.service'
import { ApiError } from '../api.error'

class CommentController {
  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка переданных данных', errors.array())
        )
      }
      const { topicId, message, authorId } = req.body
      // const data = await commentService.createComment(
      //   message,
      //   topicId,
      //   authorId
      // )
      //Замокано
      console.log(authorId)
      const data = {
        id: 4,
        message: message,
        topicId: topicId,
        createdAt: '2023-07-20T10:25:03.243Z',
        author: 'someAuthor',
        authorAvatar: null,
        replies: null,
      }
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}
const commentController = new CommentController()
export default commentController
