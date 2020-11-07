import React, { createContext, useState } from 'react'
import styled from 'styled-components'
import TabButton from '@Component/common/TabButton'
import LinkButton from '@Component/common/LinkButton'
import MilestoneList from '@Component/MilestonePage/MilestoneList'
import { getMilestones } from '@Api/milestone' // TODO: API 다른 거로 바꿔야 함
import { useFetch } from '@Util/hook'

export const milestoneContext = createContext()

const MilestonePage = () => {
  const [milestones, setMilestones] = useState([])

  useFetch(getMilestones, setMilestones)

  return (
    <milestoneContext.Provider value={{ milestones, setMilestones }}>
      <StyledContainer>
        <StyledButtonContainer>
          <TabButton clicked="milestone" />
          <LinkButton
            buttonName={'New Milestone'}
            targetLocation={'/milestone/new'}
            isGreen={true}
          />
        </StyledButtonContainer>
        <MilestoneList></MilestoneList>
      </StyledContainer>
    </milestoneContext.Provider>
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

export default MilestonePage
