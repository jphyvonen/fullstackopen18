import loginService from '../services/login'
import blogService from '../services/blogs'

export const actionForLogin = (username, password) => {
    return async (dispatch) => {

        const user = await loginService.login({ username, password })
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        await dispatch({
            type: 'LOGIN',
            user
        })
    }
}
export const actionForSettingUser = (user) => {
    return async (dispatch) => {
        await blogService.setToken(user.token)
        await dispatch({
            type: 'SET',
            user
        })
    }
}
export const actionForLogout = () => {
    return async (dispatch) => {
        await dispatch({
            type: 'LOGOUT',
        })
        window.localStorage.removeItem('loggedUser')
    }
}

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'SET':
            return action.user
        case 'LOGOUT':
            return null
    }
    return state
}
export default userReducer