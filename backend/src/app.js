import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import Controller from './controller'

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../../frontend/build')

app.set('port', port)

app.use(cors({ origin: true, credentials: true }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(publicPath))

app.use('/api', Controller)
app.get('*', (req, res) => {
  res.sendFile(publicPath + '/index.html')
})

app.listen(port, err => {
  if (err) throw err
  console.log('Connected to server http://localhost:3000/')
})

module.exports = app
