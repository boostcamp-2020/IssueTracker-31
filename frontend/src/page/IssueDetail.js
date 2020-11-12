import React, { useState, createContext, useEffect } from 'react'
import IssueDetailHeader from '@Component/IssueDetailPage/IssueDetailHeader'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import Comment from '@Component/IssueDetailPage/Comment'
import Sidebar from '@Component/common/Sidebar'
import EventButton from '@Component/common/EventButton'
import { getTimePassedFromNow, getParsedCookie } from '@Util/util'
import { getComments, createComment } from '@Api/comment'
import { useFetch } from '@Util/hook'
import {
  getIssueDetail,
  updateIssueLabels,
  updateIssueAssignee,
  patchIssueDetail,
  patchIssues,
} from '@Api/issue'

export const IssueDetailPageContext = createContext()

const getAllIssueInfo = async (
  issueInfo,
  setTitle,
  setIsOpen,
  setAssignee,
  setLabel,
  setMilestone,
) => {
  const data = await getIssueDetail(issueInfo.issueId)
  if (data) {
    issueInfo = {
      ...issueInfo,
      ...data,
    }
    setTitle(data.title)
    setIsOpen(data.isOpen)
    setAssignee(data.assignee)
    setLabel(data.label)
    setMilestone(data.milestone)
  }
  //   issueId: <issue_id>,
  // title: <issue_title>,
  // isOpen: <issue_isOpen>,
  // author: <user_nickname>,
  // profileUrl: <user_profileUrl>,
  // createdAt: <issue_createdAt>,
  // commentCount: <count(comment)>,
}

const IssueDetailPage = ({ match }) => {
  const issueInfo = { issueId: match.params.id }
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState('')
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestone, setMilestone] = useState([])

  const addComment = async () => {
    await createComment(match.params.id, {
      userId: getParsedCookie('userId'),
      content,
    })
  }

  const handleOpen = async () => {
    if (
      await patchIssues({
        issueId: [match.params.id],
        isOpen: isOpen ? 0 : 1,
      })
    )
      setIsOpen(isOpen ? 0 : 1)
  }

  const updateLabels = async id => {
    if (label.includes(id)) {
      if (await updateIssueLabels({ id: match.params.id, body: { add: [id] } }))
        setLabel(label.filter(item => item !== id))
    } else {
      if (
        await updateIssueLabels({ id: match.params.id, body: { delete: [id] } })
      )
        setLabel([...label, id])
    }
  }

  const updateAssignees = async id => {
    if (assignee.includes(id)) {
      if (
        await updateIssueAssignee({ id: match.params.id, body: { add: [id] } })
      )
        setAssignee(assignee.filter(item => item !== id))
    } else {
      if (
        await updateIssueAssignee({
          id: match.params.id,
          body: { delete: [id] },
        })
      )
        setAssignee([...assignee, id])
    }
  }

  const updateMilestone = async id => {
    if (milestone.includes(id)) {
      if (
        await patchIssueDetail({
          id: match.params.id,
          body: { milestoneId: null },
        })
      )
        setMilestone([])
    } else {
      if (
        await patchIssueDetail({
          id: match.params.id,
          body: { milestoneId: id },
        })
      )
        setMilestone([id])
    }
  }

  useEffect(() => {
    getAllIssueInfo(
      issueInfo,
      setTitle,
      setIsOpen,
      setAssignee,
      setLabel,
      setMilestone,
    )
  }, [])
  useFetch(getComments, setComments, match.params.id)

  return (
    <div>
      <IssueDetailHeader
        issueId={1}
        isOpen={isOpen}
        createdAt={'2020-11-09 00:00:00'}
        nickname={'hyex'}
        commentCnt={3}
        title={title}
        setTitle={setTitle}
      />
      <Comment />
      {comments.map(comment => {
        console.log(comment)
        // return (
        //   <Comment
        //     title={`${issueInfo.nickname} commentd ${getTimePassedFromNow(
        //       issueInfo.createdAt,
        //     )}`}
        //     content={issueInfo.content}
        //   />
        // )
      })}
      <ProfileWithContent
        title={[title, setTitle]}
        content={[content, setContent]}
        buttons={
          <>
            <EventButton
              onClick={handleOpen}
              buttonName={isOpen ? 'Reopen issue' : 'Close issue'}
              isGreen={false}
            />
            <EventButton
              onClick={addComment}
              buttonName="Comment"
              isGreen={true}
              disabled={!content}
            />
          </>
        }
        page="detailIssue"
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
