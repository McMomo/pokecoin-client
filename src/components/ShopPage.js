import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAsyncEffect } from 'use-async-effect'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { shopService } from '../services'
import * as basicLightbox from 'basiclightbox'
import Base from '../images/Charizard_Booster-2.png'
import { useDispatch } from 'react-redux'
import { fetchCoins } from '../actions'

const ShopPage = () => {

	const dispatch = useDispatch()

	const token = useSelector(state => state.loginReducer.token)

	const loggedIn = useSelector(state => state.loginReducer.loggedIn)
	const [boosterNames, setBoosterNames] = useState([])
	const [boosterPrice, setBoosterPrice] = useState([])
	const [boughtCards, setBoughtCards] = useState([])
	const [toBuyBooster, settoBuyBooster] = useState([])

	useAsyncEffect(async () => {
		const boosterNames = await shopService.getBoosterList()
		setBoosterNames(boosterNames)
	}, [])

	useAsyncEffect(async () => {
		const boosterPrice = await shopService.getBoosterPrice()
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
				const newBooster = await shopService.getBuyNewBooster(toBuyBooster)
				setBoughtCards(newBooster.cards)
				settoBuyBooster([])
			}
		}
		asyncBuyBooster()
		dispatch(fetchCoins(token))
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