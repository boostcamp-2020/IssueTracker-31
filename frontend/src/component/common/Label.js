import React from 'react'
import styled from 'styled-components'
const Label = ({ name, backgroundColor }) => (
  <StyledLabel backgroundColor={backgroundColor}>{name}</StyledLabel>
)

const getContrast = hexColor => {
  if (hexColor.startsWith('#')) hexColor = hexColor.slice(1)
  if (hexColor.length === 3)
    hexColor = hexColor
      .split('')
      .map(hex => hex + hex)
      .join('')
  return getContrastFromRGB(...hexToRGB(hexColor)) >= 128 ? 'black' : 'white'
}

const getContrastFromRGB = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000

const hexToRGB = hexColor => [
  parseInt(hexColor.slice(0, 2), 16),
  parseInt(hexColor.slice(2, 4), 16),
  parseInt(hexColor.slice(4, 6), 16),
]

const StyledLabel = styled.div`
  ${({ backgroundColor }) =>
    `
    background-color: ${backgroundColor};
    color: ${getContrast(backgroundColor.slice(1))};
  `}
  padding: 0 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  border: 1px solid transparent;
  border-radius: 2em;
  display: inline-block;
`

export default Label
