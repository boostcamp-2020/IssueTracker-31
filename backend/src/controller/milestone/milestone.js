import milestoneService from '../../service/milestone'
import resMessage from '../../util/resMessage'
import statusCode from '../../util/statusCode'

const read = async (req, res) => {
  try {
    const {
      code,
      success,
      data,
      message,
    } = await milestoneService.getMilestone()
    return res.status(code).json({ success, data, message })
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
  }
}

const getMilestoneWithProgress = async (req, res) => {
  try {
    const {
      code,
      success,
      data,
      message,
    } = await milestoneService.getMilestoneWithProgress(req.params.id)
    return res.status(code).json({ success, data, message })
  } catch (error) {
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
  }
}

const createMilestone = async (req, res, next) => {
  try {
    const {
      code,
      success,
      data,
      message,
    } = await milestoneService.createMilestone({ ...req.body })
    return res.status(code).json({ success, data, message })
  } catch (error) {
    next(error)
  }
}

export default {
  read,
  getMilestoneWithProgress,
  createMilestone,
}
