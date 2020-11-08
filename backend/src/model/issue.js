import db from './index'
import query from './query/issue'

const getIssues = async filterValues => {
  const sql = query.getIssuesQueryString(filterValues)
  try {
    const [rows] = await db.query(sql)
    return rows
  } catch (err) {
    throw new Error('DB')
  }
}

const postIssue = async (connection, { title, userId, milestoneId }) => {
  try {
    const [result] = await connection.query(query.postIssueQueryString, {
      title,
      userId,
      milestoneId,
    })
    return result.insertId
  } catch (err) {
    throw new Error('DB')
  }
}

const getIssueDetail = async issueId => {
  return issueId
}

const setIssueRelations = async (
  connection,
  table,
  firstColumn,
  secondColumn,
  relations,
) => {
  try {
    await connection.query(
      query.setIssueRelationQueryString(table, firstColumn, secondColumn),
      [relations],
    )
  } catch (err) {
    throw new Error('DB')
  }
}

const updateIssueState = async (connection, { issueId, isOpen }) => {
  const sql = query.updateIssueState(issueId, isOpen)
  try {
    await connection.query(sql)
  } catch (err) {
    throw new Error('DB')
  }
}

export default {
  getIssues,
  postIssue,
  setIssueRelations,
  updateIssueState,
  getIssueDetail,
}
