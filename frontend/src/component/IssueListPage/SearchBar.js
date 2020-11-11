import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PopUp from '../common/PopUp'
import { issueListContext } from '@Page/IssueList'
import { getParsedCookie } from '@Util/util'
import { Cookies } from 'react-cookie'
const cookie = new Cookies()
const SearchBar = () => {
  const { users, labels, milestones, conditions, setConditions } = useContext(
    issueListContext,
  )
  const [filteredString, setFilteredString] = useState('')
  const detail = useRef()
  const popup = useRef()
  const popUpData = [
    { id: 1, text: 'your issues', concern: 'author' },
    {
      id: 2,
      text: 'everything assinged to you',
      concern: 'assignee',
    },
  ]

  const initializeCondition = {
    author: [],
    label: [],
    assignee: [],
    milestone: [],
    isOpen: true,
  }

  useEffect(() => {
    setFilteredString(filterConditionToString(conditions))
  }, [conditions])

  const updateCoditions = id => {
    const key = popUpData.find(v => v.id === id).concern
    setConditions({
      ...initializeCondition,
      ...{ [key]: [getParsedCookie('userId')] },
    })
    detail.current.open = false
  }

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
  const handleMouseDown = () => {
    popup.current.focus()
  }

  const closePopUp = () => {
    detail.current.open = false
  }
  const createString = (store, info, selectedCondition, condition) => {
    if (selectedCondition.includes(0)) return `no:${condition} `
    else
      return store
        .filter(target => selectedCondition.includes(target.id))
        .map(filtered => `${condition}:${filtered[info]} `)
        .join('')
  }
  return (
    <StyledSearchBarContainer>
      <StyledDetails
        ref={detail}
        onMouseDown={handleMouseDown}
        onBlur={closePopUp}
      >
        <StyledSummary>
          Filters
          <StyledSpan></StyledSpan>
        </StyledSummary>
        <StyledDetailsMenu ref={popup}>
          <PopUp
            title="Filter issues"
            kind="text"
            data={popUpData}
            targetCondition={[]}
            updateConditions={updateCoditions}
          ></PopUp>
        </StyledDetailsMenu>
      </StyledDetails>
      <StyledInput type="text" readOnly value={filteredString} />
    </StyledSearchBarContainer>
  )
}

const StyledSearchBarContainer = styled.div`
  display: flex;
  margin: 0px;
  flex: 1 0 auto;
  justify-contents: flex-start;
  flex-wrap: nowrap;
  box-sizing: border-box;
  height: 32px;
`

const StyledDetails = styled.details`
  width: 91px;
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

const StyledInput = styled.input`
  width: 50%;
  margin-left: -3px;
  margin-right: 8px;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: 32px;
  color: #586069;
  background-color: #fafbfc;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  outline: none;
`
export default SearchBar
