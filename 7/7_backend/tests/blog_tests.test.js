const listHelper = require('../utils/list_helper')
const blogs = require('../utils/hard_coded_blogs')
describe('dummy', () => {
    test('dummy is called', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {

    test('when list has only one blog', () => {
        const result = listHelper.totalLikes(new Array(blogs[0]))
        expect(result).toBe(7)
    })
    test('of bigger list', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(new Array())
        expect(result).toBe(0)
    })
})

describe('favorite of all blogs', () => {
    test('from a list of many', () => {
        const testResult = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(testResult)
    })
})
describe('most blog entries', () => {
    test('from all blogs', () => {
        const testResult = {
            name: 'Robert C. Martin',
            count: 3
        }
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(testResult)
    })
})
describe('most liked entries', () => {
    test('from all blogs', () => {
        const testResult = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(testResult)
    })
})