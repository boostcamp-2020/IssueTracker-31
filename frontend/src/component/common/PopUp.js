import React from 'react'
import styled from 'styled-components'

const PopUp = ({ kind, title, data, multiSelect = false }) => {
  console.log(kind, title, data, multiSelect)
  const items = data.reduce((result, item) => {
    const newItem = makeNewItem(kind, item)
    return [...result, newItem]
  }, [])

  return (
    <StyledContainer>
      <StyledHeader>{props.title}</StyledHeader>
      {items}
    </StyledContainer>
  )
}

const makeNewItem = (kind, data) => {
  switch (kind) {
    case 'user':
    case 'label':
    case 'milestone':
      return (
        <StyledItemContainer key={data.id}>
          <StyledBigText>{data.title}</StyledBigText>
          {data.dueDate !== undefined && (
            <StyledSubText>{data.dueDate}</StyledSubText>
          )}
        </StyledItemContainer>
      )

    default:
      return <StyledItemContainer key={data.id}></StyledItemContainer>
  }
}

const StyledContainer = styled.div`
  width: auto;
  display: inline-block;
  margin-top: 4px;
  margin-bottom: 20px;
  border: 1px solid #e8eaef;
  border-radius: 6px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px 0px;
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

const StyledText = styled.div`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`

const StyledBigText = styled.div`
  color: #586069;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`

const StyledSubText = styled.div`
  color: #586069;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  overflow: hidden;
  cursor: pointer;
`

const StyledItem = styled.div``

export default PopUp
