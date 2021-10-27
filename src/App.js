import React, { useEffect, useState } from "react";
import './App.css';
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//images
import shirt1 from "./images/shirt1.jpg";
import shirt2 from "./images/shirt2.jpg";
import shirt3 from "./images/shirt3.jpg";
import pants1 from "./images/pants1.jpg";
import pants2 from "./images/pants2.jpg";
import pants3 from "./images/pants3.jpg"
import { findIndex } from "lodash";

function App() {

  const [cart, setCart] = useState([])
  const [purchaseCounter, setPurchaseCounter] = useState(0)

  const [shopItemInfo, setShopItemInfo] = useState([
    {
      id: "shop-item-1",
      text: "t-shirt - white",
      image: shirt1,
      price: 12,
      count: 0
    },
    {
      id: "shop-item-2",
      text: "t-shirt - black",
      image: shirt2,
      price: 13,
      count: 0
    },
    {
      id: "shop-item-3",
      text: "t-shirt - purple",
      image: shirt3,
      price: 15,
      count: 0
    },
    {
      id: "shop-item-4",
      text: "Pants - Black",
      image: pants1,
      price: 18,
      count: 0
    },
    {
      id: "shop-item-5",
      text: "Pants - Beige",
      image: pants2,
      price: 19,
      count: 0
    },
    {
      id: "shop-item-6",
      text: "Pants - Gray",
      image: pants3,
      price: 18,
      count: 0
    }
  ])

  useEffect(()=> {
    let counter= 0;
    //each time the cart is updated: update how many total purchases to be made
    for (let i=0; i<cart.length; i++) {
      let newCart = [...cart];
      counter = counter + cart[i].count;
      //if the counter for the amount to buy is 0, remove it from the cart
      if(cart[i].count === 0) {
        let index = findIndex(newCart[i]);
        newCart.splice(index, 1);
        setCart(newCart)
      }
    }
    setPurchaseCounter(counter);
  }, [cart])

  return (
    <Router>
      <div>
        <NavBar purchaseCounter={purchaseCounter}/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/shop" exact>
            <Shop cart={cart} setCart={setCart} shopItemInfo={shopItemInfo} setShopItemInfo={setShopItemInfo}/>
          </Route>
          <Route path="/cart" exact>
            <Cart cart={cart} setCart={setCart} shopItemInfo={shopItemInfo} setShopItemInfo={setShopItemInfo}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
