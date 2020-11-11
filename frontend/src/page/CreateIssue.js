import React, { useState, createContext } from 'react'
import styled from 'styled-components'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import Sidebar from '@Component/common/Sidebar'

export const createIssueContext = createContext()

const CreateIssuePage = () => {
  // submit action
  const submitAction = () => {}
  // cancel action
  const cancelAction = () => {}

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestone, setMilestone] = useState([])

  const updateLabels = newLabels => {
    setLabel(newLabels)
  }

  const updateAssignees = newAssignees => {
    setAssignee(newAssignees)
  }

  const updateMilestone = newMilestone => {
    setMilestone(newMilestone)
  }

  return (
    <StyledWrapper>
      <ProfileWithContent
        title={[title, setTitle]}
        content={[content, setContent]}
        submitAction={submitAction}
        cancelAction={cancelAction}
        page={'createIssue'}
      />
      <Sidebar
        labels={label}
        assignees={assignee}
        milestone={milestone}
        updateLabel={updateLabels}
        updateAssignee={updateAssignees}
        updateMilestone={updateMilestone}
      />
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
