import express from 'express'
import milestoneController from './milestone'

const router = express.Router()

router.get('/', milestoneController.read)
router.get('/detail', milestoneController.readDetail)

module.exports = router
