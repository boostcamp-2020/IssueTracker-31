import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { issueListContext } from '@Page/IssueList'

const Button = ({ name, selected }) => {
  const context = useContext(issueListContext)

  const { style, to, count, symbol } = getButtonProps(name, context, selected)
  return (
    <StyledLink to={to} styles={style}>
      {symbol ? <Symbol svg={symbol} /> : ''}
      <span>{name}</span>
      {count !== undefined ? <StyledSpan>{count}</StyledSpan> : ''}
    </StyledLink>
  )
}

const Symbol = ({ svg }) => (
  <StyledSvg viewBox="0 0 16 16" width="16" height="16">
    <path fill-rule="evenodd" d={svg}></path>
  </StyledSvg>
)

const StyledLink = styled(Link)`
  ${({ styles }) => `
    color: ${styles.color};
    background: ${styles.backgroundColor};
    text-decoration : none;
    cursor: pointer;
    border: 1px solid #e1e4e8;
    border-radius: ${styles.borderRadius};
    position: relative;
    float: left;
    padding: 5px 16px;
    font-weight: 500;
    line-height: 20px;
    box-sizing: border-box;
    white-space: nowrap!important;
    ${
      !styles.selected
        ? `&:hover {
      background-color: ${styles.hoverColor};`
        : ''
    }
    `}
`

const StyledSpan = styled.span`
  min-width: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #24292e;
  text-align: center;
  background-color: #ededed;
  border: 1px solid transparent;
  border-radius: 2em;
  display: inline !important;
  box-sizing: border-box;
  margin-left: 4px;
`

const StyledSvg = styled.svg`
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  transform-origin: 0px 0px;
  vertical-align: text-bottom;
  overflow: hidden;
  margin-right: 7px;
`

const getButtonProps = (name, context, selected) => {
  const props = {
    style: {
      color: '#ffffff',
      backgroundColor: '#2ea44f',
      borderRadius: '6px',
      selected,
    },
  }

  switch (name) {
    case 'New Issue':
      props.to = '/new'
      break

    case 'Labels':
      props.style.color = '#24292e'
      props.style.borderRadius = '6px 0px 0px 6px'
      props.style.backgroundColor = '#ffffff'
      props.style.hoverColor = '#e1e4e8'
      props.to = '/labels'
      props.count = context.labels.length
      props.symbol =
        'M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z'
      break

    case 'Milestones':
      props.style.color = '#24292e'
      props.style.borderRadius = '0px 6px 6px 0px'
      props.style.backgroundColor = '#ffffff'
      props.style.hoverColor = '#e1e4e8'
      props.to = '/milestones'
      props.count = context.milestones.filter(m => m.isOpen).length
      props.symbol =
        'M 7.75 0 a 0.75 0.75 0 0 1 0.75 0.75 V 3 h 3.634 c 0.414 0 0.814 0.147 1.13 0.414 l 2.07 1.75 a 1.75 1.75 0 0 1 0 2.672 l -2.07 1.75 a 1.75 1.75 0 0 1 -1.13 0.414 H 8.5 v 5.25 a 0.75 0.75 0 1 1 -1.5 0 V 10 H 2.75 A 1.75 1.75 0 0 1 1 8.25 v -3.5 C 1 3.784 1.784 3 2.75 3 H 7 V 0.75 A 0.75 0.75 0 0 1 7.75 0 Z m 0 8.5 h 4.384 a 0.25 0.25 0 0 0 0.161 -0.06 l 2.07 -1.75 a 0.25 0.25 0 0 0 0 -0.38 l -2.07 -1.75 a 0.25 0.25 0 0 0 -0.161 -0.06 H 2.75 a 0.25 0.25 0 0 0 -0.25 0.25 v 3.5 c 0 0.138 0.112 0.25 0.25 0.25 h 5 Z'
      break

    default:
      break
  }

  return props
}

export default Button
