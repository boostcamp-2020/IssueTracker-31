import React, { useRef } from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'
import ImageInput from '@Component/common/ImageInput'
import EventButton from '@Component/common/EventButton'

const WritingArea = ({ props }) => {
  const {
    content: [content, setContent],
    submitAction,
    cancelAction,
    title: [title],
  } = props

  const handleDebounce = v => {
    document.getElementById('count').innerText = `${v.length} characters`
    setTimeout(v => {
      document.getElementById('count').style.opacity = 0
    }, 2000)
  }

  const debouncedHandleChange = useRef(debounce(v => handleDebounce(v), 2000))
    .current

  const handleCommentChange = event => {
    document.getElementById('count').style.opacity = 1
    setContent(event.target.value)
    debouncedHandleChange(event.target.value)
  }

  // event 정의 필요

  const handleImageUpload = () => {}

  return (
    <Wrapper>
      <CommentInputContainer
        name="comment"
        value={content}
        onChange={handleCommentChange}
        placeholder="Leave a comment"
        required
      />
      <CountingContainer id="count">0 characters</CountingContainer>
      <ImageInput />
      <SubmitContainer>
        <EventButton
          onClick={cancelAction}
          buttonName="Cancel"
          isGreen={false}
        />
        <EventButton
          onClick={submitAction}
          buttonName="Submit New Issue"
          isGreen={true}
          disabled={!title}
        />
      </SubmitContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid red;
`

const CommentInputContainer = styled.textarea`
  box-shadow: 0 1px 3px rgba(0.2, 0.2, 0.2, 0.2), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  height: 350px;
  padding: 5px;
  width: 100%;
`

const CountingContainer = styled.span`
  position: absolute;
  bottom: 105px;
  right: 12px;
  width: 95px;
  height: 15px;
  color: #a9a9a9;
  font-size: 13px;
  opacity: 0;
`

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CancelButton = styled.div`
  width: 60px;
  padding: 10px;
  height: 20px;
  cursor: pointer;
  background-color: #ffffff;
  color: #808080;
  font-weight: 500;
  text-align: center;
`

const SubmitButton = styled.div`
  width: 120px;
  padding: 10px;
  height: 20px;
  cursor: pointer;
  background-color: #2ea44f;
  color: #ffffff;
  font-weight: 550;
  text-align: center;
`

export default WritingArea
