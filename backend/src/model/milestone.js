import db from './index'
import query from './query/milestone'

const getMilestone = async () => {
  const [rows] = await db.query(query.getMilestone)
  return rows
}

const getMilestoneDetail = async () => {
  const [rows] = await db.query(query.getMilestoneDetail)
  return rows
}

const getMilestoneOnIssue = async (issueId, connection) => {
  connection = connection ? connection : db
  try {
    const [milestone] = await connection.query(
      query.getMilestoneOnIssueQueryString,
      issueId,
    )
    return milestone
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

export default {
  getMilestone,
  getMilestoneDetail,
  getMilestoneOnIssue,
}
