import React from 'react'

const LabelList = ({ labels, setLabels }) => {
  return (
    <div>
      {labels.map(label => (
        <li key={label.id}>
          {label.name}, {label.description}
        </li>
      ))}
    </div>
  )
}

export default LabelList
