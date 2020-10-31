import express from 'express'
import milestoneController from './milestone'

const router = express.Router()

router.get('/', milestoneController.read)

module.exports = router
