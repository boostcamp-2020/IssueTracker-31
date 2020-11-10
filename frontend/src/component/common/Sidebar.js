import React from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import Label from './Label'
import userIcon from '@Public/images/defaultUserIcon.png'

const Sidebar = ({
  labels,
  assignees,
  milestone,
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
          milestone={milestone}
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
          <StyledDiv key={assignee.nickname + idx}>
            <StyledImg
              src={assignee.profileUrl || userIcon}
              alt="user profile"
            />
            <StyledSpan>{assignee.nickname}</StyledSpan>
          </StyledDiv>
        ))}
      </React.Fragment>
    )
  }

  const StyledDiv = styled.div`
    height: 27px;
    font-weight: 600;
    display: table;
    height: 100%;
    text-align: center;
  `
  return <StyledContent display="block">{getAssigneeComponent()}</StyledContent>
}

const LabelContent = ({ labels, update }) => {
  const getLabelComponent = () => {
    if (!labels.length) return <React.Fragment>None yet</React.Fragment>
    return (
      <React.Fragment>
        {labels.map((label, i) => (
          <Label key={label.name + i} {...label} />
        ))}
      </React.Fragment>
    )
  }

  return <StyledContent>{getLabelComponent()}</StyledContent>
}

const MilestoneContent = ({ milestone, update }) => {
  const percent = parseInt(
    (milestone.closeIssue / (milestone.openIssue + milestone.closeIssue)) * 100,
  )
  const getMilestoneComponent = () => {
    if (!milestone) return <React.Fragment>No milestone</React.Fragment>
    return (
      <StyledDiv>
        <StyledProgressBar>
          <StyledProgressItem percent={percent} />
        </StyledProgressBar>
        <StyledSpan>{milestone.title}</StyledSpan>
      </StyledDiv>
    )
  }

  const StyledDiv = styled.div`
    height: 27px;
    font-weight: 600;
    display: block;
    height: 100%;
    width: 100%;
    text-align: center;
  `
  return <StyledContent>{getMilestoneComponent()}</StyledContent>
}

const StyledProgressBar = styled.span`
  height: 10px;
  display: flex;
  overflow: hidden;
  background-color: #e1e4e8;
  border-radius: 6px;
  outline: 1px solid transparent;
  margin-top: 4px;
  margin-bottom: 8px;
`

const StyledSpan = styled.span`
  display: table-cell;
  vertical-align: middle;
`

const StyledImg = styled.img`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 3px 4px;
`

const StyledProgressItem = styled.span`
  width: ${({ percent }) => `${percent}%`};
  outline: 2px solid transparent;
  background-color: #28a745;
`

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
