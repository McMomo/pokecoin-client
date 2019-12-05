import { shopConstants } from '../helpers/constants'

const initialState = { coinAmount: 0 }

export const shopReducer = (state = initialState, action) => {
	switch (action.type) {
		case shopConstants.BALANCE_SUCCESS:
			return {
				coinAmount: action.payload.amount
			}
		case shopConstants.BALANCE_FAILURE:
			return {
				coinAmount: 0,
				error: action.payload.error
			}
		default:
			return state
	}
}