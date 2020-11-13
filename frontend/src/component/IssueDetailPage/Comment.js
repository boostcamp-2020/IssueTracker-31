import React, { useState } from 'react'
import styled from 'styled-components'
import WritingArea from '@Component/common/content/WritingArea'
import EventButton from '@Component/common/EventButton'
import { updateComment } from '@Api/comment'
import marked from 'marked'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  xhtml: false,
})

const Comment = ({
  id,
  nickname,
  timePassed,
  contentText,
  owner,
  editable,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [content, setContent] = useState(contentText)
  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const updateAction = async () => {
    if (await updateComment(id, { content })) setIsEdit(!isEdit)
  }

  const validateMarkdown = () => marked(content).replaceAll('<script', '')
  return (
    <CommentWrapper>
      {isEdit ? (
        <WritingArea
          content={[content, setContent]}
          buttons={
            <>
              <EventButton
                onClick={handleEdit}
                buttonName="Cancel"
                isGreen={false}
              />
              <EventButton
                onClick={updateAction}
                buttonName="Update component"
                isGreen={true}
                disabled={!content}
              />
            </>
          }
        />
      ) : (
        <>
          <CommentHeader>
            <HeaderFirst>
              <AuthorNameContainer>{nickname}</AuthorNameContainer>
              <TimePassedContainer>commented {timePassed}</TimePassedContainer>
            </HeaderFirst>
            <HeaderLast>
              {owner && <OwnerContainer>Owner</OwnerContainer>}
              {editable && <EditButton onClick={handleEdit}>Edit</EditButton>}
            </HeaderLast>
          </CommentHeader>
          <CommentBody
            dangerouslySetInnerHTML={{ __html: validateMarkdown() }}
          ></CommentBody>
        </>
      )}
    </CommentWrapper>
  )
}

const CommentWrapper = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
`

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6f8fa;
  padding: 10px;
`
const AuthorNameContainer = styled.span`
  margin-left: 5px;
  margin-right: 10px;
  color: #000000;
  font-weight: bold;
`
const TimePassedContainer = styled.span`
  color: #a9a9a9;
`

const HeaderFirst = styled.div``
const HeaderLast = styled.div`
  color: #dcdcdc;
`
const OwnerContainer = styled.button`
  background-color: transparent;
  color: #586069;
  border: 1px solid #d3d3d3;
  font-weight: 500;
  margin-right: 10px;
  font-size: 12px;
`
const EditButton = styled.button`
  border: none;
  background-color: transparent;
  color: #586069;
  font-weight: 500;
  cursor: pointer;
  font-size: 12px;
`

const CommentBody = styled.div`
  padding: 10px;
  overflow-wrap: anywhere;
  img {
    max-width: 100%;
  }
  h1,
  h2,
  h3 {
    font-size: revert;
  }
`

export default Comment
