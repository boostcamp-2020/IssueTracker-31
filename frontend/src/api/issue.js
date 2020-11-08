import request from '@Util/request'

const getIssues = async filterQuery => {
  const { success, data, message } = await request.GET('/issues', filterQuery)
  if (success === false) return console.error(message)
  return data
}

const createIssue = async body => {
  const { success, message } = await request.POST('/issues', body)
  if (success === false) console.error(message)
  return success
}

const patchIssues = async params => {
  const { success, data, message } = await request.PATCH(
    '/issues/open-close',
    params,
  )
  if (success === false) return console.error(message)
  return data
}

export { getIssues, createIssue, patchIssues }
