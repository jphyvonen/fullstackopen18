import React from 'react'
import Input from '../components/InputField'
import { actionForLogin } from '../reducers/userReducer'
import { connect } from 'react-redux'

class FormLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  login = (event) => {
    event.preventDefault()
    this.props.actionForLogin(this.state.username, this.state.password)
    this.setState({
      username: '',
      password: ''
    })
  }
  handleInputFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <form onSubmit={this.login}>
        <h2>Login</h2>
        <Input text={'Username'} name={'username'} value={this.state.username} handleChange={this.handleInputFieldChange} />
        <Input text={'Password'} name={'password'} value={this.state.password} handleChange={this.handleInputFieldChange} />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    )
  }
}
const mapStateToProps = (state) => {
  return { user: state.user }
}
const mapDispatchToProps = {
  actionForLogin
}
export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)