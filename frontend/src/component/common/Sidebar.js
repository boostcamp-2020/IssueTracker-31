import React, { setState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import createIssueContext from '@Page/CreateIssue'

const Sidebar = ({ page }) => {
  const { assignee, label, milestoneId } = useContext(
    page === 'createIssue' ? createIssueContext : '',
  )
  return (
    <StyledSidebar>
      <SidebarItem title="Assignees" defaultMessage="No one—">
        {assignee}
      </SidebarItem>
      <SidebarItem title="Labels" defaultMessage="None yet">
        {label}
      </SidebarItem>
      <SidebarItem title="Milestone" defaultMessage="No mileston">
        {milestoneId}
      </SidebarItem>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  width: 25%;
`

export default Sidebar
