import userService from '../../service/user'
import qs from 'querystring'
import rs from 'randomstring'
import dotenv from 'dotenv'

dotenv.config()

const githubLogin = (req, res, next) => {
  //   const data = userService.githubLogin
  let state = rs.generate()
  const url = 'https://github.com/login/oauth/authorize?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: 'http://localhost:3000/githublogin',
    state: state,
    scope: 'user:email',
  })
  const githubAuthUrl = url + query
  res.send(githubAuthUrl)
}

export default {
  githubLogin,
}
