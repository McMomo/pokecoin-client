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

let workerInstance

async function startMiner() {
	workerInstance = worker()

	workerInstance.addEventListener('message', async (message) => {
		console.log('New Message: ', message.data)
		if (message.data.type !== 'RPC') {
				console.log("New Hash found: " + calculateHash(message.data))
				await postService(message.data)
				console.log("I DONT WANNA WAIT!")
		}
	})

	async function postService(data){
		let response = await postNewBlock(data)
		console.log("Post response in waiter: " + response)
	}

	const prevHash = await getPrevHash()
	const getDiff = await getDifficulty()
	await workerInstance.mine(prevHash, getDiff)
}

const MiningPage = () => {
	const [miningStatus, setMiningStatus] = useState(true)
	const [reapeatMiningFlag, setRepeatMiningFlag] = useState(true)
	const [coinSession, setCoinSession] = useState(0)

	useEffect(() => {
		async function asyncMiner() {
			if (miningStatus) await startMiner()
				.then(setCoinSession(coinSession + 1))
				.catch(console.error)

			setMiningStatus(false)
		}
		asyncMiner()
		if (reapeatMiningFlag){
			setMiningStatus(true)
		}
	}, [miningStatus, reapeatMiningFlag])

	// document.addEventListener('visibilitychange', function () {
    //     if (document.hidden) {
	// 		// stop running task
	// 		console.log("// stop running task")
	// 		setRepeatMiningFlag(false)
	// 		setMiningStatus(false)
	// 		workerInstance.terminate()
    //     } else {
	// 		// page has focus, begin running task
	// 		console.log("// page has focus, begin running task")
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
		if (reapeatMiningFlag){
			document.body.style.backgroundColor = pikachu_colors.SEARCHING
			return Pikachu_searching
		} else {
			document.body.style.backgroundColor = pikachu_colors.PAUSED
			return Pikachu_paused
		}
	}

	
	const dispatch = useDispatch()
	const token = useSelector(state => state.authenticationReducer.token)

	useAsyncEffect(async () => {
		try {
			const response = await userService.fetchWalletBalance(token)
			if(!response.ok) throw new Error(response.error)
			const data = await response.json()
			dispatch(shopActions.balanceSuccess(data.amount))

			document.findElement("topnav__coin").className = "topnav__coin.active"

		} catch (error) {
			console.error(error)
		} 
	}, [coinSession])


	return (
		<div>
			<img className="mining__img" src={getMiningPageImg()} alt="Pikachu is having a break, with KITKAT(C)"/>
			
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
