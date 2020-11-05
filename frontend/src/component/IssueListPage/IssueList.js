import React, { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Issue from '@Component/IssueListPage/Issue'
import IssueFilter from '@Component/IssueListPage/IssueFilter'
import { issueListContext } from '@Page/IssueList'
import { getIssues } from '@Api/issue'

export const checkedIssueContext = createContext()

const useFetch = async (request, setState, params) =>
  setState(await request(params))

const IssueList = () => {
  const [checkedIssues, setCheckedIssue] = useState([])
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
      <checkedIssueContext.Provider value={{ checkedIssues, setCheckedIssue }}>
        <IssueFilter />
        <StyledIssueContainer>
          {issues.map(issue => (
            <Issue {...issue} key={issue.id} />
          ))}
        </StyledIssueContainer>
      </checkedIssueContext.Provider>
    </div>
  )
}
const StyledIssueContainer = styled.div`
  display: flex;
`
export default IssueList
