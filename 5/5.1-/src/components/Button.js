import React from 'react'
const Button = ({ text, type, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}
export default Button