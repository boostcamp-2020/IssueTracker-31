import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Login from '@Page/Login'
import IssueListPage from '@Page/IssueList'
import LabelPage from '@Page/Label/Label'
import MilestonePage from '@Page/Milestone/Milestone'
import Header from './component/common/Header'
import CreateIssuePage from '@Page/CreateIssue'
import IssueDetailPage from '@Page/IssueDetail'
import CreateMilestonePage from '@Page/CreateMilestone'

const root = document.getElementById('root')

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={IssueListPage} />
        <Route exact path="/labels" component={LabelPage} />
        <Route exact path="/milestones" component={MilestonePage} />
        <Route exact path="/milestone/new" component={CreateMilestonePage} />
        <Route exact path="/issue/new" component={CreateIssuePage} />
        <Route exact path="/issues/:id" component={IssueDetailPage} />
      </BrowserRouter>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-size: 14px;
    line-height: 1.5;
  }
	body {
    padding: 0px;
    margin: 0px;
    height: 100%;
    width: 100%;
	}
`

ReactDom.render(<App />, root)
