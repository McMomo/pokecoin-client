import * as crypto from 'crypto'
import { BLOCK_DATA } from './constants'

export const calculateHash = (block) => {
	const information = (
		block.previousHash +
		block.timestamp.toString() +
		block.data +
		block.nonce.toString()
	)

	return crypto.createHash('sha256').update(information).digest('hex')
}

export const mine = (prevHash, difficulty) => {
	console.log('Mining has started')
	let timestamp = Date.now()
	const max = Number.MAX_SAFE_INTEGER
	let nonce = max / 2
	let newBlock = ''

	while (nonce <= max) {
		nonce++
		newBlock = {
			previousHash: prevHash,
			timestamp: timestamp,
			data: BLOCK_DATA,
			nonce: nonce
		}

		if(nonce === max) {
			nonce = 0
			timestamp = Date.now()
		}

		if (calculateHash(newBlock).startsWith(Array(difficulty).fill(0).join(''))) {
			self.postMessage(newBlock) // eslint-disable-line no-restricted-globals
			return
		}
	}
}
