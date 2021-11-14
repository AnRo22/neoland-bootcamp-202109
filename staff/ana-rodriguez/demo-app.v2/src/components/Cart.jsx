
function Cart({ items, onItem, onAdd, onRemove, onBack }) {

    return items.length ?

        <div className="cart">
            <button className="button" onClick={onBack}>Go Back</button>
            <ul className="cart__list">{

                items.map(({ id, name, thumbnail, image, price, qty }) =>
                    <li key={id} className="home__result" onClick={() => onItem(id)}>
                        <div className="container">
                            <h2>{name}</h2>
                        </div>
                        <img className="cart__image" src={thumbnail || image} />
                        <span>{qty} x {price} $</span>
                        <button className="button" onClick={event => {
                            event.stopPropagation()

                            onAdd(id)
                        }}>Añadir</button>

                        <button className="button" onClick = {event =>{event.stopPropagation()
                        
                        onRemove(id)
                        }}>Eliminar</button>    
                    </li>)
            }
            </ul>

           <span className="price_total">Total 
           {items.reduce((accum, {price, qty}                
           ) => accum + price * qty, 0)} $</span>
           <button className="button">Comprar</button>
        </div>

        :
        <p>No vehicles</p>
}

export default Cart