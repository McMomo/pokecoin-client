import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return(
        <div className='topnav'>
          <Link className='topnav__item' to='/'>Home</Link>
          <Link className='topnav__item' to='/cards'>Cards</Link>
          <Link className='topnav__item' to='/shop'>Shop</Link>
          <Link className='topnav__item' to='/mining'>Mining</Link>
          <div className="topnav__section_right">
            <span className='topnav__item'>x Pokecoins</span>
            <Link className='topnav__item' to='/login'>Login</Link>
          </div>

      </div>
    );
}

export default NavBar
