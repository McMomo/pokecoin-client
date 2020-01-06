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
					<div>
						<p>Your new cards!</p>
						${boughtCards.map(card => (
							`<img key=${card.id} src=${card.imageUrl} alt=${card.name} />`
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

	const boosterlist = boosterNames.map(name => (
		<div key={name}>
			<p>{name}</p>
			<img key={name} src={`${ Base }`} alt={name}/>
			<Link to={`/shop/${ name }`}>Show what could be inside the booster</ Link>
			<form className='shop__form'>
				<button className='shop__button' type='submit' onClick={ 
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
			<div>
				{boosterlist}
			</div>
		</div>
	)
}

export default ShopPage