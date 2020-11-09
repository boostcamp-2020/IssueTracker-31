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

const deleteLabel = async (labelId, connection) => {
  connection = connection ? connection : db
  try {
    await connection.query(query.deleteLabelQueryString, labelId)
  } catch (err) {
    throw new Error('DB')
  }
}

const patchLabel = async (labelId, patchingData, connection) => {
  connection = connection ? connection : db
  try {
    await connection.query(query.patchLabelQueryString, [patchingData, labelId])
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

const getLabelsOnIssue = async (issueId, connection) => {
  connection = connection ? connection : db
  try {
    const [labels] = await connection.query(
      query.getLabelsOnIssueQueryString,
      issueId,
    )
    return labels
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

const addLabelsOnIssue = async (issueId, addList, connection = db) => {
  try {
    await connection.query(query.addLabelsOnIssueQueryString, [
      addList.map(labelId => [issueId, labelId]),
    ])
  } catch (err) {
    console.log(err)
    if (err.code === 'ER_DUP_ENTRY') throw new Error('DUPLICATE')
    throw new Error('DB')
  }
}

const deleteLabelsOnIssue = async (issueId, deleteList, connection = db) => {
  try {
    await connection.query(query.deleteLabelsOnIssueQueryString, [
      deleteList.map(labelId => [issueId, labelId]),
    ])
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

export default {
  getLabel,
  postLabel,
  getLabelByName,
  deleteLabel,
  patchLabel,
  getLabelsOnIssue,
  addLabelsOnIssue,
  deleteLabelsOnIssue,
}
