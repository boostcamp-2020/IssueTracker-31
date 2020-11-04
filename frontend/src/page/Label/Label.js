import React, { createContext, useState, useEffect } from 'react'
import TabButton from '@Component/LabelPage/TabButton'
import NewLabelButton from '@Component/LabelPage/NewLabelButton'
import LabelList from '@Component/LabelPage/LabelList'
import { getLabels } from '@Api/label'
import styled from 'styled-components'
import Button from '@Component/common/Button'

export const labelContext = createContext()

/* TODO: 위치 변경 */
const fetchData = async (requestFn, setFn) => {
  const response = await requestFn()
  setFn(response)
}

const LabelPage = () => {
  const [labels, setLabels] = useState([])

  useEffect(() => {
    fetchData(getLabels, setLabels)
  }, [])

  return (
    <labelContext.Provider value={{ labels, setLabels }}>
      {/* TODO-DELETE: labels 요청 테스트를 위한 임시 코드 */}
      {labels.map(label => (
        <li key={label.id}>
          {label.name}, {label.description}
        </li>
      ))}
      <StyledContainer>
        <StyledButtonContainer>
          <TabButton clicked="label"></TabButton>
          <Button buttonName="New Label" />
        </StyledButtonContainer>
        <LabelList></LabelList>
      </StyledContainer>
    </labelContext.Provider>
  )
}

const StyledContainer = styled.div`
  width: 500px;
  max-width: 1280px;
  margin: 32px auto;
  padding-right: 32px;
  padding-left: 32px;
  box-sizing: border-box;
`

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  box-sizing: border-box;
`

export default LabelPage
