import React from 'react'
import styled from 'styled-components'
import FilterSelector from './FilterSelector'

const IssueFilter = props => {
  return (
    <StyledIssueFilterContainer>
      <StyledCheckBox type="checkbox"></StyledCheckBox>
      <FilterSelector type="author" />
      <FilterSelector type="label" />
      <FilterSelector type="project" />
      <FilterSelector type="milestone" />
      <FilterSelector type="assignee" />
      <FilterSelector type="sort" />
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
`

const StyledCheckBox = styled.input`
  margin-right: 16px;
  padding: 0;
  background-color: initial;
  cursor: default;
  line-height: 1.5;
`

export default IssueFilter
