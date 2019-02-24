import React from 'react'
import TogglableText from '../components/TogglableText'
import blogService from '../services/blogs'
import Button from '../components/Button'


const Blog = ({ blog, update }) => (
  <div>
    <TogglableText author={blog.author} title={blog.title}>
      <BlogDetails blog={blog} update={update} />
    </TogglableText>
  </div>
)
const BlogDetails = ({ blog, update }) => {
  let name = 'Unknown'

  if (blog.user !== null && blog.user !== undefined) {
    name = blog.user.name
  }
  let hideIfNotLoggedUsers = hideOrShowDeleteFor(blog);
  return (
    <div>
      <div className="urlDiv">{blog.url}</div>
      <div className="likesDiv">{blog.likes} likes <Button onClick={Like(blog, update)} text={'Like'} /></div>
      <div>Added by: {name}</div>
      <div style={hideIfNotLoggedUsers}><Button onClick={Delete(blog, update)} text={'Delete'}></Button> </div>
    </div>
  )
}
const Like = (blog, update) => {
  return async () => {
    const likedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(blog._id, likedBlog)
    update()
  }
}
const Delete = (blog, update) => {
  return async () => {
    if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}`)) {
      await blogService.remove(blog._id)
      update()
    }
  }
}
export default Blog

//some util
function hideOrShowDeleteFor(blog) {
  const loggedUserJSON = window.localStorage.getItem('loggedUser');
  if (blog.user === null || blog.user === undefined || !loggedUserJSON)
    return { display: '' }

  const user = JSON.parse(loggedUserJSON);
  return { display: user.name === blog.user.name ? '' : 'none' };

}
