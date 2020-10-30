import express from 'express'
import userController from './user'

const router = express.Router()

router.get('/github', userController.githubLogin)

module.exports = router
