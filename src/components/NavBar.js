import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authenticationActions, fetchCoins } from '../actions'
import Eevee from '../images/eevee-patreon.png'

const NavBar = () => {

	const dispatch = useDispatch()

	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)

	const coinAmount = useSelector(state => state.coinReducer.amount)


	const handleLogout = () => {
		dispatch(authenticationActions.logout())
	}

	useEffect(() => {
		dispatch(fetchCoins())
	}, [dispatch])

	return (

		<div className='topnav'>
			<NavLink className='topnav__item' to='/cards' activeClassName="active">Cards</NavLink>
			<NavLink className='topnav__item' to='/shop'>Shop</NavLink>
			<NavLink className='topnav__item' to='/mining'>Mining</NavLink>
			<div className='topnav__section_right'>
				{loggedIn ? <span className='topnav__item topnav__item--noEffect'>{coinAmount} PokéCoins<img src={Eevee} className="topnav__coin" alt="Eevee piggy bank" /></span> : ''}

				{!loggedIn ?
					<NavLink className='topnav__item' to='/login'>Login</NavLink> :
					<div className='topnav__item' onClick={handleLogout}>Logout</div>
				}

			</div>
		</div>
	)
}

export default NavBar