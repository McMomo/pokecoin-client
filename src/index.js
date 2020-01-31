import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore } from 'redux'
import { SnackbarProvider } from 'notistack';

import 'basiclightbox/dist/basicLightbox.min.css'
import './styles/main.scss'

import App from './components/App'
import {reducers} from './reducers'

const loggerMiddleware = createLogger()

export const store = createStore(
	reducers,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('root'))