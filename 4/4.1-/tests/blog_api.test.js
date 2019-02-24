const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const hardcodedBlogs = require('../utils/hard_coded_blogs')
const { blogsInDb, testBlog, getPertsa } = require('../utils/api_test_helpers')

describe('when there are initially some blogs saved', async () => {

    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = hardcodedBlogs.map(n => new Blog(n))
        await Promise.all(blogObjects.map(n => n.save()))
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await blogsInDb()

        const res = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(res.body.length).toBe(blogsInDatabase.length)
        const returnedTitles = res.body.map(n => n.title)
        blogsInDatabase.forEach(element => {
            expect(returnedTitles).toContain(element.title)
        })

    })
    describe('addition of a new blog', async () => {

        test('blog is posted', async () => {

            const user = {
                username: "Pertsa",
                password: "salainen"
            }
            const login = await api
                .post('/api/login')
                .send(user)
                .expect(200)

            const blogsBefore = await blogsInDb()

            const req = await api
                .post('/api/blogs')
                .send(testBlog)
                .set('Accept', 'application/json')
                .set({ Authorization: `bearer ${login.body.token}` })
                .expect(201)

            const blogsAfter = await blogsInDb()
            expect(blogsAfter.length).toBe(blogsBefore.length + 1)
            expect(req.status).toBe(201)
        })

        test('blog posted with empty likes has 0 likes', async () => {
            const user = {
                username: "Pertsa",
                password: "salainen"
            }
            const login = await api
                .post('/api/login')
                .send(user)
                .expect(200)
            const req = await api
                .post('/api/blogs')
                .send(
                    {
                        author: testBlog.author,
                        title: "test",
                        url: testBlog.url
                    })
                .expect(201)
                .set({ Authorization: `bearer ${login.body.token}` })
                .expect('Content-Type', /application\/json/)
            const allBlogs = await blogsInDb()
            const blogToTest = allBlogs.find(x => x.title === "test")
            expect(blogToTest.likes).toBe(0)
        })
        test('blog posted with no url or title returns 400', async () => {
            const user = {
                username: "Pertsa",
                password: "salainen"
            }
            const login = await api
                .post('/api/login')
                .send(user)
                .expect(200)
            const req = await api
                .post('/api/blogs')
                .send(
                    {
                        author: testBlog.author,
                    })
                .set({ Authorization: `bearer ${login.body.token}` })
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })
    const User = require('../models/user')
    const { format, initialBlogs, nonExistingId, blogsInDb, usersInDb } = require('../utils/api_test_helpers')

    describe('when there is one user at db', async () => {
        beforeAll(async () => {
            await User.remove({})
            const user = new User({ username: 'root', password: 'sekret' })
            await user.save()
        })

        test('post /api/users succeeds with a fresh username', async () => {
            const usersBeforeOperation = await usersInDb()

            const newUser = {
                username: 'MARA',
                name: 'Marko Ahtisaari',
                password: 'sikrit'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAfterOperation = await usersInDb()
            expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
            const usernames = usersAfterOperation.map(x => x.username)
            expect(usernames).toContain(newUser.username)
        })
        test('Duplicate users cannot be posted', async () => {

            const newUser = {
                username: 'Pertsa',
                name: 'Pertti Jukuri',
                password: 'salainen'
            }
            await api
                .post('/api/users')
                .send(newUser)

            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
        test('Password length cannot be less than 3', async () => {
            const newUser = {
                username: 'Pertsa',
                name: 'Pertti Jukuri',
                password: 'sa'
            }
            await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
        })
    })
    afterAll(() => {
        server.close()
    })
})