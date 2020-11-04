import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const LinkButton = ({ page }) => {
  return (
    <StyledNav>
      <Button name={'Labels'} selected={page === 'labels'} />
      <Button name={'Milestones'} selected={page === 'milestones'} />
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex !important;
  white-space: nowrap !important;
  float: left;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
`

export default LinkButton
