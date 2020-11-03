import React from 'react'
import styled from 'styled-components'
import PopUp from '@Component/common/PopUp'

const FilterSelector = ({ type }) => {
  const popupProps = getPopUpProps(type)
  if (!popupProps) return false

  return (
    <StyledDetail>
      <StyledSummary>
        {type}
        <StyledSpan></StyledSpan>
      </StyledSummary>
      <StyledDetailsMenu>
        <PopUp
          title={popupProps.title}
          kind={popupProps.kind}
          data={[]}
        ></PopUp>
      </StyledDetailsMenu>
    </StyledDetail>
  )
}

const getPopUpProps = type => {
  switch (type) {
    case 'Author':
      return { title: 'Filter by author', kind: 'user' }
    case 'Label':
      return { title: 'Filter by label', kind: 'label' }
    case 'Milestones':
      return { title: 'Filter by milestone', kind: 'milestone' }
    case 'Assignee':
      return { title: "Filter by who' assigned", kind: 'user' }
    case 'Projects':
      return { title: 'Filter by project' }
    case 'Sort':
      return { title: 'Sort by' }
    default:
      return false
  }
}

const StyledDetail = styled.details`
  position: relative;
  display: inline-block;
  padding: 0px 16px;
  appearance: none;
`

const StyledSummary = styled.summary`
  display: inline-block;
  white-space: nowrap;
  padding: 0;
  color: #586069;
  list-style: none;
  font-size: inherit;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
  appearance: none;
  outline: none;
  box-shadow: none;
  &::-webkit-details-marker {
    display: none;
  }
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
`

const StyledDetailsMenu = styled.div`
  position: absolute;
  top: auto;
  right: 0;
  bottom: auto;
  left: auto;
  padding: 0;
`

export default FilterSelector
