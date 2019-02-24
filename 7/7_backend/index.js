const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const bodyParser = require('body-parser')
const middleWare = require('./utils/middleware')
const config = require('./utils/config')
const mongoose = require('mongoose')


mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('connected', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))
app.use(middleWare.logger)
app.use(middleWare.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleWare.error)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`server running on ${config.port}`)
})
server.on('close', () => {
  mongoose.connection.close()
})
module.exports = {
  app, server
}