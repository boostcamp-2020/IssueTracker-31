const postCommentQueryString = 'INSERT INTO Comment SET ?'
const updateCommentQueryString =
  'UPDATE Comment SET content = ? where id = ? and userId = ?'

export default {
  postCommentQueryString,
  updateCommentQueryString,
}
