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

export { createImageUrl }
