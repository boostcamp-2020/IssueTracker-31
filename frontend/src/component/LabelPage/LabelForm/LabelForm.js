import React, { useContext, useReducer } from 'react'
import Label from '@Component/common/Label'
import styled from 'styled-components'
import RefreshIcon from '@Public/js/RefreshIcon'
import { getContrast, verifyTextLength } from '@Util/util'
import EventButton from '@Component/common/EventButton'
import { createLabel, updateLabel, deleteLabel } from '@Api/label'
import { labelContext } from '@Page/Label/Label'

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
  const { setLabels, labels } = useContext(labelContext)

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

  const handleCreateButton = async () => {
    const id = await createLabel(label)
    if (id) {
      setLabels([...labels, { id, ...label }])
      props.toggleComponent()
    }
  }

  const handleEditButton = async () => {
    if (await updateLabel({ id: props.id, params: label })) {
      setLabels(
        labels.map(origin => {
          if (origin.id === props.id) return { ...origin, ...label }
          else return origin
        }),
      )
      props.toggleComponent()
    }
  }

  const handleDelete = async () => {
    if (await deleteLabel(props.id)) {
      setLabels(labels.filter(origin => origin.id !== props.id))
      props.toggleComponent()
    }
  }
  return (
    <StyledLabelFormContainer>
      <StyledHeader>
        <Label
          name={label.name ? label.name : 'Label preview'}
          color={label.color}
          description={label.description}
        />
        {props.id ? (
          <EventButton
            buttonName="Delete"
            onClick={handleDelete}
            overrideStyle={deleteButtonStyle}
          ></EventButton>
        ) : (
          ''
        )}
      </StyledHeader>
      <StyledForm>
        <StyledDl>
          <StyledDt>Label name</StyledDt>
          <StyledDd>
            <StyledInput
              type="text"
              onChange={handleName}
              value={label.name ? label.name : ''}
              placeholder="Label name"
            />
          </StyledDd>
        </StyledDl>
        <StyledDl>
          <StyledDt>Description</StyledDt>
          <StyledDd>
            <StyledInput
              type="text"
              onChange={handleDescription}
              value={label.description}
              placeholder="Description (optional)"
            />
          </StyledDd>
        </StyledDl>
        <StyledDl>
          <StyledDt>Color</StyledDt>
          <StyledDdFlex>
            <StyledButton backgroundColor={label.color} onClick={resetColor}>
              <RefreshIcon color={getContrast(label.color)} />
            </StyledButton>
            <StyledInput
              onChange={handleColor}
              value={label.color}
              maxLength={7}
              pattern="[0-9a-f]"
            ></StyledInput>
          </StyledDdFlex>
        </StyledDl>
        <StyledActionContainer>
          <EventButton
            buttonName="Cancel"
            onClick={props.toggleComponent}
            overrideStyle={buttonStyle}
          />
          {props.id ? (
            <EventButton
              buttonName="Save changes"
              isGreen={true}
              onClick={handleEditButton}
              overrideStyle={buttonStyle}
            ></EventButton>
          ) : (
            <EventButton
              buttonName="Create label"
              isGreen={true}
              onClick={handleCreateButton}
              overrideStyle={buttonStyle}
            ></EventButton>
          )}
        </StyledActionContainer>
      </StyledForm>
    </StyledLabelFormContainer>
  )
}

const StyledLabelFormContainer = styled.div`
  width: fit-content;
`
const StyledActionContainer = styled.div`
  display: flex;
  height: 33px;
  margin-left: 32px;
  margin-top: 33px;
  margin-bottom: 16px;
  justify-content: flex-end;
`
const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
`
const StyledForm = styled.div`
  width: 100%;
  display: flex;
`
const StyledDeleteButton = styled.button`
  color: #586069;
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
  margin-right: 6px;
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
const StyledInput = styled.input`
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  outline: none;
`
const StyledDl = styled.dl`
  padding-right: 16px;
`
const StyledDdFlex = styled.dd`
  display: flex;
  margin-left: 0;
`
const StyledDd = styled.dd`
  margin-left: 0;
`
const StyledDt = styled.dt`
  font-size: 14px;
  font-weight: 600;
`
const buttonStyle = `
  margin-right: 6px;
  width: max-content;
`
const deleteButtonStyle = `
  background:none;
  border:none;
  color:#586069;
`
export default LabelForm
