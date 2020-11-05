import userService from '../../service/user'
import errorResponse from '../../util/error-response'
import qs from 'querystring'
import rs from 'randomstring'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import statusCode from '../../util/statusCode'

const githubLogin = (req, res) => {
  const state = rs.generate()
  const url = 'https://github.com/login/oauth/authorize?'
  const query = qs.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri:
      process.env.NODE_ENV === 'development'
        ? process.env.BACKEND_HOST + '/users/githublogin'
        : process.env.PRODUCTION_HOST + '/users/githublogin',
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
        ? process.env.BACKEND_HOST + '/users/githublogin'
        : process.env.PRODUCTION_HOST + '/users/githublogin',
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
    if (user)
      res.cookie('userToken', createToken(user.id, data.login, data.email), {
        httpOnly: true,
      })
    else {
      const userId = await userService.storeUser(data)
      res.cookie('userToken', createToken(userId, data.login, data.email), {
        httpOnly: true,
      })
    }
    res.cookie('userData', { nickname: nickname, userId: user.id })
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

const verifyToken = (req, res) => {
  try {
    jwt.verify(req.cookies.userToken, process.env.JWT_KEY)
    return res.status(statusCode.OK).json({
      success: true,
    })
  } catch (err) {
    console.log(err)
    return res.status(statusCode.OK).json({
      success: false,
    })
  }
}

const verifyMiddelware = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.user, process.env.JWT_KEY)
    req.userData = decoded
    next()
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_HOST}/login`)
  }
}

export default {
  githubLogin,
  handleGithubCallback,
  getUsers,
  verifyToken,
  verifyMiddelware,
}
