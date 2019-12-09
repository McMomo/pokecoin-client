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
				console.error("Not fast enough .. \n" + error)
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
	}, [miningStatus, reapeatMiningFlag])

	document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
			// stop running task
			console.log("// stop running task")
			setRepeatMiningFlag(false)
			setMiningStatus(false)
			workerInstance.terminate()
        } else {
			// page has focus, begin running task
			console.log("// page has focus, begin running task")
			setRepeatMiningFlag(true)
			setMiningStatus(true)
        }
    });

	useEffect(() => {
		return () => {
			//If a function is returned from useEffect, that function is invoked only when the component is removed from the DOM.
			workerInstance.terminate()
		}
	})


	return (
		<div>
			<img className="mining__img" src={reapeatMiningFlag ? Dugtrio_gif : Dugtrio_png} alt="Dugtrio is having a break, with KITKAT(C)"/>
			<button className="mining__button" onClick={
				() => {
					setRepeatMiningFlag(true)
					setMiningStatus(true)
				}
			}>Start
			</button>
			<button className="mining__button" onClick={
				() => {
					setRepeatMiningFlag(false)
					setMiningStatus(false)
					workerInstance.terminate()
				} 
			}>Stop
			</button>
		</div>
	)
}

export default MiningPage
