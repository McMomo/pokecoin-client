import { authenticationConstants } from '../helpers/constants'
import { store } from '../index'
import { userService } from '../services'
import {  authenticationActions } from '../actions'


let token = localStorage.getItem('token')

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
        case authenticationConstants.LOGIN_SUCCESS:
            console.log('success')
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