import React, { createContext, useState, useEffect } from 'react'
import TabButton from '@Component/LabelPage/TabButton'
import NewLabelButton from '@Component/LabelPage/NewLabelButton'
import LabelList from '@Component/LabelPage/LabelList'
import { getLabels } from '@Api/label'

export const labelContext = createContext()

const fetchData = async (requestFn, setFn) => {
  const response = await requestFn()
  setFn(response)
}

const LabelPage = props => {
  const [labels, setLabels] = useState([])

  useEffect(() => {
    fetchData(getLabels, setLabels)
  }, [])

  return (
    <labelContext.Provider value={{ labels, setLabels }}>
      <TabButton></TabButton>
      <NewLabelButton></NewLabelButton>
      <LabelList>{labels}</LabelList>
    </labelContext.Provider>
  )
}

export default LabelPage
