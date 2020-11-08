import express from 'express'
import issueController from './issue'

const router = express.Router()

router.get('/', issueController.getIssues)
router.post('/', issueController.postIssue)
router.get('/id', issueController.getIssueDetail)

module.exports = router
