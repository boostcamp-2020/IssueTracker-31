import db from './index'

const getIssue = async () => {
  const sql = 'SELECT * from issue'
  const [rows] = await db.query(sql)
  return rows
}

export default {
  getIssue,
}
