import { Reactions } from 'server/models/reaction'

export type TTopicMessageForSave = {
  parentId: number
  text: string
}

export type TTopicComment = {
  id: number
  topicId: number
  author: string
  authorAvatar: string | null
  createdDate: string
  text: string
  replies: TTopicReply[]
}

export type TTopicReply = {
  replyId: number
  id: number
  author: string
  authorAvatar: string | null
  replyCreatedAt: string
  message: string
}

export type TTopicListServerData = {
  topics: TTopicServerData[]
  LastPage: number
}

export type TTopicServerData = {
  id: number
  topic: string
  message: string
  userId: number
  author: string
  authorAvatar: string | null
  createdAt: string
}

export type TCommentListServerData = {
  Comments: TCommentServerData[]
}

export type TRepliesListServerData = {
  Replies: TTopicReply[]
}

export type TCommentServerData = {
  id: number
  topicId: number
  message: string
  author: string
  authorAvatar: string | null
  commentCreatedAt: string
  replies: TTopicReply[]
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

export type TTopic = {
  id: number
  title: string
  message: string
  userId: number
  author: string
  authorAvatar: string | null
  createdDate: string
}

export type TTopicForSave = {
  topicName: string
  message: string
  authorId: number
}
