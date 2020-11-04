import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Issue from '@Component/IssueListPage/Issue'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import { issueListContext } from '@Page/IssueList'
import { getIssues } from '@Api/issue'

const useFetch = async (requestFn, setFn, params) => {
  console.log(params)
  const response = await requestFn(params)
  console.log(response)
  setFn(response)
}
const IssueList = () => {
  const [issues, setIssues] = useState([])
  const { conditions } = useContext(issueListContext)
  useEffect(() => {
    useFetch(getIssues, setIssues, {
      ...conditions,
      isOpen: conditions.isOpen ? 1 : 0,
    })
  }, [conditions])
  return (
    <div>
      <IssueFilter />
      <StyledIssueContainer>
        {issues.map(issue => (
          <Issue {...issue} key={issue.id} />
        ))}
      </StyledIssueContainer>
    </div>
  )
}
const StyledIssueContainer = styled.div`
  display: flex;
`
export default IssueList
