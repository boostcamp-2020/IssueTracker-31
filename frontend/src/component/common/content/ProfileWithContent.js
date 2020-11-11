import React from 'react'
import styled from 'styled-components'
import WritingArea from '@Component/common/content/WritingArea'
import { getParsedCookie } from '../../../util/util'

const ProfileWithContent = props => {
  const {
    title: [title, setTitle],
  } = props

  const profileUrl = getParsedCookie('profileUrl')

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  return (
    <ContentWrapper>
      <ProfileContainer>
        <ProfileImage src={profileUrl} alt="" />
      </ProfileContainer>
      <FormWrapper>
        {props.page === 'createIssue' ? (
          <TitleInputContainer
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
            required
          />
        ) : (
          ''
        )}
        <WritingArea props={props} />
      </FormWrapper>
    </ContentWrapper>
  )
}

const FormWrapper = styled.div`
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

const ContentWrapper = styled.div`
  width: 650px;
  height: 600px;
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: row;
`
const ProfileContainer = styled.div`
  width: 40px;
  height: 40px;
`

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
`

export default ProfileWithContent
