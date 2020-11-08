import express from 'express'
import issueController from './issue'

const router = express.Router()

router.get('/', issueController.getIssues)
router.post('/', issueController.postIssue)
router.patch('/open-close', issueController.updateIssueState)

module.exports = router
