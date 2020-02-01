import { BASE_URL, httpStatus } from '../helpers/constants'
import { authenticationConstants } from '../helpers/constants'

const loginRequest = (username, password) => {
	return {
		type: authenticationConstants.LOGIN_REQUEST,
		payload: {
			username,
			password
		}
	}
}

const loginSuccess = (json) => {
	return {
		type: authenticationConstants.LOGIN_SUCCESS,
		payload: {
			token: json.token
		}
	}
}

const loginFailure = (error) => {
	return {
		type: authenticationConstants.LOGIN_FAILURE,
		payload: {
			error
		}
	}
}

const login = (username, password) => {

	// With Thunk Middleware you can dispatch a function which dispatches actions
	return function (dispatch) {

		dispatch(loginRequest(username, password))

		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password })
		}
		return fetch(BASE_URL + '/auth/login', requestOptions)
			.then(response => {
				if (response.status === httpStatus.OK) return response.json()
				else if (response.status === httpStatus.BAD_REQUEST) {
					throw new Error('Invalid Credentials')
				}
			})
			.then(json => {
				dispatch(loginSuccess(json))
			})
			.catch(error => {
				dispatch(loginFailure(error.message))
			})
	}
}

const logout = () => {
	return {
		type: authenticationConstants.LOGOUT,
	}
}

export const authenticationActions = {
	login,
	logout
}

