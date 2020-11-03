import React, { useContext } from 'react'
import styled from 'styled-components'
import { issueListContext } from '@Page/IssueList'

const PopUp = ({ kind, title, data, multiSelect = false }) => {
  const { conditions, setConditions } = useContext(issueListContext)

  const updateSelectedId = id => {
    const newConditions = { ...conditions }
    if (!multiSelect) newConditions[kind] = [id]
    else {
      if (conditions[kind].includes(id))
        newConditions[kind] = newConditions[kind].filter(value => value != id)
      else newConditions[kind] = [...newConditions[kind], id]
    }
    setConditions(newConditions)
  }

  return (
    <StyledContainer>
      <StyledHeader>{title}</StyledHeader>
      {data.map(item => (
        <PopUpItem
          key={item.id}
          kind={kind}
          data={item}
          updateSelectedId={updateSelectedId}
          selectedId={conditions[kind]}
        />
      ))}
    </StyledContainer>
  )
}

const PopUpItem = ({ kind, data, updateSelectedId, selectedId }) => {
  const onClickItem = () => updateSelectedId(data.id)

  return (
    <StyledItemContainer onClick={onClickItem}>
      <StyledCheckSpan visible={selectedId.includes(data.id)}>
        ✓
      </StyledCheckSpan>
      {kind === 'user' && (
        <>
          <StyledImg src={data.profileUrl} alt="user profile"></StyledImg>
          <StyledBoldTextSpan>{data.nickname}</StyledBoldTextSpan>
        </>
      )}
      {kind === 'label' && (
        <>
          <StyledColorSpan color={data.color}></StyledColorSpan>
          <StyledTextSpan>{data.name}</StyledTextSpan>
          <StyledTextDiv>{data.description}</StyledTextDiv>
        </>
      )}
      {kind === 'milestone' && (
        <>
          <StyledBoldTextSpan>{data.title}</StyledBoldTextSpan>
          {data.dueDate !== undefined && (
            <StyledTextDiv>{data.dueDate}</StyledTextDiv>
          )}
        </>
      )}
      {(kind === 'text' || kind === false) && (
        <StyledBigTextSpan>{data.text}</StyledBigTextSpan>
      )}
    </StyledItemContainer>
  )
}

const StyledContainer = styled.div`
  width: 300px;
  display: inline-block;
  margin-top: 4px;
  margin-bottom: 20px;
  background-color: #ffffff;
  border: 1px solid #e8eaef;
  border-radius: 6px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px 0px;
  overflow: hidden;
  z-index: 10;
`
const StyledHeader = styled.header`
  padding: 8px 10px;
  background-color: #fcfcfd;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
`
const StyledItemContainer = styled.div`
  padding: 8px 8px 8px 30px;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid #e8eaef;
  font-size: 12px;
  font-weight: 400;
  overflow: hidden;
  text-align: left;
`
const StyledBoldTextSpan = styled.span`
  color: #586069;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  line-height: 18px;
  overflow: hidden;
  cursor: pointer;
`

const StyledBigTextSpan = styled.span`
  color: #586069;
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  line-height: 18px;
  overflow: hidden;
  cursor: pointer;
`

const StyledTextSpan = styled.span`
  color: #586069;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`
const StyledTextDiv = styled.div`
  color: #586069;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`
const StyledColorSpan = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`
const StyledImg = styled.img`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  overflow: hidden;
  line-height: 1;
  vertical-align: middle;
  margin-right: 4px;
`

const StyledCheckSpan = styled.span`
  float: left;
  margin-top: 2px;
  margin-left: -20px;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  vertical-align: middle;
  overflow: hidden;
  font-size: 16px;
  line-height: 1;
`

export default PopUp
