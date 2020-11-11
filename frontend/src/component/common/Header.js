import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import icon from '@Public/images/headerIcon.png'

const Header = props => {
  return (
    <StyledHeader className="header">
      <StyledLink to="/">
        <Img src={icon} />
        ISSUES
      </StyledLink>
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
  width: 18px;
  height: 18px;
  margin-right: 3px;
  vertical-align: middle;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  padding: 16px 0px;
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`

export default Header
