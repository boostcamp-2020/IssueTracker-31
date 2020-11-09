import express from 'express'
import issueController from './issue'

const router = express.Router()

router.get('/', issueController.getIssues)
router.post('/', issueController.postIssue)
router.patch('/open-close', issueController.updateIssueState)
router.get('/:id', issueController.getIssueDetail)
router.patch('/:id', issueController.updateIssue)
router.post('/:id/assignee', issueController.updateAssigneesOnIssue)

module.exports = router
