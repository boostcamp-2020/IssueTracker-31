import React, { useState } from 'react'
import IssueDetailHeader from '@Component/IssueDetailPage/IssueDetailHeader'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import { getComments } from '@Api/comment'
import { useFetch } from '@Util/hook'

const IssueDetailPage = ({ match }) => {
  const [title, setTitle] = useState('')
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestone, setMilestone] = useState([])

  const closeIssueAction = () => {}

  const CommentAction = () => {}

  const CancelAction = () => {}

  const UpdateAction = () => {}

  useFetch(getComments, setComments, match.params.id)

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
      {comments.map(comment => {
        console.log(comment)
      })}
      <ProfileWithContent
        title={[title, setTitle]}
        content={[content, setContent]}
        page="detailIssue"
      />
    </div>
  )
}

export default IssueDetailPage
