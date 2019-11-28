import React, { useEffect }  from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import {getDifficulty, getPrevHash} from '../services/_miningServices'


const MiningPage = () => {
    async function startMiner(){
        const workerInstance = worker()
        workerInstance.addEventListener('message', (message) => {
            console.log('New Message: ', message.data)
        })
        
        const prevHash = await getPrevHash()
        const getDiff = await getDifficulty()
        workerInstance.mine(prevHash, getDiff)    
    }
    useEffect(() => {
        startMiner()
        .catch(console.log)
    }, [])

    return(
        <div>
            <p>mining</p>
        </div>
    )
}

export default MiningPage
