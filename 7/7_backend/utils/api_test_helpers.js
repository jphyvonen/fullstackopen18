const Blog = require('../models/blog')
const User = require('../models/user')
const bodyparser = require('body-parser')


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs
}
const usersInDb = async () => {
    const users = await User.find({})
    return users
}
const getPertsa = () => {
    const pertsa = User.findOne({ username: "Pertsa" })
    const pera = User.findById("5be9cb8f25906b00d0272efe")
    console.log(pertsa.schema.obj.username)
    return pertsa._id
}
const testBlog = {
    author: "Eelis Erkkilä",
    title: "Lanttulaatikkoreseptit",
    url: "lanttulaatikko.fi",
    likes: 9001,
    user: getPertsa()
}

module.exports = { blogsInDb, testBlog, usersInDb, getPertsa }