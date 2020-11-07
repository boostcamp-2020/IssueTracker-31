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

const getMilestoneWithProgress = async id => {
  try {
    const milestones = await db.getMilestoneWithProgress(id)
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

const createMilestone = async ({
  title,
  dueDate = null,
  description = null,
}) => {
  if (!title)
    throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
  await db.createMilestone(title, dueDate, description)
  return {
    code: statusCode.CREATED,
    success: true,
  }
}

export default {
  getMilestone,
  getMilestoneWithProgress,
  createMilestone,
}
