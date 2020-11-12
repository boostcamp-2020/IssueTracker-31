import request from '@Util/request'

const createImageUrl = async FormData => {
  const { success, data } = await request.POST(
    'comments/comment-image-urls',
    FormData,
  )
  if (success === false || undefined) {
    console.error('이미지 업로드 에러 발생')
    return false
  }
  return data
}

const getComments = async issueId => {
  const { success, data, message } = await request.GET(
    `/issues/${issueId}/comments`,
  )
  if (success === false) return console.error(message)
  return data
}

const createComment = async (issueId, params) => {
  const { success, data, message } = await request.POST(
    `comments/issues/${issueId}/comments`,
    params,
  )
  if (success === false) return console.error(message)
  return data
}

export { createImageUrl, getComments, createComment }
