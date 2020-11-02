import express from 'express'
import issueController from './issue'
import userController from './user'
import labelController from './label'
import milestoneController from './milestone'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/issues', issueController)
router.use('/users', userController)
router.use('/labels', labelController)
router.use('/milestones', milestoneController)

module.exports = router
