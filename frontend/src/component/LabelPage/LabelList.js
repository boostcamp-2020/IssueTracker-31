import React from 'react'
import styled from 'styled-components'
import Label from './Label'
import { deleteLabel } from '@Api/label'

const LabelList = ({ labels, setLabels }) => {
  const handleDeleteBtn = async id => {
    const msg = '정말 이 레이블을 삭제하시겠습니까?'
    const flag = window.confirm(msg)
    if (!flag) return
    const success = await deleteLabel(id)
    if (success) setLabels(labels.filter(item => item.id !== id))
  }
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledStatus>
          <StyledStatusButton>{labels.length} labels</StyledStatusButton>
        </StyledStatus>
      </StyledHeader>
      {labels.map(label => (
        <Label
          key={label.id}
          data={label}
          handleDeleteBtn={handleDeleteBtn}
          labels={labels}
          setLabels={setLabels}
        ></Label>
      ))}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  box-sizing: border-box;
`

const StyledHeader = styled.header`
  position: relative;
  background-color: #f6f8fa;
  color: #24292e;
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;
`

const StyledStatus = styled.div`
  padding-left: 6px;
`

const StyledStatusButton = styled.div`
  position: relative;
  display: inline-block;
  margin: 0px;
  margin-left: 10px;
  padding: 13px 0px;
  padding-top: 13px;
  padding-bottom: 13px;
  color: #24292e;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  background-color: initial;
  border: 0;
  appearance: none;
`

export default LabelList
