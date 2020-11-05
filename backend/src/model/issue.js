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

const postIssue = async (connection, { title, userId, milestoneId }) => {
  try {
    const [result] = await connection.query('INSERT INTO Issue SET ?', {
      title,
      userId,
      milestoneId,
    })
    return result.insertId
  } catch (err) {
    throw new Error('DB')
  }
}

const setRelations = async (
  connection,
  table,
  firstColumn,
  secondColumn,
  relations,
) => {
  try {
    await connection.query(
      `INSERT INTO ${table} (${firstColumn}, ${secondColumn}) VALUES ?`,
      [relations],
    )
  } catch (err) {
    throw new Error('DB')
  }
}

export default {
  getIssues,
  postIssue,
  setRelations,
}
