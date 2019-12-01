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
			console.log(data.token)
			Cookies.set('token', data.token, { expires: 1 })
			console.log('cookie set')
			return data
		})
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		if (!response.ok) {

			if (response.status === 400) {
				console.log('fuck')
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}

export const userService = {
	login
}