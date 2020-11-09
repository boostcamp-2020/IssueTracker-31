import express from 'express'
import milestoneController from './milestone'

const router = express.Router()

router.get('/', milestoneController.read)
router.get('/:id', milestoneController.readDetail)
router.post('/', milestoneController.create)
router.get('/detail', milestoneController.readDetails)
router.patch('/:id', milestoneController.update)
router.delete('/:id', milestoneController.remove)
module.exports = router
