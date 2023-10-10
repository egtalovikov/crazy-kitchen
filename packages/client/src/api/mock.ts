export const topicAnswerData = new Promise((resolve, reject) => {
  const data = {
    id: 1,
    topic: 'тест название топика 1',
    message: 'тест сообщение топика 1',
    userId: 897,
    author: 'oleg',
    authorAvatar: 'null',
    createdAt: '2023-07-22t16:02:31.210z',
  }
  resolve(data)
})

export const topiCreateData = {
  topicName: 'Topic1',
  message: 'Описание Topic1',
  authorId: 1,
}
