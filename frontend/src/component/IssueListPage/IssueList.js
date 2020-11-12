import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Issue from '@Component/IssueListPage/Issue'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import { issueListContext } from '@Page/IssueList'
import { getIssues } from '@Api/issue'
import { fetchData } from '@Util/hook'

const IssueList = () => {
  const [checkedIssues, setCheckedIssues] = useState([])
  const [issues, setIssues] = useState([])
  const { conditions } = useContext(issueListContext)
  useEffect(() => {
    fetchData(getIssues, setIssues, {
      ...conditions,
      isOpen: undefined,
    })
  }, [conditions])
  return (
    <StyledIssueListComponent>
      <IssueFilter
        checkedIssues={checkedIssues}
        setCheckedIssues={setCheckedIssues}
        issues={issues}
      />
      <StyledIssueContainer>
        {issues.filter(issue => issue.isOpen === (conditions.isOpen ? 1 : 0))
          .length
          ? issues
              .filter(issue => issue.isOpen === (conditions.isOpen ? 1 : 0))
              .map(issue => (
                <Issue
                  {...issue}
                  checkedIssues={checkedIssues}
                  setCheckedIssues={setCheckedIssues}
                  key={issue.id}
                />
              ))
          : 'No Results matched'}
      </StyledIssueContainer>
    </StyledIssueListComponent>
  )
}
const StyledIssueContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledIssueListComponent = styled.div`
  margin-top: 16px;
  border: 1px solid #ededed;
  border-radius: 6px;
`
export default IssueList
