import React from 'react'
import { fetchOneCard } from '../services/_cardsServices'
import ReactDOMServer from 'react-dom/server'
import { supertypes } from '../helpers/constants'

const infoMapper = (infos) => {
    return (
        <div>{infos.map(info => (
            <p>{info.type? info.type: ''}  {info.value? ' - ' + info.value: ''}</p>
        ))}</div>
    )
}


const CardDetails = async (props) => {
    
    const card = await fetchOneCard(props.id)
    let html = ''
    
    if (card.supertype === supertypes.TRAINER){
        html = (
            `<div className='cardDetail-container'>
                <h3> Cardname ${card.name}</h3>
                <h4> Type: ${card.supertype} </h4>
                <img key=${card.id} src=${card.imageUrl} alt=${card.name}/>
                ${card.text.map(line => ReactDOMServer.renderToString(
                    <p>{line}</p>
                ))}
            </div>`
        )


    } else if (card.supertype === supertypes.ENERGY){
        html = (
            `<div className='cardDetail-container'> 
                <h3> Cardname: ${card.name}</h3>
                <img key=${card.id} src=${card.imageUrl} alt=${card.name}/>
            </div>`
        )

    } else if (card.supertype === supertypes.POKEMON) { 
        html = (`
            <div className="cardDetail">
                <div className='cardDetail__headline'> Cardname: ${card.name} </h3>
                <img className='cardDetail__image' key=${card.id} src=${card.imageUrl} alt=${card.name}/>
                <div className='cardDetail__basics'>
                    <div>HP: ${card.hp}</div>
                    <div>${card.types? 'Type: ' + card.types.map(type => ({type}.type)):''}</div>
                    <div>
                        ${card.ability? 'Ability: ' + card.ability.name: ''} 
                        ${card.ability? card.ability.text: ''}
                    </div>
                </div>
                <div className='cardDetail__attacks'>
                    <div>Attacks: </div>
                    <div>${card.attacks? card.attacks.map(attack => ReactDOMServer.renderToString(
                        <div>
                            <p><strong>{attack.name} </strong> {attack.text}</p>
                            <p>Damage: {attack.damage} - Energy: {attack.cost.map(cost => ({cost}.cost))}</p>
                        </div>
                    )): 'The Card has no attacks'}
                    </div>
                </div>
                <div className='cardDetail__weakness'>${card.weaknesses? card.weaknesses.map(weakness => ReactDOMServer.renderToString(
                    <p>Weakness: {weakness.type} {weakness.value}</p>
                )): ''}</div>
                <div className='cardDetail__retreat'> 
                    <div>${card.retreatCost? card.retreatCost.map(reCost => ReactDOMServer.renderToString(
                        <p>Retreat Cost: {reCost} {reCost.type} {reCost.value}</p>
                    )): ''}</div>
                    <p>Retreat cost: ${!isNaN(card.convertedRetreatCost)? card.convertedRetreatCost: '0'}</p>
                </div>
            </div>
        `)
    }

    return html
}

export default CardDetails;