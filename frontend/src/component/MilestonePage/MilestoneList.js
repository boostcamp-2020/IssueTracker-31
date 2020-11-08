import React, { useContext } from 'react'
import Milestone from './Milestone'
import styled from 'styled-components'
import { milestoneContext } from '@Page/Milestone/Milestone'
import OpenIcon from '@Public/js/OpenIcon'
import CloseIcon from '@Public/js/CloseIcon'
import { deleteMilestone } from '@Api/milestone'

const MilestoneList = () => {
  const { milestones, setMilestones } = useContext(milestoneContext)

  const handleDeleteBtn = async id => {
    const success = await deleteMilestone(id)
    if (success) setMilestones(milestones.filter(item => item.id !== id))
  }
  return (
    <div>
      <StyledHeader>
        <StyledFilter>
          <StyledFilterItem>
            <OpenIcon /> {milestones.length} Open
          </StyledFilterItem>
          <StyledFilterItem>
            <CloseIcon /> {milestones.length} Close
          </StyledFilterItem>
        </StyledFilter>
      </StyledHeader>
      {milestones.map(milestone => (
        <Milestone
          key={milestone.id}
          data={milestone}
          handleDeleteBtn={handleDeleteBtn}
        ></Milestone>
      ))}
    </div>
  )
}

const StyledHeader = styled.header`
  position: relative;
  margin-top: 20px;
  background-color: #f6f8fa;
  color: #24292e;
  border: 1px solid #e1e4e8;
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  line-height: 1.5;
`

const StyledFilter = styled.div`
  padding-left: 6px;
`

const StyledFilterItem = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 13px;
  padding-bottom: 13px;
  color: #24292e;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
  appearance: none;
  margin-left: 10px;
`

export default MilestoneList
