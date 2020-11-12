import commentService from '../../service/comment'
import resMessage from '../../util/resMessage'
import statusCode from '../../util/statusCode'

const create = async (req, res) => {
  try {
    const { code, success, data, message } = await commentService.createComment(
      req.params.id,
      req.body.userId,
      req.body.content,
    )
    return res.status(code).json({ success, data, message })
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
  }
}

const update = async (req, res) => {
  try {
    const { code, success, data, message } = await commentService.updateComment(
      req.params.id,
      req.userData.id,
      req.body.content,
    )
    return res.status(code).json({ success, data, message })
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
  }
}

export default { update, create }
