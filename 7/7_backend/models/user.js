const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    adult: Boolean,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})
userSchema.statics.format = function (blog) {
    return {
        username: blog.username,
        name: blog.name,
        adult: blog.adult,
        blogs: blog.blogs
    }
}
const User = mongoose.model('User', userSchema)
module.exports = User