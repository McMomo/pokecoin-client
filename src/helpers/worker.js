 import * as crypto from 'crypto'
import { BLOCK_DATA } from './constants'

const calculateHash = (block) => {
    const information = (
        block.previousHash +
        block.timestamp.toString() +
        block.data +
        block.nonce.toString()
    )
    return crypto.createHash('sha256').update(information).digest('hex')
}

export const mine = (prevHash, difficulty) => {
    let timestamp = new Date().getTime()
    let nonce = -1

    let newBlock = ''

    while (true) {
        if (Number.MAX_SAFE_INTEGER === nonce) {
            nonce = 0
            timestamp = new Date().getTime()
        } else {
            nonce++
        }
        newBlock = {
            previousHash: prevHash,
            timestamp: timestamp,
            data: BLOCK_DATA,
            nonce: nonce
        }
        if (calculateHash(newBlock).startsWith(Array(difficulty).fill(0).join(''))){
            self.postMessage(calculateHash(newBlock)) // eslint-disable-line no-restricted-globals
        }
    } 
}

