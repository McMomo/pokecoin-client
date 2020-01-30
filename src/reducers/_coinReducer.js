import { coinConstants } from '../helpers/constants'

export const coinReducer = (state = {
		isFetching: false,
		amount: 0
	}, action) => {
	switch (action.type) {
		case coinConstants.REQUEST_COINS:
			return Object.assign({}, state, {
				isFetching: true,
			})
		case coinConstants.RECEIVE_COINS:
			return Object.assign({}, state, {
				isFetching: false,
				amount: action.amount,
				lastUpdated: action.receivedAt
			})
		default:
			return state
	}
}