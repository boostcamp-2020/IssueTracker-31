import React from 'react'
import ProfileWithContent from '@Component/common/ProfileWithContent'
import SpeechBubble from '@Component/common/SpeechBubble'
import Sidebar from '@Component/common/Sidebar'

const NewIssuePage = () => {
  return (
    <>
      <ProfileWithContent>
        <SpeechBubble />
      </ProfileWithContent>
      <Sidebar />
    </>
  )
}

export default NewIssuePage
