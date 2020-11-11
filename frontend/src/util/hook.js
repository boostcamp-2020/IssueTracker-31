import { useEffect } from 'react'

const useFetch = (requestFn, setFn, params) => {
  useEffect(() => {
    fetchData(requestFn, setFn, params)
  }, [])
}

const fetchData = async (requestFn, setFn, params) => {
  try {
    const response = await requestFn(params)
    setFn(response)
  } catch (error) {
    console.log(error)
  }
}

export { useFetch, fetchData }
