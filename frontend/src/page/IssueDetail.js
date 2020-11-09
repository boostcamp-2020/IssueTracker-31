import React, { useState } from 'react'
import IssueDetailHeader from '@Component/IssueDetailPage/IssueDetailHeader'

const IssueDetailPage = () => {
  const [title, setTitle] = useState('issue title')
  return (
    <div>
      <IssueDetailHeader
        issueId={1}
        isOpen={false}
        createdAt={'2020-11-09 00:00:00'}
        nickname={'hyex'}
        commentCnt={3}
        title={title}
        setTitle={setTitle}
      />
    </div>
  )
}

export default IssueDetailPage
