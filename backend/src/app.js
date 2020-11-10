import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import Controller from './controller'
import statusCode from './util/statusCode'
import resMessage from './util/resMessage'
const app = express()
const port = process.env.PORT || 3000

app.set('port', port)

app.use(cookieParser())
app.use(cors({ origin: true, credentials: true }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', Controller)

const publicPath = path.join(__dirname, '../../frontend/build')
app.use(express.static(publicPath))
app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html')
})

app.use((err, req, res, next) => {
  if (err.status)
    return res.status(err.status).json({ success: false, message: err.message })
  else
    return res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: resMessage.INTERNAL_SERVER_ERROR })
})

app.listen(port, err => {
  if (err) throw err
  console.log('Connected to server http://localhost:3000/')
})

module.exports = app
