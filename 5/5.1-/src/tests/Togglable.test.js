import React from 'react'
import { shallow } from 'enzyme'
import TogglableText from '../components/TogglableText'

const testBlog = {
    author: 'Seppo',
    title: 'Sepon kepposet',
    url: 'www.fi',
    likes: 5
}

describe.only('<Togglable />', () => {
    let togglableComponent

    beforeEach(() => {
        togglableComponent = shallow(
            <TogglableText author={testBlog.author} title={testBlog.title} >

            </TogglableText>
        )

    })

    it('renders only author and title', () => {
        const div = togglableComponent.find('.nameDiv')
        expect(div.text()).toContain(testBlog.author, testBlog.title)
        const detailsDiv = togglableComponent.find('.detailsDiv')
        expect(detailsDiv.getElement().props.style).toEqual({ display: 'none' })
    })
    it('renders blog details', () => {
        const nameDiv = togglableComponent.find('.nameDiv')
        nameDiv.simulate('click')
        const detailsDiv = togglableComponent.find('.detailsDiv')
        expect(detailsDiv.getElement().props.style).toEqual({ display: 'inline-block' })

    })
})