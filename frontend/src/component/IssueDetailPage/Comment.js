import React, { useState } from 'react'
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
    <div>
      {isEdit ? (
        ''
      ) : (
        <>
          <div>
            {title}
            <button onClick={handleEdit}>edit</button>
          </div>
          <div>{content}</div>
        </>
      )}
    </div>
  )
}

export default Comment
