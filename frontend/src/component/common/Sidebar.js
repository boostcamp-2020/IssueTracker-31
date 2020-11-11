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

  // 유저, 라벨, 마일스톤 목록 요청 함수를 만들어서 아이템으로 각각 전달,
  // 팝업 클릭하면 데이터를 최신으로 받아와서 그 데이터를 넘겨주고 각각 아이템에서 title 보고 스위치로 넘겨줄 프롭스를 정함
  // 기존 배열에서 변경사항(+,-) 있는지 체크하는 함수도 여기서 만들어서 넘겨줌
  return (
    <StyledSidebar>
      <SidebarItem title="Assignees" popupProps={getPopUpProps("Assignees")}>
        <AssigneeContent
          assignees={assignees}
          update={updateAssignee}
        ></AssigneeContent>
      </SidebarItem>
      <SidebarItem title="Labels" popupProps={getPopUpProps("Labels")}>
        <LabelContent labels={labels} update={updateLabel}></LabelContent>
      </SidebarItem>
      <SidebarItem title="Milestone" popupProps={getPopUpProps("Milestone")}>
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

const MilestoneContent = ({
  milestone: { openIssue, closeIssue, title },
  update,
}) => {
  const percent = parseInt((closeIssue / (openIssue + closeIssue)) * 100 || 0)
  const getMilestoneComponent = () => {
    if (!title) return <React.Fragment>No milestone</React.Fragment>
    return (
      <StyledDiv>
        <StyledProgressBar>
          <StyledProgressItem percent={percent} />
        </StyledProgressBar>
        <StyledSpan>{title}</StyledSpan>
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
