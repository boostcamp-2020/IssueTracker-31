import db from '../model/user'

const getUsers = async () => {
  const users = await db.getUsers()
  return users
}

const findUser = async nickname => {
  const user = await db.findUser(nickname)
  return user
}

const storeUser = async data => {
  const userId = await db.storeUser(data)
  return userId
}

export default {
  getUsers,
  findUser,
  storeUser,
}
