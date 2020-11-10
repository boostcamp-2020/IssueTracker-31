const getUsersQueryString = 'SELECT id, nickname, profileUrl FROM User'
const findUserQueryString =
  'SELECT id, nickname, email FROM User WHERE nickname = ?'
const storeUserQueryString =
  'INSERT INTO User(email, nickname, profileUrl, githubId) VALUES(?,?,?,?)'
const getAssigneesOnIssueQueryString = `
  SELECT u.id, u.profileUrl, u.nickname
  FROM User as u
  JOIN Issue_assignee as ia ON u.id = ia.userId
  WHERE ia.issueId = ?;
`
const addAssigneeOnissueQueryString =
  'INSERT INTO Issue_assignee (issueId, userId) VALUES ?'

const deleteAssigneeOnissueQueryString =
  'DELETE FROM Issue_assignee WHERE (issueId, userId) IN (?);'

export default {
  getUsersQueryString,
  findUserQueryString,
  storeUserQueryString,
  getAssigneesOnIssueQueryString,
  addAssigneeOnissueQueryString,
  deleteAssigneeOnissueQueryString,
}
