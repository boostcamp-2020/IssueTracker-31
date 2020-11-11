import React from 'react'
import styled from 'styled-components'
import Label from './Label'

const LabelList = ({ labels, setLabels }) => {
  const handleDeleteBtn = async id => {
    // const success = await deleteMilestone(id)
    // if (success) setLabels(labels.filter(item => item.id !== id))
  }
  return (
    <div>
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
        ></Label>
      ))}
    </div>
  )
}

const StyledHeader = styled.header`
  position: relative;
  margin-top: 20px;
  background-color: #f6f8fa;
  color: #24292e;
  border: 1px solid #e1e4e8;
  border-radius: 6px 6px 0 0;
  font-size: 14px;
  line-height: 1.5;
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
