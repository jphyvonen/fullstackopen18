const bodyParser = require('body-parser')
const blogsRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
blogsRouter.use(bodyParser.json())

const Blog = require('../models/blog')



blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {
  try {
    console.log('hit')
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id)
      return response.status(401).json({ error: 'token either missing or invalid' })


    const body = formatBody(request.body)
    if (body.url === undefined || body.title === undefined)
      return response.status(400).json({ error: 'bad request' })

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(Blog.format(blog))

  } catch (ex) {
    console.log(ex)
    response.status(500).json({ error: 'something went wrong' })
  }
})


blogsRouter.get('/:id', (req, res) => {
  Blog
    .findById(req.params.id)
    .then(blog => {
      res.json(blog)
    })
})
blogsRouter.delete('/:id', async (req, res) => {
  try {
    const token = req.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(req.params.id)

    if (blog.user === undefined || user === null)
      await Blog.findByIdAndDelete(req.params.id)
    else if (user._id.toString() === blog.user._id.toString())
      await Blog.findByIdAndDelete(req.params.id)
    else
      return res.status(400).json({ error: 'You are not authorized to delete this blog' })

    res.status(204).end()
  } catch (ex) {
    res.status(400).send({ error: "malformatted id" })
  }
})
blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try {
    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

    res.json(blog)
  } catch (ex) {
    console.log(ex)
    res.status(400).send({ error: "malformatted id" })
  }
})
const formatBody = (body) => {
  if (body.likes)
    return body
  else {
    const newBody = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0
    }
    return newBody
  }
}
module.exports = blogsRouter