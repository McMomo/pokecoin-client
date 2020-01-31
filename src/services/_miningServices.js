import { BASE_URL } from '../helpers/constants'
import Cookies from 'js-cookie'
import { ToastsContainer, ToastsStore } from 'react-toasts';

export const postNewBlock = async (newBlock) => {

	const token = Cookies.get('token')

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'token': token
		},
		body: JSON.stringify(newBlock)
	}

	try {
		const response = await fetch(BASE_URL + '/blockchain/blocks', requestOptions)
		return response
	} catch (error) {
		ToastsStore.warning("Mining war nicht erfolgreich.")
	}
}

export const getDifficulty = async () => {
	try {
		const response = await fetch(BASE_URL + '​/blockchain/currentDifficulty')
		const data = await handleResponse(response)
		return data
	} catch (error) {
		ToastsStore.warning("Aktuell difficulty für das minen wurde nicht gefunden..")
	}
}

export const getPrevHash = async () => {
	try {
		const response = await fetch(BASE_URL + '/blockchain/lastBlock')
		const data = await handleResponse(response)
		return data.hash
	}
	catch (error) {
		ToastsStore.warning("Vorherige Hash wurde nicht gefunden.")
	}
}

async function handleResponse(response) {
	const text = await response.text()
	const data = text && JSON.parse(text)
	if (!response.ok) {
		console.error('%c response not ok', 'color: red')

		if (response.status === 400) {
		}

		const error = (data && data.message) || response.statusText
		throw error
	}
	return data
}