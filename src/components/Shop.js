import React, { useState } from "react";
import "../styles/Shop.css"
import ShopItemOutsideCart from "./ShopItemOutsideCart";
import _ from 'lodash';



function Shop(props) {

  const { cart, setCart, shopItemInfo, setShopItemInfo } = props

  const [shopItems] = useState(shopItemInfo);

  const addToCart = (e) => {
    //get previous cart
    const newCart = [...cart];
    //find the element in question in the cart Array
    let found_elem = _.find(shopItemInfo, function (o) { return o.id === e.target.id; });
    //get the count to add to the previous count, as well as previous attributes
    let newBuyAmount = parseInt(found_elem.count);
    if (newBuyAmount < 1) {
      alert("must add at least one item to cart.")
    } else {
      let objImg = found_elem.image;
      let objText = found_elem.text;
      let objPrice = found_elem.price;
      let newObject = { id: e.target.id, text: objText, image: objImg, price: objPrice, count: newBuyAmount };
      if (_.some(newCart, ['id', e.target.id])) {
        //update cart
        let index = _.findIndex(newCart, ['id', e.target.id]);
        let previousBuyAmount = newCart[index].count;
        newCart[index] = {
          id: newCart[index].id, text: newCart[index].text,
          image: newCart[index].image, price: newCart[index].price, count: previousBuyAmount + newBuyAmount
        };
        setCart(newCart);
        //reset count of object
        editCountAfterAddingToCart(e.target.id, 0)
      } else {
        newCart.push(newObject);
        setCart(newCart);
        //reset count of object
        editCountAfterAddingToCart(e.target.id, 0)
      }
    }
  }

  const editBuyCount = (e) => {
    let previousItemInfo = [...shopItemInfo];
    let index = _.findIndex(previousItemInfo, ['id', e.target.id]);
    let itemInfo = previousItemInfo[index];
    itemInfo.count = e.target.value;
    previousItemInfo.splice(index, 1, itemInfo);
    setShopItemInfo(previousItemInfo);
  }

  const decrementCount = (e) => {
    let previousItemInfo = [...shopItemInfo];
    let index = _.findIndex(previousItemInfo, ['id', e.target.id]);
    let itemInfo = previousItemInfo[index];
    if (itemInfo.count > 0) {
      itemInfo.count = itemInfo.count - 1;
      previousItemInfo.splice(index, 1, itemInfo);
      setShopItemInfo(previousItemInfo)
    }
  }

  const incrementCount = (e) => {
    let previousItemInfo = [...shopItemInfo];
    let index = _.findIndex(previousItemInfo, ['id', e.target.id]);
    let itemInfo = previousItemInfo[index];
    if(itemInfo.count === '') {
      itemInfo.count = 0
    }
    itemInfo.count = itemInfo.count + 1;
    previousItemInfo.splice(index, 1, itemInfo);
    setShopItemInfo(previousItemInfo)
  }

  const editCountAfterAddingToCart = (id, num) => {
    let previousItemInfo = [...shopItemInfo];
    let index = _.findIndex(previousItemInfo, ['id', id]);
    let itemInfo = previousItemInfo[index];
    itemInfo.count = num;
    previousItemInfo.splice(index, 1, itemInfo);
    setShopItemInfo(previousItemInfo);
  }

  const clearInput = (e) => {
    let previousItemInfo = [...shopItemInfo];
    let index = _.findIndex(previousItemInfo, ['id', e.target.id]);
    let itemInfo = previousItemInfo[index];
    itemInfo.count = ''
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
      <div className="shop-container">
        <div className="shop-item-container">
          {shopItems.map((item) => (
            <ShopItemOutsideCart item={item} key={item.id} addToCart={addToCart} editBuyCount={editBuyCount}
              incrementCount={incrementCount} decrementCount={decrementCount} clearInput={clearInput} 
              preventScrollOnInput={preventScrollOnInput}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shop;