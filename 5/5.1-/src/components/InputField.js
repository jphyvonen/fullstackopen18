import React from 'react'
const Input = ({ text, name, value, handleChange }) => {
  return (
    <div>
      {text}:
      <input
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
export default Input