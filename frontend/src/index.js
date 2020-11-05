import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import IssueListPage from '@Page/IssueList'
import MilestonePage from '@Page/Milestone'
import Login from '@Page/Login'
import LabelPage from '@Page/Label/Label'
import Header from './component/common/Header'
const root = document.getElementById('root')
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={IssueListPage} />
      <Route exact path="/labels" component={LabelPage} />
      <Route exact path="/milestones" component={MilestonePage} />
    </BrowserRouter>
  )
}
ReactDom.render(<App />, root)
