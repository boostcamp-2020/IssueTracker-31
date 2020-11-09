import request from '@Util/request'

const getLabels = async () => {
  const { success, data, message } = await request.GET('/labels')

  if (success === false) return console.error(message)
  return data
}

const createLabel = async params => {
  const { success, data, message } = await request.POST('/labels', params)
  if (success === false) return console.error(message)
  return data
}

const updateLabel = async ({ id, params }) => {
  const { success, message } = await request.PATCH(`/labels/${id}`, params)
  if (success === false) return console.error(message)
  return true
}

export { getLabels, createLabel, updateLabel }
