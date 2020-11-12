import React from 'react'
import styled from 'styled-components'
import { getContrast } from '@Util/util.js'
const Label = ({ name, color }) => (
  <StyledLabel backgroundColor={color}>{name}</StyledLabel>
)

const StyledLabel = styled.div`
  ${({ backgroundColor }) =>
    `
    background-color: ${backgroundColor};
    color: ${getContrast(backgroundColor)};
  `}
  padding: 0 7px;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  border: 1px solid transparent;
  border-radius: 2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

export default Label
