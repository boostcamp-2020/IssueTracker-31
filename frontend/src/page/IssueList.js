import React from 'react'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'

const IssueListPage = props => {
  return (
    <>
      <SearchBar />
      <IssueFilter />
    </>
  )
}

export default IssueListPage
