import React, { useState } from 'react'
import styled from 'styled-components'
import SpeechBubble from '@Component/common/SpeechBubble'
import Request from '../../util/request'

const ProfileWithContent = props => {
  const [profileImage, setProfileImage] = useState('')

  const getProfileImage = async () => {
    const userId = 8 // 클라이언트에서 쿠키 값을 추출하지 못해 임시로 넣어놓은 값입니다.
    try {
      const { data } = await Request.GET('/users')
      for (let elem of data) {
        if (elem.id === userId) setProfileImage(elem.profileUrl)
      }
    } catch (err) {
      console.log(err)
    }
  }

  getProfileImage()

  return (
    <ContentWrapper>
      <ProfileContainer>
        <ProfileImage src={profileImage} alt="" />
      </ProfileContainer>
      <SpeechBubble />
    </ContentWrapper>
  )
}

const ContentWrapper = styled.div`
  width: 650px;
  height: 550px;
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
