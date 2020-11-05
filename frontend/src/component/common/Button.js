import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { issueListContext } from '@Page/IssueList'

const Button = ({
  buttonName,
  targetLocation,
  backgroundColor,
  color,
  onClick,
}) => {
  if (!targetLocation)
    return (
      <StyledDiv onClick={onClick}>
        <span>{buttonName}</span>
      </StyledDiv>
    )
  return (
    <StyledLink to={to} styles={style}>
      {symbol ? <Symbol svg={symbol} selected={selected} /> : ''}
      <span>{name}</span>
      {count !== undefined ? <StyledSpan>{count}</StyledSpan> : ''}
    </StyledLink>
  )
}

const Symbol = ({ svg, selected }) => (
  <StyledSvg viewBox="0 0 16 16" width="16" height="16" selected={selected}>
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
    ${!styles.selected
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

const StyledDiv = styled.div`
  ${({ backgroundColor = '#2ea44f', color = '#ffffff' }) =>
    `
    color: ${color};
    background: ${backgroundColor};
    text-decoration : none;
    cursor: pointer;
    padding: 5px 16px;
    border: 1px solid rgba(27,31,35,0.15);
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
`}
`

export default Button
