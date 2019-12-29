import React from 'react'
import { fetchOneCard } from '../services/_cardsServices'
import ReactDOMServer from 'react-dom/server'

const infoMapper = (infos) => {
    return (
        <div>{infos.map(info => (
            <p>{info.type} {info.value}</p>
        ))}</div>
    )
}


const CardDetails = async (props) => {
    
    const card = await fetchOneCard(props.id)

    return (`
        <div>
            <h1> Detail-Ansicht </h1>
            <h3> Cardname: ${card.name} </h3>
            <img key=${card.id} src=${card.imageUrl} alt=${card.name}
            <p><br/>HP: ${card.hp}</p>
            <div>${card.types? card.types.map(type => ReactDOMServer.renderToString(
                <p>{type}</p>
            )):''}</div>
            <p>
                Ability: ${card.ability? card.ability.name: ''} <br/>
                ${card.ability? card.ability.text: 'Card has no ability'}
            </p>
            <p>Attacks: <br/></p>
            <div>${card.attacks? card.attacks.map(attack => ReactDOMServer.renderToString(
                <div>
                    <p><strong>{attack.name}</strong></p>
                    <p>{attack.text}</p>
                    <p>{attack.damage}</p>
                    <div>{attack.cost.map(cost => (
                        <div key={cost}>{cost}</div>
                        ))}</div>
                    <p>{attack.convertedEnergyCost}</p>

                </div>
            )): 'The Card has no attacks'}
            </div>
            <div>${card.weaknesses? card.weaknesses.map(weaknes => ReactDOMServer.renderToString(
                <p>Weaknes: {weaknes.type} {weaknes.value}</p>
            )): ''}</div>
            <div>${card.retreatCost? card.retreatCost.map(reCost => ReactDOMServer.renderToString(
                <p>Retreat Cost: {reCost} {reCost.type} {reCost.value}</p>
            )): ''}</div>
            <p>Converted Retreat Cost: ${card.convertedRetreatCost? card.convertedRetreatCost: ''}</p>
        </div>
    `)
}

export default CardDetails;