import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from '../components/SimpleBlog'

const blog = {
  author: "Luka Modric",
  title: "Football",
  likes: 5
}


describe.only('<SimpleBlog />', () => {
  it('renders author and title', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const authorDiv = blogComponent.find('.authorDiv')

    expect(authorDiv.text()).toContain(blog.author, blog.title)
  })
  it('likes are rendered correctly', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const likesDiv = blogComponent.find('.likesDiv')

    expect(likesDiv.text()).toEqual("5")
  })
  it('clicking the like button twice increases likes by two', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})