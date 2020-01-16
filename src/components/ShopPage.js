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
import * as basicLightbox from 'basiclightbox'
import Base from '../images/Charizard_Booster-2.png'

const ShopPage = () => {
	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)
	const [boosterNames, setBoosterNames] = useState([])
	const [boosterPrice, setBoosterPrice] = useState([])
	const [boughtCards, setBoughtCards] = useState([])
	const [toBuyBooster, settoBuyBooster] = useState([])

	useAsyncEffect(async () => {
		const boosterNames = await getBoosterList()
		setBoosterNames(boosterNames)
	}, [])

	useAsyncEffect(async () => {
		const boosterPrice = await getBoosterPrice()
		setBoosterPrice(boosterPrice)
	}, [])

	useAsyncEffect(async () => {
		if (boughtCards.length > 0) {
			basicLightbox.create(`
					<div className='shop__boughtCards'>
						<p className='shop__boughtCardText'>Your new cards!</p>
						${boughtCards.map(card => (
				`<img className='shop__boughtCardImage' key=${card.id} src=${card.imageUrl} alt=${card.name} />`
			))}
					</div>
				`).show()
			setBoughtCards([])
		}
	}, [boughtCards])

	useAsyncEffect(() => {
		async function asyncBuyBooster() {
			if (toBuyBooster.length > 0) {
				const newBooster = await getBuyNewBooster(toBuyBooster)
				setBoughtCards(newBooster.cards)
				settoBuyBooster([])
			}
		}
		asyncBuyBooster()
	}, [toBuyBooster])


	return (
		<div className='shop'>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			{boosterNames.map(name => (
				<div className='shop__booster' key={name}>
					<p className='shop__boosterName'>{name}</p>
					<img className='shop__boosterImage' key={name} src={`${Base}`} alt={name} />
					<Link to={`/shop/${name}`} className='shop__link'>Show what could be inside the booster</ Link>
					<form className='shop__form'>
						<button className='shop__buyButton' type='submit' onClick={
							(e) => {
								e.preventDefault()
								settoBuyBooster(name)
							}
						}>
							Buy for {boosterPrice} Pokecoins
					</button>
					</form>
				</ div>
			))}
		</div>
	)
}

export default ShopPage