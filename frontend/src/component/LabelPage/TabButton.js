import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@Component/common/Button'

const TabButton = ({ clicked }) => {
  return (
    <StyledTabButtonContainer>
      <Button
        buttonName="Labels"
        targetLocation="/labels"
        backgroundColor={clicked === 'label' ? '#0366d6' : '#ffffff'}
        color={clicked === 'label' ? '#ffffff' : '#000000'}
      />
      <Button
        buttonName="Milestones"
        targetLocation="/milestones"
        backgroundColor={clicked === 'milestone' ? '#0366d6' : '#ffffff'}
        color={clicked === 'milestone' ? '#ffffff' : '#000000'}
      />
    </StyledTabButtonContainer>
  )
}

const StyledTabButtonContainer = styled.div`
  box-sizing: border-box;
`

export default TabButton
