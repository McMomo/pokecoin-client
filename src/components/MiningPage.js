import React, { useEffect, useState } from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import { getDifficulty, getPrevHash } from '../services/_miningServices'
import { postNewBlock } from '../services/_miningServices'
import { calculateHash } from '../helpers/worker'
import Pikachu_searching from '../images/pokecoin_pikachu_searching.gif'
import Pikachu_paused from '../images/pokecoin_pikachu_paused.gif'
import { pikachu_colors } from '../helpers/constants'
import { useSelector } from 'react-redux'
import { fetchCoins } from '../actions'
import { DOMHelpers } from '../helpers/domhelpers'
import { Redirect } from 'react-router-dom'
import { store } from '..'


let workerInstance

/* Mining and post-Request if Hash found */
async function startMiner() {
	workerInstance = worker()

	workerInstance.addEventListener('message', async (message) => {
		if (message.data.type !== 'RPC') {
			console.log('%c New Hash found: ' + calculateHash(message.data), 'color: blue')
			await postNewBlock(message.data)
				.then((response) => {
					return response.json()
				})
				.then(json => {
					console.log(json)
					store.dispatch(fetchCoins())
				})
		}
	})

	const prevHash = await getPrevHash()
	const getDiff = await getDifficulty()
	await workerInstance.mine(prevHash, getDiff)
	workerInstance.terminate()
}

const MiningPage = () => {

	const loggedIn = useSelector(state => state.authenticationReducer.loggedIn)
	const [miningStatus, setMiningStatus] = useState(true)
	const [reapeatMiningFlag, setRepeatMiningFlag] = useState(true)

	const startBtn = document.querySelector(".js-start")
	const stopBtn = document.querySelector(".js-stop")

	/* Starts the miner and checks for repeat */
	useEffect(() => {
		async function asyncMiner() {
			if (miningStatus) await startMiner()
				.catch(console.error)

			setMiningStatus(false)

		}
		asyncMiner()
		if (reapeatMiningFlag) setMiningStatus(true)
	}, [miningStatus, reapeatMiningFlag])

	/* Stop and rerun worker after switching Browser-Tab */
	document.addEventListener('visibilitychange', function () {
		if (document.hidden) {
			// stop running task
			setRepeatMiningFlag(false)
			setMiningStatus(false)
			workerInstance.terminate()
		} else {
			// page has focus, begin running task
			setRepeatMiningFlag(true)
			setMiningStatus(true)
		}
	});

	/* Stops worker after switching page in the Application */
	useEffect(() => {
		return () => {
			//If a function is returned from useEffect, that function is invoked only when the component is removed from the DOM.
			console.log('ich mach alles weiß')
			document.body.style.backgroundColor = '#ffffff'
			workerInstance.terminate()
		}
	})

	/* Switch for Mining-Image */
	const getMiningPageImg = () => {
		if (reapeatMiningFlag) {
			document.body.style.backgroundColor = pikachu_colors.SEARCHING
			DOMHelpers.deactivate(stopBtn)
			DOMHelpers.activate(startBtn)
			return Pikachu_searching
		} else {
			document.body.style.backgroundColor = pikachu_colors.PAUSED
			DOMHelpers.deactivate(startBtn)
			DOMHelpers.activate(stopBtn)
			return Pikachu_paused
		}
	}

	return (
		<div>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			<img className="mining__img" src={getMiningPageImg()} alt="Pikachu is having a break, with KITKAT(C)" />

			<button className="mining__button js-start" onClick={
				() => {
					setRepeatMiningFlag(true)
					setMiningStatus(true)
				}
			}>Start
			</button>
			<button className="mining__button js-stop" onClick={
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
