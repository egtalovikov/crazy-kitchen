## TOPICS

### POST /api/topics (Create Topic)

Example request:

```
fetch('http://localhost:3000/api/topics',{
	method: "POST",
	body: JSON.stringify({
        topicName: "Тест название топика 1", 
        message: "Тест сообщение топика 1",
        UserId: 1212123
	}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```
Example response:
```
ok
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
    "id": 42,
    "topicName": "Первый топик",
    "message": "Описание топика",
    "createdAt": "2023-10-18T14:42:13.356Z",
    "updatedAt": "2023-10-18T14:42:13.356Z",
    "UserId": 1347151,
    "User": {
        "first_name": "Евгения",
        "second_name": "П",
        "display_name": null,
        "avatar": null
    }
}

```


### GET /api/topics/:limit (Get Topic list with page and limits)

Result ordered by lastMessage DESC
Example request:
```
http://localhost:3000/api/topics/2
```
Example response:

```
[
    {
        "id": 43,
        "topicName": "Второй топик",
        "message": "Описание второго топика",
        "createdAt": "2023-10-18T15:03:39.704Z",
        "updatedAt": "2023-10-18T15:03:39.704Z",
        "UserId": 1347151,
        "User": {
            "first_name": "Евгения",
            "second_name": "П",
            "display_name": null,
            "avatar": null
        }
    },
    {
        "id": 42,
        "topicName": "Первый топик",
        "message": "Описание топика",
        "createdAt": "2023-10-18T14:42:13.356Z",
        "updatedAt": "2023-10-18T14:42:13.356Z",
        "UserId": 1347151,
        "User": {
            "first_name": "Евгения",
            "second_name": "П",
            "display_name": null,
            "avatar": null
        }
    }
]
```

## COMMENTS

### POST /api/comments (Create Comment)

Example request:
```
fetch('http://localhost:3000/api/comments',{
	method: "POST",
	body: JSON.stringify({
      UserId: 1347151,
      TopicId: 43,
      message: "Комент ко второму топику",
	}),
	 headers: {
      "Content-Type": "application/json"
    }
})
```
Example response:
```
ok
```

<br>

### GET /api/comments/:topicId/:limit (Get Comments and Replies By TopicId)

Example request:

```
http://localhost:3000/api/comments/3/2
```

Example response:
```
[
    {
        "id": 4,
        "message": "Комментарии к первому топику",
        "createdAt": "2023-10-18T17:24:59.308Z",
        "updatedAt": "2023-10-18T17:24:59.308Z",
        "UserId": 1347151,
        "TopicId": 42,
        "User": {
            "first_name": "Евгения",
            "second_name": "П",
            "display_name": null,
            "avatar": null
        },
        "Replies": [
            {
                "message": "Ответ к первому комментарию к первому топику",
                "User": {
                    "first_name": "Евгения",
                    "second_name": "П",
                    "display_name": null,
                    "avatar": null
                }
            },
            {
                "message": "Еще один ответ к первому комментарию к первому топику",
                "User": {
                    "first_name": "Евгения",
                    "second_name": "П",
                    "display_name": null,
                    "avatar": null
                }
            },
            {
                "message": "да да",
                "User": {
                    "first_name": "Oleg",
                    "second_name": "Коровкин",
                    "display_name": "Zver",
                    "avatar": null
                }
            }
        ]
    }
]
```

<br>

## REPLIES

### POST /api/replies (Create Reply)

Example request:

```
fetch('http://localhost:3000/api/replies', {
	method: "POST",
		body: JSON.stringify({
          UserId: 1347151,
          TopicId: 43,
          message: "Ответ ко второму коменту ко второму топику",
          CommentId: 2
	    }),
	 headers: {
      "Content-Type": "application/json"
    }
})
```

Example response:

```
Ok
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

