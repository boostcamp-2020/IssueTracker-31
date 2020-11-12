import React, { useState, createContext } from 'react'
import styled from 'styled-components'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import Sidebar from '@Component/common/Sidebar'
import EventButton from '@Component/common/EventButton'
import WritingArea from '@Component/common/content/WritingArea'
import { createIssue } from '@Api/issue'
import { useHistory } from 'react-router-dom'

export const createIssueContext = createContext()

const CreateIssuePage = () => {
  const history = useHistory()
  const submitAction = async e => {
    const issueId = await createIssue({
      title,
      content,
      assignee,
      label,
      milestoneId: milestone[0],
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
  const [milestone, setMilestone] = useState([])

  const updateLabels = id => {
    if (label.includes(id)) setLabel(label.filter(item => item !== id))
    else setLabel([...label, id])
  }

  const updateAssignees = id => {
    if (assignee.includes(id)) setAssignee(assignee.filter(item => item !== id))
    if (assignee.length >= 10) alert('Assignees is up to 10')
    else setAssignee([...assignee, id])
  }

  const updateMilestone = id => {
    if (milestone.includes(id)) setMilestone([])
    else setMilestone([id])
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  return (
    <StyledWrapper>
      <ProfileWithContent
        formContent={
          <>
            <TitleInputContainer
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              required
            />
            <WritingArea
              content={[content, setContent]}
              buttons={
                <>
                  <EventButton
                    onClick={cancelAction}
                    buttonName="Cancel"
                    isGreen={false}
                  />
                  <EventButton
                    onClick={submitAction}
                    buttonName="Submit New Issue"
                    isGreen={true}
                    disabled={!title}
                  />
                </>
              }
            />
          </>
        }
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

const TitleInputContainer = styled.input`
  box-shadow: 0 1px 3px rgba(0.2, 0.2, 0.2, 0.2), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  height: 30px;
  padding: 5px;
`

const StyledWrapper = styled.div`
  max-width: 1280px;
  display: flex;
  margin-right: auto;
  margin-left: auto;
  padding: 0px 32px;
  box-sizing: border-box;
`

export default CreateIssuePage
