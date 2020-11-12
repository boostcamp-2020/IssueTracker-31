import express from 'express'
import commentController from './comment'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split('.').pop()}`)
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  )
    cb(null, true)
  else cb(null, false)
}
const upload = multer({ storage, fileFilter: fileFilter })

const router = express.Router()

router.post('/issues/:id/comments', commentController.create)
router.patch('/:id', commentController.update)
router.post(
  '/comment-image-urls',
  upload.single('commentImage'),
  commentController.uploadImage,
)

module.exports = router
