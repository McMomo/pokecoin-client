import { BASE_URL } from '../helpers/constants'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastsContainer, ToastsStore } from 'react-toasts';

export const fetchCards = async (page) => {
	const list = await axios.get(BASE_URL + `/cards?page=${page}`)
							.catch(error => {ToastsStore.warning("Eigene Karten konnten nicht geladen werden.")})
	return list.data.cards
}

export const fetchUserCards = async () => {
	const token = Cookies.get('token')
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

export const fetchOneCard = async (cardId) => {
	const list = await axios.get(BASE_URL + `/cards/${ cardId }`)
							.catch(error => {ToastsStore.warning("Eigene Karten konnten nicht geladen werden.")})
	return list.data.card
}