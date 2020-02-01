import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
	Link,
	useParams
} from 'react-router-dom'
import { shopService } from '../services';

const BoosterDetails = () => {

	const loggedIn = useSelector(state => state.loginReducer.loggedIn)

	let { boosterName } = useParams();

	const [booster, setBooster] = useState([])

	useAsyncEffect(async () => {
		const booster = await shopService.getBooster(boosterName)
		setBooster(booster.cards)
	}, [])

	const boosterCards = booster.map(cards => (
		<img className='boosterDetails__cards' key={cards.name} src={cards.imageUrl} alt={cards.name} />
	))

	return (
		<div className='boosterDetails'>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			<div className='boosterDetails__allCards'>
				{boosterCards}
			</div>
			<Link to={`/shop`} className='boosterDetails__backButton'>Go Back</ Link>
		</div>
	)
}

export default BoosterDetails