import React, { useState, createContext, useEffect } from 'react'
import styled from 'styled-components'
import IssueDetailHeader from '@Component/IssueDetailPage/IssueDetailHeader'
import ProfileWithContent from '@Component/common/content/ProfileWithContent'
import WritingArea from '@Component/common/content/WritingArea'
import Comment from '@Component/IssueDetailPage/Comment'
import Sidebar from '@Component/common/Sidebar'
import EventButton from '@Component/common/EventButton'
import { getTimePassedFromNow, getParsedCookie } from '@Util/util'
import { getComments, createComment } from '@Api/comment'
import { useFetch } from '@Util/hook'
import {
  getIssueDetail,
  updateIssueLabels,
  updateIssueAssignees,
  patchIssueDetail,
  patchIssues,
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
    setTitle(data.title)
    setIsOpen(data.isOpen)
    setAssignee(data.assignee.map(item => item.id))
    setLabel(data.label.map(item => item.id))
    setMilestone(data.milestone.map(item => item.id))
  }
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
  const [isOpen, setIsOpen] = useState(true)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [assignee, setAssignee] = useState([])
  const [label, setLabel] = useState([])
  const [milestone, setMilestone] = useState([])

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

  const addComment = async () => {
    const userId = getParsedCookie('userId')
    const id = await createComment(match.params.id, {
      userId,
      content,
    })
    setComments([
      ...comments,
      {
        id,
        nickname: getParsedCookie('nickname'),
        userId,
        content,
        profileUrl: getParsedCookie('profileUrl'),
        createdAt: Date.now(),
      },
    ])
    setContent('')
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
      if (
        await updateIssueLabels({
          id: issueInfo.issueId,
          body: { delete: [id] },
        })
      )
        setLabel(label.filter(item => item !== id))
    } else {
      if (
        await updateIssueLabels({
          id: issueInfo.issueId,
          body: { add: [id] },
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
          body: { delete: [id] },
        })
      )
        setAssignee(assignee.filter(item => item !== id))
    } else {
      if (
        await updateIssueAssignees({
          id: issueInfo.issueId,
          body: { add: [id] },
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
              <ProfileWithContent
                key={comment.id}
                profileUrl={comment.profileUrl}
                formContent={
                  <Comment
                    id={comment.id}
                    owner={comment.nickname === issueInfo.author}
                    editable={comment.userId === getParsedCookie('userId')}
                    nickname={comment.nickname}
                    timePassed={getTimePassedFromNow(comment.createdAt)}
                    contentText={comment.content}
                  />
                }
              />
            )
          })}
          <ProfileWithContent
            formContent={
              <WritingArea
                content={[content, setContent]}
                buttons={
                  <>
                    <EventButton
                      onClick={handleOpen}
                      buttonName={isOpen ? 'Close issue' : 'Reopen issue'}
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
              />
            }
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
