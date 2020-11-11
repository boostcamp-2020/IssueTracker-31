import React, { useState } from 'react'
import IssueDetailHeader from '@Component/IssueDetailPage/IssueDetailHeader'
import {
  updateIssueLabels,
  updateIssueAssignee,
  patchIssueDetail,
} from '@Api/issue'
import Sidebar from '@Component/common/Sidebar'

const IssueDetailPage = () => {
  const [label, setLabel] = useState([])
  const [assignee, setAssignee] = useState([])
  const [milestone, setMilestone] = useState([])
  const issueId = 2 //임시값
  const updateLabels = async id => {
    if (label.includes(id)) {
      if (await updateIssueLabels({ id: issueId, body: { add: [id] } }))
        setLabel(label.filter(item => item !== id))
    } else {
      if (await updateIssueLabels({ id: issueId, body: { delete: [id] } }))
        setLabel([...label, id])
    }
  }

  const updateAssignees = async id => {
    if (assignee.includes(id)) setAssignee(assignee.filter(item => item !== id))
    else setAssignee([...assignee, id])
  }

  const updateMilestone = async id => {
    if (milestone.includes(id)) setMilestone([])
    else setMilestone([id])
  }

  const [title, setTitle] = useState('issue title')
  return (
    <div>
      <IssueDetailHeader
        issueId={1}
        isOpen={false}
        createdAt={'2020-11-09 00:00:00'}
        nickname={'hyex'}
        commentCnt={3}
        title={title}
        setTitle={setTitle}
      />
      <Sidebar
        labels={label}
        assignees={assignee}
        milestone={milestone}
        updateLabels={updateLabels}
        updateAssignees={updateAssignees}
        updateMilestone={updateMilestone}
      />
    </div>
  )
}

export default IssueDetailPage
