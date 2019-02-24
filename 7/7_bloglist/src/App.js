import React from 'react'
import BlogList from './components/BlogList'
import FormLogin from './components/FormLogin'
import FormAddBlog from './components/FormAddBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { actionForSettingUser } from './reducers/userReducer'
import { initBlogs } from './reducers/blogReducer'
import { connect } from 'react-redux'

class App extends React.Component {

  componentDidMount = async () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      await this.props.actionForSettingUser(user)
    }
    this.props.initBlogs()
  }

  showLoginForm() {
    return (
      <div>
        <Togglable buttonLabel="Start login">
          <FormLogin />
        </Togglable>
      </div>
    )
  }
  showBlogsAndUser() {
    return (
      <div>
        <BlogList />
        <FormAddBlog />
      </div>
    )
  }
  render() {
    return (
      <div>
        <Notification />
        {this.props.user === null ?
          this.showLoginForm() :
          this.showBlogsAndUser()}
      </div>
    )
  }
}
const mapDispatchToProps = {
  actionForSettingUser,
  initBlogs
}
const mapStateToProps = (state) => {
  return { user: state.user }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp;
