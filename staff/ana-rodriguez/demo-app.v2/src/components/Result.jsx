
function Results({ items, onItem, onFav }) {
    return items.length ?
        <ul className="home__results">
            {
                items.map(
                    ({ id, name, thumbnail, image, price, siFav }) =>
                    <div>
                        <li key={id} className="home__result" onClick={() => onItem(id)}>
                            <h2 className="name_vehicles">{name}</h2>
                            <img src={thumbnail || image} />
                            <span className="name_vehicles">{price}</span>
                        </li>
                        <button className="button_fav" onClick={(event) =>{event.stopPropagation()
                             onFav(id)}}>{siFav ? '🤩' : '😐'}</button>
                    </div>
                )
            }
        </ul>
        :
        null
}
export default Results