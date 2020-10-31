import db from './index'

const getMilestone = async () => {
  const sql = 'SELECT id, title from milestone'
  const [rows] = await db.query(sql)
  return rows
}

export default {
  getMilestone,
}
