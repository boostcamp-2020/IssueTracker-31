import db from '../model/user'

const getUsers = async () => {
  const users = await db.getUsers()
  return users
}

export default {
  getUsers,
}
