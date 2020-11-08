import db from './index'
import query from './query/comment'

const getIssueComments = async id => {
  const [comments] = await db.query(query.getIssueCommentQueryString, id)
  return comments
}

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

export default {
  getIssueComments,
  postComment,
}
