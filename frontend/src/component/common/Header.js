import React from 'react'

const Header = props => {
  const headerStyle = {
    width: '100%',
    backgroundColor: 'black',
    textAlign: 'center',
    boxSizing: 'border-box',
  }
  const spanStyle = {
    display: 'inline-block',
    padding: '16px 0px',
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
  }

  return (
    <header style={headerStyle} className="header">
      <span style={spanStyle}>
        {/* issue icon */}
        ISSUES
      </span>
    </header>
  )
}

export default Header
