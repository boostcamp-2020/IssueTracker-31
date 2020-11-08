import express from 'express'
import issueController from './issue'
import userController from './user'
import labelController from './label'
import milestoneController from './milestone'
import commentController from './comment'
import middleware from './user/user'

const router = express.Router()

router.use('/issues', middleware.verifyMiddleware, issueController)
router.use('/users', userController)
router.use('/labels', middleware.verifyMiddleware, labelController)
router.use('/milestones', middleware.verifyMiddleware, milestoneController)
// router.use('/comments', middleware.verifyMiddleware, commentController)
router.use('/comments', commentController)

module.exports = router
