import React, { useState } from 'react'
import styled from 'styled-components'
import WritingArea from '@Component/common/content/WritingArea'
import { getTimePassedFromNow } from '@Util/util'

const Comment = props => {
  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const CancelAction = () => {}

  const UpdateAction = () => {}

  return (
    <CommentWrapper>
      {isEdit ? (
        ''
      ) : (
        <>
          <CommentHeader>
            <HeaderFirst>
              <AuthorNameContainer>zzunopark</AuthorNameContainer>
              <TimePassedContainer>commented 3 days ago</TimePassedContainer>
            </HeaderFirst>
            <HeaderLast>
              <OwnerContainer>Owner</OwnerContainer>
              <EditButton onClick={handleEdit}>Edit</EditButton>
            </HeaderLast>
          </CommentHeader>
          <CommentBody>테스트 테스트 테스트 테스트 테스트</CommentBody>
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
`

const CommentBody = styled.div`
  padding: 10px;
`

export default Comment
