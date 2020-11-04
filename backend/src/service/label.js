import db from '../model/label'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const getLabel = async () => {
  try {
    const labels = await db.getLabel()
    return {
      code: statusCode.OK,
      success: true,
      data: labels,
    }
  } catch (e) {
    console.log(e)
    return {
      code: statusCode.DB_ERROR,
      success: false,
      message: resMessage.DB_ERROR,
    }
  }
}

export default {
  getLabel,
}
