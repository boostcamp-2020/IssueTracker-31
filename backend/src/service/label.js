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

const postLabel = async labelData => {
  if (!labelData.name || !labelData.color || !isValidLabelData(labelData))
    throw new Error('parameter')
  const searchedLabel = await labelModel.getLabelByName(labelData.name)
  if (searchedLabel) throw new Error('DUPLICATE')
  const newLabelId = await labelModel.postLabel(labelData)
  return newLabelId
}

const deleteLabel = async labelId => {
  if (isNaN(labelId) || labelId < 1) throw new Error('parameter')
  await labelModel.deleteLabel(labelId)
}

const isValidLabelData = ({ name, description, color, ...notAllowed }) => {
  if (Object.keys(notAllowed).length !== 0) return false
  if (name !== undefined && (typeof name !== 'string' || name.trim() === ''))
    return false
  if (color !== undefined) {
  if (typeof color !== 'string' && color[0] !== '#') return false
  const rgb = color.substr(1)
  if (rgb.length !== 6 && rgb.length !== 3) return false
  if (/[^a-fA-F0-9]/gi.test(rgb)) return false
  }
  if (description !== undefined && typeof description !== 'string') return false
  return true
}

export default {
  getLabel,
  postLabel,
  deleteLabel,
}
