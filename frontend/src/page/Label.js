import React, { createContext, useState } from 'react'

export const labelContext = createContext()

const LabelPage = props => {
  const [labels, setLabels] = useState([])

  return <labelContext.Provider value={{ labels }}></labelContext.Provider>
}

export default LabelPage
