import React from 'react'
import { createStore } from 'redux'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import Cards from './components/CardsPage'
import Home from './components/HomePage'
import Shop from './components/ShopPage'
import Mining from './components/MiningPage'
import NavBar from './components/NavBar'
import { Provider } from 'react-redux'

import LoginPage from './components/LoginPage'

import reducer from './reducers'

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar></NavBar>
        <LoginPage />
        <Switch>
          <Route exact path="/">
            <div><Home/></div>
          </Route>
          <Route exact path="/Cards">
            <div><Cards/></div>
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
