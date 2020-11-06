import db from './index'

const getLabel = async () => {
  const sql = 'SELECT id, name, description, color from Label'
  const [rows] = await db.query(sql)
  return rows
}

export default {
  getLabel,
}
