import { BASE_URL, coinConstants } from '../helpers/constants'

function requestCoins() {
	return {
		type: coinConstants.REQUEST_COINS
	}
}

function receiveCoins(json) {
	return {
		type: coinConstants.RECEIVE_COINS,
		amount: json.amount,
		receivedAt: Date.now()
	}
}

export function fetchCoins(token) {

	// With Thunk Middleware you can dispatch a function which dispatches actions
	return function (dispatch) {

		dispatch(requestCoins())

		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': token
			},
		}
		return fetch(BASE_URL + '/wallet/balance', requestOptions)
			.then(
				response => response.json(),
				error => console.error('An error occurred.', error)
			)
			.then(json =>
				dispatch(receiveCoins(json))
			)
	}
}