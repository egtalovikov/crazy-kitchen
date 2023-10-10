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

//ответ получение всех топикиков
export type TTopicListServerData = {
  topics: TTopicByIdServerData[]
}

//поиск топика по id ответ, дополнить если что-то еще нужно будет
export type TTopicByIdServerData = {
  author: string
  authorAvatar: null
  commentsCount: number
  createdAt: string
  id: number
  lastMessageDate: string
  message: string
  topicName: string
  updatedAt: string
}

export type TCommentListServerData = {
  comments: TCommentServerData[]
  topicId: number
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
