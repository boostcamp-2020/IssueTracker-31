import express from 'express'
import commentController from './comment'

const router = express.Router()

router.post('/issues/:id/comments', commentController.create)
router.patch('/:id', commentController.update)

module.exports = router
