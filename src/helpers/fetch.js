const axios = require('axios')

export async function postData(url = '', data = {}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	return await response
}

export async function get(url) {
	return await axios.get(url)

}