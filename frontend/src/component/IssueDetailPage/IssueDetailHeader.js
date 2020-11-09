import React, { useState } from 'react'
import styled from 'styled-components'
import EventButton from '@Component/common/EventButton'
import LinkButton from '@Component/common/LinkButton'

const IssueDetailHeader = ({ title }) => {
  const [mode, setMode] = useState('default')

  const onClickEditButton = () => {
    if (mode === 'default') setMode('edit')
    else setMode('default')
  }

  const onClickSaveButton = () => {
    console.log('clicked save btn')
  }

  return (
    <StyledWrapper>
      <StyledTitleSection show={mode === 'default'}>
        <StyledTitle>{title || 'Issue TitleIssue Title'}</StyledTitle>
        <StyledButtonWrapper>
          <EventButton
            buttonName="Edit"
            onClick={onClickEditButton}
            font={{ size: '12px', weight: 500 }}
          />
          <StyledEmptyDiv />
          <LinkButton
            buttonName={'New Issue'}
            targetLocation={'/issue/new'}
            isGreen={true}
            font={{ size: '12px', weight: 500 }}
          />
        </StyledButtonWrapper>
      </StyledTitleSection>
      <StyledTitleSection show={mode === 'edit'}>
        <StyledInput defaultValue={title || 'Issue temp title'} />
        <StyledButtonWrapper>
          <EventButton buttonName="Save" onClick={onClickSaveButton} />
          <StyledButton onClick={onClickEditButton}>Cancel</StyledButton>
        </StyledButtonWrapper>
      </StyledTitleSection>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.header`
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
`

const StyledTitleSection = styled.div`
  width: 100%;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  margin-bottom: 8px;
  box-sizing: border-box;
`

const StyledButtonWrapper = styled.div`
  float: right;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
`

const StyledTitle = styled.h1`
  flex: auto;
  margin-top: 0;
  margin-bottom: 8px;
  margin-right: 0;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.25;
  word-break: break-word;
  overflow-wrap: break-word;
`
const StyledInput = styled.input`
  margin-right: 16px;
  flex: auto;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  box-shadow: inset 0 1px 0 rgba(225,228,232,0.2);
  padding: 5px 12px;
  line-height: 20px;
  font-size: 16px;
  background-color #fafbfc;
  box-sizing: border-box;
  overflow: visible;
  font: inherit;    
`
const StyledButton = styled.div`
  display: inline-block;
  padding: 0;
  font-size: inherit;
  color: #0366d6;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
  appearance: none;
  margin-left: 8px;
`
const StyledEmptyDiv = styled.div`
  width: 8px;
`

export default IssueDetailHeader
