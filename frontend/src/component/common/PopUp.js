import React from 'react'
import styled from 'styled-components'

/**
 * @param {string} props.title
 * @param {[<Component />]} props.items
 */
const PopUp = props => {
  const items = props.items.reduce((result, item) => {
    return [
      ...result,
      <StyledItemContainer key={item.key}>{item}</StyledItemContainer>,
    ]
  }, [])

  return (
    <StyledContainer>
      <StyledHeader>{props.title}</StyledHeader>
      {items}
    </StyledContainer>
  )
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

export default PopUp
