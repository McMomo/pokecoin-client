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
						store.dispatch(authenticationActions.loginSuccess(user))
					},
					error => {
						store.dispatch(authenticationActions.loginFailure(error))
					}
				)
			return initialState
		case authenticationConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				token: Cookies.get('token')
			}
		case authenticationConstants.LOGIN_FAILURE:
			return {
				loggedIn: false,
				error: action.payload.error
			}
		case authenticationConstants.LOGOUT:
			Cookies.remove('token')
			return {
				loggedIn: false
			}
		case authenticationConstants.REGISTER_REQUEST:
			userService.register(action.payload.username, action.payload.password)
				.then(
					user => {
						store.dispatch(authenticationActions.registerSuccess(user))
					},
					error => {
						store.dispatch(authenticationActions.registerFailure(error))
					}
				)
			return {
				registrationComplete: false
			}
		case authenticationConstants.REGISTER_SUCCESS:
			return {
				registrationComplete: true,
			}
		case authenticationConstants.REGISTER_FAILURE:
			return {
				registrationComplete: false,
				error: action.payload.error
			}
		default:
			return state
	}
}