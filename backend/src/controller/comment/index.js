import express from 'express'
import commentController from './comment'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
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
const upload = multer({ storage: storage, fileFilter: fileFilter })

const router = express.Router()

router.patch('/:id', commentController.update)
router.post(
  '/comment-image-urls',
  upload.single('commentImage'),
  commentController.uploadImage,
)

module.exports = router
