import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authenticationActions, shopActions } from '../actions'
import Eevee from '../images/eevee-patreon.png'
import { userService } from '../services'
import { useAsyncEffect } from 'use-async-effect'

const NavBar = () => {

	const dispatch = useDispatch()

	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)

	const coinAmount = useSelector(state => state.shopReducer.coinAmount)

	const token = useSelector(state => state.authenticationReducer.token)

	const handleLogout = () => {
		dispatch(authenticationActions.logout())
	}

	const fetchCoins = async () => {
		try {
			const response = await userService.fetchWalletBalance(token)
			if(!response.ok) throw new Error(response.error)
			const data = await response.json()
			dispatch(shopActions.balanceSuccess(data.amount))
		} catch (error) {
			console.error(error)
		}
	}

	useAsyncEffect(() => fetchCoins() ,[loggedIn])

	return (

		<div className='topnav'>
			<Link className='topnav__item' to='/cards'>Cards</Link>
			<Link className='topnav__item' to='/shop'>Shop</Link>
			<Link className='topnav__item' to='/mining'>Mining</Link>
			<div className='topnav__section_right'>
				{loggedIn ? <span className='topnav__item topnav__item--noEffect'>{coinAmount} PokéCoins<img src={Eevee} className="topnav__coin" alt="Eevee piggy bank" /></span> : ''}

				{!loggedIn ?
					<Link className='topnav__item' to='/login'>Login</Link> :
					<div className='topnav__item' onClick={handleLogout}>Logout</div>
				}

			</div>
		</div>
	)
}

export default NavBar