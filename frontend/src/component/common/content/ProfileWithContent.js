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
  border: 1px solid #d1d5da;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-radius: 6px;
`

const ContentWrapper = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
`
const ProfileContainer = styled.div`
  width: 40px;
  height: 40px;
`

const ProfileImage = styled.img`
  border-radius: 5px;
  width: 40px;
  height: 40px;
`

export default ProfileWithContent
