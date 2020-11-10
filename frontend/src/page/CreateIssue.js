import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import Sidebar from '@Component/common/Sidebar'

const CreateIssuePage = () => {
  // submit action

  // cancel action

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestoneId, setMilestoneId] = useState(null)
  return (
    <StyledWrapper>
      <ProfileWithContent
        title={[title, setTitle]}
        content={[content, setContent]}
        assignee={[assignee, setAssignee]}
        label={[label, setLabel]}
        milestoneId={[milestoneId, setMilestoneId]}
        b
      />
      <Sidebar />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  max-width: 1280px;
  display: flex;
  margin-right: auto;
  margin-left: auto;
  padding: 0px 32px;
  box-sizing: border-box;
`

export default CreateIssuePage
