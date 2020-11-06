import React, { createContext, useState, useEffect } from 'react'
import Request from '../util/request'
import { useHistory } from 'react-router-dom'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import TabButton from '@Component/common/TabButton'
import LinkButton from '@Component/common/LinkButton'
import IssueList from '@Component/IssueListPage/IssueList'
import { getLabels } from '@Api/label'
import { getMilestones } from '@Api/milestone'
import { getUsers } from '@Api/user'
import { useFetch } from '@Util/hook'

export const issueListContext = createContext()

const IssueListPage = props => {
  const [users, setUsers] = useState([])
  const history = useHistory()
  const [labels, setLabels] = useState([])
  const [milestones, setMilestones] = useState([])
  const [conditions, setConditions] = useState({
    author: [],
    label: [],
    assignee: [],
    milestone: [],
    isOpen: true,
  })

  const checkUser = async () => {
    try {
      const data = await Request.GET('/users/verify')
      return data.success
    } catch (error) {
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    checkUser().then(res => {
      if (res === false) history.push('/login')
    })
  }, [])

  useFetch(getUsers, setUsers)
  useFetch(getLabels, setLabels)
  useFetch(getMilestones, setMilestones)

  return (
    <issueListContext.Provider
      value={{ users, labels, milestones, conditions, setConditions }}
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
      <IssueList />
    </issueListContext.Provider>
  )
}

export default IssueListPage
