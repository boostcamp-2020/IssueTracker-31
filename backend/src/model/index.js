import statusCode from '../util/statusCode'
import resMessage from '../util/resMessage'

import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

const doQuery = async (query, params) => {
  try {
    const connection = await pool.getConnection()
    const [rows] = await connection.query(query, params)
    await connection.release()
    return rows
  } catch (err) {
    throw { status: statusCode.DB_ERROR, message: resMessage.DB_ERROR }
  }
}

const beginTransaction = async () => {
  const connection = await pool.getConnection()
  await connection.beginTransaction()
  return connection
}

const endTransaction = async connection => {
  await connection.commit()
  await connection.release()
  return
}

export { doQuery, beginTransaction, endTransaction }
export default pool
