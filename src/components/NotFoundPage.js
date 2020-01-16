import React from 'react'

const NotFoundPage = () => {
	return (
		<div className="notFoundPage">
			<div className="notFoundPage__textWrapper">
				<div className="notFoundPage__statusCode">404</div>
				<div className="notFoundPage__errorText">You're alone - <br />No Pokémon are present</div>
				<div className="notFoundPage__infoText">The requested URL is not available</div>
			</div>
		</div>
	)
}

export default NotFoundPage