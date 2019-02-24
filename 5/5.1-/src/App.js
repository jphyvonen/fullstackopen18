import React from 'react'
import './index.css'
import Blog from './components/Blog'
import Button from './components/Button'
import FormLogin from './components/FormLogin'
import FormAddBlog from './components/FormAddBlog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="status">
      <h2>{message}</h2>
      <br></br>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      statusMessage: null
    }
  }
  componentDidMount() {
    this.getBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.setState({ user })
    }
  }
  setStatusMessage(message) {
    this.setState({ statusMessage: message })
    setTimeout(() => {
      this.setState({ statusMessage: null })
    }, 5000)
  }
  async getBlogs() {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    this.setState({ blogs})
    // console.log(blogs)
  }
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (ex) {
      this.setStatusMessage('Invalid password or username')
    }
  }
  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }
  handleInputFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  showLoginForm() {
    return (
      <div>
        <Togglable buttonLabel="Start login">
          <FormLogin
            onSubmit={this.login}
            handleLoginFieldChange={this.handleInputFieldChange}
            password={this.state.password}
            username={this.state.username} />
        </Togglable>
      </div>
    )
  }
  showBlogsAndUser() {
    return (
      <div>
        <div>Logged in as: {this.state.user.username} <Button text={'Log out'} onClick={this.logout} /></div>
        <h2>blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} update={this.getBlogs.bind(this)} />
        )}
        <FormAddBlog update={this.getBlogs.bind(this)} setStatusMessage={this.setStatusMessage.bind(this)} />
      </div>
    )
  }
  render() {
    console.log("rendering")
    return (
      <div>
        <Notification message={"SEPPO"} />
        {this.state.user === null ?
           this.showLoginForm() : 
            this.showBlogsAndUser()}
        

      </div>
    );
  }
}

export default App;
