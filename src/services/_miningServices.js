import { BASE_URL} from '../helpers/constants'

export const getDifficulty = async () => { 
    try {
        const response = await fetch(BASE_URL + '​/blockchain/currentDifficulty')
        const data = await handleResponse(response)
        return data
    } catch(error) {
        console.error(error)
    }
}

async function handleResponse(response) {
    const text = await response.text()
    const data = text && JSON.parse(text)
    if (!response.ok) {

        if(response.status === 400) {
            console.log('fuck')
        }

        const error = (data && data.message) || response.statusText;
        throw error
    }
    return data 
}

export  const getPrevHash = async () => {
    try {
        const response = await fetch(BASE_URL + '/blockchain/lastBlock')
        const data = await handleResponse(response)
        return data.hash
    }
    catch(error) {
        console.log(error)
    }
}