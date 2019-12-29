import React from 'react'
import CardDetails from './CardDetails'
import * as basicLightbox from 'basiclightbox'


const Card = (props) => {

    const diplayCardDetails = async () => {
        /*const instance = basicLightbox.create(` 
            <div class="modal">
                <p>
                    Your first lightbox with just a few lines of code.
                    Yes, it's really that simple.
                </p>
            </div>
        `)*/
        const html  = await CardDetails(props)
        const instance = basicLightbox.create(html)

        /*console.log("Hey i'm a basicLightBox " + instance.element() + ' and i am visible ' + instance.visible())*/
       instance.show(() => console.log('basicLightbox is now visible' ))
       /*console.log("Hey i'm a basicLightBox " + instance.element() + ' and i am visible ' + instance.visible())*/

    }

    return(
        <img key={props.id} src={props.imageUrl} alt={props.name} onClick={diplayCardDetails} role="button"/>
    )
}

export default Card;