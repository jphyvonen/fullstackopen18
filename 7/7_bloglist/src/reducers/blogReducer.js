import blogService from '../services/blogs'

export const actionForCreating = (content) => {
    return async (dispatch) => {
        const blog = {
            author: content.author,
            title: content.title,
            url: content.url,
            likes: 0
        }
        await blogService.create(blog)
        const newState = await blogService.getAll()
        dispatch({
            type: 'CREATE',
            data: newState
        })
    }
}
export const actionForLike = (blog) => {
    return async (dispatch) => {
        const likedBlog = {
            user: blog.user,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        await blogService.update(blog._id, likedBlog)
        const newState = await blogService.getAll()
        dispatch({
            type: 'LIKE',
            data: newState
        })
    }
}
export const actionForDelete = (blog) => {
    return async (dispatch) => {
        if (window.confirm(`Are you sure you want to delete '${blog.title}' by ${blog.author}`)) {
            await blogService.remove(blog._id)
            dispatch({
                type: 'DELETE',
                data: blog
            })
        }
    }
}
export const initBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}
const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'CREATE':
            return action.data
        case 'INIT':
            return action.data
        case 'LIKE':
            return action.data
        case 'DELETE':
            return state.filter(x => x._id !== action.data._id)
    }
    return state
}
export default blogReducer