import { BASE_URL } from '../helpers/constants'
import Cookies from 'js-cookie'
import { ToastsContainer, ToastsStore } from 'react-toasts';

export const getBuyNewBooster = (boosterName) => {
	const token = Cookies.get('token')
	const requestOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'token': token
		},
	}

	return fetch(BASE_URL + `/cards/packages/${boosterName}/buyDefaultPackage`, requestOptions)
		.then(handleResponse)
		.then(data => {
			return data
		})
}

export const getBoosterList = async () => {
	try {
		const response = await fetch(BASE_URL + `/cards/packages`)
		const data = await handleResponse(response)
		return data
	} catch (errors) {
		ToastsStore.warning("Aktuell sind keine Booster verfügbar.")
	}
}

export const getBooster = async (boosterName) => {
	try {
		const response = await fetch(BASE_URL + `/cards/packages/${ boosterName }`)
		const data = await handleResponse(response)
		return data
	} catch (errors) {
		ToastsStore.warning("Booster wurde nicht gefunden.")
	}
}

export const getBoosterPrice = async () => {
	try {
		const response = await fetch(BASE_URL + `/cards/packages/currentPackageCost`)
		const data = await handleResponse(response)
		return data
	} catch (errors) {
		ToastsStore.warning("Aktuell ist der Preis nicht verfügbar.")
	}
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		if (!response.ok) {
			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}
		return data
	})
}
