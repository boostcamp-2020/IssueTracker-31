import express from 'express'
import labelController from './label'

const router = express.Router()

router.get('/', labelController.read)

module.exports = router
