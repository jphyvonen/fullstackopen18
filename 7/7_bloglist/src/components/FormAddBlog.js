import React from 'react'
import blogService from '../services/blogs'
import Input from './InputField'
import { notify } from '../reducers/notificationReducer'
import { actionForCreating } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import blogs from '../services/blogs';

class FormAddBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            title: '',
            url: ''
        }
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
        this.props.actionForCreating(entryObject)
        this.setState({
            author: '',
            title: '',
            url: ''
        })
        this.props.notify(`Added blog ${entryObject.title} by ${entryObject.author}`)
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
// const mapStateToProps = (state) => {
//     return {blogs: state.blogs}
// }
const mapDispatchToProps = {
    notify,
    actionForCreating
}

export default connect(null, mapDispatchToProps)(FormAddBlog)