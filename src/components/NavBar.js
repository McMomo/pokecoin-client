import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return(
        <div className="topnav">
        <Link to="/">Home</Link>
        <Link to="/Cards">Cards</Link>
        <Link to="/Shop">Shop</Link>
        <Link to="/Mining">Mining</Link>
        <a>x Pokecoins</a>
      </div> 
    );
}

export default NavBar;
