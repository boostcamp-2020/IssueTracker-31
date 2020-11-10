import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Button = ({ buttonProps }) => {
  const { targetLocation } = buttonProps
  if (targetLocation) return <LinkTypeButton buttonProps={buttonProps} />
  else return <EventTypeButton buttonProps={buttonProps} />
}

const LinkTypeButton = ({ buttonProps }) => {
  const { svg, buttonName, count, targetLocation, style } = buttonProps
  return (
    <StyledDiv
      backgroundColor={style.backgroundColor}
      color={style.color}
      hoverColor={style.hoverColor}
      borderRadius={style.borderRadius}
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
    >
      <StyledLink to={targetLocation}>
        {svg ? svg : ''}
        <span>{buttonName}</span>
        {count !== undefined ? <StyledCount>{count}</StyledCount> : ''}
      </StyledLink>
    </StyledDiv>
  )
}

const EventTypeButton = ({ buttonProps }) => {
  const { svg, buttonName, style, onClick } = buttonProps
  return (
    <StyledDiv
      onClick={onClick}
      backgroundColor={style.backgroundColor}
      color={style.color}
      hoverColor={style.hoverColor}
      borderRadius={style.borderRadius}
      fontSize={style.fontSize}
      fontWeight={style.fontWeight}
      overrideStyle={style.overrideStyle}
    >
      {svg ? svg : ''}
      <span>{buttonName}</span>
    </StyledDiv>
  )
}

const StyledDiv = styled.button`
  ${({
    backgroundColor = '#2ea44f',
    color = '#ffffff',
    hoverColor = '#3ea85f',
    borderRadius = '6px',
    fontSize = '14px',
    fontWeight = '550',
    overrideStyle,
  }) =>
    `
    color: ${color};
    background: ${backgroundColor};
    text-decoration : none;
    cursor: pointer;
    border-radius: ${borderRadius};
    padding: 5px 12px;
    border: 1px solid rgba(27,31,35,0.15);
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    width: auto;
    line-height: 20px;
    box-sizing: border-box;
    :focus {
      box-shadow: none;
      outline: none;
    }
    &:hover {
      background-color: ${hoverColor};
    }
    ${overrideStyle}
    `}
`
const StyledLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
  color: inherit;
`

const StyledCount = styled.span`
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

export default Button
