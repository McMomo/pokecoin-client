import { authenticationConstants } from '../helpers/constants'
import Cookies from 'js-cookie'


let token = Cookies.get('token')

const initialState = token ?
	{ loggedIn: true, token, isFetching: false } : { loggedIn: false, token: null, isFetching: false }

export const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case authenticationConstants.LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case authenticationConstants.LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				loggedIn: true,
				token: action.payload.token
			})
		case authenticationConstants.LOGIN_FAILURE:
			return {
				loggedIn: false,
				error: action.payload.error
			}
		case authenticationConstants.LOGOUT:
			return Object.assign({}, state, {
				isFetching: false,
				loggedIn: false,
				token: null
			})
		default:
			return state
	}
}