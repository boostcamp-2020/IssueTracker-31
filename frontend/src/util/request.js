import axios from 'axios'

const GET = async (path, params = null) => {
  try {
    const response = await axios.get(path, {
      params,
      withCredentials: true,
    })
    return response
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
      withCredentials: true,
    })
    return response
  } catch (err) {
    console.error(err)
  }
}

const DELETE = async (path, params = null) => {
  try {
    const response = await axios.delete(path, {
      params,
      withCredentials: true,
    })
    return response
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
      withCredentials: true,
    })
    return response
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
      withCredentials: true,
    })
    return response
  } catch (err) {
    console.error(err)
  }
}

const requset = {
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
}

export default requset
