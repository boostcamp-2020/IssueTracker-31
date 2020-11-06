import db from './index'
import query from './query/commnetImageUrl'

const updateCommentId = async (commentId, images, connection) => {
  try {
    connection = connection ? connection : db
    return await connection.query(query.updateCommentIdQueryString, [
      commentId,
      images,
    ])
  } catch (err) {
    throw new Error('DB')
  }
}

export default {
  updateCommentId,
}
