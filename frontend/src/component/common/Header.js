import React from 'react'
import styled from 'styled-components'
import icon from '@Public/images/headerIcon.png'

const Header = props => {
  const StyledHeader = styled.header`
    width: 100%;
    background-color: #000000;
    text-align: center;
    box-sizing: border-box;
  `
  const StyledImg = styled.img`
    width: 14px;
    height: 14px;
    margin-right: 3px;
    vertical-align: middle;
  `
  const StyledSpan = styled.span`
    display: inline-block;
    padding: 16px 0px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
  `
  return (
    <StyledHeader className="header">
      <StyledSpan>
        <StyledImg src={icon} />
        ISSUES
      </StyledSpan>
    </StyledHeader>
  )
}

export default Header
