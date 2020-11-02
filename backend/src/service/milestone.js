import db from '../model/milestone'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const getMilestone = async () => {
  try {
    const milestones = await db.getMilestone()
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

const getMilestoneDetail = async () => {
  try {
    const milestones = await db.getMilestoneDetail()
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
  getMilestone,
  getMilestoneDetail,
}
