import React, { createContext, useState, useEffect } from 'react'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import { getLabels } from '@Api/label'
import { getMilestones } from '@Api/milestone'

export const issueListContext = createContext()

const useFetch = (requestFn, setFn, setConditions) => {
  useEffect(async () => {
    const response = await requestFn()
    setFn(response)
    setConditions({
      author: [],
      label: [1, 2],
      assignee: [],
      milestone: [2],
      isOpen: true,
    })
    console.log('test')
  }, [])
}

const IssueListPage = props => {
  const [users, setUsers] = useState([])
  const [labels, setLabels] = useState([])
  const [milestones, setMilestones] = useState([])
  const [conditions, setConditions] = useState({
    author: [],
    label: [],
    assignee: [],
    milestone: [],
    isOpen: true,
  })

  // useFetch(getUsers, setUsers) // TODO
  useFetch(getLabels, setLabels, setConditions)
  useFetch(getMilestones, setMilestones, setConditions)

  return (
    <issueListContext.Provider
      value={{ users, labels, milestones, conditions, setConditions }}
    >
      <SearchBar />
      <IssueFilter />
    </issueListContext.Provider>
  )
}

export default IssueListPage
