import React from 'react'
import ReactDom from 'react-dom'
import IssueListPage from '@Page/IssueList'

const root = document.getElementById('root')
const App = () => {
  return <IssueListPage />
}

ReactDom.render(<IssueListPage />, root)
