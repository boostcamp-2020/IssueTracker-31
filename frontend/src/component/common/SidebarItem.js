import React from 'react'
import styled from 'styled-components'
import SettingIcon from '@Public/js/SettingIcon'

const SidebarItem = ({ title, defaultMessage, children }) => {
  return (
    <StyledSidebarItem>
      <StyledTitle display="flex">
        <span>{title}</span>
        <SettingIcon />
      </StyledTitle>
      <StyledContent>
        {children ? children : defaultMessage}
        {title === 'Assignees' ? (
          <StyledButton>assign yourself</StyledButton>
        ) : (
          ''
        )}
      </StyledContent>
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

const StyledContent = styled.div`
  display: flex;
  padding: 10px 0px;
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

export default SidebarItem
