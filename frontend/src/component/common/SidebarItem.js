import React from 'react'
import styled from 'styled-components'

const SidebarItem = ({ title, children }) => {
  return (
    <StyledSidebarItem>
      <StyledTitle display="flex">
        <span>{title}</span>
        <div>🔆</div>
      </StyledTitle>
      <div>{children}</div>
    </StyledSidebarItem>
  )
}

const StyledSidebarItem = styled.div`
  border-bottom: solid 1px #586069;
  box-sizing: border-box;
  flex-shrink: 1;
`

const StyledTitle = styled.div`
  display: flex;
  justify-content: space-between;
`

export default SidebarItem
