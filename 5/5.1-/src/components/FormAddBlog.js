import React from 'react'
import blogService from '../services/blogs'
import Input from './InputField'

class FormAddBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            title: '',
            url: ''
        }
        this.updateMain = this.props.update
        this.setStatusMessage = this.props.setStatusMessage
    }
    handleInputFieldChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    createBlog = async (event) => {
        event.preventDefault()
        const entryObject = {
            author: this.state.author,
            title: this.state.title,
            url: this.state.url
        }
        const res = await blogService.create(entryObject)
        this.setState({
            author: '',
            title: '',
            url: ''
        })
        this.updateMain()
        this.setStatusMessage(`Added blog ${res.title} by ${res.author}`)
    }
    render() {
        return (
            <div>
                <h2>Create new </h2>
                <form onSubmit={this.createBlog}>
                    <Input handleChange={this.handleInputFieldChange} name={'author'} value={this.state.author} text={'author'} />
                    <Input handleChange={this.handleInputFieldChange} name={'title'} value={this.state.title} text={'title'} />
                    <Input handleChange={this.handleInputFieldChange} name={'url'} value={this.state.url} text={'url'} />
                    <button type="submit">Create new</button>
                </form>
            </div>
        )
    }
}
export default FormAddBlog