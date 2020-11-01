import React from 'react'
import Label from '../common/Label'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Issue = ({ id, title, label = [], milestone, assignee = [] }) => {
  return (
    <StyledRow>
      <input type="checkbox" />
      <StyledArticle>
        <Link to={`/issues/${id}`}>{title}</Link>
        <StyledLabels>
          {label.map((item, i) => (
            <Label key={item.name + i} {...item} />
          ))}
        </StyledLabels>
        <StyledIssueInfo>{milestone}</StyledIssueInfo>
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

export default Issue
