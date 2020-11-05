import request from '@Util/request'

const getUsers = async () => {
  const { success, data, message } = await request.GET('/users')

  if (success === false) return console.error(message)
  return data
}

export { getUsers }
