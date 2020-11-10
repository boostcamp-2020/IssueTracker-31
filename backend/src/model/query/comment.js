const getIssueCommentQueryString = `
  SELECT C.id, C.userId, U.nickname, U.profileUrl, C.content, C.createdAt 
  FROM Comment C 
  JOIN User U ON C.userId = U.id WHERE C.issueId = ? 
  ORDER BY C.createdAt; `
const postCommentQueryString = 'INSERT INTO Comment SET ?'
const updateCommentQueryString =
  'UPDATE Comment SET content = ? where id = ? and userId = ?'

export default {
  getIssueCommentQueryString,
  postCommentQueryString,
  updateCommentQueryString,
}
