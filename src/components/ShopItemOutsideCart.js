import React, { useState } from "react";
import "../styles/ShopItemOutsideCart.css"

function ShopItemOutsideCart(props) {
    const { item: { id, text, image, count, price }, addToCart, editBuyCount } = props;
    
    const [itemAdded, setItemAdded] = useState(false)
    const [itemAddedAmount, setItemAddedAmount] = useState(0)

    const hidden = {
        display: "none"
    }

    const displayed = {
        display: "block"
    }

    const updateDisplay = () => {
        setItemAdded(true)
        setItemAddedAmount(count)
    }

    return (
        <div className="figure-container">
            <figure className="picture-container">
                <img src={image} alt="t-shirt"/>
                <p style={itemAdded ? displayed : hidden}>added {itemAddedAmount}x {text} to cart.</p>
            </figure>
            <div className="item-ui">
                <p><b>{text}</b> (${price})</p>
                <input type="number" placeholder="0" min="0" id={id} value={count.value} onChange={editBuyCount}/>
                <button onClick={(e) => [addToCart(e), updateDisplay()]} id={id}>Add To Cart</button>
            </div>
        </div>
    );
}

export default ShopItemOutsideCart;