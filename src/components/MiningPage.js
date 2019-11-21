import React from 'react'
import axios from 'axios'
import { BASE_URL} from '../helpers/constants'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax

const getDifficulty = () => { 
    let difficulty = ''
    axios.get(BASE_URL + '​/blockchain/currentDifficulty')
    .then(response => {
        difficulty = response
    })
    .catch(error => {
        console.error(error)
    })
    return difficulty
}

const getPrevHash = () => {
    let prevHash = '' 
    axios.get(BASE_URL + '/blockchain/lastBlock')
    .then(function (response){
        prevHash = response.hash
    })
    .catch(function (error){
        console.log(error)
    })

    return prevHash
}

const MiningPage = () => {
    
    const workerInstance = worker()
    workerInstance.addEventListener('message', (message) => {
    console.log('New Message: ', message.data)
    })

    workerInstance.mine(getPrevHash, getDifficulty)
    
    return(
        <div>
            <p>mining</p>
        </div>
    )
}

export default MiningPage
