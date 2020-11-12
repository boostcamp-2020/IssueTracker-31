import React from 'react'
import styled from 'styled-components'
import MilestoneForm from '@Component/MilestonePage/MilestoneForm'

const CreateMilestone = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTitle>New milestone</StyledTitle>
        <StyledSubtitle>
          Create a new milestone to help organize your issues and pull requests.
          Learn more about{' '}
          <StyledLink href={'https://guides.github.com/features/issues/'}>
            milestones and issues.
          </StyledLink>
        </StyledSubtitle>
      </StyledHeader>
      <MilestoneForm></MilestoneForm>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  padding-right: 24px;
  padding-left: 24px;
  max-width: 1280px;
  margin: auto;
  box-sizing: border-box;
`

const StyledHeader = styled.header`
  padding-bottom: 0;
  display: flex;
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #eaecef;
  flex-flow: row wrap;
`

const StyledTitle = styled.h2`
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 400;
  flex: 1 1 auto;
`

const StyledLink = styled.a`
  color: #0366d6;
  text-decoration: none;
`
const StyledSubtitle = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  color: #586069;
  flex: 1 100%;
`

export default CreateMilestone
