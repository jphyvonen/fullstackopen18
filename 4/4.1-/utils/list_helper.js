const blogs = require('../utils/hard_coded_blogs')
const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const reducer = (total, item) => {
        return total + item
    }
    return blogs.map(x => x.likes).reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? 0 :
        formatReturn(
            blogs.find(x => Math.max(...blogs.map(x => x.likes)) === x.likes))

}
const mostBlogs = (blogs) => {
    var arr = new Array()

    var authors = blogs.map(x => x.author)
    var counted = authors.reduce((allNames, name) => {
        if (name in allNames) {
            allNames[name]++
        }
        else
            allNames[name] = 1;
        return allNames
    }, {})
    for (name in counted) {
        arr.push({
            name: name,
            count: counted[name]
        })
    }

    return arr.find(x => x.count === Math.max(...arr.map(x => x.count)))
}
const mostLikes = (blogs) => {
    var authorsAndLikes = blogs.map(o => ({ author: o.author, likes: o.likes }))
    var most = authorsAndLikes.reduce((all, name) => {
        if (name.author in all) {
            all[name.author] += name.likes
        }
        else
            all[name.author] = name.likes
        return all
    }, {})
    var arr = new Array()
    for (name in most) {
        arr.push({
            author: name,
            likes: most[name]
        })
    }
    return arr.find(x => x.likes === Math.max(...arr.map(x => x.likes)))
}
const formatReturn = (result) => {
    return {
        title: result.title,
        author: result.author,
        likes: result.likes
    }
}
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }