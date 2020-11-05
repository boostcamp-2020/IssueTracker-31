import { useEffect } from 'react'

const useFetch = (requestFn, setFn) => {
  useEffect(() => {
    fetchData(requestFn, setFn)
  }, [])
}

const fetchData = async (requestFn, setFn) => {
  const response = await requestFn()
  setFn(response)
}

export { useFetch }
