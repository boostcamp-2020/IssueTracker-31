import labelModel from '../model/label'
import resMessage from '../util/resMessage'
import statusCode from '../util/statusCode'

const getLabel = async () => {
  try {
    const labels = await labelModel.getLabel()
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

const postLabel = async newLabelData => {
  if (!isValidNewLabelData(newLabelData)) throw new Error('parameter')
  const searchedLabel = await labelModel.getLabelByName(newLabelData.name)
  if (searchedLabel) throw new Error('DUPLICATE')
  const newLabelId = await labelModel.postLabel(newLabelData)
  return newLabelId
}

const deleteLabel = async labelId => {
  if (isNaN(labelId) || labelId < 1) throw new Error('parameter')
  await labelModel.deleteLabel(labelId)
}

const isValidNewLabelData = ({ name, description, color }) => {
  if (!name || !color) return false
  if (typeof name !== 'string') return false
  if (typeof color !== 'string' && color[0] !== '#') return false
  if (description && typeof description !== 'string') return false
  const rgb = color.substr(1)
  if (rgb.length !== 6 && rgb.length !== 3) return false
  if (/[^a-fA-F0-9]/gi.test(rgb)) return false
  return true
}

export default {
  getLabel,
  postLabel,
  deleteLabel,
}
