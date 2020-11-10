import React, { setState, useEffect } from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import createIssueContext from '@Page/CreateIssue'

const Sidebar = ({ label, assignee, milestone }) => {
  const [labels, setLabels] = label
  const [assignees, setAssignees] = assignee
  const [milestoneId, setMilestoneId] = milestone

  return (
    <StyledSidebar>
      <SidebarItem title="Assignees">
        <AssigneeContent assignees={assignees}></AssigneeContent>
      </SidebarItem>
      <SidebarItem title="Labels">
        <LabelContent labels={labels}></LabelContent>
      </SidebarItem>
      <SidebarItem title="Milestone">
        <MilestoneContent milestoneId={milestoneId}></MilestoneContent>
      </SidebarItem>
    </StyledSidebar>
  )
}

const AssigneeContent = ({ assignees }) => {
  const getAssigneeComponent = () => {
    if (!assignees.length)
      return (
        <React.Fragment>
          No one—<StyledButton>assign yourself</StyledButton>
        </React.Fragment>
      )
    return (
      <React.Fragment>
        {assignees.map((assignee, idx) => (
          <div key={idx}> assignee </div>
        ))}
      </React.Fragment>
    )
  }

  return <StyledContent>{getAssigneeComponent()}</StyledContent>
}

const LabelContent = ({ labels }) => {
  const getLabelComponent = () => {
    if (!labels.length) return <React.Fragment>None yet</React.Fragment>
    return (
      <React.Fragment>
        {labels.map((assignee, idx) => (
          <div key={idx}> assignee </div>
        ))}
      </React.Fragment>
    )
  }

  return <StyledContent>{getLabelComponent()}</StyledContent>
}

const MilestoneContent = ({ milestoneId }) => {
  const getLabelComponent = () => {
    if (milestoneId === undefined)
      return <React.Fragment>No milestone</React.Fragment>
    return <div>milestoneId</div>
  }

  return <StyledContent>{getLabelComponent()}</StyledContent>
}

const StyledSidebar = styled.div`
  width: 25%;
  min-width: 150px;
  max-width: 250px;
`

const StyledContent = styled.div`
  display: flex;
  padding: 10px 0px;
`

const StyledButton = styled.button`
  font-weight: 450;
  border: 0px;
  color: #586069;
  padding: 0px;
  background: transparent;
  cursor: pointer;
  overflow: visible;
  outline: 0;
  &:hover {
    color: #0366d6;
    cursor: pointer;
  }
`

export default Sidebar
