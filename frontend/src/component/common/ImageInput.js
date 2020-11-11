import React, { useState } from 'react'
import styled from 'styled-components'
import { createImageUrl } from '@Api/comment'

const ImageInput = () => {
  const [status, setStatus] = useState('default')

  const getImageUrl = async e => {
    setStatus('loading')
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    const { success, url } = await createImageUrl(formData)
    if (!success) return setStatus('error')
    console.log(url) // TODO: 상위 컴포넌트로 넘겨서 마크다운 문법 텍스트로 변환하기
    setStatus('default')
  }
  return (
    <StyledWrapper>
      <StyledInput
        type="file"
        accept=".jpeg,.png,.jpg"
        onChange={getImageUrl}
      ></StyledInput>
      <StyledText status={status === 'default'}>
        Attach files by dragging & dropping, selecting or pasting them.
      </StyledText>
      <StyledText status={status === 'loading'}>
        <img
          alt=""
          width="16"
          height="16"
          src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif"
        />
        <StyledSpan>Loading</StyledSpan>
      </StyledText>
      <StyledText status={status === 'error'}>Error</StyledText>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  position: relative;
  margin: 0;
  padding: 5px;
  border: 1px solid #e1e4e8;
  border-top: 0;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  box-sizing: border-box;
  margin-top: -13px;
`
const StyledInput = styled.input`
  width: 100%;
  min-height: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.01;
  margin-left: 0;
  cursor: pointer;
  box-sizing: border-box;
`
const StyledText = styled.span`
  height: 100%;
  width: 100%;
  display: ${({ status }) => (status ? 'flex' : 'none')};
  align-items: center;
  box-sizing: border-box;
  font-size: 13px;
  line-height: 16px;
  color: #586069;
  pointer-events: none;
  font-weight: 400;
  padding-right: 8px;
  vertical-align: top;
`
const StyledSpan = styled.span`
  margin: 0px 5px;
`
export default ImageInput
