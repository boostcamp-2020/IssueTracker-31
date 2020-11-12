import React, { useState, createContext, useEffect } from 'react'
import styled from 'styled-components'
import IssueDetailHeader from '@Component/IssueDetailPage/IssueDetailHeader'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import Comment from '@Component/IssueDetailPage/Comment'
import Sidebar from '@Component/common/Sidebar'
import { getTimePassedFromNow } from '@Util/util'
import { getComments } from '@Api/comment'
import { useFetch } from '@Util/hook'
import {
  getIssueDetail,
  updateIssueLabels,
  updateIssueAssignees,
  patchIssueDetail,
} from '@Api/issue'

export const IssueDetailPageContext = createContext()

const getAllIssueInfo = async (
  issueInfo,
  setIssueInfo,
  setTitle,
  setIsOpen,
  setAssignee,
  setLabel,
  setMilestone,
) => {
  const data = await getIssueDetail(issueInfo.issueId)
  if (data) {
    setIssueInfo({
      ...issueInfo,
      ...data,
    })
    console.log(data.assignee)
    setTitle(data.title)
    setIsOpen(data.isOpen)
    setAssignee(data.assignee.map(item => item.id))
    setLabel(data.label.map(item => item.id))
    setMilestone(data.milestone.map(item => item.id))
  }
  console.log(data)
}

const IssueDetailPage = ({ match }) => {
  const [issueInfo, setIssueInfo] = useState({
    issueId: match.params.id,
    author: '',
    profileUrl: '',
    createdAt: '',
    commentCount: 0,
  })
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState('')
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestone, setMilestone] = useState([])
  console.log(
    issueInfo,
    title,
    isOpen,
    comments,
    content,
    assignee,
    label,
    milestone,
  )
  useEffect(() => {
    getAllIssueInfo(
      issueInfo,
      setIssueInfo,
      setTitle,
      setIsOpen,
      setAssignee,
      setLabel,
      setMilestone,
    )
  }, [])
  useFetch(getComments, setComments, issueInfo.issueId)

  const closeIssueAction = () => {}

  const CommentAction = () => {}

  const CancelAction = () => {}

  const UpdateAction = () => {}

  const updateLabels = async id => {
    if (label.includes(id)) {
      if (
        await updateIssueLabels({ id: issueInfo.issueId, body: { add: [id] } })
      )
        setLabel(label.filter(item => item !== id))
    } else {
      if (
        await updateIssueLabels({
          id: issueInfo.issueId,
          body: { delete: [id] },
        })
      )
        setLabel([...label, id])
    }
  }

  const updateAssignees = async id => {
    if (assignee.includes(id)) {
      if (
        await updateIssueAssignees({
          id: issueInfo.issueId,
          body: { add: [id] },
        })
      )
        setAssignee(assignee.filter(item => item !== id))
    } else {
      if (
        await updateIssueAssignees({
          id: issueInfo.issueId,
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
          id: issueInfo.issueId,
          body: { milestoneId: null },
        })
      )
        setMilestone([])
    } else {
      if (
        await patchIssueDetail({
          id: issueInfo.issueId,
          body: { milestoneId: id },
        })
      )
        setMilestone([id])
    }
  }
  return (
    <StyledContainer>
      <IssueDetailHeader
        issueId={issueInfo.issueId}
        isOpen={isOpen}
        createdAt={issueInfo.createdAt}
        nickname={issueInfo.author}
        commentCnt={comments.length}
        title={title}
        setTitle={setTitle}
      />
      <StyledContentWrapper>
        <StyledCommentWrapper>
          {comments.map(comment => {
            return (
              <Comment
                title={`${issueInfo.nickname} commentd ${getTimePassedFromNow(
                  issueInfo.createdAt,
                )}`}
                content={issueInfo.content}
              />
            )
          })}
          <ProfileWithContent
            title={[title, setTitle]}
            content={[content, setContent]}
            page="detailIssue"
          />
        </StyledCommentWrapper>
        <StyledSidebarWrapper>
          <Sidebar
            labels={label}
            assignees={assignee}
            milestone={milestone}
            updateLabel={updateLabels}
            updateAssignee={updateAssignees}
            updateMilestone={updateMilestone}
          />
        </StyledSidebarWrapper>
      </StyledContentWrapper>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding-right: 32px;
  padding-left: 32px;
  max-width: 1280px;
  margin: 32px auto;
`
const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: -16px;
  margin-left: -16px;
`
const StyledCommentWrapper = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  margin-bottom: 0;
  flex-shrink: 0;
  width: 75%;
`

const StyledSidebarWrapper = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  margin-bottom: 0;
  flex-shrink: 0;
  width: 25%;
`

export default IssueDetailPage
