import db from '../model/comment'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const getComments = async () => {
  try {
    const milestones = await db.getComments()
    return {
      code: statusCode.OK,
      success: true,
      data: milestones,
    }
  } catch (e) {
    return {
      code: statusCode.DB_ERROR,
      success: false,
      message: resMessage.DB_ERROR,
    }
  }
}

export default {
  getComments,
}
