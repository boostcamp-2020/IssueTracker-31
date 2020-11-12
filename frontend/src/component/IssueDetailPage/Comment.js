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
  display: flex;
  border: 1px solid #dcdcdc;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f8ff;
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
  background-color: #f0f8ff;
  color: #a9a9a9;
  border: 1px solid #d3d3d3;
  font-weight: bold;
  margin-right: 10px;
`
const EditButton = styled.button`
  border: none;
  background-color: #f0f8ff;
  color: #a9a9a9;
  font-weight: bold;
  cursor: pointer;
`

const CommentBody = styled.div`
  padding: 10px;
`

export default Comment
