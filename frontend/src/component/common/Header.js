import React from 'react'
import styled from 'styled-components'
import icon from '@Public/images/headerIcon.png'

const Header = props => {
  return (
    <StyledHeader className="header">
      <Span>
        <Img src={icon} />
        ISSUES
      </Span>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  width: 100%;
  background-color: #000000;
  text-align: center;
  box-sizing: border-box;
`
const Img = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 3px;
  vertical-align: middle;
`
const Span = styled.span`
  display: inline-block;
  padding: 16px 0px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
`

export default Header
