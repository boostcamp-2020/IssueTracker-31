import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import PopUp from '../common/PopUp'
import { issueListContext } from '@Page/IssueList'
const SearchBar = () => {
  const { users, labels, milestones, conditions } = useContext(issueListContext)
  const [filteredString, setFilteredString] = useState('')
  const popUpData = [
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

  const filterConditionToString = condition => {
    const keys = Object.keys(condition)
    const result = [
      condition.isOpen ? 'is:open' : 'is:close',
      keys
        .map(key =>
          targetOfConcern[key]
            ? createString(...targetOfConcern[key], condition[key], key)
            : '',
        )
        .join(''),
    ]
    return result.join(' ')
  }

  const targetOfConcern = {
    author: [users, 'nickname'],
    assignee: [users, 'nickname'],
    milestone: [milestones, 'title'],
    label: [labels, 'name'],
  }

  const createString = (store, info, selectedCondition, condition) => {
    if (selectedCondition.includes(0)) return `no:${condition}`
    else
      return store
        .filter(target => selectedCondition.includes(target.id))
        .map(filtered => `${condition}:${filtered[info]} `)
        .join('')
  }
  return (
    <StyledSeacrchBarContainer>
      <details>
        <StyledSummary>
          Filters
          <StyledSpan></StyledSpan>
        </StyledSummary>
        <StyledDetailsMenu>
          <PopUp title="Filter issues" kind="text" data={popUpData}></PopUp>
        </StyledDetailsMenu>
      </details>
      <input type="text" readOnly value={filteredString} />
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
