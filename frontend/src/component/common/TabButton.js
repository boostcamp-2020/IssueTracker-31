import React from 'react'
import styled from 'styled-components'
import Button from '@Component/common/Button'
import LabelIcon from '@Public/js/LabelIcon'
import OpenIcon from '@Public/js/OpenIcon'

const TabButton = ({ clicked, labelCount, milestoneCount }) => {
  return (
    <StyledTabButtonContainer>
      <Button buttonProps={getProps(clicked === 'label', labelCount, 'Labels')}>
        {labelCount}
      </Button>
      <Button
        buttonProps={getProps(
          clicked === 'milestone',
          milestoneCount,
          'Milestones',
        )}
      >
        {milestoneCount}
      </Button>
    </StyledTabButtonContainer>
  )
}

const getProps = (clicked, count, buttonName) => {
  return {
    count,
    buttonName,
    targetLocation: buttonName === 'Labels' ? '/labels' : '/milestones',
    style: {
      backgroundColor: clicked ? '#0366d6' : '#ffffff',
      color: clicked ? '#ffffff' : '#000000',
      hoverColor: clicked ? '#0366d6' : '#e5e5e5',
      borderRadius:
        buttonName === 'Labels' ? '6px 0px 0px 6px' : '0px 6px 6px 0px',
    },
    svg:
      buttonName === 'Labels' ? (
        <LabelIcon clicked={clicked} />
      ) : (
          <OpenIcon clicked={clicked} />
        ),
  }
}

const StyledTabButtonContainer = styled.nav`
  box- sizing: border-box;
  display: flex!important;
  white - space: nowrap!important;
  float: left;
  font - size: 14px;
  line - height: 1.5;
  `

export default TabButton
