import React from 'react'
import { useState } from 'react'
import { useAsyncEffect } from 'use-async-effect'
import { 
    Link,
    useParams
} from 'react-router-dom'
import { 
    getBooster,
} from '../services/_shopServices';

const BoosterDetails = () => {
    let { boosterName } = useParams();
    const [booster, setBooster] = useState([])

    useAsyncEffect(async () => {
        const boo = await getBooster(boosterName)
		setBooster(boo)
    }, [])
    
    console.log(booster)
    
    const boosterCards = booster.map(cards => (
		<img key={cards.name} src={cards.imageUrl} alt={cards.name} />
	))

    return (
        <div>
            {boosterCards}
            <Link to={`/shop`}>Go Back</ Link>
        </div>
    )
}

export default BoosterDetails