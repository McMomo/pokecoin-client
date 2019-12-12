import { BASE_URL } from '../helpers/constants'
import Cookies from 'js-cookie'

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
		const response = await fetch (BASE_URL + '/blockchain/blocks', requestOptions)
		const data = await handleResponse(response)
		console.log("Post answer data: " + data.block)
		return data
	} catch (error) {
		console.log(error)
	}
}

export const getDifficulty = async () => {
	try {
		const response = await fetch(BASE_URL + '​/blockchain/currentDifficulty')
		const data = await handleResponse(response)
		return data
	} catch (error) {
		console.error(error)
	}
}

export const getPrevHash = async () => {
	try {
		const response = await fetch(BASE_URL + '/blockchain/lastBlock')
		const data = await handleResponse(response)
		console.log("This is the last Hash: " + data.hash)
		return data.hash
	}
	catch (error) {
		console.log(error)
	}
}

async function handleResponse(response) {
	const text = await response.text()
	const data = text && JSON.parse(text)
	if (!response.ok) {

		if (response.status === 400) {
		}

		const error = (data && data.message) || response.statusText
		throw error
	}
	return data
}