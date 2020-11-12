import React from 'react'
import styled from 'styled-components'
import EventButton from '@Component/common/EventButton'

const MilestoneForm = () => {
  return (
    <>
      <StyledForm>
        <StyledDl>
          <StyledDt>Title</StyledDt>
          <StyledDdFlex>
            <StyledInput type="text"></StyledInput>
          </StyledDdFlex>
        </StyledDl>
        <StyledDl>
          <StyledDt>Due date (optional)</StyledDt>
          <StyledDdFlex>
            <StyledInput type="date"></StyledInput>
          </StyledDdFlex>
        </StyledDl>
        <StyledDl>
          <StyledDt>Description (optional)</StyledDt>
          <StyledDdFlex>
            <StyledInputDescription type="text"></StyledInputDescription>
          </StyledDdFlex>
        </StyledDl>
      </StyledForm>
      <hr></hr>

      <StyledButtonContainer>
        <EventButton buttonName={'Cancel'}></EventButton>
        <EventButton buttonName={'Close milestone'}></EventButton>
        <EventButton buttonName={'Save changes'} isGreen></EventButton>
        <EventButton buttonName={'Create milestone'} isGreen></EventButton>
      </StyledButtonContainer>
    </>
  )
}

const StyledForm = styled.div``
const StyledButtonContainer = styled.div`
  float: right;
`

const StyledInput = styled.input`
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: midStyledDle;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
`

const StyledInputDescription = styled.textarea`
  width: 100%;
  height: 200px;
  min-height: 200px;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: midStyledDle;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  outline: none;

  box-sizing: border-box;
`

const StyledDl = styled.dl`
  padding-right: 16px;
  flex: 1 auto;
`
const StyledDdFlex = styled.dd`
  display: flex;
  margin-left: 0;
`
const StyledDt = styled.dt`
  font-size: 14px;
  font-weight: 600;
`

export default MilestoneForm
