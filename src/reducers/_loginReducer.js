export const loginMessageReducer = (state = '', action) => {
    if(action.type === 'LOGIN_FAILED') {
        return action.payload
    } else {
        return state
    }
}