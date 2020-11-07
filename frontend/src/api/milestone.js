import request from '@Util/request'

const getMilestones = async () => {
  const { success, data, message } = await request.GET('/milestones')
  if (success === false) return console.error(message)
  return data
}

const deleteMilestone = async id => {
  const { success, message } = await request.DELETE(`/milestones/${id}`)
  if (success === false) return console.error(message)
  return success
}

export { getMilestones, deleteMilestone }
