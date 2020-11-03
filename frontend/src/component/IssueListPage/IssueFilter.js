import React, { useContext } from 'react'
import styled from 'styled-components'
import FilterSelector from './FilterSelector'
import { issueListContext } from '@Page/IssueList'

const IssueFilter = () => {
  const { issues, conditions } = useContext(issueListContext)
  return (
    <StyledIssueFilterContainer>
      <StyledCheckBox type="checkbox"></StyledCheckBox>
      <StyledSpan isOpen={conditions.isOpen}>
        {' '}
        {issues.filter(value => value.isOpen).length} Open
      </StyledSpan>
      <StyledSpan isOpen={!conditions.isOpen}>
        {' '}
        {issues.filter(value => !value.isOpen).length} Closed
      </StyledSpan>
      <StyledFilterSelectorContainer>
        <FilterSelector type="Author" />
        <FilterSelector type="Label" multiSelect />
        <FilterSelector type="Projects" />
        <FilterSelector type="Milestones" />
        <FilterSelector type="Assignee" />
        <FilterSelector type="Sort" />
      </StyledFilterSelectorContainer>
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

export default IssueFilter
