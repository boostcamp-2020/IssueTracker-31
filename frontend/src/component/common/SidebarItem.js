import React, { useRef } from 'react'
import styled from 'styled-components'
import SettingIcon from '@Public/js/SettingIcon'
import PopUp from '@Component/common/PopUp'

const SidebarItem = ({ title, children, multiSelect, popupProps }) => {
  const popup = useRef()
  const detail = useRef()

  const handleMouseDown = () => {
    popup.current.focus()
  }

  const closePopUp = () => {
    detail.current.open = false
  }

  return (
    <StyledDiv>
      <StyledSidebarItem
        ref={detail}
        onMouseDown={handleMouseDown}
        onBlur={closePopUp}
      >
        <StyledTitle>
          <span>{title}</span>
          <SettingIcon />
        </StyledTitle>

        <StyledDetailsMenu ref={popup}>
          <PopUp
            title={popupProps.title}
            kind={popupProps.kind}
            data={popupProps.data ? popupProps.data : []}
            targetCondition={popupProps.targetCondition}
            updateConditions={popupProps.updateConditions}
            multiSelect={multiSelect}
          ></PopUp>
        </StyledDetailsMenu>
      </StyledSidebarItem>
      {children}
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  font-size: 12px;
  color: #586069;
  border-bottom: solid 1px #eaecef;
  box-sizing: border-box;
  flex-shrink: 1;
  padding-top: 10px;
  min-height: 80px;
`

const StyledSidebarItem = styled.details`
  summary::-webkit-details-marker {
    display: none;
  }
  summary:focus {
    outline: none;
  }
`

const StyledTitle = styled.summary`
  display: flex;
  font-weight: 600;
  justify-content: space-between;
  &:hover {
    color: #0366d6;
    cursor: pointer;
    fill: blue;
  }
`

const StyledDetailsMenu = styled.div`
  position: absolute;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  padding: 0;
`

export default SidebarItem
