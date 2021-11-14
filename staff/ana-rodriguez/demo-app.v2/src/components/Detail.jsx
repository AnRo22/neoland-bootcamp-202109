import React from 'react'

function Detail({ item, onBack, onFav, onAddToCart }) {

    const { year, price, color, style, collection, maker, url, image, name, siFav, id, } = item

    return <div className="home__detail">
        <h2>{name}</h2>
        <button className="button" type="submit" onClick={onBack}>Go back</button>
        <img className="home__image" src={image} alt="" />
        <button className="button_fav" onClick={() => onFav(id)}>{siFav ? '🤩' : '😐'}</button>
        <button className="button" onClick={() => onAddToCart(id)}>Añadir</button>
        <ul>
            <li>year:<time>{year}</time></li>
            <li>price:{price}</li>
            <li>color:{color}</li>
            <li>style:{style}</li>
            <li>collection:{collection}</li>
            <li>by:{maker}</li>
            <li><a href={url}>original</a></li>
        </ul>
       
    </div>
}


export default Detail
