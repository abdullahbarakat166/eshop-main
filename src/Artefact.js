import "./Artefact.css"
import React from "react"

const Artefact = ({ data, handleBasket }) => {
    return (
        <div>
            <h2>Artefact Name: {data.objectName}</h2>
            <p>Price: {data.price}</p>
            <img src={data.primaryImage} />
            <button onClick={() => handleBasket(data)}>Add to basket</button>
        </div>
    )
}
export default Artefact