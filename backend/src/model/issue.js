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

export default {
  getIssues,
}
