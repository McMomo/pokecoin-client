import React from 'react'
import CardDetails from './CardDetails'


const Card = (props) => {

    const diplayCardDetails = () => {
        return <CardDetails id={props.id}/>
    }

    return(
        <img key={props.id} src={props.imageUrl} alt={props.name} onClick={diplayCardDetails} role="button"/>
    )
}

export default Card;