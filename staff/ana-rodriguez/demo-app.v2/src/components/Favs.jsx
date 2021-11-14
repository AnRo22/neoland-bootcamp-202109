import React from 'react'
import Results from './Result'

function Favs({ items, onBack, onItem, onFav }) {
    
    return <>
        <button className="button" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</button>

        <Results items={items} onItem={onItem} onFav={onFav} />
    </>
}

export default Favs