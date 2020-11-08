import express from 'express'
import labelController from './label'

const router = express.Router()

router.get('/', labelController.read)
router.post('/', labelController.create)
router.delete('/:id', labelController.erase)
router.patch('/:id', labelController.update)

module.exports = router
