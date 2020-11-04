const getUsersQueryString = 'SELECT id, nickname, profileUrl FROM User'
const findUserQueryString =
  'SELECT id, nickname, email FROM User WHERE nickname = ?'
const storeUserQueryString =
  'INSERT INTO User(email, nickname, profileUrl, githubId) VALUES(?,?,?,?)'
export default {
  getUsersQueryString,
  findUserQueryString,
  storeUserQueryString,
}
