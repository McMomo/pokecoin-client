import React, { useEffect, useState } from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import { getDifficulty, getPrevHash } from '../services/_miningServices'
import { postNewBlock } from '../services/_miningServices'
import { calculateHash } from '../helpers/worker'
import Pikachu_searching from '../images/pokecoin_pikachu_searching.gif'
import Pikachu_paused from '../images/pokecoin_pikachu_paused.gif'
import { pikachu_colors } from '../helpers/constants'
import { useAsyncEffect } from 'use-async-effect'
import { useSelector, useDispatch } from 'react-redux'
import { userService } from '../services'
import { shopActions } from '../actions'
import { DOMHelpers } from '../helpers/domhelpers'

let workerInstance
let result = false

async function startMiner() {
	workerInstance = worker()

	workerInstance.addEventListener('message', async (message) => {
		console.log('New Message: ', message.data)
		if (message.data.type !== 'RPC') {
			console.log("New Hash found: " + calculateHash(message.data))
			result = await postNewBlock(message.data)
		}
	})

	const prevHash = await getPrevHash()
	const getDiff = await getDifficulty()
	await workerInstance.mine(prevHash, getDiff)
}

const triggerEevee = () => {
	const eevee = document.querySelector(".topnav__coin")
	DOMHelpers.activate(eevee)
	setTimeout(() => {
		DOMHelpers.deactivate(eevee)
	}, 700)
}

const MiningPage = () => {
	const [miningStatus, setMiningStatus] = useState(true)
	const [reapeatMiningFlag, setRepeatMiningFlag] = useState(true)
	const [coinFound, setCoinFound] = useState(false)

	const startBtn = document.querySelector(".js-start")
	const stopBtn = document.querySelector(".js-stop")


	useEffect(() => {
		async function asyncMiner() {
			if (miningStatus) await startMiner()
				.catch(console.error)

			if (result) setCoinFound(true)
			setMiningStatus(false)
		}
		asyncMiner()
		if (reapeatMiningFlag) {
			setMiningStatus(true)
		}
	}, [miningStatus, reapeatMiningFlag])

	// document.addEventListener('visibilitychange', function () {
	//     if (document.hidden) {
	// 		// stop running task
	// 		setRepeatMiningFlag(false)
	// 		setMiningStatus(false)
	// 		workerInstance.terminate()
	//     } else {
	// 		// page has focus, begin running task
	// 		setRepeatMiningFlag(true)
	// 		setMiningStatus(true)
	//     }
	// });

	// useEffect(() => {
	// 	return () => {
	// 		//If a function is returned from useEffect, that function is invoked only when the component is removed from the DOM.
	// 		workerInstance.terminate()
	// 	}
	// })

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

	const dispatch = useDispatch()
	const token = useSelector(state => state.authenticationReducer.token)

	useAsyncEffect(async () => {
		if (coinFound) {
			try {
				const response = await userService.fetchWalletBalance(token)
				if (!response.ok) throw new Error(response.error)
				const data = await response.json()
				dispatch(shopActions.balanceSuccess(data.amount))

				if (coinFound) triggerEevee()

			} catch (error) {
				console.error(error)
			} finally {
				setCoinFound(false)
			}
		}
	}, [coinFound])


	return (
		<div>
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
