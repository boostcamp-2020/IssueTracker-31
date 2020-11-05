import db from './index'

const updateCommentId = async (commentId, images, connection) => {
  try {
    connection = connection ? connection : db
    return await connection.query(
      'UPDATE CommentImageUrl SET commentId=? WHERE id IN(?)',
      [commentId, images],
    )
  } catch (err) {
    throw new Error('DB')
  }
}

export default {
  updateCommentId,
}
