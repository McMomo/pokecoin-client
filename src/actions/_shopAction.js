import { shopConstants } from '../helpers/constants'

const balanceSuccess = (amount) => {
	return {
		type: shopConstants.BALANCE_SUCCESS,
		payload: {
			amount
		}
	}
}

const balanceFailure = (error) => {
	return {
		type: shopConstants.BALANCE_SUCCESS,
		payload: {
			error
		}
	}
}

export const shopActions = {
	balanceSuccess,
	balanceFailure
}