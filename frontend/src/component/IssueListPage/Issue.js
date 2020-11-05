import React, { useContext } from 'react'
import Label from '../common/Label'
import styled from 'styled-components'
import { checkedIssueContext } from '@Component/IssueListPage/IssueList'
import { Link } from 'react-router-dom'
import { getTimePassedFromNow } from '../../util/util'

const selectIssue = () => {
  setCheckedIssue(...checkedIssues, checkedIssues.includes(id) ? id : '')
}
const Issue = ({
  id,
  title,
  createdAt,
  label = [],
  milestone,
  assignee = [],
}) => {
  const { checkedIssues, setCheckedIssue } = useContext(checkedIssueContext)
  const handleClick = () => selectIssue(id)
  return (
    <StyledRow>
      <input type="checkbox" onClick={handleClick} />
      <StyledArticle>
        <StyledLink to={`/issues/${id}`}>{title}</StyledLink>
        <StyledLabels>
          {label.map((item, i) => (
            <Label key={item.name + i} {...item} />
          ))}
        </StyledLabels>
        <StyledIssueInfo>
          {`#${id} opened ${getTimePassedFromNow(createdAt)} `}
          {milestone}
        </StyledIssueInfo>
      </StyledArticle>
      <StyledAssignees>
        {assignee.map(user => (
          <img src={user.profileUrl}></img>
        ))}
      </StyledAssignees>
    </StyledRow>
  )
}
const StyledRow = styled.div`
  display: flex;
`
const StyledArticle = styled.article`
  flex: auto;
`
const StyledIssueInfo = styled.div`
  color: #586069;
  font-size: 12px;
`
const StyledLabels = styled.div`
  display: inline;
`
const StyledAssignees = styled.div`
  width: 25%;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  font-size: 16px;
  font-weight: 600;
`

export default Issue
