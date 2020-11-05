import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
    <StyledLink
      to={targetLocation}
      backgroundColor={backgroundColor}
      color={color}
    >
      <span>{buttonName}</span>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
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
