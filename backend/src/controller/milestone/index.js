import express from 'express'
import milestoneController from './milestone'

const router = express.Router()

router.get('/', milestoneController.read)
/* deprecated */
//router.get('/detail', milestoneController.readDetail)

module.exports = router
