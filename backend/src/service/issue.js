import db from '../model/issue'

const getIssues = async () => {
  const issues = await db.getIssue()
  return issues
}

export default {
  getIssue,
}
