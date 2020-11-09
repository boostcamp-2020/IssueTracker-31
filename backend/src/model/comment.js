import db from './index'
import query from './query/comment'

const postComment = async (
  issueId,
  userId,
  content,
  isIssueContent,
  connection,
) => {
  try {
    connection = connection ? connection : db
    const [result] = await connection.query(query.postCommentQueryString, {
      issueId,
      userId,
      content,
      isIssueContent,
    })
    return result.insertId
  } catch (err) {
    throw new Error('DB')
  }
}

const updateComment = async (id, userId, content) => {
  const [result] = await db.query(query.updateCommentQueryString, [
    content,
    id,
    userId,
  ])
  if (result.affectedRows === 0) throw new Error('NOT_EXIST')
  if (result.changedRows === 0) throw new Error('NOT_MODIFIED')
}

export default {
  postComment,
  updateComment,
}
