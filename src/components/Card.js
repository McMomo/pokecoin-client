import React from 'react'
import CardDetails from './CardDetails'
import * as basicLightbox from 'basiclightbox'


const Card = (props) => {

	const diplayCardDetails = async () => {
		const html = await CardDetails(props)
		const instance = basicLightbox.create(html)

		instance.show()
	}

	return (
		<img className='cardPage__card' key={props.id} src={props.imageUrl} alt={props.name} onClick={diplayCardDetails} role="button" />
	)
}

export default Card;