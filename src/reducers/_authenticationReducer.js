import { authenticationConstants } from '../helpers/constants'

let token = localStorage.getItem('token')

const initialState = token ? { loggedIn: true, token } : {}

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case authenticationConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case authenticationConstants.LOGIN_FAILURE:
            return {}
        default:
            return state
    }
}