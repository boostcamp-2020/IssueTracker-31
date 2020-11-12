import React, { useState } from 'react'
import styled from 'styled-components'
import TabButton from '@Component/common/TabButton'
import EventButton from '@Component/common/EventButton'
import LabelList from '@Component/LabelPage/LabelList'
import LabelForm from '@Component/LabelPage/LabelForm/LabelForm'
import { getLabels } from '@Api/label'
import { useFetch } from '@Util/hook'

const LabelPage = () => {
  const [labels, setLabels] = useState([])
  const [showForm, setShowForm] = useState(false)

  useFetch(getLabels, setLabels)

  const toggleComponent = e => setShowForm(!showForm)

  return (
    <StyledContainer>
      <StyledButtonContainer>
        <TabButton clicked="label"></TabButton>
        <EventButton buttonName="New Label" onClick={toggleComponent} isGreen />
      </StyledButtonContainer>
      {showForm ? (
        <StyledFormContainer>
          <LabelForm
            toggleComponent={toggleComponent}
            labels={labels}
            setLabels={setLabels}
          />
        </StyledFormContainer>
      ) : null}
      <LabelList labels={labels} setLabels={setLabels}></LabelList>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
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
const StyledFormContainer = styled.div`
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  padding: 16px;
`

export default LabelPage
