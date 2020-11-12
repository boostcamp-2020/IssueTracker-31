import React from 'react'
import styled from 'styled-components'
import { getParsedCookie } from '../../../util/util'

const ProfileWithContent = ({ formContent, profileUrl }) => {
  return (
    <ContentWrapper>
      <ProfileContainer>
        <ProfileImage
          src={profileUrl ? profileUrl : getParsedCookie('profileUrl')}
          alt=""
        />
      </ProfileContainer>
      <FormWrapper>{formContent}</FormWrapper>
    </ContentWrapper>
  )
}

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #dcdcdc;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const ContentWrapper = styled.div`
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
