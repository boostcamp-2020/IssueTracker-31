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
  const [assignee, setAssignee] = useState([
    {
      nickname: 'abc',
      profileUrl: 'https://avatars3.githubusercontent.com/u/53181778?s=60&v=4',
    },
    { nickname: 'xyz' },
  ])
  const [label, setLabel] = useState([
    { name: 'ppp', color: '#123123' },
    { name: 'aaa', color: '#fd12f3' },
  ])
  const [milestone, setMilestone] = useState({
    closeIssue: 3,
    openIssue: 4,
    title: 'backend',
  }) //null

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
