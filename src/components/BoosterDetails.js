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
import Pokeball from './PokeBall'

const BoosterDetails = () => {
	const [isLoading, setLoading] = useState(false)
	const loggedIn = useSelector(state => state.loginReducer.loggedIn)
	let { boosterName } = useParams();
	const [booster, setBooster] = useState([])

	useAsyncEffect(async () => {
		setLoading(true)
		const booster = await shopService.getBooster(boosterName)
		setBooster(booster.cards)
		setLoading(false)
	}, [])

	const boosterCards = booster.map(cards => (
		<img className='boosterDetails__cards' key={cards.name} src={cards.imageUrl} alt={cards.name} />
	))

	return (
		<div className='boosterDetails'>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			<div className='boosterDetails__allCards'>
				{boosterCards}
				{isLoading ? <div className='boosterDetails__loader'><Pokeball /></div> : ''}		
			</div>
			<div className='boosterDetails__textWrapper'>
				<Link to={`/shop`} className='boosterDetails__backButton'>Go Back</ Link>
			</div>
		</div>
	)
}

export default BoosterDetails