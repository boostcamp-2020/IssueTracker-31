import request from '@Util/request'

const getMilestones = async () => {
  const { success, data, message } = await request.GET('/milestones')
  if (success === false) return console.error(message)
  return data
}

export { getMilestones }
