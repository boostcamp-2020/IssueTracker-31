import request from '@Util/request'

const createImageUrl = async body => {
  const { success, data, message } = await request.POST(
    '/comment-image-urls',
    body,
    'multipart/form-data',
  )
  if (success === false) console.error(message)
  return { success, url: data.url }
}

const getComments = async issueId => {
  const { success, data, message } = await request.GET(
    `/issues/${issueId}/comments`,
  )
  if (success === false) return console.error(message)
  return data
}

export { createImageUrl, getComments }
