import React from 'react'
import * as basicLightbox from 'basiclightbox'
import { fetchOneCard } from '../services/_cardsServices'
import { info } from 'node-sass'


const infoMapper = (infos) => {
    return (
        <div>{infos.map(info => (
            <p>{info.type} {info.value}</p>
        ))}</div>
    )
}

const CardDetails = (props) => {
    
    const card = fetchOneCard(props.id)

    const cardBox  = basicLightbox.create(
        <div>
            <h1 className="grid-container">Detail-Ansicht</h1>
            <button onClick={this.close}>X</button>
            <h3>{card.name}</h3>
            <p>{card.hp}</p>
            <div>{card.types.map(type => (
                <p>{type}</p>
            ))}</div>
            <p>
                Ability: {card.ability.name} <br/>
                {card.ability.text}
            </p>
            <p>Attacks: <br/></p>
            <div>{card.attacks.map(attack => (
                <div>
                    <p><strong>{attack.name}</strong></p>
                    <p>{attack.text}</p>
                    <p>{attack.damage}</p>
                    <div>{attack.cost.map(cost => (
                        <p>{cost}</p>
                        ))}</div>
                    <p>{attack.convertedEnergyCost}</p>

                </div>
            ))}
            </div>
            <div>{card.weaknesses.map(weaknes => (
                <p>{weaknes.type} {weaknes.value}</p>
            ))}</div>
            <div>{card.retreatCost.map(reCost => (
                <p>{reCost.type} {reCost.value}</p>
            ))}</div>
            <p>{card.convertedRetreatCost}</p>
        </div>

    )
    return (
        <div>
            {cardBox}
        </div>
    )

}

export default CardDetails;