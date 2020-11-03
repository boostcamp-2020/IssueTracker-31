import request from '@Util/request'

const getLabels = async () => {
  const { success, data, message } = await request.GET(
    'http://127.0.0.1:3000/labels',
  )
  console.log(success, data)
  if (success === false) return console.error(message)
  return data.data
}

export { getLabels }
