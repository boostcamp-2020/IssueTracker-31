import React from 'react'
import Button from '@Component/common/Button'

const EventButton = ({
  buttonName,
  onClick,
  isGreen,
  svgName,
  font,
  overrideStyle,
  disabled,
}) => {
  return (
    <Button
      buttonProps={getProps(
        onClick,
        buttonName,
        isGreen,
        svgName,
        font,
        overrideStyle,
        disabled,
      )}
    />
  )
}

const getProps = (
  onClick,
  buttonName,
  isGreen,
  svgName,
  font,
  overrideStyle,
  disabled,
) => {
  return {
    onClick,
    buttonName,
    svg: svgName ? getSvg(buttonName) : undefined,
    style: {
      backgroundColor: isGreen ? '#2ea44f' : '#fafbfc',
      color: isGreen ? '#ffffff' : '#000000',
      hoverColor: isGreen ? '#3eb45f' : '#g5g5g5',
      fontSize: font ? font.size : null,
      fontWeight: font ? font.weight : null,
      overrideStyle,
    },
    disabled,
  }
}

/* 사용할 때 만들기 */
const getSvg = buttonName => {
  // if (buttonName === ) return svgName
}

export default React.memo(EventButton)
