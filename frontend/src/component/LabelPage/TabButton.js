import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@Component/common/Button'

const TabButton = () => {
  return (
    <StyledTabButtonContainer>
      <Button
        buttonName="Labels"
        targetLocation="/labels"
        backgroundColor="#0366d6"
        color="#ffffff"
      />
      <Button
        buttonName="Milestones"
        targetLocation="/milestones"
        backgroundColor="#ffffff"
        color="#000000"
      />
    </StyledTabButtonContainer>
  )
}

const StyledTabButtonContainer = styled.div`
  box-sizing: border-box;
`

export default TabButton
