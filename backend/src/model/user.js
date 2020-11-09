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

const findUser = async nickname => {
  const sql = query.findUserQueryString
  try {
    const [row] = await db.query(sql, [nickname])
    return row
  } catch (err) {
    throw new Error('DB')
  }
}

const storeUser = async data => {
  const sql = query.storeUserQueryString
  try {
    const [newUser] = await db.query(sql, [
      data.email,
      data.login,
      data.avatar_url,
      data.id,
    ])
    return newUser.insertId
  } catch (err) {
    throw new Error('DB')
  }
}

const getAssigneesOnIssue = async (issueId, connection = db) => {
  try {
    const [assignees] = await connection.query(
      query.getAssigneesOnIssueQueryString,
      issueId,
    )
    return assignees
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

const addAssigneeOnissue = async (issueId, addList, connection = db) => {
  try {
    await connection.query(query.addAssigneeOnissueQueryString, [
      addList.map(assigneeId => [issueId, assigneeId]),
    ])
  } catch (err) {
    console.log(err)
    throw new Error('DB')
  }
}

const deleteAssigneeOnissue = async (issueId, deleteList, connection = db) => {
  try {
    await connection.query(query.deleteAssigneeOnissueQueryString, [
      deleteList.map(assigneeId => [issueId, assigneeId]),
    ])
  } catch (err) {
    console.log(err)
    if (err.code === 'ER_DUP_ENTRY') throw new Error('DUPLICATE')
    throw new Error('DB')
  }
}

export default {
  getUsers,
  findUser,
  storeUser,
  getAssigneesOnIssue,
  addAssigneeOnissue,
  deleteAssigneeOnissue,
}
