import React from 'react'
import styled from 'styled-components'
import SettingIcon from '@Public/js/SettingIcon'

const SidebarItem = ({ title, children }) => {
  return (
    <StyledSidebarItem>
      <StyledTitle>
        <span>{title}</span>
        <SettingIcon />
      </StyledTitle>
      {children}
    </StyledSidebarItem>
  )
}

const StyledSidebarItem = styled.div`
  font-size: 12px;
  color: #586069;
  border-bottom: solid 1px #586069;
  box-sizing: border-box;
  flex-shrink: 1;
  padding-top: 10px;
`

const StyledTitle = styled.div`
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  &:hover {
    color: #0366d6;
    cursor: pointer;
    fill: blue;
  }
`

export default SidebarItem
