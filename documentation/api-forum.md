## TOPICS

### POST /api/topics (Create Topic)

Example request:

```
fetch('http://localhost:3000/api/topics',{
	method: "POST",
	body: JSON.stringify({
        topicName: "Тест название топика 1", 
        message: "Тест сообщение топика 1",
        authorId: "1212123"
	}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```

Example response:

```
{
    "id": 1,
    "topic": "Тест название топика 1",
    "message": "Тест сообщение топика 1",
    "UserId": 897,
    "updatedAt": "2023-07-22T16:02:31.210Z",
    "createdAt": "2023-07-22T16:02:31.210Z"
}
```

<br>

### GET /api/topic/:id (Get Topic by ID)

Example request:

```
http://localhost:3000/api/topic/1
```

Example response:

```
{
    "author": "User1",
    "authorAvatar": null,
    "commentsCount": "2",
    "createdAt": "2023-07-24T09:34:17.177Z",
    "id": 1,
    "lastMessageDate": "2023-07-24T13:40:12.914Z",
    "message": "Тест сообщение топика 1",
    "topic": "Тест название топика 1",
    "updatedAt": "2023-07-24T09:34:17.177Z"
}

```

</br>

### GET /api/topics/:page/:limit (Get Topic list with page and limits)

Result ordered by lastmessage DESC

Example request:

```
http://localhost:3000/api/topics/1/3
```

Example response:

```
{
    "topics": [
        {
            "author": "1111",
            "authorAvatar": null,
            "commentsCount": "2",
            "createdAt": "2023-07-24T09:34:17.177Z",
            "id": 1,
            "lastMessageDate": "2023-07-24T13:40:12.914Z",
            "message": "Тест сообщение топика 1",
            "topic": "Тест название топика 1",
            "updatedAt": "2023-07-24T09:34:17.177Z"
        },
        {
            "author": "2222",
            "authorAvatar": null,
            "commentsCount": "0",
            "createdAt": "2023-07-24T09:52:38.160Z",
            "id": 2,
            "lastMessageDate": "2023-07-24T09:52:38.160Z",
            "message": "Тест сообщение топика 2",
            "topic": "Тест название топика 2",
            "updatedAt": "2023-07-24T09:52:38.160Z"
        }
    ]
}
```

</br>

## COMMENTS

### POST /api/comments (Create Comment)

Example request:

```
fetch('http://localhost:3000/api/comments',{
	method: "POST",
	body: JSON.stringify({
      topicId: 2, 
      message: "Тест комментарий к топику 2"
      authorId: "1212123"
	}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```

Example response:

```
{
    "id": 4,
    "message": "Тест комментарий к топику 2",
    "TopicId": 2,
    "author": "some user",
    "updatedAt": "2023-07-20T10:25:03.243Z",
    "createdAt": "2023-07-20T10:25:03.243Z"
}
```

<br>

### GET /api/comments/:topicId/:page/:limit (Get Comments and Replies By TopicId)

Example request:

```
http://localhost:3000/api/comments/1/10
```

Example response:

```
{
    "Comments": [
        {
            "author": "user1",
            "authorAvatar": null,
            "commentCreatedAt": "2023-07-24T13:40:12.914Z",
            "id": 2,
            "message": "Тест комментарий 2 к топику 1",
            "replies": [
                {
                    "author": "user1",
                    "authorAvatar": null,
                    "commentCreatedAt": "2023-07-24T13:40:08.703Z",
                    "id": 1,
                    "message": "Тест ответ 2 к комментарию 1",
                    "replyCreatedAt": "2023-07-24T14:57:28.565Z",
                    "replyId": 3
                },
                {
                    "author": "user2",
                    "authorAvatar": null,
                    "commentCreatedAt": "2023-07-24T13:40:08.703Z",
                    "id": 1,
                    "message": "Тест ответ 1 к комментарию 1",
                    "replyCreatedAt": "2023-07-24T14:57:21.420Z",
                    "replyId": 2
                }
            ],
            "topicId": 1
        },
        {
            "author": "user3",
            "authorAvatar": null,
            "commentCreatedAt": "2023-07-24T13:40:08.703Z",
            "id": 1,
            "message": "Тест комментарий к топику 1",
            "replies": [
                {
                    "author": "2222",
                    "authorAvatar": null,
                    "commentCreatedAt": "2023-07-24T13:40:08.703Z",
                    "id": 1,
                    "message": "Тест ответ 2 к комментарию 1",
                    "replyCreatedAt": "2023-07-24T14:57:28.565Z",
                    "replyId": 3
                },
                {
                    "author": "user4",
                    "authorAvatar": null,
                    "commentCreatedAt": "2023-07-24T13:40:08.703Z",
                    "id": 1,
                    "message": "Тест ответ 1 к комментарию 1",
                    "replyCreatedAt": "2023-07-24T14:57:21.420Z",
                    "replyId": 2
                }
            ],
            "topicId": 1
        }
    ],
}
```

<br>

## REPLIES

### POST /api/replies (Create Reply)

Example request:

```
fetch('http://localhost:3000/api/replies', {
	method: "POST",
		body: JSON.stringify({
        commentId: 1, 
        message: "Тест ответ 2 к комментарию 1",
        userId: '323123'
	    }),
	 headers: {
      "Content-Type": "application/json"
    }
})
```

Example response:

```
{
    "id": 1,
    "message": "Тест ответ 1 к комментарию 1",
    "CommentId": 1,
    "UserId": 897,
    "updatedAt": "2023-07-22T17:14:35.139Z",
    "createdAt": "2023-07-22T17:14:35.139Z"
}
```

### POST /api/replies/:messageId (Get all replies)

```
{
    "Replies": [
        {
            "id": 1,
            "message": "Тест ответ 1 к комментарию 1",
            "CommentId": 1,
            "UserId": 897,
            "updatedAt": "2023-07-22T17:14:35.139Z",
            "createdAt": "2023-07-22T17:14:35.139Z"
        },
            {
            "id": 2,
            "message": "Тест ответ 1 к комментарию 2",
            "CommentId": 1,
            "UserId": 897,
            "updatedAt": "2023-07-22T17:14:35.139Z",
            "createdAt": "2023-07-22T17:14:35.139Z"
        },
    ]
}
```


## REACTIONS

### POST /api/reactions (Create Reaction)

Example request:

```
fetch('http://localhost:3000/api/reactions',{
	method: "POST",
	body: JSON.stringify({
        reaction: "fire", 
        commentId: 1,
        userId: 5454
	}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```

Example response:

```
    {
        "id": 1,
        "reaction": "🔥",
        "createdAt": "2023-07-22T14:49:34.809Z",
        "CommentId": 1,
        "UserId": 897
    }
```

### GET /api/reactions/:commentId (Get all reactions)

Example response:
```
{
    Reactions: [    {
            "id": 1,
            "reaction": "🔥",
            "createdAt": "2023-07-22T14:49:34.809Z",
            "CommentId": 1,
            "UserId": 897
        },
            {
            "id": 2,
            "reaction": "🔥",
            "createdAt": "2023-07-22T14:49:34.809Z",
            "CommentId": 1,
            "UserId": 899
        }]
}
```
<br>

