import React from 'react'
import Button from '@Component/common/Button'

const LinkButton = ({ buttonName, targetLocation, isGreen, svgName }) => {
  console.log(buttonName, targetLocation, isGreen, svgName)
  return (
    <Button
      buttonProps={getProps(targetLocation, buttonName, isGreen, svgName)}
    />
  )
}

const getProps = (targetLocation, buttonName, isGreen, svgName) => {
  return {
    buttonName,
    targetLocation,
    svg: svgName ? getSvg(buttonName) : undefined,
    style: {
      backgroundColor: isGreen ? '#2ea44f' : '#fafbfc',
      color: isGreen ? '#ffffff' : '#000000',
      hoverColor: isGreen ? '#3eb45f' : '#g5g5g5',
    },
  }
}

/* 사용할 때 만들기 */
const getSvg = buttonName => {
  // if (buttonName === ) return svgName
}

export default LinkButton
