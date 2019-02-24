import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="wrapper">
    <div className="authorDiv">
      {blog.title} {blog.author}
    </div>
    <div >
      blog has <div className="likesDiv">{blog.likes}</div> likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog