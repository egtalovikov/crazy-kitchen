import { Router } from 'express'
import topicController from '../controllers/topic.controller'

const router = Router()
router.post('/topics', topicController.createTopic)

const apiRouter = router
export default apiRouter
