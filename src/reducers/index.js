import { combineReducers } from 'redux'
import { authenticationReducer } from './_authenticationReducer'
import { coinReducer } from './_coinReducer'

export const reducers = combineReducers({
	authenticationReducer,
	coinReducer
})