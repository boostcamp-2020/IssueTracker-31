import React from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

const Sidebar = () => {
  return (
    <StyledSidebar>
      <SidebarItem title="Assignees">No one</SidebarItem>
      <SidebarItem title="Labels">None yet</SidebarItem>
      <SidebarItem title="Milestone">No milestone</SidebarItem>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  width: 25%;
`

export default Sidebar
