import React from "react";
import "../styles/ShopItemInsideCart.css"

function ShopItemInsideCart(props) {
    const { item: { count, id, image, text, price }, removeFromCart, editRemoveCount } = props;

    let totalCost = count * price

    return (
        <div className="figure-container">
            <figure className="picture-container">
                <img src={image} alt="t-shirt" />
            </figure>
            <div className="item-ui-in-cart">
                <p><b>{text}</b> x {count}: ${totalCost}</p>
                <input type="number" placeholder="0" min="0" id={id} value={count.value} onChange={editRemoveCount}/>
                <button id={id} onClick={removeFromCart}>Remove From Cart</button>
            </div>
        </div>
    );
}

export default ShopItemInsideCart;