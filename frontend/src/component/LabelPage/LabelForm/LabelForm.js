import React, { useState, useReducer } from 'react'
import Label from '@Component/common/Label'
import styled from 'styled-components'
import RefreshIcon from '@Public/js/RefreshIcon'
import { getContrast, verifyTextLength } from '@Util/util'

const generateRandomColor = () => `#${Math.random().toString(16).slice(-6)}`

const initialLabelState = ({ id, name, color, description }) => {
  if (id)
    return {
      name,
      color,
      description,
    }
  return {
    name: '',
    color: generateRandomColor(),
    description: '',
  }
}
const labelReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.name }

    case 'RESET_COLOR':
      return { ...state, color: generateRandomColor() }

    case 'CHANGE_COLOR':
      return { ...state, color: action.color }

    case 'CHANGE_DESCRIPTION':
      return { ...state, description: action.description }

    default: {
      throw new Error(`unexprected action type: ${action.type}`)
    }
  }
}

const LabelForm = props => {
  const [label, dispatchLabel] = useReducer(
    labelReducer,
    initialLabelState(props),
  )

  const resetColor = e => dispatchLabel({ type: 'RESET_COLOR' })

  const handleName = e => {
    if (verifyTextLength(e.target.value, 45))
      dispatchLabel({ type: 'CHANGE_NAME', name: e.target.value })
  }

  const handleDescription = e => {
    if (verifyTextLength(e.target.value, 45))
      dispatchLabel({ type: 'CHANGE_DESCRIPTION', description: e.target.value })
  }

  const handleColor = e => {
    if (e.target.value.match('^#[0-9a-f]*$'))
      dispatchLabel({ type: 'CHANGE_COLOR', color: e.target.value })
  }

  return (
    <StyledLabelFormContainer>
      <StyledHeader>
        <Label
          name={label.name ? label.name : 'Label preview'}
          color={label.color}
          description={label.description}
        />
        {props.id ? <div>delete</div> : ''}
      </StyledHeader>
      <StyledForm>
        <dl>
          <StyledDt>Label name</StyledDt>
          <StyledDd>
            <input
              type="text"
              onChange={handleName}
              value={label.name ? label.name : ''}
              placeholder="Label name"
            />
          </StyledDd>
        </dl>
        <dl>
          <StyledDt>Description</StyledDt>
          <StyledDd>
            <input
              type="text"
              onChange={handleDescription}
              value={label.description}
              placeholder="Description (optional)"
            />
          </StyledDd>
        </dl>
        <dl>
          <StyledDt>Color</StyledDt>
          <StyledDd>
            <StyledButton backgroundColor={label.color} onClick={resetColor}>
              <RefreshIcon color={getContrast(label.color)} />
            </StyledButton>
            <input
              onChange={handleColor}
              value={label.color}
              maxLength={7}
              pattern="[0-9a-f]"
            ></input>
          </StyledDd>
        </dl>
      </StyledForm>
    </StyledLabelFormContainer>
  )
}

const StyledLabelFormContainer = styled.div`
  /* background-color: gray; */
`
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`
const StyledForm = styled.div`
  width: 100%;
  display: flex;
`
const StyledDt = styled.dt`
  font-size: 14px;
  font-weight: 600;
`
const StyledButton = styled.button`
  ${({ backgroundColor }) =>
    `
    background-color: ${backgroundColor};
    border: 1px solid ${backgroundColor};
  `}
  :focus {
    box-shadow: none;
    outline: none;
  }
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  user-select: none;
  align-content: center;
  width: 34px;
  height: 31px;
  flex-shrink: 0;
  box-sizing: border-box;
`
const StyledDd = styled.dd`
  display: flex;
  margin-left: 0;
`
export default LabelForm
