import express from 'express'
import issueController from './issue'
import userController from './user'
import labelController from './label'
import milestoneController from './milestone'
import middleware from './user/user'

const router = express.Router()

router.use('/issues', middleware.verifyMiddelware, issueController)
router.use('/users', userController)
router.use('/labels', middleware.verifyMiddelware, labelController)
router.use('/milestones', middleware.verifyMiddelware, milestoneController)

module.exports = router
