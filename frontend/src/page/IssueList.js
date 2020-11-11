import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import SearchBar from '@Component/IssueListPage/SearchBar'
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
  const [labels, setLabels] = useState([])
  const [milestones, setMilestones] = useState([])
  const [conditions, setConditions] = useState({
    author: [],
    label: [],
    assignee: [],
    milestone: [],
    isOpen: true,
  })

  useFetch(getUsers, setUsers)
  useFetch(getLabels, setLabels)
  useFetch(getMilestones, setMilestones)

  return (
    <issueListContext.Provider
      value={{ users, labels, milestones, conditions, setConditions }}
    >
      <StyledContainer>
        <StyledHeaderContainer>
          <SearchBar />
          <TabButton
            labelCount={labels.length}
            milestoneCount={milestones.filter(m => m.isOpen).length}
          />
          <StyledEmpty />
          <LinkButton
            buttonName={'New Issue'}
            targetLocation={'/issue/new'}
            isGreen={true}
          />
        </StyledHeaderContainer>
        <IssueList />
      </StyledContainer>
    </issueListContext.Provider>
  )
}

const StyledContainer = styled.div`
  max-width: 1280px;
  padding-right: 32px;
  padding-left: 32px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 32px;
`

const StyledHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 16px;
`

const StyledEmpty = styled.div`
  width: 8px;
`

export default IssueListPage
