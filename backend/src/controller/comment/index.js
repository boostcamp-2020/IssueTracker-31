import express from 'express'
import commentController from './comment'

const router = express.Router()

router.get('/', commentController.read)

module.exports = router
