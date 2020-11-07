import express from 'express'
import labelController from './label'

const router = express.Router()

router.get('/', labelController.read)
router.post('/', labelController.create)

module.exports = router
