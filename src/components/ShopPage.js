import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAsyncEffect } from 'use-async-effect'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { 
	getBoosterList,
	getBoosterPrice
} from '../services/_shopServices'

import Base from '../images/Charizard_Booster-2.png'

const ShopPage = () => {
	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)
	const [boosterNames, setBoosterNames] = useState([])
	const [boosterPrice, setBoosterPrice] = useState([])

	useAsyncEffect(async () => {
		const boosterNames = await getBoosterList()
		setBoosterNames(boosterNames)
	}, [])

	useAsyncEffect(async () => {
		const boosterPrice = await getBoosterPrice()
		setBoosterPrice(boosterPrice)
	}, [])

	const boosterlist = boosterNames.map(name => (
		<div key={name}>
			<p>{name}</p>
			<img key={name} src={`${ Base }`} alt={name}/>
			<Link to={`/shop/${ name }`}>Show what could be inside the booster</ Link>
			<p>Buy for {boosterPrice} Pokecoins</p>
		</ div>
	))

	return (
		<div>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			{boosterlist}
		</div>
	)
}

export default ShopPage
