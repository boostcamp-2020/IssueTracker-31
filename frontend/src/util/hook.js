import { useEffect } from 'react'

const useFetch = (requestFn, setFn, params) => {
  useEffect(() => {
    fetchData(requestFn, setFn, params)
  }, [])
}

const fetchData = async (requestFn, setFn, params) => {
  setFn(await requestFn(params))
}

export { useFetch, fetchData }
