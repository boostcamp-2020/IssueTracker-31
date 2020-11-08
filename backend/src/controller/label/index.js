import express from 'express'
import labelController from './label'

const router = express.Router()

router.get('/', labelController.read)
router.post('/', labelController.create)
router.delete('/:labelId', labelController.erase)
router.patch('/:labelId', labelController.update)

module.exports = router
