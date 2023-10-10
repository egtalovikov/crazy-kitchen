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

      const { topicName, message, authorId } = req.body
      const data = await topicService.createTopic(topicName, message, authorId)

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
      //Дополнить когда известны будут другие таблицы, чтобы ответ был полным с коментариями и прочим
      // const data = await topicService.getTopicAll(
      //   +req.params.limit,
      //   Boolean(req.params.isOrderUpdatedASC)
      // )
      //Замокано
      console.log(req)
      const data = {
        topics: [
          {
            author: '1111',
            authorAvatar: null,
            commentsCount: '2',
            createdAt: '2023-07-24T09:34:17.177Z',
            id: 1,
            lastMessageDate: '2023-07-24T13:40:12.914Z',
            message: 'Тест сообщение топика 1',
            topic: 'Тест название топика 1',
            updatedAt: '2023-07-24T09:34:17.177Z',
          },
          {
            author: '2222',
            authorAvatar: null,
            commentsCount: '0',
            createdAt: '2023-07-24T09:52:38.160Z',
            id: 2,
            lastMessageDate: '2023-07-24T09:52:38.160Z',
            message: 'Тест сообщение топика 2',
            topic: 'Тест название топика 2',
            updatedAt: '2023-07-24T09:52:38.160Z',
          },
        ],
      }
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }

  //получить все комментарии с ответами к топику
  async getCommentsForTopic(req: Request, res: Response, next: NextFunction) {
    try {
      const { topicId, limit } = req.params
      //const data = await topicService.getCommentsByTopicId(+topicId, +limit);
      //замокано
      console.log(topicId, limit)
      const data = {
        comments: [
          {
            author: 'user1',
            authorAvatar: null,
            createdDate: '2023-07-24T13:40:12.914Z',
            id: 1,
            topicId: 1,
            message: 'Тест комментарий 2 к топику 1',
            replies: [
              {
                author: 'user1',
                authorAvatar: null,
                id: 1,
                message: 'Тест ответ 2 к комментарию 1',
                replyCreatedAt: '2023-07-24T14:57:28.565Z',
                replyId: 1,
              },
              {
                author: 'user2',
                authorAvatar: null,
                id: 2,
                message: 'Тест ответ 1 к комментарию 1',
                replyCreatedAt: '2023-07-24T14:57:21.420Z',
                replyId: 1,
              },
            ],
          },
          {
            author: 'user3',
            authorAvatar: null,
            createdDate: '2023-07-24T13:40:08.703Z',
            id: 2,
            topicId: 1,
            message: 'Тест комментарий к топику 1',
            replies: [
              {
                author: '2222',
                authorAvatar: null,
                id: 1,
                message: 'Тест ответ 2 к комментарию 1',
                replyCreatedAt: '2023-07-24T14:57:28.565Z',
                replyId: 2,
              },
              {
                author: 'user4',
                authorAvatar: null,
                id: 2,
                message: 'Тест ответ 1 к комментарию 1',
                replyCreatedAt: '2023-07-24T14:57:21.420Z',
                replyId: 2,
              },
            ],
          },
        ],
      }
      return res.json(data)
    } catch (error) {
      return next(error)
    }
  }
}

const topicController = new TopicController()
export default topicController
