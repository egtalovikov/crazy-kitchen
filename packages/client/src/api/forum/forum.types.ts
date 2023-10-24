import { Reactions } from 'server/models/reaction'

//ответ после сохранения нового топика
export type TTopicServerData = {
  id: number
  topicName: string
  message: string
  authorId: number
  //возможно Date
  updatedAt: string
  createdAt: string
}

//формат в который преобразуем ответ после сохранения топика - удалить после проверки фронта
export type TTopic = {
  id: number
  topicName: string
  message: string
  authorId: number
  //возможно Date
  updatedAt: string
  createdAt: string
}

export type TTopicMessageForSave = {
  parentId: number
  text: string
}

//ответ после сохранения комента
export type TCommentServerData = {
  id: number
  topicId: number
  message: string
  author: string
  authorAvatar: string | null
  createdDate: string
  replies: TTopicReply[]
}

export type TTopicReply = {
  id: number
  replyId: number
  author: string
  authorAvatar: string | null
  replyCreatedAt: string
  message: string
}

//поиск топика по id ответ, дополнить если что-то еще нужно будет
export type TTopicByIdServerData = {
  id: number
  topicName: string
  message: string
  createdAt: string
  updatedAt: string
  UserId: number
  User: {
    first_name: string
    second_name: string
    display_name: string
    avatar: string
  }
}

export type TCommentFullServerData = {
  id: number
  message: string
  createdAt: string
  updatedAt: string
  UserId: number
  TopicId: number
  User: {
    first_name: string
    second_name: string
    display_name: string
    avatar: string
  }
  Replies: [
    {
      message: string
      User: {
        first_name: string
        second_name: string
        display_name: string
        avatar: string
      }
    }
  ]
}

export type TReactionServerData = {
  id: number
  reaction: keyof typeof Reactions
  createdAt: string
  CommentId: number
  author: string
}

export type TReactionListServerData = {
  Reactions: TReactionServerData[]
}

export type TTopicForSave = {
  topicName: string
  message: string
  authorId: number
}
