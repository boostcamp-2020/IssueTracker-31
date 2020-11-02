import userService from '../../service/user'
import qs from 'querystring'
import rs from 'randomstring'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import axios from 'axios'

dotenv.config()

const githubLogin = (req, res) => {
  const state = rs.generate()
  const url = 'https://github.com/login/oauth/authorize?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.BACKEND_HOST + '/users/githublogin',
    state: state,
    scope: 'read:user',
  })
  const githubAuthUrl = url + query
  res.send(githubAuthUrl)
}

const handleGithubCallback = (req, res) => {
  const code = req.query.code
  const returnedState = req.query.state
  const githubUrl = 'https://github.com/login/oauth/access_token?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.BACKEND_HOST + '/users/githublogin',
    state: returnedState,
  })
  const authUrl = githubUrl + query

  axios
    .post(authUrl)
    .then(result => {
      const config = {
        headers: {
          Authorization: 'token ' + qs.parse(result.data).access_token,
          'User-Agent': 'Login-App',
        },
      }
      axios
        .get('https://api.github.com/user', config)
        .then(githubData => {
          const jwtToken = jwt.sign(
            {
              nickname: githubData.login,
              email: githubData.email,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            },
          )
          res.cookie('user', jwtToken, { maxAge: 3000 * 1000 })
          res.redirect(
            process.env.NODE_ENV === 'devlopment'
              ? process.env.FRONTEND_HOST
              : process.env.FRONTEND_HOST,
          )
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}

export default {
  githubLogin,
  handleGithubCallback,
}
