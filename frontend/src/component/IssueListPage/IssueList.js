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
      isOpen: conditions.isOpen ? 1 : 0,
    })
  }, [conditions])
  return (
    <div>
      <IssueFilter
        checkedIssues={checkedIssues}
        setCheckedIssues={setCheckedIssues}
        issues={issues}
      />
      <StyledIssueContainer>
        {issues.length
          ? issues.map(issue => (
              <Issue
                {...issue}
                checkedIssues={checkedIssues}
                setCheckedIssues={setCheckedIssues}
                key={issue.id}
              />
            ))
          : 'No Results matched'}
      </StyledIssueContainer>
    </div>
  )
}
const StyledIssueContainer = styled.div`
  display: flex;
`
export default IssueList
