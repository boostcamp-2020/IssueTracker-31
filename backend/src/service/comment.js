import db from '../model/comment'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const updateComment = async (id, { userId, content }) => {
  if (isNaN(id) || id < 1 || isNaN(userId) || userId < 1)
    return {
      code: statusCode.BAD_REQUEST,
      success: false,
      message: resMessage.OUT_OF_VALUE,
    }
  try {
    await db.updateComment(id, content)
    return {
      code: statusCode.OK,
      success: true,
    }
  } catch (error) {
    if (error.message === 'NOT_EXIST')
      return {
        code: statusCode.BAD_REQUEST,
        success: false,
        message: resMessage.OUT_OF_VALUE,
      }
    if (error.message === 'NOT_MODIFIED')
      return { code: statusCode.NOT_MODIFIED }
    return {
      code: statusCode.DB_ERROR,
      success: false,
      message: resMessage.DB_ERROR,
    }
  }
}

export default {
  updateComment,
}
