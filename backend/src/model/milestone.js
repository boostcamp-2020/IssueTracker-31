import db, { doQuery } from './index'
import query from './query/milestone'

const getMilestone = async () => {
  const sql = 'SELECT id, title, dueDate, description, isOpen from Milestone'
  const [rows] = await db.query(sql)
  return rows
}

const getMilestoneWithProgress = async id => {
  const [rows] = await db.query(query.getMilestoneWithProgress, id)
  return rows
}

const createMilestone = (...params) => {
  return doQuery(query.createMilestone, params)
}
export default {
  getMilestone,
  getMilestoneWithProgress,
  createMilestone,
}
