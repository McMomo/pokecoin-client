import React from 'react'
import CardDetails from './CardDetails'
import * as basicLightbox from 'basiclightbox'


const Card = (props) => {

    const diplayCardDetails = () => {
       const instance = CardDetails(props)
       console.log("Hey i'm a basicLightBox")
       instance.show()
    }

    return(
        <img key={props.id} src={props.imageUrl} alt={props.name} onClick={diplayCardDetails} role="button"/>
    )
}

export default Card;