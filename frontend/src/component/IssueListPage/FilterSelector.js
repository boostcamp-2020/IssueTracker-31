import React, { useContext } from 'react'
import styled from 'styled-components'
import PopUp from '@Component/common/PopUp'
import { issueListContext } from '@Page/IssueList'

const FilterSelector = ({ type, multiSelect = false }) => {
  const context = useContext(issueListContext)
  const popupProps = getPopUpProps(type, context)

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

const getPopUpProps = (type, context) => {
  switch (type) {
    case 'Author':
      return { title: 'Filter by author', kind: 'author', data: context.users }
    case 'Label':
      return {
        title: 'Filter by label',
        kind: 'label',
        data: [{ id: 0, name: 'Unlabeled' }, ...context.labels],
      }
    case 'Milestones':
      return {
        title: 'Filter by milestone',
        kind: 'milestone',
        data: [
          { id: 0, title: 'Issues with no milestone' },
          ...context.milestones,
        ],
      }
    case 'Assignee':
      return {
        title: 'Filter by who` assigned',
        kind: 'assignee',
        data: context.users, // [{ id: 0, nickname: 'Assigned to nobody' }, ...context.users], // error no user data
      }
    case 'Projects':
      return { title: 'Filter by project' }
    case 'Sort':
      return { title: 'Sort by' }
    case 'Mark as':
      return {
        title: 'Action',
        kind: 'markAs',
        data: [
          { id: 1, text: 'Open' },
          { id: 2, text: 'Closed' },
        ],
      }
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
  font-size: 14px;
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
