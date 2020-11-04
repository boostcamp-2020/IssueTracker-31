import React, { createContext, useState, useEffect } from 'react'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import Button from '@Component/common/Button'
import LinkButton from '@Component/common/LinkButton'
import { getLabels } from '@Api/label'
import { getMilestones } from '@Api/milestone'

export const issueListContext = createContext()

const useFetch = (requestFn, setFn) => {
  useEffect(async () => {
    const response = await requestFn()
    setFn(response)
  }, [])
}

const IssueListPage = props => {
  const [users, setUsers] = useState([])
  const [labels, setLabels] = useState([])
  const [milestones, setMilestones] = useState([])

  // useFetch(getUsers, setUsers) // TODO
  useFetch(getLabels, setLabels)
  useFetch(getMilestones, setMilestones)

  return (
    <issueListContext.Provider value={{ users, labels, milestones }}>
      <SearchBar />
      <IssueFilter />
      <Button name={"New Issue"} />
      <LinkButton />
    </issueListContext.Provider>
  )
}

export default IssueListPage
