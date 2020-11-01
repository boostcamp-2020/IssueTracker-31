import db from '../model/user'

const getUsers = async () => {
  console.log(123)
  const users = await db.getUsers()
  return users
}

export default {
  getUsers,
}
