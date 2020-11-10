import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import EventButton from '@Component/common/EventButton'
import LinkButton from '@Component/common/LinkButton'
import { patchIssueDetail } from '@Api/issue'
import OpenIssueIcon from '@Public/js/OpenIssueIcon'
import ClosedIssueIcon from '@Public/js/ClosedIssueIcon'
import { getTimePassedFromNow } from '@Util/util'

const IssueDetailHeader = ({
  issueId,
  isOpen,
  createdAt,
  nickname,
  commentCnt,
  title,
  setTitle,
}) => {
  const [mode, setMode] = useState('default')
  const editInput = useRef()
  const onClickEditButton = () => {
    if (mode === 'default') setMode('edit')
    else setMode('default')
  }

  const onClickSaveButton = async e => {
    const changedTitle = editInput.current.value
    if (title === changedTitle) return setMode('default')
    const success = await patchIssueDetail({
      id: issueId,
      body: { title: changedTitle },
    })
    if (success) setTitle(changedTitle)
    setMode('default')
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
        <StyledInput
          defaultValue={title || 'Issue temp title'}
          ref={editInput}
        />
        <StyledButtonWrapper>
          <EventButton buttonName="Save" onClick={onClickSaveButton} />
          <StyledButton onClick={onClickEditButton}>Cancel</StyledButton>
        </StyledButtonWrapper>
      </StyledTitleSection>
      <StyledMetaSection>
        {isOpen && (
          <StyledState isOpen={isOpen}>
            <OpenIssueIcon color={'#ffffff'} />
            Open
          </StyledState>
        )}
        {!isOpen && (
          <StyledState isOpen={isOpen}>
            <ClosedIssueIcon color={'#ffffff'} />
            Closed
          </StyledState>
        )}
        <StyledTextArea>
          <StyledNickname>{nickname}</StyledNickname>
          <span> opened this issue </span>
          {getTimePassedFromNow(createdAt)}
          <span> · </span>
          {commentCnt || 0} comments
        </StyledTextArea>
      </StyledMetaSection>
    </StyledWrapper>
  )
}

const StyledMetaSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
  padding-bottom: 8px;
  box-sizing: border-box;
  font-size: 14px;
  color: #586069;
  border-bottom: 1px solid #e1e4e8;
`
const StyledState = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  flex-shrink: 0;
  color: #ffffff;
  background-color: ${({ isOpen }) => (isOpen ? '#28a745' : '#d73a49')};
  border-color: transparent;
  padding: 5px 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
  white-space: nowrap;
  border-radius: 2em;
`
const StyledTextArea = styled.div`
  margin-bottom: 8px;
  min-width: 0;
  flex: auto;
  font-size: 14px;
  line-height: 21px;
`
const StyledNickname = styled.span`
  font-weight: 600;
  color: #586069;
  font-size: 14px;
  line-height: 21px;
`

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
