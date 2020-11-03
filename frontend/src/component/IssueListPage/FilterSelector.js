import React, { useContext } from 'react'
import styled from 'styled-components'
import PopUp from '@Component/common/PopUp'
import { issueListContext } from '@Page/IssueList'

const FilterSelector = ({ type, multiSelect = false }) => {
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
          data={popupProps.data ? popupProps.data : []}
          multiSelect={multiSelect}
        ></PopUp>
      </StyledDetailsMenu>
    </StyledDetail>
  )
}

const getPopUpProps = type => {
  const data = useContext(issueListContext)

  switch (type) {
    case 'Author':
      return { title: 'Filter by author', kind: 'user', data: data.users }
    case 'Label':
      return { title: 'Filter by label', kind: 'label', data: data.labels }
    case 'Milestones':
      return {
        title: 'Filter by milestone',
        kind: 'milestone',
        data: data.milestones,
      }
    case 'Assignee':
      return {
        title: "Filter by who' assigned",
        kind: 'user',
        data: data.users,
      }
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
