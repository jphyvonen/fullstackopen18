import React from 'react'
import TogglableText from './TogglableText'
import Button from './Button'
import { actionForDelete, actionForLike, initBlogs } from '../reducers/blogReducer'
import {actionForLogout} from '../reducers/userReducer'
import { connect } from 'react-redux'

class BlogList extends React.Component {
  render() {
    return (
      <div>
        <Button text={'Log out'} onClick={this.props.actionForLogout} />
        <div>Logged in as: {this.props.user.username}</div>
        <h2>Blogs</h2>
        {this.props.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} like={this.props.actionForLike} del={this.props.actionForDelete}/>
        )}
      </div>
    )
  }
}
const Blog = ({ blog , like, del}) => (
  <div>
    <TogglableText author={blog.author} title={blog.title}>
      <BlogDetails blog={blog} like={like} del={del} />
    </TogglableText>
  </div>
)
const BlogDetails = ({ blog, like, del }) => {
  let name = 'Unknown'

  if (blog.user !== null && blog.user !== undefined) {
    // console.log(blog.user)
    name = blog.user.name
  }
  let hideIfNotLoggedUsers = hideOrShowDeleteFor(blog);
  return (
    <div>
      <div className="urlDiv">{blog.url}</div>
      <div className="likesDiv">{blog.likes} likes <Button onClick={() => like(blog)} text={'Like'} /></div>
      <div>Added by: {name}</div>
      <div style={hideIfNotLoggedUsers}><Button onClick={() => del(blog)} text={'Delete'}></Button> </div>
    </div>
  )
}
const mapDispatchToProps = {
  initBlogs,
  actionForLike,
  actionForDelete,
  actionForLogout
}
const sortedBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}
const mapStateToProps = (state) => {
  return { blogs: sortedBlogs(state.blogs), user: state.user }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogList)

//some util
function hideOrShowDeleteFor(blog) {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (blog.user === null || blog.user === undefined || !loggedUserJSON)
    return { display: '' }

  const user = JSON.parse(loggedUserJSON);
  return { display: user.name === blog.user.name ? '' : 'none' };

}
