import { validationResult } from 'express-validator'
import { ApiError } from '../api.error'
//import replyService from '../services/reply.service'
import type { NextFunction, Request, Response } from 'express'

class ReplyController {
  async createReply(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка переданных данных', errors.array())
        )
      }
      const { message, topicId, authorId, replyId } = req.body
      //замокано
      console.log(message, topicId, authorId, replyId)
      // const data = await replyService.createReply(
      //   message,
      //   topicId,
      //   authorId,
      //   replyId
      // )

      const data = {
        id: 1,
        message: 'Тест ответ 1 к6666 комментарию 1',
        CommentId: 1,
        UserId: 897,
        updatedAt: '2023-07-22T17:14:35.139Z',
        createdAt: '2023-07-22T17:14:35.139Z',
      }

      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}

const replyController = new ReplyController()
export default replyController
