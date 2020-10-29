import React from 'react'

const SearchBar = props => {
  return (
    <div>
      <button>Filters 🔻</button>
      <form>
        <input type="text" placeholder={props.condition || 'isOpen'}></input>
      </form>
    </div>
  )
}

export default SearchBar
