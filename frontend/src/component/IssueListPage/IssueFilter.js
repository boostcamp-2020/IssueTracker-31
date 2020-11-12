import React, { useContext } from 'react'
import styled from 'styled-components'
import FilterSelector from './FilterSelector'
import { issueListContext } from '@Page/IssueList'

const IssueFilter = ({ checkedIssues, setCheckedIssues, issues }) => {
  const { conditions, setConditions } = useContext(issueListContext)

  const clickInput = e => {
    if (e.target.checked) setCheckedIssues(issues.map(issue => issue.id))
    else setCheckedIssues([])
  }

  const showOpenIssues = () => {
    setConditions({ ...conditions, isOpen: 1 })
  }
  const showCloseIssues = () => {
    setConditions({ ...conditions, isOpen: 0 })
  }

  return (
    <StyledIssueFilterContainer>
      <StyledCheckBox
        type="checkbox"
        onChange={clickInput}
        checked={checkedIssues.length === issues.length && issues.length !== 0}
      ></StyledCheckBox>
      <StyledDefaultModeContainer checkedInput={checkedIssues.length}>
        <StyledSpan isOpen={conditions.isOpen} onClick={showOpenIssues}>
          {' '}
          {issues.filter(value => value.isOpen).length} Open
        </StyledSpan>
        <StyledSpan isOpen={!conditions.isOpen} onClick={showCloseIssues}>
          {' '}
          {issues.filter(value => !value.isOpen).length} Closed
        </StyledSpan>
        <StyledFilterSelectorContainer>
          <FilterSelector type="Author" />
          <FilterSelector type="Label" multiSelect />
          <FilterSelector type="Milestones" />
          <FilterSelector type="Assignee" />
        </StyledFilterSelectorContainer>
      </StyledDefaultModeContainer>
      <StyledCheckedModeContainer
        checkedInput={
          checkedIssues.length !== 0 ||
          (checkedIssues.length === issues.length && issues.length !== 0)
        }
      >
        <StyledSpan>{checkedIssues.length} Selected</StyledSpan>
        <FilterSelector
          type="Mark as"
          checkedIssues={checkedIssues}
          setCheckedIssues={setCheckedIssues}
        />
      </StyledCheckedModeContainer>
    </StyledIssueFilterContainer>
  )
}

const StyledIssueFilterContainer = styled.div`
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  margin: -1px -1px 0;
  padding: 16px;
  background-color: #f6f8fa;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  box-sizing: border-box;
`

const StyledCheckBox = styled.input`
  margin-right: 16px;
  padding: 0;
  background-color: initial;
  cursor: default;
  line-height: 1.5;
`

const StyledFilterSelectorContainer = styled.div`
  display: flex;
  white-space: nowrap;
  justify-content: flex-end;
  flex: auto;
  font-size: 14px;
  line-height: 1.5;
`
const StyledSpan = styled.span`
  display: inline-block;
  margin-right: 10px;
  padding: 0;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
  appearance: none;
  color: ${({ isOpen }) => (isOpen ? '#000000' : '#586069')};
  line-height: 21px;
`
const StyledDefaultModeContainer = styled.div`
  width: 100%;
  display: ${({ checkedInput }) => (checkedInput ? 'none' : 'flex')};
`
const StyledCheckedModeContainer = styled.div`
  width: 100%;
  display: ${({ checkedInput }) => (checkedInput ? 'flex' : 'none')};
  justify-content: space-between;
`
export default IssueFilter
