import React from 'react'
import styled from 'styled-components'
import LabelTemplate from '@Component/common/Label'

const Label = ({ data, handleDeleteBtn }) => {
  console.log(data)
  return (
    <StyledContainer>
      <StyledLabelTemplate>
        <LabelTemplate name={data.name} color={data.color}></LabelTemplate>
      </StyledLabelTemplate>

      <StyledDescription>{data.description}</StyledDescription>
      <StyledButtonContainer>
        <StyledButton>Edit</StyledButton>
        <StyledButton>Delete</StyledButton>
      </StyledButtonContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  padding: 16px;
  margin: 0px;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top: 1px solid #eaecef;
`
const StyledLabelTemplate = styled.div`
  width: 25%;
`

const StyledDescription = styled.div`
  font-size: 12px;
  padding-right: 16px;
  color: #586069;
  width: 33.33333%;
`
const StyledButtonContainer = styled.div`
  width: 16.66667%;
  display: flex;
  font-size: 12px;
  justify-content: flex-end;
`
const StyledButton = styled.button`
  margin-left: 16px;
  appearance: none;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  color: #586069;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
`
export default Label
