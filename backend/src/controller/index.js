import express from 'express'
import issueController from './issue'
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/issues', issueController)

module.exports = router
