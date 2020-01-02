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

const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const CardDetails = async (props) => {
    
    const card = await fetchOneCard(props.id)
    let html = ''
    
    if (card.supertype === supertypes.TRAINER){
        html = (
            `<div className='cardDetail'>
                <div className='cardDetail__headline'> Cardname ${card.name}</div>
                <div> Type: ${card.supertype} </div>
                <img className='cardDetail__image' key=${card.id} src=${card.imageUrl} alt=${card.name}/>
                ${card.text.map(line => ReactDOMServer.renderToString(
                    <p>{line}</p>
                ))}
            </div>`
        )


    } else if (card.supertype === supertypes.ENERGY){
        html = (
            `<div className='cardDetail'> 
                <div className='cardDetail__headline'> Cardname: ${card.name}</div>
                <img className='cardDetail__image' key=${card.id} src=${card.imageUrl} alt=${card.name}/>
            </div>`
        )

    } else if (card.supertype === supertypes.POKEMON) {
        console.log(card.attacks)
        card.attacks.map(a => (
            console.log(a)
        ))
        html = (`
            <div className='cardDetail'>
                <div className='cardDetail__headline'> Cardname: ${card.name} </div>
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
                    <br/><strong>Attacks:</strong>
                    ${card.attacks? card.attacks.map(attack => (ReactDOMServer.renderToString(
                        <p><strong>{attack.name} </strong> {attack.text}
                        <br/>Damage: {attack.damage} - Energy: {attack.cost.map(cost => ({cost}.cost)).join(' ')}</p>
                    ))).join(' '): 'The Card has no attacks'}
                </div>
                <div className='cardDetail__weakness'>${card.weaknesses? card.weaknesses.map(weakness => ReactDOMServer.renderToString(
                    <p>Weakness: {weakness.type} {weakness.value}</p>
                )): ''}</div>
                <div className='cardDetail__retreat'> 
                    Retreat cost: ${!isNaN(card.convertedRetreatCost)? 'Colorless x' + card.convertedRetreatCost: '0'}
                </div>
                <br/>
            </div>
        `)
    }

    return html
}

export default CardDetails;