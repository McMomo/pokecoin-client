import React from 'react'
import { createStore } from 'redux'
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
import { Provider } from 'react-redux'

import LoginPage from './LoginPage'

import reducer from '../reducers'

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <LoginPage />
        <Switch>
          <Route exact path="/">
            <div><Home/></div>
          </Route>
          <Route exact path="/Cards">
            <div><CardsPage/></div>
          </Route>
          <Route exact path="/Shop">
            <div><Shop/></div>
          </Route>
          <Route exact path="/Mining">
            <div><Mining/></div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
