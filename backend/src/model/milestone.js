import db from './index'

const getMilestone = async () => {
  const sql = 'SELECT id, title, dueDate, description, isOpen from Milestone'
  const [rows] = await db.query(sql)
  return rows
}

export default {
  getMilestone,
}
