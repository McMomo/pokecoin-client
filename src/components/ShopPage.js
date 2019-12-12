import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAsyncEffect } from 'use-async-effect'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { 
	getBoosterList,
	getBoosterPrice,
	getBuyNewBooster
} from '../services/_shopServices'

import Base from '../images/Charizard_Booster-2.png'

const ShopPage = () => {
	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)
	const [boosterNames, setBoosterNames] = useState([])
	const [boosterPrice, setBoosterPrice] = useState([])
	const [boughtBooster, setBoughtBooster] = useState([])
	const [toBuyBooster, settoBuyBooster] = useState([])

	useAsyncEffect(async () => {
		const boosterNames = await getBoosterList()
		setBoosterNames(boosterNames)
	}, [])

	useAsyncEffect(async () => {
		const boosterPrice = await getBoosterPrice()
		setBoosterPrice(boosterPrice)
	}, [])

	useAsyncEffect(() => {
		async function asyncBuyBooster() {
			if (toBuyBooster.length > 0) {
				const newBooster = await getBuyNewBooster(toBuyBooster)
				setBoughtBooster(newBooster)
				console.log(boughtBooster) 
				// use shit from dennis
				settoBuyBooster([])
			}
		}
		asyncBuyBooster()
	}, [toBuyBooster])

	const boosterlist = boosterNames.map(name => (
		<div key={name}>
			<p>{name}</p>
			<img key={name} src={`${ Base }`} alt={name}/>
			<Link to={`/shop/${ name }`}>Show what could be inside the booster</ Link>
			<form className='buy__form'>
				<button className='buy__button' type='submit' onClick={ 
					(e) => {
						e.preventDefault()
						settoBuyBooster(name)
					}
				}>
					Buy for {boosterPrice} Pokecoins
				</button>
			</form>
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