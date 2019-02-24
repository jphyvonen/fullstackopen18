const mongoose = require('mongoose')

const Schema = mongoose.Schema
const BlogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})
BlogSchema.statics.format = function (blog) {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user
  }
}
const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog