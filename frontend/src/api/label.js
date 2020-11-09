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

export { getLabels, createLabel }
