import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileWithContent from '@Component/common/ProfileWithContent'
import SpeechBubble from '@Component/common/SpeechBubble'
import Sidebar from '@Component/common/Sidebar'

const CreateIssuePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState(document.cookie.userData || null)
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestoneId, setMilestoneId] = useState(null)
  return (
    <StyledWrapper>
      <ProfileWithContent>
        <SpeechBubble />
      </ProfileWithContent>
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
