import { Router } from 'express'
import topicController from '../controllers/topic.controller'
import commentController from '../controllers/comment.controller'
import replyController from '../controllers/reply.controller'
import userController from '../controllers/user.controller'
import authController from '../controllers/auth.controller'

const router = Router()
router.post('/topics', topicController.createTopic)
router.get('/topics/:limit', topicController.getAllTopics)

router.get('/topic/:id', topicController.findTopicById)
router.get('/comments/:topicId', topicController.getCommentsForTopic)

router.post('/comments', commentController.createComment)

router.post('/replies', replyController.createReply)

router.post('/user', userController.createUser)

router.post('/auth', authController.saveToken)

const apiRouter = router
export default apiRouter
