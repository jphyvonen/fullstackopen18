const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    try {
        const body = req.body
        const exists = await User.find({username: body.username})

        if (exists.length > 0)
           return res.status(400).json({ error: 'Username already exists' })

        if (body.password.length < 3)
            return res.status(400).json(({ error: 'Password less than 3 characters' }))

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult === undefined ? true : body.adult,
            passwordHash
        })
        const savedUser = await user.save()

        res.json(User.format(savedUser))
        
    } catch (ex) {
        console.log(ex)
        res.status(500).json({ error: 'sumting wong' })
    }
})
const formatUser = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        blogs: user.blogs
    }
}

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({})
    .populate('blogs')
    response.json(users.map(formatUser))
})
module.exports = usersRouter