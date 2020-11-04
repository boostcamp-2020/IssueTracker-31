import React, { createContext, useState, useEffect } from 'react'
// import TabButton from '@Component/common/TabButton'
import MilestoneList from '@Component/MilestonePage/MilestoneList'
import { getMilestones } from '@Api/milestone' // TODO: API 다른 거로 바꿔야 함
import styled from 'styled-components'
import Button from '@Component/common/Button'

export const milestoneContext = createContext()

/* TODO: 위치 변경 */
const fetchData = async (requestFn, setFn) => {
  const response = await requestFn()
  setFn(response)
}

const MilestonePage = () => {
  const [milestones, setMilestones] = useState([])

  useEffect(() => {
    fetchData(getMilestones, setMilestones)
  }, [])

  return (
    <milestoneContext.Provider value={{ milestones, setMilestones }}>
      <StyledContainer>
        <StyledButtonContainer>
          {/* <TabButton clicked="milestone"></TabButton> */}
          <Button buttonName="New milestone" targetLocation="/milestone/new" />
        </StyledButtonContainer>
        <MilestoneList></MilestoneList>
      </StyledContainer>
    </milestoneContext.Provider>
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

export default MilestonePage
