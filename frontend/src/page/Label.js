import React, { createContext, useState } from 'react'
import TabButton from '@Component/LabelPage/TabButton'
import NewLabelButton from '@Component/LabelPage/NewLabelButton'
import LabelList from '@Component/LabelPage/LabelList'

export const labelContext = createContext()

const LabelPage = props => {
  const [labels, setLabels] = useState([])

  return (
    <labelContext.Provider value={{ labels }}>
      <TabButton></TabButton>
      <NewLabelButton></NewLabelButton>
      <LabelList></LabelList>
    </labelContext.Provider>
  )
}

export default LabelPage
