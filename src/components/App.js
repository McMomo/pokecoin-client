import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import CardsPage from './CardsPage'
import Shop from './ShopPage'
import Mining from './MiningPage'
import NavBar from './NavBar'
import LoginPage from './LoginPage'
import BoosterDetails from './BoosterDetails'
import RegistrationPage from './RegistrationPage'
import NotFoundPage from './NotFoundPage'

import {ToastsContainer, ToastsStore} from 'react-toasts';
import {ToastsContainerPosition} from 'react-toasts'
import { useSelector } from 'react-redux'

function App() {

	const loggedIn = useSelector(state => state.loginReducer.loggedIn)
	const token = useSelector(state => state.loginReducer.token)

	useEffect(() => {
		if(loggedIn && token !== null) {
			Cookies.set('token', token)
		} else {
			Cookies.remove('token', { path: ''})
		}

	}, [token, loggedIn])

	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path='/'>
					<Redirect to='/mining' />
				</Route>
				<Route exact path='/cards'>
					<div><CardsPage /></div>
				</Route>
				<Route exact path='/shop'>
					<div><Shop /></div>
				</Route>
				<Route exact path='/mining'>
					<div><Mining /></div>
				</Route>
				<Route path='/login'>
					<LoginPage />
				</Route>
				<Route path='/register'>
					<RegistrationPage />
				</Route>
				<Route path='/shop/:boosterName'>
					<BoosterDetails />
				</Route>
				<Route component={NotFoundPage} />
			</Switch>
			<ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} lightBackground/>
		</Router>
	)
}

export default App
