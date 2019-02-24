import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Blog from '../components/Blog'
import LoginForm from '../components/FormLogin'
jest.mock('../services/blogs')
import blogService from '../services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })
  it('renders only login form when no user is logged in', () => {
    app.update()
    const blogComponents = app.find(Blog)
    const loginForm = app.find(LoginForm)
    expect(blogComponents.length).toBe(0)
    expect(loginForm.length).toBe(1)
  })


  describe('renders all blogs it gets from backend when logged in user', () => {
    beforeEach(() => {
      const user = {
        username: 'Pertsa',
        token: '1234567',
        name: 'Tom Cruise'
      }
      localStorage.setItem('loggedUser', JSON.stringify(user))
      app = mount(<App />)
      // console.log(localStorage.getItem('loggedUser'))
    })
    // app.setState({user: user})

    it('renders blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})