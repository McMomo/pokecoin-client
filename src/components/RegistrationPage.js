import React from 'react'
import { useState } from 'react'
import Pokeball from './PokeBall'
import { authenticationActions } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const RegistrationPage = (props) => {

	const dispatch = useDispatch()

	const registrationComplete = useSelector(state => state.authenticationReducer.registrationComplete)
	const error = useSelector(state => state.authenticationReducer.error)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [submitted, setSubmitted] = useState(false)

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
			dispatch(authenticationActions.registerRequest(username, password))
		}
	}

	return (
		<div className='login'>
			{registrationComplete ? <Redirect to='/login' /> : ''}
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