const notificationAtStart = ''

export const notify = (message, delay) => {
    return async (dispatch) => {
        await dispatch({
            type: 'DISPLAY',
            message
        })
        setTimeout(async () => await dispatch({ type: 'CLEAR' }), delay * 1000)
    }
}

const notificationReducer = (state = notificationAtStart, action) => {
    console.log(action)
    switch (action.type) {
        case 'DISPLAY':
            return action.message
        case 'CLEAR':
            return ''
        default: return state
    }
}
export default notificationReducer