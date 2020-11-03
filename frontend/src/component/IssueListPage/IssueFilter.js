import React from 'react'
import styled from 'styled-components'
import FilterSelector from './FilterSelector'

const IssueFilter = () => {
  return (
    <StyledIssueFilterContainer>
      <StyledCheckBox type="checkbox"></StyledCheckBox>
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

export default IssueFilter
