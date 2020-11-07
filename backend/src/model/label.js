import db from './index'
import query from './query/label'

const getLabel = async () => {
  const sql = query.getLabelQueryString
  const [rows] = await db.query(sql)
  return rows
}

const getLabelByName = async name => {
  const sql = query.getLabelByNameQueryString
  const [rows] = await db.query(sql, name)
  console.log(rows)
  return rows[0]
}

const postLabel = async ({ name, description, color }, connection) => {
  connection = connection ? connection : db
  try {
    const [result] = await connection.query(query.postLabelQueryString, {
      name,
      description,
      color,
    })
    return result.insertId
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') throw new Error('DUPLICATE')
    throw new Error('DB')
  }
}

export default {
  getLabel,
  postLabel,
  getLabelByName,
}
