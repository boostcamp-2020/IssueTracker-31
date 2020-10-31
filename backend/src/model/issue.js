import db from './index'

const getIssues = async () => {
  const sql = 'SELECT * from issue'
  const [rows] = await db.query(sql)
  return rows
}

export default {
  getIssues,
}
