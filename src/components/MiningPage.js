import React, { useEffect, useState } from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import { getDifficulty, getPrevHash } from '../services/_miningServices'
import { postNewBlock } from '../services/_miningServices'
import { calculateHash } from '../helpers/worker'
import Dugtrio_png from '../images/dugtrio_full.png'

async function startMiner() {
	console.log("Dugtrio is going to work!")

	const workerInstance = worker()
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

	useEffect(() => {
		if (miningStatus) startMiner()
			.catch(console.log)

		setMiningStatus(false)
	}, [miningStatus])

	return (
		<div>
			<img src={Dugtrio_png} alt="Dugtrio is having a break, with KITKAT(C)"/>
			<button onClick={
				() => setMiningStatus(true)
			}>
				Start
			</button>
			<button onClick={
				() => setMiningStatus(false)
			}>Stop</button>
			<p>{miningStatus? "Ja":"nein"}</p>
		</div>
	)
}

export default MiningPage
