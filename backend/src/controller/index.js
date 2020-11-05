import express from 'express'
import issueController from './issue'
import userController from './user'
import labelController from './label'
import milestoneController from './milestone'

const router = express.Router()

router.use('/issues', issueController)
router.use('/users', userController)
router.use('/labels', labelController)
router.use('/milestones', milestoneController)

module.exports = router
