import React from 'react'
import styled from 'styled-components'
import Button from '@Component/common/Button'

const TabButton = ({ page, LabelCount, openMilestoneCount }) => {
  return (
    <StyledTabButtonContainer>
      <Button
        buttonName="Labels"
        targetLocation="/labels"
        backgroundColor={page === 'label' ? '#0366d6' : '#ffffff'}
        color={page === 'label' ? '#ffffff' : '#000000'}
      >
        {LabelCount}
      </Button>
      <Button
        buttonName="Milestones"
        targetLocation="/milestones"
        backgroundColor={page === 'milestone' ? '#0366d6' : '#ffffff'}
        color={page === 'milestone' ? '#ffffff' : '#000000'}
      >
        {openMilestoneCount}
      </Button>
    </StyledTabButtonContainer>
  )
}

const StyledTabButtonContainer = styled.nav`
  box-sizing: border-box;
  display: flex !important;
  white-space: nowrap !important;
  float: left;
  font-size: 14px;
  line-height: 1.5;
`

export default TabButton
