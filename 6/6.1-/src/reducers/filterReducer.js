export const changeFilter = (filter) => {
    return {
        type: 'FILTER_CHANGE',
        filter
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'FILTER_CHANGE':
            return action.filter
        default:
            return state
    }
}
export default filterReducer