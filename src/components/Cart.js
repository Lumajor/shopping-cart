import React, { useEffect, useState } from "react";
import ShopItemInsideCart from "./ShopItemInsideCart";
import Checkout from "./Checkout";
import "../styles/Cart.css"
import _ from 'lodash';

function Cart(props) {

  const { cart, setCart, shopItemInfo, setShopItemInfo } = props

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let newTotal = 0
    cart.forEach(item => {
      let itemsCost = item.price * item.count;
      newTotal = newTotal + itemsCost;
    })
    setTotalPrice(newTotal)
  }, [cart])

  const removeFromCart = (e) => {
    //get previous cart
    const newCart = [...cart];
    //find the element in question in the cart Array
    let found_elem = _.find(shopItemInfo, function(o) { return o.id === e.target.id; });
    //get the count to remove from the previous count
    let removeAmount = parseInt(found_elem.count);
    if (_.some(newCart, ['id', e.target.id])) {
      let index = _.findIndex(newCart, ['id', e.target.id]);
      let previousBuyAmount = newCart[index].count;
      //only allow user to remove as many items as they have
      if(removeAmount > previousBuyAmount) {
        alert("You may only remove up to as many items as you have in the cart.")
      } else {
        newCart[index] = {id: newCart[index].id, text: newCart[index].text,
          image: newCart[index].image, price: newCart[index].price, count: previousBuyAmount - removeAmount};
        setCart(newCart);
      }
    }
  }

  const editRemoveCount = (e) => {
    let previousItemInfo = [...shopItemInfo];
    let index = _.findIndex(previousItemInfo, ['id', e.target.id]);
    let itemInfo = previousItemInfo[index];
    itemInfo.count = e.target.value;
    previousItemInfo.splice(index, 1, itemInfo);
    setShopItemInfo(previousItemInfo);
  }

  const preventScrollOnInput = (e) => {
    e.target.blur()
    e.stopPropagation()
    setTimeout(() => {
      e.target.focus()
    }, 0)
  }

  return (
    <div>
      <div className="cart-container">
        <div className="cart-item-container">
          {cart.map((item) => (
            <ShopItemInsideCart item={item} key={item.id} removeFromCart={removeFromCart}
            editRemoveCount={editRemoveCount} preventScrollOnInput={preventScrollOnInput}/>
          ))}
        </div>
        <div className="cart-checkout-container">
          <h3>Checkout</h3>
          {cart.map((item) => (
            <Checkout item={item} key={item.id}/>
          ))}
          <h4>Total</h4>
          <p>${totalPrice}</p>
          <button>Checkout</button>
        </div>
      </div>

    </div>
  );
}

export default Cart;