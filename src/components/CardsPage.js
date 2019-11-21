import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../helpers/constants'
import {useAsyncEffect} from 'use-async-effect'

const fetchCards = async (page) => {
    const list = await axios.get(BASE_URL + `/cards?page=${ page }`)
    return list.data.cards
}

const CardsPage = () => {

    const [ cards, setCards ] = useState([])

	useAsyncEffect(async () => {
		const cards = await fetchCards(0)
		setCards(cards) 
    }, [])
    
    const cardList = cards.map(card => (
        <img key={card.name} src={card.imageUrl} />
    ))

    console.log(cards)

    return(
        <div>
            <p>Hello</p>
            {cardList}
        </div>
    );
}

export default CardsPage