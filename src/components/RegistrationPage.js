import React from 'react'
import { useState } from 'react'
import Pokeball from './PokeBall'
import { Redirect } from 'react-router-dom'
import { register } from '../services/_registrationService'
import { httpStatus } from '../helpers/constants'

const RegistrationPage = (props) => {


	const [error, setError] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

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
		e.preventDefault()
		if (username && password) {
			setSubmitted(true)
			register(username, password)
				.then(response => {
					if(response.status === httpStatus.OK) {
						setRegistrationSuccessful(true)
					}
					else if(response.status === httpStatus.BAD_REQUEST) {
						throw new Error('Username already exists')
					}
					else
						throw new Error('Something went wrong')
				})
				.catch(error => {
					setError(error.message)
					setSubmitted(false)
				})
		}
	}

	return (
		<div className='login'>
			{registrationSuccessful ? <Redirect to='/login' /> : ''}
			<div className='login__background login__background--register'></div>
			<form className='login__form'>
				<input className='login__input js-username' type='text' placeholder='Username' name='username' onChange={handleChange} />
				<input className='login__input js-password' type='password' placeholder='Password' name='password' onChange={handleChange} />
				{error ? <div className='login__error'>{error}</div> : ''}
				<button className='login__button' type='submit' onClick={handleSubmit}>Register</button>
				{submitted && !error ? <div className='login__loader js-loader'><Pokeball /></div> : ''}
			</form>
		</div>
	)
}

export default RegistrationPage