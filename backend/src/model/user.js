import db from './index'
import query from './query/user'

const getUsers = async () => {
  const sql = query.getUsersQueryString
  try {
    const [rows] = await db.query(sql)
    return rows
  } catch (err) {
    throw new Error('DB')
  }
}

export default {
  getUsers,
}
