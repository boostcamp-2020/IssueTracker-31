import React from 'react'

const btnStyle = {
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
  whiteSpace: 'nowrap',
}

const Button = props => {
  return (
    <a href={props.target} style={btnStyle}>
      <span> {props.buttonName} </span>
    </a>
  )
}

export default Button
