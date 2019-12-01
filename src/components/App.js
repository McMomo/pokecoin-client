import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom'
import CardsPage from './CardsPage'
import Home from './HomePage'
import Shop from './ShopPage'
import Mining from './MiningPage'
import NavBar from './NavBar'
import LoginPage from './LoginPage'
import RegistrationPage from './RegistrationPage'

function App() {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path='/'>
					<div><Home /></div>
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
			</Switch>
		</Router>
	)
}

export default App
