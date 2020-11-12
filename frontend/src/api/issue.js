import request from '@Util/request'

const getIssues = async filterQuery => {
  const { success, data, message } = await request.GET('/issues', filterQuery)
  if (success === false) return console.error(message)
  return data
}

const getIssueDetail = async id => {
  const { success, data, message } = await request.GET(`/issues/${id}`)
  console.log(success, data, message)
  if (success === false) return console.error(message)
  return data
}

const createIssue = async body => {
  const { success, message, data } = await request.POST('/issues', body)
  if (success === false) console.error(message)
  return data
}

const patchIssues = async params => {
  const { success, data, message } = await request.PATCH(
    '/issues/open-close',
    params,
  )
  if (success === false) return console.error(message)
  return data
}

const patchIssueDetail = async ({ id, body }) => {
  const { success, data, message } = await request.PATCH(`/issues/${id}`, body)
  if (success === false) return console.error(message)
  if (data) return data
  else return success
}

const updateIssueLabels = async ({ id, body }) => {
  const { success, message } = await request.POST(`/issues/${id}/labels`, body)
  if (success === false) return console.error(message)
  return success
}

const updateIssueAssignees = async ({ id, body }) => {
  const { success, message } = await request.POST(
    `/issues/${id}/assignee`,
    body,
  )
  if (success === false) return console.error(message)
  return success
}

export {
  getIssues,
  getIssueDetail,
  createIssue,
  patchIssues,
  patchIssueDetail,
  updateIssueLabels,
  updateIssueAssignees,
}
