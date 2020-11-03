import request from '@Util/request'

const getMilestones = async () => {
  const { success, data, message } = await request.GET(
    'http://127.0.0.1:3000/milestones',
  )
  if (success === false) return console.error(message)
  return data
}

export { getMilestones }
