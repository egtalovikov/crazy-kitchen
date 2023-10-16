import { Router } from 'express'
import topicController from '../controllers/topic.controller'
import commentController from '../controllers/comment.controller'
import replyController from '../controllers/reply.controller'

const router = Router()
router.post('/topics', topicController.createTopic)
router.get('/topic/:id', topicController.findTopicById)
router.get('/topics/:limit', topicController.getAllTopics)
router.get('/comments/:topicId/:limit', topicController.getCommentsForTopic)

router.post('/comments', commentController.createComment)

router.post('/replies', replyController.createReply)

const apiRouter = router
export default apiRouter
