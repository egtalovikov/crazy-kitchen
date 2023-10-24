import type { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import commentService from '../services/comment.service'
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
      const { TopicId, message, UserId } = req.body
      const data = await commentService.createComment(message, TopicId, UserId)
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}
const commentController = new CommentController()
export default commentController
