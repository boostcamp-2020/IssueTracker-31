import React from 'react'
import styled from 'styled-components'

const Header = props => {
  const StyledHeader = styled.header`
    width: 100%;
    background-color: #000000;
    text-align: center;
    box-sizing: border-box;
  `

  const StyledSpan = styled.span`
    display: inline-block;
    padding: 16px 0px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
  `
  return (
        {/* issue icon */}
    <StyledHeader className="header">
      <StyledSpan>
        ISSUES
      </StyledSpan>
    </StyledHeader>
  )
}

export default Header
