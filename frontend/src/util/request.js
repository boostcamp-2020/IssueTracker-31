import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://115.85.181.174:3000/api'
    : 'http://127.0.0.1:3000/api'

const options = {
  withCredentials: true,
  baseURL,
}

const GET = async (path, params = null) => {
  try {
    const response = await axios.get(path, {
      params,
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const POST = async (path, data, contentType = 'application/json') => {
  try {
    const response = await axios.post(path, data, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const DELETE = async (path, params = null) => {
  try {
    const response = await axios.delete(path, {
      params,
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const PATCH = async (path, data, contentType = 'application/json') => {
  try {
    const response = await axios.patch(path, data, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const PUT = async (path, data, contentType = 'application/json') => {
  try {
    const response = await axios.put(path, data, {
      headers: {
        'Content-Type': contentType,
      },
      ...options,
    })
    return response.data
  } catch (err) {
    console.error(err)
  }
}

const request = {
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
}

export default request
