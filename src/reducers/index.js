import { combineReducers } from 'redux'
import { authenticationReducer } from './_authenticationReducer'
import { shopReducer } from './_shopreducer'

export const reducers = combineReducers({
	authenticationReducer,
	shopReducer
})