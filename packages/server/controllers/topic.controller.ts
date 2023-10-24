import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../api.error'
import topicService from '../services/topic.servise'

class TopicController {
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка в данных', errors.array()))
      }
      const { topicName, message, UserId } = req.body
      const data = await topicService.createTopic(topicName, message, UserId)

      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  async findTopicById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await topicService.findTopicById(+req.params.id)
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  async getAllTopics(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await topicService.getTopicAll(
        +req.params.limit,
        Boolean(req.params.isOrderUpdatedASC)
      )
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  //получить все комментарии с ответами к топику
  async getCommentsForTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await topicService.getCommentsByTopicId(+req.params.topicId)
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}

const topicController = new TopicController()
export default topicController
