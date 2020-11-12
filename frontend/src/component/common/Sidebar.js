import React, { useState } from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import Label from './Label'
import { useFetch } from '@Util/hook'
import userIcon from '@Public/images/defaultUserIcon.png'
import { getUsers } from '@Api/user'
import { getLabels } from '@Api/label'
import { getMilestonesDetail } from '@Api/milestone'
import { getParsedCookie } from '@Util/util'

const Sidebar = ({
  labels,
  assignees,
  milestone,
  updateLabel,
  updateAssignee,
  updateMilestone,
}) => {
  const [userList, setUserList] = useState([])
  const [labelList, setLabelList] = useState([])
  const [milestoneList, setMilestoneList] = useState([])
  useFetch(getUsers, setUserList)
  useFetch(getLabels, setLabelList)
  useFetch(getMilestonesDetail, setMilestoneList)

  const getPopUpProps = type => {
    switch (type) {
      case 'Assignees':
        return {
          title: 'Assign up to 10 people to this issue',
          kind: 'assignee',
          data: userList,
          targetCondition: assignees,
          updateConditions: updateAssignee,
        }
      case 'Labels':
        return {
          title: 'Apply labels to this issue',
          kind: 'label',
          data: labelList,
          targetCondition: labels,
          updateConditions: updateLabel,
        }
      case 'Milestone':
        return {
          title: 'Set milestone',
          kind: 'milestone',
          data: milestoneList.map(item => {
            return { id: item.id, title: item.title }
          }),
          targetCondition: milestone,
          updateConditions: updateMilestone,
        }
      default:
        return null
    }
  }

  return (
    <StyledSidebar>
      <SidebarItem title="Assignees" popupProps={getPopUpProps('Assignees')}>
        <AssigneeContent
          assignees={assignees}
          list={userList}
          update={updateAssignee}
        ></AssigneeContent>
      </SidebarItem>
      <SidebarItem title="Labels" popupProps={getPopUpProps('Labels')}>
        <LabelContent labels={labels} list={labelList}></LabelContent>
      </SidebarItem>
      <SidebarItem title="Milestone" popupProps={getPopUpProps('Milestone')}>
        <MilestoneContent
          milestone={milestone}
          list={milestoneList}
        ></MilestoneContent>
      </SidebarItem>
    </StyledSidebar>
  )
}

const AssigneeContent = ({ assignees, update, list }) => {
  const filteredList = list.filter(item => assignees.includes(item.id))

  const assignYourself = () => {
    update(getParsedCookie('userId'))
  }

  const getAssigneeComponent = () => {
    if (!assignees.length)
      return (
        <React.Fragment>
          No one—
          <StyledButton onClick={assignYourself}>assign yourself</StyledButton>
        </React.Fragment>
      )
    return (
      <React.Fragment>
        {filteredList.map((assignee, i) => (
          <StyledDiv key={i}>
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

const LabelContent = ({ labels, list }) => {
  const filteredList = list.filter(item => labels.includes(item.id))
  const getLabelComponent = () => {
    if (!labels.length) return <React.Fragment>None yet</React.Fragment>
    return (
      <React.Fragment>
        {filteredList.map((label, i) => (
          <Label key={i} {...label} />
        ))}
      </React.Fragment>
    )
  }

  return <StyledContent>{getLabelComponent()}</StyledContent>
}

const MilestoneContent = ({ milestone, list }) => {
  const filteredMilestone = list.filter(item => milestone.includes(item.id))
  if (!filteredMilestone.length)
    return <React.Fragment>No Milestone</React.Fragment>
  const selectedMilestone = filteredMilestone[0]
  const percent = parseInt(
    (selectedMilestone.closeIssue /
      (selectedMilestone.openIssue + selectedMilestone.closeIssue)) *
      100 || 0,
  )
  const getMilestoneComponent = () => {
    return (
      <StyledDiv>
        <StyledProgressBar>
          <StyledProgressItem percent={percent} />
        </StyledProgressBar>
        <StyledSpan>{selectedMilestone.title}</StyledSpan>
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
