import React, { useRef } from 'react'
import styled from 'styled-components'
import { debounce } from 'lodash'

const SpeechBubble = () => {
  const [content, setContent] = React.useState({
    title: '',
    comment: '',
    commentImage: '',
  })

  const handleTitleChange = event => {
    setContent({ ...content, [event.target.name]: event.target.value })
  }

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
    setContent({ ...content, [event.target.name]: event.target.value })
    debouncedHandleChange(event.target.value)
  }

  const handleSubmit = async () => {}

  const handleCancel = event => {}

  const handleImageUpload = () => {}

  const handleImageOnclick = event => {
    document.getElementById('img-file').click()
  }

  return (
    <FormWrapper>
      <TitleInputContainer
        type="text"
        name="title"
        value={content.title}
        onChange={handleTitleChange}
        placeholder="Title"
        required
      />
      <CommentInputContainer
        name="comment"
        value={content.comment}
        onChange={handleCommentChange}
        placeholder="Leave a comment"
        required
      />
      <CountingContainer id="count">0 characters</CountingContainer>
      <FileContainer>
        <FileInputContainer
          id="img-file"
          type="file"
          name="commentImage"
          accept={'image/png, image/jpeg, image/jpg'}
          onChange={handleImageUpload}
        />
        <ClickButton onClick={handleImageOnclick}>
          Attach files by selecting here
        </ClickButton>
      </FileContainer>
      <SubmitContainer>
        <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        <SubmitButton onClick={handleSubmit}>Submit new issue</SubmitButton>
      </SubmitContainer>
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  width: 600px;
  height: 500px;
  border: 1px solid #dcdcdc;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const TitleInputContainer = styled.input`
  box-shadow: 0 1px 3px rgba(0.2, 0.2, 0.2, 0.2), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  height: 30px;
  padding: 5px;
`

const CommentInputContainer = styled.textarea`
  box-shadow: 0 1px 3px rgba(0.2, 0.2, 0.2, 0.2), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: none;
  height: 350px;
  padding: 5px;
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

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #dcdcdc;
  margin-top: -15px;
  padding: 5px;
`

const FileInputContainer = styled.input`
  padding: 0;
  overflow: hidden;
  border: 0;
  display: none;
`

const ClickButton = styled.span`
  cursor: pointer;
  color: #a9a9a9;
  font-size: 15px;
  font-weight: bold;
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

export default SpeechBubble
