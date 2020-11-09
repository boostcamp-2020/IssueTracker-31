import express from 'express'
import issueController from './issue'

const router = express.Router()

router.get('/', issueController.getIssues)
router.get('/:id/comments', issueController.getIssueComments)
router.post('/', issueController.postIssue)
router.patch('/open-close', issueController.updateIssueState)
router.get('/:id', issueController.getIssueDetail)
router.post('/:id/assignee', issueController.updateAssigneesOnIssue)
router.post('/:id/labels', issueController.updateLabelsOnIssue)

module.exports = router
