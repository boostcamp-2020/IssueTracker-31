import React, { createContext, useState, useEffect } from 'react'
import TabButton from '@Component/common/TabButton'
import LabelList from '@Component/LabelPage/LabelList'
import LabelForm from '@Component/LabelPage/LabelForm/LabelForm'
import { getLabels } from '@Api/label'
import styled from 'styled-components'
import EventButton from '@Component/common/EventButton'
import { useFetch } from '@Util/hook'

export const labelContext = createContext()

const LabelPage = () => {
  const [labels, setLabels] = useState([])
  const [showForm, setShowForm] = useState(false)

  useFetch(getLabels, setLabels)

  const toggleComponent = e => setShowForm(!showForm)

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
          <EventButton buttonName="New Label" onClick={toggleComponent} />
        </StyledButtonContainer>
        {showForm ? <LabelForm toggleComponent={toggleComponent} /> : null}
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
