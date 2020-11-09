import db, { doQuery } from './index'
import query from './query/milestone'

const getMilestone = async () => {
  const [rows] = await db.query(query.getMilestone)
  return rows
}

const getMilestoneDetail = async () => {
  const [rows] = await db.query(query.getMilestoneDetail)
  return rows
}

const getMilestoneWithProgress = async id => {
  const [rows] = await db.query(query.getMilestoneWithProgress, id)
  return rows
}

const createMilestone = (...params) => {
  return doQuery(query.createMilestone, params)
}

const removeMilestone = id => {
  return doQuery(query.removeMilestone, id)
}

const updateMilestone = (id, params) => {
  return doQuery(query.updateMilestone(params), [...Object.values(params), id])
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
  getMilestoneWithProgress,
  createMilestone,
  removeMilestone,
  updateMilestone,
  getMilestoneOnIssue,
}
