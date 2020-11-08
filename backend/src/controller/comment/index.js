import express from 'express'
import commentController from './comment'

const router = express.Router()

router.patch('/:id', commentController.update)

module.exports = router
