import React, { createContext, useState, useEffect } from 'react'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import TabButton from '@Component/common/TabButton'
import LinkButton from '@Component/common/LinkButton'
import EventButton from '@Component/common/EventButton'
import { getLabels } from '@Api/label'
import { getMilestones } from '@Api/milestone'
import { useFetch } from '@Util/hook'

export const issueListContext = createContext()

const IssueListPage = props => {
  const [users, setUsers] = useState([])
  const [labels, setLabels] = useState([])
  const [milestones, setMilestones] = useState([])
  const [issues, setIssues] = useState([])
  const [conditions, setConditions] = useState({
    author: [],
    label: [],
    assignee: [],
    milestone: [],
    isOpen: true,
  })

  // useFetch(getUsers, setUsers) // TODO
  useFetch(getLabels, setLabels)
  useFetch(getMilestones, setMilestones)

  return (
    <issueListContext.Provider
      value={{ users, labels, milestones, issues, conditions, setConditions }}
    >
      <SearchBar />
      <TabButton
        labelCount={labels.length}
        milestoneCount={milestones.filter(m => m.isOpen).length}
      />
      <LinkButton
        buttonName={'New Issue'}
        targetLocation={'/issue/new'}
        isGreen={true}
      />
      <IssueFilter />
    </issueListContext.Provider>
  )
}

export default IssueListPage
