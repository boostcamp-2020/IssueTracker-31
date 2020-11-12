import React from 'react'
import styled from 'styled-components'
import TabButton from '@Component/common/TabButton'
import MilestoneForm from '@Component/MilestonePage/MilestoneForm'

const EditMilestonePage = ({ location }) => {
  return (
    <StyledContainer>
      <StyledButtonContainer>
        <TabButton clicked="milestone" />
      </StyledButtonContainer>
      <StyledHr />
      <MilestoneForm data={location.state}></MilestoneForm>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  max-width: 1280px;
  margin: 32px auto;
  padding-right: 32px;
  padding-left: 32px;
`

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`
const StyledHr = styled.hr`
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #eaecef;
`
export default EditMilestonePage
