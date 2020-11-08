import db from '../model/milestone'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'
import { verifyTextLength } from '../util/utility'

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

const createMilestone = async ({
  title,
  dueDate = null,
  description = null,
}) => {
  verifyParams(title, dueDate, description)
  await db.createMilestone(title, dueDate, description)
  return {
    code: statusCode.CREATED,
    success: true,
  }
}

const removeMilestone = async id => {
  if (!id)
    throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
  await db.removeMilestone(id)
  return {
    code: statusCode.CREATED,
    success: true,
  }
}

const verifyParams = (title, dueDate, description) => {
  if (!title)
    throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
  if (title && !verifyTextLength(title, 45))
    throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
  if (description && !verifyTextLength(description, 45))
    throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
  if (dueDate && !Date.parse(dueDate))
    throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
}

export default {
  getMilestone,
  getMilestoneWithProgress,
  createMilestone,
  getMilestoneDetail,
  removeMilestone,
}
