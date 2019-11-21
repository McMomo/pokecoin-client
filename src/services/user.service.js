import { BASE_URL } from '../helpers/constants'

const login = (username, password) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }

    console.log('gonna fetch now')

    return fetch(BASE_URL + '/auth/login', requestOptions)
        .then(handleResponse)
        .then(data => {
            localStorage.setItem('token', JSON.stringify(data.token));
            return data
        })
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {

            if(response.status === 400) {
                console.log('fuck')
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const userService = {
    login
};