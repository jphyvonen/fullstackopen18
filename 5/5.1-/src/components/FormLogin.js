import React from 'react'
import Input from '../components/InputField'

const FormLogin = ({ password, username, handleLoginFieldChange, onSubmit, }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <Input text={'Username'} name={'username'} value={username} handleChange={handleLoginFieldChange} />
      <Input text={'Password'} name={'password'} value={password} handleChange={handleLoginFieldChange} />
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
}
export default FormLogin