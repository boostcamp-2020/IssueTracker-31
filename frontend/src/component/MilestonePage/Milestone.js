import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import DateIcon from '@Public/js/DateIcon'
import { getMilestoneDateFormat } from '@Util/util'

const Milestone = ({ data, handleDeleteBtn }) => {
  let percent = (data.closeIssue / (data.openIssue + data.closeIssue)) * 100
  if (isNaN(percent)) percent = 0
  return (
    <StyledContainer>
      <StyledFirstSection>
        <StyledTitle>{data.title}</StyledTitle>
        <StyledDate>
          {data.dueDate ? (
            <>
              <DateIcon /> {getMilestoneDateFormat(data.dueDate)}
            </>
          ) : (
            'No due date'
          )}
        </StyledDate>
        <StyledDescription>{data.description}</StyledDescription>
      </StyledFirstSection>
      <StyledSecondSection>
        <StyledProgressBar>
          <StyledProgressItem percent={percent}></StyledProgressItem>
        </StyledProgressBar>
        <div>
          <StyledState>
            {parseInt(percent)}% <StyledLabel>complete</StyledLabel>
          </StyledState>
          <StyledLink to="/">
            <StyledState>
              {data.openIssue} <StyledLabel>open</StyledLabel>
            </StyledState>
          </StyledLink>
          <StyledLink to="/">
            <StyledState>
              {data.closeIssue} <StyledLabel>closed</StyledLabel>
            </StyledState>
          </StyledLink>
        </div>
        <StyledButtons>
          <Link to="/milestones/edit">
            <StyledButton color="#0365d6">Edit</StyledButton>
          </Link>
          <StyledButton color="#0365d6">
            {data.isOpen ? 'Close' : 'Open'}
          </StyledButton>
          <StyledButton
            color="#cb2431"
            onClick={() => handleDeleteBtn(data.id)}
          >
            Delete
          </StyledButton>
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
  box-sizing: border-box;
`

const StyledSecondSection = styled.div`
  flex: 1;
  border-top: 1px solid #eaecef;
  border-right: 1px solid #eaecef;
  padding: 15px 20px;
  vertical-align: top;
  box-sizing: border-box;
`

const StyledTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 5px;
  color: #24292e;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.2;
`

const StyledDate = styled.div`
  font-size: 14px;
  line-height: 21px;
  // display: block;
  margin-right: 10px;
  color: #6a737d;
  vertical-align: middle;
`

const StyledDescription = styled.div`
  font-size: 16px;
  line-height: 24px;
  display: block;
  margin-top: 5px;
  margin-right: 10px;
  color: #6a737d;
  vertical-align: middle;
`

const StyledProgressBar = styled.span`
  height: 10px;
  display: flex;
  overflow: hidden;
  background-color: #e1e4e8;
  border-radius: 6px;
  outline: 1px solid transparent;
  margin-top: 4px;
  margin-bottom: 8px;
`
const StyledProgressItem = styled.span`
  width: ${({ percent }) => `${percent}%`};
  outline: 2px solid transparent;
  background-color: #28a745;
`
const StyledLink = styled(Link)`
  margin-left: 15px;
`

const StyledState = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  color: #24292e;
  white-space: nowrap;
`
const StyledLabel = styled.span`
  font-weight: 400;
`
const StyledButtons = styled.div`
  font-size: 14px;
  margin-top: 8px;
  color: #24292e;
`
const StyledButton = styled.button`
  display: inline-block;
  margin-right: 8px;
  padding: 0px;
  text-decoration: none;
  appearance: none;
  border: none;
  background-color: transparent;
  color: ${({ color }) => color};
  outline: none;
`

export default Milestone
