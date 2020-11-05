import React from 'react'
import styled from 'styled-components'
import DateIcon from '@Public/js/DateIcon'

function Milestone({ data }) {
  return (
    <StyledContainer>
      <StyledFirstSection>
        <StyledTitle>{data.title}</StyledTitle>
        <StyledMeta>
          <DateIcon /> {data.dueDate || 'No due date'}
        </StyledMeta>
        <StyledMeta>{data.description}</StyledMeta>
      </StyledFirstSection>
      <StyledSecondSection>
        <StyledProgressBar>
          <StyledProgressItem></StyledProgressItem>
        </StyledProgressBar>
        <StyledStates>
          <StyledState> % complete</StyledState>
          <StyledState> open</StyledState>
          <StyledState> closed</StyledState>
        </StyledStates>
        <StyledButtons>
          <StyledButton color="#0365d6">Edit</StyledButton>
          <StyledButton color="#0365d6">Close</StyledButton>
          <StyledButton color="#cb2431">Delete</StyledButton>
        </StyledButtons>
      </StyledSecondSection>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1 auto;
  color: #6a737d;
  border-bottom: 1px solid #eaecef;
`
const StyledFirstSection = styled.div`
  flex: 1;
  border-top: 1px solid #eaecef;
  border-left: 1px solid #eaecef;
  padding: 15px 20px;
  vertical-align: top;
`

const StyledSecondSection = styled.div`
  flex: 1;
  border-top: 1px solid #eaecef;
  border-right: 1px solid #eaecef;
  padding: 15px 20px;
  vertical-align: top;
`

const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 5px;
  color: #24292e;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.2;
`

const StyledMeta = styled.div`
  font-size: 14px;
  display: block;
  margin-right: 10px;
  color: #6a737d;
  vertical-align: middle;
`
const StyledProgressBar = styled.span``
const StyledProgressItem = styled.span``
const StyledStates = styled.div``
const StyledState = styled.div``
const StyledButtons = styled.div``
const StyledButton = styled.button``

export default Milestone