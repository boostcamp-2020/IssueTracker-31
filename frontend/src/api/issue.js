import request from '@Util/request'

const getIssues = async filterQuery => {
  if (filterQuery.label !== undefined)
    filterQuery.label = filterQuery.label.join('_')
  const { success, data, message } = await request.GET('/issues', filterQuery)
  if (success === false) return console.error(message)
  return data
}

const issueApi = {
  getIssues,
}

export default issueApi
