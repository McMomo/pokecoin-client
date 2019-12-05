import { BASE_URL } from '../helpers/constants'
import Cookies from 'js-cookie'

export const postBuyNewBooster = (boosterName) => {
	const token = Cookies.get('token')

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'token': token
		}
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
        console.log("No Boosters are available")
    }
}

export const getBooster = async (boosterName) => {
    try {
        const response = await fetch(BASE_URL + `/cards/packages/${ boosterName }`)
        const data = await handleResponse(response)
        return data
    } catch (errors) {
        console.log("No Booster was found")
    }
}

export const getBoosterPrice = async () => {
    try {
        const response = await fetch(BASE_URL + `/cards/packages/currentPackageCost`)
        const data = await handleResponse(response)
        return data
    } catch (errors) {
        console.log(errors)
    }
}

function handleResponse(response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text)
		if (!response.ok) {

			if (response.status === 400) {
				console.log('fuck')
			}

			const error = (data && data.message) || response.statusText
			return Promise.reject(error)
		}

		return data
	})
}
