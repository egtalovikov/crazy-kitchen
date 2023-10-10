## Описание API
Схема https://drive.google.com/file/d/1bi7hFkXMSNz1OdHa30eUWv80c3845Uyb/view?usp=sharing
### Методы API:
## Topics:
1) Сохранить топик
- URL: /topics
- Метод: POST
- Параметры запроса: {
```
	body: JSON.stringify({
        topicName: "Тест название топика 1", 
        message: "Тест сообщение топика 1",
        authorId: "1212123"
	}),
	 headers: {
      "Content-Type": "application/json"
    }
```
- Ответ: JSON-объект в формате TTopicServerData

2) Получить топик по id
- URL: /topic/:topicId
- Метод: GET
- Параметры запроса: отсутствуют
- Ответ: JSON-объект в формате TTopicServerData

3) Получить все топики
- URL: /topics/:limit
  (limit - ограничивает количество)
- Метод: GET
- Параметры запроса: отсутствуют
- Ответ: JSON-объект в формате TTopicListServerData


## Comments:

1) Сохранить комментарий
- URL: /comments
- Метод: POST
- Параметры запроса:
```
	body: JSON.stringify({
      topicId: 2, 
      message: "Тест комментарий к топику 2"
      authorId: "1212123"
	}),
	 headers: {
      "Content-Type": "application/json"
    }
```
- Ответ: JSON-объект в формате TTopicComment

2) Получить все комментарии к топику
- URL: /comments/:topicId/:limit
 (limit - ограничивает количество)
- Метод: GET
- Параметры запроса: нет
- Ответ: JSON-объект в формате TCommentListServerData

## REPLIES
1) Сохранить ответ к сообщению
- URL: /replies
- Метод: POST
- Параметры запроса:
```
	body: JSON.stringify({
        commentId: 1, 
        message: "Тест ответ 2 к комментарию 1",
        userId: '323123'
	}),
	 headers: {
      "Content-Type": "application/json"
    }
```
commentId - к какому комметарию относится
userId - кто написал
- Ответ: JSON-объект в формате TTopicReply

2) Получить все ответы к комментарию
- URL: /replies/:messageId
- Метод: GET
- Параметры запроса: отсутствуют
commentId - к какому комметарию относится
- Ответ: JSON-объект в формате TRepliesListServerData

## REACTIONS

1) Отправить реакцию к комментарию
- URL: /reactions
- Метод: POST
- Параметры запроса: 
```
	body: JSON.stringify({
        reaction: "fire", 
        commentId: 1,
        userId: 5454
	}),
	 headers: {
      "Content-Type": "application/json"
    }
```
  commentId - к какому комметарию относится
  userId - кто написал
- Ответ: JSON-объект в формате TReactionServerData

2) Получить все реакции к комментарию
- URL: /reactions/:commentId
- Метод: GET
- Параметры запроса: отсутствуют
- Ответ: JSON-объект в формате TReactionListServerData

## Themes
1) Получить текущую тему пользователя
- URL: /theme/:userId
- Метод: GET
- Параметры запроса: нет 
- Ответ: JSON-объект в формате TThemeData

2) Поменять текущую тему пользователя
- URL: /theme/:userId
- Метод: POST
- Параметры запроса: 
```
	body: JSON.stringify({
        userId: 5454,
        name: 'black'
	}),
	 headers: {
      "Content-Type": "application/json"
    }
```
- Ответ: JSON-объект в формате 
```
    {
        answer: ok
    }
```

4) Получить все темы
- URL: /theme
- Метод: GET
- Параметры запроса: нет
- Ответ: JSON-объект в формате TThemeListData
 
5) Создать новую тему
  URL: /theme
- Метод: POST
- Параметры запроса:
```
	body: JSON.stringify({
	    name: 'pink'
        description: 'какое0то описание, цвет и т.д.',
        
	}),
	 headers: {
      "Content-Type": "application/json"
    }
```
- Ответ: JSON-объект в формате
```
    {
        answer: ok
    }
```



### Ошибки API:
- 400 Bad Request: Некорректные параметры запроса.
- 403 Unauthorized: Ошибка аутентификации.
- 404 Not Found: Ресурс не найден.
- 500 Internal Server Error: Внутренняя ошибка сервера.
