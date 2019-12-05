import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../helpers/constants'
import { useAsyncEffect } from 'use-async-effect'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

const fetchCards = async (page) => {
	const list = await axios.get(BASE_URL + `/cards?page=${page}`)
	return list.data.cards
}

const CardsPage = () => {

	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)
	const [cards, setCards] = useState([])

	useAsyncEffect(async () => {
		const cards = await fetchCards(0)
		setCards(cards)
	}, [])

	const cardList = cards.map(card => (
		<img key={card.name} src={card.imageUrl} alt={card.name} />
	))

	return (
		<div>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			{cardList}
		</div>
	)
}

export default CardsPage