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

  &:before {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 40px;
    border-width: 20px 20px 0;
    border-style: solid;
    border-color: #e1e4e8 transparent;
    display: block;
    width: 0;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -13px;
    left: 47px;
    border-width: 13px 13px 0;
    border-style: solid;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
  }
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
