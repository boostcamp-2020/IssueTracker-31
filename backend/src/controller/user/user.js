import userService from '../../service/user'
import errorResponse from '../../util/error-response'
import qs from 'querystring'
import rs from 'randomstring'
import dotenv from 'dotenv'

dotenv.config()

const githubLogin = (req, res) => {
  const state = rs.generate()
  const url = 'https://github.com/login/oauth/authorize?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.HOST + '/githublogin',
    state: state,
    scope: 'user:email',
  })
  const githubAuthUrl = url + query
  res.send(githubAuthUrl)
}

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers()
    return res.json({ success: true, data: users })
  } catch (err) {
    console.log(err)
    errorResponse(err, res)
  }
}

export default {
  githubLogin,
  getUsers,
}
