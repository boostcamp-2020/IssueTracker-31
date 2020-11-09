import React, { useState, createContext } from 'react'
import styled from 'styled-components'
import ProfileWithContent from '@Component/common/ProfileWithContent'
import SpeechBubble from '@Component/common/SpeechBubble'
import Sidebar from '@Component/common/Sidebar'

export const createIssueContext = createContext()

const CreateIssuePage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState(document.cookie.userData || null)
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestoneId, setMilestoneId] = useState(null)
  return (
    <createIssueContext.Provider
      value={{ title, content, userId, label, milestoneId, assignee }}
    >
      <StyledWrapper>
        <ProfileWithContent>
          <SpeechBubble />
        </ProfileWithContent>
        <Sidebar page="createIssue" />
      </StyledWrapper>
    </createIssueContext.Provider>
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
