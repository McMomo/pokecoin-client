import { authenticationConstants } from '../helpers/constants'

const request = (username, password) => {
	return {
		type: authenticationConstants.LOGIN_REQUEST,
		payload: {
			username,
			password
		}
	}
}
const success = (token) => {
	return {
		type: authenticationConstants.LOGIN_SUCCESS,
		payload: {
			token
		}
	}
}

const failure = (error) => {
	return {
		type: authenticationConstants.LOGIN_FAILURE,
		payload: {
			error
		}
	}
}

const logout = () => {
	return {
		type: authenticationConstants.LOGOUT,
	}
}

export const authenticationActions = {
	request,
	success,
	failure,
	logout
}