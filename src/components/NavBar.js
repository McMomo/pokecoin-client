import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return(
        <div className="topnav">
          <Link to="/">Home</Link>
          <Link to="/Cards">Cards</Link>
          <Link to="/Shop">Shop</Link>
          <Link to="/Mining">Mining</Link>
          <p>x Pokecoins</p>
      </div>
    );
}

export default NavBar
