import { combineReducers } from 'redux'
import { loginReducer } from './_loginReducer'
import { coinReducer } from './_coinReducer'

export const reducers = combineReducers({
	loginReducer,
	coinReducer
})