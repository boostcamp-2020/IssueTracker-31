import db from './index'

const postComment = async (
  issueId,
  userId,
  content,
  isIssueContent,
  connection,
) => {
  try {
    connection = connection ? connection : db
    const [result] = await connection.query('INSERT INTO Comment SET ?', {
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
  postComment,
}
