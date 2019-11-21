import React from 'react'
import { useState } from 'react'
import Pokeball from './PokeBall'
// import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../helpers/constants'
import { userService } from '../services'
import { authenticationActions } from '../actions'

const auth = (e, method) => {
	e.preventDefault()

	const loader = document.querySelector('.js-loader')

	const username = document.querySelector('.js-username').value
	const password = document.querySelector('.js-password').value

	// show loader
	loader.style.display = 'block'

	const controller = method === 'login' ? 
		'/auth/login' :
		'/auth/register'

	const data = {
		username,
		password
	}

	const loginResponse = axios.post(BASE_URL + controller, data)
		.then(response => {
			if(response.status === 200) return response
			return ''
		})

	console.log(loginResponse)
	// show loader
	loader.style.display = 'none'

	return loginResponse
}

const LoginPage = (props) => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	// const dispatch = useDispatch()
	// const loginMessage = useSelector(state => state.loginMessageReducer)

	const handleChange = e => {
		const { name, value } = e.target
		
		switch (name) {
			case 'username':
				setUsername(value)
				break
			case 'password':
				setPassword(value)
				break
			default:
				throw new Error()
		}
	}

	const handleSubmit = e => {
		if (username && password) {
			userService.login(username, password)
		}
	}

	return (
		<div className='login'>
			<div className='login__background'></div>
			<div className='login__form'>
				<input className='login__input js-username' type='text' placeholder='Username' name='username' onChange={handleChange} />
				<input className='login__input js-password' type='password' placeholder='Password' name='password' onChange={handleChange} />
				
				<button className='login__button' onClick={handleSubmit}>Login</button>
				<button className='login__button--register' onClick={e => { auth(e, 'register') }}>Register</button>
				<div className="login__loader js-loader">
					<Pokeball />
				</div>
			</div>

		</div>
	)
}

const actions = {
	login: authenticationActions.login
}

export default LoginPage