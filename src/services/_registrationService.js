import { BASE_URL } from "../helpers/constants"

export const register = async (username, password) => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	}
	return fetch(BASE_URL + '/auth/register', requestOptions)
}