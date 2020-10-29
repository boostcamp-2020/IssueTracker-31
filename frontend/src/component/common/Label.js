import React from 'react'
import styled from 'styled-components'

const Label = ({ name, color, backgroundColor }) => {
  return (
    <LabelWrapper color={color} backgroundColor={backgroundColor}>
      {name}
    </LabelWrapper>
  )
}

const LabelWrapper = styled.div`
  ${({ backgroundColor, color = 'black' }) =>
    `
    background-color: ${backgroundColor};
    color: ${color};
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
