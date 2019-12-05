import React, { useEffect, useState } from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import { getDifficulty, getPrevHash } from '../services/_miningServices'
import { postNewBlock } from '../services/_miningServices'
import { calculateHash } from '../helpers/worker'
import Dugtrio_png from '../images/dugtrio_full.png'
import Dugtrio_gif from '../images/dugtrio_full.gif'


let workerInstance

async function startMiner() {
	console.log("Dugtrio is going to work!")
	
	workerInstance = worker()

	workerInstance.addEventListener('message', async (message) => {
		console.log('New Message: ', message.data)
		if (message.data.type !== 'RPC') {
			try {
				console.log(calculateHash(message.data))
				await postNewBlock(message.data)
			} catch (error){
				console.error(error)
			}
		}
	})

	const prevHash = await getPrevHash()
	const getDiff = await getDifficulty()
	await workerInstance.mine(prevHash, getDiff)

	
}

const MiningPage = () => {
	const [miningStatus, setMiningStatus] = useState(true)
	const [reapeatMiningFlag, setRepeatMiningFlag] = useState(true)


	useEffect(() => {
		async function asyncMiner() {
			if (miningStatus) await startMiner()
				.catch(console.log)

			setMiningStatus(false)
		}
		asyncMiner()
		if (reapeatMiningFlag){
			setMiningStatus(true)
		}
	}, [miningStatus])

	return (
		<div>
			<img src={miningStatus ? Dugtrio_gif : Dugtrio_png} alt="Dugtrio is having a break, with KITKAT(C)"/>
			<button onClick={
				() => {
					setRepeatMiningFlag(true)
					setMiningStatus(true)
				}
			}>
				Start
			</button>
			<button onClick={
				() => {
					setRepeatMiningFlag(false)
					setMiningStatus(false)
					workerInstance.terminate()
				} 
			}>Stop</button>
			<p>Miningstatus {miningStatus? " Ja":" nein"}</p>
			<p>RepeatFlag {reapeatMiningFlag? " Ja":" nein"}</p>

		</div>
	)
}

export default MiningPage
