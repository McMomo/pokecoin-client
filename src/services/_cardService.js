import { BASE_URL } from '../helpers/constants'
import axios from 'axios'
import { ToastsStore } from 'react-toasts';
import { store } from '..';

const fetchCards = async (page) => {
	const list = await axios.get(BASE_URL + `/cards?page=${page}`)
							.catch(error => {ToastsStore.warning("Eigene Karten konnten nicht geladen werden.")})
	return list.data.cards
}

const fetchUserCards = async () => {
	const token = store.getState().loginReducer.token
	if(token === null) return
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'token': token
		},
	}

	return await axios.get(BASE_URL + `/cards/usercards`, requestOptions)
		.then(data => {
			return data.data
		})
		.catch(error => {ToastsStore.warning("Eigene Karten konnten nicht geladen werden.")})
}

const fetchOneCard = async (cardId) => {
	const list = await axios.get(BASE_URL + `/cards/${ cardId }`)
							.catch(error => {ToastsStore.warning("Eigene Karten konnten nicht geladen werden.")})
	return list.data.card
}

export const cardService = {
	fetchCards,
	fetchUserCards,
	fetchOneCard
}