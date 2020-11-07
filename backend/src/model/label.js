import db from './index'
import query from './query/label'

const getLabel = async () => {
  const sql = query.getLabelQueryString
  const [rows] = await db.query(sql)
  return rows
}

const getLabelByName = async name => {
  const sql = query.getLabelByNameQueryString
  const [rows] = await db.query(sql, [name])
  return rows[0]
}
export default {
  getLabel,
}
