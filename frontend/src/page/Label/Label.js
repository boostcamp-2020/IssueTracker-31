import React, { createContext, useState, useEffect } from 'react'
import TabButton from '@Component/LabelPage/TabButton'
import NewLabelButton from '@Component/LabelPage/NewLabelButton'
import LabelList from '@Component/LabelPage/LabelList'
import { getLabels } from '@Api/label'

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
      <TabButton></TabButton>
      <NewLabelButton></NewLabelButton>
      <LabelList></LabelList>
    </labelContext.Provider>
  )
}

export default LabelPage
