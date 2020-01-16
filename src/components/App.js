import React from 'react'
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

function App() {
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
		</Router>
	)
}

export default App
