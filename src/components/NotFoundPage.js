import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NotFoundPage = () => {
	return (
		<div className="notFoundPage">
			<div className="notFoundPage__textWrapper">
				<div className="notFoundPage__statusCode">404</div>
				<div className="notFoundPage__errorText">You're alone - <br />No Pokémon are present</div>
				<div className="notFoundPage__infoText">The requested URL is not available. Please go <NavLink to="/" style={{color: 'darkred'}}>Home</NavLink></div>
			</div>
		</div>
	)
}

export default NotFoundPage