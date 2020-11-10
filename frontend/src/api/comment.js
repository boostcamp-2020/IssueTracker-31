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

export { createImageUrl }
