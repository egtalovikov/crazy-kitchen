import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../api.error'
import topicService from '../services/topic.servise'

class TopicController {
  async createTopic(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('TopicController createTopic')
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка в данных', errors.array()))
      }

      const { topicName, message, authorId } = req.body
      const data = await topicService.createTopic(topicName, message, authorId)

      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}

const topicController = new TopicController()
export default topicController
