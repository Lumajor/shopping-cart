import React, { useState } from "react";
import "../styles/ShopItemOutsideCart.css";
import { Link } from "react-router-dom";

import plusSign from "../images/plus-sign.png"
import minusSign from "../images/minus-sign.png"

function ShopItemOutsideCart(props) {
    const { item: { id, text, image, count, price }, addToCart, editBuyCount, incrementCount, 
    decrementCount, clearInput, preventScrollOnInput } = props;
    
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
            </figure>
            <div className="title-container">
                <p><b>{text}</b></p>
            </div>
            <div className="item-ui">
                <div className="interaction-container">
                    <img src={minusSign} alt="decrement purchase amount" className="minus-sign" id={id} onClick={decrementCount}/>
                    <input type="number" min="0" id={id} placeholder="0" onChange={editBuyCount} value={count}
                     onFocus={clearInput} onWheel={preventScrollOnInput}/>
                    <img src={plusSign} alt="increment purchase amount" className="plus-sign" id={id} onClick={incrementCount}/>
                </div>
                <button onClick={(e) => [addToCart(e), updateDisplay()]} id={id}>Add To Cart</button>
            </div>
            <div className="added-cart-message-container" style={itemAdded ? displayed : hidden}>
                <p>added <b>{itemAddedAmount}x {text}</b> to cart.</p>
                <p><Link to="/cart">view cart</Link></p>
            </div>
            
            <div className="price-display"><b>${price}</b></div>
        </div>
    );
}

export default ShopItemOutsideCart;