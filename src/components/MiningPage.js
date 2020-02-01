import React, { useEffect, useState } from 'react'
import worker from 'workerize-loader!../helpers/worker' // eslint-disable-line import/no-webpack-loader-syntax
import { miningService } from '../services/_miningServices'
import { calculateHash } from '../helpers/worker'
import { pikachu_colors } from '../helpers/constants'
import { useSelector } from 'react-redux'
import { fetchCoins } from '../actions'
import { DOMHelpers } from '../helpers/domhelpers'
import { Redirect } from 'react-router-dom'
import { store } from '..'
import cashRegisterSound from '../sounds/cash-register.mp3'
import Pikachu_searching from '../images/pokecoin_pikachu_searching.gif'
import Pikachu_paused from '../images/pokecoin_pikachu_paused.gif'
import {ToastsStore} from 'react-toasts';

let workerInstance

const triggerEevee = () => {
	const eevee = document.querySelector('.topnav__coin')
	const audio = new Audio(cashRegisterSound)
	audio.play()
	DOMHelpers.activate(eevee)
	eevee.addEventListener('animationend', () => {
		DOMHelpers.deactivate(eevee)
	})
}

/* Mining and post-Request if Hash found */
async function startMiner() {
	workerInstance = worker()

	workerInstance.addEventListener('message', async (message) => {

		if (message.data.type !== 'RPC') {
			console.log('%c New Hash found: ' + calculateHash(message.data), 'color: blue')
			ToastsStore.info('Ein neuer Hash für einen Coin wurde gefunden')
			await miningService.postNewBlock(message.data)
				.then((response) => {
					if(!response.ok) throw new Error("HTTP Status " + response.status)
					return response.json()
				})
				.then(json => {
					ToastsStore.success("Ein Coin wurde gefunden.")
					store.dispatch(fetchCoins(store.getState().loginReducer.token))
					triggerEevee()
				})
				.catch(error => {
					ToastsStore.warning("Der gefundene Coin war nicht in Ordnung :(")
					console.error(error)
				})
		}
	})

	const prevHash = await miningService.getPrevHash()
	const getDiff = await miningService.getDifficulty()
	await workerInstance.mine(prevHash, getDiff)
	workerInstance.terminate()
}

const MiningPage = () => {

	const loggedIn = useSelector(state => state.loginReducer.loggedIn)
	const [miningStatus, setMiningStatus] = useState(true)
	const [reapeatMiningFlag, setRepeatMiningFlag] = useState(true)

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
			document.body.style.backgroundColor = '#ffffff'
			workerInstance.terminate()
		}
	})

	/* Switch for Mining-Image */
	const getMiningPageImg = () => {
		if (reapeatMiningFlag) {
			document.body.style.backgroundColor = pikachu_colors.SEARCHING
			return Pikachu_searching
		} else {
			document.body.style.backgroundColor = pikachu_colors.PAUSED
			return Pikachu_paused
		}
	}

	return (
		<div>
			{!loggedIn ? <Redirect to='/login' /> : ''}
			<img className="mining__img" src={getMiningPageImg()} alt="Pikachu is having a break, with KITKAT(C)" />

			<button className={miningStatus ? 'mining__button active' : 'mining__button'} onClick={
				() => {
					setRepeatMiningFlag(true)
					setMiningStatus(true)
				}
			}>Start
			</button>
			<button className={!miningStatus ? 'mining__button active' : 'mining__button'} onClick={
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
