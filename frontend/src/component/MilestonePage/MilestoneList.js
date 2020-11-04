import React, { useContext } from 'react'
import Milestone from './Milestone'
import styled from 'styled-components'
import { milestoneContext } from '@Page/Milestone'
import OpenIcon from '@Public/js/OpenIcon'
import CloseIcon from '@Public/js/CloseIcon'

function MilestoneList() {
  const { milestones } = useContext(milestoneContext)
  return (
    <StyledContainer>
      <StyledHeader>
        <OpenIcon /> {milestones.length} Open
        <CloseIcon /> {milestones.length} Close
      </StyledHeader>
      {milestones.map(milestone => (
        <Milestone key={milestone.id} data={milestone}></Milestone>
      ))}
    </StyledContainer>
  )
}

const StyledContainer = styled.div``

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

export default MilestoneList
