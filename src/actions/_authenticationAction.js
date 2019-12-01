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
const loginSuccess = (token) => {
	return {
		type: authenticationConstants.LOGIN_SUCCESS,
		payload: {
			token
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

const logout = () => {
	return {
		type: authenticationConstants.LOGOUT,
	}
}

const registerRequest = (username, password) => {
	return {
		type: authenticationConstants.REGISTER_REQUEST,
		payload: {
			username,
			password
		}
	}
}

const registerSuccess = (username) => {
	return {
		type: authenticationConstants.REGISTER_SUCCESS,
		payload: {
			username
		}
	}
}

const registerFailure = (error) => {
	return {
		type: authenticationConstants.REGISTER_FAILURE,
		payload: {
			error
		}
	}
}

export const authenticationActions = {
	loginRequest,
	loginSuccess,
	loginFailure,
	logout,
	registerRequest,
	registerSuccess,
	registerFailure,
}