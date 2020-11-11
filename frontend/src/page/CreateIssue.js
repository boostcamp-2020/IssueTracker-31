import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import Sidebar from '@Component/common/Sidebar'
import { createIssue } from '@Api/issue'
import { useHistory } from 'react-router-dom'

const CreateIssuePage = () => {
  const history = useHistory()
  const submitAction = async e => {
    const issueId = await createIssue({
      title,
      content,
      assignee,
      label,
      milestoneId,
    })
    if (issueId) {
      history.push(`/issues/${issueId}`)
    }
  }
  // cancel action
  const cancelAction = () => {
    history.push('/')
  }

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestoneId, setMilestoneId] = useState(undefined)
  return (
    <StyledWrapper>
      <ProfileWithContent
        title={[title, setTitle]}
        content={[content, setContent]}
        submitAction={submitAction}
        cancelAction={cancelAction}
        page="createIssue"
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
