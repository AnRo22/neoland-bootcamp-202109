import { Component } from "react"

class Detail extends Component {
    constructor(props) {
        super()
    }
    render() {

        const {
            props: {
                item: {
                    name,
                    image,
                    year,
                    price,
                    color,
                    style,
                    collection,
                    maker,
                    url
                },
                onBack
            }
        } = this

        return  <div className="home__detail">
            <h2>{name}</h2>
            <button className="button" onClick={onBack}>Go back</button>
            <img className="home__image" src={image} alt="" />

            <time>{year}</time>
            <span>{price} </span>
            <span>{color}</span>
            <span>{style}</span>
            <span>{collection}</span>
            <span>{maker}</span>
            <a href={url}>original</a>

        </div>
    }
}

export default Detail
