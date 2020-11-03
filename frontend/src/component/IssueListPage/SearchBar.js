import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import PopUp from '../common/PopUp'
import { issueListContext } from '@Page/IssueList'
const SearchBar = props => {
  const { users, labels, milestones, conditions } = useContext(issueListContext)
  const [filteredString, setFilteredString] = useState('')
  const popupData = [
    {
      id: 1,
      text: 'open issues and pull reuests',
    },
    { id: 2, text: 'your issues' },
    { id: 3, text: 'your pull requests' },
    { id: 4, text: 'everything assinged to you' },
    { id: 5, text: 'everything mentioning to you' },
  ]
  useEffect(() => {
    setFilteredString(filterConditionToString(conditions))
  }, [conditions])
  const filterConditionToString = ({
    author,
    label,
    assignee,
    milestone,
    isOpen,
  }) => {
    const result = []
    if (author.length && users.length) {
      result.push(
        `author:${users.filter(user => user.id === author[0].id).name}`,
      )
    }
    if (label.length && labels.length) {
      if (label[0] === 0) {
        result.push(`no:label`)
      } else {
        result.push(
          label
            .map(
              id =>
                `label:${labels
                  .filter(target => target.id === id)
                  .map(label => label.name)
                  .join(' ')}`,
            )
            .join(' '),
        )
      }
    }
    if (assignee.length && users.length) {
      if (assignee[0] === 0) result.push(`no:assignee`)
      else
        result.push(
          assignee
            .map(
              id =>
                `assignee:${users.filter(target => target.id === id).nickname}`,
            )
            .join(''),
        )
    }
    if (milestone.length && milestones.length)
      if (milestone[0] === 0) result.push(`no:milestone`)
      else {
        const [item] = milestones.filter(item => item.id === milestone[0])
        result.push(`milestone:${item.title}`)
      }
    if (isOpen) result.push(`is:open`)
    else result.push(`is:close`)
    return result.join(' ')
  }
  return (
    <StyledSeacrchBarContainer>
      <details>
        <StyledSummary>
          Filters
          <StyledSpan></StyledSpan>
        </StyledSummary>
        <StyledDetailsMenu>
          <PopUp title="Filter issues" kind="text" data={popupData}></PopUp>
        </StyledDetailsMenu>
      </details>
      <input type="text" readOnly value={filteredString}>
        {}
      </input>
    </StyledSeacrchBarContainer>
  )
}

const StyledSeacrchBarContainer = styled.div`
  display: flex;
  margin: 0px;
  width: 100%;
  flex: auto;
  justify-contents: flex-start;
  box-sizing: border-box;
`

const StyledSummary = styled.summary`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &::-webkit-details-marker {
    display: none;
  }
  outline: none;
  box-shadow: none;
  cursor: pointer;
  background-color: #fafbfc;
  padding: 5px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  vertical-align: middle;
  border: 1px solid #d9dbdb;
  border-radius: 6px;
  appearance: none;
`
const StyledSpan = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: '';
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
  margin-left: 4px;
  opacity: 0.8;
`
const StyledDetailsMenu = styled.div`
  position: absolute;
  top: auto;
  right: auto;
  bottom: auto;
  left: 0;
  padding: 0;
`
export default SearchBar
