import React from 'react'

const defaultStyle = {
  color: '#FFFFFF',
  textDecoration: 'none',
  background: '#2EA44F',
  padding: '5px 16px',
  border: '1px solid',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '20px',
}

const Button = ({ buttonName, targetLocation, buttonStyle = defaultStyle }) => {
  return (
    <a href={targetLocation} style={buttonStyle}>
      <span> {buttonName} </span>
    </a>
  )
}

export default Button
