const postCommentQueryString = 'INSERT INTO Comment SET ?'
const updateCommentQueryString = 'UPDATE Comment SET content = ? where id = ?'

export default {
  postCommentQueryString,
  updateCommentQueryString,
}
