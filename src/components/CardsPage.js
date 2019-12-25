import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
	fetchCards,
	fetchUserCards,
	fetchOneCard
} from '../services/_cardsServices'
import Card from './Card'


const CardsPage = () => {
	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)
	const [cards, setCards] = useState([]) // All cards of one page
	const [showUserCards, setShowUserCards] = useState(true) // Checks what cards should be shown (false=all or true=user)
	const [currentPage, setCurrentPage] = useState(0) // Current page of all Cards
	const [nextPageExists, setNextPageExists] = useState() // Is true when more pages are avaivable

	//Gets the cards from currentPage+1 and checks if there are cards
	const checkIfNextPageExists = async () => {
		const cards = await fetchCards(currentPage + 1)
		setNextPageExists(cards.length > 0 ? true : false)
	}

	//Gets UserCards from BE
	const getUserCards = async () => {
		const userCards = await fetchUserCards()
		const cards = []

		for (let i = 0; i < userCards.length; i++) {
			const card = await fetchOneCard(userCards[i].cardId)
			cards.push(card)
		}
		setCards(cards)
	}

	//Gets all cards from a given Page from BE
	const getPaginatedCards = async () => {
		const cards = await fetchCards(currentPage)
		setCards(cards)
	}

	//Changes CardList State when Button was toggled
	useAsyncEffect(async () => {
		if (showUserCards) {
			await getUserCards()
		} else {
			await getPaginatedCards()
			checkIfNextPageExists()
		}
	}, [showUserCards])

	//Gets the cards of a given page when currentPage is changed
	useAsyncEffect(async () => {
		if (!showUserCards) {
			await getPaginatedCards()
			checkIfNextPageExists()
		}
	}, [currentPage])

	return (
		<div>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			<div id="ergebnis" className="ergebnis">
				Es werden {showUserCards ? 'deine' : 'alle'} Karten gezeigt.
			</div>
			<form className='toggle__form'>
				<button className='toggle__button' onClick={
					(e) => {
						e.preventDefault()
						setShowUserCards(!showUserCards)
					}
				}>
					{showUserCards ? 'Show all cards' : 'Show my cards'}
				</button>
			</form>
			<div>
				{cards.map(card => (
					<Card key={card.id} id={card.id} imageUrl={card.imageUrl} name={card.name}/>
				))}
			</div>
			{showUserCards ? "" :
				<div className='pagination'>
					{currentPage > 0 ?
						<form className='previous__form'>
							<button className='previous__button' onClick={
								(e) => {
									e.preventDefault()
									setCurrentPage(currentPage - 1)
								}
							}>previous</button>
						</form>
					: ""}
					{nextPageExists ? 
						<form className='next__form'>
							<button className='next__button' onClick={
								(e) => {
									e.preventDefault()
									setCurrentPage(currentPage + 1)
								}
							}>next</button>
						</form>
					: "" }
				</div>}
		</div>
	)
}

export default CardsPage
