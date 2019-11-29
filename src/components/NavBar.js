import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authenticationActions } from '../actions'

const NavBar = () => {

  const dispatch = useDispatch()

  const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)

  const handleLogout = () => {
    dispatch(authenticationActions.logout())
  }

  return (
    <div className='topnav'>
      <Link className='topnav__item' to='/'>Home</Link>
      <Link className='topnav__item' to='/cards'>Cards</Link>
      <Link className='topnav__item' to='/shop'>Shop</Link>
      <Link className='topnav__item' to='/mining'>Mining</Link>
      <div className='topnav__section_right'>
        <span className='topnav__item'>x Pokecoins</span>
        {!loggedIn ?
          <Link className='topnav__item' to='/login'>Login</Link> :
          <div className='topnav__item' onClick={handleLogout}>Logout</div>}

      </div>

    </div>
  )
}

export default NavBar
