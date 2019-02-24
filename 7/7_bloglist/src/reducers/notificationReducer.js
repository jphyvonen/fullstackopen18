export const notify = (message, delay) => {
    return async (dispatch) => {
        await dispatch({
            type: 'DISPLAY',
            message
        })
        setTimeout(async () => await dispatch({ type: 'CLEAR' }), 5000)
    }
}

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'DISPLAY':
            return action.message
        case 'CLEAR':
            return ''
        default: return state
    }
}
export default notificationReducer