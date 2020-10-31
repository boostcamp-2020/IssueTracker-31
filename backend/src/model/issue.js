import db from './index'
import query from './query/issue'

const getIssues = async filterValues => {
  const sql = query.getIssuesQueryString(filterValues)
  console.log(sql)
  try {
    const [rows] = await db.query(sql)
    console.log(rows)

    return rows
  } catch (err) {
    throw new Error('DB')
  }
}

export default {
  getIssues,
}
