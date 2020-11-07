import db from './index'
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
export default {
  getMilestone,
  getMilestoneWithProgress,
}
