import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import PopUp from '../common/PopUp'
import { issueListContext } from '@Page/IssueList'
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
    const nickname = document.cookie
      .split('; ')
      .find(row => row.startsWith('nickname'))
      .split('=')[1]

    setConditions({
      ...initializeCondition,
      ...{ [key]: [nickname] },
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
    <StyledSeacrchBarContainer>
      <details ref={detail} onMouseDown={handleMouseDown} onBlur={closePopUp}>
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
  z-
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
