import request from '@Util/request'

const getLabels = async () => {
  const { success, data, message } = await request.GET('/labels')

  if (success === false) return console.error(message)
  return data
}

export { getLabels }
