import { authenticationConstants } from '../helpers/constants'
import { store } from '../index'
import { userService } from '../services'
import { authenticationActions } from '../actions'
import Cookies from 'js-cookie'


let token = Cookies.get('token')

const initialState = token ? { loggedIn: true, token } : { loggedIn: false, token: null }

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case authenticationConstants.LOGIN_REQUEST:
            userService.login(action.payload.username, action.payload.password)
                .then(
                    user => {
                        store.dispatch(authenticationActions.success(user))
                    },
                    error => {
                        store.dispatch(authenticationActions.failure(error))
                    }
                )
            return initialState
        case authenticationConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                token: Cookies.get('token')
            }
        case authenticationConstants.LOGIN_FAILURE:
            return initialState
        default:
            return state
    }
}