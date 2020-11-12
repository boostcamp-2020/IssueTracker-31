import React, { useState } from 'react'
import styled from 'styled-components'
import WritingArea from '@Component/common/content/WritingArea'

const Comment = props => {
  const {
    title: [title, setTitle],
    content: [content, setContent],
  } = props

  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  return (
    <CommentWrapper>
      {isEdit ? (
        <WritingArea props={props} />
      ) : (
        <>
          <div>
            {title}
            <button onClick={handleEdit}>edit</button>
          </div>
          <div>{content}</div>
        </>
      )}
    </CommentWrapper>
  )
}

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e0ffff;
`

const CommentBody = styled.div``
