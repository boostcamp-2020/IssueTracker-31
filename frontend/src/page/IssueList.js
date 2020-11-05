import React, { useEffect } from 'react'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import Request from '../util/request'
import { useHistory } from 'react-router-dom'

const IssueListPage = props => {
  const history = useHistory()
  const checkUser = async () => {
    try {
      const { data } = await Request.GET(
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/users/verify'
          : 'http://115.85.181.174:3000/users/verify',
      )
      return data.success
    } catch {
      return false
    }
  }

  const goTo = () => {
    history.push('/login')
  }

  useEffect(() => {
    checkUser().then(res => {
      if (res === false) goTo()
    })
  }, [])

  return (
    <>
      <SearchBar />
      <IssueFilter />
    </>
  )
}

export default IssueListPage
