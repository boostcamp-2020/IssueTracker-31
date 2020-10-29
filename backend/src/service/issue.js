import db from '../model/issue'

const getIssue = async () => {
  const issues = await db.getIssue()
  return issues
}

export default {
  getIssue,
}
