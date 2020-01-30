import { BASE_URL, coinConstants } from '../helpers/constants'
import { store } from '../index'

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

export const coinActions = {
	requestCoins,
	receiveCoins
}

export function fetchCoins() {

	// With Thunk Middleware you can dispatch a function which dispatches actions
	return function (dispatch) {

		dispatch(requestCoins())

		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'token': store.getState().authenticationReducer.token
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