import React from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

const Sidebar = ({
  labels,
  assignees,
  milestoneId,
  updateLabel,
  updateAssignee,
  updateMilestone,
}) => {
  return (
    <StyledSidebar>
      <SidebarItem title="Assignees" popup={null}>
        <AssigneeContent
          assignees={assignees}
          update={updateAssignee}
        ></AssigneeContent>
      </SidebarItem>
      <SidebarItem title="Labels" popup={null}>
        <LabelContent labels={labels} update={updateLabel}></LabelContent>
      </SidebarItem>
      <SidebarItem title="Milestone" popup={null}>
        <MilestoneContent
          milestoneId={milestoneId}
          update={updateMilestone}
        ></MilestoneContent>
      </SidebarItem>
    </StyledSidebar>
  )
}

const AssigneeContent = ({ assignees, update }) => {
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
          <StyledDiv key={idx}>
            <StyledImg src="https://avatars3.githubusercontent.com/u/53181778?s=60&v=4"></StyledImg>
            {assignee}
          </StyledDiv>
        ))}
      </React.Fragment>
    )
  }

  const StyledDiv = styled.div`
    height: 20px;
    font-weight: 600;
  `

  const StyledImg = styled.img`
    border-radius: 50%;
    width: 20px;
    height: 20px;
  `

  return <StyledContent display="block">{getAssigneeComponent()}</StyledContent>
}

const LabelContent = ({ labels, update }) => {
  const getLabelComponent = () => {
    if (!labels.length) return <React.Fragment>None yet</React.Fragment>
    return (
      <React.Fragment>
        {labels.map((assignee, idx) => (
          <div key={idx}> {assignee} </div>
        ))}
      </React.Fragment>
    )
  }

  return <StyledContent>{getLabelComponent()}</StyledContent>
}

const MilestoneContent = ({ milestoneId, update }) => {
  const getLabelComponent = () => {
    if (!milestoneId) return <React.Fragment>No milestone</React.Fragment>
    return <div>{milestoneId}</div>
  }

  return <StyledContent>{getLabelComponent()}</StyledContent>
}

const StyledSidebar = styled.div`
  width: 25%;
  min-width: 150px;
  max-width: 250px;
`

const StyledContent = styled.div`
  ${({ display = 'flex' }) => `
    display: ${display};
    padding: 10px 0px;
  `}
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
