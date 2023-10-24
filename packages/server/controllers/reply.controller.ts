import { validationResult } from 'express-validator'
import { ApiError } from '../api.error'
import type { NextFunction, Request, Response } from 'express'
import replyService from '../services/reply.service'

class ReplyController {
  async createReply(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка переданных данных', errors.array())
        )
      }
      const { message, TopicId, UserId, CommentId } = req.body
      const data = await replyService.createReply(
        message,
        TopicId,
        UserId,
        CommentId
      )
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}

const replyController = new ReplyController()
export default replyController
