import { BASE_URL } from '../helpers/constants'
import Cookies from 'js-cookie'

const login = (username, password) => {

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	}

	return fetch(BASE_URL + '/auth/login', requestOptions)
		.then(handleResponse)
		.then(data => {
			Cookies.set('token', data.token, { expires: 1 })
			return data
		})
}

const register = (username, password) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	}

	return fetch(BASE_URL + '/auth/register', requestOptions)
		.then(handleResponse)
		.then(data => {
			return data
		})
}

const fetchWalletBalance = async (token) => {

	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'token': token
		},
	}
	return fetch(BASE_URL + '/wallet/balance', requestOptions)
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		if (!response.ok) {

			if (response.status === 400) {
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}
		return data
	})
}

export const userService = {
	login,
	register,
	fetchWalletBalance
}