import userService from '../../service/user'
import errorResponse from '../../util/error-response'
import qs from 'querystring'
import rs from 'randomstring'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import statusCode from '../../util/statusCode'
import resMessage from '../../util/resMessage'

const githubLogin = (req, res) => {
  const state = rs.generate()
  const url = 'https://github.com/login/oauth/authorize?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri:
      process.env.NODE_ENV === 'development'
        ? process.env.BACKEND_HOST + '/api/users/githublogin'
        : process.env.PRODUCTION_HOST + '/api/users/githublogin',
    state: state,
    scope: 'read:user',
  })
  const githubAuthUrl = url + query
  res.send(githubAuthUrl)
}

const handleGithubCallback = async (req, res) => {
  const code = req.query.code
  const returnedState = req.query.state
  const githubUrl = 'https://github.com/login/oauth/access_token?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
    redirect_uri:
      process.env.NODE_ENV === 'development'
        ? process.env.BACKEND_HOST + '/api/users/githublogin'
        : process.env.PRODUCTION_HOST + '/api/users/githublogin',
    state: returnedState,
  })
  const authUrl = githubUrl + query

  try {
    const loginData = await axios.post(authUrl)
    const config = {
      headers: {
        Authorization: 'token ' + qs.parse(loginData.data).access_token,
        'User-Agent': 'Login-App',
      },
    }
    const { data } = await axios.get('https://api.github.com/user', config)
    const nickname = data.login
    const [user] = await userService.findUser(nickname)
    const setToken = (userId, data, nickname) => {
      res.cookie('userToken', createToken(userId, data.login, data.email), {
        httpOnly: true,
      })
      res.cookie('userData', { nickname, userId, profileUrl: data.avatar_url })
    }
    if (user) setToken(user.id, data, nickname)
    else {
      const userId = await userService.storeUser(data)
      setToken(userId, data, nickname)
    }
    res.redirect(
      process.env.NODE_ENV === 'development'
        ? process.env.FRONTEND_HOST
        : process.env.PRODUCTION_HOST,
    )
  } catch (err) {
    console.log(err)
    errorResponse(err, res)
  }
}

const createToken = (id, nickname, email) => {
  return jwt.sign(
    {
      id: id,
      nickname: nickname,
      email: email,
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1h',
    },
  )
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

const verifyMiddleware = (req, res, next) => {
  if (req.path === '/login') next()
  else {
    try {
      const decoded = jwt.verify(req.cookies.userToken, process.env.JWT_KEY)
      req.userData = decoded
      next()
    } catch (err) {
      console.log(err)
      res.redirect('/login')
    }
  }
}

export default {
  githubLogin,
  handleGithubCallback,
  getUsers,
  verifyMiddleware,
}
