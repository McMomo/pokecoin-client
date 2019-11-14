import React from 'react'
import { postData } from '../services/fetch'

const register = (e) => {
	e.preventDefault()

	const username = document.querySelector('.js-username').value
	const password = document.querySelector('.js-password').value

	const URL = 'https://rocky-lowlands-35145.herokuapp.com/auth/register'

	const data = {
		username,
		password
	}

	const result = postData(URL, data)

	console.log(result)
}

const LoginPage = (props) => {

	return (
		<div className="login">
			<form >
				<input className="login__input js-username" type="text" />
				<input className="login__input js-password" type="text" />
				<button type="submit" onClick={e => { register(e) }}>Register</button>
			</form>

		</div>
	)
}

export default LoginPage