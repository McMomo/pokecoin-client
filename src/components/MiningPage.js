import React, { useEffect } from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import { getDifficulty, getPrevHash } from '../services/_miningServices'
import { postNewBlock } from '../services/_miningServices'
import { calculateHash } from '../helpers/worker'

const MiningPage = () => {
    async function startMiner() {
        while (true) {
            const workerInstance = worker()
            workerInstance.addEventListener('message', async (message) => {
                console.log('New Message: ', message.data)
                if (message.data.type !== 'RPC') {
                    console.log(calculateHash(message.data))
                    await postNewBlock(message.data)
                }
            })

            const prevHash = await getPrevHash()
            const getDiff = await getDifficulty()
            await workerInstance.mine(prevHash, getDiff)
            console.log('Another round!')
        }
    }
    useEffect(() => {
        startMiner()
            .catch(console.log)
    }, [])

    return (
        <div>
            <p>mining</p>
        </div>
    )
}

export default MiningPage
