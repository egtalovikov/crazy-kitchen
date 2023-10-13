import { Router } from 'express'
import topicController from '../controllers/topic.controller'
import themeController from '../controllers/themeController'

const router = Router()
router.post('/topics', topicController.createTopic)
router.post('/theme', themeController.changeUserTheme)
router.get('/theme', themeController.getUserTheme)

const apiRouter = router
export default apiRouter
