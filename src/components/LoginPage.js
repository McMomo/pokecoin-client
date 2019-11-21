import React from 'react'
import { postData, get } from '../helpers/fetch'
import Pokeball from './PokeBall'
import {useDispatch, useSelector} from 'react-redux'
import {loginFailedAction} from '../actions'

const auth = (e, method) => {
	e.preventDefault()

	const loader = document.querySelector('.js-loader')

	const username = document.querySelector('.js-username').value
	const password = document.querySelector('.js-password').value

	// show loader
	loader.style.display = 'block'

	const URL = method === 'login' ? 
		'https://rocky-lowlands-35145.herokuapp.com/auth/login' :
		'https://rocky-lowlands-35145.herokuapp.com/auth/register'

	const data = {
		username,
		password
	}

	let errmsg = ''

	const result = get(URL, data)
		.then(response => {
			console.log("sollte nicht hier sein")
			console.log(response)
		})
		.catch(err => {
			console.log("BIN HIER")
			console.error(err.message)
			errmsg = err.message
		})
		.finally(() => {
			loader.style.display = 'none'
		})

	console.log(loginFailedAction(errmsg))
	return loginFailedAction(errmsg)
}

const LoginPage = (props) => {

	const dispatch = useDispatch()
	const loginMessage = useSelector(state => state.loginMessageReducer)

	return (
		<div className='login'>
			<div className='login__background'></div>
			<div className='login__form'>
				<input className='login__input js-username' type='text' placeholder='Username' />
				<input className='login__input js-password' type='password' placeholder='Password'/>
				
				<button className='login__button' onClick={e => { dispatch(auth(e, 'login')) }}>Login</button>
				<button className='login__button--register' onClick={e => { dispatch(auth(e, 'register')) }}>Register</button>
				<div className="login__loader js-loader">
					<Pokeball />
				</div>
				{loginMessage ? <div className="login__error">{loginMessage}</div> : '' }
			</div>
		</div>
	)
}

export default LoginPage